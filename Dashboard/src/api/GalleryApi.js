import axios from "axios";

const API_BASE = "https://auth.sm12.com.np/api"; // Update with your backend URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header to all requests except GET
    if (config.method !== "get") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Export functions
export const uploadGalleryFiles = async (formData) =>
  axiosInstance.post(`/gallery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getGalleryFiles = async (id) =>
  id ? axiosInstance.get(`/gallery/${id}`) : axiosInstance.get(`/gallery`);

export const editGalleryFiles = async (id, formData) =>
  axiosInstance.put(`/gallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteGalleryFiles = async (id) =>
  axiosInstance.delete(`/gallery/${id}`);