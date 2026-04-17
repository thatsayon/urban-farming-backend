import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    // Extract a cleaner summary of the Prisma Validation error instead of the full terminal string
    const lines = err.message.split("\n");
    message = lines[lines.length - 1] || "Prisma Validation Error";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = `Prisma Error: ${err.code}`;
    if (err.code === "P2002") {
      message = "A record with this data already exists (Unique constraint failed).";
    }
  } else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};
