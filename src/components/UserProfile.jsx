import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildImageUrl, PLACEHOLDER_AVATAR } from "../utils/imageUtils";

export default function UserProfile() {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={buildImageUrl(user.profilePic) || PLACEHOLDER_AVATAR}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold mb-1">{user.fullName}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-700 mt-1 font-medium">📞 {user.phone}</p>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
