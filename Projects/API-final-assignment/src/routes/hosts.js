import express from "express";
import { Prisma } from "@prisma/client";
import { authRequired } from "../middleware/auth.js";
import {
  createHost,
  deleteHost,
  getAllHosts,
  getHostById,
  updateHost,
} from "../services/hostsService.js";

export const hostsRouter = express.Router();

hostsRouter.get("/", async (req, res, next) => {
  try {
    const hosts = await getAllHosts(req.query);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

hostsRouter.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

hostsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createHost(req.body);
    return res.status(201).json(created);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "Host already exists" });
    }

    next(error);
  }
});

hostsRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateHost(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "Host already exists" });
    }
    next(error);
  }
});

hostsRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteHost(req.params.id);
    return res.status(200).json(deleted);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(error);
  }
});
