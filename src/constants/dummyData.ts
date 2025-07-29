// ts 
// } from '../types';

import { ICompany } from "@/types/ICompany";
import { ICompanyProfile } from "@/validations/CompanySchema";

// // Companies
// export const companies: Company[] = [
//   {
//     _id: 'company_1',
//     name: 'TechCorp Solutions',
//     email: 'hr@techcorp.com'
//   },
//   {
//     _id: 'company_2', 
//     name: 'InnovateLabs',
//     email: 'hiring@innovatelabs.com'
//   }
// ];

// // Jobs
// export const jobs: Job[] = [
//   {
//     _id: 'job_1',
//     title: 'Senior Frontend Developer',
//     department: 'Engineering',
//     requiredSkills: ['React', 'TypeScript', 'Node.js', 'AWS'],
//     experience: '5+ years',
//     description: 'Build scalable frontend applications using modern React ecosystem'
//   },
//   {
//     _id: 'job_2',
//     title: 'DevOps Engineer',
//     department: 'Infrastructure', 
//     requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
//     experience: '3+ years',
//     description: 'Manage cloud infrastructure and deployment pipelines'
//   },
//   {
//     _id: 'job_3',
//     title: 'Product Manager',
//     department: 'Product',
//     requiredSkills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
//     experience: '4+ years',
//     description: 'Drive product vision and coordinate cross-functional teams'
//   },
//   {
//     _id: 'job_4',
//     title: 'Backend Developer',
//     department: 'Engineering',
//     requiredSkills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
//     experience: '3+ years',
//     description: 'Develop robust backend services and APIs'
//   },
//   {
//     _id: 'job_5',
//     title: 'UI/UX Designer',
//     department: 'Design',
//     requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
//     experience: '2+ years',
//     description: 'Create intuitive user experiences and design systems'
//   }
// ];

// // Candidates
// export const candidates: Candidate[] = [
//   // Frontend Developer Candidates
//   {
//     _id: 'candidate_1',
//     name: 'Sarah Johnson',
//     email: 'sarah.johnson@email.com',
//     phone: '+1 (555) 123-4567',
//     location: 'San Francisco, CA',
//     experience: '6 years',
//     skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
//     avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_2',
//     name: 'Michael Chen',
//     email: 'michael.chen@email.com',
//     phone: '+1 (555) 987-6543',
//     location: 'New York, NY',
//     experience: '5 years',
//     skills: ['React', 'TypeScript', 'Vue.js', 'AWS', 'MongoDB'],
//     avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_3',
//     name: 'Emily Rodriguez',
//     email: 'emily.rodriguez@email.com',
//     phone: '+1 (555) 456-7890',
//     location: 'Austin, TX',
//     experience: '7 years',
//     skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
//     avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_4',
//     name: 'Alex Thompson',
//     email: 'alex.thompson@email.com',
//     phone: '+1 (555) 234-5678',
//     location: 'Seattle, WA',
//     experience: '4 years',
//     skills: ['React', 'JavaScript', 'Node.js', 'Firebase'],
//     avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop&crop=face'
//   },

//   // DevOps Engineer Candidates
//   {
//     _id: 'candidate_5',
//     name: 'David Kumar',
//     email: 'david.kumar@email.com',
//     phone: '+1 (555) 345-6789',
//     location: 'Denver, CO',
//     experience: '5 years',
//     skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
//     avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_6',
//     name: 'Lisa Wang',
//     email: 'lisa.wang@email.com',
//     phone: '+1 (555) 456-7891',
//     location: 'Portland, OR',
//     experience: '4 years',
//     skills: ['Docker', 'Jenkins', 'AWS', 'Ansible', 'Monitoring'],
//     avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_7',
//     name: 'James Wilson',
//     email: 'james.wilson@email.com',
//     phone: '+1 (555) 567-8912',
//     location: 'Chicago, IL',
//     experience: '6 years',
//     skills: ['Kubernetes', 'Docker', 'GCP', 'CI/CD', 'Prometheus'],
//     avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=150&h=150&fit=crop&crop=face'
//   },

