"use client";
import React, { useEffect } from "react";
import { User, Mail, FileText, CheckCircle2, XCircle, Clock, Calendar, Eye, Sparkles, ShieldCheck, Award } from "lucide-react";
import { useGetCandidateProfile } from "@/hooks/api/useCandidate";
import { useAuthStore } from "@/features/auth/authStore";
import type { ICandidateProfile } from "@/types/ICandidate";
import { errorToast } from "@/utils/customToast";
import { RiseLoader } from "react-spinners";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "deactive":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-zinc-800 text-zinc-300 border-zinc-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle2 className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "deactive":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

function CandidateProfile() {
  const [candidateProfile, setCandidateProfile] = React.useState<ICandidateProfile>({} as ICandidateProfile);
  const { getCandidateProfile, loading } = useGetCandidateProfile();
  const { user } = useAuthStore();

  const fetchCandidateProfile = async () => {
    const response = await getCandidateProfile(user?.id as string);
    if (!response.success) {
      errorToast(response.message || "An error occurred while fetching candidate profile");
    } else {
      setCandidateProfile(response.data);
    }
  };

  useEffect(() => {
    fetchCandidateProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <RiseLoader color="#8b5cf6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30 overflow-x-hidden font-sans pb-20">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[25%] w-[650px] h-[450px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[170px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 md:px-8 pt-8 max-w-4xl space-y-8">
        
        {/* --- EXECUTIVE CANDIDATE HERO BANNER --- */}
        <div className="relative rounded-[32px] overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl backdrop-blur-2xl">
          <div className="h-48 bg-gradient-to-r from-violet-950 via-zinc-900 to-black relative border-b border-zinc-800/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_70%)]" />
            <div className="absolute top-4 right-6 flex items-center gap-2 bg-violet-950/90 border border-violet-600/40 text-violet-300 text-xs font-black px-4 py-1.5 rounded-full backdrop-blur-md uppercase tracking-widest shadow-inner">
              <Sparkles size={14} className="text-violet-400 animate-pulse" />
              Delegated Candidate Profile
            </div>

            {/* Avatar Frame */}
            <div className="absolute -bottom-12 left-8 w-32 h-32 md:w-36 md:h-36 rounded-3xl border-4 border-black overflow-hidden bg-zinc-900 shadow-2xl flex items-center justify-center z-20">
              <img
                src={candidateProfile.avatar || "/placeholder.svg?height=128&width=128"}
                alt={candidateProfile.name || "Candidate Avatar"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Details Header Bar */}
          <div className="pt-16 pb-6 px-8 bg-gradient-to-b from-zinc-950 to-black flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tight">
                  {candidateProfile.name || "Candidate Profile"}
                </h1>
              </div>
              <p className="text-sm font-semibold text-violet-300/90 mt-1 flex items-center gap-2">
                <Mail size={16} className="text-violet-400" />
                {candidateProfile.email || "No email available"}
              </p>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold capitalize ${getStatusColor(candidateProfile.status)}`}>
                {getStatusIcon(candidateProfile.status)}
                <span>{candidateProfile.status || "Active"}</span>
              </div>
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold ${candidateProfile.isBlocked ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}`}>
                <ShieldCheck size={15} />
                <span>{candidateProfile.isBlocked ? "Restricted" : "Account Active"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN DETAILS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Resume Document Card */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-violet-400" size={20} />
                <h2 className="text-base font-bold text-white">Attached Resume</h2>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono">CV FILE</span>
            </div>

            {candidateProfile.resume ? (
              <a
                href={candidateProfile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-violet-950/30 hover:bg-violet-900/30 border border-violet-800/40 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-violet-400" size={22} />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-violet-300">View Uploaded Resume</div>
                    <div className="text-[10px] text-zinc-400">PDF / Document File</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-violet-400 group-hover:underline">Open →</span>
              </a>
            ) : (
              <p className="text-xs text-zinc-500 italic p-4 border border-zinc-800/80 rounded-2xl text-center">No resume attached to this profile</p>
            )}
          </div>

          {/* Member Since Card */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-violet-400" size={20} />
                <h2 className="text-base font-bold text-white">Account Info</h2>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono">ONBOARDED</span>
            </div>

            <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Registered Since</div>
                <div className="text-lg font-black text-white">
                  {candidateProfile.createdAt
                    ? new Date(candidateProfile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                    : "N/A"}
                </div>
              </div>
              <Award className="text-violet-400" size={28} />
            </div>
          </div>
        </div>

        {/* View-Only Security Notice */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-4 text-xs text-zinc-400">
          <Eye className="text-violet-400 shrink-0" size={20} />
          <div>
            <span className="font-extrabold text-white">Candidate Account Managed: </span>
            Your candidate details are managed directly by your delegating corporate employer. Contact platform support for updates.
          </div>
        </div>

      </main>
    </div>
  );
}

export default CandidateProfile;