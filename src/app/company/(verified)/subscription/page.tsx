"use client";
import React, { useEffect, useRef, useState } from "react";
import { ISubscription } from "@/types/ISubscription";
import { Check, Crown, Sparkles, Star, X } from "lucide-react";
import {
  useCreateSubscriptionPaymentOrder,
  useGetAllSubscriptions,
  useVerfiySubscriptionPaymentAndPurchaseSubscription,
} from "@/hooks/api/useSubscription";

import { RiseLoader } from "react-spinners";

import { initiateRazorpayPayment } from "@/utils/razorpay";
import useSubscriptionStore from "@/features/company/subscriberStore";
import { errorToast, successToast } from "@/utils/customToast";
import { useAuthStore } from "@/features/auth/authStore";
import SubscriptionCard from "@/components/ui/SubscriptionCard";

const CompanySubscriptionPage = () => {
  const { user } = useAuthStore();
  const { getSubscriptions, loading } = useGetAllSubscriptions();
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const { createSubscriptionPaymentOrder } =
    useCreateSubscriptionPaymentOrder();
  const { verfiySubscriptionPaymentAndPurchaseSubscription } =
    useVerfiySubscriptionPaymentAndPurchaseSubscription();

  const { setSubscription, subscription: premium } = useSubscriptionStore();

  const processSubscriptionPurchase = async (subscription: ISubscription) => {
    if (
      premium?.status === "active" &&
      subscription.price <= premium?.planDetails.price
    ) {
      errorToast("You are already on this plan or a higher plan!");
      return;
    }
    const response = await createSubscriptionPaymentOrder(subscription.price);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    const { id, amount } = response.data;
    await initiateRazorpayPayment({
      amount: amount,
      orderId: id,
      name: "Stratifii Interviews",
      description: "Subscription Payment",
      image: "https://your-image-url",
      prefill: {
        name: user?.name!,
        email: user?.email!,
        contact: "1234567890",
      },
      onSuccess: async (response) => {
        const res = await verfiySubscriptionPaymentAndPurchaseSubscription(
          response,
          subscription._id!
        );
        
        if (!res.success) {
          errorToast(res.message);
          return;
        }

        successToast(res.message);
        setSubscription({
          planId: res.data.planId,
          status: "active",
          subscriberId: res.data.subscriberId,
          planDetails: res.data.planDetails,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          transactionId: res.data.transactionId,
        });
      },
      onFailure: () => {
        errorToast("Something went wrong during payment!");
      },
    });
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchSubscriptions = async () => {
      const response = await getSubscriptions();
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      setSubscriptions(response.data);
    };

    fetchSubscriptions();
  }, [getSubscriptions]);

  const getPlanIcon = (index: number) => {
    const icons = [Star, Crown, Sparkles];
    return icons[index % icons.length];
  };

  return loading ? (
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className="p-6 custom-64 h-full ">
      <div className="max-w-7xl mx-auto w-full h-full">
        <div className="text-center w-[94%] mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-gray-200">
            Manage Your Subscription
          </h2>
          <p className="text-gray-400 text-lg mt-2">
            Upgrade your plan to unlock premium hiring features and reach top
            talent faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard
              key={subscription._id}
              subscription={subscription}
              index={index}
              onAction={processSubscriptionPurchase}
              isCurrentPlan={premium?.planId === subscription._id && premium?.status === "active"}
              isRenewable={premium?.planId === subscription._id && premium?.status !== "active"}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CompanySubscriptionPage;


