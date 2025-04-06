import { SubscriptionService } from "@/services/SubscriptionService";
import { IRazorpayResponse } from "@/types/IRazorpay";
import { ISubscription } from "@/types/ISubscription";
import { useCallback, useState } from "react";
export const useCreateSubscription = function () {
  const [loading, setLoading] = useState(false);
  const createSubscription = useCallback(
    async (subscription: ISubscription) => {
      try {
        setLoading(true);
        const response = await SubscriptionService.createSubscription(
          subscription
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createSubscription, loading };
};
export const useGetAllSubscriptions = function () {
  const [loading, setLoading] = useState(false);
  const getSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await SubscriptionService.getSubscriptions();
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getSubscriptions, loading };
};
export const useUpdateSubscription = function () {
  const [loading, setLoading] = useState(false);
  const updateSubscription = useCallback(
    async (subscriptionId: string, updatedSubscription: ISubscription) => {
      try {
        setLoading(true);
        const response = await SubscriptionService.updateSubscription(
          subscriptionId,
          updatedSubscription
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateSubscription, loading };
};
export const useVerfiySubscriptionPaymentAndPurchaseSubscription = function () {
  const [loading, setLoading] = useState(false);
  const verfiySubscriptionPaymentAndPurchaseSubscription= useCallback(
    async (razorpay_response:IRazorpayResponse,subscriptionId:string) => {
      try {
        setLoading(true);
        const response = await SubscriptionService.verifySubscriptionPaymentAndCreateSubscriptionRecord(
          razorpay_response,
          subscriptionId
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { verfiySubscriptionPaymentAndPurchaseSubscription, loading };
};
export const useCreateSubscriptionPaymentOrder = function () {
  const [loading, setLoading] = useState(false);
  const createSubscriptionPaymentOrder = useCallback(
    async (amount:number) => {
      try {
        setLoading(true);
        const response = await SubscriptionService.createPaymentOrder(
        amount
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createSubscriptionPaymentOrder, loading };
};



