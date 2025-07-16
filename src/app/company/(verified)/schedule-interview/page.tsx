"use client"
import React, { useEffect, useState } from 'react';
// import { useInterviewScheduling } from '../hooks/useInterviewScheduling';
import Header from '@/components/features/company/schedule-interview/ScheduleInterviewerHeader';
import JobSelection from '@/components/features/company/schedule-interview/JobSelectionSection';
import CandidateList from '@/components/features/company/schedule-interview/CandidateList';
import InterviewerList from '@/components/features/company/schedule-interview/InterviewersList';
import BookingModal from '@/components/features/company/schedule-interview/BookingModal';

import { IInterviewerWithSlots, IInterviewSlot } from '@/types/IScheduleInterview';
import { useInterviewScheduling } from '@/hooks/useInterviewScheduling';
import { IJob } from '@/types/IJob';
import { useGetJobs } from '@/hooks/useJob';

// Mock company ID - in real app this would come from authentication
const COMPANY_ID = 'company_1';

const InterviewScheduling: React.FC = () => {
  const [inProgressJob,setInProgressJob]=useState<IJob[]>([])
   const {getJobs}=useGetJobs()

  const {
    jobs,
    selectedJob,
    candidates,
    interviewers,
    selectedCandidate,
    loading,
    error,
    selectJob,
    selectCandidate,
    bookSlot,
    clearError
  } = useInterviewScheduling(COMPANY_ID);
   const fetchInProgressJobs=async()=>{
        const response=await getJobs("in-progress")
        setInProgressJob(response.data)
  }


  const [searchQuery, setSearchQuery] = React.useState('');
  const [bookingModal, setBookingModal] = React.useState<{
    isOpen: boolean;
    slot: IInterviewSlot | null;
    interviewer: IInterviewerWithSlots | null;
  }>({
    isOpen: false,
    slot: null,
    interviewer: null
  });

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) 
    // candidate.skills.some(skill => 
    //   skill.toLowerCase().includes(searchQuery.toLowerCase())
    // )
  );

  const handleBookSlot = (interviewer: IInterviewerWithSlots, slot: IInterviewSlot) => {
    if (!selectedCandidate) {
      alert('Please select a candidate first');
      return;
    }
    
    setBookingModal({
      isOpen: true,
      slot,
      interviewer
    });
  };

  const confirmBooking = async () => {
    if (!selectedCandidate || !bookingModal.slot || !bookingModal.interviewer) {
      return;
    }

    const success = await bookSlot(
      bookingModal.slot,
      bookingModal.interviewer,
      selectedCandidate
    );

    if (success) {
      setBookingModal({ isOpen: false, slot: null, interviewer: null });
    }
  };
     useEffect(()=>{
    fetchInProgressJobs()
   },[])

  const cancelBooking = () => {
    setBookingModal({ isOpen: false, slot: null, interviewer: null });
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <LoadingSpinner message="Loading interview scheduling platform..." /> */}
        Loading.....
      </div>
    );
  }
  
 




 return (
  <div className="min-h-screen ml-64">
    {loading && jobs.length === 0 ? (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {/* <LoadingSpinner message="Loading interview scheduling platform..." /> */}
        helo
      </div>
    ) : (
      <>
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JobSelection
            jobs={inProgressJob}
            selectedJob={selectedJob}
            onJobSelect={selectJob}
            qualifiedCandidatesCount={candidates.length}
            matchedInterviewersCount={interviewers.length}
          />

          {selectedJob && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CandidateList
                candidates={filteredCandidates}
                selectedJob={selectedJob}
                selectedCandidate={selectedCandidate}
                onCandidateSelect={selectCandidate}
              />
              <InterviewerList
                interviewers={interviewers}
                selectedJob={selectedJob}
                selectedCandidate={selectedCandidate}
                onBookSlot={handleBookSlot}
              />
            </div>
          )}

          {loading && selectedJob && (
            <div className="mt-8">
              {/* <LoadingSpinner message="Loading candidates and interviewers..." /> */}
            </div>
          )}
        </div>

        <BookingModal
          isOpen={bookingModal.isOpen}
          candidate={selectedCandidate}
          interviewer={bookingModal.interviewer}
          slot={bookingModal.slot}
          job={selectedJob}
          onConfirm={confirmBooking}
          onCancel={cancelBooking}
        />
      </>
    )}
  </div>
);

};

export default InterviewScheduling;