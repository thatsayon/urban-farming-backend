import { Request, Response } from "express";
import * as service from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await service.registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (err: unknown) {

    res.status(400).json({
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong"
    });

  }
};


export const login = async (req: Request, res: Response) => {
  try {

    const data = await service.loginUser(
      req.body.email,
      req.body.password
    );

    res.json({
      success: true,
      data
    });

  } catch (err: unknown) {

    res.status(400).json({
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong"
    });

  }
};