"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { 
  BrainCog, 
  Video, 
  Target, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2,
  Menu, 
  X,
  Building2,
  Users,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Search,
  Users2,
  Layers,
  Code2,
  HelpCircle,
  Lock,
  Star,
  FileCheck,
  Play,
  CalendarCheck,
  UserCheck,
  Laptop,
  Check,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/features/auth/authStore';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

const InteractiveRobot = dynamic(() => import("@/components/ui/HeroVisual/InteractiveRobot"), { ssr: false });

const RightSectionRobotWrapper = () => {
  const [sectionMousePos, setSectionMousePos] = useState({ x: 0, y: 0 });
  const [isSectionActive, setIsSectionActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSectionActive) setIsSectionActive(true);
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setSectionMousePos({ x, y });
    }
  };

  return (
    <motion.div 
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsSectionActive(true)}
      onMouseLeave={() => {
        setIsSectionActive(false);
        setSectionMousePos({ x: 0, y: 0 });
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="lg:w-1/2 min-h-[520px] md:min-h-[560px] flex items-center justify-center relative w-full -mt-12 md:-mt-24"
    >
      <InteractiveRobot sectionMousePos={sectionMousePos} isSectionActive={isSectionActive} />
    </motion.div>
  );
};
import { Roles } from '@/constants/enums/roles';
import SubscriptionCard from '@/components/ui/SubscriptionCard';
import { LANDING_SUBSCRIPTION_PLANS } from '@/constants/subscriptions';

// --- Navbar Component ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800/80 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center group-hover:border-violet-400 transition-colors">
            <img src="/favicon.png" alt="Stratifii Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">Stratifii</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-9 text-sm font-semibold">
          <Link href="/how-it-works" className="text-zinc-300 hover:text-white transition-colors">How It Works</Link>
          <Link href="#process" className="text-zinc-300 hover:text-white transition-colors">Process</Link>
          <Link href="#capabilities" className="text-zinc-300 hover:text-white transition-colors">Capabilities</Link>
          <Link href="#faq" className="text-zinc-300 hover:text-white transition-colors">FAQ</Link>
          <Link href="#pricing" className="text-zinc-300 hover:text-white transition-colors">Pricing</Link>
          
          <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
          
          <Link href="/signin" className="text-zinc-200 hover:text-white transition-colors">Sign In</Link>
          <Link href="/register/company" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 active:scale-95 flex items-center gap-2">
            Get Started <ChevronRight size={16} />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-zinc-300 p-2 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 py-6 px-6 flex flex-col space-y-4 md:hidden shadow-2xl"
          >
            <Link href="/how-it-works" className="text-zinc-200 text-base py-2 border-b border-zinc-900" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <Link href="#process" className="text-zinc-200 text-base py-2 border-b border-zinc-900" onClick={() => setIsMenuOpen(false)}>Process</Link>
            <Link href="#capabilities" className="text-zinc-200 text-base py-2 border-b border-zinc-900" onClick={() => setIsMenuOpen(false)}>Capabilities</Link>
            <Link href="#faq" className="text-zinc-200 text-base py-2 border-b border-zinc-900" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
            <Link href="#pricing" className="text-zinc-200 text-base py-2 border-b border-zinc-900" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/signin" className="w-full text-center py-3 text-white border border-zinc-800 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link href="/register/company" className="w-full text-center py-3 bg-violet-600 text-white rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Feature Card Component ---

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group relative p-8 rounded-3xl bg-zinc-950/80 border border-violet-900/30 hover:border-violet-500/60 transition-all duration-500 hover:bg-zinc-900/90 shadow-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-violet-950/60 rounded-2xl flex items-center justify-center mb-6 border border-violet-700/40 group-hover:scale-110 group-hover:bg-violet-600 group-hover:border-violet-400 transition-all duration-500 shadow-md">
        <Icon className="text-violet-400 group-hover:text-white transition-colors" size={26} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">{title}</h3>
      <p className="text-violet-200/70 leading-relaxed text-sm group-hover:text-violet-200/90 transition-colors">
        {description}
      </p>
    </div>
  </motion.div>
);

