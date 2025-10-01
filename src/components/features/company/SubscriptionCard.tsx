import { ISubscription, ISubscriptionDetails } from "@/types/ISubscription";
import { errorToast } from "@/utils/customToast";
import { Check, X } from "lucide-react";


interface SubscriptionCardProps {
  subscription: ISubscription;
  premium: ISubscriptionDetails | null;
  processSubscriptionPurchase: (subscription: ISubscription) => void;
}

const SubscriptionCard = ({
  subscription,
  premium,
  processSubscriptionPurchase,
}: SubscriptionCardProps) => {
  const isCurrentPlan = subscription._id === premium?.planId;

  const handleClick = () => {
    if (isCurrentPlan) return;

    // Prevent downgrade: lower-priced plan not allowed
    if (
      premium?.planDetails.price &&
      subscription.price < premium.planDetails.price
    ) {
      errorToast("You are already subscribed to a higher plan.",
    
      );
      return;
    }

    processSubscriptionPurchase(subscription);
  };

  return (
    <div
      className="relative pb-9 overflow-hidden border border-violet-950 transition-transform duration-300 w-[350px] 
      bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-[60px] rounded-tr-none rounded-bl-none
      shadow-none hover:shadow-xl hover:shadow-violet-500/20 hover:scale-[1.01]"
    >
      <div className="pl-10 w-[160px] h-20 rounded-br-[60px] bg-violet-900 flex items-center justify-start">
        <h3 className="text-2xl text-violet-300 mb-2 text-center font-semibold">
          {subscription.name}
        </h3>
      </div>

      <div className="p-6">
        <div className="mb-6 text-center">
          <span className="text-4xl font-bold text-violet-600">
            ₹{subscription.price}
          </span>
          <span className="text-gray-500">/month</span>
        </div>

        <ul className="space-y-3 text-gray-600 mb-4">
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            Can Post {subscription.features.jobPostLimitPerMonth} Job(s) Per Month
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            {subscription.features.candidateSlotPerMonth} Candidate Slot(s) Per Month
          </li>
          <li className="flex items-start gap-2">
            {subscription.features.companySpecificQuestionAccess ? (
              <>
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                Access to Company Specific Questions
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                No Access to Interview Recordings
              </>
            )}
          </li>
        </ul>
      </div>

      <button
        onClick={handleClick}
        disabled={isCurrentPlan}
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition duration-300 ease-in-out 
        ${
          isCurrentPlan
            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white cursor-default"
            : "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white hover:brightness-110"
        }`}
      >
        {isCurrentPlan ? "Current Plan" : "Select Plan"}
      </button>
    </div>
  );
};

export default SubscriptionCard;
