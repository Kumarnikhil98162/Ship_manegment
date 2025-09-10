// routes/food.js
import express from "express";
import Food from "../models/Food.js";   // 👈 import model

const router = express.Router();

// GET all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();  // fetch from MongoDB
    res.json(foods);
  } catch (err) {
    console.error("Error fetching foods:", err);
    res.status(500).json({ message: "Failed to fetch foods" });
  }
});

// POST new food
router.post("/", async (req, res) => {
  try {
    const { name, price, desc, category, rating } = req.body;
    const newFood = new Food({ name, price, desc, category, rating });
    await newFood.save();
    res.json({ message: "✅ Food added", food: newFood });
  } catch (err) {
    console.error("Error adding food:", err);
    res.status(500).json({ message: "Failed to add food" });
  }
});

export default router;
