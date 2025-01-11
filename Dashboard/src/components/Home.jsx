import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-6">
          Welcome to the App
        </h1>
        <p className="text-gray-400 mb-4">Navigate to your desired page:</p>
        <ul className="space-y-3">
          <li>
            <Link
              to="/login"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Login Page
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Register Page
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Dashboard (Protected)
            </Link>
          </li>
          <li>
            <Link
              to="/paging"
              className="text-blue-500 hover:underline hover:text-blue-400"
            >
              Paging (Protected)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
