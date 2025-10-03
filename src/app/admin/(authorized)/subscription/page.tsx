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

  const getPlanGradient = (index: number) => {
    const gradients = [
      'from-blue-500/20 via-purple-500/10 to-pink-500/20',
      'from-purple-500/20 via-pink-500/10 to-red-500/20',
      'from-green-500/20 via-blue-500/10 to-purple-500/20',
    ];
    return gradients[index % gradients.length];
  };

  const getPlanBorder = (index: number) => {
    const borders = [
      'border-blue-500/30',
      'border-purple-500/30', 
      'border-green-500/30',
    ];
    return borders[index % borders.length];
  };

  const getPlanAccent = (index: number) => {
    const accents = ['text-blue-400', 'text-purple-400', 'text-green-400'];
    return accents[index % accents.length];
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
            {subscriptions.map((subscription, index) => {
              const IconComponent = getPlanIcon(index);
              
              return (
                <div
                  key={subscription._id}
                  className={`group relative overflow-hidden bg-gradient-to-br ${getPlanGradient(index)} backdrop-blur-sm border ${getPlanBorder(index)} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Edit Button */}
                  <div className="absolute top-6 right-6 z-10">
                    <button
                      onClick={() => handleEditSubscription(subscription)}
                      className="p-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Edit2 className="h-4 w-4 text-slate-300 hover:text-white transition-colors" />
                    </button>
                  </div>

                  <div className="relative p-8">
                    {/* Plan Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border ${getPlanBorder(index)}`}>
                        <IconComponent className={`w-6 h-6 ${getPlanAccent(index)}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {subscription.name}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-bold ${getPlanAccent(index)}`}>
                          ₹{subscription.price.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-lg font-medium">/month</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPlanAccent(index).replace('text-', 'bg-')}`}></div>
                        Features Included
                      </h4>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 group/item">
                          <div className="flex-shrink-0 p-1 bg-green-500/20 rounded-lg">
                            <Check className="h-4 w-4 text-green-400" />
                          </div>
                          <span className="text-slate-300 group-hover/item:text-white transition-colors">
                            <span className="font-semibold text-white">
                              {subscription.features.jobPostLimitPerMonth}
                            </span> Job Posts per Month
                          </span>
                        </li>

                        <li className="flex items-start gap-3 group/item">
                          <div className="flex-shrink-0 p-1 bg-green-500/20 rounded-lg">
                            <Check className="h-4 w-4 text-green-400" />
                          </div>
                          <span className="text-slate-300 group-hover/item:text-white transition-colors">
                            <span className="font-semibold text-white">
                              {subscription.features.candidateSlotPerMonth}
                            </span> Candidate Slots per Month
                          </span>
                        </li>

                        <li className="flex items-start gap-3 group/item">
                          <div className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.companySpecificQuestionAccess 
                              ? 'bg-green-500/20' 
                              : 'bg-red-500/20'
                          }`}>
                            {subscription.features.companySpecificQuestionAccess ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <X className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <span className="text-slate-300 group-hover/item:text-white transition-colors">
                            Company Specific Questions
                          </span>
                        </li>

                        <li className="flex items-start gap-3 group/item">
                          <div className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.feedbackDownloadAccess 
                              ? 'bg-green-500/20' 
                              : 'bg-red-500/20'
                          }`}>
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

                        <li className="flex items-start gap-3 group/item">
                          <div className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.finalInterviewAccess 
                              ? 'bg-green-500/20' 
                              : 'bg-red-500/20'
                          }`}>
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

                        <li className="flex items-start gap-3 group/item">
                          <div className={`flex-shrink-0 p-1 rounded-lg ${
                            subscription.features.interviewRecordingAccess 
                              ? 'bg-green-500/20' 
                              : 'bg-red-500/20'
                          }`}>
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
                  </div>
                </div>
              );
            })}
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
