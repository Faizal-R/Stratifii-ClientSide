"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Search, Building2, ChevronLeft, ChevronRight, EyeIcon } from "lucide-react";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";
import { useAdminInterviewers, useHandleInterveiwerVerification, useInterviewerUpdate } from "@/hooks/useAdmin";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { Modal } from "@/components/ui/ConfirmationModal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IInterviewer } from "@/types/IInterviewer";
import InterviewerDetailsModal from "@/components/ui/UserDetailsModal";


function AdminInterviewerManagement() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedInterviewerId, setSelectedInterviewerId] = useState("");
  
  const [activeTab, setActiveTab] = useState("approved");
  const {verifyOrRejectInterviewer}=useHandleInterveiwerVerification();
  const [selectedInterviewerForDetails,setSelectedInterviewerForDetails]=useState<IInterviewer>({} as IInterviewer)

  const { fetchInterviewers, loading } = useAdminInterviewers();
  const [interviewers, setInterviewers] = useState<IInterviewer[] | []>([]);
  
  const [isDetailsModalOpen,setIsDetailsModalOpen] = useState(false);



  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { updatedInterviewer } = useInterviewerUpdate();

  const showConfirmModal = async (interviewerId: string) => {
    console.log(interviewerId);
    setSelectedInterviewerId(interviewerId);
    setIsConfirmModalOpen(true);
  };

  const showDetailsModal=(interviewer:IInterviewer)=>{
     setIsDetailsModalOpen(true);
    setSelectedInterviewerForDetails(interviewer);
  }

  async function handleToggleBlock() {
    if (!selectedInterviewerId) return;
    await updatedInterviewer(selectedInterviewerId);
    setInterviewers(
      interviewers.map((interviewer: IInterviewer) =>
        interviewer._id === selectedInterviewerId
          ? { ...interviewer, isBlocked: !interviewer.isBlocked }
          : interviewer
      )
    );
    setSelectedInterviewerId("");
    setIsConfirmModalOpen(false);
  }

  const filteredInterviewers = interviewers.filter(
    (interviewer) =>
      interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interviewer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInterviewers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInterviewers = filteredInterviewers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCompanyVerification=async(interviewerId:string,isApproved:boolean)=>{
    const response=await verifyOrRejectInterviewer(interviewerId,isApproved);
    if (!response.success) {
      toast.error(response.error);
      return;
    
    }  if (response.data && isApproved === true) {
          toast.success("Company Verified successfully");
          setInterviewers(
            interviewers.map((interviewer) =>
              interviewer._id === response.data._id
                ? response.data
                : interviewer
            )
          );
    
          setActiveTab("approved");
        } else {
          toast("Interviewer Verification rejected successfully.");
          setInterviewers(interviewers.filter(interviewer=>interviewer._id! == response.data._id))
        }
  }


  const getInterviewers = useCallback(async () => {
    const response = await fetchInterviewers(activeTab);
    if (!response.success) {
      toast.error(response.error);
    } else {
      setInterviewers(response.data);
    }
  }, [fetchInterviewers,activeTab]);

  useEffect(() => {
    getInterviewers();
  }, [getInterviewers]);

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <>
      <Modal
        description={`Are you sure you want to ${
          interviewers.find((i) => i._id === selectedInterviewerId)?.isBlocked
            ? "unblock"
            : "block"
        } this interviewer?`}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleToggleBlock}
        title="Confirm Action"
      />

      <InterviewerDetailsModal
       isOpen={isDetailsModalOpen}
       user={selectedInterviewerForDetails}
       onClose={() => setIsDetailsModalOpen(false)}
      />
      <div className="min-h-screen  pl-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-violet-100 mb-4">
              Interviewer Management
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
                  placeholder="Search Interviewers..."
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

          <div className="border border-violet-900 rounded-lg shadow text-violet-200">
            <div className="overflow-x-auto">
              <table className="w-full text-violet-300">
                <thead>
                  <tr className=" border-b border-violet-900">
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInterviewers.map((interviewer) => (
                    <tr
                      key={interviewer._id}
                      className="border-b text-violet-200 border-violet-900 hover:bg-slate-950"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Building2
                            className="text-violet-500 mr-3"
                            size={24}
                          />
                          <span className="font-medium ">
                            {interviewer.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{interviewer.email}</td>

                      <td className="px-6 py-4 ">
                        {new Date(interviewer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            interviewer.isBlocked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {interviewer.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => showDetailsModal(interviewer)}
                            className="text-violet-300 hover:text-violet-100 transition-colors"
                            title="View Details"
                          >
                            <EyeIcon size={20} />
                          </button>
                          <button
                            onClick={() => {
                              showConfirmModal(interviewer._id!);
                            }}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                              interviewer.isBlocked
                                ? "bg-green-50 text-green-700 hover:bg-green-100"
                                : "bg-red-50 text-red-700 hover:bg-red-100"
                            } transition-colors`}
                          >
                            {interviewer.isBlocked ? "Unblock" : "Block"}
                          </button>
                          {activeTab === "pending" && (
                            <div className="flex gap-2">
                              <button
                                className="hover:text-violet-400"
                                onClick={() =>
                                  handleCompanyVerification(interviewer._id!, false)
                                }
                              >
                                <FaTimes />
                              </button>
                              <button
                                className="hover:text-violet-400"
                                onClick={() =>
                                  handleCompanyVerification(interviewer._id!, true)
                                }
                              >
                                <FaCheck />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredInterviewers.length
                  )}{" "}
                  of {filteredInterviewers.length} interviewers
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtectedRoute(AdminInterviewerManagement, [Roles.ADMIN]);
