import { Express, Request, Response, NextFunction } from "express";
import { CustomError, isCustomError } from "../util/errors";
import { ErrorResponse } from "../util/response";

const errorMiddleware = async (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return ErrorResponse(res, err);
};

export default errorMiddleware;
