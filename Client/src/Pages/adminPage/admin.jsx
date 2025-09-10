// src/pages/adminPage/Admin.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getAllCateringOrders,
  getAllStationeryOrders,
  getAllGymBookings,
  getAllHallBookings,
  getAllMovieBookings,
  getAllSalonBookings,
  updateOrderStatus,
} from "../../api";

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Determine current section from URL
  const section = location.pathname.split("/")[2]; // 'catering', 'stationery', etc.

  // Fetch data dynamically based on section
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result = [];
      try {
        switch (section) {
          case "catering":
            result = await getAllCateringOrders();
            break;
          case "stationery":
            result = await getAllStationeryOrders();
            break;
          case "gym":
            result = await getAllGymBookings();
            break;
          case "hall":
            result = await getAllHallBookings();
            break;
          case "movies":
            result = await getAllMovieBookings();
            break;
          case "salon":
            result = await getAllSalonBookings();
            break;
          default:
            result = [];
        }
        console.log(`Fetched ${section} orders:`, result); // debug
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section]);

  // Update order status
  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(section, id, status);
      const updatedData = data.map((item) =>
        item._id === id ? { ...item, status } : item
      );
      setData(updatedData);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ✅ Universal field renderer
  const renderOrderFields = (item) => {
    const fields = [];

    for (const key in item) {
      if (
        key === "_id" ||
        key === "status" ||
        key === "__v" ||
        key === "createdAt" ||
        key === "updatedAt"
      )
        continue;

      const value = item[key];

      if (Array.isArray(value)) {
        // Handles items array (like stationery orders)
        fields.push(
          <p key={key}>
            <strong>{key}:</strong>{" "}
            {value.map((v, i) =>
              v.name ? `${v.name} (x${v.quantity})` : JSON.stringify(v)
            ).join(", ")}
          </p>
        );
      } else if (typeof value === "object" && value !== null) {
        fields.push(
          <p key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </p>
        );
      } else if (key.toLowerCase().includes("date")) {
        // Format date fields
        fields.push(
          <p key={key}>
            <strong>{key}:</strong> {new Date(value).toLocaleString()}
          </p>
        );
      } else {
        fields.push(
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        );
      }
    }

    return fields;
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold text-sky-400 mb-6">⚙️ Admin Panel</h2>
        <nav className="space-y-3">
          <Link to="/admin/catering" className="block hover:text-sky-400">
            🍽 Catering Orders
          </Link>
          <Link to="/admin/stationery" className="block hover:text-sky-400">
            ✏️ Stationery Orders
          </Link>
          <Link to="/admin/gym" className="block hover:text-sky-400">
            🏋️ Gym Bookings
          </Link>
          <Link to="/admin/hall" className="block hover:text-sky-400">
            🎉 Hall Bookings
          </Link>
          <Link to="/admin/movies" className="block hover:text-sky-400">
            🎬 Movie Bookings
          </Link>
          <Link to="/admin/salon" className="block hover:text-sky-400">
            💇‍♀️ Salon Appointments
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold capitalize">{section} Management</h1>

        {loading ? (
          <p className="text-gray-600 mt-2">Loading data...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-600 mt-2">No {section} orders found.</p>
        ) : (
          <div className="mt-5 space-y-4">
            {data.map((item) => (
  <div
    key={item._id}
    className="p-4 bg-white shadow rounded hover:shadow-lg transition cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <div>
        {/* ✅ Use universal renderer instead of hardcoding movie fields */}
        {renderOrderFields(item)}

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              item.status === "pending"
                ? "bg-yellow-500"
                : item.status === "confirmed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {item.status}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => handleStatusChange(item._id, "confirmed")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400"
        >
          Confirm
        </button>
        <button
          onClick={() => handleStatusChange(item._id, "rejected")}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
