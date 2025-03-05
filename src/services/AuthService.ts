import { isAxiosError } from "axios";
import apiClient from "../config/apiClient";
import { ICompany } from "@/types/ICompany";
import { IInterviewer } from "@/types/IInterviewer";
// import { setAuthTokens, removeAuthTokens } from "../utils/storage";/

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const AuthService = {
  // Login and store tokens
  signIn: async (email: string, password: string, role: string) => {
    try {
      const response = await apiClient.post("/auth/signin", {
        email,
        password,
        role,
      });
      // setAuthTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred during login";
        console.error("Login failed:", errorMessage);
        throw new Error(errorMessage);
      }
      throw new Error("Unexpected error occurred While SignIn");
    }
  },

  companyRegister: async (company: ICompany) => {
    console.log("company : ", company);
    try {
      const response = await apiClient.post("/company/register", company);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  interviewerRegister: async (interviewer: IInterviewer) => {
    try {
      const response = await apiClient.post(
        "/interviewer/register",
        interviewer
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  sendOtpVerificiationCode: async (email: string, role: string) => {
    try {
      const response = await apiClient.post("/auth/otp/send", { email, role });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  // Logout and remove tokens
  signOut: () => {
    // removeAuthTokens();
    window.location.href = "/login"; // Redirect user to login page
  },
};

export default AuthService;
