import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
      } else {
        console.log("✅ Logged in user:", data.user);

        // Redirect immediately to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("❌ Error during login:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <div className="text-right">
        <a
          href="/forgot-password"
          className="text-sm text-blue-400 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
