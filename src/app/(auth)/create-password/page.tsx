"use client";
import React, { useState } from "react";
import {
  Upload,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CrossIcon,
  Trash2,
} from "lucide-react";

import { useSetupCandidateProfile } from "@/hooks/useCandidate";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function CandidatePasswordCreation() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    photo: null as File | null,
    photoPreview: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    photo: "",
  });
  const { setupCandidatProfile, loading } = useSetupCandidateProfile();

  const validatePasswordStep = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
      photo: "",
    };

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({ ...errors, photo: "Photo size should be less than 5MB" });
        return;
      }

      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
      setErrors({ ...errors, photo: "" });
    }
  };

  const handleNext = () => {
    if (step === 1 && validatePasswordStep()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      if (!formData.photo) {
        setErrors({ ...errors, photo: "Please upload a photo" });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("candidatePassword", formData.password);
      formDataToSend.append(
        "candidateConfirmPassword",
        formData.confirmPassword
      );
      formDataToSend.append("candidateAvatar", formData.photo!);
      formDataToSend.append("token", token!);
      try {
        const resposne = await setupCandidatProfile(formDataToSend);
        if (!resposne.success) {
          toast.error(resposne.error, {
            className: "custom-error-toast",
          });
          return
        }
        toast.success(resposne.message);
        
        router.push("/signin");
      } catch (error) {}
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="border border-violet-900 bg rounded-lg w-full max-w-md p-8 bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90   border-violet-500/20 shadow-lg shadow-violet-800/10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-violet-300">
              {step === 1 ? "Set Your Password" : "Upload Photo"}
            </h2>
            <span className="text-sm text-gray-500">Step {step} of 2</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-4 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full bg-black/80 border border-violet-900/50 text-white pl-4 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                {formData.photoPreview ? (
                  <div className="relative">
                    <img
                      src={formData.photoPreview}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          photo: null,
                          photoPreview: "",
                        })
                      }
                      className="absolute -top-2 right-1 bg-red-500 text-white p-1 hover:bg-red-600 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <Upload size={32} className="text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  name="candidateAvatar"
                />
                <label
                  htmlFor="photo"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  Upload Passport Photo
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Please upload a passport-size photo (max 5MB)
                </p>
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back
              </button>
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
                <ArrowRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CandidatePasswordCreation;
