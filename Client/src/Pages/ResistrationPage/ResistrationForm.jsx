import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Use environment variable with a safe fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log("🌍 API URL:", API_URL); // Debugging log

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      // If backend sends empty response, avoid .json() crash
      let data = {};
      try {
        data = await res.json();
      } catch {
        console.error("⚠️ No JSON in response");
      }

      console.log("✅ Response:", data);

      if (res.ok) {
        alert("User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Request failed", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-96 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
