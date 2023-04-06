declare class Server {
    private readonly server;
    private readonly middleware;
    private readonly router;
    private readonly host;
    private readonly port;
    constructor();
    run(): void;
    private requestListener;
    private onServerClose;
}
export default Server;
//# sourceMappingURL=index.d.ts.map