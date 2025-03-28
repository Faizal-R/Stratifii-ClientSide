"use client";
import React, {  useEffect, useRef, useState } from "react";
import {
  Plus,
  X,
  Calendar,
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
import { toast } from "sonner";
import {
  useCreateJob,
  useDeleteJob,
  useGetJobs,
  useUpdateJob,
} from "@/hooks/useJob";
import { RiseLoader } from "react-spinners";

interface Job {
  _id: string;
  position: string;
  description: string;
  requiredSkills: string[];
  deadline: string;
  experienceRequired: number;
}

function InterviewDelegation() {
  const router = useRouter();
  const { createJob, loading } = useCreateJob();
  const { deleteJob } = useDeleteJob();
  const { getJobs } = useGetJobs();
  const { updateJob } = useUpdateJob();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJobEditing, setIsJobEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job>({} as Job);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Omit<Job, "_id">>({
    position: "",
    description: "",
    requiredSkills: [],
    deadline: "",
    experienceRequired: 0,
  });

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob.position || !selectedJob.requiredSkills.length) {
      toast("Please fill all fields");
      return;
    }
    const res = await updateJob({
      ...selectedJob,
      deadline: new Date(selectedJob.deadline),
    });
    if (!res.success) {
      toast(res.error);
      return;
    }
    toast.success("Job updated successfully");
    setJobs((prev) =>
      prev.map((job) => (job._id === selectedJob._id ? selectedJob : job))
    );
    setIsJobEditing(false);
    setIsModalOpen(false);
  };
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.position || !newJob.requiredSkills.length || !newJob.deadline) {
      toast("Please fill all  fields");
      return;
    }

    const response = await createJob(
      newJob.position,
      newJob.description,
      new Date(newJob.deadline),
      newJob.experienceRequired,
      newJob.requiredSkills
    );
    if (!response.success) {
      toast(response.error);
      return;
    }
    setJobs([...jobs, response.data]);
    setIsModalOpen(false);
    toast.success(response.message);
    setNewJob({
      position: "",
      description: "",
      requiredSkills: [],
      deadline: "",
      experienceRequired: 0,
    });
  };
  const handleJobDelete = async (jobId: string) => {
    const res = await deleteJob(jobId);
    if (!res.success) {
      toast(res.error);
      return;
    }
    toast.success(res.message);
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

  useEffect(() => {
    if (hasFetched.current) return; 
  
    hasFetched.current = true; 
  
    const fetchJobs = async () => {
      const response = await getJobs();
      if (!response.success) {
        toast(response.error);
        return;
      }
      setJobs(response.data);
    };
  
    fetchJobs();
  }, [getJobs]); 
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-8 pl-72">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-violet-200">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Briefcase className="text-violet-600" size={32} />
            <h1 className="text-3xl font-bold ">Interview Delegation</h1>
          </div>
          {jobs.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200 hover:scale-105 transform"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {jobs.map((job) => (
              <div
                key={job._id}
                // onClick={() => navigateToJob(job._id)}
                className="group bg-gradient-to-br from-black via-black to-violet-950 rounded-xl shadow-md p-6 border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1 relative"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-violet-600 transition-colors flex items-center gap-1">
                    {job?.position}
                    <Briefcase
                      className="text-violet-500 group-hover:text-violet-600 transition-colors"
                      size={24}
                    />
                  </h3>
                  <div className="flex  text-red-600 gap-1 absolute right-1 top-2">
                    <Edit size={20} onClick={() => handleJobEdit(job._id)} />
                    <Trash size={20} onClick={() => handleJobDelete(job._id)} />
                  </div>
                </div>
                <p>{job.experienceRequired} Years of experience</p>
                {job.description && (
                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {job.description}
                  </p>
                )}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Tag size={16} className="text-violet-500" />
                    Required Skills
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium group-hover:bg-violet-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} className="text-violet-500" />
                    <span className="text-sm">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => navigateToJob(job._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-black/80 backdrop-blur-sm text-violet-300">
          <div className="w-full max-w-md p-6 bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10">
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
                    type="number"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={
                      isJobEditing
                        ? selectedJob?.requiredSkills.join(", ")
                        : newJob.requiredSkills.join(", ")
                    }
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full px-3 py-2 bg-violet-dark border-none outline-none  rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="e.g., React, TypeScript, Node.js"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={
                      isJobEditing
                        ? selectedJob?.deadline
                          ? new Date(selectedJob.deadline)
                              .toISOString()
                              .split("T")[0]
                          : ""
                        : newJob.deadline
                    }
                    onChange={(e) =>
                      isJobEditing
                        ? setSelectedJob({
                            ...selectedJob,
                            deadline: e.target.value,
                          })
                        : setNewJob({ ...newJob, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-violet-dark border-none outline-none rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
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
