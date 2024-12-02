import { Request, Response, NextFunction } from "express";

import sendError from "@utils/functions/error";

export interface ManageRequestBody {
    default: {
        res: Response;
        req: Request;
    };
    ids: {
        userID?: string;
    },
    params: any;
    data: any;
};

interface ManageRequestParams {
    service: (manageRequestBody: ManageRequestBody) => Promise<any> | any; 
};


const manageRequest = (service: ManageRequestParams["service"]) => {
    return async (req: Request, res: Response) => {
        try {
            const manageRequestBody: ManageRequestBody = {
                default: { res, req },
                params: req.params,
                data: req.body,
                ids: {},

            };
            const result = await service(manageRequestBody);

            if (result?.error){
                sendError({ code: result.error, res, error: result.data });
            };

            res.status(200).json(result);
        } catch (error) {
            sendError({ code: "internal_error", res})
        }
    };
};

export default manageRequest;
