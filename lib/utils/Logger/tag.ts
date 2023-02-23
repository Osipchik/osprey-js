import stylize from './stylize';

export type TagReturnType = (strings: string | string[], ...values: unknown[]) => string;

function Tag(styles: string): TagReturnType {
  return (strings, ...values) => {
    if (typeof strings === 'string') {
      return stylize(styles, strings);
    }

    const result = [strings[0]];
    let i = 1;

    for (const val of values) {
      const str = strings[i++];
      result.push(String(val), str);
    }

    return stylize(styles, result.join(''));
  }
}

export default Tag;
module.exports = Tag;
