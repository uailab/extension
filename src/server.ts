import app  from "./app";

const server = app.listen(1000, async () => {
    console.log(`🚀 Server iniciado na porta: 1000`)
});

process.on('SIGINT', () => {
    console.log("Server encerrado")
    server.close();
});