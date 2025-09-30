"use client";
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  deadline: string;
}

export const Timer: React.FC<TimerProps> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = new Date(deadline).getTime();
      const timeDiff = endTime - now;

      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("Expired");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [deadline]); 

  return (
    <div className="flex items-center space-x-2">
      <Clock className="w-4 h-4 text-gray-400" />
      <div className="text-sm">
        <div className="text-gray-400">Time left</div>
        <div
          className={`font-mono font-medium ${
            timeLeft === "Expired" ? "text-red-400" : "text-white"
          }`}
        >
          {timeLeft}
        </div>
      </div>
    </div>
  );
};
