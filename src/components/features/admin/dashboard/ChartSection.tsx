"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
  Activity,
  Building2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChartsProps {
  revenueTrendsData: any;
  userGrowthData: any;
  subscriptionData: any;
  revenueBreakdownData: any;
  interviewTrendsData: any;
  recentCompanies: any;
}

const ChartsSectionAndTables: React.FC<ChartsProps> = ({
  revenueTrendsData,
  userGrowthData,
  subscriptionData,
  revenueBreakdownData,
  interviewTrendsData,
  recentCompanies,
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

      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-right duration-700 delay-400">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            Interview Trends
          </CardTitle>
          <CardDescription className="text-violet-300">
            Monthly completed interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Line data={interviewTrendsData} />
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
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {/* Doughnut Chart */}
            <div className="w-72 h-72">
              <Doughnut data={subscriptionData} />
            </div>

            {/* Table beside chart */}
            <div className="flex-1 w-full">
              <table className="w-full text-sm text-left text-violet-300 border-collapse">
                <thead className="text-violet-400 border-b border-violet-500/30">
                  <tr>
                    <th className="py-2 px-3">Plan</th>
                    <th className="py-2 px-3">Subscribers</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionData.labels?.map(
                    (label: string, idx: number) => (
                      <tr
                        key={idx}
                        className="border-b border-violet-500/20 hover:bg-violet-500/10 transition"
                      >
                        <td className="py-2 px-3">{label}</td>
                        <td className="py-2 px-3 font-semibold">
                          {subscriptionData.datasets[0].data[idx]}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-blue-400" /> Recent Companies
          </CardTitle>
          <CardDescription className="text-violet-300">
            Latest company registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 ">
            {recentCompanies.map(
              (company: {
                name: string;
                email: string;
                _id: string;
                status: string;
                companyLogo: string | null;
              }) => (
                <div
                  key={company._id}
                  className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-violet-500/10"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                      <AvatarImage
                        src={
                          company.companyLogo ??
                          `https://ui-avatars.com/api/?name=${company.name}&background=8b5cf6&color=fff`
                        }
                      />
                      <AvatarFallback>
                        {company.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-semibold">{company.name}</p>
                      <p className="text-violet-300 text-sm">{company.email}</p>
                    </div>
                  </div>
                  <Badge>{company.status}</Badge>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSectionAndTables;
