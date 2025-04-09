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
  Image as ImageIcon,
  Upload,
  FileText,
  Users,
  MapPin,
} from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import NextImage from "next/image";
import {
  useFetchCompanyProfile,
  useUpadteCompanyProfile,
} from "@/hooks/useCompany";
import {
  CompanyProfileSchema,
  ICompanyProfile,
} from "@/validations/CompanySchema";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";
import { StatusCodes } from "@/constants/statusCodes";
import { useAuthStore } from "@/stores/authStore";
import { SelectField } from "@/components/ui/SelectField";
import { convertBlobUrlToFile } from "@/utils/fileConversion";

function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState<ICompanyProfile>(
    {} as ICompanyProfile
  );
  const [logoPreview, setLogoPreview] = useState<string | null>("");

  const { logout } = useAuthStore();

  const { companyProfile, loading } = useFetchCompanyProfile();
  const { updateCompanyProfile } = useUpadteCompanyProfile();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLogoPreview(null);
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
      console.log(errors);
      for (const issue of errors.issues) {
        toast.error(issue.message, {
          className: "custom-error-toast",
        });
      }

     
      return;
    }
    const formData = new FormData();
    if (logoPreview) {
      const file = await convertBlobUrlToFile(logoPreview);
      console.log("file: " + file);
      formData.append("companyLogo", file!);
      formData.append("company", JSON.stringify(companyData));
      setCompanyData((prev) => ({ ...prev, ...formData }));
    }
    const response = await updateCompanyProfile(formData);
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    } else {
      toast.success(response.message);
      setIsEditing(false);
    }
  };

  const fetchCompanyProfile = useCallback(async () => {
    const response = await companyProfile();
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      if (response.status === StatusCodes.FORBIDDEN) {
        logout();
      }
    } else {
      setLogoPreview(response.data.companyLogo);
      setCompanyData(response.data);
    }
  }, [companyProfile, logout]);
  useEffect(() => {
    fetchCompanyProfile();
  }, [fetchCompanyProfile]);

  const companySizeOptions = ["Small", "Medium", "Startup", "Enterprise"];
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white flex">
      {/* Main Content */}
      {loading ? (
        <RiseLoader className="m-auto" color="white" />
      ) : (
        <div className="flex-1 p-4 ml-64">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800">
              {/* Header with Logo Upload */}
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                {/* Logo Section */}
                <div className="w-full md:w-1/3">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-48 h-48 rounded-xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center mb-4 overflow-hidden">
                      {logoPreview ? (
                        <NextImage
                          src={logoPreview}
                          alt="Company Logo"
                          className="w-full h-full object-cover"
                          width={400}
                          height={400}
                        />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon
                            className="w-12 h-12 mx-auto mb-2 text-gray-500"
                            alt-text=""
                          />
                          <p className="text-sm text-gray-400">
                            No logo uploaded
                          </p>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <div className="w-full">
                        <label className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                          <Upload size={18} />
                          Upload Logo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Recommended: 400x400px, Max 2MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Building2 className="text-violet-500" size={32} />
                        Company Profile
                      </h1>
                      <p className="text-gray-400 mt-2">
                        Manage your company &apos;s information and branding
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {companyData?.status === "approved" && (
                        <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          <Check size={16} />
                          Verified
                        </span>
                      )}
                      {!isEditing ? (
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-5 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                          <span className="text-sm">Edit Profile</span>
                        </button>
                      ) : (
                        <div className="flex gap-3">
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition-colors"
                          >
                            <X size={18} />
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-1 rounded-lg transition-colors"
                          >
                            <Save size={18} />
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputField
                  icon={Building}
                  label="Company Name"
                  placeholder="Enter company name"
                  value={companyData.companyName}
                  name="companyName"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Mail}
                  label="Email Address"
                  placeholder="Enter email address"
                  value={companyData.email}
                  name="email"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Globe}
                  label="Company Website"
                  placeholder="Enter company website"
                  value={companyData.companyWebsite}
                  name="companyWebsite"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={FileCheck2}
                  label="Registration Number"
                  placeholder="Enter registration number"
                  value={companyData.registrationCertificateNumber}
                  name="registrationCertificateNumber"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Linkedin}
                  label="LinkedIn Profile"
                  placeholder="Enter LinkedIn profile URL"
                  value={companyData.linkedInProfile!}
                  name="linkedInProfile"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={Phone}
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={companyData.phone}
                  name="phone"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <div className="col-span-2">
                  <InputField
                    icon={FileText}
                    label="Company Description"
                    placeholder="Company description is not specified"
                    value={companyData.description || ""}
                    name="description"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <SelectField
                    icon={Building2}
                    label="Company Size"
                    value={companyData.companySize || ""}
                    name="companySize"
                    options={companySizeOptions}
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={Users}
                    label="Number of Employees"
                    placeholder="Number of Employees are not specified"
                    value={companyData.numberOfEmployees || ""}
                    name="numberOfEmployees"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                  <InputField
                    icon={MapPin}
                    label="Headquarters Location"
                    placeholder="headquarters Location are not specified"
                    value={companyData.headquartersLocation || ""}
                    name="headquartersLocation"
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default withProtectedRoute(CompanyProfilePage, [Roles.COMPANY]);
