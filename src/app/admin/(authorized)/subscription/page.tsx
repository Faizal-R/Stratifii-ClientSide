"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Crown, Edit2, PackagePlus, Smile, Sparkles, Star, X } from "lucide-react";
import SubscriptionModal from "@/components/ui/Modals/SubscriptionModal";
import {
  useCreateSubscription,
  useGetAllSubscriptions,
  useUpdateSubscription,
} from "@/hooks/api/useSubscription";

import { RiseLoader } from "react-spinners";

import { ISubscription } from "@/types/ISubscription";
import { errorToast } from "@/utils/customToast";
import SubscriptionCard from "@/components/ui/SubscriptionCard";

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
    
    if (isEditing) {
      await updateSubscription(subscription._id!, subscription);
      setSubscriptions(
        subscriptions.map((s) =>
          s._id === subscription._id ? subscription : s
        )
      );
      setIsEditing(false);
    } else {
      
      const response = await createSubscription(subscription);
      if (!response.success) {
        errorToast(response.message);
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
  const fetchSubscriptions = useCallback(async () => {
    const response = await getSubscriptions();
    if (!response.success) {
      errorToast(response.message);
      return;
    }

    setSubscriptions(response.data);
  }, [getSubscriptions]);
  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchSubscriptions();
  }, [getSubscriptions]);
   const getPlanIcon = (index: number) => {
    const icons = [Star, Crown, Sparkles];
    return icons[index % icons.length];
  };

  return isFetchingSubscription ? (
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader color="white" />
    </div>
  ) : (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 p-4 lg:p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-5 ">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Premium Plans</span>
          </div> */}
          
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Subscription Plans
          </h1>
          
          {subscriptions.length > 0 && (
            <div className="max-w-3xl mx-auto mb-5">
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-200 mb-3">
                Manage & Customize Subscription Plans
              </h2>
              <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                Create, update, and monitor subscription plans to optimize your platform's revenue and user experience.
              </p>
            </div>
          )}

          {subscriptions.length < 3 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <PackagePlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold">Create New Plan</span>
            </button>
          )}
        </div>

        {/* Content Section */}
        {subscriptions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/50">
                <Smile className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-bounce" />
              </div>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              No Subscription Plans Yet
            </h3>
            <p className="text-slate-400 text-lg max-w-md mb-8 leading-relaxed">
              Get started by creating your first subscription plan and unlock premium features for your users!
            </p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <PackagePlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold">Create Your First Plan</span>
            </button>
          </div>
        ) : (
          // Subscription Cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {subscriptions.map((subscription, index) => (
              <SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                index={index}
                onAction={handleEditSubscription}
              />
            ))}
          </div>
        )}
      </div>
        <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleSave={handleSaveSubscription}
                isEditMode={isEditing}
                existingPlan={selectedSubscription!}
              />
    </div>
  );
}
