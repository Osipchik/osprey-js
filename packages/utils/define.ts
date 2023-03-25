function DefineProperty(target: object, key: string, getValue: Function) {
  Object.defineProperty(target, key, {
    configurable: true,
    get: function() {
      const value = getValue();

      Object.defineProperty(this, key, {
        value,
        configurable: false,
      });

      return value;
    }
  });
}

export function DefineQueryProperty(payload: object, searchParams: string) {
  DefineProperty(payload, 'query', () => {
    const searchParamsList = new URLSearchParams(searchParams);

    return Object.fromEntries(searchParamsList.entries());
  });
}

export function DefineBodyProperty(payload: object, requestBody: string) {
  DefineProperty(payload, 'body', () => {
    return JSON.parse(requestBody);
  });
}
