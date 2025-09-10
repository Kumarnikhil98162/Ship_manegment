// models/Food.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
  category: { type: String },
  rating: { type: Number, default: 0 }
});

const Food = mongoose.model("Food", foodSchema);
export default Food;   // 👈 ESM export
