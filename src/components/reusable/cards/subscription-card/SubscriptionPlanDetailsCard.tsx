import { Button } from "@/components/ui/Buttons/button";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Calendar, Shield, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ISubscriptionDetails } from "@/types/ISubscription";

const SubscriptionPlanDetailsCard = ({
  subscription,
}: {
  subscription: ISubscriptionDetails;
}) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-yellow-400/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Crown className="h-5 w-5 text-yellow-400" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {subscription?.planDetails.name}
              </h3>
              <p className="text-gray-400">
                ${subscription?.planDetails.price}/monthly
              </p>
            </div>
            <Badge
              variant="default"
              className="bg-green-900/50 text-green-200 border-green-500/30"
            >
              {subscription?.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(subscription?.planDetails.features ?? {}).map(
              ([feature, value], index) => {
                const isBoolean = typeof value === "boolean";
                const isNumber = typeof value === "number";

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-gray-800/40 p-3 shadow-sm hover:bg-gray-800/60 transition"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    {/* Feature name */}
                    <div className="flex items-center gap-2 text-gray-200">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="capitalize">
                        {feature.replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>

                    {/* Feature value */}
                    {isBoolean ? (
                      value ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 font-medium">
                          Enabled
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 font-medium">
                          Not Included
                        </span>
                      )
                    ) : isNumber ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium">
                        {value}
                      </span>
                    ) : null}
                  </div>
                );
              }
            )}
          </div>

          <div
            className="flex gap-3 mt-6"
            onClick={() => router.push("/company/subscription")}
          >
            <Button
              variant="outline"
              className="bg-violet-900/50 border-violet-500/50 text-violet-200 hover:bg-violet-800/50 hover:text-violet-200 "
            >
              Upgrade Plan
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="none"
              className=" text-gray-400 hover:text-gray-500 "
            >
              View All Plans
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-violet-400" />
            Next Billing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              {new Date(subscription?.endDate!).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <p className="text-gray-400 mb-4">
              {new Date(subscription?.endDate!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="text-xl font-semibold text-green-400 mb-4">
              ${subscription?.planDetails.price}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              Update Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlanDetailsCard;
