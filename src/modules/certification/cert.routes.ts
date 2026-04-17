import { Router } from "express";

import * as controller from "./cert.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";

import { Role } from "@prisma/client";

const router = Router();

// Vendor list certificaiton
router.get(
 "/",
 authMiddleware,
 allowRoles("ADMIN"),
 controller.allCertifications
);

/* Vendor submits certification */
router.post(
  "/",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.create
);

/* Vendor sees certifications */
router.get(
  "/my",
  authMiddleware,
  allowRoles(Role.VENDOR),
  controller.myCertifications
);

/* Admin verifies certification */
router.patch(
  "/:id",
  authMiddleware,
  allowRoles(Role.ADMIN),
  controller.approveCertification
);

export default router;