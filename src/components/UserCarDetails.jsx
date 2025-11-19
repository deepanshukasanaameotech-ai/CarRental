import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, createBooking } from "../api";
import { buildImageUrl, PLACEHOLDER_CAR_LARGE as PLACEHOLDER_CAR } from "../utils/imageUtils";

export default function UserCarDetails({ car: initialCar = null, goBack }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const resolvedId = initialCar?._id || id;

  const [car, setCar] = useState(initialCar);
  const [loading, setLoading] = useState(!initialCar);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  // Fetch one car when navigated directly
  useEffect(() => {
    if (car || !resolvedId) return;

    let ignore = false;

    async function loadCar() {
      try {
        const res = await getCarById(resolvedId);
        if (!ignore) setCar(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadCar();

    return () => {
      ignore = true;
    };
  }, [car, resolvedId]);

  const totalDays = useMemo(() => {
    if (!dates.startDate || !dates.endDate) return 0;
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    const diff = end.getTime() - start.getTime();
    if (Number.isNaN(diff) || diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [dates]);

  const totalPrice = useMemo(() => {
    if (!car || !totalDays) return 0;
    const price = Number(car.pricePerDay) || 0;
    return price * totalDays;
  }, [car, totalDays]);

  const resetFeedback = () => {
    setBookingError("");
    setBookingSuccess("");
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!car || !resolvedId) {
      setBookingError("Car details not found. Please try again.");
      return;
    }

    if (!dates.startDate || !dates.endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }

    if (!totalDays) {
      setBookingError("End date must be after start date.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setBookingError("Please login to continue.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user?._id || user?.id;
    if (!userId) {
      setBookingError("Unable to read your account details. Please relogin.");
      return;
    }

    setBookingLoading(true);

    try {
      await createBooking({
        user: userId,
        car: resolvedId,
        startDate: dates.startDate,
        endDate: dates.endDate,
        pickupLocation,
        dropLocation,
        totalPrice,
      });

      setBookingSuccess("Booking request sent! We'll notify you once it's approved.");
      setDates({ startDate: "", endDate: "" });
      setPickupLocation("");
      setDropLocation("");

      setTimeout(() => {
        navigate("/dashboard/bookings");
      }, 1000);
    } catch (error) {
      setBookingError(error.message || "Failed to create booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-xl font-semibold">
        Loading car details...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="p-6 text-center text-xl text-red-500">
        Car not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        {/* Car Image */}
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={buildImageUrl(car.image) || PLACEHOLDER_CAR}
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Car Info */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold">
            {car.brand} {car.name}
          </h2>
          <p className="text-gray-600 mt-1">Type: {car.type}</p>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Fuel Type</p>
              <p className="text-lg font-semibold">{car.fuelType}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Transmission</p>
              <p className="text-lg font-semibold">{car.transmission}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Price Per Day</p>
              <p className="text-xl font-bold text-blue-600">₹{car.pricePerDay}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Available</p>
              <p className="text-lg font-semibold">
                {car.available === true ||
                car.available === "true" ||
                car.available === 1
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Request This Car</h3>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm font-medium text-gray-600">
                Start date
                <input
                  type="date"
                  value={dates.startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setDates((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                  className="mt-1 rounded-lg border px-3 py-2"
                  required
                />
              </label>

              <label className="flex flex-col text-sm font-medium text-gray-600">
                End date
                <input
                  type="date"
                  value={dates.endDate}
                  min={dates.startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setDates((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  className="mt-1 rounded-lg border px-3 py-2"
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm font-medium text-gray-600">
                Pickup location
                <input
                  type="text"
                  placeholder="e.g. Chandigarh Airport"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="mt-1 rounded-lg border px-3 py-2"
                  required
                />
              </label>

              <label className="flex flex-col text-sm font-medium text-gray-600">
                Drop location
                <input
                  type="text"
                  placeholder="e.g. Downtown Chandigarh"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="mt-1 rounded-lg border px-3 py-2"
                  required
                />
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600">Estimated rental</p>
                <p className="text-lg font-semibold text-blue-700">
                  {totalDays
                    ? `${totalDays} day${totalDays > 1 ? "s" : ""}`
                    : "Choose dates"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Total price</p>
                <p className="text-2xl font-bold text-blue-700">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {bookingError && (
              <p className="text-red-600 text-sm font-medium">{bookingError}</p>
            )}

            {bookingSuccess && (
              <p className="text-green-600 text-sm font-medium">{bookingSuccess}</p>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={bookingLoading}
                className="flex-1 min-w-[200px] py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-md transition active:scale-95 disabled:opacity-60"
              >
                {bookingLoading ? "Placing booking..." : "Confirm Booking"}
              </button>

              {(goBack || !initialCar) && (
                <button
                  type="button"
                  onClick={() => {
                    if (goBack) goBack();
                    else navigate("/user/dashboard");
                  }}
                  className="flex-1 min-w-[140px] py-3 bg-gray-100 text-gray-700 text-lg rounded-xl shadow-inner hover:bg-gray-200"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
