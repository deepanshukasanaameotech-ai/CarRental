import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

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

      // assuming backend returns token + user
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30">
        <h2 className="text-center text-3xl font-bold text-white mb-6 drop-shadow">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

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
            {loading ? "Checking..." : "Login"}
          </button>

        </form>

        {/* Link to Signup */}
        <p className="text-white/80 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-white font-semibold underline cursor-pointer hover:text-gray-200"
          >
            Create One
          </span>
        </p>
      </div>
    </div>
  );

}
