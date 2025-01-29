import axios from "axios";

const API = axios.create({ baseURL: "https://auth.sm12.com.np/file" });

// Fetch all files
export const fetchFiles = () => API.get("/get-files");

// Fetch files by category
export const fetchFilesByCategory = (category) =>
  API.get(`/files-by-category/${category}`);

// Upload files
export const uploadFile = (formData) => API.post("/upload", formData);

// Update a file's title
export const updateFile = (category, id, newTitle) =>
  API.put(`/edit-file/${category}/${id}`, { title: newTitle });

// Delete a file
export const deleteFile = (category, id) =>
  API.delete(`/delete-file/${category}/${id}`);
