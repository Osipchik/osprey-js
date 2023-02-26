export type TagReturnType = (strings: string | string[], ...values: unknown[]) => string;
declare function Tag(styles: string): TagReturnType;
export default Tag;
