// models/StationeryOrder.js
import mongoose from "mongoose";

const StationeryOrderSchema = new mongoose.Schema(
  {
    // userId: { type: String }, // optional if you add authentication
    userName: { type: String, required: true }, // ✅ added userName
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number },
      },
    ],
    note: { type: String },
    totalPrice: { type: Number },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const StationeryOrder = mongoose.model("StationeryOrder", StationeryOrderSchema);
export default StationeryOrder;
