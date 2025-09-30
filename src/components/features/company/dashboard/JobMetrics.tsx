import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { IJob } from '@/types/IJob';

interface JobMetricsProps {
  jobs: IJob[];
}

export function JobMetrics({ jobs }: JobMetricsProps) {
  const openJobs = jobs.filter(job => job.status === 'open');
  const inProgressJobs = jobs.filter(job => job.status === 'in-progress');
  const completedJobs = jobs.filter(job => job.status === 'completed');
  
  const totalJobs = jobs.length;
  const openPercentage = totalJobs > 0 ? (openJobs.length / totalJobs) * 100 : 0;
  const inProgressPercentage = totalJobs > 0 ? (inProgressJobs.length / totalJobs) * 100 : 0;
  const completedPercentage = totalJobs > 0 ? (completedJobs.length / totalJobs) * 100 : 0;

  const recentJobs = jobs
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {/* Job Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Open Jobs</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{openJobs.length}</div>
            <Progress 
              value={openPercentage} 
              className="w-full mb-2"
              style={{
                background: 'rgba(255,255,255,0.1)'
              }}
            />
            <p className="text-xs text-gray-400">
              {openPercentage.toFixed(1)}% of total jobs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{inProgressJobs.length}</div>
            <Progress 
              value={inProgressPercentage} 
              className="w-full mb-2"
            />
            <p className="text-xs text-gray-400">
              {inProgressPercentage.toFixed(1)}% of total jobs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{completedJobs.length}</div>
            <Progress 
              value={completedPercentage} 
              className="w-full mb-2"
            />
            <p className="text-xs text-gray-400">
              {completedPercentage.toFixed(1)}% of total jobs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Job Postings */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Briefcase className="h-5 w-5 text-violet-400" />
            Recent Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div 
                key={job._id} 
                className="flex items-center justify-between p-4 bg-violet-950/30 rounded-lg border border-violet-500/20 hover:border-violet-400/40 transition-all duration-200"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{job.position}</h3>
                  <p className="text-sm text-gray-400">
                    {job.experienceRequired}+ years experience
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.requiredSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-violet-900/50 text-violet-200">
                        {skill}
                      </Badge>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-violet-900/50 text-violet-200">
                        +{job.requiredSkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={job.status === 'open' ? 'destructive' : job.status === 'in-progress' ? 'default' : 'secondary'}
                    className={`${
                      job.status === 'open' 
                        ? 'bg-yellow-900/50 text-yellow-200 border-yellow-500/30' 
                        : job.status === 'in-progress'
                        ? 'bg-blue-900/50 text-blue-200 border-blue-500/30'
                        : 'bg-green-900/50 text-green-200 border-green-500/30'
                    }`}
                  >
                    {job.status}
                  </Badge>
                  <div className="text-xs text-gray-400">
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Performance Chart */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-violet-400" />
            Job Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Open Jobs</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${openPercentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12">{openJobs.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">In Progress</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${inProgressPercentage}%`, animationDelay: '0.3s' }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12">{inProgressJobs.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Completed</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${completedPercentage}%`, animationDelay: '0.6s' }}
                  />
                </div>
                <span className="text-sm text-gray-400 w-12">{completedJobs.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}