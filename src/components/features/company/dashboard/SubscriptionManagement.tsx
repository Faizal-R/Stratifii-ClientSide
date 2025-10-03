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

import SubscriptionPlanDetailsCard from "@/components/reusable/cards/subscription-card/SubscriptionPlanDetailsCard";
export function SubscriptionManagement() {
  const { subscription } = useSubscriptionStore();

  // Mock subscription data

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
    </div>
  );
}
