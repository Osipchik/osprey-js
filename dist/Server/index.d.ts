type AppPropsType = {
    threadPoolSize?: number;
};
declare class App {
    private readonly threadPoolSize;
    constructor(props?: AppPropsType);
    useControllers(controllers: any[]): void;
    run(): void;
}
export default App;
//# sourceMappingURL=index.d.ts.map