import express from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../services/reviewsService.js";

export const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (e) {
    next(e);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(review);
  } catch (e) {
    next(e);
  }
});

reviewsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createReview(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

reviewsRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateReview(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});

reviewsRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteReview(req.params.id);
    return res.status(200).json(deleted);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});
