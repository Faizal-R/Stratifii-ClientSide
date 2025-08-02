import { ISubscription } from "@/types/ISubscription";
import { IRazorpayResponse } from "@/types/IRazorpay";
import apiClient from "@/config/apiClient";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { SubscriptionRoutes } from "@/constants/routes/api/SubscriptionRoutes";

export const SubscriptionService = {
  createSubscription: async (subscription: ISubscription) => {
    try {
      const response = await apiClient.post(SubscriptionRoutes.BASE, subscription);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while creating the subscription.");
    }
  },

  getSubscriptions: async () => {
    try {
      const response = await apiClient.get(SubscriptionRoutes.BASE);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching subscriptions.");
    }
  },

  updateSubscription: async (subscriptionId: string, updatedSubscription: ISubscription) => {
    try {
      const response = await apiClient.put(`${SubscriptionRoutes.BASE}/${subscriptionId}`, {
        updatedSubscription,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while updating the subscription.");
    }
  },

  createPaymentOrder: async (amount: number) => {
    try {
      const response = await apiClient.post(SubscriptionRoutes.PAYMENT_ORDER, { amount });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while creating the payment order.");
    }
  },

  verifySubscriptionPaymentAndCreateSubscriptionRecord: async (
    razorpay_response: IRazorpayResponse,
    subscriptionId: string
  ) => {
    try {
      const response = await apiClient.post(SubscriptionRoutes.PAYMENT_VERIFY, {
        ...razorpay_response,
        subscriptionId,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while verifying the subscription payment.");
    }
  },

  getSubscriptionDetails: async () => {
    try {
      const response = await apiClient.get(SubscriptionRoutes.COMPANY_PLAN);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching the subscription details.");
    }
  },
};
