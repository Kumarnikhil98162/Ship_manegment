import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { getFoods } from "../../api";   // 👈 import from your api.js

function Catring() {
  const [menu, setMenu] = useState([]); // backend data
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getFoods()
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  // search filter
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">
        <h1 className="text-xl font-bold text-sky-400">
          🍽️ Catering & Food Orders
        </h1>

        {/* Navigation: Home + Profile */}
        <nav className="space-x-6 font-medium">
          <Link to="/Dashboard" className="hover:text-sky-400 transition">
            🏠 Home
          </Link>
          <Link to="/profile" className="hover:text-sky-400 transition">
            👤 Profile
          </Link>
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-lg transition"
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Cart ({cart.length})
        </button>
      </header>

      {/* Search */}
      <div className="px-6 mt-6">
        <input
          type="text"
          placeholder="🔍 Search food…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {filteredMenu.map((item) => (
          <div
            key={item._id} // 👈 use _id from MongoDB
            className="bg-gray-800 shadow-lg rounded-2xl p-5 hover:shadow-2xl hover:scale-105 transition"
          >
            <h3 className="font-semibold text-lg flex justify-between items-center">
              {item.name}
              <span className="text-sky-400 font-bold">₹{item.price}</span>
            </h3>
            <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
            <div className="text-yellow-400 text-sm mt-2">⭐ {item.rating}</div>
            <button
              onClick={() => addToCart(item)}
              className="w-full mt-4 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-500 transition"
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-xl p-5 overflow-y-auto border-l border-gray-700">
          <button
            onClick={() => setIsCartOpen(false)}
            className="mb-4 text-red-500 font-bold hover:text-red-400 transition"
          >
            ✖ Close
          </button>
          <h2 className="text-xl font-bold mb-4 text-sky-400">🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3"
              >
                <p className="text-sm">{item.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-sky-400">₹{item.price}</p>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="mt-4 font-bold text-lg">
            Subtotal: <span className="text-sky-400">₹{subtotal}</span>
          </div>
          <button className="w-full mt-5 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition">
            ✅ Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Catring;