//   // Product Manager Candidates
//   {
//     _id: 'candidate_8',
//     name: 'Rachel Green',
//     email: 'rachel.green@email.com',
//     phone: '+1 (555) 678-9123',
//     location: 'Los Angeles, CA',
//     experience: '5 years',
//     skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership', 'User Research'],
//     avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_9',
//     name: 'Mark Davis',
//     email: 'mark.davis@email.com',
//     phone: '+1 (555) 789-1234',
//     location: 'Boston, MA',
//     experience: '7 years',
//     skills: ['Product Strategy', 'Data Analysis', 'Scrum', 'Stakeholder Management'],
//     avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_10',
//     name: 'Jennifer Lee',
//     email: 'jennifer.lee@email.com',
//     phone: '+1 (555) 891-2345',
//     location: 'Miami, FL',
//     experience: '4 years',
//     skills: ['Product Management', 'Analytics', 'Agile', 'UX Research'],
//     avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?w=150&h=150&fit=crop&crop=face'
//   },

//   // Backend Developer Candidates
//   {
//     _id: 'candidate_11',
//     name: 'Robert Martinez',
//     email: 'robert.martinez@email.com',
//     phone: '+1 (555) 912-3456',
//     location: 'Phoenix, AZ',
//     experience: '5 years',
//     skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
//     avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_12',
//     name: 'Amanda Foster',
//     email: 'amanda.foster@email.com',
//     phone: '+1 (555) 123-4567',
//     location: 'Nashville, TN',
//     experience: '4 years',
//     skills: ['Python', 'Flask', 'MySQL', 'Redis', 'AWS'],
//     avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face'
//   },

//   // UI/UX Designer Candidates
//   {
//     _id: 'candidate_13',
//     name: 'Sophie Turner',
//     email: 'sophie.turner@email.com',
//     phone: '+1 (555) 234-5678',
//     location: 'San Diego, CA',
//     experience: '3 years',
//     skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe Creative Suite'],
//     avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=150&h=150&fit=crop&crop=face'
//   },
//   {
//     _id: 'candidate_14',
//     name: 'Daniel Kim',
//     email: 'daniel.kim@email.com',
//     phone: '+1 (555) 345-6789',
//     location: 'Atlanta, GA',
//     experience: '4 years',
//     skills: ['Sketch', 'Figma', 'User Testing', 'Wireframing', 'Design Systems'],
//     avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face'
//   }
// ];

// // Interviewers
// export const interviewers: Interviewer[] = [
//   {
//     _id: 'interviewer_1',
//     name: 'David Kim',
//     title: 'Senior Engineering Manager',
//     company: 'TechCorp',
//     experience: '12 years',
//     skills: ['React', 'TypeScript', 'System Design', 'Leadership'],
//     rating: 4.9,
//     avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'San Francisco, CA',
//     email: 'david.kim@techcorp.com'
//   },
//   {
//     _id: 'interviewer_2',
//     name: 'Jennifer Walsh',
//     title: 'Tech Lead',
//     company: 'InnovateLabs',
//     experience: '9 years',
//     skills: ['React', 'Node.js', 'AWS', 'Microservices'],
//     rating: 4.8,
//     avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'Seattle, WA',
//     email: 'jennifer.walsh@innovatelabs.com'
//   },
//   {
//     _id: 'interviewer_3',
//     name: 'Robert Martinez',
//     title: 'Principal Engineer',
//     company: 'ScaleUp Inc',
//     experience: '15 years',
//     skills: ['React', 'TypeScript', 'System Architecture', 'Performance'],
//     rating: 4.9,
//     avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'Denver, CO',
//     email: 'robert.martinez@scaleup.com'
//   },
//   {
//     _id: 'interviewer_4',
//     name: 'Sarah Connor',
//     title: 'DevOps Lead',
//     company: 'CloudTech',
//     experience: '8 years',
//     skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
//     rating: 4.7,
//     avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'Austin, TX',
//     email: 'sarah.connor@cloudtech.com'
//   },
//   {
//     _id: 'interviewer_5',
//     name: 'Mike Johnson',
//     title: 'Product Director',
//     company: 'ProductCo',
//     experience: '10 years',
//     skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile'],
//     rating: 4.8,
//     avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'New York, NY',
//     email: 'mike.johnson@productco.com'
//   },
//   {
//     _id: 'interviewer_6',
//     name: 'Lisa Chen',
//     title: 'Senior Backend Engineer',
//     company: 'DataFlow',
//     experience: '7 years',
//     skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS'],
//     rating: 4.6,
//     avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'San Francisco, CA',
//     email: 'lisa.chen@dataflow.com'
//   },
//   {
//     _id: 'interviewer_7',
//     name: 'Tom Wilson',
//     title: 'Design Director',
//     company: 'CreativeStudio',
//     experience: '11 years',
//     skills: ['Figma', 'Design Systems', 'User Research', 'Leadership'],
//     rating: 4.9,
//     avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?w=150&h=150&fit=crop&crop=face',
//     location: 'Los Angeles, CA',
//     email: 'tom.wilson@creativestudio.com'
//   }
// ];

