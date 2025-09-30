"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Building2, UserCheck, CreditCard, ArrowUpRight } from "lucide-react";

interface KeyMetricsProps {
  totalRevenue: number;
  totalCompanies: number;
  totalInterviewers: number;
  totalSubscriptions: number;
}

const KeyMetricsCards: React.FC<KeyMetricsProps> = ({
  totalRevenue,
  totalCompanies,
  totalInterviewers,
  totalSubscriptions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom duration-700 delay-200">
      {/* Revenue */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-violet-200">Total Revenue</CardTitle>
          <div className="p-2 bg-violet-600/20 rounded-lg">
            <DollarSign className="h-5 w-5 text-violet-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">+12.5%</span>
            <span className="text-violet-400 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Companies */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-violet-200">Active Companies</CardTitle>
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Building2 className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">{totalCompanies}</div>
        </CardContent>
      </Card>

      {/* Total Interviewers */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-violet-200">Total Interviewers</CardTitle>
          <div className="p-2 bg-emerald-600/20 rounded-lg">
            <UserCheck className="h-5 w-5 text-emerald-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">{totalInterviewers}</div>
        </CardContent>
      </Card>

      {/* Active Subscriptions */}
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-violet-200">Active Subscriptions</CardTitle>
          <div className="p-2 bg-orange-600/20 rounded-lg">
            <CreditCard className="h-5 w-5 text-orange-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-1">{totalSubscriptions}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetricsCards;
