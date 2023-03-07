import Tag, { TagReturnType } from '../../utils/Logger/tag';

export interface IDecorator {
  titleTag: TagReturnType;
  messageTag: TagReturnType;
  defaultTitle: string;
}

export const Error: IDecorator = {
  titleTag: Tag('b,i,red'),
  messageTag: Tag('red'),
  defaultTitle: 'Error',
};

export const Warn: IDecorator = {
  titleTag: Tag('b,i,yellow'),
  messageTag: Tag('yellow'),
  defaultTitle: 'Warn',
};

export const Info: IDecorator = {
  titleTag: Tag('b,blue'),
  messageTag: Tag('blue'),
  defaultTitle: 'Info',
}

export const Success: IDecorator = {
  titleTag: Tag('b,green'),
  messageTag: Tag('green'),
  defaultTitle: 'Success',
}

export const Put: IDecorator = {
  titleTag: Tag('b,cyan'),
  messageTag: Tag('cyan'),
  defaultTitle: 'Put',
}

export const Patch: IDecorator = {
  titleTag: Tag('b,crimson'),
  messageTag: Tag('crimson'),
  defaultTitle: 'Patch',
}

export const Data: IDecorator = {
  titleTag: Tag('b,magenta'),
  messageTag: Tag('magenta'),
  defaultTitle: 'Data',
}

export const urlRegex = /(https?:\/\/\S+)/gm;
