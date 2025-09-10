import express from "express";
import CateringOrder from "../models/Food.js";
import StationeryOrder from "../models/StationeryOrder.js";
import GymBooking from "../models/GymBooking.js";
import HallBooking from "../models/HallBooking.js";
import MovieOrder from "../models/Movie.js";
import SalonBooking from "../models/SalonBooking.js";

const router = express.Router();

// Helper function to get model by section
function getModelBySection(section) {
  switch (section) {
    case "catering": return CateringOrder;
    case "stationery": return StationeryOrder;
    case "gym": return GymBooking;
    case "hall": return HallBooking;
    case "movies": return MovieOrder;
    case "salon": return SalonBooking;
    default: return null;
  }
}

// GET orders for any section dynamically
router.get("/:section", async (req, res) => {
  try {
    const { section } = req.params;
    console.log(`📌 GET /api/admin/${section} hit`);

    const Model = getModelBySection(section);
    if (!Model) {
      console.warn("❌ Invalid section:", section);
      return res.status(400).json({ success: false, message: "Invalid section" });
    }

    const orders = await Model.find().sort({ createdAt: -1 });
    console.log(`📌 Found ${orders.length} orders in section "${section}"`);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// PUT update status for any section
router.put("/:section/:id", async (req, res) => {
  try {
    const { section, id } = req.params;
    const { status } = req.body;
    console.log(`📌 PUT /api/admin/${section}/${id} with status=${status}`);

    const Model = getModelBySection(section);
    if (!Model) return res.status(400).json({ success: false, message: "Invalid section" });

    const updated = await Model.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      console.warn(`⚠️ No order found with id=${id} in section "${section}"`);
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    console.log("✅ Order updated:", updated);
    res.json({ success: true, updated });
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

export default router;
