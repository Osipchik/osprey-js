import serialize from 'serialize-javascript';

type configType = {
  bodyParser: (text: string) => any;
  serializer: (data: unknown) => string;
  stringify: (data: any) => string;
} & {
  [key in string]: unknown;
}

export default class Config {
  private static config: configType = {
    bodyParser: JSON.parse,
    serializer: (data: unknown) => serialize(data, { isJSON: true }),
    stringify: (data: any) => data.toString(),
  };

  static getValue<T>(key: string) {
    return this.config[key] as T;
  }

  static setValue(key: string, value: unknown) {
    this.config[key] = value;
  }
}
