import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import sendError from "@utils/functions/error";
import logger from "@utils/functions/logger";

const auth = (req: Request, res: Response, next: NextFunction) => {  
  try {
    var token = req.header('authorization');
    if (!token) return sendError({ code: "no_token", res });

    jwt.verify(token, process.env.SECRET as string, (error, decoded) => {
      if (error || (!decoded || typeof decoded === 'string')) return sendError({ code: "token_is_not_valid", res });
      const userID = decoded?.id as string | undefined;
        req.userID = userID;
        next();
    });
  } catch (error) {
    logger.error("[auth] Auth internal error");
    console.log(error)
    return sendError({ code: "internal_error", res })
  }
};

export default auth;