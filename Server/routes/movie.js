import express from "express";
import MovieOrder from "../models/Movie.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { movie, date, tickets, seatType } = req.body;
    if (!movie || !date || !tickets || !seatType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBooking = new MovieOrder({ movie, date, tickets, seatType });
    await newBooking.save();
    res.status(201).json({ success: true, message: "Movie booking confirmed", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save movie booking" });
  }
});

export default router;
