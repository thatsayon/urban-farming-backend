import { Request, Response, NextFunction } from "express";

import * as service from "./order.service";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const order = await service.createOrder(
      user!.id,
      req.body.produceId
    );

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const myOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const orders = await service.getMyOrders(user!.id);

    res.json({
      success: true,
      data: orders
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const vendorOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const orders = await service.getVendorOrders(user!.id);

    res.json({
      success: true,
      data: orders
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await service.updateOrderStatus(
      req.params.id as string,
      req.body.status
    );

    res.json({
      success: true,
      data: order
    });

  } catch (err: unknown) {
    next(err);
  }
};
