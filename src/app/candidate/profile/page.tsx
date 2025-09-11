"use client"
import React, { useEffect } from "react"
import { User, Mail, FileText, CheckCircle, XCircle, Clock, Calendar, Eye } from "lucide-react"
import { useGetCandidateProfile } from "@/hooks/api/useCandidate"
import { useAuthStore } from "@/features/auth/authStore"
import type { ICandidateProfile } from "@/types/ICandidate"
import { errorToast } from "@/utils/customToast"

// Mock toast function
const toast = {
  error: (message: string) => console.error(message),
}

// Mock RiseLoader component
const RiseLoader = ({ className }: { className?: string }) => (
  <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-white ${className}`}></div>
)

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
    case "pending":
      return "bg-amber-500/20 text-amber-300 border-amber-500/50"
    case "deactive":
      return "bg-red-500/20 text-red-300 border-red-500/50"
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/50"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "deactive":
      return <XCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

function CandidateProfile() {
  const [candidateProfile, setCandidateProfile] = React.useState<ICandidateProfile>({} as ICandidateProfile)
  const { getCandidateProfile, loading } = useGetCandidateProfile()
  const { user } = useAuthStore()

  const fetchCandidateProfile = async () => {
    const response = await getCandidateProfile(user?.id as string)
    if (!response.success) {
      errorToast(response.message || "An error occurred while fetching candidate profile")
    } else {
      setCandidateProfile(response.data)
    }
  }

  useEffect(() => {
    fetchCandidateProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-violet-950/50 to-black">
        <RiseLoader className="text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-violet-950/50 to-black py-8 px-4 ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-violet-200">Your candidate information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-gray-900/80 via-violet-900/20 to-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-violet-500/20 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-violet-900/80 to-purple-900/80 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={candidateProfile.avatar || "/placeholder.svg?height=96&width=96"}
                  alt={candidateProfile.name || "Profile"}
                  className="w-24 h-24 rounded-full border-3 border-violet-300 shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-violet-500 rounded-full p-2">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold text-white mb-1">{candidateProfile.name}</h2>
                <p className="text-violet-200 mb-3 flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  {candidateProfile.email}
                </p>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm ${getStatusColor(
                      candidateProfile.status,
                    )}`}
                  >
                    {getStatusIcon(candidateProfile.status)}
                    <span className="capitalize font-medium">{candidateProfile.status}</span>
                  </div>

                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm ${
                      candidateProfile.isBlocked
                        ? "bg-red-500/20 text-red-300 border-red-500/50"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                    }`}
                  >
                    {candidateProfile.isBlocked ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span className="font-medium">{candidateProfile.isBlocked ? "Restricted" : "Active"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Section */}
              <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 rounded-xl p-6 border border-violet-500/20">
                <h3 className="text-lg font-semibold text-violet-200 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Resume
                </h3>
                {candidateProfile.resume ? (
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      candidateProfile.resume,
                    )}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    View Resume
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <p className="text-gray-400">No resume uploaded</p>
                )}
              </div>

              {/* Profile Created */}
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/20 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-200 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Member Since
                </h3>
                <p className="text-2xl font-bold text-blue-300">
                  {candidateProfile.createdAt
                    ? new Date(candidateProfile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* View-Only Notice */}
            <div className="mt-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center text-amber-200">
                <Eye className="w-5 h-5 mr-3" />
                <div>
                  <p className="font-medium">View-Only Profile</p>
                  <p className="text-sm text-amber-300 mt-1">
                    Contact your administrator to update profile information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfile