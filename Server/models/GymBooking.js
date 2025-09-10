import mongoose from "mongoose";

const GymBookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  plan: { type: String, required: true },
  slot: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

const GymBooking = mongoose.model("GymBooking", GymBookingSchema);
export default GymBooking;
