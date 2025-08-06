"use client";
import { ChangeEvent, useState } from "react";
import {
  Mail,
  Lock,
  BrainCog,
  Video,
  Target,
  Laptop2,
  Building2,
  Globe,
  FileText,
  Linkedin,
  Phone,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useCompanyRegister } from "@/hooks/api/useAuth";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import{useRouter} from 'next/navigation'
import { CompanyRegistrationSchema } from "@/validations/CompanySchema";
import { handleCompanyRegistrationStep } from "@/utils/handleRegistrationStep";

function CompanyRegistrationPage() {
    const router=useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyWebsite: "",
    registrationCertificateNumber: "",
    linkedInProfile: "",
    phone: "",
    password: "",
    companyType: "",
    confirmPassword:'',
  });
  const [registrationStep, setRegistrationStep] = useState(1);

  const { loading, registerCompany } = useCompanyRegister();

  const onHandleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
     const validatedCompany=CompanyRegistrationSchema.safeParse({...formData,status: "pending"  });
      if(!validatedCompany.success){
      const errors = validatedCompany.error;
      for (const issue of errors.issues) {
        toast.error(issue.message,{
          className:'custom-error-toast'
        });
        return;
      }
    }
    if(formData.password!==formData.confirmPassword){
      toast.error("Passwords do not match",{
        className:'custom-error-toast'
      });
      return;
    }
    const response = await registerCompany(validatedCompany.data!);
    if (!response.success) {
      toast.error(response.error,{
        className:'custom-error-toast'
      });
      console.log("register error",response)
      return;
    } else {
      toast(response.message);
     setTimeout(()=>{
      router.push(`/verify-otp?email=${formData.email}&&role=company`)
     },200)
    }
  };

  const nextStep = async () => {
     const validCompany=await handleCompanyRegistrationStep(formData,registrationStep)
     if(!validCompany?.success){
      const errors = validCompany?.errors;
      for (const issue of errors!) {
        toast.error(issue.message,{
          className:'custom-error-toast'
        });
        return;
      }
     }
    setRegistrationStep(registrationStep + 1);
  };

  const prevStep = () => {
    setRegistrationStep(registrationStep - 1);
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-black via-black to-violet-950 md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Register Your Company
          </h2>
          <p className="text-violet-200 mb-8">
            Create an account to access our interview platform
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div
                className={`h-2 w-1/3 rounded-full ${
                  registrationStep >= 1 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
              <div
                className={`h-2 w-1/3 rounded-full mx-1 ${
                  registrationStep >= 2 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
              <div
                className={`h-2 w-1/3 rounded-full ${
                  registrationStep >= 3 ? "bg-violet-500" : "bg-violet-900/30"
                }`}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-violet-300">
              <span>Company Info</span>
              <span>Contact Details</span>
              <span>Account Setup</span>
            </div>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="space-y-5">
            {registrationStep === 1 && (
              <>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Company Name"
                    
                  />
                </div>

                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Company Website"
                    
                  />
                </div>

                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="text"
                    name="registrationCertificateNumber"
                    value={formData.registrationCertificateNumber}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Registration Certificate Number"
                    
                  />
                </div>

                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <select
                    value={formData.companyType}
                    name="companyType"
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none"
                    
                  >
                    <option
                      className="bg-black/80 text-gray-400"
                      value=""
                      disabled
                    >
                      Select Company Type
                    </option>
                    <option
                      className="bg-black text-white"
                      value="service-based"
                    >
                      Service Based
                    </option>
                    <option
                      className="bg-black text-white"
                      value="product-based"
                    >
                      Product Based
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                >
                  Next Step
                </button>
              </>
            )}

            {registrationStep === 2 && (
              <>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Email Address"
                    
                  />
                </div>

                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    name="phone"
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Phone Number"
                    
                  />
                </div>

                <div className="relative">
                  <Linkedin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="url"
                    name="linkedInProfile"
                    value={formData.linkedInProfile}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="LinkedIn Profile (optional)"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}

            {registrationStep === 3 && (
              <>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onHandleChange}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Password"
                    
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                    size={20}
                  />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Confirm Password"
                    onChange={onHandleChange}
                    name="confirmPassword"
                    
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="terms"
                    type="checkbox"
                    className="rounded bg-black/80 border-violet-900/50 text-violet-600 focus:ring-violet-500/50"
                    
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-violet-200"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-100"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-100"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                  disabled={loading}
                    type="submit"
                    className="w-1/2 bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
                  >
                   {loading?<RiseLoader color="white" size={11}/>:" Register Company"}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-violet-200">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className="text-violet-300 hover:text-violet-100 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="w-1/2 bg-gradient-to-bl from-black via-black to-violet-950 p-12 items-center hidden md:flex">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-8">
            Streamline Your Tech Hiring Process
          </h1>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <BrainCog className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI-Powered Mock Interviews
                </h3>
                <p className="text-violet-200">
                  Enhance hiring with AI-driven mock interviews and insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Video className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Seamless Interview Experience
                </h3>
                <p className="text-violet-200">
                  Built-in video calls & chat—no third-party tools needed.
                  One-on-one interviews with real-time interaction
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Target className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Skill Assessment
                </h3>
                <p className="text-violet-200">
                  Comprehensive technical interviews and practical coding
                  challenges.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black/80 border border-violet-900/30 p-3 rounded-lg">
                <Laptop2 className="text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Real-time Collaboration
                </h3>
                <p className="text-violet-200">
                  Interactive coding environments for live technical interviews
                  and assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistrationPage;
