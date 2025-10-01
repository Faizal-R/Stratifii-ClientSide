"use client";

import React, { useState, useEffect } from "react";
import { X, User, Building2, Mail, Phone, Globe, FileText, Star, ExternalLink, Download, Eye, Briefcase, Clock, TrendingUp, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ICompany } from "@/validations/CompanySchema";

import { IInterviewerProfile } from "@/validations/InterviewerSchema";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ICompany | IInterviewerProfile;
  isCompany: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  isCompany,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  // Organize details into tabs
  let overviewDetails: { label: string; value: string | number; icon: React.ReactNode }[] = [];
  let contactDetails: { label: string; value: string | number; icon: React.ReactNode }[] = [];
  let professionalDetails: { label: string; value: string | number; icon: React.ReactNode }[] = [];

  if (isCompany) {
    const companyUser = user as ICompany;

    overviewDetails = [
      { label: "Company Name", value: companyUser.name, icon: <Building2 className="w-4 h-4" /> },
      { label: "Company Type", value: companyUser.companyType || "Not specified", icon: <Briefcase className="w-4 h-4" /> },
      { label: "Description", value: companyUser.description || "No description provided", icon: <FileText className="w-4 h-4" /> },
    ];

    contactDetails = [
      { label: "Email", value: companyUser.email, icon: <Mail className="w-4 h-4" /> },
      { label: "Phone", value: companyUser.phone || "Not provided", icon: <Phone className="w-4 h-4" /> },
      { label: "Website", value: companyUser.companyWebsite || "Not provided", icon: <Globe className="w-4 h-4" /> },
      { label: "LinkedIn", value: companyUser.linkedInProfile || "Not provided", icon: <ExternalLink className="w-4 h-4" /> },
    ];

    professionalDetails = [
      { label: "Registration Number", value: companyUser.registrationCertificateNumber || "Not provided", icon: <Shield className="w-4 h-4" /> },
      { label: "Verification Status", value: "Verified Company", icon: <CheckCircle className="w-4 h-4" /> },
    ];
  } else {
    const interviewerUser = user as IInterviewerProfile;

    overviewDetails = [
      { label: "Full Name", value: interviewerUser.name, icon: <User className="w-4 h-4" /> },
      { label: "Current Position", value: interviewerUser.position || "Not specified", icon: <Briefcase className="w-4 h-4" /> },
      { label: "Experience", value: `${interviewerUser.experience || 0} years`, icon: <Clock className="w-4 h-4" /> },
      { label: "Status", value: interviewerUser.isVerified ? "Verified Interviewer" : "Pending Verification", icon: <CheckCircle className="w-4 h-4" /> },
    ];

    contactDetails = [
      { label: "Email", value: interviewerUser.email, icon: <Mail className="w-4 h-4" /> },
      { label: "Phone", value: interviewerUser.phone || "Not provided", icon: <Phone className="w-4 h-4" /> },
      { label: "LinkedIn", value: interviewerUser.linkedinProfile || "Not provided", icon: <ExternalLink className="w-4 h-4" /> },
    ];

    const expertiseList = Array.isArray(interviewerUser.expertise) && interviewerUser.expertise.length > 0
      ? interviewerUser.expertise.map(exp => `${exp.skill} (${exp.proficiencyLevel}${exp.yearsOfExperience ? `, ${exp.yearsOfExperience} yrs` : ""})`).join(", ")
      : "No expertise listed";

    professionalDetails = [
      { label: "Technical Skills", value: expertiseList, icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Resume", value: (interviewerUser.resume as string) || "Not provided", icon: <FileText className="w-4 h-4" /> },
    ];
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
    { id: "professional", label: "Professional", icon: <Briefcase className="w-4 h-4" /> },
  ];

  const getCurrentDetails = () => {
    switch (activeTab) {
      case "overview": return overviewDetails;
      case "contact": return contactDetails;
      case "professional": return professionalDetails;
      default: return overviewDetails;
    }
  };

  const renderDetailValue = (detail: any) => {
    if (detail.label === "Website" || detail.label === "LinkedIn") {
      return detail.value !== "Not provided" ? (
        <Link
          href={typeof detail.value === "string" ? detail.value : ""}
          target="_blank"
          className="text-violet-400 hover:text-violet-300 hover:underline transition-colors duration-200 flex items-center gap-2 group"
        >
          <span className="break-all">{detail.value}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </Link>
      ) : (
        <span className="text-gray-500 italic">{detail.value}</span>
      );
    }

    if (detail.label === "Resume") {
      return detail.value !== "Not provided" ? (
        <div className="flex flex-wrap gap-2">
          <a
            href={detail.value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-700 text-white text-xs px-3 py-2 rounded-lg hover:from-violet-500 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
          >
            <Eye className="w-3 h-3" />
            View Resume
          </a>
          <a
            href={detail.value as string}
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs px-3 py-2 rounded-lg hover:from-emerald-500 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
          >
            <Download className="w-3 h-3" />
            Download
          </a>
        </div>
      ) : (
        <span className="text-gray-500 italic">Not provided</span>
      );
    }

    return (
      <span className={`${detail.value === "Not provided" || detail.value === "Not specified" || detail.value === "No description provided" || detail.value === "No expertise listed" ? "text-gray-500 italic" : "text-gray-100"} break-words`}>
        {detail.value}
      </span>
    );
  };

  return (
    <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 pb-6  transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 w-full max-w-4xl max-h-[90vh] overflow-hidden transition-all duration-300 ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10"></div>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-violet-500/20 gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                  {isCompany ? (
                    <Building2 className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {isCompany ? (user as ICompany).name : (user as IInterviewerProfile).name}
                </h2>
                <p className="text-violet-200/80 text-sm sm:text-base">
                  {isCompany ? "Company Profile" : "Professional Interviewer"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-300">4.9</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-gray-300">Verified</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-violet-300 hover:text-white hover:bg-violet-500/20 rounded-lg p-2 transition-all duration-200 hover:rotate-90 self-start sm:self-center"
            >
              <X size={20} className="transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-transparent">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-violet-300 border-violet-400 bg-violet-500/10"
                    : "text-gray-400 border-transparent hover:text-violet-300 hover:bg-violet-500/5"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 gap-6">
            {getCurrentDetails().map((detail) => (
              <div 
                key={detail.label} 
                className="group hover:bg-violet-500/5 rounded-lg p-4 -m-2 transition-all duration-200 border border-transparent hover:border-violet-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-lg flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-200">
                    {detail.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <dt className="text-sm font-semibold text-violet-300 mb-2 uppercase tracking-wide">
                      {detail.label}
                    </dt>
                    <dd className="text-sm leading-relaxed">
                      {renderDetailValue(detail)}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-3 border-t border-violet-500/20 bg-gradient-to-r from-transparent to-violet-500/5 gap-4 ">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              Profile Verified
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg hover:from-violet-500 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-violet-500/25 font-medium flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              Contact
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;