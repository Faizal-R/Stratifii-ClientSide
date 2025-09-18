
import {  IDelegatedCandidate } from '@/types/ICandidate';
import { IJob, IPaymentTransaction } from '@/types/IJob';


const companyId = '507f1f77bcf86cd799439010';

export const dashboardData = {
  jobs: [
    {
      _id: '507f1f77bcf86cd799439011',
      company: companyId,
      position: 'Senior Frontend Developer',
      description: 'Looking for an experienced React developer with TypeScript expertise',
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      status: 'open' as const,
      experienceRequired: 5,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '507f1f77bcf86cd799439012',
      company: companyId,
      position: 'Backend Engineer',
      description: 'Node.js developer with microservices experience',
      requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      status: 'in-progress' as const,
      experienceRequired: 4,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      _id: '507f1f77bcf86cd799439013',
      company: companyId,
      position: 'DevOps Engineer',
      description: 'AWS and Kubernetes specialist',
      requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
      status: 'completed' as const,
      experienceRequired: 6,
      createdAt: new Date('2023-12-20'),
      updatedAt: new Date('2024-01-05')
    },
    {
      _id: '507f1f77bcf86cd799439014',
      company: companyId,
      position: 'Full Stack Developer',
      description: 'MERN stack developer for e-commerce platform',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
      status: 'open' as const,
      experienceRequired: 3,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      _id: '507f1f77bcf86cd799439015',
      company: companyId,
      position: 'UI/UX Designer',
      description: 'Creative designer with strong portfolio',
      requiredSkills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      status: 'in-progress' as const,
      experienceRequired: 4,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-22')
    }
  ] as IJob[],

  payments: [
    {
      _id: '507f1f77bcf86cd799439021',
      companyId: companyId,
      jobId: '507f1f77bcf86cd799439011',
      candidatesCount: 15,
      pricePerInterview: 45,
      totalAmount: 675,
      taxAmount: 67.5,
      platformFee: 33.75,
      finalPayableAmount: 776.25,
      status: 'PAID' as const,
      paymentGatewayTransactionId: 'txn_1234567890',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      _id: '507f1f77bcf86cd799439022',
      companyId: companyId,
      jobId: '507f1f77bcf86cd799439012',
      candidatesCount: 8,
      pricePerInterview: 50,
      totalAmount: 400,
      taxAmount: 40,
      platformFee: 20,
      finalPayableAmount: 460,
      status: 'PAID' as const,
      paymentGatewayTransactionId: 'txn_1234567891',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      _id: '507f1f77bcf86cd799439023',
      companyId: companyId,
      jobId: '507f1f77bcf86cd799439013',
      candidatesCount: 12,
      pricePerInterview: 55,
      totalAmount: 660,
      taxAmount: 66,
      platformFee: 33,
      finalPayableAmount: 759,
      status: 'PENDING' as const,
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    },
    {
      _id: '507f1f77bcf86cd799439024',
      companyId: companyId,
      jobId: '507f1f77bcf86cd799439014',
      candidatesCount: 6,
      pricePerInterview: 40,
      totalAmount: 240,
      taxAmount: 24,
      platformFee: 12,
      finalPayableAmount: 276,
      status: 'FAILED' as const,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    }
  ] as IPaymentTransaction[],

  candidates: [
    {
      _id: '507f1f77bcf86cd799439031',
      candidate: "jlsj",
      company: companyId,
      job: '507f1f77bcf86cd799439011',
      status: 'mock_pending' as const,
      interviewRounds: [],
      totalNumberOfRounds: 0,
      mockInterviewDeadline: new Date('2024-01-30'),
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      _id: '507f1f77bcf86cd799439032',
      candidate: "jlskjdkf",
      company: companyId,
      job: '507f1f77bcf86cd799439011',
      status: 'mock_completed' as const,
      interviewRounds: [],
      totalNumberOfRounds: 1,
      isQualifiedForFinal: true,
      aiMockResult: {
        totalQuestions: 20,
        correctAnswers: 16,
        scoreInPercentage: 80
      },
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19')
    },
    {
      _id: '507f1f77bcf86cd799439033',
      candidate: "jlskjdlf",
      company: companyId,
      job: '507f1f77bcf86cd799439012',
      status: 'mock_failed' as const,
      interviewRounds: [],
      totalNumberOfRounds: 1,
      isQualifiedForFinal: false,
      aiMockResult: {
        totalQuestions: 25,
        correctAnswers: 8,
        scoreInPercentage: 32
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16')
    },
    {
      _id: '507f1f77bcf86cd799439034',
      candidate: "jldjlj",
      company: companyId,
      job: '507f1f77bcf86cd799439013',
      status: 'shortlisted' as const,
      interviewRounds: [],
      totalNumberOfRounds: 1,
      isQualifiedForFinal: true,
      aiMockResult: {
        totalQuestions: 30,
        correctAnswers: 24,
        scoreInPercentage: 85
      },
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-14')
    },
    {
      _id: '507f1f77bcf86cd799439035',
      candidate: "jkjk",
      company: companyId,
      job: '507f1f77bcf86cd799439014',
      status: 'in_interview_process' as const,
      interviewRounds: [
        {
          roundNumber: 1,
          type: 'final' as const,
          status: 'completed' as const,
          interviewer: 'John Smith',
          isFollowUpScheduled: false,
          feedback: {
            technicalScore: 8,
            communicationScore: 7,
            problemSolvingScore: 9,
            overallScore: 8,
            recommendation: 'next-round' as const
          }
        }
      ],
      totalNumberOfRounds: 2,
      isQualifiedForFinal: true,
      aiMockResult: {
        totalQuestions: 22,
        correctAnswers: 18,
        scoreInPercentage: 82
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-21')
    },
    {
      _id: '507f1f77bcf86cd799439036',
      candidate: "jlkjl",
      company: companyId,
      job: '507f1f77bcf86cd799439015',
      status: 'hired' as const,
      interviewRounds: [
        {
          roundNumber: 1,
          type: 'final' as const,
          status: 'completed' as const,
          interviewer: 'Sarah Johnson',
          isFollowUpScheduled: false,
          feedback: {
            technicalScore: 9,
            communicationScore: 9,
            problemSolvingScore: 8,
            overallScore: 9,
            recommendation: 'hire' as const
          }
        }
      ],
      totalNumberOfRounds: 1,
      isQualifiedForFinal: true,
      aiMockResult: {
        totalQuestions: 18,
        correctAnswers: 17,
        scoreInPercentage: 94
      },
      finalInterviewFeedback: {
        technicalScore: 9,
        communicationScore: 9,
        problemSolvingScore: 8,
        overallScore: 9,
        recommendation: 'hire' as const,
        strengths: 'Excellent problem-solving skills and communication',
        comments: 'Outstanding candidate, highly recommended for hire'
      },
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-20')
    },
  ] as unknown as IDelegatedCandidate[]
};