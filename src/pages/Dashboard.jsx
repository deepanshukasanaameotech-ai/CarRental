import React, { useState } from "react";
import UserCars from "../components/UserCars";
import UserCarDetails from "../components/UserCarDetails";
import UserBookings from "../components/UserBookings";
import UserProfile from "../components/UserProfile";
import UserDashboardHome from "../components/UserDashboardHome";
import { Link } from "react-router";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setActiveTab("carDetails");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCars = () => {
    setSelectedCar(null);
    setActiveTab("cars");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Tabs */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           <Link to="/user/dashboard">
            <h1 className="text-lg font-semibold text-blue-600">AutoRentX</h1>
            </Link>
            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center space-x-2">
              {["home", "cars", "bookings", "profile"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            {/* Mobile Tabs */}
            <div className="md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="border rounded-md px-3 py-1"
                aria-label="Select dashboard tab"
              >
                <option value="home">Home</option>
                <option value="cars">Cars</option>
                <option value="bookings">My Bookings</option>
                <option value="profile">Profile</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Home */}
        <section
          className={activeTab === "home" ? "block" : "hidden"}
          aria-labelledby="home-heading"
        >
          <h2 id="home-heading" className="sr-only">Home</h2>
          <UserDashboardHome onNavigateToCars={() => setActiveTab("cars")} />
        </section>

        {/* Cars */}
        <section
          className={activeTab === "cars" ? "block" : "hidden"}
          aria-labelledby="cars-heading"
        >
          <h2 id="cars-heading" className="sr-only">Available Cars</h2>
          <UserCars onSelectCar={handleSelectCar} />
        </section>

        {/* Bookings */}
        <section
          className={activeTab === "bookings" ? "block" : "hidden"}
          aria-labelledby="bookings-heading"
        >
          <h2 id="bookings-heading" className="sr-only">My Bookings</h2>
          <UserBookings />
        </section>

        {/* Profile */}
        <section
          className={activeTab === "profile" ? "block" : "hidden"}
          aria-labelledby="profile-heading"
        >
          <h2 id="profile-heading" className="sr-only">Profile</h2>
          <UserProfile />
        </section>

        {/* Car Details */}
        {selectedCar && (
          <section
            className={activeTab === "carDetails" ? "block" : "hidden"}
            aria-labelledby="car-details-heading"
          >
            <h2 id="car-details-heading" className="sr-only">Car Details</h2>
            <UserCarDetails car={selectedCar} goBack={handleBackToCars} />
          </section>
        )}
      </main>
    </div>
  );
}
