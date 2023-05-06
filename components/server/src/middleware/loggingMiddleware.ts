import { Express, Request, Response, NextFunction } from "express";
import winston from "winston";

const logger = winston.createLogger({});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.prettyPrint()
      //   format: winston.format.simple()
    })
  );
}

export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  req.logger = req.user ? logger.child({ user: req.user }) : logger;
  next();
}
