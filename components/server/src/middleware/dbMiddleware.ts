import { PrismaClient } from "@prisma/client";

import { Express, Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export function dbMiddleware(req: Request, res: Response, next: NextFunction): void {
  req.prisma = prisma;
  next();
}
