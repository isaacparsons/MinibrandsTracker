import { Response } from "express";
import { CustomError, isCustomError } from "./errors";

export const ErrorResponse = (res: Response, err: CustomError | Error) => {
  if (isCustomError(err)) {
    const error = err as CustomError;
    return res.status(error.status).json({
      message: error.message,
      name: error.name
    });
  }
  return res.status(500).json({
    message: err.message
  });
};

export const SuccessResponse = (res: Response, message: string) => {
  return res.status(200).json({
    message
  });
};
