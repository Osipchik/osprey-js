export declare enum ActionFilterKeys {
    AUTHORISATION = "actionFilter",
    RESOURCE = "resourceFilter",
    ACTION_BEFORE = "actionBeforeFilter",
    ACTION_AFTER = "actionAfterFilter",
    EXCEPTION = "exceptionFilter",
    RESULT = "resultFilter"
}
type ActionFilterFabricType = <T>(actionKey: ActionFilterKeys) => (handler: T) => MethodDecorator;
export declare const ActionFilterDecoratorFabric: ActionFilterFabricType;
export declare const ExceptionFilterDecoratorFabric: (handler: Function) => MethodDecorator;
export {};
//# sourceMappingURL=utils.d.ts.map