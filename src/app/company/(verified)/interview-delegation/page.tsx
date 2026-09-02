"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  X,
 
  Briefcase,
  FolderPlus,
  Search,
  Users,
  Clock,
  Tag,
  ChevronRight,
  Trash,
  Edit,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  useCreateJob,
  useDeleteJob,
  useGetJobs,
  useUpdateJob,
} from "@/hooks/api/useJob";
import { RiseLoader } from "react-spinners";
// import { ICandidateJob } from "@/types/IJob";
import { HttpStatusCode } from "axios";
import { IJob } from "@/types/IJob";
import { errorToast, successToast } from "@/utils/customToast";

function InterviewDelegation() {
  const router = useRouter();
  const { createJob, loading } = useCreateJob();
  const { deleteJob } = useDeleteJob();
  const { getJobs } = useGetJobs();
  const [hasFetchedJobs, setHasFetchedJobs] = useState(false);
  const { updateJob } = useUpdateJob();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobEditing, setIsJobEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJob>({} as IJob);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [newJob, setNewJob] = useState<Omit<IJob, "_id">>({
    position: "",
    description: "",
    requiredSkills: [],
    experienceRequired: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const validateJob = (job: Omit<IJob, "_id"> | IJob) => {
    if (!job.position.trim()) {
      errorToast("Position is required");
      return false;
    }

    if (
      job.experienceRequired === "" ||
      isNaN(Number(job.experienceRequired)) ||
      Number(job.experienceRequired) < 0
    ) {
      errorToast("Experience must be a valid non-negative number");
      return false;
    }

    if (!job.requiredSkills || job.requiredSkills.length === 0) {
      errorToast("At least one skill is required");
      return false;
    }

    return true;
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return errorToast("Skill cannot be empty");

    const targetJob = isJobEditing ? selectedJob : newJob;

    if (targetJob.requiredSkills?.includes(trimmed)) {
      return errorToast("Skill already added");
    }

    const updatedSkills = [...(targetJob.requiredSkills || []), trimmed];

    if (isJobEditing) {
      setSelectedJob({ ...selectedJob, requiredSkills: updatedSkills });
    } else {
      setNewJob({ ...newJob, requiredSkills: updatedSkills });
    }

    setSkillInput("");
  };

  const handleDeleteSkill = (skillToRemove: string) => {
    const targetJob = isJobEditing ? selectedJob : newJob;
    const updatedSkills = targetJob.requiredSkills.filter(
      (skill) => skill !== skillToRemove
    );

    if (isJobEditing)
      setSelectedJob({ ...selectedJob, requiredSkills: updatedSkills });
    else setNewJob({ ...newJob, requiredSkills: updatedSkills });
  };

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!validateJob(selectedJob)) return;

    const res = await updateJob({
      ...selectedJob,
      experienceRequired: Number(selectedJob.experienceRequired),
    });

    if (!res.success) {
      errorToast(res.message);
      return;
    }

    successToast("Job updated successfully");
    setJobs((prev) =>
      prev.map((job) => (job._id === selectedJob._id ? selectedJob : job))
    );
    setIsJobEditing(false);
    setIsModalOpen(false);
  };
  const handleJobDelete = async (jobId: string) => {
    const res = await deleteJob(jobId);
    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast(res.message);
    setJobs((prev) => prev.filter((job) => job._id !== jobId));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(",").map((skill) => skill.trim());

    if (isJobEditing) {
      setSelectedJob((prev) => ({ ...prev, requiredSkills: skills }));
    }
    setNewJob({ ...newJob, requiredSkills: skills });
  };

  const navigateToJob = (jobId: string) => {
    router.push(`/company/interview-delegation/job/${jobId}`);
  };

  const handleJobEdit = (jobId: string) => {
    setIsJobEditing(true);
    setIsModalOpen(true);
    const findedJob = jobs.find((job) => job._id === jobId);
    if (findedJob) {
      
      setSelectedJob(findedJob);
    }
  };

  const hasFetched = useRef(false);
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateJob(newJob)) return;

    const response = await createJob(
      newJob.position,
      newJob.description,
      Number(newJob.experienceRequired),
      newJob.requiredSkills
    );

    if (!response.success) {
      errorToast(response.message);
      if (response.status === HttpStatusCode.Forbidden) {
        setTimeout(() => router.push("/company/subscription"), 1500);
      }
      return;
    }

    setJobs([...jobs, response.data]);
    setIsModalOpen(false);
    successToast(response.message);

    // Reset form
    setNewJob({
      position: "",
      description: "",
      requiredSkills: [],
      experienceRequired: "",
    });
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchJobs = async () => {
      const response = await getJobs();
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      setJobs(response.data);
      setHasFetchedJobs(true);
      
    };

    fetchJobs();
  }, [getJobs]);

  if (!hasFetchedJobs) {
    // API is still fetching → show loader only
    return (
      <div className="h-screen flex justify-center items-center">
        <RiseLoader color="white" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-violet-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Briefcase className="text-violet-600" size={32} />
            <h1 className="text-3xl font-bold ">Interview Delegation</h1>
          </div>
          {jobs.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200 hover:scale-105 transform mt-3"
            >
              <Plus size={20} />
              Create Job
            </button>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className=" rounded-xl shadow-lg p-12 ">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full transform -rotate-6"></div>
                  <div className="relative">
                    <FolderPlus className="w-24 h-24 text-violet-500" />
                    <Search className="w-12 h-12 text-violet-600 absolute -bottom-2 -right-2 transform rotate-12" />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                No Jobs Posted Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Kickstart your hiring process by posting your first job.
                Schedule interviews seamlessly and engage with top talent to
                build your ideal team.
              </p>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200 hover:scale-105 transform"
                >
                  <Plus size={20} />
                  Post Your First Job
                </button>
                <div className="flex items-center gap-8 mt-8 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>Find Talent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>Save Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag size={20} />
                    <span>Track Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`
            grid 
            grid-cols-1  
           sm:grid-cols-2  
          lg:grid-cols-3      
            xl:grid-cols-3      
          gap-6 
         relative`}
          >
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group relative bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black rounded-3xl border border-zinc-800/90 p-6 shadow-2xl hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white group-hover:text-violet-300 transition-colors">
                          {job.position}
                        </h2>
                        <p className="text-xs text-zinc-400 font-semibold mt-0.5">
                          {job.experienceRequired}+ Yrs Exp Required
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-xl shrink-0">
                      <button
                        onClick={() => handleJobEdit(job._id!)}
                        className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-lg transition-all"
                        title="Edit Job"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleJobDelete(job._id!)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all"
                        title="Delete Job"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  {job.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  )}

                  {/* Required Skills */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag size={13} className="text-violet-400" /> Required Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-violet-950/60 border border-violet-800/40 text-violet-300 text-[11px] font-bold rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-zinc-900 pt-4 mt-5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-500">Delegated Position</span>
                  <button
                    onClick={() => navigateToJob(job._id!)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-violet-400 hover:text-white bg-violet-950/80 hover:bg-violet-600 px-4 py-2 rounded-xl border border-violet-800/50 transition-all shadow-md"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl border border-zinc-800 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{isJobEditing ? "Edit Position Details" : "Delegate New Job Position"}</h2>
                  <p className="text-xs text-zinc-400">Define role requirements for AI vetting & expert interviewer matching</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsJobEditing(false);
                  setNewJob({
                    position: "",
                    description: "",
                    requiredSkills: [],
                    experienceRequired: "",
                  });
                  setSkillInput("");
                }}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={isJobEditing ? handleEditJob : handleCreateJob} className="space-y-5">
              {/* Job Title / Position */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Position Title</label>
                <input
                  type="text"
                  value={isJobEditing ? selectedJob?.position : newJob.position}
                  onChange={(e) =>
                    isJobEditing
                      ? setSelectedJob({ ...selectedJob, position: e.target.value })
                      : setNewJob({ ...newJob, position: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  placeholder="e.g. Senior Fullstack Architect"
                />
              </div>

              {/* Experience Required */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Required Experience (Years)</label>
                <input
                  name="experienceRequired"
                  type="text"
                  value={isJobEditing ? selectedJob.experienceRequired : newJob.experienceRequired}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/[^0-9]/g, "");
                    if (isJobEditing) {
                      setSelectedJob({ ...selectedJob, experienceRequired: cleanVal });
                    } else {
                      setNewJob({ ...newJob, experienceRequired: cleanVal });
                    }
                  }}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  placeholder="e.g. 5"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Job Description & Context</label>
                <textarea
                  value={isJobEditing ? selectedJob?.description : newJob.description}
                  onChange={(e) =>
                    isJobEditing
                      ? setSelectedJob({ ...selectedJob, description: e.target.value })
                      : setNewJob({ ...newJob, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  rows={3}
                  placeholder="Describe essential responsibilities and evaluation criteria..."
                />
              </div>

              {/* Required Skills Input & Tags */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Technical Skills Stack</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 transition-all"
                    placeholder="e.g. React, Node.js"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Skill
                  </button>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {(isJobEditing ? selectedJob : newJob).requiredSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-950/80 border border-violet-800/60 text-violet-300 text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill)}
                        className="text-violet-400 hover:text-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsJobEditing(false);
                    setNewJob({
                      position: "",
                      description: "",
                      requiredSkills: [],
                      experienceRequired: "",
                    });
                    setSkillInput("");
                  }}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
                >
                  {isJobEditing ? "Update Position" : loading ? <RiseLoader color="#ffffff" size={6} /> : "Delegate Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewDelegation;
