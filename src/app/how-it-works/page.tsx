"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Users, 
  ShieldCheck, 
  Zap, 
  Award, 
  Wallet, 
  Clock, 
  Layers, 
  Code2, 
  Sparkles, 
  ChevronDown, 
  Play, 
  CheckCircle2,
  Lock,
  Calendar,
  FileCheck,
  TrendingUp,
  Search,
  UserCheck,
  Laptop
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <img src="/favicon.png" alt="Stratifii Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Stratifii</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link>
          <Link href="/how-it-works" className="text-violet-400">How It Works</Link>
          <Link href="/#features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
          <Link href="/#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <Link href="/signin" className="text-zinc-200 hover:text-white transition-colors">Sign In</Link>
          <Link href="/register/company" className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg shadow-violet-600/30">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'company' | 'candidate' | 'interviewer'>('company');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6">
              Inside Stratifii Technical Vetting
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              How Candidate Delegation <br />
              <span className="bg-gradient-to-r from-violet-400 via-violet-200 to-white bg-clip-text text-transparent">
                Works Step-by-Step
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-normal max-w-3xl mx-auto mb-10">
              Stratifii connects hiring companies with vetted senior software engineers. Companies delegate candidates into a 2-stage evaluation pipeline combining baseline technical assessments with live 1-on-1 coding sessions.
            </p>
          </motion.div>

          {/* Perspective Selector */}
          <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-xl mx-auto backdrop-blur-md">
            <button
              onClick={() => setActiveTab('company')}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'company' 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Building2 size={18} />
              For Companies
            </button>
            <button
              onClick={() => setActiveTab('candidate')}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'candidate' 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Users size={18} />
              For Candidates
            </button>
            <button
              onClick={() => setActiveTab('interviewer')}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'interviewer' 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Award size={18} />
              For Evaluators
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Workflow Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {activeTab === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-white mb-3">The Company Delegation Process</h2>
                  <p className="text-zinc-400">Save engineering team bandwidth by delegating candidate interviewing to verified industry tech leads.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      icon: Building2,
                      title: "Delegate Candidate Slots",
                      desc: "Define the job role stack and input candidate details directly into your company dashboard."
                    },
                    {
                      step: "2",
                      icon: Laptop,
                      title: "Stage 1: Baseline Assessment",
                      desc: "Candidate completes a role-specific technical screening test to verify baseline problem solving."
                    },
                    {
                      step: "3",
                      icon: UserCheck,
                      title: "Stage 2: Select Evaluator",
                      desc: "Choose a vetted senior interviewer specializing in your stack and book their live 1-on-1 session slot."
                    },
                    {
                      step: "4",
                      icon: FileCheck,
                      title: "Receive Hiring Verdict",
                      desc: "Review detailed candidate scorecards, session video replays, code submissions, and hire recommendations."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-violet-500/40 transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400 font-bold group-hover:bg-violet-600 group-hover:text-white transition-colors">
                        <item.icon size={22} />
                      </div>
                      <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">STEP {item.step}</div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Report Preview */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-4">
                      <ShieldCheck size={16} /> Objective & Standardized Evaluation
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                      Actionable Candidate Reports for Confident Hiring Decisions
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Structured breakdown across algorithms, system architecture, and code quality.",
                        "Full HD WebRTC session recording with code playback capability.",
                        "Stage 1 test integrity tracking to ensure authentic test performance.",
                        "Standardized rubric eliminating internal team interviewer bias."
                      ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle2 size={18} className="text-violet-400 shrink-0 mt-0.5" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black border border-zinc-800 rounded-2xl p-6 font-mono text-xs text-zinc-300 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="text-violet-400 font-bold">DELEGATED CANDIDATE REPORT</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold">RECOMMENDED FOR HIRE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-zinc-500 text-[10px]">CANDIDATE</div>
                        <div className="font-semibold text-white">Alex Rivera</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px]">POSITION</div>
                        <div className="font-semibold text-white">Senior Backend Lead</div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <div className="flex justify-between text-[11px]">
                        <span>Baseline Technical Test</span>
                        <span className="text-violet-300 font-bold">94%</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1.5">
                        <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '94%' }} />
                      </div>

                      <div className="flex justify-between text-[11px]">
                        <span>Live 1:1 Code Evaluation</span>
                        <span className="text-violet-300 font-bold">89%</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-1.5">
                        <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '89%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'candidate' && (
              <motion.div
                key="candidate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-white mb-3">How Candidates Experience Stratifii</h2>
                  <p className="text-zinc-400">Delegated candidates undergo a smooth, transparent 2-stage evaluation designed to showcase real technical ability.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-violet-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Laptop size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">1. Baseline Assessment</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Complete role-tailored technical questions and practical exercises at your convenience.
                    </p>
                    <div className="text-xs text-violet-400 font-semibold flex items-center gap-1">
                      <Clock size={14} /> Duration: 20-30 mins
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-violet-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Video size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">2. Live 1:1 Session</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Connect with a senior industry tech lead for a collaborative WebRTC video & real-time coding evaluation.
                    </p>
                    <div className="text-xs text-violet-400 font-semibold flex items-center gap-1">
                      <Clock size={14} /> Duration: 45-60 mins
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-violet-500/40 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Award size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">3. Fair Growth Feedback</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      Receive structured technical evaluation ratings and feedback delivered directly to the hiring team.
                    </p>
                    <div className="text-xs text-violet-400 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> Standardized & Objective
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'interviewer' && (
              <motion.div
                key="interviewer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-white mb-3">For Senior Technical Evaluators</h2>
                  <p className="text-zinc-400">Engineers with 4+ years of industry experience can offer technical interviewing services to hiring companies.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Calendar size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Set Calendar Availability</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Define available time slots on your profile. Companies browse and book interview slots for delegated candidates.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Code2 size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Conduct Live Coding Sessions</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Evaluate candidate problem-solving ability in real-time using Stratifii&apos;s WebRTC video + synchronized IDE suite.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
                    <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                      <Wallet size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Direct Wallet Payouts</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Submit structured candidate scorecards and receive direct compensation to your Stratifii wallet.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
            Ready to Delegate Your Candidate Vetting?
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join hiring teams streamlining their technical evaluations with Stratifii.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/register/company" 
              className="w-full sm:w-auto px-10 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-bold text-white transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
            >
              Register as Hiring Company <ArrowRight size={18} />
            </Link>
            <Link 
              href="/register/interviewer" 
              className="w-full sm:w-auto px-10 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl font-bold text-white transition-all"
            >
              Apply as Senior Evaluator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/favicon.png" alt="Stratifii Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">Stratifii</span>
          </Link>
          <p className="text-xs text-zinc-500">© 2026 Stratifii Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
