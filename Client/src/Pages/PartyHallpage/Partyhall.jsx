import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHallBooking } from "../../api"; // 👈 import API function

function PartyHall() {
  const [userName, setUserName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [catering, setCatering] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!userName || !occasion || !date || !guests) {
      alert("Please fill all required details.");
      return;
    }

    const bookingData = {
      userName,
      occasion,
      date,
      guests: Number(guests),
      catering,
    };

    try {
      const res = await createHallBooking(bookingData);
      if (res._id) {
        setConfirmed(true);
      } else {
        alert("❌ Failed to save booking");
      }
    } catch (err) {
      console.error("Error saving hall booking:", err);
      alert("❌ Server error while booking hall");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex flex-col">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-lg">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/dashboard")}
        >
          Go Home
        </button>
        <h1 className="text-xl font-bold">🎉 Book Party Hall</h1>
        <div></div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        {!confirmed ? (
          <div className="w-full max-w-3xl bg-gray-800 p-10 rounded-2xl shadow-2xl">
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

            {/* Occasion */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Occasion</label>
              <input
                type="text"
                placeholder="e.g. Birthday, Wedding, Office Party"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Event Date</label>
              <input
                type="date"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Number of Guests</label>
              <input
                type="number"
                min="10"
                placeholder="Enter guest count"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>

            {/* Catering */}
            <div className="mb-6 flex items-center gap-3">
              <input
                type="checkbox"
                checked={catering}
                onChange={(e) => setCatering(e.target.checked)}
              />
              <span className="text-lg">Include Catering Service</span>
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-lg font-semibold text-lg transition"
              onClick={handleBooking}
            >
              ✅ Confirm Booking
            </button>
          </div>
        ) : (
          // Confirmation
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">✅ Booking Confirmed!</h2>
            <p className="mb-3 text-lg">Name: <span className="font-medium">{userName}</span></p>
            <p className="mb-3 text-lg">Occasion: <span className="font-medium">{occasion}</span></p>
            <p className="mb-3 text-lg">Date: <span className="font-medium">{date}</span></p>
            <p className="mb-3 text-lg">Guests: <span className="font-medium">{guests}</span></p>
            <p className="mb-6 text-lg">
              Catering: <span className="font-medium">{catering ? "Yes" : "No"}</span>
            </p>

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

export default PartyHall;
