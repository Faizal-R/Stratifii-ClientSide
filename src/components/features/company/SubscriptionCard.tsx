import React from "react";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Crown,
  Shield,
  Zap,
  Users,
  Database,
  Headphones,
} from "lucide-react";
import { ISubscriptionDetails } from "@/types/ISubscription";

interface SubscriptionCardProps {
  subscription: ISubscriptionDetails;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "expired":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "canceled":
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "canceled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(subscription.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Current Subscription
            </h3>
            <p className="text-gray-400 text-sm">Your active plan details</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            subscription.status
          )}`}
        >
          {getStatusIcon(subscription.status)}
          <span className="capitalize">{subscription.status}</span>
        </div>
      </div>

      {/* Plan Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Plan Name</p>
              <p className="text-white font-semibold">
                {subscription.planDetails.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 font-bold text-sm">$</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-white font-semibold">
                {subscription.planDetails.currency}{" "}
                {subscription.planDetails.price}
                <span className="text-gray-400 text-sm ml-1">/month</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Started</p>
              <p className="text-white font-semibold">
                {formatDate(subscription.startDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Expires</p>
              <p className="text-white font-semibold">
                {formatDate(subscription.endDate)}
              </p>
              {daysRemaining > 0 && (
                <p className="text-xs text-gray-400">
                  ({daysRemaining} days remaining)
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Transaction ID</p>
              <p className="text-white font-semibold text-sm font-mono">
                {subscription.transactionId.substring(0, 8)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-600/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Billing Cycle</p>
              <p className="text-white font-semibold capitalize">
                {subscription.planDetails.interval}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Features */}
      <div className="border-t border-gray-800 pt-6">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-400" />
          Plan Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(subscription.planDetails.features).map(
            ([key, value], index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {key === "candidateSlotPerMonth" &&
                    `Candidate Slots / Month: ${value}`}
                  {key === "finalInterviewAccess" && "Final Interview Access"}
                  {key === "interviewRecordingAccess" &&
                    "Interview Recording Access"}
                  {key === "feedbackDownloadAccess" &&
                    "Feedback Report Download"}
                  {key === "jobPostLimitPerMonth" &&
                    `Job Posts / Month: ${value}`}
                  {key === "companySpecificQuestionAccess" &&
                    "Company-Specific Questions"}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-800">
        <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4" />
          Upgrade Plan
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Database className="w-4 h-4" />
          View Billing
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Headphones className="w-4 h-4" />
          Support
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
