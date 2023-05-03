import { IncomingMessageType, ObjectT, ParamsType } from '@/Routing/types';
import { getSyncAndAsyncLists } from '@/utils/helpers';

const PrepareSyncProps = (syncParsers: Function[]) => (
  request: IncomingMessageType,
  args?: ParamsType,
): unknown[] => {
  const result: unknown[] = new Array(syncParsers.length);

  let counter = syncParsers.length;
  while (counter > 0) {
    counter--;

    result[counter] = syncParsers[counter](request, args);
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

  {
    let counter = syncParsers.length;

    while(counter > 0) {
      counter--;

      normalisedResult[syncIndexes[counter]] = syncParsers[counter](request, args);
    }
  }

  const asyncResult = await Promise.all(asyncPromises);

  {
    let counter = asyncResult.length;

    while(counter > 0) {
      counter--;

      normalisedResult[asyncIndexes[counter]] = asyncResult[counter](request, args);
    }
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
