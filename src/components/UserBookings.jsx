import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingsByUser } from "../api";
import AdminNavbar from "./AdminNavbar";
import { buildImageUrl, PLACEHOLDER_CAR_SMALL as PLACEHOLDER_CAR } from "../utils/imageUtils";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // 1️⃣ Get user from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      // 2️⃣ Parse user
      const user = JSON.parse(storedUser);

      const userId = user?._id || user?.id;
      if (!userId) {
        setError("Could not find your user id. Please login again.");
        setLoading(false);
        return;
      }

      // 4️⃣ Fetch bookings
      const response = await getBookingsByUser(userId);

      const normalized = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.bookings)
            ? response.bookings
            : [];

      setBookings(normalized);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const navigate = useNavigate();

  // -------------------------
  // UI STATES
  // -------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-medium">
        Loading bookings…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={loadBookings}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        You have no bookings yet.
      </div>
    );
  }

  // -------------------------
  // BOOKINGS LIST
  // -------------------------
  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const car =
            (booking.car && typeof booking.car === "object" ? booking.car : null) ||
            (booking.carId && typeof booking.carId === "object" ? booking.carId : null) ||
            {};
          const start = booking.startDate || booking.from;
          const end = booking.endDate || booking.to;
          const bookingStatus = (booking.bookingStatus || booking.status || "pending").toLowerCase();
          const paymentStatus = (booking.paymentStatus || "pending").toLowerCase();
          const total =
            Number(
              booking.totalPrice || booking.total || booking.amount || booking.price
            ) || 0;

          const statusColor = (status) => {
            if (status === "confirm" || status === "approved" || status === "paid") return "text-green-600";
            if (status === "pending") return "text-yellow-600";
            return "text-red-600";
          };

          return (
            <div
              key={booking._id || `${car._id}-${start}`}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              {/* Car Details */}
              <div className="flex items-center gap-4">
                <img
                  src={buildImageUrl(car.image) || PLACEHOLDER_CAR}
                  alt={car.name || "Car"}
                  className="w-28 h-20 object-cover rounded-lg"
                />

                <div>
                  <h3 className="text-lg font-semibold">
                    {(car.brand ? `${car.brand} ` : "") + (car.name || "Car")}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Fuel: {car.fuelType || "N/A"}
                  </p>

                  <p className="text-gray-600 text-sm">
                    Rent: ₹{car.pricePerDay || booking.pricePerDay || "—"}/day
                  </p>
                </div>
              </div>

              {/* Booking Info */}
              <div className="mt-4 border-t pt-3 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">From:</span>{" "}
                  {start ? new Date(start).toLocaleDateString() : "—"}
                </p>

                <p>
                  <span className="font-semibold">To:</span>{" "}
                  {end ? new Date(end).toLocaleDateString() : "—"}
                </p>

                {booking.pickupLocation && (
                  <p>
                    <span className="font-semibold">Pickup:</span>{" "}
                    {booking.pickupLocation}
                  </p>
                )}

                {booking.dropLocation && (
                  <p>
                    <span className="font-semibold">Drop:</span>{" "}
                    {booking.dropLocation}
                  </p>
                )}

                <p className="mt-2 font-semibold text-lg">
                  Total Price: ₹{total.toLocaleString("en-IN")}
                </p>

                <p className={`mt-2 font-medium ${statusColor(bookingStatus)}`}>
                  Booking Status: {bookingStatus.toUpperCase()}
                </p>

                <p className={`font-medium ${statusColor(paymentStatus)}`}>
                  Payment: {paymentStatus.toUpperCase()}
                </p>


              </div>

              <button
                onClick={() => {
                  localStorage.setItem("checkout_amount", total);
                  navigate("/checkout");
                }}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Pay Now
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookings;
