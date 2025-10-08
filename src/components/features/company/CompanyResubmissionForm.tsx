"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Buttons/button";
import {
  AlertTriangle,
  Briefcase,
  Linkedin,
  User2,
  BookOpen,
  Clock,
  Mail,
} from "lucide-react";
import { ICompanyProfile } from "@/validations/CompanySchema";
import { useUpdateCompanyProfile } from "@/hooks/api/useCompany";
import { errorToast, successToast } from "@/utils/customToast";
import { AuthUser, useAuthStore } from "@/features/auth/authStore";

const CompanyResubmissionPage: React.FC<{ company: ICompanyProfile }> = ({
  company,
}) => {
  const { setUser, user } = useAuthStore();
  const rejectionReason =
    "Your company profile did not meet our verification standards.";
  const { updateCompanyProfile, loading } = useUpdateCompanyProfile();
  const resubmissionPeriod = company.resubmissionPeriod
    ? new Date(company.resubmissionPeriod)
    : null;

  const [canResubmit, setCanResubmit] = useState(false);

  const [formData, setFormData] = useState({
    name: company.name || "",
    companyWebsite: company.companyWebsite || "",
    registrationCertificateNumber: company.registrationCertificateNumber || "",
    linkedInProfile: company.linkedInProfile || "",
    phone: company.phone || "",
    resubmissionNote: "",
  });

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataForBackend = new FormData();
    console.log("formData",formData)
    formDataForBackend.append(
      "company",
      JSON.stringify({
        ...formData,
        status: "pending",
        email: company.email,
        resubmissionPeriod: company.resubmissionPeriod || null,
        resubmissionCount: company.resubmissonCount || 0,

      })
    );
   
    const response = await updateCompanyProfile(formDataForBackend);

    if (!response.success) {
      errorToast(response.message);
      return;
    }
    setUser({
      ...user,
      status: "pending",
    } as AuthUser);
    successToast("Resubmission submitted successfully ✅");
  };

  // Cooldown check
  useEffect(() => {
    if (resubmissionPeriod) {
      const now = new Date();
      setCanResubmit(now >= resubmissionPeriod);
    } else {
      setCanResubmit(true);
    }
  }, [resubmissionPeriod]);

  return (
    <div className="flex items-start justify-center bg-gradient-to-br from-red-950 via-black to-red-900 px-6 py-7">
      <Card className="w-full max-w-3xl bg-black/60 backdrop-blur-xl border-red-500/40 shadow-2xl rounded-2xl p-6 md:p-8">
        {/* Header */}
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 shadow-md">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-red-400 text-2xl font-bold">
            Application Rejected
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Unfortunately, your company application has been rejected.
          </p>
          {rejectionReason && (
            <p className="text-xs text-red-300 italic">
              Reason: {rejectionReason}
            </p>
          )}
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {!canResubmit ? (
            <p className="text-center text-gray-400 text-sm">
              You will be able to resubmit after your cooldown period.
            </p>
          ) : (
            <form onSubmit={handleResubmission} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={company.email}
                    onChange={onHandleChange}
                    disabled
                    className="w-full bg-gray-800 text-gray-400 pl-10 pr-3 py-2.5 rounded-lg cursor-not-allowed"
                    placeholder="Email"
                  />
                </div>

                {/* Company Name */}
                <div className="relative">
                  <User2
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onHandleChange}
                    className="w-full bg-black/70 border border-violet-900/50 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                    placeholder="Company Name"
                  />
                </div>

                {/* Registration Certificate */}
                <div className="relative">
                  <BookOpen
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="text"
                    name="registrationCertificateNumber"
                    value={formData.registrationCertificateNumber}
                    onChange={onHandleChange}
                    className="w-full bg-black/70 border border-violet-900/50 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                    placeholder="Registration Certificate Number"
                  />
                </div>

                {/* LinkedIn */}
                <div className="relative">
                  <Linkedin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="url"
                    name="linkedInProfile"
                    value={formData.linkedInProfile}
                    onChange={onHandleChange}
                    className="w-full bg-black/70 border border-violet-900/50 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                    placeholder="LinkedIn Profile"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onHandleChange}
                    className="w-full bg-black/70 border border-violet-900/50 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                    placeholder="Phone Number"
                  />
                </div>

                {/* Company Website */}
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={18}
                  />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={onHandleChange}
                    className="w-full bg-black/70 border border-violet-900/50 text-white pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                    placeholder="Company Website"
                  />
                </div>
              </div>

              {/* Resubmission Note */}
              <div>
                <h3 className="text-md font-semibold text-white mb-1">
                  Resubmission Note
                </h3>
                <textarea
                  name="resubmissionNote"
                  value={formData.resubmissionNote}
                  onChange={onHandleChange}
                  placeholder="Explain what you updated or corrected..."
                  required
                  className="w-full mt-1 p-3 rounded-lg bg-black/60 border border-violet-500/30 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition text-sm"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-1/2 bg-gradient-to-r from-violet-700 to-purple-800 text-white py-2.5 rounded-lg font-semibold hover:from-violet-800 hover:to-purple-900 transition duration-200 text-sm"
                  disabled={loading}
                >
                  Resubmit Application
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyResubmissionPage;
