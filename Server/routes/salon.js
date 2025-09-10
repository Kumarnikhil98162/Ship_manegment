import express from "express";
import SalonBooking from "../models/SalonBooking.js";

const router = express.Router();

// 📌 Create new salon appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new SalonBooking(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Get all salon appointments (user side, if needed)
router.get("/", async (req, res) => {
  try {
    const appointments = await SalonBooking.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
