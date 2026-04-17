import { Request, Response } from "express";

export const send = (res: Response, data: unknown, message = "ok") => {
  res.json({
    success: true,
    message,
    data,
  });
};