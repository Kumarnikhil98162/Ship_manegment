// src/pages/Stationary.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createStationeryOrder } from "../../api";

function Stationary() {
  const [userName, setUserName] = useState(""); // ✅ added
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!userName || !item || !quantity || !date) {
      alert("Please fill all required details.");
      return;
    }

    const result = await createStationeryOrder({
      userName, // ✅ send userName
      items: [{ name: item, quantity: Number(quantity) }],
      note,
    });

    if (result.success) {
      setConfirmed(true);
      setToast("✅ Order placed successfully!");
    } else {
      setToast("❌ Failed to save order");
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-down z-50">
          {toast}
        </div>
      )}

      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-lg">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/dashboard")}
        >
          Go Home
        </button>
        <h1 className="text-xl font-bold">✏️ Order Stationery</h1>
        <div></div>
      </header>

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

            {/* Item */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Select Item</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              >
                <option value="">-- Choose an item --</option>
                <option value="Pen">Pen</option>
                <option value="Notebook">Notebook</option>
                <option value="File">File</option>
                <option value="Paper Pack">Paper Pack</option>
                <option value="Stapler">Stapler</option>
                <option value="Markers">Markers</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">Required By</label>
              <input
                type="date"
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Note */}
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium">
                Special Instructions (Optional)
              </label>
              <textarea
                className="w-full p-4 rounded-lg bg-gray-700 text-white"
                placeholder="Any specific brand or type?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-lg transition"
              onClick={handleBooking}
            >
              📝 Place Order
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">✅ Thank You for Ordering!</h2>
            <p className="mb-3 text-lg">
              Name: <span className="font-medium">{userName}</span>
            </p>
            <p className="mb-3 text-lg">
              Item: <span className="font-medium">{item}</span>
            </p>
            <p className="mb-3 text-lg">
              Quantity: <span className="font-medium">{quantity}</span>
            </p>
            <p className="mb-3 text-lg">
              Required By: <span className="font-medium">{date}</span>
            </p>
            {note && (
              <p className="mb-6 text-lg">
                Note: <span className="font-medium">{note}</span>
              </p>
            )}

            <div className="flex gap-4 justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg"
                onClick={() => setConfirmed(false)}
              >
                Order More
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

export default Stationary;
