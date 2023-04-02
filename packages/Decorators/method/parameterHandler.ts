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
) => async (
  request: IncomingMessageType,
  args?: ParamsType,
): Promise<unknown[]> => {
  const syncPromise: Promise<unknown[]> = new Promise((resolve, reject) => {
    const result: unknown[] = syncParsers.map((parser) => parser(request, args));

    resolve(result);
  });

  const result = await Promise.all([
    syncPromise,
    asyncParsers.map((parser): unknown => parser(request, args)),
  ]);

  return result;
}

export default function GetParameterHandler(paramsParsers: ObjectT<Function>) {
  if (!paramsParsers) {
    return null;
  }

  const syncParsers = [];
  const syncIndexes = [];
  const asyncParsers = [];
  const asyncIndexes = [];

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
    return prepareMixedProps(asyncParsers, syncParsers);
  } else if (asyncParsers.length) {
    return prepareAsyncProps(asyncParsers);
  } else if (syncParsers.length) {
    return prepareSyncProps(syncParsers);
  } else {
    return null;
  }
}
