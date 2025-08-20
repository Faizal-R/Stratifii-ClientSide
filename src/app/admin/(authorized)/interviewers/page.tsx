"use client";
import React, { useCallback, useEffect, useState } from "react";

import {
  useAdminInterviewers,
  useHandleInterveiwerVerification,
  useInterviewerUpdate,
} from "@/hooks/api/useAdmin";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IInterviewer } from "@/types/IInterviewer";
import InterviewerDetailsModal from "@/components/ui/Modals/UserDetailsModal";
import { GenericTable } from "@/components/reusable/table/GenericTable";
import { getAdminInterviewerColumns } from "@/constants/table-columns/interviewerColumns";
import { set } from "zod";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
const interviewerVerificationReasons = [
  {
    value: "less_experience",
    label: "Less Than 3 Years of Professional Experience",
  },
  {
    value: "incomplete_profile",
    label: "Incomplete or Missing Profile Information",
  },
  {
    value: "unverified_technical_background",
    label: "Unverified or Weak Technical Background",
  },
  {
    value: "suspicious_activity",
    label: "Suspicious or Inconsistent Information Detected",
  },
  {
    value: "invalid_linkedin",
    label: "Invalid or Fake LinkedIn / Portfolio Link",
  },
  {
    value: "communication_concerns",
    label: "Lack of Clear Communication Skills",
  },
  {
    value: "duplicate_account",
    label: "Duplicate or Existing Interviewer Account",
  },
  {
    value: "policy_violation",
    label: "Violation of Platform Terms or Expectations",
  },
  { value: "other", label: "Other" },
];

