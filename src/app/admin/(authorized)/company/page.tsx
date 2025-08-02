"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  Building2,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
} from "lucide-react";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/enums/roles";
import {
  useAdminCompany,
  useAdminCompanyUpdate,
  useHandleCompanyVerification,
} from "@/hooks/api/useAdmin";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import CompanyDetailsModal from "@/components/ui/Modals/UserDetailsModal";
import { ICompany } from "@/validations/CompanySchema";
import { FaCheck, FaTimes } from "react-icons/fa";
import { GenericTable } from "@/components/reusable/table/GenericTable";
import { getAdminCompanyColumns } from "@/constants/table-columns/companyColumn";
import { date } from "zod";

function AdminCompanyManagement() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCompanyForDetails, setSelectedCompanyForDetails] =
    useState<ICompany | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { companies: getCompanies, loading } = useAdminCompany();
  const { verifyOrRejectCompany } = useHandleCompanyVerification();
  const [companies, setCompanies] = useState<ICompany[] | []>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeTab, setActiveTab] = useState("approved");

  const { updateCompany } = useAdminCompanyUpdate();

  const handleCompanyVerification = async (
    companyId: string,
    isApproved: boolean
  ) => {
    const response = await verifyOrRejectCompany(companyId, isApproved);
    if (!response.success) {
      toast.error(response.error);
      return;
    }
    console.log(response);
    if (response.data && isApproved === true) {
      toast.success("Company Verified successfully");
      setCompanies(
        companies.map((company) =>
          company._id === response.data._id ? response.data : company
        )
      );

      setActiveTab("approved");
    } else {
      toast("Company verification rejected successfully.");
      setCompanies(
        companies.filter((company) => company._id !== response.data._id)
      );
    }
  };

  const showConfirmModal = async (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsConfirmModalOpen(true);
  };

  const showDetailsModal = (company: ICompany) => {
    setSelectedCompanyForDetails(company);
    setIsDetailsModalOpen(true);
  };
  async function handleToggleBlock() {
    if (!selectedCompanyId) return;
    await updateCompany(selectedCompanyId);
    setCompanies(
      companies.map((company) =>
        company._id === selectedCompanyId
          ? { ...company, isBlocked: !company.isBlocked }
          : company
      )
    );
    setSelectedCompanyId("");
    setIsConfirmModalOpen(false);
  }

  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchCompanies = useCallback(async () => {
    const response = await getCompanies(activeTab);
    if (!response.success) {
      toast.error(response.error);
    } else {
      setCompanies(response.data);
    }
  }, [getCompanies, activeTab]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const columns = getAdminCompanyColumns({
  onView: showDetailsModal,
  onBlockToggle: showConfirmModal,
  onVerify: (id) => handleCompanyVerification(id, true),
  onReject: (id) => handleCompanyVerification(id, false),
  activeTab,
});

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <>
      <Modal
        description={`Are you sure you want to ${
          companies.find((c) => c._id === selectedCompanyId)?.isBlocked
            ? "unblock"
            : "block"
        } this company?`}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleToggleBlock}
        title="Confirm Action"
      />
      <CompanyDetailsModal
        isOpen={isDetailsModalOpen}
        user={selectedCompanyForDetails!}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <div className="min-h-screen  pl-64 bg-gradient-to-br from-black via-black to-violet-950">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-violet-100 mb-4">
              Company Management
            </h1>
            <div className="flex space-x-4 mb-4 w-full">
              <button
                onClick={() => setActiveTab("approved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  // isConfirmModalOpen === false
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
              <div className="relative w-80">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow text-violet-200">
            <div className="overflow-x-auto">
              
              <GenericTable columns={columns} data={companies}/>
            </div>

            {/* Pagination Controls */}
            {/* <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredCompanies.length
                  )}{" "}
                  of {filteredCompanies.length} companies
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-violet-500 text-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? "bg-violet-500 text-white"
                            : "text-gray-600 hover:bg-violet-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-violet-500 text-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtectedRoute(AdminCompanyManagement, [Roles.ADMIN]);
