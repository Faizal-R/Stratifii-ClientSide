"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Users, TrendingUp, DollarSign, CreditCard } from "lucide-react";

interface ChartsProps {
  revenueTrendsData: any;
  userGrowthData: any;
  subscriptionData: any;
  revenueBreakdownData: any;
}

const ChartsSection: React.FC<ChartsProps> = ({
  revenueTrendsData,
  userGrowthData,
  subscriptionData,
  revenueBreakdownData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trends */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-left duration-700 delay-200">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <div className="p-2 bg-violet-600/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-violet-400" />
            </div>
            Revenue Trends
          </CardTitle>
          <CardDescription className="text-violet-300">
            Monthly revenue breakdown from subscriptions and interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Line data={revenueTrendsData} />
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-right duration-700 delay-400">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            User Growth
          </CardTitle>
          <CardDescription className="text-violet-300">
            Monthly growth of companies and interviewers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Line data={userGrowthData} />
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-left duration-700 delay-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <CreditCard className="h-5 w-5 text-orange-400" />
            </div>
            Subscription Plans
          </CardTitle>
          <CardDescription className="text-violet-300">
            Distribution of active subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-72 h-72 mx-auto">
            <Doughnut data={subscriptionData} />
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-right duration-700 delay-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <div className="p-2 bg-violet-600/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-violet-400" />
            </div>
            Revenue Breakdown
          </CardTitle>
          <CardDescription className="text-violet-300">
            Comparison of subscription vs interview revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Bar data={revenueBreakdownData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
