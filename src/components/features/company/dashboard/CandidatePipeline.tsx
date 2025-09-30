import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, UserX, UserCheck, Clock, Target, TrendingDown } from 'lucide-react';
import { IDelegatedCandidate } from '@/types/ICandidate';

interface CandidatePipelineProps {
  candidates: IDelegatedCandidate[];
}

export function CandidatePipeline({ candidates }: CandidatePipelineProps) {
  // Status counts
  const mockPending = candidates.filter(c => c.status === 'mock_pending');
  const mockStarted = candidates.filter(c => c.status === 'mock_started');
  const mockCompleted = candidates.filter(c => c.status === 'mock_completed');
  const mockFailed = candidates.filter(c => c.status === 'mock_failed');
  const shortlisted = candidates.filter(c => c.status === 'shortlisted');
  const inInterviewProcess = candidates.filter(c => c.status === 'in_interview_process');
  const hired = candidates.filter(c => c.status === 'hired');
  const rejected = candidates.filter(c => c.status === 'rejected');

  const totalCandidates = candidates.length;
  
  // Calculate success metrics
  const successfulHires = hired.length;
  
  const averageMockScore = mockCompleted.length > 0 
    ? mockCompleted.reduce((sum, c) => sum + (c.aiMockResult?.scoreInPercentage || 0), 0) / mockCompleted.length
    : 0;

  // Pipeline stages with percentages
  const pipelineStages = [
    { name: 'Mock Pending', count: mockPending.length, color: 'bg-gray-500', icon: Clock },
    { name: 'Mock Started', count: mockStarted.length, color: 'bg-blue-500', icon: Clock },
    { name: 'Mock Completed', count: mockCompleted.length, color: 'bg-green-500', icon: UserCheck },
    { name: 'Mock Failed', count: mockFailed.length, color: 'bg-red-500', icon: UserX },
    { name: 'Shortlisted', count: shortlisted.length, color: 'bg-purple-500', icon: Target },
    { name: 'In Interview Process', count: inInterviewProcess.length, color: 'bg-yellow-500', icon: Clock },
    { name: 'Hired', count: hired.length, color: 'bg-emerald-500', icon: UserCheck },
    { name: 'Rejected', count: rejected.length, color: 'bg-red-600', icon: UserX }
  ];

  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-blue-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalCandidates}</div>
            <p className="text-xs text-gray-400">In pipeline</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-red-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Mock Failed</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockFailed.length}</div>
            <p className="text-xs text-gray-400">
              {totalCandidates > 0 ? ((mockFailed.length / totalCandidates) * 100).toFixed(1) : 0}% failure rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-green-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Hired</CardTitle>
            <UserCheck className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{hired.length}</div>
            <p className="text-xs text-gray-400">
              {successfulHires} successful hires
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Avg Mock Score</CardTitle>
            <Target className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{Math.round(averageMockScore)}%</div>
            <p className="text-xs text-gray-400">
              Based on {mockCompleted.length} completed mocks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visualization */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-violet-400" />
            Candidate Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => {
              const percentage = totalCandidates > 0 ? (stage.count / totalCandidates) * 100 : 0;
              const Icon = stage.icon;
              
              return (
                <div key={stage.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${stage.color}`}
                        style={{ 
                          width: `${percentage}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-300 min-w-[60px] text-right">
                      {stage.count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Candidate Performance Details */}
  
    </div>
  );
}