"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Edit2, Star, Crown, Sparkles, Check, X } from 'lucide-react';
import { ISubscription } from '@/types/ISubscription';
import { useAuthStore } from '@/features/auth/authStore';
import { Roles } from '@/constants/enums/roles';

interface SubscriptionCardProps {
  subscription: ISubscription;
  index: number;
  onAction?: (subscription: ISubscription) => void;
  isCurrentPlan?: boolean;
  isRenewable?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  subscription, 
  index, 
  onAction,
  isCurrentPlan,
  isRenewable
}) => {
  const { user } = useAuthStore();
  
  // Custom styling based on index for variety (similar to landing page/admin page)
  const isHighlighted = index === 1; // Highlight the middle one by default if it's the second card
  
  const getPlanIcon = (index: number) => {
    const icons = [Star, Crown, Sparkles];
    const Icon = icons[index % icons.length];
    return <Icon className={`w-6 h-6 ${isHighlighted ? 'text-violet-400' : 'text-violet-800'}`} />;
  };

  const role = user?.role;

  const renderActionButton = () => {
    if (role === Roles.ADMIN) {
      return (
        <button 
          onClick={() => onAction?.(subscription)}
          className="w-full py-4 rounded-2xl font-black bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center justify-center gap-2 group"
        >
          <Edit2 size={18} className="group-hover:rotate-12 transition-transform" />
          Edit Plan
        </button>
      );
    }
    
    if (role === Roles.COMPANY) {
      return (
        <button 
          disabled={isCurrentPlan && !isRenewable}
          onClick={() => onAction?.(subscription)}
          className={`w-full py-4 rounded-2xl font-black transition-all ${
            isCurrentPlan 
              ? isRenewable 
                ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl shadow-yellow-500/20"
                : "bg-green-500 text-white cursor-default"
              : isHighlighted 
                ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/30 hover:scale-[1.02]' 
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:scale-[1.02]'
          }`}
        >
          {isCurrentPlan 
            ? isRenewable ? "Renew Plan" : "Current Plan" 
            : "Choose Plan"}
        </button>
      );
    }

    // Default (Landing Page guests) - no button as per user request
    return null;
  };

  const features = [
    { label: `${subscription.features.jobPostLimitPerMonth} Job Postings`, included: true },
    { label: `${subscription.features.candidateSlotPerMonth} Delegation Slots`, included: true },
    { label: "AI Mock Verification", included: subscription.features.companySpecificQuestionAccess },
    { label: "Expert 1:1 Labs", included: subscription.features.finalInterviewAccess },
    { label: "Interview Recordings", included: subscription.features.interviewRecordingAccess },
    { label: "Feedback Downloads", included: subscription.features.feedbackDownloadAccess }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className={`relative p-8 rounded-[40px] border transition-all duration-700 h-full flex flex-col ${
        isHighlighted
          ? 'bg-violet-950/20 border-violet-500/50 hover:border-violet-400/80 scale-105 shadow-[0_0_50px_rgba(139,92,246,0.15)] z-10' 
          : 'bg-black border-violet-800/40 hover:border-violet-500/60'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
          Popular
        </div>
      )}

      <div className="mb-4 text-center">
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${isHighlighted ? 'border-violet-500/30' : ''}`}>
            {getPlanIcon(index)}
          </div>
        </div>
        <h3 className="text-xl font-black mb-2 uppercase tracking-[0.1em] text-white">
          {subscription.name}
        </h3>
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-black text-white">₹{subscription.price.toLocaleString()}</span>
          <span className="text-violet-200/20 ml-2 font-light">/mo</span>
        </div>
      </div>

      <div className="mb-8 space-y-4 flex-grow">
        {features.map((feat, j) => (
          <div key={j} className="flex items-start text-xs font-medium text-violet-200/60 group">
             <div className={`mt-0.5 mr-3 flex-shrink-0 p-0.5 rounded-full ${feat.included ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
               {feat.included ? (
                 <CheckCircle size={14} className={isHighlighted ? 'text-violet-400' : 'text-violet-800'} />
               ) : (
                 <X size={12} className="text-red-500/40" />
               )}
             </div>
             <span className={feat.included ? 'text-violet-100/80' : 'text-violet-100/30'}>
               {feat.label}
             </span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        {renderActionButton()}
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;
