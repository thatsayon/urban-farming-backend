import { Router } from "express";
import * as controller from "./post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
 "/",
 authMiddleware,
 controller.create
);

router.get(
 "/",
 controller.list
);

export default router;