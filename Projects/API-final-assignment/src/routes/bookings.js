import express from "express";
import { authRequired } from "../middleware/auth.js";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../services/bookingsService.js";

export const bookingsRouter = express.Router();

bookingsRouter.get("/", async (req, res, next) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (e) {
    next(e);
  }
});

bookingsRouter.get("/:id", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(booking);
  } catch (e) {
    next(e);
  }
});

bookingsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const created = await createBooking(req.body);
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

bookingsRouter.put("/:id", authRequired, async (req, res, next) => {
  try {
    const updated = await updateBooking(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});

bookingsRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const deleted = await deleteBooking(req.params.id);
    return res.status(200).json(deleted);
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ message: "Not found" });
    next(e);
  }
});
