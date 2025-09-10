// src/pages/Gym.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGymBooking } from "../../api"; // 👈 use API helper

function Gym() {
  const [userName, setUserName] = useState(""); // 👈 NEW
  const [plan, setPlan] = useState("");
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!userName || !plan || !time) {
      alert("Please enter your name, select a plan and time slot.");
      return;
    }

    try {
      await createGymBooking({
        userName, // 👈 use real name from input
        plan,
        slot: time,
        date: new Date().toISOString(),
      });
      setConfirmed(true);
    } catch (err) {
      console.error("Error booking gym:", err);
      alert("Something went wrong while booking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-lg">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/dashboard")}
        >
          Go Home
        </button>
        <h1 className="text-xl font-bold">🏋️ Gym & Fitness Booking</h1>
        <div></div>
      </header>

      {/* Main Section */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        {!confirmed ? (
          <div className="w-full max-w-3xl bg-gray-800 p-10 rounded-2xl shadow-2xl">
            {/* User Name */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Name</h2>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 rounded-lg bg-gray-700 text-white text-lg"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Membership Plans */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Membership Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Monthly - $30", "Quarterly - $80", "Yearly - $300"].map((p, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer ${
                      plan === p ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={p}
                      checked={plan === p}
                      onChange={() => setPlan(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Preferred Time Slot</h2>
              <select
                className="w-full p-4 rounded-lg bg-gray-700 text-white text-lg"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">-- Select a slot --</option>
                <option value="Morning (6 AM - 9 AM)">Morning (6 AM - 9 AM)</option>
                <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                <option value="Evening (6 PM - 9 PM)">Evening (6 PM - 9 PM)</option>
              </select>
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-lg font-semibold text-lg transition"
              onClick={handleBooking}
            >
              ✅ Confirm Booking
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">✅ Booking Confirmed!</h2>
            <p className="mb-3 text-lg">Name: <span className="font-medium">{userName}</span></p>
            <p className="mb-3 text-lg">Plan: <span className="font-medium">{plan}</span></p>
            <p className="mb-6 text-lg">Time Slot: <span className="font-medium">{time}</span></p>

            <div className="flex gap-4 justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg"
                onClick={() => setConfirmed(false)}
              >
                Book Another
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 px-6 py-3 rounded-lg text-lg"
                onClick={() => navigate("/dashboard")}
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Gym;
