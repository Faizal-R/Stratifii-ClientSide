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
      console.log(findedJob);
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
      console.log(response.data);
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
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-8 ">
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
                className="group relative bg-zinc-900 rounded-2xl border border-violet-800 p-6 shadow-lg hover:shadow-violet-800/30 transition-all duration-300 hover:-translate-y-1 w-full max-w-md"
              >
                {/* Accent Glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-700/20 rounded-full blur-3xl z-0 group-hover:opacity-70 transition-opacity" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-700/20 p-3 rounded-xl">
                      <Briefcase className="text-violet-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {job.position}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {job.experienceRequired}+ yrs experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Edit
                      className="hover:text-yellow-400 transition"
                      size={20}
                      onClick={() => handleJobEdit(job._id!)}
                    />
                    <Trash
                      className="hover:text-red-500 transition"
                      size={20}
                      onClick={() => handleJobDelete(job._id!)}
                    />
                  </div>
                </div>

                {/* Description */}
                {job.description && (
                  <p className=" text-gray-500 leading-relaxed line-clamp-3 mb-4 text-sm font-semibold">
                    {job.description}
                  </p>
                )}

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm text-violet-300 font-semibold flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-violet-400" />
                    Skills Required
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-violet-800/30 border border-violet-700 text-violet-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-violet-700 hover:text-white transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Footer */}
                <div className="border-t border-zinc-700 pt-4 flex items-center justify-between text-sm text-gray-400">
                  <button
                    onClick={() => navigateToJob(job._id!)}
                    className="flex items-center gap-1 text-violet-400 hover:text-white transition"
                  >
                    View
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-violet-300 ">
          <div className="w-full max-w-md max-h-[80vh] overflow-y-auto  p-6 bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-100/10 ">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Plus className="text-violet-500" size={24} />
                <h2 className="text-2xl font-bold ">Create New Job</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={isJobEditing ? handleEditJob : handleCreateJob}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={
                      isJobEditing ? selectedJob?.position : newJob.position
                    }
                    onChange={(e) =>
                      isJobEditing
                        ? setSelectedJob({
                            ...selectedJob,
                            position: e.target.value,
                          })
                        : setNewJob({ ...newJob, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border bg-violet-dark border-none outline-none  rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 "
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Experience
                  </label>
                  <input
                    name="experienceRequired"
                    type="string"
                    value={
                      isJobEditing
                        ? selectedJob.experienceRequired
                        : newJob.experienceRequired
                    }
                    onChange={(e) =>
                      isJobEditing
                        ? setSelectedJob({
                            ...selectedJob,
                            experienceRequired: Number(e.target.value),
                          })
                        : setNewJob({
                            ...newJob,
                            experienceRequired: Number(e.target.value),
                          })
                    }
                    className="w-full px-3 py-2 bg-violet-dark border-none outline-none  rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter Reqired experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={
                      isJobEditing
                        ? selectedJob?.description
                        : newJob.description
                    }
                    onChange={(e) =>
                      isJobEditing
                        ? setSelectedJob({
                            ...selectedJob,
                            description: e.target.value,
                          })
                        : setNewJob({ ...newJob, description: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-violet-dark border-none outline-none  rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 "
                    rows={3}
                    placeholder="Describe the job requirements and responsibilities"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Required Skills
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-violet-dark border-none outline-none rounded-lg focus:ring-2 focus:ring-violet-500"
                      placeholder="e.g., React"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                    >
                      Add
                    </button>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isJobEditing ? selectedJob : newJob).requiredSkills.map(
                      (skill, index) => (
                        <div
                          key={index}
                          className="bg-violet-500 text-white px-3 py-1 rounded-full flex items-center space-x-2"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => handleDeleteSkill(skill)}
                            className="text-white hover:text-gray-200 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsJobEditing(false);
                  }}
                  className="px-4 py-2 text-violet-300 hover:text-gray-500 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-900 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  {isJobEditing ? (
                    "Edit Job"
                  ) : loading ? (
                    <RiseLoader />
                  ) : (
                    "Create Job.."
                  )}
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
