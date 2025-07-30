"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,

  Edit2,
  PackagePlus,

  Smile,
  X,
} from "lucide-react";
import SubscriptionModal from "@/components/ui/Modals/SubscriptionModal";
import {
  useCreateSubscription,
  useGetAllSubscriptions,
  useUpdateSubscription,
} from "@/hooks/api/useSubscription";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";

import { ISubscription } from "@/types/ISubscription";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);

  const { getSubscriptions, loading: isFetchingSubscription } =
    useGetAllSubscriptions();
  const { createSubscription } = useCreateSubscription();
  const { updateSubscription } = useUpdateSubscription();

  const handleSaveSubscription = async (subscription: ISubscription) => {
    
    console.log(subscription)
    console.log(subscription);
    if (isEditing) {
      await updateSubscription(subscription._id!, subscription);
      setSubscriptions(
        subscriptions.map((s) =>
          s._id === subscription._id ? subscription : s
        )
      );
      setIsEditing(false);
    } else {
      console.log(subscription)
      const response = await createSubscription(subscription);
      if (!response.success) {
        toast(response.error);
        return;
      } else {
        setSubscriptions((prev) => [...prev, response.data]);
      }
    }
    setIsModalOpen(false);
  };
  const handleEditSubscription = (subscription: ISubscription) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setSelectedSubscription(subscription);
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

  return isFetchingSubscription ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader color="white" />
    </div>
  ) : (
    <div className="p-6 ml-64 h-full bg-gradient-to-br from-black via-black to-violet-950">
      <div className="max-w-7xl mx-auto w-full h-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-violet-100">
            Subscription Plans
          </h1>
          {subscriptions.length !== 0 && (
            <div className="flex justify-end w-[94%]">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 flex gap-2 px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg shadow-md transition mb-5"
              >
                <PackagePlus className="w-5 h-5" />
                Create Plan
              </button>
            </div>
          )}
        </div>
        {subscriptions.length > 0 && (
          <div className="text-center w-[94%] mx-auto mb-6">
            <h2 className="text-2xl font-semibold text-gray-200">
              Manage & Customize Subscription Plans
            </h2>
            <p className="text-gray-400 text-lg mt-2">
              Create, update, and monitor subscription plans to optimize the
              platform’s revenue and user experience.
            </p>
          </div>
        )}

        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-[80%] text-center py-12">
            <Smile className="w-12 h-12 text-gray-700 mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! No Subscription Plans Found
            </h3>
            <p className="text-gray-500 max-w-sm ">
              Get started by creating your first subscription plan and unlock
              premium features!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 flex gap-2 px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg shadow-md transition"
            >
              <PackagePlus className="w-5 h-5" />
              Create Plan
            </button>
          </div>
        ) : (
          <div className="flex justify-center  gap-6 w-full ">
            {subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="relative overflow-hidden border border-violet-950 transition-transform duration-300 w-[350px] 
        bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl
        shadow-none hover:shadow-xl hover:shadow-violet-500/20 hover:scale-[1.01]"
              >
                <div className="absolute top-0 right-0 p-4">
                  <button
                    onClick={() => handleEditSubscription(subscription)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-violet-600 mb-2">
                    {subscription.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-violet-600">
                      ₹{subscription.price}
                    </span>
                    <span className="text-gray-400">/month</span>
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
              </div>
            ))}
          </div>
        )}
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleSave={handleSaveSubscription}
          isEditMode={isEditing}
          existingPlan={selectedSubscription!}
        />
      </div>
    </div>
  );
}