// // Delegated Candidates (based on your schema)
// export const delegatedCandidates: DelegatedCandidate[] = [
//   // Frontend Developer Job Candidates
//   {
//     _id: 'dc_1',
//     candidate: 'candidate_1',
//     company: 'company_1',
//     job: 'job_1',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 20,
//       correctAnswers: 17,
//       scoreInPercentage: 85
//     },
//     createdAt: new Date('2025-01-10'),
//     updatedAt: new Date('2025-01-12')
//   },
//   {
//     _id: 'dc_2',
//     candidate: 'candidate_2',
//     company: 'company_1',
//     job: 'job_1',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 20,
//       correctAnswers: 18,
//       scoreInPercentage: 90
//     },
//     createdAt: new Date('2025-01-10'),
//     updatedAt: new Date('2025-01-12')
//   },
//   {
//     _id: 'dc_3',
//     candidate: 'candidate_3',
//     company: 'company_1',
//     job: 'job_1',
//     status: 'final_scheduled',
//     isQualifiedForFinal: true,
//     assignedInterviewer: 'interviewer_1',
//     scheduledTime: new Date('2025-01-20T14:00:00Z'),
//     interviewTimeZone: 'America/Los_Angeles',
//     aiMockResult: {
//       totalQuestions: 20,
//       correctAnswers: 16,
//       scoreInPercentage: 80
//     },
//     createdAt: new Date('2025-01-10'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'dc_4',
//     candidate: 'candidate_4',
//     company: 'company_1',
//     job: 'job_1',
//     status: 'mock_failed',
//     isQualifiedForFinal: false,
//     aiMockResult: {
//       totalQuestions: 20,
//       correctAnswers: 11,
//       scoreInPercentage: 55
//     },
//     createdAt: new Date('2025-01-10'),
//     updatedAt: new Date('2025-01-11')
//   },

//   // DevOps Engineer Job Candidates
//   {
//     _id: 'dc_5',
//     candidate: 'candidate_5',
//     company: 'company_1',
//     job: 'job_2',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 25,
//       correctAnswers: 22,
//       scoreInPercentage: 88
//     },
//     createdAt: new Date('2025-01-11'),
//     updatedAt: new Date('2025-01-13')
//   },
//   {
//     _id: 'dc_6',
//     candidate: 'candidate_6',
//     company: 'company_1',
//     job: 'job_2',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 25,
//       correctAnswers: 20,
//       scoreInPercentage: 80
//     },
//     createdAt: new Date('2025-01-11'),
//     updatedAt: new Date('2025-01-13')
//   },
//   {
//     _id: 'dc_7',
//     candidate: 'candidate_7',
//     company: 'company_1',
//     job: 'job_2',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 25,
//       correctAnswers: 23,
//       scoreInPercentage: 92
//     },
//     createdAt: new Date('2025-01-11'),
//     updatedAt: new Date('2025-01-13')
//   },

