import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:4000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
