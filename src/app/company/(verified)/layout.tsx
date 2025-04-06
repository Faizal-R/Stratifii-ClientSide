"use client";
import { useFetchCompanyProfile } from "@/hooks/useCompany";
import { ICompany } from "@/validations/CompanySchema";
import { CheckCircle, Hourglass, Info } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { RiseLoader } from "react-spinners";
import { toast } from "sonner";
const ComanyVerfiedLayout = ({ children }: { children: ReactNode }) => {
  const { companyProfile, loading } = useFetchCompanyProfile();
  const [company, setCompany] = useState({} as ICompany);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchCompany = async () => {
      const response = await companyProfile();
      if (!response.success) {
        toast(response.error);
        return;
      }
      setCompany(response.data);
    };

    fetchCompany();
  }, [companyProfile]);
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : company.status === "approved" ? (
    <div>{children}</div>
  ) : (
    <div className="flex items-center justify-center min-h-screen ">
      <div
        className=" text-white p-6 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-md w-full transition-all duration-300 mx-auto 
        "
      >
        {/* Animated Icon */}
        <div className="relative mb-4">
          <Hourglass className="text-yellow-500 w-12 h-12 animate-spin-slow" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
          Account Under Verification
        </h1>

        {/* Message */}
        <p className="text-gray-300 mb-4 flex items-center gap-2 ">
          <Info className="w-10 h-5 text-blue-400" />
          Your account is being verified. Access is limited to your profile
          only.
        </p>

        {/* Progress Indicator */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full mb-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-yellow-200">Processing</span>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-400 mt-4 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          Verification typically takes 24-48 hours
        </p>
      </div>
    </div>
  );
};

export default ComanyVerfiedLayout;
