import { Request, Response, NextFunction } from "express";
import * as service from "./vendor.service";

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const profile = await service.createVendorProfile(
      user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: profile
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const profile = await service.getVendorProfile(user!.id);

    res.json({
      success: true,
      data: profile
    });

  } catch (err: unknown) {
    next(err);
  }
};