//   // Product Manager Job Candidates
//   {
//     _id: 'dc_8',
//     candidate: 'candidate_8',
//     company: 'company_1',
//     job: 'job_3',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 18,
//       correctAnswers: 15,
//       scoreInPercentage: 83
//     },
//     createdAt: new Date('2025-01-12'),
//     updatedAt: new Date('2025-01-14')
//   },
//   {
//     _id: 'dc_9',
//     candidate: 'candidate_9',
//     company: 'company_1',
//     job: 'job_3',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 18,
//       correctAnswers: 16,
//       scoreInPercentage: 89
//     },
//     createdAt: new Date('2025-01-12'),
//     updatedAt: new Date('2025-01-14')
//   },
//   {
//     _id: 'dc_10',
//     candidate: 'candidate_10',
//     company: 'company_1',
//     job: 'job_3',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 18,
//       correctAnswers: 14,
//       scoreInPercentage: 78
//     },
//     createdAt: new Date('2025-01-12'),
//     updatedAt: new Date('2025-01-14')
//   },

//   // Backend Developer Job Candidates
//   {
//     _id: 'dc_11',
//     candidate: 'candidate_11',
//     company: 'company_1',
//     job: 'job_4',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 22,
//       correctAnswers: 19,
//       scoreInPercentage: 86
//     },
//     createdAt: new Date('2025-01-13'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'dc_12',
//     candidate: 'candidate_12',
//     company: 'company_1',
//     job: 'job_4',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 22,
//       correctAnswers: 18,
//       scoreInPercentage: 82
//     },
//     createdAt: new Date('2025-01-13'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // UI/UX Designer Job Candidates
//   {
//     _id: 'dc_13',
//     candidate: 'candidate_13',
//     company: 'company_1',
//     job: 'job_5',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 16,
//       correctAnswers: 13,
//       scoreInPercentage: 81
//     },
//     createdAt: new Date('2025-01-14'),
//     updatedAt: new Date('2025-01-16')
//   },
//   {
//     _id: 'dc_14',
//     candidate: 'candidate_14',
//     company: 'company_1',
//     job: 'job_5',
//     status: 'shortlisted',
//     isQualifiedForFinal: true,
//     aiMockResult: {
//       totalQuestions: 16,
//       correctAnswers: 12,
//       scoreInPercentage: 75
//     },
//     createdAt: new Date('2025-01-14'),
//     updatedAt: new Date('2025-01-16')
//   }
// ];

// // Interview Slots (based on your schema)
// export const interviewSlots: InterviewSlot[] = [
//   // Interviewer 1 (Frontend) slots
//   {
//     _id: 'slot_1',
//     interviewerId: 'interviewer_1',
//     startTime: new Date('2025-01-20T10:00:00Z'),
//     endTime: new Date('2025-01-20T11:00:00Z'),
//     duration: 60,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/abc-defg-hij',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_2',
//     interviewerId: 'interviewer_1',
//     startTime: new Date('2025-01-20T14:00:00Z'),
//     endTime: new Date('2025-01-20T15:00:00Z'),
//     duration: 60,
//     isAvailable: false,
//     status: 'booked',
//     bookedBy: 'company_1',
//     meetingLink: 'https://meet.google.com/abc-defg-hij',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-16')
//   },
//   {
//     _id: 'slot_3',
//     interviewerId: 'interviewer_1',
//     startTime: new Date('2025-01-21T11:00:00Z'),
//     endTime: new Date('2025-01-21T12:00:00Z'),
//     duration: 60,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/abc-defg-hij',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // Interviewer 2 (Frontend) slots
//   {
//     _id: 'slot_4',
//     interviewerId: 'interviewer_2',
//     startTime: new Date('2025-01-20T09:00:00Z'),
//     endTime: new Date('2025-01-20T09:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://zoom.us/j/123456789',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_5',
//     interviewerId: 'interviewer_2',
//     startTime: new Date('2025-01-20T13:00:00Z'),
//     endTime: new Date('2025-01-20T13:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://zoom.us/j/123456789',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // Interviewer 4 (DevOps) slots
//   {
//     _id: 'slot_6',
//     interviewerId: 'interviewer_4',
//     startTime: new Date('2025-01-20T11:00:00Z'),
//     endTime: new Date('2025-01-20T11:50:00Z'),
//     duration: 50,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_7',
//     interviewerId: 'interviewer_4',
//     startTime: new Date('2025-01-21T13:00:00Z'),
//     endTime: new Date('2025-01-21T13:50:00Z'),
//     duration: 50,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // Interviewer 5 (Product Manager) slots
//   {
//     _id: 'slot_8',
//     interviewerId: 'interviewer_5',
//     startTime: new Date('2025-01-20T15:00:00Z'),
//     endTime: new Date('2025-01-20T15:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_9',
//     interviewerId: 'interviewer_5',
//     startTime: new Date('2025-01-21T10:00:00Z'),
//     endTime: new Date('2025-01-21T10:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // Interviewer 6 (Backend) slots
//   {
//     _id: 'slot_10',
//     interviewerId: 'interviewer_6',
//     startTime: new Date('2025-01-20T12:00:00Z'),
//     endTime: new Date('2025-01-20T13:00:00Z'),
//     duration: 60,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://zoom.us/j/987654321',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_11',
//     interviewerId: 'interviewer_6',
//     startTime: new Date('2025-01-21T09:00:00Z'),
//     endTime: new Date('2025-01-21T10:00:00Z'),
//     duration: 60,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://zoom.us/j/987654321',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },

