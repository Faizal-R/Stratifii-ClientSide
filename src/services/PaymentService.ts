import apiClient from "@/config/apiClient";
import { IRazorpayResponse } from "@/types/IRazorpay";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { PaymentRoutes } from "@/constants/routes/api/PaymentRoutes";

export const PaymentService = {
  calculatePayment: async (candidatesCount: number) => {
    try {
      const response = await apiClient.post(PaymentRoutes.CALCULATE, {
        candidatesCount,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching payment");
    }
  },

  createPaymentOrder: async (totalAmount: number) => {
    try {
      const response = await apiClient.post(PaymentRoutes.CREATE_ORDER, {
        totalAmount,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while creating payment order");
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
      const response = await apiClient.post(PaymentRoutes.VERIFY, {
        ...razorpay_response,
        jobId,
        candidatesCount,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while verifying payment");
    }
  },
};
