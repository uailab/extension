import gulog from "gulog"; 

import app  from "./app";

gulog.setup({
    prefix: '(UaiLab API)'
});

const server = app.listen(1000, async () => {
    console.log(server)
    gulog.info(`🚀 Server iniciado na porta: 1000`)
});

process.on('SIGINT', () => {
    gulog.error("Server encerrado")
    server.close();
});