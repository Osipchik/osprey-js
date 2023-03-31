import type { IncomingMessageType, ServerResponseType, RequestHandlerType, ParamsType } from '../../Routing/types';
import type { ResponseHandlerType } from '../../Response/types';
import { Methods } from '../../Routing/methods';
import MetaStore from '../../utils/metaStore';

export type AsyncHandlerType = (props: ParamsType) => RequestHandlerType;

function asyncHandler(originalHandler: Function, meta: any): AsyncHandlerType {
  return (controller: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    props: ParamsType,
  ) => {
    const context = {
      ...controller,
      request,
      response,
    };

    const handleResponse: ResponseHandlerType = await originalHandler.call(context);
    handleResponse(request, response, meta);
  };
}

function asyncHandlerWithParams(originalHandler: Function, meta: any, paramsParsers: Function[]): AsyncHandlerType {
  return (controller: any) => async (
    request: IncomingMessageType,
    response: ServerResponseType,
    props: ParamsType,
  ) => {
    const context = {
      ...controller,
      request,
      response
    };

    const params = await Promise.all(paramsParsers.map((callback) => callback(request, props)));

    const handleResponse: ResponseHandlerType = await originalHandler.apply(context, params);
    handleResponse(request, response, meta);
  };
}

export default function DecoratorFabric(method: Methods, path?: string): MethodDecorator {
  return (
    _target: any,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalDescriptorValue = descriptor.value as Function;
    const meta = MetaStore.getMeta(descriptor);

    const propertyParserObject = MetaStore.getMeta(descriptor.value);
    const propertiesParsers = propertyParserObject ? Object.values(propertyParserObject) : null;

    descriptor.value = propertiesParsers?.length
      ? asyncHandlerWithParams(originalDescriptorValue, meta, propertiesParsers as Function[])
      : asyncHandler(originalDescriptorValue, meta);

    MetaStore.addMeta(descriptor, 'meta', {
      path: path || '',
      method,
    });

    return descriptor;
  };
}
