import { Request, Response, NextFunction } from "express";
import * as service from "./post.service";
import { getPagination, getPaginatedResponse } from "../utils/pagination";

export const create = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const user = (req as any).user;
  const post = await service.createPost(
   user!.id,
   req.body.postContent
  );

  res.status(201).json({
   success: true,
   data: post
  });
 } catch (err: unknown) {
  next(err);
 }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { skip, limit, page } = getPagination(req);
  const { data, count } = await service.getPosts(skip, limit);

  res.json(getPaginatedResponse(req, count, page, limit, data));
 } catch (err: unknown) {
  next(err);
 }
};