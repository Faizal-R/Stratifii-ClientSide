import { isAxiosError } from "axios";
import apiClient from "../config/apiClient";
import { ICompany } from "@/types/ICompany";
import { IInterviewerRegistration } from "@/validations/InterviewerSchema";
import { AuthRoutes } from "@/constants/routes/api/AuthRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const AuthService = {
  signIn: async (email: string, password: string, role: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.SIGN_IN, {
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during login");
    }
  },

  companyRegister: async (company: ICompany) => {
    try {
      const response = await apiClient.post(AuthRoutes.COMPANY_REGISTER, company);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Company registration failed");
    }
  },

  interviewerRegister: async (interviewer: IInterviewerRegistration) => {
    const formData = new FormData();
    const { resume, ...rest } = interviewer;

    if (resume instanceof File) {
      formData.append("resume", resume);
    }

    formData.append("data", JSON.stringify(rest));

    try {
      const response = await apiClient.post(AuthRoutes.INTERVIEWER_REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Interviewer registration failed");
    }
  },

  verifyOtp: async (otp: string, email: string, role: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.OTP_VERIFY, { otp, email, role });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Failed to verify OTP");
    }
  },

  triggerOtpResend: async (email: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.OTP_RESEND, { email });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Failed to resend OTP");
    }
  },

  sendForgotPasswordOtpRequest: async (email: string, role: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.FORGOT_PASSWORD, { email, role });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Forgot password request failed");
    }
  },

  resetPassword: async (password: string, confirmPassword: string, token: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.RESET_PASSWORD, {
        password,
        confirmPassword,
        token,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Password reset failed");
    }
  },

  signOut: async () => {
    try {
      const response = await apiClient.post(AuthRoutes.SIGN_OUT);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Sign out failed");
    }
  },

  verifyUserAccount: async (email: string) => {
    try {
      const response = await apiClient.post(AuthRoutes.VERIFY_ACCOUNT, { email });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Account verification failed");
    }
  },
};

export default AuthService;
