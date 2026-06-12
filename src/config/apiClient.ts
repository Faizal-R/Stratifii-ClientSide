import { StatusCodes } from "@/constants/enums/statusCodes";
import { AuthRoutes } from "@/constants/routes/api/AuthRoutes";
import { errorToast } from "@/utils/customToast";
import axios from "axios";


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Track if we're currently logging out
let isLoggingOut = false;

// ✅ Function to handle logout
export function handleLogout() {
  isLoggingOut = true;

  // Clear any pending requests
  apiClient.defaults.timeout = 1; // Cancel pending requests quickly
  localStorage.clear();
  // Redirect to signin
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
}

// ✅ Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Don't make requests if logging out
    if (isLoggingOut) {
      return Promise.reject(new Error("Logging out"));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Don't retry if logging out
    if (isLoggingOut) {
      return Promise.reject(error);
    }

    // If we get 401, it means both access and refresh tokens are invalid
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      console.error("❌ Authentication failed - redirecting to signin");
      handleLogout();
      return Promise.reject(error);
    }

    if (
      error.response?.status === StatusCodes.FORBIDDEN &&
      !originalRequest?.url?.includes(AuthRoutes.SIGN_IN)
    ) {
      const errorMessage = error.response?.data?.message || "You are not authorized to access this resource.";
      errorToast(errorMessage);
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const targetUrl = errorMessage.toLowerCase().includes("subscription")
            ? "/company/subscription"
            : "/unauthorized";
          window.dispatchEvent(new CustomEvent("app:navigate", { detail: targetUrl }));
        }, 3000);
      }
    }

    // Handle Forbidden
    if (error.response?.status === StatusCodes.LOCKED &&!originalRequest?.url?.includes("/auth")) {
      errorToast(error.response.data.message);
      localStorage.clear()
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
