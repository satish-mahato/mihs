import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend base URL
});

// Attach token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
