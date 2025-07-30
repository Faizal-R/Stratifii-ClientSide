// import { useState, useEffect, useCallback } from 'react';
// import { 
//   IJobWithCounts, 
//   ICandidateWithStatus,
//   IInterviewerWithSlots,
//   IInterviewSlot
// } from '@/types/IScheduleInterview';
// // import { 
// //   getJobsWithCounts,
// //   getCandidatesForJob,
// //   getInterviewersForJob,
// //   bookInterviewSlot
// // } from '@/constants/dummyData';

// export const useInterviewScheduling = (companyId: string) => {
//   const [jobs, setJobs] = useState<IJobWithCounts[]>([]);
//   const [selectedJob, setSelectedJob] = useState<IJobWithCounts | null>(null);
//   const [candidates, setCandidates] = useState<ICandidateWithStatus[]>([]);
//   const [interviewers, setInterviewers] = useState<IInterviewerWithSlots[]>([]);
//   const [selectedCandidate, setSelectedCandidate] = useState<ICandidateWithStatus | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Load jobs on component mount
//   useEffect(() => {
//     loadJobs();
//   }, [companyId]);

//   // Load candidates and interviewers when job is selected
//   useEffect(() => {
//     if (selectedJob) {
//       loadCandidatesForJob(selectedJob._id!);
//       loadInterviewersForJob(selectedJob._id!);
//     } else {
//       setCandidates([]);
//       setInterviewers([]);
//     }
//   }, [selectedJob]);

//   const loadJobs = async () => {
//     try {
//       setLoading(true);
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
//       const jobsData = getJobsWithCounts();
//       setJobs(jobsData);
//     } catch (err) {
//       setError('Failed to load jobs');
//       console.error('Error loading jobs:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCandidatesForJob = async (jobId: string) => {
//     try {
//       setLoading(true);
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 300));
//       const candidatesData = getCandidatesForJob(jobId);
//       setCandidates(candidatesData);
//     } catch (err) {
//       setError('Failed to load candidates');
//       console.error('Error loading candidates:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadInterviewersForJob = async (jobId: string) => {
//     try {
//       setLoading(true);
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 300));
//       const interviewersData = getInterviewersForJob(jobId);
//       setInterviewers(interviewersData);
//     } catch (err) {
//       setError('Failed to load interviewers');
//       console.error('Error loading interviewers:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const bookSlot = async (
//     slot: IInterviewSlot, 
//     interviewer: IInterviewerWithSlots, 
//     candidate: ICandidateWithStatus
//   ) => {
//     try {
//       setLoading(true);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       // Book the slot using dummy data function
//       const success = bookInterviewSlot(slot._id, companyId, candidate._id);
      
//       if (success) {
//         // Refresh data to show updated state
//         if (selectedJob) {
//           await loadCandidatesForJob(selectedJob._id!);
//           await loadInterviewersForJob(selectedJob._id!);
//         }
        
//         // Clear selected candidate
//         setSelectedCandidate(null);
//         return true;
//       } else {
//         throw new Error('Failed to book slot');
//       }
//     } catch (err) {
//       setError('Failed to book interview slot');
//       console.error('Error booking slot:', err);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectJob = useCallback((job: IJobWithCounts) => {
//     setSelectedJob(job);
//     setSelectedCandidate(null);
//     setError(null);
//   }, []);

//   const selectCandidate = useCallback((candidate: ICandidateWithStatus) => {
//     setSelectedCandidate(candidate);
//   }, []);

//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);

//   return {
//     // State
//     jobs,
//     selectedJob,
//     candidates,
//     interviewers,
//     selectedCandidate,
//     loading,
//     error,
    
//     // Actions
//     selectJob,
//     selectCandidate,
//     bookSlot,
//     clearError,
    
//     // Refresh functions
//     refreshJobs: loadJobs,
//     refreshCandidates: () => selectedJob && loadCandidatesForJob(selectedJob._id!),
//     refreshInterviewers: () => selectedJob && loadInterviewersForJob(selectedJob._id!),
//   };
// };