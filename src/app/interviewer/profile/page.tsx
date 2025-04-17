"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { StatusCodes } from "@/constants/statusCodes";

import { RiseLoader } from "react-spinners";
import ChangePasswordButton from "@/components/ui/ChangePasswordButton";
import PasswordResetFormModal from "@/components/ui/modals/PasswordResetFormModal";
import { Roles } from "@/constants/roles";
import { useAuthStore } from "@/features/auth/authStore";

function InterviewerProfilePage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>("");
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile } = useUpadteInterviewerProfile();
  const { changeInterviewerPassword } = useChangeInterviewerPassword();
  const { logout } = useAuthStore();

  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>(
    {} as IInterviewerProfile
  );

  // const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>(interviewerData);

  const handleEdit = () => {
    setIsEditing(true);
    // setInterviewerData(interviewerData);
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

  const handleAddLanguage = () => {
    setInterviewerData((prev) => ({
      ...prev,
      language: {
        ...prev.language,
        "": "",
      },
    }));
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    const newLang = { ...interviewerData.language };
    delete newLang[langToRemove];
    setInterviewerData({ ...interviewerData, language: newLang });
  };

  const handleAddExpertise = () => {
    setInterviewerData({
      ...interviewerData,
      expertise: [...interviewerData.expertise, ""],
    });
  };

  const handleRemoveExpertise = (index: number) => {
    setInterviewerData({
      ...interviewerData,
      expertise: interviewerData.expertise.filter((_, i) => i !== index),
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
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white ml-64">
      {!isEditing}
      {
        <PasswordResetFormModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          role={Roles.INTERVIEWER}
          userId={interviewerData._id!}
          handleSubmit={onHandlePasswordReset}
        />
      }
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              {/* Profile Image Section */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 rounded-xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center mb-4 overflow-hidden">
                    {logoPreview || interviewerData.avatar ? (
                      <Image
                        src={
                          logoPreview ||
                          interviewerData.avatar ||
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                        <p className="text-sm text-gray-400">
                          No profile photo
                        </p>
                      </div>
                    )}
                  </div>
                  {isEditing && (
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
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div className="">
                    <div className="flex items-center gap-1">
                      <User className="text-violet-500" size={32} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={interviewerData.name}
                          onChange={(e) =>
                            setInterviewerData({
                              ...interviewerData,
                              name: e.target.value,
                            })
                          }
                          className="text-1xl font-bold bg-gray-800/50 border border-gray-700 rounded px-2 py-1 "
                        />
                      ) : (
                        <h1 className="text-3xl font-bold">
                          {interviewerData.name}
                        </h1>
                      )}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        placeholder="enter your position here"
                        value={interviewerData.position}
                        onChange={(e) =>
                          setInterviewerData({
                            ...interviewerData,
                            position: e.target.value,
                          })
                        }
                        className="text-violet-400 text-sm mt-2 bg-gray-800/50 border border-gray-700 rounded px-3 py-1 ml-9"
                      />
                    ) : (
                      <p className="text-violet-400 mt-2">
                        {interviewerData.position}
                      </p>
                    )}
                    {!isEditing && interviewerData.status && (
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            interviewerData.status === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : interviewerData.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {interviewerData.status.charAt(0).toUpperCase() +
                            interviewerData.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <ChangePasswordButton
                      onClick={() => setShowChangePasswordModal(true)}
                    />
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                        >
                          <X size={18} />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <Save size={18} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            value={interviewerData.email}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                email: e.target.value,
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={interviewerData.phone}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                phone: e.target.value,
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">
                          Experience (years)
                        </p>
                        {isEditing ? (
                          <input
                            type="number"
                            value={interviewerData.experience}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                experience: parseInt(e.target.value),
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.experience} years</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={interviewerData.location}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                location: e.target.value,
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.location}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">LinkedIn</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={interviewerData.linkedinProfile}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                linkedinProfile: e.target.value,
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.linkedinProfile}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-violet-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">
                          Interview Duration (minutes)
                        </p>
                        {isEditing ? (
                          <input
                            type="number"
                            value={interviewerData.duration}
                            onChange={(e) =>
                              setInterviewerData({
                                ...interviewerData,
                                duration: parseInt(e.target.value),
                              })
                            }
                            className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 mt-1 w-full"
                          />
                        ) : (
                          <p>{interviewerData.duration} minutes</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Professional Summary */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="text-violet-400" size={20} />
                    Professional Summary
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={interviewerData.professionalSummary}
                      onChange={(e) =>
                        setInterviewerData({
                          ...interviewerData,
                          professionalSummary: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 min-h-[120px]"
                    />
                  ) : (
                    <p className="text-gray-300">
                      {interviewerData.professionalSummary}
                    </p>
                  )}
                </div>

                {/* Languages */}
                <div>
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
                    {Object.entries(interviewerData.language || []).map(
                      ([lang, level]) => (
                        <div
                          key={lang}
                          className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg"
                        >
                          {isEditing ? (
                            <>
                              <div className="flex gap-2 flex-1">
                                <input
                                  type="text"
                                  value={lang}
                                  onChange={(e) => {
                                    const newLangKey = e.target.value.trim();
                                    if (!newLangKey) return; // Prevent empty keys

                                    setInterviewerData((prevData) => {
                                      const newLang = { ...prevData.language };

                                      // If lang is modified, delete the old key and add a new one
                                      if (lang !== newLangKey) {
                                        delete newLang[lang];
                                        newLang[newLangKey] = level;
                                      }

                                      return { ...prevData, language: newLang };
                                    });
                                  }}
                                  className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                                  placeholder="Language"
                                />

                                <input
                                  type="text"
                                  value={level}
                                  onChange={(e) => {
                                    setInterviewerData((prevData) => ({
                                      ...prevData,
                                      language: {
                                        ...prevData.language,
                                        [lang]: e.target.value, // Only update the level
                                      },
                                    }));
                                  }}
                                  className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                                  placeholder="Proficiency"
                                />
                              </div>
                              <button
                                onClick={() => handleRemoveLanguage(lang)}
                                className="ml-2 text-red-400 hover:text-red-300"
                              >
                                <X size={20} />
                              </button>
                            </>
                          ) : (
                            <>
                              {/* <span>{lang}</span> */}
                              {/* <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">
                                {level}
                              </span> */}
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Expertise */}
                <div>
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
                                  ...interviewerData.expertise,
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

                {/* Available Days */}
                <div>
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
                              interviewerData.availableDays.includes(day);
                            setInterviewerData({
                              ...interviewerData,
                              availableDays: isSelected
                                ? interviewerData.availableDays.filter(
                                    (d) => d !== day
                                  )
                                : [...interviewerData.availableDays, day],
                            });
                          }}
                          className={`px-3 py-1 rounded-full border transition-colors ${
                            interviewerData.availableDays.includes(day)
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

                {/* Availability Schedule */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="text-violet-400" size={20} />
                    Availability Schedule
                  </h2>
                  {/* <div className="space-y-2">
                    {(interviewerData.availability||[]).map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        {isEditing ? (
                          <div className="flex gap-2 w-full">
                            <select
                              value={schedule.day}
                              onChange={(e) => {
                                const newAvailability = [...(interviewerData.availability || [])];
                                newAvailability[index] = { ...schedule, day: e.target.value };
                                setInterviewerData({ ...interviewerData, availability: newAvailability });
                              }}
                              className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                            >
                              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={schedule.time}
                              onChange={(e) => {
                                const newAvailability = [...interviewerData.availability||[]];
                                newAvailability[index] = { ...schedule, time: e.target.value };
                                setInterviewerData({ ...interviewerData, availability: newAvailability });
                              }}
                              className="bg-gray-800/50 border border-gray-700 rounded px-3 py-1 w-1/2"
                              placeholder="Time (e.g., 9:00 AM - 5:00 PM)"
                            />
                          </div>
                        ) : (
                          <>
                            <span>{schedule.day}</span>
                            <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">
                              {schedule.time}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => {
                          setInterviewerData({
                            ...interviewerData,
                            availability: [
                              ...interviewerData.availability,
                              { day: "Monday", time: "9:00 AM - 5:00 PM" }
                            ]
                          });
                        }}
                        className="w-full px-3 py-2 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors mt-2"
                      >
                        Add Availability Slot
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewerProfilePage;
