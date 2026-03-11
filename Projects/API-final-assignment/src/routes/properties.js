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
    const properties = await getAllProperties(req.query);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

propertiesRouter.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

propertiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createProperty(req.body);
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

propertiesRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateProperty(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(error);
  }
});

propertiesRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteProperty(req.params.id);
    return res.status(200).json(deleted);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(error);
  }
});
