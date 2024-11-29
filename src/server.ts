import app  from "./app";

const server = app.listen(process.env.PORT, async () => {
    const address = server.address();
    if (typeof address === 'object' && address !== null) {
        const host = address.address === '::' ? 'localhost' : address.address;
        console.log(`🚀 Server iniciado em: http://${host}:${address.port}`);
    };
});

process.on('SIGINT', () => {
    console.log("Server encerrado")
    server.close();
});