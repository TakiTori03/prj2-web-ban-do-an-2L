import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
