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
import { RiseLoader, SyncLoader } from "react-spinners";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";
import { StatusCodes } from "@/constants/statusCodes";

import { SelectField } from "@/components/ui/SelectField";
import { convertBlobUrlToFile } from "@/utils/fileConversion";
import { useAuthStore } from "@/features/auth/authStore";

function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState<ICompanyProfile>(
    {} as ICompanyProfile
  );

  const [logoPreview, setLogoPreview] = useState<string | null>("");

  const { companyProfile, loading } = useFetchCompanyProfile();
  const { updateCompanyProfile, loading: updateLoading } =
    useUpadteCompanyProfile();
  const { logout } = useAuthStore();

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
    console.log("handle save", companyData);
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
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-violet-950 text-white flex">
      {/* Main Section */}
      <main className="flex-1 p-6 overflow-y-auto ml-60">
        {loading ? (
          <RiseLoader className="m-auto" color="white" />
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="h-48 bg-gradient-to-bl from-violet-950 via-violet-900 to-black relative">
                <div className="absolute -bottom-16 left-8 w-40 h-36 rounded-2xl border-4 border-gray-900 overflow-hidden bg-gray-700 flex items-center justify-center z-10">
                  {logoPreview ? (
                    <NextImage
                      src={logoPreview}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                      width={160}
                      height={144}
                    />
                  ) : (
                    <ImageIcon className="text-gray-400 w-10 h-10" />
                  )}
                  {isEditing && !companyData?.companyLogo && (
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
                  {isEditing && companyData?.companyLogo && (
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <label className="flex items-center justify-center gap-1 font-semibold bg-violet-600 hover:bg-violet-700 px-1 rounded-lg cursor-pointer transition-colors text-base bottom-2 absolute">
                        <Upload size={12} />
                        <p className="text-[10px]"> Upload New Logo</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-20 pb-6 px-8 bg-gray-900/60 backdrop-blur-xl rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {companyData.companyName}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                      Manage your company&apos;s information and branding
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {companyData?.status === "approved" && (
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
                            <SyncLoader color="white" size={12} />
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
                  value={companyData.companyName}
                  name="companyName"
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
                  value={companyData.numberOfEmployees || ""}
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
                  value={companyData.linkedInProfile || ""}
                  name="linkedInProfile"
                  isEditing={isEditing}
                  handleChange={handleChange}
                />
                <InputField
                  icon={MapPin}
                  label="Headquarters"
                  placeholder="Enter location"
                  value={companyData.headquartersLocation || ""}
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default withProtectedRoute(CompanyProfilePage, [Roles.COMPANY]);
