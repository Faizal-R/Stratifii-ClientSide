// import React from 'react';
// import { Briefcase, Loader2, AlertCircle } from 'lucide-react';
// import { DelegatedJob } from '@/types/IJob';
// import JobCard from './JobCard';

// interface JobsListProps {
//   jobs: DelegatedJob[];
//   loading: boolean;
//   error: string | null;
//   onStartMockInterview?: (job: DelegatedJob) => void;
// }

// const JobsList: React.FC<JobsListProps> = ({ jobs, loading, error, onStartMockInterview }) => {
//   if (loading) {
//     return (
//       <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/20">
//         <div className="flex items-center justify-center">
//           <Loader2 className="h-8 w-8 text-violet-400 animate-spin mr-3" />
//           <span className="text-white">Loading delegated jobs...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
//         <div className="flex items-center justify-center text-red-400">
//           <AlertCircle className="h-8 w-8 mr-3" />
//           <span>Error loading jobs: {error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (jobs.length === 0) {
//     return (
//       <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/20 flex items-center justify-center">
//         <div className="text-center">
//           <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-white mb-2">No Jobs Assigned</h3>
//           <p className="text-gray-400">
//             You don't have any delegated jobs at the moment. Check back later for new opportunities.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center mb-6">
//         <Briefcase className="h-6 w-6 text-violet-400 mr-3" />
//         <h2 className="text-2xl font-semibold text-white">
//           Delegated Jobs ({jobs.length})
//         </h2>
//       </div>
      
//       <div className="grid gap-4">
//         {jobs.map((job) => (
//           <JobCard
//             key={job.jobId}
//             job={job}
//             onStartMockInterview={onStartMockInterview}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobsList;