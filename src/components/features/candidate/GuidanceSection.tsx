import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Monitor,
  FileText,
  Users,
  Award,
} from "lucide-react";

const GuidanceSection: React.FC = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/20 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Interview Process Guidelines
        </h2>
        <p className="text-gray-300 text-lg">
          Complete guide to our AI Mock Interview and One-to-One Interview
          process
        </p>
      </div>

      {/* Process Flow */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Mock Interview */}
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-violet-500/20 p-2 rounded-full mr-3">
              <Monitor className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              AI Mock Interview
            </h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>25 multiple-choice technical questions</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>90 seconds per question with auto-progression</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Covers Node.js, JavaScript, MongoDB, and Express.js</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Immediate results and performance analysis</span>
            </div>
          </div>
        </div>

        {/* One-to-One Interview */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              One-to-One Interview
            </h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Live video interview with hiring manager</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Technical discussion and coding challenges</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Cultural fit and behavioral assessment</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="font-medium text-emerald-400">
                Only available after passing mock interview
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Guidelines */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
          <h3 className="text-xl font-semibold text-red-400">
            Critical Guidelines & Rules
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <Monitor className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">
                  Full-Screen Mode Required
                </span>
                <p className="text-gray-400 text-sm">
                  Stay in full-screen throughout the interview
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Eye className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">No Tab Switching</span>
                <p className="text-gray-400 text-sm">
                  Do not open other tabs, windows, or applications
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">
                  No External Resources
                </span>
                <p className="text-gray-400 text-sm">
                  No documentation, websites, or reference materials
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">Time Management</span>
                <p className="text-gray-400 text-sm">
                  Answer within 90 seconds or auto-submit
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">
                  Zero Tolerance Policy
                </span>
                <p className="text-gray-400 text-sm">
                  Any malpractice results in immediate disqualification
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-medium">No External Help</span>
                <p className="text-gray-400 text-sm">
                  Complete the interview independently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Criteria */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-green-400 mr-3" />
          <h3 className="text-xl font-semibold text-green-400">
            Path to Success
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-green-400 font-bold">1</span>
            </div>
            <h4 className="text-white font-medium">Complete Mock Interview</h4>
            <p className="text-gray-400 text-sm">
              Pass the AI assessment with good performance
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-green-400 font-bold">2</span>
            </div>
            <h4 className="text-white font-medium">Get Shortlisted</h4>
            <p className="text-gray-400 text-sm">
              Receive invitation for one-to-one interview
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <h4 className="text-white font-medium">Final Interview</h4>
            <p className="text-gray-400 text-sm">
              Attend live interview with hiring team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceSection;