//   // Interviewer 7 (UI/UX) slots
//   {
//     _id: 'slot_12',
//     interviewerId: 'interviewer_7',
//     startTime: new Date('2025-01-20T16:00:00Z'),
//     endTime: new Date('2025-01-20T16:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/design-interview-123',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   },
//   {
//     _id: 'slot_13',
//     interviewerId: 'interviewer_7',
//     startTime: new Date('2025-01-21T11:00:00Z'),
//     endTime: new Date('2025-01-21T11:45:00Z'),
//     duration: 45,
//     isAvailable: true,
//     status: 'available',
//     bookedBy: null,
//     meetingLink: 'https://meet.google.com/design-interview-123',
//     createdAt: new Date('2025-01-15'),
//     updatedAt: new Date('2025-01-15')
//   }
// ];

// // Helper functions to get processed data
// export const getJobsWithCounts = (): JobWithCounts[] => {
//   return jobs.map(job => {
//     const jobCandidates = delegatedCandidates.filter(dc => 
//       dc.job === job._id && dc.isQualifiedForFinal
//     );
//     const jobInterviewers = getInterviewersForJob(job._id);
    
//     return {
//       ...job,
//       candidateCount: jobCandidates.length,
//       interviewerCount: jobInterviewers.length,
//       qualifiedCandidateCount: jobCandidates.length
//     };
//   });
// };

// export const getCandidatesForJob = (jobId: string): CandidateWithStatus[] => {
//   const jobDelegatedCandidates = delegatedCandidates.filter(dc => 
//     dc.job === jobId && dc.isQualifiedForFinal
//   );
  
//   return jobDelegatedCandidates.map(dc => {
//     const candidate = candidates.find(c => c._id === dc.candidate);
//     if (!candidate) return null;
    
//     return {
//       ...candidate,
//       delegationStatus: dc.status,
//       mockScore: dc.aiMockResult?.scoreInPercentage,
//       isQualifiedForFinal: dc.isQualifiedForFinal || false,
//       scheduledInterview: dc.assignedInterviewer && dc.scheduledTime ? {
//         interviewerId: dc.assignedInterviewer,
//         scheduledTime: dc.scheduledTime,
//         timeZone: dc.interviewTimeZone
//       } : undefined
//     };
//   }).filter(Boolean) as CandidateWithStatus[];
// };

// export const getInterviewersForJob = (jobId: string): InterviewerWithSlots[] => {
//   const job = jobs.find(j => j._id === jobId);
//   if (!job) return [];
  
//   // Filter interviewers who have matching skills with the job
//   const matchedInterviewers = interviewers.filter(interviewer => 
//     interviewer.skills.some(skill => job.requiredSkills.includes(skill))
//   );
  
//   return matchedInterviewers.map(interviewer => {
//     const interviewerSlots = interviewSlots.filter(slot => 
//       slot.interviewerId === interviewer._id && 
//       slot.isAvailable && 
//       slot.status === 'available' &&
//       new Date(slot.startTime) > new Date()
//     );
    
