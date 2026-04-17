import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { AuthRequest } from "./auth.middleware";

export const allowRoles =
  (...roles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };