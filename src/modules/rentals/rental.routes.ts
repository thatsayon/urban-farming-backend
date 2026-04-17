import { Router } from "express";

import * as controller from "./rental.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";

import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.create
);

router.get(
  "/",
  controller.list
);

router.get(
  "/my",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.mine
);

export default router;