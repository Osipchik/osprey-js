import MetaStore from '../utils/metaStore';

/**
 * Decorator to add header Parameter into response.
 *
 * @param {string} key - The key of the property
 * @param {string} value - The value of the property
 */
function Header(
  key: string,
  value: string,
): MethodDecorator {
  return (
    _target: object,
    _key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    MetaStore.addMeta(descriptor, 'header', { key, value });
  };
}

export default Header;
