declare class Server {
    private readonly server;
    private readonly middleware;
    private readonly router;
    private readonly host;
    private readonly port;
    constructor();
    private requestListener;
    run(): void;
    private onServerClose;
}
export default Server;
//# sourceMappingURL=index.d.ts.map