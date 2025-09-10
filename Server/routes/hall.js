import express from "express";
import HallBooking from "../models/HallBooking.js";

const router = express.Router();

// Create a new hall booking (user side)
router.post("/", async (req, res) => {
  try {
    const { userName, occasion, date, guests, catering } = req.body;

    if (!userName || !occasion || !date || !guests) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const booking = new HallBooking({
      userName,
      occasion,
      date,
      guests,
      catering,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error saving hall booking:", err);
    res.status(500).json({ success: false, message: "Failed to save booking" });
  }
});

// Get all hall bookings (user side if needed)
router.get("/", async (req, res) => {
  try {
    const bookings = await HallBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
