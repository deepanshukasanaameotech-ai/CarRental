import { Routes, Route } from "react-router-dom";

// AUTH
import Signup from "./pages/SignUp";
import Login from "./pages/SignIn";

// USER PAGES
import Dashboard from "./pages/Dashboard";
import UserCars from "./components/UserCars";
import UserCarDetails from "./components/UserCarDetails";
import UserBookings from "./components/UserBookings";
import UserProfile from "./components/UserProfile";
import Checkout from "./pages/Checkout";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import ManageCars from "./components/ManageCars";
import BookingsAdmin from "./components/BookingsAdmin";
import UserDashboardHome from "./components/UserDashboardHome";


export default function App() {
  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* USER ROUTES */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      

      {/* User Dashboard Sub Routes */}
      <Route path="/dashboard/cars" element={<UserCars />} />
      <Route path="/dashboard/car/:id" element={<UserCarDetails />} />
      <Route path="/dashboard/bookings" element={<UserBookings />} />
      <Route path="/dashboard/profile" element={<UserProfile />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/admin/manage-cars" element={<ManageCars />} />
      <Route path="/admin/bookings" element={<BookingsAdmin />} />


      <Route path="/checkout" element={<Checkout />} />

   

    </Routes>
  );
}
