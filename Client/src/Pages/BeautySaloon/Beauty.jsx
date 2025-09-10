import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSalonBooking } from "../../api"; // ✅ correct relative path

function Beauty() {
  const [userName, setUserName] = useState(""); // 👈 NEW
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!userName || !service || !date || !time) {
      alert("Please fill all required details.");
      return;
    }

    try {
      const bookingData = {
        userName,   // 👈 take from input
        service,
        date,
        time,
        note,
      };

      await createSalonBooking(bookingData);
      setConfirmed(true);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Error booking appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-lg">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/dashboard")}
        >
          Go Home
        </button>
        <h1 className="text-xl font-bold">💇 Book Beauty Salon</h1>
        <div></div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        {!confirmed ? (
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl">
            {/* User Name */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Select Service</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">-- Choose a service --</option>
                <option value="Haircut">Haircut</option>
                <option value="Facial">Facial</option>
                <option value="Manicure">Manicure</option>
                <option value="Pedicure">Pedicure</option>
                <option value="Hair Spa">Hair Spa</option>
                <option value="Makeup">Makeup</option>
              </select>
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Appointment Date</label>
              <input
                type="date"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Time</label>
              <input
                type="time"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Special Requests (Optional)</label>
              <textarea
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                placeholder="Any special instructions?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-lg font-semibold text-lg transition"
              onClick={handleBooking}
            >
              💖 Confirm Booking
            </button>
          </div>
        ) : (
          // Confirmation
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">✅ Booking Confirmed!</h2>
            <p className="mb-3 text-lg">Name: <span className="font-medium">{userName}</span></p>
            <p className="mb-3 text-lg">Service: <span className="font-medium">{service}</span></p>
            <p className="mb-3 text-lg">Date: <span className="font-medium">{date}</span></p>
            <p className="mb-3 text-lg">Time: <span className="font-medium">{time}</span></p>
            {note && <p className="mb-6 text-lg">Note: <span className="font-medium">{note}</span></p>}

            <div className="flex gap-4 justify-center">
              <button
                className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg text-lg"
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

export default Beauty;
