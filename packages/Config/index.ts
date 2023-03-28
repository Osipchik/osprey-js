import serialize from 'serialize-javascript';

type configType = {
  [key in string]: unknown;
}

export default class Config {
  private static config: configType = {
    bodyParser: JSON.parse,
    serializer: (data: unknown) => serialize(data, { isJSON: true }),
  };

  static getValue<T>(key: string) {
    return this.config[key] as T;
  }

  static setValue(key: string, value: unknown) {
    this.config[key] = value;
  }
}
