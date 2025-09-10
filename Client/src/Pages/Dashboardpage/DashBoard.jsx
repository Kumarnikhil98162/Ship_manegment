import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, PenTool, Film, Scissors, Dumbbell, Building2, ClipboardList } from "lucide-react";

function DashBoard() {
   const navigate = useNavigate();
   const [message, setMessage] = useState("");

  
  const handleLogout = () => {
    // Clear session/localstorage if needed
    navigate("/");
  };

  

  // Menu items with navigation paths
  const menuItems = [
    { label: "Order Catering", icon: <Utensils size={24} />, path: "/Catering" },
    { label: "Order Stationery", icon: <PenTool size={24} />, path: "/stationery" },
    { label: "Book Resort-Movie Tick", icon: <Film size={24} />, path: "/movie" },
    { label: "Book Beauty Salon", icon: <Scissors size={24} />, path: "/Beauty" },
    { label: "Book Fitness Center", icon: <Dumbbell size={24} />, path: "/Gym" },
    { label: "Book Party Hall", icon: <Building2 size={24} />, path: "/Partyhall" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Header Bar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-800 shadow-lg">
        <h1 className="text-xl font-bold">Welcome </h1>
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition"
              onClick={() => navigate(item.path)} // 👈 Navigate to page
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}

          {/* Full-width button */}
          <button
            className="col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition"
            onClick={() => navigate("/Profile")} // 👈 Navigate to orders page
          >
            <ClipboardList size={22} />
            <span className="font-medium">View My Orders & Bookings</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;
