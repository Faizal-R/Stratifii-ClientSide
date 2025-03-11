import { StatusCodes } from "@/constants/statusCodes";
import axios from "axios";
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

apiClient.interceptors.request.use(
  (config) => {
    const role=config.url?.split('/')[1]
    const token = localStorage.getItem(`${role}AccessToken`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      console.error("Unauthorized! Redirecting to login...");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
