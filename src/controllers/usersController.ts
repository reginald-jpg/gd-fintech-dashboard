import type { Request, Response } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { prisma } from "../services/prisma.js";
import { HttpError } from "../middleware/errorHandler.js";

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
    take: 50
  });
  res.json({ users });
}

export async function createUser(req: Request, res: Response) {
  const body = CreateUserSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    throw new HttpError(409, "Email already exists", "EMAIL_EXISTS");
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      passwordHash: sha256(body.password)
    },
    select: { id: true, email: true, role: true, createdAt: true }
  });

  res.status(201).json({ user });
}

