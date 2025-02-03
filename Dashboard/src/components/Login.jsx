import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const dismissError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const dismissGeneralError = () => {
    setErrors((prev) => ({ ...prev, general: undefined }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/");
    } catch (err) {
      const response = err.response?.data;
      const fieldErrors = {};

      if (response?.errors) {
        if (Array.isArray(response.errors)) {
          response.errors.forEach((error) => {
            fieldErrors[error.param] = error.msg;
          });
        } else if (typeof response.errors === "string") {
          fieldErrors.general = response.errors;
        }
      } else if (response?.error) {
        switch (response.error) {
          case "Email not found":
            fieldErrors.email = response.error;
            break;
          case "Incorrect password":
            fieldErrors.password = response.error;
            break;
          default:
            fieldErrors.general = response.error;
        }
      } else {
        fieldErrors.general = "An unexpected error occurred. Please try again.";
      }

      setErrors(fieldErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-blue-500/20 p-4 rounded-full mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">Please sign in to continue</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          {errors.general && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={errorVariants}
              className="relative p-4 rounded-lg bg-red-500/20 border border-red-500/50"
            >
              <button
                onClick={dismissGeneralError}
                className="absolute top-2 right-2 text-red-300 hover:text-white transition-colors"
                aria-label="Dismiss error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-red-200">{errors.general}</span>
              </div>
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className="text-gray-300 text-sm font-medium">
              Email
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dismissError("email");
                }}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-blue-500"
                } text-gray-300 placeholder-gray-500`}
                placeholder="john@example.com"
                aria-describedby="email-error"
              />
              {errors.email && (
                <button
                  onClick={() => dismissError("email")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Dismiss email error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            {errors.email && (
              <motion.p
                initial="hidden"
                animate="visible"
                variants={errorVariants}
                className="mt-2 text-sm text-red-400 flex items-center"
                id="email-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 text-sm font-medium">
              Password
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dismissError("password");
                }}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  errors.password
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-gray-700/50 focus:ring-blue-500"
                } text-gray-300 placeholder-gray-500`}
                placeholder="••••••••"
                aria-describedby="password-error"
              />
              {errors.password && (
                <button
                  onClick={() => dismissError("password")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Dismiss password error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            {errors.password && (
              <motion.p
                initial="hidden"
                animate="visible"
                variants={errorVariants}
                className="mt-2 text-sm text-red-400 flex items-center"
                id="password-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </motion.p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Authenticating...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>

          <div className="text-center mt-6">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;