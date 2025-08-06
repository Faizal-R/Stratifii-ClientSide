"use client";
import { ChangeEvent, useState } from "react";
import { Mail, Lock, User, Briefcase, Phone, Linkedin, Clock, MapPin, Calendar, FileText, Code, Star, Upload, Plus, X, Award, BookOpen, User2, AlignCenterVertical as Certificate } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useInterviewerRegister } from "@/hooks/api/useAuth";
import { useSetupInterviewerAccount } from "@/hooks/api/useInterviewer";
import { Roles } from "@/constants/enums/roles";

// Types based on your schema
type TProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";
type TSkillSource = "professional" | "academic" | "personal" | "certification";

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
    const router = useRouter();
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
    professionalSummary: "",
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

  const proficiencyLevels: TProficiencyLevel[] = ["beginner", "intermediate", "advanced", "expert"];
  const skillSources: { value: TSkillSource; label: string; icon: any }[] = [
    { value: "professional", label: "Professional", icon: Briefcase },
    { value: "academic", label: "Academic", icon: BookOpen },
    { value: "personal", label: "Personal", icon: User2 },
    { value: "certification", label: "Certification", icon: Certificate },
  ];

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

  const handleSkillSourceToggle = (source: TSkillSource) => {
    setSkillInput((prev) => ({
      ...prev,
      skillSource: prev.skillSource.includes(source)
        ? prev.skillSource.filter((s) => s !== source)
        : [...prev.skillSource, source],
    }));
  };

  const addSkillExpertise = () => {
    if (skillInput.skill.trim() === "" || skillInput.skillSource.length === 0) {
      toast("Please fill in required fields ",{
        className: "custom-error-toast",
      });
      return;
    }

    // Check for duplicates
    if (formData.expertise.some((exp) => exp.skill.toLowerCase() === skillInput.skill.trim().toLowerCase())) {
      toast("Skill already added",{
        className: "custom-error-toast",
      });
      return;
    }

    const newSkillExpertise: ISkillExpertise = {
      skill: skillInput.skill.trim(),
      proficiencyLevel: skillInput.proficiencyLevel,
      yearsOfExperience: skillInput.yearsOfExperience === "" ? undefined : Number(skillInput.yearsOfExperience),
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
      resume: file || null,
    }));
  };

  const nextStep = () => {
    setRegistrationStep(registrationStep + 1);
  };

  const prevStep = () => {
    setRegistrationStep(registrationStep - 1);
  };

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        className: "custom-error-toast",
      });
      return;
    }
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
        toast.error(response.error, {
          className: "custom-error-toast",
        });
        return;
      }
      setUser({
        name: response.data.interviewer.name,
        email: response.data.interviewer.email,
        role: Roles.INTERVIEWER,
        token: response.data.accessToken,
        id: response.data.interviewer._id,
      });
      toast.success("Account setup successfully");

      router.push(`/${Roles.INTERVIEWER}`);
    } else {
      const response = await registerInterviewer({
        ...formData,
        status: "pending",
      });
      console.log(response); // Set default status
      if (!response.success) {
        toast.error(response.error, {
          className: "custom-error-toast",
        });
      } else {
        toast(response.message);

        router.push(`/verify-otp?email=${formData.email}&&role=interviewer`);
      }
    }
  };


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
    const sourceData = skillSources.find(s => s.value === source);
    return sourceData ? sourceData.icon : Award;
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Interviewer Registration
          </h2>
          <p className="text-purple-200 mb-8">
            Join our platform as an interviewer and help companies find the best talent
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className={`h-2 w-1/4 rounded-full ${registrationStep >= 1 ? "bg-purple-500" : "bg-purple-900/30"}`}></div>
              <div className={`h-2 w-1/4 rounded-full mx-1 ${registrationStep >= 2 ? "bg-purple-500" : "bg-purple-900/30"}`}></div>
              <div className={`h-2 w-1/4 rounded-full mx-1 ${registrationStep >= 3 ? "bg-purple-500" : "bg-purple-900/30"}`}></div>
              <div className={`h-2 w-1/4 rounded-full ${registrationStep >= 4 ? "bg-purple-500" : "bg-purple-900/30"}`}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-purple-300">
              <span>Personal</span>
              <span>Professional</span>
              <span>Expertise</span>
              <span>Account</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal Information */}
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

            {/* Step 2: Professional Information */}
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
               

                <div className="relative">
                  <FileText
                    className="absolute left-3 top-3 text-violet-300"
                    size={20}
                  />
                  <textarea
                    name="professionalSummary"
                    value={formData.professionalSummary}
                    onChange={onHandleChange}
                    rows={4}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Professional Summary"
                  />
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

            {/* Step 3: Skills & Expertise */}
            {registrationStep === 3 && (
              <>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Technical Expertise</h3>
                  
                  {/* Add Skill Form */}
                  <div className="bg-slate-800/50 border border-purple-700/30 rounded-lg p-4 space-y-4">
                    <div className="relative">
                      <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                      <input
                        type="text"
                        value={skillInput.skill}
                        onChange={(e) => setSkillInput({ ...skillInput, skill: e.target.value })}
                        className="w-full bg-slate-700 border border-purple-600/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="Skill name (e.g., React, Node.js, Python)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-purple-200 mb-2 text-sm">Proficiency Level</label>
                        <select
                          value={skillInput.proficiencyLevel}
                          onChange={(e) => setSkillInput({ ...skillInput, proficiencyLevel: e.target.value as TProficiencyLevel })}
                          className="w-full bg-slate-700 border border-purple-600/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        >
                          {proficiencyLevels.map((level) => (
                            <option key={level} value={level}>
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-purple-200 mb-2 text-sm">Years of Experience (Optional)</label>
                        <input
                          type="number"
                          value={skillInput.yearsOfExperience}
                          onChange={(e) => setSkillInput({ ...skillInput, yearsOfExperience: e.target.value === "" ? "" : Number(e.target.value) })}
                          min="0"
                          className="w-full bg-slate-700 border border-purple-600/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Years"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-purple-200 mb-2 text-sm">Skill Source (Select at least one)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {skillSources.map((source) => {
                          const Icon = source.icon;
                          const isSelected = skillInput.skillSource.includes(source.value);
                          return (
                            <button
                              key={source.value}
                              type="button"
                              onClick={() => handleSkillSourceToggle(source.value)}
                              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                                isSelected
                                  ? "bg-purple-600/30 border-purple-500 text-purple-200"
                                  : "bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600"
                              }`}
                            >
                              <Icon size={16} />
                              <span className="text-sm">{source.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addSkillExpertise}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-200 flex items-center justify-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {/* Skills List */}
                  {formData.expertise.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-white">Added Skills</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {formData.expertise.map((skill) => (
                          <div
                            key={skill.skill}
                            className="bg-slate-800 border border-purple-700/50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h5 className="font-medium text-white">{skill.skill}</h5>
                                  <span className={`text-xs px-2 py-1 rounded-full border ${getProficiencyColor(skill.proficiencyLevel)}`}>
                                    {skill.proficiencyLevel}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                  {skill.yearsOfExperience && (
                                    <span className="text-purple-200">
                                      {skill.yearsOfExperience} years
                                    </span>
                                  )}
                                  <div className="flex items-center space-x-1">
                                    {skill.skillSource.map((source) => {
                                      const Icon = getSourceIcon(source);
                                      return (
                                        <div key={source} className="flex items-center space-x-1 text-purple-300">
                                          <Icon size={12} />
                                          <span className="text-xs">{source}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSkillExpertise(skill.skill)}
                                className="text-red-400 hover:text-red-300 ml-4"
                              >
                                <X size={16} />
                              </button>
                            </div>
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
                    className="w-1/2 bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={formData.expertise.length === 0}
                    className="w-1/2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Account Setup */}
            {registrationStep === 4 && (
              <>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onHandleChange}
                    className="w-full bg-slate-800/80 border border-purple-700/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Password"
                    required
                    minLength={6}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onHandleChange}
                    className="w-full bg-slate-800/80 border border-purple-700/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="rounded bg-slate-700 border-purple-600 text-purple-600 focus:ring-purple-500/50"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-purple-200">
                    I agree to the{" "}
                    <a href="#" className="text-purple-300 hover:text-purple-100 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-300 hover:text-purple-100 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
                  >
                    Register as Interviewer
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-200">
              Already have an account?{" "}
              <a href="#" className="text-purple-300 hover:text-purple-100 font-medium underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="w-1/2 bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900 p-12 items-center hidden md:flex">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-8">
            Join Our Expert Interviewer Network
          </h1>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-slate-800 border border-purple-700/30 p-3 rounded-lg">
                <Star className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Showcase Your Expertise
                </h3>
                <p className="text-purple-200">
                  Demonstrate your technical knowledge across multiple proficiency levels and help companies find the best talent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-slate-800 border border-purple-700/30 p-3 rounded-lg">
                <Calendar className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-purple-200">
                  Set your own availability and conduct interviews when it works for you.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-slate-800 border border-purple-700/30 p-3 rounded-lg">
                <Code className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Advanced Interview Tools
                </h3>
                <p className="text-purple-200">
                  Access to collaborative coding environments, video conferencing, and comprehensive assessment tools.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-slate-800 border border-purple-700/30 p-3 rounded-lg">
                <MapPin className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Remote Opportunities
                </h3>
                <p className="text-purple-200">
                  Conduct interviews from anywhere in the world with our cloud-based platform.
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