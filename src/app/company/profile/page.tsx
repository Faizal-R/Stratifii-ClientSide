"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Building2,
  Mail,
  Globe,
  FileCheck2,
  Linkedin,
  Phone,
  Building,
  Edit2,
  Save,
  Upload,
  FileText,
  Users,
  MapPin,
  CreditCard,
  Crown,
  CheckCircle2,
  X
} from "lucide-react";
import { InputField } from "@/components/ui/FormFields/InputField";
import {
  useFetchCompanyProfile,
  useUpdateCompanyProfile,
} from "@/hooks/api/useCompany";
import {
  CompanyProfileSchema,
  ICompanyProfile,
} from "@/validations/CompanySchema";

import { RiseLoader, SyncLoader } from "react-spinners";
import { StatusCodes } from "@/constants/enums/statusCodes";

import { SelectField } from "@/components/ui/FormFields/SelectField";
import { convertBlobUrlToFile } from "@/utils/fileConversion";
import { useAuthStore } from "@/features/auth/authStore";

import { useGetSubscriptionDetails } from "@/hooks/api/useSubscription";
import { ISubscriptionDetails } from "@/types/ISubscription";
import { errorToast, successToast } from "@/utils/customToast";
import SubscriptionPlanDetailsCard from "@/components/reusable/cards/subscription-card/SubscriptionPlanDetailsCard";
import CompanyResubmissionPage from "@/components/features/company/CompanyResubmissionForm";

type CompanyTab = "general" | "subscription";

