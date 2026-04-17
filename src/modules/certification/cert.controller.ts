import { Request, Response, NextFunction } from "express";

import * as service from "./cert.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const cert = await service.createCertification(
      user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: cert
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const myCertifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  try {
    const certs = await service.getMyCertifications(user!.id);

    res.json({
      success: true,
      data: certs
    });

  } catch (err: unknown) {
    next(err);
  }
};

export const approveCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cert = await service.verifyCertification(
      req.params.id as string,
      req.body.status
    );

    res.json({
      success: true,
      data: cert
    });

  } catch (err: unknown) {
    next(err);
  }
};


export const allCertifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string | undefined;
    const certs = await service.getAllCertifications(status);

    res.json({
      success: true,
      data: certs
    });
  } catch (err: unknown) {
    next(err);
  }
};