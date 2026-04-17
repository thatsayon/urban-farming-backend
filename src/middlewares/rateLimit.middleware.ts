import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 20, // max 20 requests per 15 minutes
 message: {
  success: false,
  message: "Too many requests, try again later"
 }
});