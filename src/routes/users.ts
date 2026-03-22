import { Router } from "express";
import { createUser, listUsers } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.get("/users", listUsers);
usersRouter.post("/users", createUser);

