import { BreakType } from '../../types';

export type ActionHandlerType = (
  request: Request,
  breakLoop: BreakType,
) => Promise<void> | void;
