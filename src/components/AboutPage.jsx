import { motion } from "framer-motion";
import { Sparkles, Star, Info, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen  p-6 flex items-center justify-center text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white/10 backdrop-blur-2xl border border-white/40 p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl font-extrabold drop-shadow-lg text-gray-800">
            About Us
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg leading-relaxed text-gray-700 mb-6"
        >
          Welcome to our premium car rental service, where comfort meets convenience.
          We aim to redefine your travel experience with high-quality vehicles,
          exceptional service, and seamless booking. Whether it's a road trip,
          business travel, or a weekend getaway — we've got the perfect ride for you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              To deliver reliable, stylish, and safe vehicles that suit every
              customer’s needs, ensuring an unforgettable travel experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 p-6 rounded-2xl border border-white/50 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-800">Why Choose Us</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              From affordable pricing to premium vehicles and 24/7 support — we
              ensure a smooth and hassle-free rental experience for every customer.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 text-center"
        >
          <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 active:scale-95 transition flex items-center gap-2 mx-auto">
            Learn More
            <Star className="w-5 h-5 text-yellow-400" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
