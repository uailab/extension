import { Response } from "express";

import { ResponseErrors, ResponseErrorsParams } from "@assets/config/errors";
import defaultConfig from "@assets/config/default";
import logger from "./logger";

interface SendErrorParams {
    code:  ResponseErrorsParams;
    res: Response;
    options?: {};
    error?: any;
};

const sendError = ({ code, res, error } : SendErrorParams) => {
    try {
        const responseError = ResponseErrors[code];

        if (defaultConfig.logError.message) logger.error(responseError.message);
        if (error && defaultConfig.logError.data) console.log(error);

        return res.status(responseError.statusCode).json(responseError);
    } catch (error) {
        logger.error("[sendError] Server error");
        console.log(error);

        const serverErrorResponse = ResponseErrors["internal_error"]
        return res.status(500).json(serverErrorResponse);
    }
};

export default sendError;