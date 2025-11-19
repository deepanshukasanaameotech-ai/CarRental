import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-center text-3xl font-bold text-white mb-6 drop-shadow">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-white text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="9876543210"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="••••••••"
            />
          </div>

          {/* Profile Pic */}
          <div>
            <label className="text-white text-sm">Profile Picture</label>
            <input
              type="file"
              onChange={handleFile}
              className="w-full p-2 rounded-lg bg-white/40 text-white cursor-pointer"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="bg-red-500/80 text-white p-2 rounded-lg text-center text-sm">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 text-lg font-semibold bg-white text-blue-600 rounded-xl shadow-md hover:bg-gray-100 transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3 mt-3 text-md font-medium text-blue-500 hover:text-blue-700 transition active:scale-95"
          >
            Already have an account? Login
          </button>

        </form>
      </div>
    </div>
  );
}
