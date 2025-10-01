"use client";
import InterviewerRejectedPage from "@/components/features/interviewer/InterviewerResubmissionForm";
import { useFetchInterviewerProfile } from "@/hooks/api/useInterviewer";
import { errorToast } from "@/utils/customToast";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";

import { CheckCircle, Hourglass, Info } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

const InterviewerVerifiedLayout = ({ children }: { children: ReactNode }) => {
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const [interviewer, setInterviewer] = useState({} as IInterviewerProfile);

  // const hasFetched = useRef(false);

  useEffect(() => {
    // if (hasFetched.current) return;

    // hasFetched.current = true;

    const fetchInterviewer = async () => {
      const response = await interviewerProfile();
      console.log(response);
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      setInterviewer(response.data as IInterviewerProfile);
      console.log("Interviewer in Layout", response.data);
    };

    fetchInterviewer();
  }, [interviewerProfile]);
  return loading ? (
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : interviewer.status === "pending" ? (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className=" text-white p-6 rounded-xl shadow-2xl flex flex-col items-center text-center max-w-md w-full transition-all duration-300 mx-auto 
        "
      >
        {/* Animated Icon */}
        <div className="relative mb-4">
          <Hourglass className="text-yellow-500 w-12 h-12 " />
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
  ) : interviewer.status === "rejected" ? (
    <InterviewerRejectedPage interviewer={interviewer} />
  ) : (
    <div>{children}</div>
  );
};

export default InterviewerVerifiedLayout;
