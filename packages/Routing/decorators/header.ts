import MetaStore from '../../utils/metaStore';

function Header(
  name: string,
  value: string,
): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    MetaStore.addMeta(descriptor, 'header', { name, value });
  };
}

export default Header;
