type PathArgsType = {
  path: string,
  prefix?: string,
  property?: string,
  query?: string,
};

export function normalizePath({ prefix, path, property, query}: PathArgsType): string {
  const pathname = [
    addSlash(prefix),
    addSlash(path),
  ].join('');

  return pathname;
}

export function addSlash(param?: string): string {
  if (param) {
    const cleanParam = param.replace('/', '');

    return cleanParam.length ? '/' + cleanParam : '';
  }

  return '';
}

export function isPrimitive(value: any) {
  return !(value instanceof Object);
}

export function isPromise(value: any) {
  return typeof value === 'object' && typeof value.then === 'function';
}

export function isAsyncFunction(value?: Function): boolean {
  if (!value) {
    return false;
  }

  const funcString = value.toString();

  if (funcString.includes('_async_to_generator')) {
    return true;
  }

  return value.constructor.name === 'AsyncFunction' || isPromise(value);
}

export function normalizeSlash(value: string) {
  let val = value;

  while (val.startsWith('/')) {
    val = val.slice(1);
  }

  while (val.endsWith('/')) {
    val = val.slice(0, -1);
  }

  return '/' + val;
}

export function getPath(prefix?: string, pathName?: string): {
  pathName: string,
  prefix: string,
  props: string[],
} {
  const routePrefix = prefix ?? '';
  const routePathName = pathName ?? '';

  if (routePrefix.includes(':')) {
    throw new Error('cant has semicolon');
  }

  if (routePathName.includes('*')) {
    throw new Error('cant has semicolon');
  }

  const props: string[] = [];
  const normalizedPathName = routePathName.split('/').reduce((acc, character) => {
    if (character.includes(':')) {
      const propName = character.slice(1);

      if (isVarName(propName)) {
        props.push(character.slice(1));
      } else {
        throw new Error(`invalid var name: ${propName}`);
      }

      return acc + '/' + character;
    }

    return acc + '/' + character;
  }, '')

  const normalizedPrefix = normalizeSlash(routePrefix);

  return {
    pathName: normalizeSlash(normalizedPrefix + normalizeSlash(normalizedPathName)),
    prefix: normalizedPrefix,
    props,
  };
}

export function isVarName(name: string) {
  if (name.trim() !== name) {
    return false;
  }

  try {
    new Function(name, 'var ' + name);
  } catch (_) {
    return false;
  }

  return true;
}

export function getSyncAndAsyncLists(list: any[] | object) {
  const syncValues = [];
  const syncIndexes: number[] = [];
  const asyncValues = [];
  const asyncIndexes: number[] = [];

  const entries = Array.isArray(list) ? list.entries() : Object.entries(list);

  for (const [index, paramsParser] of entries) {
    if (isAsyncFunction(paramsParser)) {
      asyncValues.push(paramsParser);
      asyncIndexes.push(Number(index));
    } else {
      syncValues.push(paramsParser);
      syncIndexes.push(Number(index));
    }
  }

  return {
    asyncValues: asyncValues.reverse(),
    asyncIndexes,
    syncValues: syncValues.reverse(),
    syncIndexes,
  };
}
