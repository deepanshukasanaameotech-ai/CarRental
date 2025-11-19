import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  // Motion variant for subtle fade-up/parallax
  const parallax = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <AdminNavbar />
      <main className="pt-24 px-6 pb-10 bg-gray-50 min-h-screen">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">
            Admin dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Welcome back 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Use the navigation above to manage cars, review bookings, or monitor your platform activity.
          </p>
        </motion.section>

        {/* Quick Access Cards */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Manage Cars",
              description: "Add, update, or remove vehicles from your fleet.",
              link: "/admin/manage-cars",
              cta: "Go to cars",
            },
            {
              title: "Bookings",
              description: "Approve, reject, or review booking requests.",
              link: "/admin/bookings",
              cta: "View bookings",
            },
            {
              title: "User Accounts",
              description: "Manage user accounts and access permissions.",
              link: "/admin/users",
              cta: "Manage users",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={parallax}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <Link
                to={card.link}
                className="flex flex-col justify-between p-5 h-full"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
                  <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-blue-600 font-semibold">
                  {card.cta} →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        <motion.section
          className="max-w-6xl mx-auto mb-12 space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              View the latest platform activity, including new bookings, vehicle updates, and user actions.
            </p>
          </div>
        </motion.section>

        {/* Inventory Management Section */}
        <motion.section
          className="max-w-6xl mx-auto mb-12 space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">Inventory Overview</h2>
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              Monitor the status of your vehicles, track availability, and update information for your fleet.
            </p>
          </div>
        </motion.section>

        {/* Pending Approvals Section */}
        <motion.section
          className="max-w-6xl mx-auto mb-12 space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">Pending Approvals</h2>
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              Check all pending booking requests, vehicle updates, or user registrations that require your approval.
            </p>
          </div>
        </motion.section>

        {/* Reports Section */}
        <motion.section
          className="max-w-6xl mx-auto mb-12 space-y-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">Reports</h2>
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              Access sales, booking, and user activity reports to make informed decisions about your fleet management.
            </p>
          </div>
        </motion.section>
      </main>
    </>
  );
}