//     return {
//       ...interviewer,
//       availableSlots: interviewerSlots
//     };
//   });
// };

// export const bookInterviewSlot = (
//   slotId: string, 
//   companyId: string, 
//   candidateId: string
// ): boolean => {
//   // Find and update the slot
//   const slotIndex = interviewSlots.findIndex(slot => slot._id === slotId);
//   if (slotIndex === -1) return false;
  
//   interviewSlots[slotIndex] = {
//     ...interviewSlots[slotIndex],
//     isAvailable: false,
//     status: 'booked',
//     bookedBy: companyId,
//     updatedAt: new Date()
//   };
  
//   // Find and update the delegated candidate
//   const dcIndex = delegatedCandidates.findIndex(dc => 
//     dc.candidate === candidateId && dc.company === companyId
//   );
  
//   if (dcIndex !== -1) {
//     const slot = interviewSlots[slotIndex];
//     delegatedCandidates[dcIndex] = {
//       ...delegatedCandidates[dcIndex],
//       status: 'final_scheduled',
//       assignedInterviewer: slot.interviewerId,
//       scheduledTime: slot.startTime,
//       interviewTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       updatedAt: new Date()
//     };
//   }
  
//   return true;
// };


export type IUser={
  companyName:string;
  email:string;
  status:string;


}

export const dummyCompanies:ICompanyProfile[]=
[
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "TechNova Innovations",
    "email": "contact@technova.com",
    "companyWebsite": "https://www.technova.com",
    "registrationCertificateNumber": "REG-TN-2025-001",
    "linkedInProfile": "https://www.linkedin.com/company/technova",
    "phone": "+91-9876543210",
    "password": "$2a$10$hashedpasswordstring1",
    "companyType": "Private Limited",
    "description": "TechNova is a leading provider of AI and SaaS-based enterprise solutions.",
    "companySize": "Medium",
    "numberOfEmployees": "150",
    "headquartersLocation": "Bangalore, India",
    "companyLogo": "https://cdn.technova.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60c72b2f5f1b2c001c8e4d9a",
    "usage": {
      "jobPostsThisMonth": 3,
      "candidatesAddedThisMonth": 10
    }
  },
  {
    "companyName": "CodeCraft Studios",
    "email": "hr@codecraft.com",
    "companyWebsite": "https://www.codecraft.com",
    "registrationCertificateNumber": "REG-CC-2024-014",
    "linkedInProfile": "https://www.linkedin.com/company/codecraft",
    "phone": "+1-312-555-0198",
    "password": "$2a$10$hashedpasswordstring2",
    "companyType": "Startup",
    "description": "A dynamic startup focused on mobile app development and UX/UI design.",
    "companySize": "Startup",
    "numberOfEmployees": "25",
    "headquartersLocation": "San Francisco, USA",
    "companyLogo": "https://cdn.codecraft.com/logo.png",
    "isVerified": false,
    "status": "pending",
    "isBlocked": false,
    "activePlan": null,
    "usage": {
      "jobPostsThisMonth": 1,
      "candidatesAddedThisMonth": 2
    }
  },
  {
    "companyName": "GlobalSoft Enterprises",
    "email": "admin@globalsoft.com",
    "companyWebsite": "https://www.globalsoft.com",
    "registrationCertificateNumber": "REG-GS-2023-872",
    "linkedInProfile": "https://www.linkedin.com/company/globalsoft",
    "phone": "+44-20-7946-0123",
    "password": "$2a$10$hashedpasswordstring3",
    "companyType": "Enterprise",
    "description": "A global enterprise providing ERP and IT consulting services across 40 countries.",
    "companySize": "Enterprise",
    "numberOfEmployees": "1200",
    "headquartersLocation": "London, UK",
    "companyLogo": "https://cdn.globalsoft.com/logo.png",
    "isVerified": true,
    "status": "approved",
    "isBlocked": false,
    "activePlan": "60d83bf4cfc9b8001e8e5b9b",
    "usage": {
      "jobPostsThisMonth": 10,
      "candidatesAddedThisMonth": 30
    }
  }
]
