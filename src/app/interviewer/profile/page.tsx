"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Edit3,
  Check,
  X,
  Plus,
} from "lucide-react";

import Image from "next/image";
import {
  IInterviewerProfile,
  InterviewerProfileSchema,
} from "@/validations/InterviewerSchema";
import {
  useFetchInterviewerProfile,
  useUpadteInterviewerProfile,
} from "@/hooks/useInterviewer";
import { toast } from "sonner";



function App() {
  const [isEditing, setIsEditing] = useState(false);
  const { interviewerProfile, loading } = useFetchInterviewerProfile();
  const { updateInterviewerProfile } = useUpadteInterviewerProfile();

  const [interviewerData, setInterviewerData] = useState<IInterviewerProfile>({
    name: "",
    position: "",
    email: "",
    phone: "",
    experience: 0,
    linkedinProfile: "",
    language: {},
    status: "pending",
    availableDays: [],
    expertise: [],
    professionalSummary: "",
  });

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
    // setInterviewerData(interviewerData);
    setIsEditing(false);
  };

  const handleAddLanguage = () => {
    const newLang = { ...interviewerData.language, "": "" };
    setInterviewerData({ ...interviewerData, language: newLang });
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    const newLang = { ...interviewerData.language };
    delete newLang[langToRemove];
    setInterviewerData({ ...interviewerData, language: newLang });
  };

  const fetchInterviewerProfile = useCallback(async () => {
    const response = await interviewerProfile();
    if (!response.success) {
      toast(response.error);
    } else {
      console.log(response)
      setInterviewerData(response.data);
    }
  }, [interviewerProfile]);

  useEffect(() => {
    fetchInterviewerProfile();
  }, [fetchInterviewerProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white">
      {/* Sidebar */}
      {/* <div
        className={`h-screen bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } flex flex-col fixed left-0 top-0`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div
            className={`flex items-center gap-3 ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            <Building2 className="text-violet-500" size={32} />
            <span className="font-bold text-lg">TechCorp</span>
          </div>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-violet-600 text-white"
                      : "hover:bg-gray-800/50 text-gray-300"
                  }`}
                >
                  <item.icon size={20} />
                  <span className={isSidebarCollapsed ? "hidden" : "block"}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut size={20} />
            <span className={isSidebarCollapsed ? "hidden" : "block"}>
              Logout
            </span>
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className= "ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <Image
                  src={
                    interviewerData.avatar ??
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  }
                  alt={interviewerData.name || "interviewerData Avatar"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-violet-500"
                  width={96}
                  height={96}
                />
                <div>
                  <h1 className="text-3xl font-bold">{interviewerData.name}</h1>
                  <p className="text-violet-400">{interviewerData.position}</p>
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
                      {interviewerData.status?.charAt(0).toUpperCase() +
                        interviewerData.status?.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <span>★</span>
                      <span>{interviewerData.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                    >
                      <Check size={18} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400">Email</label>
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
                          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-violet-500"
                        />
                      ) : (
                        <p>{interviewerData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">Phone</label>
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
                          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-violet-500"
                        />
                      ) : (
                        <p>{interviewerData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">Location</label>
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
                          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-violet-500"
                        />
                      ) : (
                        <p>{interviewerData.location}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-400">LinkedIn</label>
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
                          className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-violet-500"
                        />
                      ) : (
                        <p>{interviewerData.linkedinProfile}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Languages</h2>
                    {isEditing && (
                      <button
                        onClick={handleAddLanguage}
                        className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors"
                      >
                        <Plus size={16} />
                        Add Language
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-3">
                      {Object.entries(interviewerData.language).map(
                        ([lang, level]) => (
                          <div key={lang} className="flex items-center gap-2">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={lang}
                                placeholder="Language"
                                onChange={(e) => {
                                  const newLang = {
                                    ...interviewerData.language,
                                  };
                                  delete newLang[lang];
                                  newLang[e.target.value] = level;
                                  setInterviewerData({
                                    ...interviewerData,
                                    language: newLang,
                                  });
                                }}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
                              />
                              <input
                                type="text"
                                value={level}
                                placeholder="Proficiency"
                                onChange={(e) => {
                                  setInterviewerData({
                                    ...interviewerData,
                                    language: {
                                      ...interviewerData.language,
                                      [lang]: e.target.value,
                                    },
                                  });
                                }}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveLanguage(lang)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(interviewerData.language).map(
                        ([lang, level]) => (
                          <div
                            key={lang}
                            className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg"
                          >
                            <span>{lang}</span>
                            <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">
                              {level}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
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
                      className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 h-32 focus:outline-none focus:border-violet-500"
                    />
                  ) : (
                    <p className="text-gray-300">
                      {interviewerData.professionalSummary}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Expertise</h2>
                    {isEditing && (
                      <button
                        onClick={() => {
                          setInterviewerData({
                            ...interviewerData,
                            expertise: [...interviewerData.expertise, ""],
                          });
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-violet-600/20 text-violet-400 rounded-lg hover:bg-violet-600/30 transition-colors"
                      >
                        <Plus size={16} />
                        Add Skill
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {interviewerData.expertise.map((skill, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden"
                        >
                          <input
                            type="text"
                            value={skill}
                            placeholder="Enter skill"
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
                            className="bg-transparent px-3 py-1 focus:outline-none min-w-[100px]"
                          />
                          <button
                            onClick={() => {
                              setInterviewerData({
                                ...interviewerData,
                                expertise: interviewerData.expertise.filter(
                                  (_, i) => i !== index
                                ),
                              });
                            }}
                            className="p-2 text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {interviewerData.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Available Days</h2>
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
                      {interviewerData.availableDays.map((day) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
