import { useRef } from "react";
import { motion } from "framer-motion";

export default function UserDashboardHome({ onNavigateToCars }) {
  const sectionsRef = useRef([]);

  const features = [
    { title: "Fast Booking", desc: "Reserve your car in minutes, anytime." },
    { title: "Affordable Prices", desc: "Competitive rates for all vehicles." },
    { title: "24/7 Support", desc: "We’re here whenever you need us." },
    { title: "Wide Selection", desc: "From economy to luxury cars." },
  ];

  const services = [
    { title: "Daily Rentals", desc: "Flexible rental periods to suit your schedule." },
    { title: "Airport Pickup", desc: "Convenient rides right from the airport." },
    { title: "Long-term Rentals", desc: "Special discounts for extended bookings." },
    { title: "Corporate Packages", desc: "Tailored plans for businesses." },
  ];

  const timings = [
    { day: "Monday - Friday", hours: "08:00 AM - 08:00 PM" },
    { day: "Saturday", hours: "09:00 AM - 06:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 04:00 PM" },
  ];

  const whyUs = [
    "Trusted by thousands of customers worldwide",
    "Transparent pricing with no hidden fees",
    "Top-rated customer service",
    "Wide range of cars for every need",
  ];

  const testimonials = [
    { name: "Gurnoor kaur ", text: "Amazing service! The car was spotless and the booking was instant." },
    { name: "Amita Thakur", text: "Affordable rates and 24/7 support made my trip stress-free." },
    { name: "Ramesh Trave   ler", text: "Highly recommend! Great selection of cars for every occasion." },
  ];

  const handleExploreCars = () => {
    if (onNavigateToCars) {
      onNavigateToCars();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Motion variants for fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="p-6 w-full bg-gray-50">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 tracking-tight"
      >
        Welcome to Your Car Rental Dashboard 🚗
      </motion.h1>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl mb-16"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-white rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Plan Your Next Ride</h2>
          <p className="opacity-90 mb-6 text-lg">
            Fast, easy, and affordable rentals at your fingertips
          </p>
          <motion.button
            onClick={handleExploreCars}
            whileHover={{ scale: 1.08 }}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg text-lg cursor-pointer"
          >
            Explore Cars
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[0] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[1] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timings Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[2] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Operating Hours</h2>
        <div className="bg-white p-6 rounded-3xl shadow-md">
          {timings.map((t, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span className="font-medium">{t.day}</span>
              <span className="text-gray-600">{t.hours}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Us Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[3] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <ul className="list-disc list-inside space-y-3 bg-white p-6 rounded-3xl shadow-md">
          {whyUs.map((item, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={fadeUp}
              className="text-gray-700 font-medium"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[4] = el)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <p className="text-gray-600 mb-4">"{t.text}"</p>
              <h3 className="font-semibold text-gray-800">{t.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
