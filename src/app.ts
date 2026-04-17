import express from "express";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import authRoutes from "./modules/auth/auth.routes";
import vendorRoutes from "./modules/vendors/vendor.routes";
import produceRoutes from "./modules/produce/produce.routes";
import rentalRoutes from "./modules/rentals/rental.routes";
import orderRoutes from "./modules/orders/order.routes";
import certRoutes from "./modules/certification/cert.routes";
import postRoutes from "./community/post.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/produce", produceRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/certifications", certRoutes);
app.use("/api/community", postRoutes);

app.use(
 "/docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpec)
);

// Global Error Handler
app.use(errorHandler as any);

export default app;