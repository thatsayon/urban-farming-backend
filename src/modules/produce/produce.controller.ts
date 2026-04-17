import { Request, Response, NextFunction } from "express";
import * as service from "./produce.service";

import { getPagination, getPaginatedResponse } from "../../utils/pagination";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const produce = await service.createProduce(
      user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: produce
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, limit, page } = getPagination(req);

    const { data, count } = await service.listProduce(skip, limit);

    res.json(getPaginatedResponse(req, count, page, limit, data));

  } catch (err: unknown) {
    next(err);
  }
};

export const myProduce = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  try {
    const data = await service.getVendorProduce(user!.id);

    res.json({
      success: true,
      data
    });

  } catch (err: unknown) {
    next(err);
  }
};