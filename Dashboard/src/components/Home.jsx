import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/profileapi.js";
import { UserContext } from "../context/user.context.jsx";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile with authorization
    axiosInstance
      .get("/users/profile")
      .then((res) => {
        setUserName(res.data.user.name);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance
      .get("/users/logout") // Use POST or GET based on your backend
      .then(() => {
        // Clear user data and redirect to login page
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        alert("Failed to logout. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {loading ? (
          <h1 className="text-2xl font-bold text-white mb-6">
            Loading your profile...
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-white mb-6">
            Welcome, {userName || "Guest"}!
          </h1>
        )}
        <p className="text-gray-400 mb-4">Navigate to your desired page:</p>
        <ul className="space-y-3">
          <li>
            <Link
              to="/home"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Notice Board
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/gallerylist"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Gallery List
            </Link>
          </li>
        </ul>
        <button
          onClick={logoutHandler}
          className="mt-6 w-full p-3 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
