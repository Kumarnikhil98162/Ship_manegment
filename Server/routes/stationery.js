// routes/stationeryRoutes.js
import express from "express";
import StationeryOrder from "../models/StationeryOrder.js";

const router = express.Router();

// POST - Add new order
router.post("/", async (req, res) => {
  try {
    const { userId, userName, items, note } = req.body;

    if (!userName || !items || !items.length) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const order = new StationeryOrder({
      userId: userId || null,
      userName, // ✅ now saving userName
      items,
      note,
      status: "pending",
    });

    await order.save();
    res.json({ success: true, message: "Order saved successfully", order });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// GET - Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await StationeryOrder.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

export default router;
