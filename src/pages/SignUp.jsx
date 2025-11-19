import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      if (profilePic) formData.append("profilePic", profilePic);

      await registerUser(formData);

      navigate("/login");
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

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <h2 className="text-center text-3xl font-semibold text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-white text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/75 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/75 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/75 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="9876543210"
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
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/75 outline-none focus:ring-2 focus:ring-white/70"
              placeholder="••••••••"
            />
          </div>

          {/* Profile Pic */}
          <div>
            <label className="text-white text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              onChange={handleFile}
              className="w-full mt-1 p-2 rounded-lg bg-white/30 text-white cursor-pointer"
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Go to Login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3 mt-3 text-md font-medium text-white/90 hover:text-white transition active:scale-95"
          >
            Already have an account? Login
          </button>

        </form>
      </motion.div>
    </div>
  );
}
