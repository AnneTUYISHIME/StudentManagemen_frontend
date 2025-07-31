// src/components/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://student-managementsystem-6xz7.onrender.com/api/auth/forgot-password",
        { email }
      );
      setMessage(res.data.message || "✅ Check your email for the reset link.");
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Forgot Password
        </h2>

        <label className="block mb-2 font-semibold" htmlFor="email">
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-green-600">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
