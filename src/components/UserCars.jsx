import { useEffect, useState } from "react";
import { getCars } from "../api";
import { useNavigate } from "react-router-dom";
import { buildImageUrl, PLACEHOLDER_CAR } from "../utils/imageUtils";

export default function UserCars({ onSelectCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await getCars();
      const carList = Array.isArray(response) ? response : response?.cars || [];

      setCars(carList);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold py-10">Loading cars...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg py-10">{error}</div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cars.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No cars available.</p>
      ) : (
        cars.map((car) => {
          const handleView = () => {
            if (onSelectCar) {
              onSelectCar(car);
            } else {
              navigate(`/dashboard/car/${car._id}`);
            }
          };

          return (
            <div
              key={car._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={handleView}
            >
              <img
                src={buildImageUrl(car.image) || PLACEHOLDER_CAR}
                alt={car.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {car.brand} {car.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{car.type}</p>

                <div className="flex justify-between items-center mt-3">
                  <p className="font-semibold text-blue-600">
                    ₹{car.pricePerDay}/day
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
