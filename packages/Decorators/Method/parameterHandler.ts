import { IncomingMessageType, ObjectT, ParamsType } from '../../Routing/types';
import { getSyncAndAsyncLists } from '../../utils/helpers';

const PrepareSyncProps = (syncParsers: Function[]) => (
  request: IncomingMessageType,
  args?: ParamsType,
): unknown[] => {
  const result: unknown[] = new Array(syncParsers.length);

  for (const [index, parser] of syncParsers.entries()) {
    result[index] = parser(request, args);
  }

  return result;
}

const PrepareAsyncProps = (asyncParsers: Function[]) => (
  request: IncomingMessageType,
  args?: ParamsType,
): Promise<Awaited<unknown>[]> => {
  return Promise.all(asyncParsers.map((parser) => parser(request, args)));
}

const PrepareMixedProps = (
  asyncParsers: Function[],
  syncParsers: Function[],
  syncIndexes: number[],
  asyncIndexes: number[]
) => async (
  request: IncomingMessageType,
  args?: ParamsType,
): Promise<unknown[]> => {
  const normalisedResult: unknown[] = new Array(syncParsers.length + asyncParsers.length);

  const asyncPromises = asyncParsers.map((parser) => parser(request, args));

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

  const {
    asyncValues,
    asyncIndexes,
    syncValues,
    syncIndexes,
  } = getSyncAndAsyncLists(paramsParsers) ;

  if (asyncValues.length && syncValues.length) {
    return {
      handler: PrepareMixedProps(asyncValues, syncValues, syncIndexes, asyncIndexes),
      isAsync: true,
    };
  } else if (asyncValues.length) {
    return {
      handler: PrepareAsyncProps(asyncValues),
      isAsync: true,
    };
  } else if (syncValues.length) {
    return {
      handler: PrepareSyncProps(syncValues),
      isAsync: false,
    };
  } else {
    return null;
  }
}
