import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://auth.sm12.com.np/api",
});

export default axiosInstance;
