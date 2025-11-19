// src/pages/BookingsAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { getBookings, approveCancelRequest, deleteBooking } from "../api";
import { buildImageUrl, PLACEHOLDER_CAR_TINY as PLACEHOLDER_CAR } from "../utils/imageUtils";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // booking id for which action is running
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError("");
    try {
      const data = await getBookings();
      setBookings(Array.isArray(data) ? data : data?.bookings || data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    if (!confirm("Approve this booking?")) return;
    setActionLoading(id);
    try {
      await approveCancelRequest(id, "approve");
      await fetchBookings();
    } catch (err) {
      alert(err.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCancelApprove(id) {
    if (!confirm("Mark this booking as canceled?")) return;
    setActionLoading(id);
    try {
      await approveCancelRequest(id, "cancel");
      await fetchBookings();
    } catch (err) {
      alert(err.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this booking?")) return;
    setActionLoading(id);
    try {
      await deleteBooking(id);
      setBookings((b) => b.filter((x) => x._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="pt-6 mt-20 px-6">
        <AdminNavbar />
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <div>Loading bookings…</div>
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left">Booking ID</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Car</th>
                  <th className="p-2 text-left">From - To</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => {
                  const car =
                    (b.car && typeof b.car === "object" ? b.car : null) ||
                    (b.carId && typeof b.carId === "object" ? b.carId : null) ||
                    {};
                  const start = b.startDate || b.from;
                  const end = b.endDate || b.to;
                  const total = Number(b.totalPrice || b.total || b.amount || 0) || 0;
                  const bookingStatus = (b.bookingStatus || b.status || "pending").toLowerCase();
                  const paymentStatus = (b.paymentStatus || "pending").toLowerCase();

                  return (
                    <tr key={b._id} className="border-t align-top">
                      <td className="p-2">
                        <p className="font-mono text-sm">{b._id}</p>
                        {b.note && (
                          <p className="text-xs text-gray-500 mt-1">Note: {b.note}</p>
                        )}
                      </td>
                      <td className="p-2">
                        <p className="font-semibold">
                          {(b.user && b.user.fullName) || b.userName || "—"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(b.user && b.user.email) || b.userEmail || ""}
                        </p>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={buildImageUrl(car.image) || PLACEHOLDER_CAR}
                            alt={car.name || "Car"}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">
                              {(car.brand ? `${car.brand} ` : "") + (car.name || "Car")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {car.fuelType || "—"} · {car.transmission || "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-sm">
                        <p>{start ? new Date(start).toLocaleDateString() : "—"}</p>
                        <p className="text-gray-500">
                          {end ? new Date(end).toLocaleDateString() : "—"}
                        </p>
                        {b.pickupLocation && (
                          <p className="text-xs text-gray-500 mt-1">
                            Pickup: {b.pickupLocation}
                          </p>
                        )}
                        {b.dropLocation && (
                          <p className="text-xs text-gray-500">
                            Drop: {b.dropLocation}
                          </p>
                        )}
                      </td>
                      <td className="p-2 font-semibold">₹{total.toLocaleString("en-IN")}</td>
                      <td className="p-2">
                        <div className="space-y-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                              bookingStatus === "confirm" || bookingStatus === "approved"
                                ? "bg-green-100 text-green-700"
                                : bookingStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            Booking: {bookingStatus.toUpperCase()}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                              paymentStatus === "paid"
                                ? "bg-green-100 text-green-700"
                                : paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            Payment: {paymentStatus.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 space-y-2">
                        <button
                          onClick={() => handleApprove(b._id)}
                          disabled={actionLoading === b._id}
                          className="w-full px-3 py-1 bg-green-500 text-white rounded disabled:opacity-60"
                        >
                          {actionLoading === b._id ? "..." : "Approve"}
                        </button>

                        <button
                          onClick={() => handleCancelApprove(b._id)}
                          disabled={actionLoading === b._id}
                          className="w-full px-3 py-1 bg-yellow-400 rounded disabled:opacity-60"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleDelete(b._id)}
                          disabled={actionLoading === b._id}
                          className="w-full px-3 py-1 bg-red-500 text-white rounded disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
