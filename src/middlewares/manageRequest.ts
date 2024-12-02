import { Request, Response, NextFunction } from "express";

interface ManageRequestParams {
    service: (req: Request, res: Response) => Promise<any> | any; 
}

const manageRequest = (service: ManageRequestParams["service"]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await service(req, res);
            if (result) {
                res.json(result); 
            }
        } catch (error) {
            next(error); 
        }
    };
};

export default manageRequest;
