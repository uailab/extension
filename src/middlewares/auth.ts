import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import sendError from "@utils/functions/error";
import logger from "@utils/functions/logger";

const auth = (req: Request, res: Response, next: NextFunction): void => {  
  try {
    var token = req.header('authorization');
    if (!token){
      sendError({ code: "no_token", res });
      return;
    };

    jwt.verify(token, process.env.SECRET as string, (error, decoded) => {
      if (error || (!decoded || typeof decoded === 'string')) return sendError({ code: "token_is_not_valid", res });
      const userID = decoded?.id as string | undefined;
      res.locals.userID = userID;
        next();
    });
  } catch (error) {
    logger.error("[auth] Auth internal error");
    console.log(error);
    sendError({ code: "internal_error", res });
    return;
  }
};

export default auth;