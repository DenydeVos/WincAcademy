import express from "express";
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
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createUser(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

usersRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (e) {
    // Prisma throws if not found
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});

usersRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteUser(req.params.id);
    return res.status(200).json(deleted);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});
