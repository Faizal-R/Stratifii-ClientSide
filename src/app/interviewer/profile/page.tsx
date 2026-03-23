"use client";
import { useEffect, useRef, useState } from "react";
import {
  X,
  User,
  Edit2,
  Save,
  Mail,
  Phone,
  Linkedin,
  Briefcase,
  Upload,
  ImageIcon,
  Check,
  CreditCard,
  FileText,
} from "lucide-react";

import Image from "next/image";
import {
  IInterviewerProfile,
  InterviewerProfileSchema,
  ISkillExpertise,
  SkillProficiencyLevels,
} from "@/validations/InterviewerSchema";
import {
  useAddBankDetails,
  useChangeInterviewerPassword,
  useFetchInterviewerProfile,
  useUpdateInterviewerProfile,
} from "@/hooks/api/useInterviewer";

import { RiseLoader, SyncLoader } from "react-spinners";
import ChangePasswordButton from "@/components/ui/Buttons/ChangePasswordButton";
import PasswordResetFormModal from "@/components/ui/Modals/PasswordResetFormModal";
import { Roles } from "@/constants/enums/roles";
import { InputField } from "@/components/ui/FormFields/InputField";
import { errorToast, successToast } from "@/utils/customToast";

import BankDetailsModal from "@/components/ui/Modals/BankDetailsModal";
import { IBankDetails } from "@/validations/InterviewerSchema";
import InterviewerRejectedPage from "@/components/features/interviewer/InterviewerResubmissionForm";
import ExpertiseSection from "@/components/features/interviewer/ExpertiseSection";
import { useAuthStore } from "@/features/auth/authStore";

