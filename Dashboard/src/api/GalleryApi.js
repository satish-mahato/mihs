import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Update with your backend URL

export const uploadGalleryFiles = async (formData) =>
  axios.post(`${API_BASE}/gallery`, formData);

export const getGalleryFiles = async () => axios.get(`${API_BASE}/gallery`);

export const editGalleryFiles = async (id, formData) =>
  axios.put(`${API_BASE}/gallery/${id}`, formData);

export const deleteGalleryFiles = async (id) =>
  axios.delete(`${API_BASE}/gallery/${id}`);
