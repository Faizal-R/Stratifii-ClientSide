"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LucideCheck, LucideRefreshCw, LucideArrowLeft } from "lucide-react";

interface OTPVerificationProps {
  email?: string;
  phone?: string;
  onComplete?: () => void;
  onBack?: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email = "j***@example.com",
  phone,
  onComplete,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const navigate = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("A new verification code has been sent");
      setCountdown(60);
      setIsResendDisabled(true);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
      setIsLoading(false);
    }, 1500);
  };

  const handleVerify = () => {
    if (otp.join("").length !== 6) {
      toast.error("Please enter a complete verification code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (otp.join("") === "123456") {
        setIsVerified(true);
        toast.success("Verification successful");
        setTimeout(() => (onComplete ? onComplete() : navigate.push("/")), 1500);
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {onBack && (
        <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-white mb-4" onClick={onBack}>
          <LucideArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}

      <h1 className="text-2xl font-bold text-white text-center">Verify your {phone ? "phone" : "email"}</h1>
      <p className="text-gray-400 text-center mb-6">We&apos;ve sent a code to {phone || email}</p>

      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="flex justify-center gap-4 mb-6">
          {Array(6).fill(null).map((_, index) => (
            <input
              key={index}
              ref={(el) => void (inputRefs.current[index] = el)}
              type="text"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              className="w-12 h-12 text-center text-xl font-semibold bg-gray-700 border border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 rounded-lg transition-all outline-none"
              disabled={isLoading || isVerified}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <Button className="w-full py-3 bg-violet-600 hover:bg-violet-700 transition rounded-lg text-white font-medium"
          onClick={handleVerify} disabled={isLoading || otp.join("").length !== 6 || isVerified}>
          {isLoading ? <LucideRefreshCw className="h-5 w-5 animate-spin" /> : isVerified ? <><LucideCheck className="h-5 w-5 mr-2" /> Verified</> : "Verify"}
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-400">Didn't receive the code?</p>
        <Button variant="link" className="text-violet-400 hover:text-violet-500" onClick={handleResendOTP} disabled={isResendDisabled || isLoading || isVerified}>
          {isResendDisabled ? `Resend in ${countdown}s` : "Resend Code"}
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;