// --- FAQ Item Component ---

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800/90 rounded-2xl bg-zinc-950/80 overflow-hidden transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center font-semibold text-white hover:text-violet-300 transition-colors gap-4"
      >
        <span className="text-base md:text-lg font-bold">{question}</span>
        <ChevronDown size={20} className={`text-violet-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-sm text-zinc-300 leading-relaxed border-t border-zinc-900">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Landing Page Component ---

function LandingPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleAction = () => {
    router.push('/register/company');
  };

  useEffect(() => {
    if (user) {
      if (user.role === Roles.INTERVIEWER) {
        router.push(`/${user.role}/profile`);
      } else {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30 overflow-x-hidden font-sans">
      <Navbar />
      
      {/* Background Soft Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-[#030307]" />
        
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-bold uppercase tracking-wider mb-8 shadow-inner">
                <Sparkles size={14} className="mr-2 text-violet-400 animate-pulse" />
                Corporate Candidate Technical Vetting Platform
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 leading-[1.08] tracking-tight text-white">
                Outsource Tech Vetting. <br />
                <span className="bg-gradient-to-r from-violet-400 via-violet-200 to-white bg-clip-text text-transparent">
                  Hire Elite Engineers 10x Faster.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Stratifii takes the heavy lifting of technical interviewing off your engineering team. Delegate your candidate pipeline to targeted baseline assessments and live 1-on-1 coding sessions with vetted senior tech leads.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/register/company" 
                  className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-bold text-white transition-all shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-base"
                >
                  Start Delegating Candidates
                  <ArrowRight size={19} />
                </Link>
                
                <Link 
                  href="/how-it-works" 
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Play size={16} className="text-violet-400 fill-violet-400" />
                  Explore How It Works
                </Link>
              </div>

              {/* Value Signals */}
              <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-violet-400" /> 100% Objective Standardized Rubric
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck size={16} className="text-violet-400" /> Vetted 4+ Yr Experienced Evaluators
                </div>
              </div>
            </motion.div>

            {/* 3D Interactive AI Vetting Robot Character Container */}
            <RightSectionRobotWrapper />
          </div>
        </div>
      </section>

      {/* Proof & Impact Metrics Bar */}
      <section className="py-12 bg-zinc-950 border-y border-zinc-800/80 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">85%</div>
              <div className="text-xs md:text-sm font-medium text-zinc-400">Engineering Hours Saved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">4+ Years</div>
              <div className="text-xs md:text-sm font-medium text-zinc-400">Senior Evaluator Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">2 Stages</div>
              <div className="text-xs md:text-sm font-medium text-zinc-400">Baseline Test + 1:1 Live Coding</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">&lt; 24h</div>
              <div className="text-xs md:text-sm font-medium text-zinc-400">Detailed Report Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean High-Level Process Workflow Section */}
      <section id="process" className="py-28 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Candidate Delegation Workflow
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              How Candidate Vetting Works
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              A simple 4-step candidate evaluation journey designed to save engineering hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Delegate Candidates",
                desc: "Hiring companies add candidate profiles directly into Stratifii job roles without spending internal engineering hours on initial phone screens.",
                icon: UserPlus
              },
              {
                step: "02",
                title: "Baseline Technical Test",
                desc: "Delegated candidates take role-tailored baseline assessments covering algorithms, clean code, and stack fundamentals.",
                icon: Laptop
              },
              {
                step: "03",
                title: "Select Evaluator & Book Slot",
                desc: "Companies browse verified senior tech leads (4+ yrs experience) matching their stack and schedule a live 1-on-1 WebRTC interview.",
                icon: CalendarCheck
              },
              {
                step: "04",
                title: "Receive Hiring Scorecard",
                desc: "Review comprehensive candidate rating scorecards, full session video replays, code submissions, and objective hire recommendations.",
                icon: FileCheck
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                        <Icon size={24} />
                      </div>
                      <span className="text-2xl font-black text-zinc-700 group-hover:text-violet-500 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-bold text-sm transition-colors">
              Learn more on our dedicated breakdown page <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Ultra-Attractive Interactive Capabilities Showcase */}
      <section id="capabilities" className="py-28 relative px-6 bg-zinc-950/80 border-t border-zinc-800/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-950/80 border border-violet-700/50 text-violet-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-inner">
              <Sparkles size={14} className="mr-2 text-violet-400 animate-pulse" />
              Complete Vetting Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-white">
              Built for Modern Technical Hiring
            </h2>
            <p className="text-zinc-400 text-base md:text-lg font-normal">
              Explore the core infrastructure powering candidate technical delegation and live evaluations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Laptop,
                badge: "Stage 1 Baseline",
                title: "Targeted Technical Screenings",
                description: "Role-tailored practical assessments evaluating algorithms, frontend frameworks, backend architecture, DevOps, and mobile engineering fundamentals."
              },
              {
                icon: UserCheck,
                badge: "4+ Yrs Experience",
                title: "Vetted Senior Evaluators",
                description: "Browse verified senior tech leads specializing in your stack, view their interview history, and select who conducts live sessions for your candidate slots."
              },
              {
                icon: Video,
                badge: "Live HD WebRTC",
                title: "Live Video & Shared IDE",
                description: "Real-time interactive code room featuring HD video/audio calls, multi-language syntax highlighting, synchronized cursor editing, and live code execution."
              },
              {
                icon: FileCheck,
                badge: "360° Assessment",
                title: "Actionable Scorecard Reports",
                description: "Standardized rating scorecards delivered to hiring managers with skill category ratings, HD video replay links, code submission logs, and clear hire verdicts."
              },
              {
                icon: ShieldCheck,
                badge: "Proctored Security",
                title: "Test Integrity Verification",
                description: "Automatic tab-switch detection, copy-paste tracking, and screen integrity analysis during baseline test rounds to ensure 100% authentic candidate performance."
              },
              {
                icon: Wallet,
                badge: "Instant Rewards",
                title: "Evaluator Wallet Payouts",
                description: "Automated wallet rewards system compensating senior interviewers directly upon submission and validation of completed candidate scorecards."
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/90 hover:border-violet-500/70 transition-all duration-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-violet-950/60 rounded-2xl flex items-center justify-center border border-violet-700/40 group-hover:scale-110 group-hover:bg-violet-600 group-hover:border-violet-400 transition-all duration-500 shadow-md">
                        <Icon className="text-violet-400 group-hover:text-white transition-colors" size={26} />
                      </div>
                      <span className="text-[11px] font-bold text-violet-300 bg-violet-950/80 border border-violet-800/50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-28 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-400 text-base">Clear details on how candidate delegation and expert interviews work on Stratifii.</p>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="How do candidates get onboarded to Stratifii?"
              answer="Candidates are delegated directly by hiring companies. Your company creates job positions on Stratifii and delegates candidates into your evaluation queue."
            />
            <FAQItem 
              question="How does the two-stage evaluation work?"
              answer="Stage 1 consists of a baseline technical screening test tailored to the candidate's stack. Candidates then advance to Stage 2: a 1-on-1 live WebRTC video & coding session with a senior evaluator chosen by your company."
            />
            <FAQItem 
              question="Can our company choose our own technical interviewers?"
              answer="Yes. You can browse profiles of verified senior interviewers (4+ years experience) specializing in your tech stack and select who conducts live sessions for your candidate slots."
            />
            <FAQItem 
              question="What is included in the candidate report delivered to companies?"
              answer="Your hiring team receives a detailed scorecard featuring skill category ratings (Architecture, Clean Code, Problem Solving), full HD video replays, code submissions, and a definitive Hire/No-Hire verdict."
            />
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="pricing" className="py-28 px-6 relative bg-zinc-950/70 border-t border-zinc-800/80">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">Candidate Delegation Plans</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
              Choose the evaluation quota that matches your monthly hiring volume.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {LANDING_SUBSCRIPTION_PLANS.map((sub, i) => (
              <SubscriptionCard 
                key={sub._id || i}
                subscription={sub}
                index={i}
                onAction={handleAction}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="p-12 md:p-20 rounded-[40px] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
            
            <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
              Scale Engineering Hiring <br />
              <span className="text-violet-400">Without Sacrificing Quality</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-300 mb-10 max-w-2xl mx-auto">
              Delegate candidate technical interviews to senior industry leads and receive comprehensive hiring reports.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register/company" 
                className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl text-base transition-all shadow-lg shadow-violet-600/30 hover:scale-[1.02]"
              >
                Register as Hiring Company
              </Link>
              <Link 
                href="/register/interviewer" 
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-2xl text-base border border-zinc-800 transition-all"
              >
                Apply as Senior Evaluator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-800/80 px-6 relative bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/favicon.png" alt="Stratifii Logo" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-black text-white">Stratifii</span>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-400">
              <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="#process" className="hover:text-white transition-colors">Process</Link>
              <Link href="#capabilities" className="hover:text-white transition-colors">Capabilities</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/signin" className="hover:text-white transition-colors">Sign In</Link>
            </div>

            <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-full border border-zinc-800 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All Systems Operational
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
            © 2026 Stratifii Inc. All rights reserved. Technical Interview Outsourcing Platform.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;