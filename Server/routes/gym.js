import express from "express";
import GymBooking from "../models/GymBooking.js";

const router = express.Router();

// Create new gym booking
router.post("/", async (req, res) => {
  try {
    const booking = new GymBooking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all gym bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await GymBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
