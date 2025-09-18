"use client";
import { ChangeEvent, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Phone,
  Linkedin,
  Clock,
  MapPin,
  Calendar,
  FileText,
  Code,
  Star,
  Upload,
  Plus,
  X,
  Award,
  BookOpen,
  User2,
  AlignCenterVertical as Certificate,
} from "lucide-react";
import { useInterviewerRegister } from "@/hooks/api/useAuth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { RiseLoader } from "react-spinners";

import Link from "next/link";
import { handleInterviewerRegistrationStep } from "@/utils/handleRegistrationStep";
import { Roles } from "@/constants/enums/roles";
import {
  useSetupInterviewerAccount,
  // useUpdateInterviewerProfile,
} from "@/hooks/api/useInterviewer";

import { useAuthStore } from "@/features/auth/authStore";
import { errorToast, successToast } from "@/utils/customToast";
// import { IInterviewerRegistration } from "@/validations/InterviewerSchema";

export type TProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type TSkillSource = "professional" | "academic" | "personal" | "certification";

interface ISkillExpertise {
  skill: string;
  proficiencyLevel: TProficiencyLevel;
  yearsOfExperience?: number;
  skillSource: TSkillSource[];
}

interface IInterviewerRegistration {
  name: string;
  position: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  experience: number;
  linkedinProfile: string;
  professionalSummary?: string;
  expertise: ISkillExpertise[];
  isVerified: boolean;
  resume: File | null;
}

