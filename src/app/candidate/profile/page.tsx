"use client";
import React, { useEffect } from "react";
import {
  User,
  Mail,
  FileText,
  Shield,
  Building,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Activity,
  Eye,
  Star,
  Crown,
} from "lucide-react";
import { useGetCandidateProfile } from "@/hooks/useCandidate";
import { useAuthStore } from "@/features/auth/authStore";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";

import { ICandidateProfile } from "@/types/ICandidate";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-900/50 text-emerald-300 border-emerald-500/50";
    case "pending":
      return "bg-amber-900/50 text-amber-300 border-amber-500/50";
    case "deactive":
      return "bg-red-900/50 text-red-300 border-red-500/50";
    default:
      return "bg-gray-900/50 text-gray-300 border-gray-500/50";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "deactive":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};

function CandidateProfile() {
  const [candidateProfile, setCandidateProfile] =
    React.useState<ICandidateProfile>({} as ICandidateProfile);
  const { getCandidateProfile, loading } = useGetCandidateProfile();
  const { user } = useAuthStore();
  const fetchCandidateProfile = async () => {
    const response = await getCandidateProfile(user?.id as string);
    if (!response.success) {
      toast.error(
        response.error || "An error occurred while fetching candidateProfile"
      );
    } else {
      setCandidateProfile(response.data);
    }
  };
  useEffect(() => {
    fetchCandidateProfile();
  }, []);
  return loading ? (
    <div className="flex items-center justify-center min-h-screen ">
      <RiseLoader className="text-white" />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 py-12 px-4">
      <div className="max-w-5xl mx-auto ml-80">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-full p-3 mr-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-xl text-violet-200 max-w-2xl mx-auto">
            View your candidate profile information and application status
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-900/50 via-violet-900/20 to-black/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-violet-500/20">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 px-8 py-16">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Avatar Section */}
              <div className="relative">
                <div className="relative">
                  <img
                    src={
                      candidateProfile.avatar ||
                      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
                    }
                    alt={candidateProfile.name}
                    className="w-40 h-40 rounded-full border-4 border-violet-300 shadow-2xl object-cover"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full p-3 shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-2 shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left text-white flex-1">
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                  {candidateProfile.name}
                </h2>
                <p className="text-violet-200 text-xl mb-2 font-semibold">
                  Candidate
                </p>
                <p className="text-violet-300 text-lg mb-6 flex items-center justify-center lg:justify-start">
                  <Mail className="w-5 h-5 mr-2" />
                  {candidateProfile.email}
                </p>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-sm ${getStatusColor(
                      candidateProfile.status
                    )}`}
                  >
                    {getStatusIcon(candidateProfile.status)}
                    <span className="text-sm font-semibold capitalize">
                      {candidateProfile.status}
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
                      candidateProfile.isBlocked
                        ? "bg-red-900/50 text-red-300 border-red-500/50"
                        : "bg-emerald-900/50 text-emerald-300 border-emerald-500/50"
                    }`}
                  >
                    {candidateProfile.isBlocked ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm font-semibold">
                      {candidateProfile.isBlocked
                        ? "Access Restricted"
                        : "Active Candidate"}
                    </span>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-sm text-violet-300 mb-2">
                    Profile is view-only
                  </p>
                  <p className="text-xs text-violet-400">
                    Contact your company administrator for profile updates
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Personal Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-violet-200 mb-8 flex items-center">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-2 mr-3">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    Personal Information
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 rounded-xl p-6 border border-violet-500/20">
                      <label className="block text-sm font-semibold text-violet-300 uppercase tracking-wide mb-2">
                        Full Name
                      </label>
                      <p className="text-xl font-semibold text-white">
                        {candidateProfile.name}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 rounded-xl p-6 border border-violet-500/20">
                      <label className="block text-sm font-semibold text-violet-300 uppercase tracking-wide mb-2">
                        Email Address
                      </label>
                      <p className="text-xl font-semibold text-white flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-violet-400" />
                        {candidateProfile.email}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 rounded-xl p-6 border border-violet-500/20">
                      <label className="block text-sm font-semibold text-violet-300 uppercase tracking-wide mb-2">
                        Resume
                      </label>
                      <a
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        candidateProfile.resume as string
                      )}&embedded=true`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xl font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                      >

                        <FileText className="w-5 h-5 mr-3" />
                        View Resume
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status & Company */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-violet-200 mb-8 flex items-center">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-2 mr-3">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    Application Status
                  </h3>

                  <div className="space-y-6">


                    <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/20 rounded-xl p-6 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">
                          Access Level
                        </span>
                        <div
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                            candidateProfile.isBlocked
                              ? "bg-red-900/50 text-red-300 border-red-500/50"
                              : "bg-emerald-900/50 text-emerald-300 border-emerald-500/50"
                          }`}
                        >
                          {candidateProfile.isBlocked ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          <span className="text-sm font-bold">
                            {candidateProfile.isBlocked
                              ? "Restricted"
                              : "Full Access"}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {candidateProfile.isBlocked
                          ? "Your account access has been temporarily restricted. Contact your company administrator for more information."
                          : "You have full access to view your profile and application status."}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                          Associated Company
                        </span>
                        <Building className="w-6 h-6 text-purple-400" />
                      </div>
                      <p className="text-xl font-bold text-white">
                        {candidateProfile.companyName || "Company Name"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Company ID: {candidateProfile.companyId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div className="mt-16 pt-8 border-t border-violet-500/20">
              <h3 className="text-2xl font-bold text-violet-200 mb-10 flex items-center">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-2 mr-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                Profile Activity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-xl p-8 border border-blue-500/20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-3 mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-blue-200">
                      Profile Created
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-300 mb-2">
                    {new Date(candidateProfile.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-blue-400">
                    {new Date(candidateProfile.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/20 rounded-xl p-8 border border-emerald-500/20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-3 mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-emerald-200">
                      Last Updated
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-emerald-300 mb-2">
                    {new Date(candidateProfile.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-emerald-400">
                    {new Date(candidateProfile.updatedAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Read-Only Notice */}
            <div className="mt-12 pt-8 border-t border-violet-500/10">
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 rounded-xl p-6 border border-amber-500/20">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-amber-400 mr-3" />
                  <h4 className="text-lg font-semibold text-amber-200">
                    View-Only Profile
                  </h4>
                </div>
                <p className="text-amber-100 leading-relaxed">
                  This profile is read-only. To update your information, resume,
                  or other details, please contact your company administrator or
                  HR department.
                </p>
              </div>
            </div>

            {/* Account ID */}
            <div className="mt-8 pt-6 border-t border-violet-500/10">
              <div className="bg-gradient-to-r from-gray-900/50 to-violet-900/20 rounded-xl p-6 border border-gray-500/20">
                <p className="text-xs text-violet-300 uppercase tracking-wide font-semibold mb-2">
                  Candidate ID
                </p>
                <p className="text-sm font-mono text-gray-300 break-all">
                  {candidateProfile._id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;
