import { Request, Response, NextFunction } from "express";

import sendError, { SendErrorParams } from "@utils/functions/error";
import { ResponseErrorsParams } from "@assets/config/errors";

interface ManageErrorParams {
    code:  ResponseErrorsParams;
    error?: any;
};

export interface ManageRequestBody {
    defaultExpress: {
        res: Response;
        req: Request;
    };
    ids: {
        userID?: string;
    },
    manageError: (data: ManageErrorParams) => void;
    params: any;
    data: any;
};

interface ManageRequestParams {
    service: (manageRequestBody: ManageRequestBody) => Promise<any> | any; 
};

const manageRequest = (service: ManageRequestParams["service"]) => {
    return async (req: Request, res: Response) => {
        try {
            const manageError = ({ code, error}: ManageErrorParams) => {
                return sendError({ code, error, res });
            };
            
            const manageRequestBody: ManageRequestBody = {
                defaultExpress: { res, req },
                params: req.params,
                data: req.body,
                manageError,
                ids: {},
            };
            const result = await service(manageRequestBody);
            
            if (result === "error") return;

            res.status(200).json(result);
        } catch (error) {
            sendError({ code: "internal_error", res})
        }
    };
};

export default manageRequest;
