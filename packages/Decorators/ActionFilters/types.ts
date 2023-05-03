import { IncomingMessageType, ServerResponseType } from '../../Routing/types';
import { BreakType } from '../../types';

export type ActionHandlerType = (
  request: IncomingMessageType,
  response: ServerResponseType,
  breakLoop: BreakType,
) => Promise<void> | void;
