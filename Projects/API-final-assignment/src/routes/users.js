import express from "express";
import { Prisma } from "@prisma/client";
import { authRequired } from "../middleware/auth.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/usersService.js";

export const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createUser(req.body);
    return res.status(201).json(created);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "User already exists" });
    }

    next(error);
  }
});

usersRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(error);
  }
});

usersRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteUser(req.params.id);
    return res.status(200).json(deleted);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(error);
  }
});
