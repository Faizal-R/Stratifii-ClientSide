"use client";
import { useEffect, useRef, useState } from "react";
import {
  X,
  User,
  Edit2,
  Save,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  Languages,
  Calendar,
  Upload,
  ImageIcon,
  Clock,
  Check,
  FileText,
} from "lucide-react";

import Image from "next/image";
import {
  IInterviewerProfile,
  InterviewerProfileSchema,
  ISkillExpertise,
  SkillProficiencyLevels,
  SkillSources,
  // <-- Add this import if it exists in the schema file
} from "@/validations/InterviewerSchema";
import {
  useChangeInterviewerPassword,
  useFetchInterviewerProfile,
  useUpdateInterviewerProfile,
} from "@/hooks/api/useInterviewer";
import { toast } from "sonner";

import { RiseLoader, SyncLoader } from "react-spinners";
import ChangePasswordButton from "@/components/ui/Buttons/ChangePasswordButton";
import PasswordResetFormModal from "@/components/ui/Modals/PasswordResetFormModal";
import { Roles } from "@/constants/enums/roles";
import { InputField } from "@/components/ui/FormFields/InputField";

type TSkillSource = "professional" | "academic" | "personal" | "certification";

function InterviewerProfilePage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>("");
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile, loading: updateLoading } =
    useUpdateInterviewerProfile();
  const { changeInterviewerPassword } = useChangeInterviewerPassword();

  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>(
    {} as IInterviewerProfile
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {

    console.log(interviewerData);
    const validatedInterviewer =
      InterviewerProfileSchema.safeParse(interviewerData);
    if (!validatedInterviewer.success) {
      const errors = validatedInterviewer.error;
      console.log(errors);
      for (const issue of errors.issues) {
        toast(issue.message);
      }
      return;
    }
    console.log(resumePreview)

    const respone = await updateInterviewerProfile(
      interviewerData,
      logoPreview!,
      resumePreview
    );
    if (!respone.success) {
      toast.error(respone.error);
      return;
    } else {
      toast.success(respone.message);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLogoPreview(null);
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
      toast.error(respose.error, {
        className: "custom-error-toast",
      });
      return;
    }
    toast.success(respose.message);
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

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchInterviewer = async () => {
      const response = await interviewerProfile();
      if (!response.success) {
        toast(response.error);
        return;
      }
      setInterviewerData(response.data);
      setLogoPreview(response.data.avatar);
    };

    fetchInterviewer();
  }, []);

  return loading ? (
    <div className="w-screen flex items-center justify-center h-screen ">
      <RiseLoader color="white" />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-violet-950 text-white flex">
      <PasswordResetFormModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        role={Roles.INTERVIEWER}
        userId={interviewerData._id!}
        handleSubmit={onHandlePasswordReset}
      />

      {/* Main Section */}
      <main className="flex-1 p-6 overflow-y-auto ml-60">
        {loading ? (
          <RiseLoader className="m-auto" color="white" />
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="h-48 bg-gradient-to-bl from-violet-950 via-violet-900 to-black relative">
                <div className="absolute -bottom-16 left-8 w-40 h-36 rounded-2xl border-4 border-gray-900 overflow-hidden bg-gray-700 flex items-center justify-center z-10">
                  {logoPreview ? (
                    <Image
                      src={
                        logoPreview !
                        
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={160}
                      height={144}
                    />
                  ) : (
                    <ImageIcon className="text-gray-400 w-10 h-10" />
                  )}
                  {isEditing && !interviewerData?.avatar && (
                    <div className="w-full">
                      <label className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        <Upload size={18} />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-400 text-center mt-2">
                        Recommended: 400x400px, Max 2MB
                      </p>
                    </div>
                  )}
                  {isEditing && interviewerData?.avatar && (
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <label className="flex items-center justify-center gap-1 font-semibold bg-violet-600 hover:bg-violet-700 px-1 rounded-lg cursor-pointer transition-colors text-base bottom-2 absolute">
                        <Upload size={12} />
                        <p className="text-[10px]"> Upload New Photo</p>
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
              {isEditing ? (
                <>
                  {interviewerData.resume &&
                    typeof interviewerData.resume === "string" && (
                      <div className="mb-2">
                        <a
                       href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        interviewerData.resume as string
                      )}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                          className="text-violet-400 hover:underline"
                        >
                          View Previously Uploaded Resume
                        </a>
                      </div>
                    )}

                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload New Resume
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    name="resume"
                    onChange={handleResumeUpload}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-600/20 file:text-violet-400 hover:file:bg-violet-600/30"
                  />
                </>
              ) : (
                interviewerData.resume &&
                typeof interviewerData.resume === "string" && (
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        interviewerData.resume as string
                      )}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="text-violet-400 hover:underline"
                  >
                    View Uploaded Resume
                  </a>
                )
              )}
            </div>
              </div>
            </div>

            {/* Resume Upload */}

            <div className=" flex flex-col gap-6">
              {/* Expertise */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase className="text-violet-400" size={20} />
                    Expertise
                  </h2>
                  {isEditing && (
                    <button
                      onClick={handleAddExpertise}
                      className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors"
                    >
                      Add Expertise
                    </button>
                  )}
                </div>

                {/* Grid wrapper for expertise items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(interviewerData.expertise || []).map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 p-4 rounded-xl space-y-4 bg-black/20"
                    >
                      {isEditing ? (
                        <>
                          {/* Skill Name */}
                          <input
                            type="text"
                            placeholder="Skill"
                            value={item.skill}
                            onChange={(e) =>
                              handleExpertiseChange(
                                index,
                                "skill",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
                          />

                          {/* Proficiency Level */}
                          <select
                            value={item.proficiencyLevel}
                            onChange={(e) =>
                              handleExpertiseChange(
                                index,
                                "proficiencyLevel",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>

                          {/* Years of Experience */}
                          <input
                            type="number"
                            placeholder="Years of Experience"
                            value={item.yearsOfExperience || 0}
                            min={0}
                            onChange={(e) =>
                              handleExpertiseChange(
                                index,
                                "yearsOfExperience",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
                          />

                          {/* Skill Source */}
                          <div className="flex flex-wrap gap-2">
                            {[
                              "professional",
                              "academic",
                              "personal",
                              "certification",
                            ].map((source) => (
                              <label
                                key={source}
                                className="flex items-center gap-2 text-sm text-white"
                              >
                                <input
                                  type="checkbox"
                                  checked={item.skillSource?.includes(
                                    source as TSkillSource
                                  )}
                                  onChange={(e) => {
                                    const current = item.skillSource || [];
                                    let updated: string[];
                                    if (e.target.checked) {
                                      updated = [...current, source];
                                    } else {
                                      updated = current.filter(
                                        (s) => s !== source
                                      );
                                    }
                                    handleExpertiseChange(
                                      index,
                                      "skillSource",
                                      updated
                                    );
                                  }}
                                />
                                {source}
                              </label>
                            ))}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveExpertise(index)}
                            className="text-red-400 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">
                            <strong>Skill:</strong> {item.skill}
                          </p>
                          <p className="text-white">
                            <strong>Level:</strong> {item.proficiencyLevel}
                          </p>
                          <p className="text-white">
                            <strong>Years of Experience:</strong>{" "}
                            {item.yearsOfExperience || 0}
                          </p>
                          <p className="text-white">
                            <strong>Source:</strong>{" "}
                            {item.skillSource.join(", ")}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default InterviewerProfilePage;
