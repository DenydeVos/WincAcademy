import express from "express";
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
    const hosts = await getAllHosts();
    res.status(200).json(hosts);
  } catch (e) {
    next(e);
  }
});

hostsRouter.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(host);
  } catch (e) {
    next(e);
  }
});

hostsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createHost(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

hostsRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateHost(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});

hostsRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteHost(req.params.id);
    return res.status(200).json(deleted);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});
