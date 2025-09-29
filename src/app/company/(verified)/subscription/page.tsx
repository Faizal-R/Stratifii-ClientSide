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
import SubscriptionCard from "@/components/features/company/SubscriptionCard";
import { errorToast, successToast } from "@/utils/customToast";
import { useAuthStore } from "@/features/auth/authStore";

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
        console.log(res);
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

  const getPlanGradient = (index: number) => {
    const gradients = [
      "from-blue-500/20 via-purple-500/10 to-pink-500/20",
      "from-purple-500/20 via-pink-500/10 to-red-500/20",
      "from-green-500/20 via-blue-500/10 to-purple-500/20",
    ];
    return gradients[index % gradients.length];
  };

  const getPlanBorder = (index: number) => {
    const borders = [
      "border-blue-500/30",
      "border-purple-500/30",
      "border-green-500/30",
    ];
    return borders[index % borders.length];
  };

  const getPlanAccent = (index: number, isBg: boolean = false) => {
    const accents = ["text-blue-400", "text-purple-400", "text-green-400"];
    const accent = accents[index % accents.length];
    return isBg ? accent.replace("text-", "bg-") : accent;
  };
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
          {subscriptions.map((subscription, index) => {
            const IconComponent = getPlanIcon(index);

            return (
              <div
                key={subscription._id}
                className={`group relative overflow-hidden bg-gradient-to-br ${getPlanGradient(
                  index
                )} backdrop-blur-sm border ${getPlanBorder(
                  index
                )} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90"></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Plan Content */}
                <div className="relative p-8">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border ${getPlanBorder(
                        index
                      )}`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${getPlanAccent(index)}`}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {subscription.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-bold ${getPlanAccent(index)}`}
                      >
                        ₹{subscription.price.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-lg font-medium">
                        /month
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getPlanAccent(
                          index
                        ).replace("text-", "bg-")}`}
                      ></div>
                      Features Included
                    </h4>

                    <ul className="space-y-3">
                      {/* Job Posts */}
                      <li className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 p-1 bg-green-500/20 rounded-lg">
                          <Check className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          <span className="font-semibold text-white">
                            {subscription.features.jobPostLimitPerMonth}
                          </span>{" "}
                          Job Posts per Month
                        </span>
                      </li>

                      {/* Candidate Slots */}
                      <li className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 p-1 bg-green-500/20 rounded-lg">
                          <Check className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          <span className="font-semibold text-white">
                            {subscription.features.candidateSlotPerMonth}
                          </span>{" "}
                          Candidate Slots per Month
                        </span>
                      </li>

                      {/* Company Specific Questions */}
                      <li className="flex items-start gap-3 group/item">
                        <div
                          className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.companySpecificQuestionAccess
                              ? "bg-green-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {subscription.features
                            .companySpecificQuestionAccess ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          Company Specific Questions
                        </span>
                      </li>

                      {/* Feedback Downloads */}
                      <li className="flex items-start gap-3 group/item">
                        <div
                          className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.feedbackDownloadAccess
                              ? "bg-green-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {subscription.features.feedbackDownloadAccess ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          Feedback Downloads
                        </span>
                      </li>

                      {/* Final Interview Access */}
                      <li className="flex items-start gap-3 group/item">
                        <div
                          className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.finalInterviewAccess
                              ? "bg-green-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {subscription.features.finalInterviewAccess ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          Final Interview Access
                        </span>
                      </li>

                      {/* Interview Recordings */}
                      <li className="flex items-start gap-3 group/item">
                        <div
                          className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.interviewRecordingAccess
                              ? "bg-green-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {subscription.features.interviewRecordingAccess ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors">
                          Interview Recordings
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center mt-8">
                    <button
                      disabled={
                        premium?.planId === subscription._id &&
                        premium?.status === "active"
                      }
                      onClick={() => processSubscriptionPurchase(subscription)}
                      className={`px-6  m py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                        premium?.planId === subscription._id
                          ? premium?.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-black"
                          : getPlanAccent(index, true)
                      } hover:scale-105 hover:brightness-110`}
                    >
                      {premium?.planId === subscription._id
                        ? premium?.status === "active"
                          ? "Current Plan"
                          : "Renew Plan"
                        : "Choose Plan"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <SubscriptionCard sub/> */}
      </div>
    </div>
  );
};

export default CompanySubscriptionPage;

// <SubscriptionCard
//   key={subscription._id}
//   subscription={subscription}
//   premium={premium}
//   processSubscriptionPurchase={processSubscriptionPurchase}
// />
