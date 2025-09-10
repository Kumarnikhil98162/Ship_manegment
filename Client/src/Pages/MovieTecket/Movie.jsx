import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovieOrder } from "../../api"; // Correct path to api.js

function Movie() {
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [tickets, setTickets] = useState("");
  const [seatType, setSeatType] = useState("Regular");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!movie || !date || !tickets) {
      alert("Please fill all required details.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await createMovieOrder({ movie, date, tickets, seatType });

      if (res.message) {
        setConfirmed(true);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // popup disappears after 3s
      } else {
        setErrorMsg(res.error || "Booking failed. Try again.");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col relative">
      {/* Top popup */}
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideDown">
          🎉 Thank you! Your booking is confirmed.
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-lg">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/dashboard")}
        >
          Go Home
        </button>
        <h1 className="text-xl font-bold">🎬 Book Movie Tickets</h1>
        <div></div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        {!confirmed ? (
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl">
            {errorMsg && <p className="text-red-400 mb-4 text-center">{errorMsg}</p>}

            {/* Movie Selection */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Select Movie</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
              >
                <option value="">-- Choose a movie --</option>
                <option value="Inception">Inception</option>
                <option value="Interstellar">Interstellar</option>
                <option value="Oppenheimer">Oppenheimer</option>
                <option value="Avengers: Endgame">Avengers: Endgame</option>
              </select>
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Show Date</label>
              <input
                type="date"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Tickets */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Number of Tickets</label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
              />
            </div>

            {/* Seat Type */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Seat Type</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={seatType}
                onChange={(e) => setSeatType(e.target.value)}
              >
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* Confirm Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-lg transition disabled:opacity-50"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "🎟️ Confirm Booking"}
            </button>
          </div>
        ) : (
          // Confirmation
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">✅ Booking Confirmed!</h2>
            <p className="mb-3 text-lg">Movie: <span className="font-medium">{movie}</span></p>
            <p className="mb-3 text-lg">Date: <span className="font-medium">{date}</span></p>
            <p className="mb-3 text-lg">Tickets: <span className="font-medium">{tickets}</span></p>
            <p className="mb-6 text-lg">Seat Type: <span className="font-medium">{seatType}</span></p>

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

      {/* Simple slide-down animation */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Movie;
