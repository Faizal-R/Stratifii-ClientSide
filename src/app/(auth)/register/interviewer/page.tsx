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
  Languages,
  Calendar,
  FileText,
  Code,
  Star,
} from "lucide-react";
import { useInterviewerRegister } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { RiseLoader } from "react-spinners";
import {
  IInterviewerRegistration,
  interviewerSchema,
} from "@/validations/InterviewerSchema";
import Link from "next/link";
import { handleInterviewerRegistrationStep } from "@/utils/handleRegistrationStep";
import { Roles } from "@/constants/roles";
import {
  useSetupInterviewerAccount,
  useUpadteInterviewerProfile,
} from "@/hooks/useInterviewer";
import { set } from "zod";

function InterviewerRegistrationPage() {
  const isGoogleVerified =
    Boolean(useSearchParams().get("isGoogleVerified")) ?? false;
  const interviewerId = useSearchParams().get("id") ?? "";
  const { loading, registerInterviewer } = useInterviewerRegister();
  const { setupInterviewerAccount, loading: isSetupingAcccount } =
    useSetupInterviewerAccount();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    experience: 0,
    linkedinProfile: "",
    language: {} as Record<string, string>,
    availableDays: [] as string[],
    professionalSummary: "",
    expertise: [] as string[],
    status: "", // Add status property
    isVerified: false, // Add isVerified property
  });

  const [registrationStep, setRegistrationStep] = useState(1);
  const [languageInput, setLanguageInput] = useState({
    name: "",
    level: "Beginner",
  });
  const [expertiseInput, setExpertiseInput] = useState("");
  const [dayInput, setDayInput] = useState("Monday");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const languageLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Native/Fluent",
  ];
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
      toast.success("Account setup successfully");

      router.push(`/${Roles.INTERVIEWER}`);
    } else {
      const response = await registerInterviewer(formData); // Set default status
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

  const nextStep = async () => {
    const validInterviewer = await handleInterviewerRegistrationStep(
      formData,
      registrationStep,
      isGoogleVerified ? isGoogleVerified : false
    );
    if (!validInterviewer?.success) {
      const errors = validInterviewer?.errors;
      for (const issue of errors!) {
        toast.error(issue.message, {
          className: "custom-error-toast",
        });
        return;
      }
    }
    setRegistrationStep(registrationStep + 1);
  };

  const prevStep = () => {
    setRegistrationStep(registrationStep - 1);
  };

  const addLanguage = () => {
    if (languageInput.name.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      language: {
        ...prev.language,
        [languageInput.name]: languageInput.level,
      },
    }));

    setLanguageInput({ name: "", level: "Beginner" });
  };

  const removeLanguage = (langName: string) => {
    const updatedLanguages = { ...formData.language };
    delete updatedLanguages[langName];

    setFormData((prev) => ({
      ...prev,
      language: updatedLanguages,
    }));
  };

  const addExpertise = () => {
    if (expertiseInput.trim() === "") return;

    setFormData((prev) => ({
      ...prev,
      expertise: [...prev.expertise, expertiseInput],
    }));

    setExpertiseInput("");
  };

  const removeExpertise = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((item) => item !== skill),
    }));
  };

  const addAvailability = () => {
    if (!dayInput || formData.availableDays.includes(dayInput)) return;

    setFormData((prev) => ({
      ...prev,
      availableDays: [...prev.availableDays, dayInput],
    }));

    setDayInput("Monday");
  };

  const removeAvailability = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.filter((item) => item !== day),
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

            {registrationStep === 3 && (
              <>
                <div className="space-y-5">
                  <div>
                    <label className="block text-violet-200 mb-2 text-sm font-medium">
                      Languages
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <div className="relative flex-1">
                        <Languages
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                          size={20}
                        />
                        <input
                          type="text"
                          value={languageInput.name}
                          onChange={(e) =>
                            setLanguageInput({
                              ...languageInput,
                              name: e.target.value,
                            })
                          }
                          className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                          placeholder="Language"
                        />
                      </div>
                      <select
                        value={languageInput.level}
                        onChange={(e) =>
                          setLanguageInput({
                            ...languageInput,
                            level: e.target.value,
                          })
                        }
                        className="bg-black/80 border border-violet-900/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      >
                        {languageLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                      >
                        Add
                      </button>
                    </div>

                    {Object.keys(formData.language).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(formData.language).map(
                          ([lang, level]) => (
                            <div
                              key={lang}
                              className="bg-black/80 border border-violet-900/50 text-white px-3 py-1 rounded-full flex items-center"
                            >
                              <span>
                                {lang} - {level}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeLanguage(lang)}
                                className="ml-2 text-violet-300 hover:text-violet-100"
                              >
                                ×
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-violet-200 mb-2 text-sm font-medium">
                      Technical Expertise
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <div className="relative flex-1">
                        <Code
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                          size={20}
                        />
                        <input
                          type="text"
                          value={expertiseInput}
                          onChange={(e) => setExpertiseInput(e.target.value)}
                          className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                          placeholder="Skill (e.g., React, Node.js, Java)"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addExpertise}
                        className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                      >
                        Add
                      </button>
                    </div>

                    {formData.expertise.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.expertise.map((skill) => (
                          <div
                            key={skill}
                            className="bg-black/80 border border-violet-900/50 text-white px-3 py-1 rounded-full flex items-center"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeExpertise(skill)}
                              className="ml-2 text-violet-300 hover:text-violet-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-violet-200 mb-2 text-sm font-medium">
                      Availability (Days)
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <div className="relative flex-1">
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                          size={20}
                        />
                        <select
                          value={dayInput}
                          onChange={(e) => setDayInput(e.target.value)}
                          className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        >
                          {weekDays.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={addAvailability}
                        className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                      >
                        Add
                      </button>
                    </div>

                    {formData.availableDays.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.availableDays.map((day) => (
                          <div
                            key={day}
                            className="bg-black/80 border border-violet-900/50 text-white px-3 py-1 rounded-full flex items-center"
                          >
                            <span>{day}</span>
                            <button
                              type="button"
                              onClick={() => removeAvailability(day)}
                              className="ml-2 text-violet-300 hover:text-violet-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
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
