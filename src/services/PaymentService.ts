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

  handleInterviewProcessInitializationPayment: async ({
    razorpay_response,
    jobId,
    candidatesCount,
    isPaymentFailed
  }: {
    razorpay_response: IRazorpayResponse|null;
    jobId: string;
    candidatesCount: number;
    isPaymentFailed:boolean
  }) => {
    try {
      const response = await apiClient.post(PaymentRoutes.VERIFY, {
        ...razorpay_response,
        jobId,
        candidatesCount,
        isPaymentFailed
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while verifying payment");
    }
  },
  handleRetryInterviewProcessInitializationPayment: async (jobId: string) => {
    try {
      const response = await apiClient.patch(`${PaymentRoutes.RETRY}/${jobId}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while retrying payment");
    }
  },

  getCompanyPaymentHistory:async(companyId:string)=>{
    try {
      const response = await apiClient.get(`${PaymentRoutes.GET_COMPANY_PAYMENT_HISTORY}/${companyId}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error,"An error occured while fetching payment history");
    }
  }
};


