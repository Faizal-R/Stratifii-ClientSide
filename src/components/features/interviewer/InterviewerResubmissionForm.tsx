"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/Buttons/button"
import {
  AlertTriangle,
  Briefcase,
  Linkedin,
  Clock,
  Upload,
  Code,
  Plus,
  X,
  AlignCenterVertical as Certificate,
  User2,
  BookOpen,
  Award,
} from "lucide-react"
import { IInterviewerProfile } from "@/validations/InterviewerSchema"
import { TProficiencyLevel, TSkillSource } from "@/app/(auth)/register/interviewer/page"
import { useUpdateInterviewerProfile } from "@/hooks/api/useInterviewer"
import { errorToast, successToast } from "@/utils/customToast"

  const SkillSources: { value: TSkillSource; label: string; icon: any }[] = [
    { value: "professional", label: "Professional", icon: Briefcase },
    { value: "academic", label: "Academic", icon: BookOpen },
    { value: "personal", label: "Personal", icon: User2 },
    { value: "certification", label: "Certification", icon: Certificate },
  ];

const InterviewerRejectedPage: React.FC<{ interviewer: IInterviewerProfile }> = ({ interviewer }) => {
  const rejectionReason = "Your profile details did not meet our quality standards."
  const {updateInterviewerProfile,loading}=useUpdateInterviewerProfile()
  const [resumePreview,setResumePreview]=useState<string|null>(null)
  const resubmissionPeriod = interviewer.resubmissionPeriod
    ? new Date(interviewer.resubmissionPeriod)
    : null

  const [canResubmit, setCanResubmit] = useState(false)

  // === Form State ===
  const [formData, setFormData] = useState({
    position: interviewer.position || "",
    linkedinProfile: interviewer.linkedinProfile || "",
    experience: interviewer.experience || 0,
    resume: null as File|null,
    expertise: interviewer.expertise || [],
    resubmissionNote: "",
  })

  const [skillInput, setSkillInput] = useState({
    skill: "",
    proficiencyLevel: "beginner" as TProficiencyLevel,
    yearsOfExperience: "",
    skillSource: [] as string[],
  })

  // === Skill Helpers ===
  const proficiencyLevels: TProficiencyLevel[] = ["beginner", "intermediate", "advanced", "expert"]

  const getProficiencyColor = (level: TProficiencyLevel) => {
    const colors = {
      beginner: "bg-red-500/20 text-red-300 border-red-500/30",
      intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      advanced: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      expert: "bg-green-500/20 text-green-300 border-green-500/30",
    }
    return colors[level]
  }

  const getSourceIcon = (source: TSkillSource) => {
    const sourceData = SkillSources.find((s) => s.value === source)
    return sourceData ? sourceData.icon : Award
  }

  const handleSkillSourceToggle = (source: TSkillSource) => {
    setSkillInput((prev) => ({
      ...prev,
      skillSource: prev.skillSource.includes(source)
        ? prev.skillSource.filter((s) => s !== source)
        : [...prev.skillSource, source],
    }))
  }

  const addSkillExpertise = () => {
    if (!skillInput.skill.trim()) return
    setFormData((prev) => ({
      ...prev,
      expertise: [
        ...prev.expertise,
        {
          skill: skillInput.skill,
          proficiencyLevel: skillInput.proficiencyLevel,
          yearsOfExperience:
            skillInput.yearsOfExperience === "" ? undefined : Number(skillInput.yearsOfExperience),
          skillSource: skillInput.skillSource as TSkillSource[],
        },
      ],
    }))
    setSkillInput({ skill: "", proficiencyLevel: "beginner", yearsOfExperience: "", skillSource: [] })
  }

  const removeSkillExpertise = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((s) => s.skill !== skill),
    }))
  }

  // === Form Handlers ===
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setResumePreview(fileUrl);
      setFormData((prev) => ({ ...prev, resume: file }))
    }
     
    
  }

  const handleResubmission = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Resubmission data:", formData)
    const { resume, ...formDataWithoutResume } = formData;
    const response = await updateInterviewerProfile({
      ...formDataWithoutResume,
      name: interviewer.name,
      email: interviewer.email,
      phone: interviewer.phone,
      status: "pending",
    }, '', resumePreview)
    if(!response.success){
      errorToast(response.message)
      return
    }
    successToast("Resubmission submitted successfully ✅")
    
  }

  // === Cooldown Check ===
  useEffect(() => {
    if (resubmissionPeriod) {
      const now = new Date()
      setCanResubmit(now >= resubmissionPeriod)
    }
  }, [resubmissionPeriod])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-black to-red-900 px-6 py-12">
      <Card className="w-full max-w-4xl bg-black/60 backdrop-blur-xl border-red-500/40 shadow-2xl rounded-2xl">
        {/* Header */}
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600/20 shadow-lg">
            <AlertTriangle className="h-10 w-10 text-red-400" />
          </div>
          <CardTitle className="text-red-400 text-3xl font-bold">Application Rejected</CardTitle>
          <p className="text-gray-300">Unfortunately, your interviewer application has been rejected.</p>
          {rejectionReason && (
            <p className="text-sm text-red-300 italic">Reason: {rejectionReason}</p>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-8">
          {!canResubmit ? (
            <p className="text-center text-gray-400">
              You will be able to resubmit after your cooldown period.
            </p>
          ) : (
            <form onSubmit={handleResubmission} className="space-y-10">
              {/* Profile Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-500/30 pb-2">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Position */}
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
                      className="w-full bg-black/70 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                      placeholder="Current Position"
                    />
                  </div>

                  {/* LinkedIn */}
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
                      className="w-full bg-black/70 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                      placeholder="LinkedIn Profile"
                    />
                  </div>

                  {/* Experience */}
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
                      className="w-full bg-black/70 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                      placeholder="Years of Experience"
                    />
                  </div>

                  {/* Resume */}
                  <div className="relative">
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
                    <div
                      className="w-full bg-black/70 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg 
                    focus-within:ring-2 focus-within:ring-violet-500/50 cursor-pointer transition"
                    >
                      {formData.resume ? (
                        <span className="text-gray-400">{formData.resume.name}</span>
                      ) : (
                        <span className="text-gray-400">Upload Updated Resume</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-500/30 pb-2">
                  Technical Expertise
                </h3>
                <div className="space-y-3">
                  {/* Add Skill */}
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
                            proficiencyLevel: e.target.value as TProficiencyLevel,
                          })
                        }
                        className="px-3 py-2.5 w-full bg-black/80 border border-violet-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm"
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
                            yearsOfExperience: e.target.value,
                          })
                        }
                        min="0"
                        className="px-3 py-2.5 w-full bg-black/80 border border-violet-900/50 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-lg text-sm"
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

                    {/* Skill Sources */}
                    <div className="grid grid-cols-4 gap-1">
                      {SkillSources.map((source) => {
                        const Icon = source.icon
                        const isSelected = skillInput.skillSource.includes(source.value)
                        return (
                          <button
                            key={source.value}
                            type="button"
                            onClick={() => handleSkillSourceToggle(source.value)}
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
                        )
                      })}
                    </div>
                  </div>

                  {/* Added Skills */}
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
                                    skill.proficiencyLevel,
                                  )}`}
                                >
                                  {skill.proficiencyLevel.charAt(0).toUpperCase() +
                                    skill.proficiencyLevel.slice(1)}
                                </span>
                                {skill.yearsOfExperience && (
                                  <span className="text-purple-200 text-xs">
                                    {skill.yearsOfExperience} years
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 mt-1">
                                {skill.skillSource.map((source) => {
                                  const Icon = getSourceIcon(source)
                                  return (
                                    <div key={source} className="flex items-center gap-1 justify-center">
                                      <Icon size={14} className="text-purple-300" />
                                      <h1 className="text-xs font-bold text-purple-300">
                                        {source.charAt(0).toUpperCase() + source.slice(1)}
                                      </h1>
                                    </div>
                                  )
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
              </div>

              {/* Resubmission Note */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-red-500/30 pb-2">
                  Resubmission Note
                </h3>
                <textarea
                  name="resubmissionNote"
                  value={formData.resubmissionNote}
                  onChange={onHandleChange}
                  placeholder="Explain what you updated or improved..."
                  className="w-full mt-2 p-4 rounded-lg bg-black/60 border border-violet-500/30 text-gray-200 
                  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-1/2 bg-gradient-to-r from-violet-700 to-purple-800 text-white 
                  py-3 rounded-lg font-semibold hover:from-violet-800 hover:to-purple-900 transition duration-200"
                >
                  Resubmit Application
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default InterviewerRejectedPage
