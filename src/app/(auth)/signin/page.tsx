"use client";
import { useEffect, useState } from "react";
import { useSignIn } from "@/hooks/useAuth";
import {
  Mail,
  Lock,
  BrainCog,
  Target,
  Laptop2,
  Video,
  User,
  Building2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
import { setTimeout } from "timers";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../../../validations/AuthSchema";
import { GoogleAuthButton } from "../../../components/ui/GoogleAuthButton";
const roles = [
  {
    id: "candidate",
    name: "Candidate",
    icon: User,
    description: "Looking for opportunities",
  },
  {
    id: "interviewer",
    name: "Interviewer",
    icon: Users,
    description: "Conducting interviews",
  },
  {
    id: "company",
    name: "Company",
    icon: Building2,
    description: "Managing hiring process",
  },
];

function App() {
  const [selectedRole, setSelectedRole] = useState("candidate");
  const { signIn, loading } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onHandleSubmit = async (data: LoginSchemaType) => {
    const response = await signIn({
      email: data.email,
      password: data.password,
      role: selectedRole,
    });
    console.log("response", response);

    if (!response.success) {
      toast(response.error);
      return;
    }
    toast(response.message);
    console.log("response", response.data.accessToken);
    localStorage.setItem(`${selectedRole}AccessToken`, response.data.accessToken);
    setTimeout(() => {
      router.push(`/${selectedRole}`);
    }, 1000);
  };

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors]);

  return (
    <div className="min-h-screen flex">
      {/* Login Form Section */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-black via-black to-violet-950 md:w-1/2">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-violet-200 mb-8">
            Sign in to your interview platform
          </p>
          <div className="mb-6">
            <h3 className="text-violet-200 mb-2 font-medium">
              Select your role:
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                    selectedRole === role.id
                      ? "bg-violet-800/30 border-2 border-violet-500 text-white"
                      : "bg-black/80 border border-violet-900/50 text-violet-300 hover:bg-violet-900/20"
                  }`}
                >
                  <role.icon
                    size={20}
                    className={
                      selectedRole === role.id
                        ? "text-violet-300"
                        : "text-violet-400"
                    }
                  />
                  <span className="mt-1 text-xs font-medium">{role.name}</span>
                </button>
              ))}
            </div>
            <p className="text-violet-300 text-xs mt-1">
              Logging in as:{" "}
              <span className="font-medium">
                {roles.find((r) => r.id === selectedRole)?.description}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                size={20}
              />
              <input
                {...register("email")}
                type="text"
                className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                placeholder="Email address"
              />
            </div>
            {/* {errors.email && isSubmitted && (
                  <p className="text-red-500">
                    {errors.email.message}
                  </p>
                )} */}

            <div className="relative ">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-300"
                size={20}
              />
              <input
                {...register("password")}
                className="w-full bg-black/80 border border-violet-900/50 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                placeholder="Password"
              />
            </div>
            {/* {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )} */}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded bg-black/80 border-violet-900/50 text-violet-600 focus:ring-violet-500/50"
                />
                <span className="ml-2 text-sm text-violet-200">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-violet-300 hover:text-violet-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="flex justify-center items-center h-12 w-full bg-black/80 border border-violet-900/50 text-white py-3 rounded-lg font-semibold hover:bg-violet-950 transition duration-200"
            >
              {loading ? <RiseLoader color="white" size={11} /> : "SignIn"}
            </button>
          </form>
          <div className="mt-5">
         {selectedRole==='interviewer'&&<GoogleAuthButton />}

          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="w-1/2 bg-gradient-to-bl from-black via-black to-violet-950 p-12  items-center hidden md:flex">
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
                  {" "}
                  AI-Powered Mock Interviews
                </h3>
                <p className="text-violet-200">
                  {" "}
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

export default App;
