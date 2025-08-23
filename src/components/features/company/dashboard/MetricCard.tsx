import React from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
  format?: "number" | "currency";
  delay?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
  format = "number",
  delay = 0,
}) => {
  const formatValue = (val: number) => {
    if (format === "currency") {
      return ` ₹${val.toLocaleString()}`;
    }
    return val.toLocaleString();
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:from-white/15 hover:to-white/10 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              trend.isPositive
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-red-400 bg-red-400/10"
            }`}
          >
            <span>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3
          className="text-3xl font-bold text-white"
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   transition={{ duration: 1, delay: delay + 0.2 }}
        >
          {formatValue(value)}
        </h3>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;
