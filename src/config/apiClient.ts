import { StatusCodes } from "@/constants/statusCodes";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

async function refreshAccessToken() {
  try {
    const response = await apiClient.post("/auth/refresh-token");
    console.log("Refreshing token...", response.data);
    const newAccessToken = response.data.data.accessToken;
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      parsedUser.token = newAccessToken; // Update stored token
      localStorage.setItem("user", JSON.stringify(parsedUser));
    }

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null; // Return null to indicate failure
  }
}

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const token = user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("response", originalRequest);

    if (
      error.response?.status === StatusCodes.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      console.log("newAccessToken", newAccessToken); // Backend call

      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
