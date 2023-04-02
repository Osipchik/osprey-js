type AppPropsType = {
    threadPoolSize?: number;
};
declare class App {
    private readonly pipeline;
    constructor(props?: AppPropsType);
    useControllers(controllers: any[]): void;
    run(): void;
}
export default App;
//# sourceMappingURL=index.d.ts.map