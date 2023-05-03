import { PrismaClient } from "@prisma/client";

import { Express, Request, Response, NextFunction } from "express";

export function dbMiddleware(req: Request, res: Response, next: NextFunction): void {
  req.prisma = new PrismaClient();
  next();
}
