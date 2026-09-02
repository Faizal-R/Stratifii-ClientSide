"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  UserCheck, 
  Video, 
  ShieldCheck, 
  Terminal, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Code2, 
  Play
} from 'lucide-react';

export default function TechVettingHub() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full max-w-[540px] max-h-[480px] flex items-center justify-center pointer-events-none select-none my-auto">
      {/* Laser Gradient Background Glowing Orbs */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-violet-600/35 via-fuchsia-600/20 to-cyan-500/30 blur-[90px] animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full bg-indigo-500/20 blur-[80px] -translate-x-16 translate-y-12" />

      {/* Rotating Cyber Grid Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[340px] h-[340px] md:w-[380px] md:h-[380px] rounded-full border border-violet-500/20 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[260px] h-[260px] md:w-[290px] md:h-[290px] rounded-full border border-cyan-500/20 border-dotted"
        />
      </div>

      {/* Central 3D Glassmorphic Assessment Chassis */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-72 md:w-80 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black p-6 rounded-3xl border border-violet-500/50 shadow-[0_0_60px_rgba(139,92,246,0.3)] backdrop-blur-2xl"
      >
        {/* Glowing Top Status Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-white tracking-wider">STRATIFII LIVE VETTING</span>
          </div>
          <span className="text-[10px] bg-violet-600/30 text-violet-300 font-bold px-2.5 py-0.5 rounded-full border border-violet-500/40 flex items-center gap-1">
            <Cpu size={12} className="text-violet-400" />
            Active Hub
          </span>
        </div>

        {/* Code & Telemetry Live Assessment Card */}
        <div className="bg-black/90 rounded-2xl p-4 border border-zinc-800/90 font-mono text-[11px] text-zinc-300 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-900 pb-2">
            <div className="flex items-center gap-1.5 font-sans">
              <Terminal size={14} className="text-violet-400" />
              <span className="text-xs font-bold text-white">Stage 1 & 2 Live Engine</span>
            </div>
            <span className="text-emerald-400 text-[10px] font-mono">100% Bias-Free</span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="text-violet-300 font-semibold flex items-center justify-between">
              <span>Candidate: Alex Rivera</span>
              <span className="text-emerald-400 text-[10px]">Verified ✓</span>
            </div>
            <div className="text-zinc-400 text-[10px]">Role: Senior Fullstack Engineer</div>
          </div>

          {/* Dynamic Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-violet-950/80 text-violet-300 px-2 py-0.5 rounded border border-violet-800/40 text-[10px] font-sans">React</span>
            <span className="bg-violet-950/80 text-violet-300 px-2 py-0.5 rounded border border-violet-800/40 text-[10px] font-sans">Node.js</span>
            <span className="bg-violet-950/80 text-violet-300 px-2 py-0.5 rounded border border-violet-800/40 text-[10px] font-sans">System Design</span>
          </div>

          {/* Live Animated Metric */}
          <div className="space-y-1.5 pt-1 border-t border-zinc-900">
            <div className="flex justify-between text-[10px] text-zinc-400 font-sans">
              <span>Overall Evaluation Score</span>
              <span className="text-emerald-400 font-bold">94% (Exceptional)</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                animate={{ width: ["50%", "94%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Layer Card 1: Top Left (Company Delegation) */}
      <motion.div 
        animate={{ y: [0, -14, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1 -left-2 md:-left-8 z-30 bg-zinc-900/95 border border-violet-500/40 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3 w-56"
      >
        <div className="w-10 h-10 rounded-xl bg-violet-600/25 border border-violet-500/50 flex items-center justify-center text-violet-300 shrink-0">
          <Building2 size={20} />
        </div>
        <div>
          <div className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">Company Delegation</div>
          <div className="text-xs font-extrabold text-white">Acme Corp → 12 Slots</div>
          <div className="text-[10px] text-zinc-400">Zero Internal Phone Screens</div>
        </div>
      </motion.div>

      {/* Floating 3D Layer Card 2: Top Right (Senior Evaluator Match) */}
      <motion.div 
        animate={{ y: [0, 14, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-8 -right-2 md:-right-8 z-30 bg-zinc-900/95 border border-emerald-500/40 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3 w-60"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
          <UserCheck size={20} />
        </div>
        <div>
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Vetted Senior Evaluator</div>
          <div className="text-xs font-extrabold text-white">Sarah Chen (Staff Lead)</div>
          <div className="text-[10px] text-amber-400 font-semibold">★ 4.9 Rating • 6+ Yrs Exp</div>
        </div>
      </motion.div>

      {/* Floating 3D Layer Card 3: Bottom Center (Verified Scorecard Verdict) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        className="absolute -bottom-4 z-30 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border border-emerald-500/60 p-4 rounded-2xl shadow-[0_15px_40px_rgba(16,185,129,0.15)] backdrop-blur-2xl flex items-center justify-between gap-4 w-72 md:w-80"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
            <Award size={20} />
          </div>
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Actionable Hiring Verdict</div>
            <div className="text-xs font-black text-white">RECOMMENDED FOR HIRE</div>
            <div className="text-[10px] text-zinc-400">Scorecard & Video Replay Ready</div>
          </div>
        </div>
        <CheckCircle2 className="text-emerald-400 shrink-0 animate-pulse" size={22} />
      </motion.div>
    </div>
  );
}
