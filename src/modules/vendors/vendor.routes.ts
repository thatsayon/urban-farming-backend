import { Router } from "express";

import * as controller from "./vendor.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";

import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/profile",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.createProfile
);

router.get(
  "/profile",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.getMyProfile
);

export default router;