function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState<CompanyTab>("general");
  const [isEditing, setIsEditing] = useState(false);
  const { user, logout } = useAuthStore();
  const [subscription, setSubscription] = useState<ISubscriptionDetails | null>(null);
  const [companyData, setCompanyData] = useState<ICompanyProfile>({} as ICompanyProfile);
  const [logoPreview, setLogoPreview] = useState<string | null>("");

  const { companyProfile, loading } = useFetchCompanyProfile();
  const { updateCompanyProfile, loading: updateLoading } = useUpdateCompanyProfile();
  const { getSubscriptionDetails, loading: subscriptionLoading } = useGetSubscriptionDetails();

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setLogoPreview(companyData.companyLogo ? companyData.companyLogo : null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const validatedCompany = CompanyProfileSchema.safeParse(companyData);
    if (!validatedCompany.success) {
      for (const issue of validatedCompany.error.issues) {
        errorToast(issue.message);
      }
      return;
    }

    const formData = new FormData();
    formData.append("company", JSON.stringify(companyData));

    if (logoPreview) {
      const file = await convertBlobUrlToFile(logoPreview);
      formData.append("companyLogo", file!);
    }

    const response = await updateCompanyProfile(formData);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    setIsEditing(false);
  };

  const fetchCompanyProfile = useCallback(async () => {
    const response = await companyProfile();
    if (!response.success) {
      errorToast(response.message);
      if (response.status === StatusCodes.FORBIDDEN) {
        logout();
      }
    } else {
      setLogoPreview(response.data.companyLogo);
      setCompanyData(response.data);
    }
  }, [companyProfile, logout]);

  const fetchSubscriptionDetails = async () => {
    const response = await getSubscriptionDetails();
    if (response.success) {
      setSubscription(response.data);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, [fetchCompanyProfile]);

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const companySizeOptions = ["Small", "Medium", "Startup", "Enterprise"];

  return loading ? (
    <div className="h-screen flex items-center justify-center bg-black">
      <RiseLoader color="#8b5cf6" />
    </div>
  ) : user?.status === "rejected" ? (
    <CompanyResubmissionPage company={companyData} />
  ) : (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-violet-500/30 pb-16">
      
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[170px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 md:px-8 pt-6 max-w-6xl space-y-6">

        {/* --- PREMIUM BRAND HEADER CARD --- */}
        <div className="rounded-3xl border border-zinc-800/90 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Logo & Company Details */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-violet-500/40 overflow-hidden bg-zinc-900 shadow-xl flex items-center justify-center shrink-0 group">
                {logoPreview ? (
                  <div className="relative w-full h-full">
                    <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
                    {isEditing && (
                      <label className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                        <Upload className="w-5 h-5 mb-1 text-violet-400" />
                        <span className="text-[10px] font-bold">Upload</span>
                        <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                      </label>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <Building2 size={36} />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {companyData.name || "Company Profile"}
                  </h1>
                  {companyData.status === "approved" && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 size={14} /> Verified Organization
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Globe size={14} className="text-violet-400" />
                  {companyData.companyWebsite || "https://company.com"}
                </p>

                <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1"><Users size={13} className="text-violet-400" /> {companyData.numberOfEmployees || 0} Employees</span>
                  <span className="flex items-center gap-1"><Building size={13} className="text-violet-400" /> {companyData.companySize || "Enterprise Tier"}</span>
                </div>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {updateLoading ? <SyncLoader color="white" size={6} /> : <><Save size={14} /> Save Profile</>}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- NAVIGATION TABS BAR --- */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 w-fit">
          {[
            { id: "general", label: "Company Information", icon: Building },
            { id: "subscription", label: "Subscription Quota", icon: Crown }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CompanyTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon size={15} className={isActive ? "text-white" : "text-amber-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* --- TAB CONTENT 1: GENERAL COMPANY INFORMATION --- */}
        {activeTab === "general" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Company Essentials */}
              <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Building className="text-violet-400" size={20} />
                    <h2 className="text-base font-bold text-white">Company Identity</h2>
                  </div>
                </div>

                <InputField
                  icon={Building}
                  label="Official Company Name"
                  placeholder="Enter corporate name"
                  value={companyData.name || ""}
                  name="name"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Globe}
                  label="Corporate Website URL"
                  placeholder="https://company.com"
                  value={companyData.companyWebsite || ""}
                  name="companyWebsite"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={FileCheck2}
                  label="Registration Certificate Number"
                  placeholder="Enter reg number"
                  value={companyData.registrationCertificateNumber || ""}
                  name="registrationCertificateNumber"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Users}
                  label="Total Employee Count"
                  placeholder="e.g. 200"
                  value={companyData.numberOfEmployees! || ""}
                  name="numberOfEmployees"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
              </div>

              {/* Card 2: Contact & Location */}
              <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-violet-400" size={20} />
                    <h2 className="text-base font-bold text-white">Contact & Headquarters</h2>
                  </div>
                </div>

                <InputField
                  icon={Mail}
                  label="Corporate Email Address"
                  placeholder="corporate@company.com"
                  value={companyData.email || ""}
                  name="email"
                  isEditing={isEditing}
                  handleChange={handleChange}
                  disabled={true}
                />
                <InputField
                  icon={Phone}
                  label="Official Contact Phone"
                  placeholder="Enter phone number"
                  value={companyData.phone || ""}
                  name="phone"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Linkedin}
                  label="LinkedIn Company Page"
                  placeholder="https://linkedin.com/company/name"
                  value={companyData.linkedInProfile! || ""}
                  name="linkedInProfile"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={MapPin}
                  label="Headquarters Location"
                  placeholder="e.g. San Francisco, CA"
                  value={companyData.headquartersLocation! || ""}
                  name="headquartersLocation"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
              </div>
            </div>

            {/* Branding & Scale Section */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-violet-400" size={20} />
                  <h2 className="text-base font-bold text-white">Branding & Organization Category</h2>
                </div>
              </div>

              <InputField
                icon={FileText}
                label="Company Overview Description"
                placeholder="Describe your tech stack, hiring focus, and engineering mission..."
                value={companyData.description! || ""}
                name="description"
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <SelectField
                icon={Building2}
                label="Company Scale Classification"
                value={companyData.companySize! || ""}
                name="companySize"
                options={companySizeOptions}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </div>
          </>
        )}

        {/* --- TAB CONTENT 2: SUBSCRIPTION QUOTA --- */}
        {activeTab === "subscription" && (
          <div className="p-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Crown className="text-amber-400" size={22} />
                <h2 className="text-lg font-extrabold text-white">Active Subscription Plan & Candidate Evaluation Quota</h2>
              </div>
            </div>

            {subscriptionLoading ? (
              <div className="flex items-center justify-center py-12">
                <RiseLoader color="#8b5cf6" />
              </div>
            ) : subscription ? (
              <SubscriptionPlanDetailsCard subscription={subscription!} />
            ) : (
              <div className="p-8 text-center border border-zinc-800/80 rounded-2xl space-y-3 max-w-md mx-auto">
                <CreditCard className="w-8 h-8 text-zinc-600 mx-auto" />
                <div className="text-xs font-bold text-zinc-300">No Active Delegation Quota</div>
                <button 
                  onClick={() => window.location.href = '/#pricing'} 
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  View Subscription Plans
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default CompanyProfilePage;
