import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import gymRoutes from "./routes/gym.js";
import salonRoutes from "./routes/salon.js";
import stationeryRoutes from "./routes/stationery.js";
import movieRoutes from "./routes/movie.js";
import hallRoutes from "./routes/hall.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);          // auth
app.use("/api/foods", foodRoutes);         // catering orders
app.use("/api/stationery", stationeryRoutes); // stationery orders
app.use("/api/gym", gymRoutes);            // gym bookings
app.use("/api/salon", salonRoutes);        // salon bookings
app.use("/api/movies", movieRoutes);       // movie bookings
app.use("/api/hall", hallRoutes);          // hall bookings
app.use("/api/admin", adminRoutes);        // admin dashboard routes

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Ship Management API is running");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
