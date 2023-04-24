import { IncomingMessageType, ParamsType } from '../../Routing/types';

export type ActionHandlerType = (request: IncomingMessageType, args?: ParamsType) => Promise<Boolean> | Boolean;
