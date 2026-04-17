import { Router } from "express";

import * as controller from "./produce.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";

import { Role } from "@prisma/client"

const router = Router();

/* Vendor creates produce */
router.post(
  "/",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.create
);

/* Public produce list */
router.get(
  "/",
  controller.list
);

/* Vendor own produce */
router.get(
  "/my",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.myProduce
);

export default router;