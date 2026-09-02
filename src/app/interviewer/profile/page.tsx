"use client";
import { useEffect, useRef, useState } from "react";
import {
  User,
  Edit2,
  Save,
  Mail,
  Phone,
  Linkedin,
  Briefcase,
  Upload,
  CheckCircle2,
  CreditCard,
  FileText,
  Clock,
  Code2,
  X,
  Key,
  Check,
  Award,
  Sparkles,
  Building
} from "lucide-react";

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
import PasswordResetFormModal from "@/components/ui/Modals/PasswordResetFormModal";
import { Roles } from "@/constants/enums/roles";
import { InputField } from "@/components/ui/FormFields/InputField";
import { errorToast, successToast } from "@/utils/customToast";

import BankDetailsModal from "@/components/ui/Modals/BankDetailsModal";
import { IBankDetails } from "@/validations/InterviewerSchema";
import InterviewerRejectedPage from "@/components/features/interviewer/InterviewerResubmissionForm";
import ExpertiseSection from "@/components/features/interviewer/ExpertiseSection";
import { useAuthStore } from "@/features/auth/authStore";

type ProfileTab = "general" | "expertise" | "payout";

function InterviewerProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAddOrUpdateBankDetailsModal, setShowAddOrUpdateBankDetailsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile, loading: updateLoading } = useUpdateInterviewerProfile();
  const { changeInterviewerPassword } = useChangeInterviewerPassword();
  const { addBankDetails, loading: isBankDetailsAdding } = useAddBankDetails();

  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>({} as IInterviewerProfile);
  const { user } = useAuthStore();

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    const validatedInterviewer = InterviewerProfileSchema.safeParse(interviewerData);
    if (!validatedInterviewer.success) {
      for (const issue of validatedInterviewer.error.issues) {
        errorToast(issue.message);
      }
      return;
    }

    const response = await updateInterviewerProfile(interviewerData, logoPreview!, resumePreview);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    setResumePreview(null);
    setSelectedResumeFile(null);
    setIsEditing(false);
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
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterviewerData((prev) => ({
      ...prev,
      [name]: name === "experience" || name === "duration" ? parseInt(value) || 0 : value,
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumePreview(URL.createObjectURL(file));
      setSelectedResumeFile(file.name);
    }
  };

  const onHandlePasswordReset = async (state: { currentPassword: string; newPassword: string }) => {
    const response = await changeInterviewerPassword(state.currentPassword, state.newPassword);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    setShowChangePasswordModal(false);
  };

  const handleAddExpertise = () => {
    setInterviewerData((prev) => ({
      ...prev,
      expertise: [
        ...(prev.expertise || []),
        { skill: "", proficiencyLevel: SkillProficiencyLevels[0], yearsOfExperience: 0, skillSource: [] },
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

  const handleExpertiseChange = (index: number, field: keyof ISkillExpertise, value: string | string[] | number) => {
    setInterviewerData((prev) => {
      const updated = [...(prev.expertise || [])];
      updated[index] = { ...updated[index], [field]: value };
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
      if (response.success) {
        setInterviewerData(response.data as IInterviewerProfile);
        setLogoPreview(response.data?.avatar || null);
      }
    };

    fetchInterviewer();
  }, []);

  return loading ? (
    <div className="h-screen flex items-center justify-center bg-black">
      <RiseLoader color="#8b5cf6" />
    </div>
  ) : user?.status === "rejected" || interviewerData.status === "rejected" ? (
    <InterviewerRejectedPage interviewer={interviewerData} />
  ) : (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-violet-500/30 pb-16">
      
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[170px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 md:px-8 pt-6 max-w-6xl space-y-6">

        {/* --- PREMIUM HEADER CARD --- */}
        <div className="rounded-3xl border border-zinc-800/90 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Avatar & Basic Info */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-violet-500/40 overflow-hidden bg-zinc-900 shadow-xl flex items-center justify-center shrink-0 group">
                {logoPreview ? (
                  <div className="relative w-full h-full">
                    <img src={logoPreview} alt="Avatar" className="w-full h-full object-cover" />
                    {isEditing && (
                      <label className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                        <Upload className="w-5 h-5 mb-1 text-violet-400" />
                        <span className="text-[10px] font-bold">Upload</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <User size={36} />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {interviewerData.name || "Senior Tech Evaluator"}
                  </h1>
                  {interviewerData?.status === "approved" && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 size={14} /> Approved Evaluator
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-violet-400" />
                  {interviewerData.position || "Senior Technical Lead"}
                </p>

                <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1"><Clock size={13} className="text-violet-400" /> {interviewerData.experience || 5}+ Years Exp</span>
                  <span className="flex items-center gap-1"><Mail size={13} className="text-violet-400" /> {interviewerData.email || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Key size={14} className="text-violet-400" />
                Change Password
              </button>

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {updateLoading ? <SyncLoader color="white" size={6} /> : <><Save size={14} /> Save Profile</>}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- NAVIGATION TABS BAR --- */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 w-fit">
          {[
            { id: "general", label: "General & Resume", icon: User },
            { id: "expertise", label: "Skills & Expertise", icon: Code2 },
            { id: "payout", label: "Payout Banking", icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon size={15} className={isActive ? "text-white" : "text-violet-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* --- TAB CONTENT 1: GENERAL & RESUME --- */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <User className="text-violet-400" size={20} />
                  <h2 className="text-base font-bold text-white">Personal Contact Details</h2>
                </div>
              </div>

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
                label="Email Address"
                placeholder="Enter email"
                value={interviewerData.email || ""}
                name="email"
                isEditing={isEditing}
                handleChange={handleChange}
                type="email"
              />
              <InputField
                icon={Phone}
                label="Phone Number"
                placeholder="Enter phone number"
                value={interviewerData.phone || ""}
                name="phone"
                isEditing={isEditing}
                handleChange={handleChange}
                type="tel"
              />
              <InputField
                icon={Briefcase}
                label="Current Position / Designation"
                placeholder="e.g. Lead Architect / Senior Developer"
                value={interviewerData.position || ""}
                name="position"
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="text-violet-400" size={20} />
                  <h2 className="text-base font-bold text-white">Professional & Resume</h2>
                </div>
              </div>

              <InputField
                icon={Linkedin}
                label="LinkedIn Public Profile"
                placeholder="https://linkedin.com/in/username"
                value={interviewerData.linkedinProfile || ""}
                name="linkedinProfile"
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <InputField
                icon={Clock}
                label="Years of Experience"
                placeholder="e.g. 7"
                value={interviewerData.experience || ""}
                name="experience"
                isEditing={isEditing}
                handleChange={handleChange}
                type="number"
              />

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <label className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="text-violet-400" size={16} />
                  Curriculum Vitae / Resume
                </label>

                {isEditing ? (
                  <div className="space-y-3 pt-1">
                    {interviewerData.resume && (
                      <div className="flex items-center justify-between p-3 bg-violet-950/30 border border-violet-800/50 rounded-xl">
                        <span className="text-xs font-semibold text-zinc-200">Current Resume Attached</span>
                        <a href={interviewerData.resume} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-violet-400 hover:underline">
                          Preview File
                        </a>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      name="resume"
                      onChange={handleResumeUpload}
                      className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-violet-600 file:text-white cursor-pointer"
                    />
                    {selectedResumeFile && (
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Ready: {selectedResumeFile}
                      </p>
                    )}
                  </div>
                ) : interviewerData.resume ? (
                  <a
                    href={interviewerData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-violet-950/20 hover:bg-violet-900/30 border border-violet-800/40 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-violet-400" size={20} />
                      <span className="text-xs font-bold text-white group-hover:text-violet-300">
                        View Uploaded Resume
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-violet-400 group-hover:underline">
                      Open Document →
                    </span>
                  </a>
                ) : (
                  <p className="text-xs text-zinc-500 italic">No resume file uploaded yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT 2: SKILLS & EXPERTISE --- */}
        {activeTab === "expertise" && (
          <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl">
            <ExpertiseSection
              expertise={interviewerData.expertise}
              handleAddExpertise={handleAddExpertise}
              handleRemoveExpertise={handleRemoveExpertise}
              handleExpertiseChange={handleExpertiseChange}
              isEditing={isEditing}
            />
          </div>
        )}

        {/* --- TAB CONTENT 3: PAYOUT BANKING --- */}
        {activeTab === "payout" && (
          <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6 max-w-3xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="text-emerald-400" size={22} />
                <h2 className="text-lg font-bold text-white">Direct Payout Account</h2>
              </div>
              <button
                onClick={() => setShowAddOrUpdateBankDetailsModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                {interviewerData.bankDetails ? "Update Account Details" : "Add Bank Account"}
              </button>
            </div>

            {interviewerData.bankDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-900/90 border border-emerald-500/30 rounded-2xl">
                <div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase">Account Holder</div>
                  <div className="text-sm font-extrabold text-white mt-1">{interviewerData.bankDetails.accountHolderName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase">IFSC Code</div>
                  <div className="text-sm font-mono font-bold text-violet-300 mt-1">{interviewerData.bankDetails.ifsc}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase">Account Number</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-1">•••• {interviewerData.bankDetails.accountNumber?.slice(-4)}</div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center border border-zinc-800/80 rounded-2xl space-y-2">
                <CreditCard className="w-8 h-8 text-zinc-600 mx-auto" />
                <div className="text-xs font-bold text-zinc-300">No Bank Connected</div>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Connect your account to automatically receive evaluation payouts.</p>
              </div>
            )}
          </div>
        )}

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
