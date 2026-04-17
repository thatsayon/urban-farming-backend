import { Request, Response, NextFunction } from "express";

import * as service from "./rental.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const data = await service.createRentalSpace(
      user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.listRentalSpaces();

    res.json({
      success: true,
      data
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const mine = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const data = await service.myRentalSpaces(user!.id);

    res.json({
      success: true,
      data
    });

  } catch (err: unknown) {
    next(err);
  }
};
