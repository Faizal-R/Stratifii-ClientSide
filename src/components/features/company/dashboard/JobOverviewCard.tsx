import React from 'react';
import { Briefcase, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { IJobMetrics } from '@/types/ICompanyDashboard';

interface JobOverviewCardProps {
  metrics: IJobMetrics;
}

const JobOverviewCard: React.FC<JobOverviewCardProps> = ({ metrics }) => {
  console.log("JobOverviewCard metrics:", metrics);
  // const completionRate = Math.round((metrics.completed / metrics.total) * 100);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:from-white/15 hover:to-white/10 transition-all duration-500 group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Overview</h2>
          <p className="text-gray-300">Current hiring pipeline status</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center group/stat">
          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl mb-3 group-hover/stat:from-blue-500/30 group-hover/stat:to-blue-600/20 transition-all duration-300">
            <Briefcase className="w-6 h-6 text-blue-400 mx-auto" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {metrics.open}
          </div>
          <div className="text-gray-300 text-sm">Open Positions</div>
        </div>

        <div className="text-center group/stat">
          <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/10 rounded-2xl mb-3 group-hover/stat:from-yellow-500/30 group-hover/stat:to-orange-600/20 transition-all duration-300">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {metrics.inProgress}
          </div>
          <div className="text-gray-300 text-sm">In Progress</div>
        </div>

        <div className="text-center group/stat">
          <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-green-600/10 rounded-2xl mb-3 group-hover/stat:from-emerald-500/30 group-hover/stat:to-green-600/20 transition-all duration-300">
            <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {metrics.completed}
          </div>
          <div className="text-gray-300 text-sm">Completed</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div>
          <div className="text-gray-300 text-sm mb-1">Total Jobs</div>
          <div className="text-2xl font-bold text-white">{metrics.total}</div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <div>
            {/* <div className="text-emerald-400 font-bold">{completionRate}%</div> */}
            <div className="text-gray-400 text-xs">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverviewCard;