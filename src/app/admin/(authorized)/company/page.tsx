"use client";
import React, { useCallback, useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import { toast } from "sonner";

import {
  useAdminCompany,
  useAdminCompanyUpdate,
  useHandleCompanyVerification,
} from "@/hooks/api/useAdmin";

import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import CompanyDetailsModal from "@/components/ui/Modals/UserDetailsModal";
import { ICompany } from "@/validations/CompanySchema";
import { GenericTable } from "@/components/reusable/table/GenericTable";
import { getAdminCompanyColumns } from "@/constants/table-columns/companyColumn";
import { errorToast, successToast } from "@/utils/customToast";
import { useSocketStore } from "@/features/socket/Socket";

// Reasons for rejecting a company
const companyVerificationReasons = [
  { value: "incomplete_profile", label: "Incomplete Company Profile" },
  { value: "invalid_documents", label: "Invalid / Fake Documents Submitted" },
  { value: "suspicious_activity", label: "Suspicious or Fraudulent Activity" },
  { value: "duplicate_account", label: "Duplicate / Existing Company Account" },
  { value: "policy_violation", label: "Violation of Platform Terms" },
  { value: "other", label: "Other" },
];

function AdminCompanyManagement() {
  const [isConfirmBlockModalOpen, setIsConfirmBlockModalOpen] = useState(false);
  const [isVerificationAcceptModalOpen, setIsVerificationAccept] =
    useState(false);
  const [isVerificationRejectModalOpen, setIsVerificationRejectModalOpen] =
    useState(false);

    const {socket}=useSocketStore()

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCompanyForDetails, setSelectedCompanyForDetails] =
    useState<ICompany | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [activeTab, setActiveTab] = useState("approved");

  const { companies: fetchCompanies, loading } = useAdminCompany();
  const { updateCompany } = useAdminCompanyUpdate();
  const { verifyOrRejectCompany } = useHandleCompanyVerification();

  // Show details modal
  const showDetailsModal = (company: ICompany) => {
    setSelectedCompanyForDetails(company);
    setIsDetailsModalOpen(true);
  };

  // Show confirmation modal (block/unblock)
  const showConfirmBlockModal = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsConfirmBlockModalOpen(true);
  };

  // Show verification modals
  const showConfirmVerificationModal = (
    companyId: string,
    isApprove: boolean
  ) => {
    setSelectedCompanyId(companyId);
    if (isApprove) {
      setIsVerificationAccept(true);
    } else {
      setIsVerificationRejectModalOpen(true);
    }
  };

  // Toggle block/unblock
  async function handleToggleBlock() {
    if (!selectedCompanyId) return;
    await updateCompany(selectedCompanyId);
    setCompanies(
      companies.map((c) =>
        c._id === selectedCompanyId ? { ...c, isBlocked: !c.isBlocked } : c
      )
    );
    setSelectedCompanyId("");
    setIsConfirmBlockModalOpen(false);
  }

  // Handle verification (approve/reject)
  const handleCompanyVerification = async (
    companyId: string,
    isApproved: boolean,
    reasonForRejection?: string
  ) => {
    const response = await verifyOrRejectCompany(
      companyId,
      isApproved,
      reasonForRejection
    );
    if (!response.success) {
      errorToast(response.message);
      return;
    }

    socket.emit("user:status", {
      userId: companyId,
      status: isApproved ? "approved" : "rejected",
    });
    if (response.data && isApproved) {
      successToast("Company verified successfully");
      setCompanies(
        companies.map((c) => (c._id === response.data._id ? response.data : c))
      );
      setActiveTab("approved");
      setIsVerificationAccept(false);
    } else {
      toast("Company verification rejected successfully");
      setCompanies(companies.filter((c) => c._id !== response.data._id));
      setIsVerificationRejectModalOpen(false);
    }
  };

  // Fetch companies
  const loadCompanies = useCallback(async () => {
    const response = await fetchCompanies(activeTab);
    if (!response.success) {
      errorToast(response.message);
    } else {
      setCompanies(response.data);
    }
  }, [fetchCompanies, activeTab]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const columns = getAdminCompanyColumns({
    onView: showDetailsModal,
    onBlockToggle: showConfirmBlockModal,
    onOpenVerificationModal: showConfirmVerificationModal,
    activeTab,
  });

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <RiseLoader color="white" />
    </div>
  ) : (
    <>
      <Modal
        description={
          isConfirmBlockModalOpen
            ? `Are you sure you want to ${
                companies.find((c) => c._id === selectedCompanyId)?.isBlocked
                  ? "unblock"
                  : "block"
              } this company?`
            : "Are you sure you want to verify this company?"
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
            : () => handleCompanyVerification(selectedCompanyId!, true)
        }
        title={
          isVerificationRejectModalOpen ? "Reject Company" : "Confirm Action"
        }
        {...(isVerificationRejectModalOpen && {
          reasonOptions: companyVerificationReasons,
          onConfirmWithReason: (reason: string) =>
            handleCompanyVerification(selectedCompanyId!, false, reason),
        })}
      />

      {selectedCompanyForDetails && (
        <CompanyDetailsModal
          isOpen={isDetailsModalOpen}
          user={selectedCompanyForDetails}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedCompanyForDetails(null);
          }}
          isCompany={true}
        />
      )}

      <div className=" min-h-screen bg-gradient-to-br from-black via-black to-violet-950">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-violet-100 mb-4">
            Company Management
          </h1>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "approved"
                  ? "bg-violet-500 text-white"
                  : "text-violet-200 hover:bg-violet-100 hover:bg-opacity-10"
              }`}
            >
              Verified Companies
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
          </div>

          <div className="rounded-lg shadow text-violet-200">
            <GenericTable columns={columns} data={companies} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCompanyManagement;
