"use client";
import { useState, useEffect, useRef } from "react";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useTriggerOtpResend, useVerifyOtp } from "@/hooks/api/useAuth";
import { RiseLoader } from "react-spinners";
import { errorToast, successToast } from "@/utils/customToast";

function OtpVerificationPage() {
  const [timeLeft, setTimeLeft] = useState(180);
  const {resendOtp,loading:isResendLogging}=useTriggerOtpResend()
  const router = useRouter();

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = useSearchParams().get("email") ?? "";
  const role = useSearchParams().get("role") ?? "";

  console.log(role, email);

  const { loading, verifyOtp } = useVerifyOtp();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Move to next input if current input is filled
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");

    const newVerificationCode = [...verificationCode];
    pastedData.forEach((char, index) => {
      if (index < 6) {
        newVerificationCode[index] = char;
      }
    });

    setVerificationCode(newVerificationCode);

    // Focus the appropriate input after paste
    if (pastedData.length < 6) {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  const resendCode =async () => {
    await resendOtp(email)
    setTimeLeft(180);
    
  };

  const onHandleOtpVerification = async () => {
    if (verificationCode.includes("")) {
      errorToast("All the fields are required")
      return;
    }
    console.log(verificationCode);
    const response = await verifyOtp({
      otp: verificationCode.join(""),
      email,
      role,
    });
    if (!response.success) {
      errorToast(response.error)
      return;
    }
    successToast(response.message);

    setTimeout(() => {
      router.push("/signin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-violet-900/50 bg-gradient-to-tl from-black via-black to-violet-950/30 rounded-lg p-8 shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="bg-black border border-violet-900/50 p-3 rounded-full">
            <Shield className="w-8 h-8 text-violet-600/50" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">
        Enter OTP to verify.Resend if needed.
        </h1>
        <p className="text-gray-400 text-center mb-6">
          We&apos;ve sent a verification code to <b>{email}</b>
        </p>

        <div className="flex justify-between mb-6">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="number"
              maxLength={1}
              className="w-12 h-12 bg-violet-900/90 border-none rounded text-center text-white text-xl focus:outline-none focus:ring-2 focus:ring-violet-800/50"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft%60).toString().padStart(2,"0")} </span>
          </div>

          <button
            disabled={timeLeft>0}
            onClick={resendCode}
            className={timeLeft>0?"text-[#1b468b] hover:cursor-not-allowed focus:outline-none":"text-[#3b82f6] hover:text-[#2563eb] focus:outline-none"}
          >
         {isResendLogging ? "Resending OTP..." : "Resend Code"}
          </button>
        </div>

        <button
          disabled={loading}
          onClick={onHandleOtpVerification}
          className="w-full bg-black/80 border border-violet-950/50 hover:bg-violet-950/90  text-white py-3 rounded-md font-medium transition-colors"
        >
          {loading ? <RiseLoader /> : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

export default OtpVerificationPage;