function AdminInterviewerManagement() {
  const [isConfirmBlockModalOpen, setIsConfirmBlockModalOpen] = useState(false);
  const [isVerificationAcceptModalOpen, setIsVerificationAccept] =
    useState(false);
  const [isVerificationRejectModalOpen, setIsVerificationRejectModalOpen] =
    useState(false);

  const [selectedInterviewerId, setSelectedInterviewerId] = useState("");

  const [activeTab, setActiveTab] = useState("approved");
  const { verifyOrRejectInterviewer } = useHandleInterveiwerVerification();

  const [selectedInterviewerForDetails, setSelectedInterviewerForDetails] =
    useState<IInterviewerProfile | null>(null);

  const { fetchInterviewers, loading } = useAdminInterviewers();
  const [interviewers, setInterviewers] = useState<IInterviewerProfile[] | []>([]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { updatedInterviewer } = useInterviewerUpdate();

  const showConfirmModal = async (interviewerId: string) => {
    console.log(interviewerId);
    setSelectedInterviewerId(interviewerId);
    setIsConfirmBlockModalOpen(true);
  };

  // FIX: Improved safety check and state setting
  const showDetailsModal = (interviewer: IInterviewerProfile) => {
    if (interviewer && interviewer._id) {
      setSelectedInterviewerForDetails(interviewer);
      setIsDetailsModalOpen(true);
    }
  };

  async function handleToggleBlock() {
    if (!selectedInterviewerId) return;
    await updatedInterviewer(selectedInterviewerId);
    setInterviewers(
      interviewers.map((interviewer: IInterviewerProfile) =>
        interviewer._id === selectedInterviewerId
          ? { ...interviewer, isBlocked: !interviewer.isBlocked }
          : interviewer
      )
    );
    setSelectedInterviewerId("");
    setIsConfirmBlockModalOpen(false);
  }

  const handleInterviewerVerification = async (
    interviewerId: string,
    isApproved: boolean,
    reasonForRejection?:string
  ) => {
    let matchedInterviewer = interviewers.find((i) => i._id === interviewerId);
    const response = await verifyOrRejectInterviewer(
      interviewerId,
      isApproved,
      matchedInterviewer?.name!,
      matchedInterviewer?.email!,
      reasonForRejection
    );
    if (!response.success) {
      toast.error(response.error);
      return;
    }
    if (response.data && isApproved === true) {
      toast.success("Interviewer Verified successfully");
      setInterviewers(
        interviewers.map((interviewer) =>
          interviewer._id === response.data._id ? response.data : interviewer
        )
      );
      setActiveTab("approved");
    } else {
      toast("Interviewer Verification rejected successfully.");
      setInterviewers(
        interviewers.filter(
          (interviewer) => interviewer._id !== response.data._id
        )
      );
      setIsVerificationRejectModalOpen(false)
    }
  };

  const showConfirmVerificationModal = async (
    interviewerId: string,
    isVerifyOrReject: boolean
  ) => {
    console.log(interviewerId);
    console.log(isVerifyOrReject)
    setSelectedInterviewerId(interviewerId);
    if (isVerifyOrReject) {
      setIsVerificationAccept(true);
    } else {
      setIsVerificationRejectModalOpen(true);
    }
  };

  const getInterviewers = useCallback(async () => {
    const response = await fetchInterviewers(activeTab);
    if (!response.success) {
      toast.error(response.error);
    } else {
      setInterviewers(response.data);
    }
  }, [fetchInterviewers, activeTab]);

  useEffect(() => {
    getInterviewers();
  }, [getInterviewers]);

  const columns = getAdminInterviewerColumns({
    onView: showDetailsModal,
    onBlockToggle: showConfirmModal,
    onOpenVerificationModal: showConfirmVerificationModal,
    activeTab,
  });

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <>
      <Modal
        description={
          isConfirmBlockModalOpen
            ? `Are you sure you want to ${
                interviewers.find((i) => i._id === selectedInterviewerId)
                  ?.isBlocked
                  ? "unblock"
                  : "block"
              } this interviewer?`
            : "Are you sure you want to verify this interviewer?"
        }
        isOpen={
          isVerificationRejectModalOpen
            ? isVerificationRejectModalOpen
            : isConfirmBlockModalOpen
            ? isConfirmBlockModalOpen
            : isVerificationAcceptModalOpen
        }
        onClose={() =>
          isVerificationRejectModalOpen
            ? setIsVerificationRejectModalOpen(false)
            : isConfirmBlockModalOpen
            ? setIsConfirmBlockModalOpen(false)
            : setIsVerificationAccept(false)
        }
        onConfirm={
        
             isConfirmBlockModalOpen
            ? handleToggleBlock
            : () => handleInterviewerVerification(selectedInterviewerId!, true)
        }
        title={
          isVerificationRejectModalOpen
            ? "Reject Interviewer"
            : "Confirm Action"
        }
        {...(isVerificationRejectModalOpen && {
          reasonOptions: interviewerVerificationReasons,
          onConfirmWithReason: (reason:string) => handleInterviewerVerification(selectedInterviewerId!, false,reason)

        })}
        

      />

      {selectedInterviewerForDetails && (
        <InterviewerDetailsModal
          isOpen={isDetailsModalOpen}
          user={selectedInterviewerForDetails}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedInterviewerForDetails(null);
          }}
          isCompany={false}
        />
      )}

      <div className="min-h-screen pl-64 bg-gradient-to-br from-black via-black to-violet-950">
        <div className="py-5 px-8">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-violet-100 mb-4">
              Interviewer Management
            </h1>
            <div className="flex space-x-4 mb-4 w-full">
              <button
                onClick={() => setActiveTab("approved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "approved"
                    ? "bg-violet-500 text-white"
                    : "text-violet-200 hover:bg-violet-100 hover:bg-opacity-10"
                }`}
              >
                Verified Interviewers {/* FIX: Changed label */}
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "pending"
                    ? "bg-violet-500 text-white"
                    : "text-violet-200 hover:bg-violet-100 hover:bg-opacity-10"
                }`}
              >
                Pending Approval
              </button>
              {/* <div className="relative w-80">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search Interviewers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div> */}
            </div>
          </div>

          <div className=" rounded-lg shadow text-violet-200">
            <GenericTable columns={columns} data={interviewers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminInterviewerManagement
