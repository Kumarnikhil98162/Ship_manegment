import mongoose from "mongoose";

const SalonBookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  service: { type: String, required: true }, // example: haircut, massage, facial
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" } // pending | approved | rejected
});

const SalonBooking = mongoose.model("SalonBooking", SalonBookingSchema);
export default SalonBooking;
