import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { label: "Home", path: "/admin/dashboard" },
      { label: "Manage Cars", path: "/admin/manage-cars" },
      { label: "Bookings", path: "/admin/bookings" },
    ],
    []
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0  left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-1 rounded ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-3xl" 
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 text-base font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block ${
                location.pathname.startsWith(item.path)
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
