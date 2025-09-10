import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movie: { type: String, required: true },
  date: { type: String, required: true },
  tickets: { type: Number, required: true },
  seatType: { type: String, required: true },
    status: { type: String, default: "pending" }, // ✅ add this
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("MovieOrder", movieSchema);
