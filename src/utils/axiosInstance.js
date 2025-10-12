import { BASE_URL } from "./apiPaths";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      } else if (error.response?.status === 500) {
        console.error("Lỗi server. Vui lòng thử lại sau.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
