import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-gray-300/30 p-10 rounded-3xl shadow-xl"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold text-gray-800 text-center mb-6"
        >
          Contact Us
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-10"
        >
          We're here to help! Have a question, feedback, or need support?
          Reach out and our team will get back to you quickly.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="flex items-center gap-4 bg-white/20 p-5 rounded-2xl border border-white/40 shadow">
              <Mail className="w-7 h-7 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                <p className="text-gray-700">support@autorentx.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 bg-white/20 p-5 rounded-2xl border border-white/40 shadow">
              <Phone className="w-7 h-7 text-green-600" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 bg-white/20 p-5 rounded-2xl border border-white/40 shadow">
              <MapPin className="w-7 h-7 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Address</h3>
                <p className="text-gray-700">AutoRentX HQ, New Delhi, India</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div>
              <label className="text-gray-700 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/30 backdrop-blur-xl text-gray-800 placeholder-gray-500 outline-none border border-white/40"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/30 backdrop-blur-xl text-gray-800 placeholder-gray-500 outline-none border border-white/40"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full p-3 rounded-xl bg-white/30 backdrop-blur-xl text-gray-800 placeholder-gray-500 outline-none border border-white/40"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2"
            >
              Send Message <Send className="w-5 h-5" />
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