function InterviewerRegistrationPage() {
  const { setUser } = useAuthStore();
  const isGoogleVerified =
    Boolean(useSearchParams().get("isGoogleVerified")) ?? false;
  const interviewerId = useSearchParams().get("id") ?? "";
  const { loading, registerInterviewer } = useInterviewerRegister();
  const { setupInterviewerAccount, loading: isSetupingAcccount } =
    useSetupInterviewerAccount();
  const [formData, setFormData] = useState<IInterviewerRegistration>({
    name: "",
    position: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    experience: 0,
    linkedinProfile: "",
    expertise: [],
    isVerified: false,
    resume: null,
  });

  const [registrationStep, setRegistrationStep] = useState(1);

  const [skillInput, setSkillInput] = useState<{
    skill: string;
    proficiencyLevel: TProficiencyLevel;
    yearsOfExperience: number | "";
    skillSource: TSkillSource[];
  }>({
    skill: "",
    proficiencyLevel: "beginner",
    yearsOfExperience: "",
    skillSource: [],
  });

  const router = useRouter();

  const onHandleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      errorToast("Passwords does not match",)
      return;
    }
    console.log(formData);

    if (isGoogleVerified) {
      const response = await setupInterviewerAccount(
        {
          ...formData,
          status: "pending",
          isVerified: true,
        },
        interviewerId
      );
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      setUser({
        name: response.data.interviewer.name,
        email: response.data.interviewer.email,
        role: Roles.INTERVIEWER,
        id: response.data.interviewer._id,
      });
      successToast("Account setup successfully");

      router.push(`/${Roles.INTERVIEWER}/profile`);
    } else {
      const response = await registerInterviewer({
        ...formData,
        status: "pending",
      });
      console.log(response); // Set default status
      if (!response.success) {
        errorToast(response.message);
      } else {
        successToast(response.message);

        router.push(`/verify-otp?email=${formData.email}&&role=interviewer`);
      }
    }
  };

  const nextStep = async () => {
    const validInterviewer = await handleInterviewerRegistrationStep(
      formData,
      registrationStep,
      isGoogleVerified ? isGoogleVerified : false
    );
    if (!validInterviewer?.success) {
      const errors = validInterviewer?.errors;
      for (const issue of errors!) {
        errorToast(issue.message)
        return;
      }
    }
    setRegistrationStep(registrationStep + 1);
  };

  const prevStep = () => {
    setRegistrationStep(registrationStep - 1);
  };

  const removeSkillExpertise = (skillName: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((exp) => exp.skill !== skillName),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      resume: file!,
    }));
  };

  const addSkillExpertise = () => {
    if (skillInput.skill.trim() === "" || skillInput.skillSource.length === 0) {
      errorToast("Please fill in skill name and select at least one skill source")
      return;
    }

    // Check for duplicates
    if (
      formData.expertise.some(
        (exp) =>
          exp.skill.toLowerCase() === skillInput.skill.trim().toLowerCase()
      )
    ) {
      errorToast("Skill already added")
      return;
    }

    const newSkillExpertise: ISkillExpertise = {
      skill: skillInput.skill.trim(),
      proficiencyLevel: skillInput.proficiencyLevel,
      yearsOfExperience:
        skillInput.yearsOfExperience === ""
          ? undefined
          : Number(skillInput.yearsOfExperience),
      skillSource: skillInput.skillSource,
    };

    setFormData((prev) => ({
      ...prev,
      expertise: [...prev.expertise, newSkillExpertise],
    }));

    // Reset skill input
    setSkillInput({
      skill: "",
      proficiencyLevel: "beginner",
      yearsOfExperience: "",
      skillSource: [],
    });
  };

  const proficiencyLevels: TProficiencyLevel[] = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const skillSources: { value: TSkillSource; label: string; icon: any }[] = [
    { value: "professional", label: "Professional", icon: Briefcase },
    { value: "academic", label: "Academic", icon: BookOpen },
    { value: "personal", label: "Personal", icon: User2 },
    { value: "certification", label: "Certification", icon: Certificate },
  ];
  const getProficiencyColor = (level: TProficiencyLevel) => {
    const colors = {
      beginner: "bg-red-500/20 text-red-300 border-red-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      advanced: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      expert: "bg-green-500/20 text-green-300 border-green-500/30",
    };
    return colors[level];
  };

  const getSourceIcon = (source: TSkillSource) => {
    const sourceData = skillSources.find((s) => s.value === source);
    return sourceData ? sourceData.icon : Award;
  };

  const handleSkillSourceToggle = (source: TSkillSource) => {
    setSkillInput((prev) => ({
      ...prev,
      skillSource: prev.skillSource.includes(source)
        ? prev.skillSource.filter((s) => s !== source)
        : [...prev.skillSource, source],
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-black via-black to-violet-950 md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Interviewer Registration
          </h2>
          <p className="text-violet-200 mb-8">
            Join our platform as an interviewer and help companies find the best
            talent
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div
                className={`h-2 w-1/4 rounded-full ${
                  registrationStep >= 1 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
              <div
                className={`h-2 w-1/4 rounded-full mx-1 ${
                  registrationStep >= 2 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
              <div
                className={`h-2 w-1/4 rounded-full mx-1 ${
                  registrationStep >= 3 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
              <div
                className={`h-2 w-1/4 rounded-full ${
                  registrationStep >= 4 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-violet-300">
              <span>Personal Info</span>
              <span>Professional</span>
              <span>Expertise</span>
              <span>Account</span>
            </div>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="space-y-5">
            {registrationStep === 1 && (
              <>
                {!isGoogleVerified && (
                  <>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onHandleChange}
                        className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onHandleChange}
                        className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="Email Address"
                      />
                    </div>
                  </>
                )}
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="relative">
                  <Linkedin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="LinkedIn Profile"
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition duration-200"
                >
                  Next Step
                </button>
              </>
            )}

            {registrationStep === 2 && (
              <>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Current Position"
                  />
                </div>

                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience === 0 ? "" : formData.experience}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Years of Experience"
                  />
                </div>

                <div className="relative ">
                  <Upload
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />

                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus-within:ring-2 focus-within:ring-violet-500/50 cursor-pointer">
                    {formData.resume ? (
                      <span className="text-gray-400">
                        {formData.resume.name}
                      </span>
                    ) : (
                      <span className="text-gray-400">Upload Resume</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-1/2 bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition duration-200"
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}

            {registrationStep === 3 && (
              <>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    Technical Expertise
                  </h3>

                  {/* Compact Add Skill Form */}
                  <div className="bg-slate-800/50 border border-purple-700/30 rounded-lg p-3 space-y-3">
                    <div className="relative">
                      <Code
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300"
                        size={18}
                      />
                      <input
                        type="text"
                        value={skillInput.skill}
                        onChange={(e) =>
                          setSkillInput({
                            ...skillInput,
                            skill: e.target.value,
                          })
                        }
                        className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm"
                        placeholder="Skill (e.g., React, Python)"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={skillInput.proficiencyLevel}
                        onChange={(e) =>
                          setSkillInput({
                            ...skillInput,
                            proficiencyLevel: e.target
                              .value as TProficiencyLevel,
                          })
                        }
                        className=" px-3 py-2.5 w-full  bg-black/80 border border-violet-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm"
                      >
                        {proficiencyLevels.map((level) => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        value={skillInput.yearsOfExperience}
                        onChange={(e) =>
                          setSkillInput({
                            ...skillInput,
                            yearsOfExperience:
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                          })
                        }
                        min="0"
                        className=" px-3 py-2.5 w-full  bg-black/80 border border-violet-900/50 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-lg  text-sm"
                        placeholder="Years"
                      />

                      <button
                        type="button"
                        onClick={addSkillExpertise}
                        className="bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition duration-200 flex items-center justify-center text-sm"
                      >
                        <Plus size={14} className="mr-1" />
                        Add
                      </button>
                    </div>

                    {/* Compact Skill Sources */}
                    <div className="grid grid-cols-4 gap-1">
                      {skillSources.map((source) => {
                        const Icon = source.icon;
                        const isSelected = skillInput.skillSource.includes(
                          source.value
                        );
                        return (
                          <button
                            key={source.value}
                            type="button"
                            onClick={() =>
                              handleSkillSourceToggle(source.value)
                            }
                            className={`flex flex-col items-center p-2 rounded-lg border text-xs transition-all duration-300 ease-in-out shadow-md
                            ${
                              isSelected
                                ? "bg-gradient-to-br from-violet-800 via-violet-700 to-purple-900 border-violet-600 text-white shadow-violet-700/50"
                                : "bg-[#0b0b14] border border-violet-700 text-violet-300 hover:bg-gradient-to-br hover:from-violet-900 hover:to-purple-900 hover:text-white hover:shadow-violet-600/40"
                            }`}
                          >
                            <Icon size={14} />
                            <span className="mt-1">{source.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compact Skills List */}
                  {formData.expertise.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">
                        Added Skills ({formData.expertise.length})
                      </h4>
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {formData.expertise.map((skill) => (
                          <div
                            key={skill.skill}
                            className="bg-slate-800 border border-purple-700/50 rounded-lg p-2 flex items-center justify-between"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-white text-sm truncate">
                                  {skill.skill}
                                </span>
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getProficiencyColor(
                                    skill.proficiencyLevel
                                  )}`}
                                >
                                  {skill.proficiencyLevel
                                    .charAt(0)
                                    .toUpperCase() +
                                    skill.proficiencyLevel.slice(1)}
                                </span>
                                {skill.yearsOfExperience && (
                                  <span className="text-purple-200 text-xs">
                                    {skill.yearsOfExperience}years
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                {skill.skillSource.map((source) => {
                                  const Icon = getSourceIcon(source);
                                  return (
                                    <div className="flex items-center gap-1 justify-center ">
                                      <Icon
                                        key={source}
                                        size={14}
                                        className="text-purple-300"
                                      />
                                      <h1 className="text-xs font-bold text-purple-300">
                                        {source.charAt(0).toUpperCase() +
                                          source.slice(1)}
                                      </h1>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSkillExpertise(skill.skill)}
                              className="text-red-400 hover:text-red-300 ml-2 flex-shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-[#1e1b2e] text-violet-300 py-3 rounded-lg font-semibold border border-violet-700 hover:bg-violet-800 hover:text-white transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={formData.expertise.length === 0}
                    className={`w-1/2 py-3 rounded-lg font-semibold transition duration-200
      ${
        formData.expertise.length === 0
          ? "bg-gray-800 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-violet-700 to-purple-800 text-white hover:from-violet-800 hover:to-purple-900"
      }`}
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}

            {registrationStep === 4 && (
              <>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Password"
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="password"
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={onHandleChange}
                    name="confirmPassword"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="terms"
                    type="checkbox"
                    className="rounded bg-black/80 border-violet-900/50 text-violet-600 focus:ring-violet-500/50"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-violet-200"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-100"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-100"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-1/2 bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition duration-200"
                  >
                    {isSetupingAcccount ? (
                      isSetupingAcccount
                    ) : loading ? (
                      <RiseLoader color="white" size={11} />
                    ) : isGoogleVerified ? (
                      "Setup My Account"
                    ) : (
                      "Register as Interviewer"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-violet-200">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-violet-300 hover:text-violet-100 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="w-1/2 bg-gradient-to-bl from-black via-black to-violet-950 p-12 items-center hidden md:flex">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-8">
            Join Our Expert Interviewer Network
          </h1>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Star className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Showcase Your Expertise
                </h3>
                <p className="text-violet-200">
                  Demonstrate your technical knowledge and help companies find
                  the best talent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Calendar className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-violet-200">
                  Set your own availableDays and conduct interviews when it
                  works for you.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Code className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Advanced Interview Tools
                </h3>
                <p className="text-violet-200">
                  Access to collaborative coding environments, video
                  conferencing, and assessment tools.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <MapPin className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Remote Opportunities
                </h3>
                <p className="text-violet-200">
                  Conduct interviews from anywhere in the world with our
                  cloud-based platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewerRegistrationPage;