function InterviewerProfilePage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAddOrUpdateBankDetailsModal, setShowAddOrUpdateBankDetailsModal] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile, loading: updateLoading } =
    useUpdateInterviewerProfile();
  const { changeInterviewerPassword } = useChangeInterviewerPassword();
  const { addBankDetails, loading: isBankDetailsAdding } = useAddBankDetails();

  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>(
    {} as IInterviewerProfile
  );
  const { user } = useAuthStore();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const validatedInterviewer =
      InterviewerProfileSchema.safeParse(interviewerData);
    if (!validatedInterviewer.success) {
      const errors = validatedInterviewer.error;

      for (const issue of errors.issues) {
        errorToast(issue.message);
      }
      return;
    }

    const respone = await updateInterviewerProfile(
      interviewerData,
      logoPreview!,
      resumePreview
    );
    if (!respone.success) {
      errorToast(respone.message);
      return;
    } else {
      successToast(respone.message);
      
      setResumePreview(null);
      setSelectedResumeFile(null);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLogoPreview(interviewerData.avatar ? interviewerData.avatar : null);
    setResumePreview(null);
    setSelectedResumeFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoPreview(imageUrl);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterviewerData((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "duration"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setResumePreview(fileUrl);
      setSelectedResumeFile(file.name);
    }
  };

  const onHandlePasswordReset = async (state: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const respose = await changeInterviewerPassword(
      state.currentPassword,
      state.newPassword
    );
    if (!respose.success) {
      errorToast(respose.message);
      return;
    }
    successToast(respose.message);
    setShowChangePasswordModal(false);
  };

  const handleAddExpertise = () => {
    setInterviewerData((prev) => ({
      ...prev,
      expertise: [
        ...(prev.expertise || []),
        {
          skill: "",
          proficiencyLevel: SkillProficiencyLevels[0],
          yearsOfExperience: 0,
          skillSource: [],
        },
      ],
    }));
  };

  const handleRemoveExpertise = (index: number) => {
    setInterviewerData((prev) => {
      const updated = [...(prev.expertise || [])];
      updated.splice(index, 1);
      return { ...prev, expertise: updated };
    });
  };

  const handleExpertiseChange = (
    index: number,
    field: keyof ISkillExpertise,
    value: string | string[] | number
  ) => {
    setInterviewerData((prev) => {
      const updated = [...(prev.expertise || [])];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, expertise: updated };
    });
  };

  const onSaveBankDetails = async (bankDetails: IBankDetails) => {
    const response = await addBankDetails(bankDetails);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    setShowAddOrUpdateBankDetailsModal(false);
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchInterviewer = async () => {
      const response = await interviewerProfile();
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      setInterviewerData(response.data as IInterviewerProfile);
      setLogoPreview(response.data?.avatar || null);
    };

    fetchInterviewer();
  }, []);

  return loading ? (
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : user?.status === "rejected" || interviewerData.status === "rejected" ? (
    <InterviewerRejectedPage interviewer={interviewerData} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-violet-950 text-white custom-64">
      {/* Main Section */}
      <main className=" p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}

          <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="h-48 bg-gradient-to-bl from-violet-950 via-violet-900 to-black relative">
            <div className="absolute -bottom-16 left-8 w-40 h-36 rounded-2xl border-4 border-gray-900 overflow-hidden bg-gray-800 flex items-center justify-center z-10">
                {logoPreview ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={logoPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <label className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-bold">Change</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-700">
                    {isEditing ? (
                      <label className="flex flex-col items-center gap-2 cursor-pointer p-4">
                        <Upload className="text-gray-400 w-8 h-8" />
                        <span className="text-xs font-semibold text-gray-400">Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <ImageIcon className="text-gray-400 w-10 h-10" />
                    )}
                  </div>
                )}
                {/* { && (
                 
                )} */}

              </div>
            </div>
            <div className="pt-20 pb-6 px-8 bg-gray-900/60 backdrop-blur-xl rounded-b-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    {interviewerData.name || "Interviewer Profile"}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {interviewerData.position || "Position not specified"}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  {interviewerData?.status === "approved" && (
                    <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      <Check size={16} />
                      Verified
                    </span>
                  )}
                  <ChangePasswordButton
                    onClick={() => setShowChangePasswordModal(true)}
                  />
                  <button
                    onClick={() =>
                      setShowAddOrUpdateBankDetailsModal((prev) => !prev)
                    }
                    className="flex items-center gap-2 px-5 py-2.5 
                      bg-violet-600 hover:bg-violet-700 
                      text-white text-sm font-medium 
                      rounded-lg transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    {interviewerData.bankDetails
                      ? "Update Bank Details"
                      : "  Add Bank Account"}
                  </button>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
                      >
                        {updateLoading ? (
                          <SyncLoader color="white" size={12} />
                        ) : (
                          <>
                            <Save size={18} />
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
              <InputField
                icon={User}
                label="Full Name"
                placeholder="Enter full name"
                value={interviewerData.name || ""}
                name="name"
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <InputField
                icon={Mail}
                label="Email"
                placeholder="Enter email"
                value={interviewerData.email || ""}
                name="email"
                isEditing={isEditing}
                handleChange={handleChange}
                type="email"
              />
              <InputField
                icon={Phone}
                label="Phone"
                placeholder="Enter phone number"
                value={interviewerData.phone || ""}
                name="phone"
                isEditing={isEditing}
                handleChange={handleChange}
                type="tel"
              />
              <InputField
                icon={Briefcase}
                label="Position"
                placeholder="Enter position"
                value={interviewerData.position || ""}
                name="position"
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
              <InputField
                icon={Linkedin}
                label="LinkedIn Profile"
                placeholder="Enter LinkedIn URL"
                value={interviewerData.linkedinProfile || ""}
                name="linkedinProfile"
                isEditing={isEditing}
                handleChange={handleChange}
              />

              <InputField
                icon={Briefcase}
                label="Experience (years)"
                placeholder="Enter years of experience"
                value={interviewerData.experience || ""}
                name="experience"
                isEditing={isEditing}
                handleChange={handleChange}
                type="number"
              />
              <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-4">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText className="text-violet-400" size={20} />
                  Upload Resume (PDF or DOCX)
                </label>
                <div className="space-y-3">
                  {isEditing ? (
                    <>
                      {interviewerData.resume && (
                        <div className="flex items-center gap-2 p-2 bg-violet-600/10 border border-violet-500/20 rounded-lg">
                          <FileText className="text-violet-400 w-4 h-4" />
                          <a
                            href={interviewerData.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-violet-400 hover:underline"
                          >
                            Current Resume
                          </a>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-400">
                          {interviewerData.resume ? "Upload New Resume" : "Click to upload resume"}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            name="resume"
                            onChange={handleResumeUpload}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700 cursor-pointer"
                          />
                          {selectedResumeFile && (
                            <p className="mt-2 text-sm text-green-400 flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              Selected: {selectedResumeFile}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    interviewerData.resume ? (
                      <a
                        href={interviewerData.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-violet-600/10 border border-violet-500/20 rounded-xl group transition-all hover:bg-violet-600/20"
                      >
                        <FileText className="text-violet-400" />
                        <span className="text-violet-400 font-medium group-hover:underline">
                          View Uploaded Resume
                        </span>
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No resume uploaded</p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Upload */}

          <div className=" flex flex-col gap-6">
            {/* Expertise */}

            {/* Grid wrapper for expertise items */}
            <ExpertiseSection
              expertise={interviewerData.expertise}
              handleAddExpertise={handleAddExpertise}
              handleRemoveExpertise={handleRemoveExpertise}
              handleExpertiseChange={handleExpertiseChange}
              isEditing={isEditing}
            />
          </div>
        </div>
      </main>

      {showChangePasswordModal && (
        <PasswordResetFormModal
          onClose={() => setShowChangePasswordModal(false)}
          role={Roles.INTERVIEWER}
          userId={interviewerData._id!}
          handleSubmit={onHandlePasswordReset}
        />
      )}
      {showAddOrUpdateBankDetailsModal && (
        <BankDetailsModal
          onClose={() => setShowAddOrUpdateBankDetailsModal(false)}
          onSave={onSaveBankDetails}
          loading={isBankDetailsAdding}
          initialValues={interviewerData.bankDetails ?? null}
        />
      )}
    </div>
  );
}

export default InterviewerProfilePage;
