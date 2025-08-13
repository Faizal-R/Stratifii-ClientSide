import React from 'react';
import { Award, Home, TrendingUp, Target, Clock, Star, Trophy, CheckCircle, XCircle } from 'lucide-react';

interface ResultsScreenProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  onBackToDashboard: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, onBackToDashboard }) => {
  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { 
      level: 'Excellent', 
      color: 'text-green-400', 
      bgColor: 'bg-green-500/20',
      icon: Trophy,
      borderColor: 'border-green-500/30'
    };
    if (percentage >= 60) return { 
      level: 'Good', 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-500/20',
      icon: Star,
      borderColor: 'border-blue-500/30'
    };
    if (percentage >= 40) return { 
      level: 'Average', 
      color: 'text-yellow-400', 
      bgColor: 'bg-yellow-500/20',
      icon: TrendingUp,
      borderColor: 'border-yellow-500/30'
    };
    return { 
      level: 'Needs Improvement', 
      color: 'text-red-400', 
      bgColor: 'bg-red-500/20',
      icon: Target,
      borderColor: 'border-red-500/30'
    };
  };

  const performance = getPerformanceLevel(score.percentage);
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className=" rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Interview Completed!</h1>
          <p className="text-gray-400 text-sm">Here are your results</p>
        </div>

        {/* Main Results Card - Horizontal Layout */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20 mb-6">
          <div className="flex items-center justify-between">
            {/* Left Side - Score and Performance */}
            <div className="flex items-center space-x-8">
              {/* Score Circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 border-2 border-violet-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{score.percentage}%</div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className={`px-2 py-1 rounded-full text-xs ${performance.bgColor} ${performance.color} flex items-center`}>
                    <PerformanceIcon className="h-3 w-3 mr-1" />
                    {performance.level}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-16 w-px bg-violet-500/30"></div>

              {/* Statistics */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-xl font-bold text-white">{score.correct}</span>
                  </div>
                  <div className="text-gray-400 text-xs">Correct</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <XCircle className="h-4 w-4 text-red-400 mr-1" />
                    <span className="text-xl font-bold text-white">{score.total - score.correct}</span>
                  </div>
                  <div className="text-gray-400 text-xs">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="h-4 w-4 text-violet-400 mr-1" />
                    <span className="text-xl font-bold text-white">{score.total}</span>
                  </div>
                  <div className="text-gray-400 text-xs">Total</div>
                </div>
              </div>
            </div>

            {/* Right Side - Performance Badge */}
            <div className={`p-4 rounded-xl ${performance.bgColor} border ${performance.borderColor}`}>
              <PerformanceIcon className={`h-8 w-8 ${performance.color}`} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Overall Performance</span>
              <span>{score.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${score.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Performance Feedback - Compact */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-violet-500/20 mb-6">
          <div className="flex items-center space-x-3">
            <PerformanceIcon className={`h-5 w-5 ${performance.color}`} />
            <div>
              <h3 className="text-sm font-semibold text-white">Performance Analysis</h3>
              <p className={`text-sm ${performance.color} mt-1`}>
                {score.percentage >= 80 && "Outstanding performance! You have excellent knowledge of the topics covered."}
                {score.percentage >= 60 && score.percentage < 80 && "Good job! You have a solid understanding with room for improvement."}
                {score.percentage >= 40 && score.percentage < 60 && "Average performance. Consider reviewing the topics and practicing more."}
                {score.percentage < 40 && "Keep practicing! Focus on strengthening your fundamentals in these areas."}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            onClick={onBackToDashboard}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">
            Keep practicing to improve your skills and achieve better results!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;