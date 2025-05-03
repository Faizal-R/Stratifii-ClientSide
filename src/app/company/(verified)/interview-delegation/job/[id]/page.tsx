"use client";
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  X,
  FileText,
  Users,
  PlayCircle,
  UserCheck,
  CalendarClock,
} from "lucide-react";
import FileUploadModal from "@/components/ui/modals/FileUploadModal";
import {
  useGetCandidatesByJob,
  useUploadResumesAndCreateCandidates,
} from "@/hooks/useJob";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { Modal } from "@/components/ui/modals/ConfirmationModal";
import PaymentProceedModal from "@/components/ui/modals/PaymentProceedModal";
import {
  usePaymentOrderCreation,
  usePaymentVerificationAndCreatePaymentRecord,
} from "@/hooks/usePayment";
import { initiateRazorpayPayment } from "@/utils/razorpay";

interface FileWithPreview extends File {
  preview?: string;
}

function JobManagementPage() {
  const { paymentOrderCreation } = usePaymentOrderCreation();
  const { paymentVerificationAndCreatePaymentRecord } =
    usePaymentVerificationAndCreatePaymentRecord();
  const jobId = useParams().id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { loading, getCandidatesByJob } = useGetCandidatesByJob();
  const { uploadResumesAndCreateCandidates } =
    useUploadResumesAndCreateCandidates();
  const handleModalConfirmation = async (totalAmount: number) => {
    alert("Interview Process Initiated");
    const response = await paymentOrderCreation(totalAmount);
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    }
    setIsConfirmationModalOpen(false);
    const { id: orderId, amount } = response.data;
    initiateRazorpayPayment({
      amount: amount,
      orderId: orderId,
      name: "Stratifii Interviews",
      description: "Subscription Payment",
      image: "https://your-image-url",
      prefill: {
        name: "Stratifii",
        email: "stratifii@gmail.com",
        contact: "1234567890",
      },
      onSuccess: async (response) => {
        const res = await paymentVerificationAndCreatePaymentRecord(
          response,
          jobId,
          candidates.length
        );
        if (!res.success) {
          toast.error(res.error, {
            className: "custom-error-toast",
          });
          return;
        }
        toast.success(res.message, {});
      },
    });
  };
  const [candidates, setCandidates] = useState<ICandidateJob[]>([]);

  const onhandleCandidateDelegationComplete = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resumes", file);
    });

    const response = await uploadResumesAndCreateCandidates(jobId!, formData);
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    }
    setCandidates(response.data);
    toast.success(response.message);
    setIsModalOpen(false);
  };

  // const removeFile = (candidateId: string, fileToRemove: File) => {
  //   setCandidates(
  //     candidates.map((candidate) => {
  //       if (candidate.id === candidateId) {
  //         return {
  //           ...candidate,
  //           files: candidate.files.filter((file) => file !== fileToRemove),
  //         };
  //       }
  //       return candidate;
  //     })
  //   );
  // };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchCandidates = async () => {
      const response = await getCandidatesByJob(jobId);
      if (!response.success) {
        toast.error(response.error, {
          className: "custom-error-toast",
        });
        return;
      }
      setCandidates(response.data);
    };

    fetchCandidates();
  }, [getCandidatesByJob]);

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className="min-h-screen  ml-64">
      {/* Header */}
      <div className="text-violet-300 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delegate Candidates</h1>
          {candidates.length > 0 && (
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Resume
              </button>
              <button
                onClick={() => setIsConfirmationModalOpen(true)}
                className="bg-gradient-to-br from-green-900 to-black border border-green-900 hover:cursor-pointer
              hover:from-green-950 hover:to-gray-900 text-violet-100 font-semibold py-2 px-4 rounded-md flex items-center gap-2 "
              >
                <PlayCircle className="h-5 w-5 animate-pulse-slow" />
                Initiate Interview Process
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]  rounded-lg shadow-sm">
            <Users className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Candidates Available
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              There are currently no candidates assigned to this position. New
              candidates will appear here once they are assigned.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center mt-5 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.candidate._id}
                className="relative group bg-gradient-to-br from-violet-950 via-gray-950 to-black/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Glow background */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-600/20 blur-2xl rounded-full z-0 group-hover:opacity-60 transition-all" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-4 mb-4">
                  <img
                    src={
                      candidate.candidate.avatar ||
                      "https://png.pngitem.com/pimgs/s/508-5087336_person-man-user-account-profile-employee-profile-template.png"
                    }
                    alt={candidate.candidate.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-violet-600 shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {candidate.candidate.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {candidate.candidate.email}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="relative z-10 space-y-4 text-sm text-gray-200">
                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-medium text-violet-300">
                      <UserCheck size={16} className="text-violet-400" />
                      Status
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
        ${
          candidate.candidate.status === "pending"
            ? "bg-yellow-200 text-yellow-900"
            : "bg-green-300 text-green-900"
        }
      `}
                    >
                      {candidate.candidate.status}
                    </span>
                  </div>

                  {/* Resume */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-medium text-violet-300">
                      <FileText size={16} className="text-violet-400" />
                      Resume
                    </div>
                    {candidate.candidate.resume ? (
                      <a
                        href={`https://docs.google.com/viewer?url=${candidate.candidate.resume}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-violet-700 text-white text-xs px-3 py-1 rounded-full hover:bg-violet-800 transition"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        Not Uploaded
                      </span>
                    )}
                  </div>

                  {/* Interview Status */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-medium text-violet-300">
                      <CalendarClock size={16} className="text-violet-400" />
                      Interview
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
        ${
          candidate.interviewStatus === "final_scheduled"
            ? "bg-blue-300 text-blue-900"
            : candidate.interviewStatus === "mock_started"
            ? "bg-green-200 text-green-900"
            : candidate.interviewStatus === "pending"
            ? "bg-red-300 text-red-900"
            : "bg-gray-300 text-gray-900"
        }
      `}
                    >
                      {candidate.interviewStatus === "pending"
                        ? "Not Scheduled"
                        : candidate.interviewStatus || "Not Scheduled"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <FileUploadModal
          setIsModalOpen={setIsModalOpen}
          onComplete={onhandleCandidateDelegationComplete}
        />
      )}

      <PaymentProceedModal
        isOpen={isConfirmationModalOpen}
        onClosed={() => setIsConfirmationModalOpen(false)}
        onProceed={handleModalConfirmation}
        candidatesCount={candidates.length}
      />
    </div>
  );
}

export default JobManagementPage;
