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
  Check,
  X,
  Edit2,
  Save,
  
  Upload,
  FileText,
  Users,
  MapPin,
  CreditCard,
  Crown,
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

import { RiseLoader } from "react-spinners";
import { StatusCodes } from "@/constants/enums/statusCodes";

import { SelectField } from "@/components/ui/FormFields/SelectField";
import { convertBlobUrlToFile } from "@/utils/fileConversion";
import { useAuthStore } from "@/features/auth/authStore";

import { useGetSubscriptionDetails } from "@/hooks/api/useSubscription";
import { ISubscriptionDetails } from "@/types/ISubscription";
import { errorToast, successToast } from "@/utils/customToast";
import TabsNav from "@/components/reusable/tabsNav/TabsNav";
import SubscriptionPlanDetailsCard from "@/components/reusable/cards/subscription-card/SubscriptionPlanDetailsCard";
import CompanyResubmissionPage from "@/components/features/company/CompanyResubmissionForm";

function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const {user}=useAuthStore()
  const [subscription, setSubscription] = useState<ISubscriptionDetails | null>(
    null
  );
  const tabs = [
    {
      key: "profile",
      label: "Company Profile",
      icon: <Building className="w-4 h-4" />,
    },
    {
      key: "subscription",
      label: "Subscription",
      icon: <Crown className="w-4 h-4" />,
      show: subscription?.status === "active",
    },
  ];
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">(
    "profile"
  );
  const [companyData, setCompanyData] = useState<ICompanyProfile>(
    {} as ICompanyProfile
  );
  const [logoPreview, setLogoPreview] = useState<string | null>("");

  const { companyProfile, loading } = useFetchCompanyProfile();
  const { updateCompanyProfile, loading: updateLoading } =
    useUpdateCompanyProfile();
  const { logout } = useAuthStore();
  const { getSubscriptionDetails, loading: subscriptionLoading } =
    useGetSubscriptionDetails();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLogoPreview(companyData.companyLogo ? companyData.companyLogo : null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
   
    if (file) {
      const imageFile = URL.createObjectURL(file);
      setLogoPreview(imageFile);
    }
  };

  const handleSave = async () => {
    const validatedCompany = CompanyProfileSchema.safeParse(companyData);
    if (!validatedCompany.success) {
      const errors = validatedCompany.error;
      for (const issue of errors.issues) {
        errorToast(issue.message);
      }
      return;
    }

    const formData = new FormData();

    // Always append the company JSON
    formData.append("company", JSON.stringify(companyData));

    // Append logo if available
    if (logoPreview) {
      const file = await convertBlobUrlToFile(logoPreview);
      formData.append("companyLogo", file!);
    }

    const response = await updateCompanyProfile(formData);
    if (!response.success) {
      errorToast(response.message);
      return;
    } else {
      successToast(response.message);
      setIsEditing(false);
    }
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
    // if (!response.success) {
    //   errorToast(response.error, {
    //     className: "custom-error-toast",
    //   });
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
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) :user?.status==="rejected"? (
  <CompanyResubmissionPage company={companyData}/>
  ):(
      <div className="min-h-screen custom-64 bg-gradient-to-br from-gray-950 via-black to-violet-950 text-white">
      {/* Navigation Tabs */}
      <TabsNav
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as "profile" | "subscription")}
        tabs={tabs}
      />

      {/* Main Content */}
      <main className="p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {activeTab === "profile" ? (
            <>
              {/* Profile Header */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="h-48 bg-gradient-to-bl from-violet-950 via-violet-900 to-black relative">
                  <div className="absolute -bottom-16 left-8 w-40 h-36 rounded-2xl border-4 border-gray-900 overflow-hidden bg-gray-700 flex items-center justify-center z-10">
                    {logoPreview ? (
                      <img
                        src={logoPreview!}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="text-gray-400 w-10 h-10" />
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <label className="flex items-center justify-center gap-1 font-semibold bg-violet-600 hover:bg-violet-700 px-2 py-1 rounded-lg cursor-pointer transition-colors text-xs">
                          <Upload size={12} />
                          Upload Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-20 pb-6 px-8 bg-gray-900/60 backdrop-blur-xl rounded-b-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{companyData.name}</h1>
                      <p className="text-sm text-gray-400 mt-1">
                        Manage your company's information and branding
                      </p>
                    </div>
                    <div className="flex gap-4">
                      {companyData.status === "approved" && (
                        <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          <Check size={16} />
                          Verified
                        </span>
                      )}
                      {!isEditing ? (
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
                        >
                          <Edit2 size={18} />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-3">
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
                          >
                            <X size={18} />
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
                          >
                            {updateLoading ? (
                              <RiseLoader color="#ffffff" size={8} />
                            ) : (
                              <>
                                <Save size={18} />
                                Save
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
                  <InputField
                    icon={Building}
                    label="Company Name"
                    placeholder="Enter company name"
                    value={companyData.name}
                    name="name"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={Globe}
                    label="Company Website"
                    placeholder="Enter website"
                    value={companyData.companyWebsite}
                    name="companyWebsite"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={FileCheck2}
                    label="Registration No."
                    placeholder="Enter reg. number"
                    value={companyData.registrationCertificateNumber}
                    name="registrationCertificateNumber"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={Users}
                    label="Employees"
                    placeholder="Total employees"
                    value={companyData.numberOfEmployees!}
                    name="numberOfEmployees"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                </div>

                <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
                  <InputField
                    icon={Mail}
                    label="Email"
                    placeholder="Enter email"
                    value={companyData.email}
                    name="email"
                    isEditing={isEditing}
                    handleChange={handleChange}
                    disabled={true}
                  />
                  <InputField
                    icon={Phone}
                    label="Phone"
                    placeholder="Enter phone"
                    value={companyData.phone}
                    name="phone"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={Linkedin}
                    label="LinkedIn"
                    placeholder="Enter LinkedIn URL"
                    value={companyData.linkedInProfile!}
                    name="linkedInProfile"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={MapPin}
                    label="Headquarters"
                    placeholder="Enter location"
                    value={companyData.headquartersLocation!}
                    name="headquartersLocation"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                </div>
              </div>

              {/* Company Description & Size */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 space-y-6">
                <InputField
                  icon={FileText}
                  label="Company Description"
                  placeholder="Describe your company..."
                  value={companyData.description!}
                  name="description"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <SelectField
                  icon={Building2}
                  label="Company Size"
                  value={companyData.companySize!}
                  name="companySize"
                  options={companySizeOptions}
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
              </div>
            </>
          ) : (
            /* Subscription Tab */
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                  Subscription Details
                </h1>
                <p className="text-gray-400">
                  Your subscription plan and billing details
                </p>
              </div>

              {subscriptionLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                </div>
              ) : subscription ? (
                <SubscriptionPlanDetailsCard subscription={subscription!} />
              ) : (
                <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    No Active Subscription
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Choose a plan to get started with premium features
                  </p>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors">
                    View Plans
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
export default CompanyProfilePage;
