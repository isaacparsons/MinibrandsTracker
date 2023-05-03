import { Express, Request, Response, NextFunction } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user)
    return res.status(401).json({
      error: "User not authenticated"
    });
  next();
};

export default authMiddleware;
