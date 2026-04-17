import { prisma } from "../../config/db";
import { env } from "../../config/env";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RegisterPayload } from "./auth.types";

export const registerUser = async (payload: RegisterPayload) => {
  const exists = await prisma.user.findUnique({
    where: { email: payload.email }
  });

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role
    }
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.status) {
    throw new Error("Account disabled");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};