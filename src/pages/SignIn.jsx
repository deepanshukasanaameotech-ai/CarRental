import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("role", res.user.role);

      if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full -z-10"></div>

      {/* App Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-white tracking-wide drop-shadow mb-6"
      >
        CarRental
      </motion.h1>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <h2 className="text-center text-3xl font-semibold text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-white text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="bg-red-500/90 text-white p-2 rounded-lg text-center text-sm">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 text-lg font-semibold bg-white text-indigo-700 rounded-xl shadow-xl hover:bg-gray-100 transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>

        </form>

        {/* Link to Signup */}
        <p className="text-white/90 mt-5 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-white font-semibold underline cursor-pointer hover:text-gray-200"
          >
            Create One
          </span>
        </p>
      </motion.div>
    </div>
  );
}
