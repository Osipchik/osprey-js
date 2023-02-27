import { IncomingMessageType, ServerResponseType } from '@/Routing/types';
export type PreHandler = (request: IncomingMessageType, response: ServerResponseType, next: (args?: unknown) => void) => void;
export type PreHandlerAsync = (request: IncomingMessageType, response: ServerResponseType, next: (args?: unknown) => void) => Promise<void>;
//# sourceMappingURL=type.d.ts.map