import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const dismissError = () => setErrors({}); // Clear errors when dismissing

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .post("/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          const fieldErrors = {};
          if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach((error) => {
              fieldErrors[error.param] = error.msg;
            });
          } else if (typeof err.response.data.errors === "string") {
            fieldErrors.general = err.response.data.errors;
          } else {
            fieldErrors.general = "An unexpected error occurred.";
          }
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: err.response?.data.message || "An error occurred",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form onSubmit={submitHandler}>
          {/* Enhanced General Error Message */}
          {errors.general && (
            <div className="mb-4 p-4 rounded bg-red-600 text-white text-center font-medium relative">
              <button
                onClick={dismissError}
                className="absolute top-2 right-2 text-white bg-transparent hover:text-red-200 text-lg"
                aria-label="Dismiss"
              >
                &times;
              </button>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M9.172 16.828a4 4 0 015.656 0m0-9.656a4 4 0 01-5.656 0M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"
                  />
                </svg>
                <span>{errors.general}</span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              className={`w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              className={`w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
