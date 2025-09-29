import React from "react";
import { Button } from "@/components/ui/Buttons/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Crown,
  Calendar,
  CreditCard,
  TrendingUp,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import useSubscriptionStore from "@/features/company/subscriberStore";
import { useRouter } from "next/navigation";
import { dashboardData } from "@/constants/dummyData";
import SubscriptionPlanDetailsCard from "@/components/reusable/cards/subscription-card/SubscriptionPlanDetailsCard";
export function SubscriptionManagement() {
  const { subscription } = useSubscriptionStore();
  const router = useRouter();
  // Mock subscription data
  const currentPlan = {
    name: "Professional",
    price: 299,
    billingPeriod: "monthly",
    features: [
      "Unlimited job postings",
      "AI-powered candidate screening",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    usage: {
      jobPostings: { used: 5, limit: -1 }, // -1 for unlimited
      candidateScreenings: { used: 7, limit: 50 },
      analyticsReports: { used: 12, limit: 25 },
    },
    nextBillingDate: new Date("2024-02-15"),
    status: "active",
  };

  const billingHistory = [
    {
      id: "inv_001",
      date: new Date("2024-01-15"),
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "inv_002",
      date: new Date("2023-12-15"),
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "inv_003",
      date: new Date("2023-11-15"),
      amount: 299,
      status: "paid",
      description: "Professional Plan - Monthly",
    },
  ];

  const usagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <div
      className="space-y-6 animate-fade-in"
      style={{ animationDelay: "0.8s" }}
    >
      {/* Current Plan Overview */}
      <SubscriptionPlanDetailsCard subscription={subscription!} />

      {/* Usage Statistics */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-violet-400" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Job Postings</span>
                <span className="text-white font-semibold">
                  {currentPlan.usage.jobPostings.used}
                  {currentPlan.usage.jobPostings.limit === -1
                    ? ""
                    : ` / ${currentPlan.usage.jobPostings.limit}`}
                </span>
              </div>
              {currentPlan.usage.jobPostings.limit !== -1 ? (
                <Progress
                  value={usagePercentage(
                    currentPlan.usage.jobPostings.used,
                    currentPlan.usage.jobPostings.limit
                  )}
                  className="w-full"
                />
              ) : (
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Unlimited
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Candidate Screenings</span>
                <span className="text-white font-semibold">
                  {currentPlan.usage.candidateScreenings.used} /{" "}
                  {currentPlan.usage.candidateScreenings.limit}
                </span>
              </div>
              <Progress
                value={usagePercentage(
                  currentPlan.usage.candidateScreenings.used,
                  currentPlan.usage.candidateScreenings.limit
                )}
                className="w-full"
              />
              <div className="text-xs text-gray-400">
                {currentPlan.usage.candidateScreenings.limit -
                  currentPlan.usage.candidateScreenings.used}{" "}
                remaining
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Analytics Reports</span>
                <span className="text-white font-semibold">
                  {currentPlan.usage.analyticsReports.used} /{" "}
                  {currentPlan.usage.analyticsReports.limit}
                </span>
              </div>
              <Progress
                value={usagePercentage(
                  currentPlan.usage.analyticsReports.used,
                  currentPlan.usage.analyticsReports.limit
                )}
                className="w-full"
              />
              <div className="text-xs text-gray-400">
                {currentPlan.usage.analyticsReports.limit -
                  currentPlan.usage.analyticsReports.used}{" "}
                remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CreditCard className="h-5 w-5 text-violet-400" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((invoice, index) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-violet-950/30 rounded-lg border border-violet-500/20 hover:border-violet-400/40 transition-all duration-200"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <CreditCard className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {invoice.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      {invoice.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">
                    ${invoice.amount}
                  </div>
                  <Badge
                    variant="default"
                    className="bg-green-900/50 text-green-200 border-green-500/30"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              className="text-violet-400 hover:text-violet-300"
            >
              View All Invoices
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
