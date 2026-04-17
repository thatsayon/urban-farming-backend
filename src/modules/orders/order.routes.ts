import { Router } from "express";

import * as controller from "./order.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";

import { Role } from "@prisma/client";

const router = Router();

/* Customer places order */
router.post(
  "/",
  authMiddleware,
  allowRoles(Role.CUSTOMER),
  controller.createOrder
);

/* Customer order history */
router.get(
  "/my",
  authMiddleware,
  allowRoles(Role.CUSTOMER),
  controller.myOrders
);

/* Vendor sees orders for their products */
router.get(
  "/vendor",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.vendorOrders
);

/* Vendor updates order status */
router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.changeStatus
);

export default router;