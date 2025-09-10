import mongoose from "mongoose";

const hallBookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  occasion: { type: String, required: true },
  date: { type: Date, required: true },   // 👈 changed to Date
  guests: { type: Number, required: true },
  catering: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
}, { timestamps: true });

const HallBooking = mongoose.model("HallBooking", hallBookingSchema);
export default HallBooking;
