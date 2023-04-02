import { IncomingMessageType, ObjectT, ParamsType } from '../../Routing/types';
import { isAsyncFunction } from '../../utils/helpers';

const prepareSyncProps = (syncParsers: Function[]) => (
  request: IncomingMessageType,
  args?: ParamsType,
): unknown[] => {
  const result: unknown[] = new Array(syncParsers.length);

  for (const [index, parser] of syncParsers.entries()) {
    result[index] = parser(request, args);
  }

  return result;
}

const prepareAsyncProps = (asyncParsers: Function[]) => (
  request: IncomingMessageType,
  args?: ParamsType,
): Promise<Awaited<unknown>[]> => {
  return Promise.all(asyncParsers.map((parser) => parser(request, args)));
}

const prepareMixedProps = (
  asyncParsers: Function[],
  syncParsers: Function[],
  syncIndexes: number[],
  asyncIndexes: number[]
) => async (
  request: IncomingMessageType,
  args?: ParamsType,
): Promise<unknown[]> => {
  const normalisedResult: unknown[] = new Array(syncParsers.length + asyncParsers.length);

  const asyncPromises = asyncParsers.map((parser, index) => parser(request, args));

  for (const [index, parser] of syncParsers.entries()) {
    normalisedResult[syncIndexes[index]] = parser(request, args);
  }

  const asyncResult = await Promise.all(asyncPromises);

  for (const [index, result] of asyncResult.entries()) {
    normalisedResult[asyncIndexes[index]] = result;
  }

  return normalisedResult;
}

export default function GetParameterHandler(paramsParsers: ObjectT<Function>) {
  if (!paramsParsers) {
    return null;
  }

  const syncParsers = [];
  const syncIndexes: number[] = [];
  const asyncParsers = [];
  const asyncIndexes: number[] = [];

  for (const [index, paramsParser] of Object.entries(paramsParsers)) {
    if (isAsyncFunction(paramsParser)) {
      asyncParsers.push(paramsParser);
      asyncIndexes.push(Number(index));
    } else {
      syncParsers.push(paramsParser);
      syncIndexes.push(Number(index));
    }
  }

  if (asyncParsers.length && syncParsers.length) {
    return prepareMixedProps(asyncParsers, syncParsers, syncIndexes, asyncIndexes);
  } else if (asyncParsers.length) {
    return prepareAsyncProps(asyncParsers);
  } else if (syncParsers.length) {
    return prepareSyncProps(syncParsers);
  } else {
    return null;
  }
}
