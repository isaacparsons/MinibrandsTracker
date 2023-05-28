import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../util/errors";
import { ErrorResponse } from "../util/response";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return ErrorResponse(res, new UnauthorizedError("User not authenticated"));
  }
  next();
};

export default authMiddleware;
