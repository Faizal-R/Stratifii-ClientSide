"use client";
import  {  useEffect, useRef, useState } from "react";
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
} from "lucide-react";

import Image from "next/image";
import {
  IInterviewerProfile,
  InterviewerProfileSchema,
} from "@/validations/InterviewerSchema";
import {
  useChangeInterviewerPassword,
  useFetchInterviewerProfile,
  useUpadteInterviewerProfile,
} from "@/hooks/useInterviewer";
import { toast } from "sonner";


import { RiseLoader, SyncLoader } from "react-spinners";
import ChangePasswordButton from "@/components/ui/ChangePasswordButton";
import PasswordResetFormModal from "@/components/ui/modals/PasswordResetFormModal";
import { Roles } from "@/constants/roles";
import { InputField } from "@/components/ui/InputField";

function InterviewerProfilePage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>("");
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile, loading: updateLoading } = useUpadteInterviewerProfile();
  const { changeInterviewerPassword } = useChangeInterviewerPassword();


  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>(
    {} as IInterviewerProfile
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
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

    const respone = await updateInterviewerProfile(interviewerData);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterviewerData(prev => ({
      ...prev,
      [name]: name === 'experience' || name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  const handleAddLanguage = () => {
    setInterviewerData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), { language: "", level: "" }],
    }));
  };

  const handleRemoveLanguage = (indexToRemove: number) => {
    const updatedLanguages = (interviewerData.languages || []).filter(
      (_, index) => index !== indexToRemove
    );

    setInterviewerData({
      ...interviewerData,
      languages: updatedLanguages,
    });
  };

  const handleAddExpertise = () => {
    setInterviewerData({
      ...interviewerData,
      expertise: [...(interviewerData.expertise || []), ""],
    });
  };

  const handleRemoveExpertise = (index: number) => {
    setInterviewerData({
      ...interviewerData,
      expertise: (interviewerData.expertise || []).filter((_, i) => i !== index),
    });
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
                  {logoPreview || interviewerData.avatar ? (
                    <Image
                      src={
                        logoPreview ||
                        interviewerData.avatar ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
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
                  icon={MapPin}
                  label="Location"
                  placeholder="Enter location"
                  value={interviewerData.location || ""}
                  name="location"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
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
                <InputField
                  icon={Clock}
                  label="Interview Duration (minutes)"
                  placeholder="Enter duration"
                  value={interviewerData.duration || ""}
                  name="duration"
                  isEditing={isEditing}
                  handleChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
              <InputField
                icon={Briefcase}
                label="Professional Summary"
                placeholder="Describe your professional background..."
                value={interviewerData.professionalSummary || ""}
                name="professionalSummary"
                isEditing={isEditing}
                handleChange={handleChange}
                type="textarea"
              />
            </div>

            {/* Languages & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Languages */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Languages className="text-violet-400" size={20} />
                    Languages
                  </h2>
                  {isEditing && (
                    <button
                      onClick={handleAddLanguage}
                      className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors"
                    >
                      Add Language
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(interviewerData.languages || []).map((langObj, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg"
                    >
                      {isEditing ? (
                        <>
                          <div className="flex gap-2 flex-1">
                            <input
                              type="text"
                              value={langObj.language}
                              onChange={(e) => {
                                const updatedLanguages = [
                                  ...(interviewerData.languages || []),
                                ];
                                updatedLanguages[index].language =
                                  e.target.value;
                                setInterviewerData({
                                  ...interviewerData,
                                  languages: updatedLanguages,
                                });
                              }}
                              className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                              placeholder="Language"
                            />

                            <input
                              type="text"
                              value={langObj.level}
                              onChange={(e) => {
                                const updatedLanguages = [
                                  ...(interviewerData.languages || []),
                                ];
                                updatedLanguages[index].level =
                                  e.target.value;
                                setInterviewerData({
                                  ...interviewerData,
                                  languages: updatedLanguages,
                                });
                              }}
                              className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                              placeholder="Proficiency"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveLanguage(index)}
                            className="ml-2 text-red-400 hover:text-red-300"
                          >
                            <X size={20} />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-medium">
                            {langObj.language}
                          </span>
                          <span className="text-sm text-gray-400">
                            {langObj.level}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

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
                <div className="flex flex-wrap gap-2">
                  {(interviewerData.expertise || []).map((skill, index) => (
                    <div key={index} className="flex items-center">
                      {isEditing ? (
                        <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newExpertise = [
                                ...(interviewerData.expertise || []),
                              ];
                              newExpertise[index] = e.target.value;
                              setInterviewerData({
                                ...interviewerData,
                                expertise: newExpertise,
                              });
                            }}
                            className="bg-transparent px-3 py-1 focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveExpertise(index)}
                            className="px-2 text-red-400 hover:bg-red-500/10"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full">
                          {skill}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Days */}
            <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-violet-400" size={20} />
                Available Days
              </h2>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        const isSelected =
                          (interviewerData.availableDays || []).includes(day);
                        setInterviewerData({
                          ...interviewerData,
                          availableDays: isSelected
                            ? (interviewerData.availableDays || []).filter(
                                (d) => d !== day
                              )
                            : [...(interviewerData.availableDays || []), day],
                        });
                      }}
                      className={`px-3 py-1 rounded-full border transition-colors ${
                        (interviewerData.availableDays || []).includes(day)
                          ? "bg-violet-600 border-violet-500 text-white"
                          : "bg-gray-800/50 border-gray-700 text-gray-400 hover:border-violet-500"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(interviewerData.availableDays || []).map((day) => (
                    <span
                      key={day}
                      className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default InterviewerProfilePage;
