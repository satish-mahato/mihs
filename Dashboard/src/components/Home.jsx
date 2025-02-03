import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import {
  FaBullhorn,
  FaImages,
  FaList,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/users/profile")
      .then((res) => {
        
        if (res.data && res.data.name) {
          setUserName(res.data.name); // Access name directly from res.data
        } else {
          console.error("Invalid API response:", res.data);
          setUserName("Guest"); // Fallback value
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        alert("Unable to load your profile. Please try again later.");
        navigate("/login");
        setLoading(false);
      });
  }, [navigate]);

  const logoutHandler = () => {
    axiosInstance
      .get("/users/logout")
      .then(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <GiPartyPopper className="text-6xl text-yellow-400 mx-auto mb-4 animate-bounce" />
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-3xl text-white" />
              <h1 className="text-xl font-semibold text-white">
                Loading your profile...
              </h1>
            </div>
          ) : (
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome back, {userName || "Guest"}!
            </h1>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/notice"
            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <FaBullhorn className="text-4xl text-blue-400 mb-2 group-hover:text-blue-300" />
            <span className="text-lg font-medium text-white">Notice Board</span>
            <p className="text-sm text-gray-300 text-center mt-1">
              Check latest updates
            </p>
          </Link>
          <Link
            to="/gallery"
            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <FaImages className="text-4xl text-purple-400 mb-2 group-hover:text-purple-300" />
            <span className="text-lg font-medium text-white">Gallery</span>
            <p className="text-sm text-gray-300 text-center mt-1">
              Explore memories
            </p>
          </Link>
          <Link
            to="/gallerylist"
            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <FaList className="text-4xl text-green-400 mb-2 group-hover:text-green-300" />
            <span className="text-lg font-medium text-white">Gallery List</span>
            <p className="text-sm text-gray-300 text-center mt-1">
              Manage collections
            </p>
          </Link>
        </div>
        <button
          onClick={logoutHandler}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg bg-red-500/90 hover:bg-red-600 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <FaSignOutAlt className="text-white" />
          <span className="text-white font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
