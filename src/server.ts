import chalk from "chalk";

import logger from "@utils/functions/logger";
import app  from "./app";

const server = app.listen(process.env.PORT, async () => {
    const address = server.address();
    if (typeof address === 'object' && address !== null) {
        const host = address.address === '::' ? 'localhost' : address.address;
        logger.info(`🚀 Server iniciado em: ${chalk.blueBright('http://' + host + ':' + address.port)}`);
    };
});

process.on('SIGINT', () => {
    logger.error("Server encerrado")
    server.close();
});