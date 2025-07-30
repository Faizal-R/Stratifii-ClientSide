import { ISubscription } from "@/types/ISubscription";
import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";
import { IRazorpayResponse } from "@/types/IRazorpay";

export const SubscriptionService = {
   createSubscription:async (subscription :ISubscription)=>{
    try {
        const response = await apiClient.post("/subscription",subscription);
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          return {
            success: false,
            status:error.status,
            error:
              error.response?.data.message ||
              "An Error occured During Fetching Interviewer ",
          };
        }
        return {
          success: false,
          error: "Unexpected error occurred While Creating Subscription.",
        };
      }
   },
   getSubscriptions: async () => {
    try {
      const response = await apiClient.get("/subscription");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured During Fetching Subscriptions",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Subscriptions.",
      };
    }
  },
  updateSubscription: async (subscriptionId:string,updatedSubscription :ISubscription) => {
    try {
      const response = await apiClient.put(`/subscription/${subscriptionId}`,{updatedSubscription});
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured While Updating Subscriptions",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Subscriptions.",
      };
    }
  },
  createPaymentOrder:async (amount:number)=>{
    try {
      const response = await apiClient.post(`/company/subscription/payment-order`,{amount});
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured While Create Subscriptions Payment Order",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While  Subscriptions.",
      };
    }
  },
  verifySubscriptionPaymentAndCreateSubscriptionRecord:async (razorpay_response:IRazorpayResponse,subscriptionId:string)=>{
    try {
      const response = await apiClient.post(`/company/subscription/payment-verify`,{...razorpay_response,subscriptionId});
      return response.data;
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured While Verifying Subscriptions Payment",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Verifying Subscriptions.",
      };
    }
  },
  getSubscriptionDetails: async () => {
    try {
      const response = await apiClient.get(`/company/subscription/plan`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("Subcription Details Error",error)
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured While Fetching Subscription By Company Id",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Subscription By Company Id.",
      };
    }
  }
};