"use client";
import React, { useState } from 'react';
import { Clock, User, BookOpen, Award, Play } from 'lucide-react';
import { Timer } from '@/components/features/common/Timer';
import RulesModal from '@/components/features/candidate/RulesAndGuidanceModal';
import { useRouter } from 'next/navigation';
import GuidanceSection from '@/components/features/candidate/GuidanceSection';



const CandidateDashboard: React.FC = () => {
  const [showRulesModal, setShowRulesModal] = useState(false);
  const router=useRouter()

  const handleStartInterview = () => {
    setShowRulesModal(true);
  };

  const handleAcceptRules = () => {
    setShowRulesModal(false);
     router.push('/candidate/mock-interview');
  };

  return (
    <div className='custom-64 bg-gradient-to-br from-black via-black to-violet-950'>

      <GuidanceSection/>
    </div>
  );
};

export default CandidateDashboard;