import apiClient from "@/config/apiClient";
import { IRazorpayResponse } from "@/types/IRazorpay";
import { isAxiosError } from "axios";

export const PaymentService = {
  calculatePayment: async (candidatesCount: number) => {
    try {
      const response = await apiClient.post("/payment/calculate", {
        candidatesCount,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.status,
          error: "An error occurred While Fetching Payment",
        };
      }
      return {
        success: false,

        error: "Unexpected error occurred While Fetching Payment",
      };
    }
  },
  createPaymentOrder: async (totalAmount: number) => {
    try {
      const response = await apiClient.post("/payment/order", {
        totalAmount,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.status,
          error: "An error occurred While Creating Payment Order",
        };
      }
      return {
        success: false,

        error: "Unexpected error occurred While Creating Payment Order",
      };
    }
  },
  verifyPaymentAndCreatePaymentRecord: async ({
    razorpay_response,
    jobId,
    candidatesCount,
  }: {
    razorpay_response: IRazorpayResponse;
    jobId: string;
    candidatesCount: number;
  }) => {
    try {
      const response = await apiClient.post("/payment/verify", {
        ...razorpay_response,
        jobId,
        candidatesCount,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.status,
          error: "An error occurred While Verifying Payment ",
        };
      }
      return {
        success: false,

        error: "Unexpected error occurred While Verifying Payment ",
      };
    }
  },
};
