"use client";
import React, { useEffect, useRef, useState } from "react";
import { ISubscription } from "@/types/ISubscription";
import { Check, X } from "lucide-react";
import {
  useCreateSubscriptionPaymentOrder,
  useGetAllSubscriptions,
  useVerfiySubscriptionPaymentAndPurchaseSubscription,
} from "@/hooks/useSubscription";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { IRazorpayResponse } from "@/types/IRazorpay";
import { initiateRazorpayPayment, loadRazorpayScript } from "@/utils/razorpay";
const CompanySubscriptionPage = () => {
  const { getSubscriptions, loading } = useGetAllSubscriptions();
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const { createSubscriptionPaymentOrder } =
    useCreateSubscriptionPaymentOrder();
  const { verfiySubscriptionPaymentAndPurchaseSubscription } =
    useVerfiySubscriptionPaymentAndPurchaseSubscription();

  const processSubscriptionPurchase = async (subscription: ISubscription) => {
    const response = await createSubscriptionPaymentOrder(subscription.price);
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
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
        name: "Stratifii",
        email: "stratifii@gmail.com",
        contact: "1234567890",
      },
      onSuccess: async (response) => {
        const res = await verfiySubscriptionPaymentAndPurchaseSubscription(
          response,
          subscription._id!
        );

        if (!res.success) {
          toast.error(res.error, {
            className: "custom-error-toast",
          });
          return;
        }

        toast.success(res.message, {
          className: "custom-toast",
        });
      },
      onFailure: (error) => {
        toast.error("Something went wrong during payment!", {
          className: "custom-error-toast",
        });
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
        toast(response.error);
        return;
      }
      setSubscriptions(response.data);
    };

    fetchSubscriptions();
  }, [getSubscriptions]);

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className="p-6 ml-64 h-full ">
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

        <div className="flex justify-center  gap-6 w-full ">
          {subscriptions.map((subscription) => (
            <div
              key={subscription._id}
              className="relative pb-9 overflow-hidden border  border-violet-950 transition-transform duration-300 w-[350px] 
            bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-[60px] rounded-tr-none rounded-bl-none
            shadow-none hover:shadow-xl hover:shadow-violet-500/20 hover:scale-[1.01]"
            >
              <div className="pl-10 w-[160px] h-20 rounded-br-[60px] bg-violet-900 flex items-center justify-start ">
                <h3 className="text-2xl  text-violet-300 mb-2 text-center font-semibold">
                  {subscription.name}
                </h3>
              </div>
              <div className="p-6 ">
                <div className="mb-6 text-center">
                  <span className="text-4xl  font-bold text-violet-600">
                    ${subscription.price}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3  mb-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Can Post {subscription.features.jobPostLimitPerMonth}{" "}
                      Job(s) Per Month
                    </li>
                   
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {subscription.features.candidateSlotPerMonth} Candidate
                      Slot(s) Per Month
                    </li>
                    <li className="flex items-start gap-2">
                      {subscription.features.companySpecificQuestionAccess ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          Access to Company Specific Questions
                        </>
                      ) : (
                        <>
                          <X className=" h-5 w-5 text-red-500 mt-0.5  flex-shrink-0" />
                          No Access to Company Specific Questions
                        </>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      {subscription.features.feedbackDownloadAccess ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          Can Download Feedback
                        </>
                      ) : (
                        <>
                          <X className=" h-5 w-5 text-red-500 mt-0.5  flex-shrink-0" />
                          Cannot Download Feedback
                        </>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                    
                      {subscription.features.finalInterviewAccess ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          Access to Final Interviews
                        </>
                      ) : (
                        <>
                          <X className=" h-5 w-5 text-red-500 mt-0.5  flex-shrink-0" />
                          No Access to Final Interviews
                        </>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                   
                      {subscription.features.interviewRecordingAccess ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          Access to Interview Recordings
                        </>
                      ) : (
                        <>
                          <X className=" h-5 w-5 text-red-500 mt-0.5  flex-shrink-0" />
                          No Access to Interview Recordings
                        </>
                      )}
                    </li>
                  </ul>
                </ul>
              </div>
              <button
                onClick={() => processSubscriptionPurchase(subscription)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-violet-800 text-white font-medium rounded-lg shadow-md hover:bg-violet-700 transition duration-300"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySubscriptionPage;
