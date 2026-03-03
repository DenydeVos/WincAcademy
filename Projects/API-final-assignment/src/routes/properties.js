import express from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
} from "../services/propertiesService.js";

export const propertiesRouter = express.Router();

propertiesRouter.get("/", async (req, res, next) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json(properties);
  } catch (e) {
    next(e);
  }
});

propertiesRouter.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(property);
  } catch (e) {
    next(e);
  }
});

propertiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createProperty(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

propertiesRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateProperty(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});

propertiesRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteProperty(req.params.id);
    return res.status(200).json(deleted);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});
