"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Zap, Bot } from 'lucide-react';

const HOVER_QUOTES = [
  "🤖 Online & active! Tracking your cursor in the hero section!",
  "⚡ Stratifii Bot ready: High-precision code vetting active!",
  "👁️ Nice to meet you! Move your cursor anywhere in this section!"
];

const CLICK_FUNNY_REACTIONS = [
  "😂 Hey! Don't tickle my arc reactor core!",
  "💥 WHOA! You just gave me +1000% overclock boost!",
  "🤓 Fun Fact: I just analyzed 42 pull requests in 0.02 seconds!",
  "🤖 'Error 404: Sleep Not Found' — I work 24/7 so you don't have to!",
  "☕ *Sips Virtual Coffee* Ready to hire some elite senior leads?",
  "✨ You clicked me! You must really love clean code!"
];

interface InteractiveRobotProps {
  sectionMousePos?: { x: number; y: number };
  isSectionActive?: boolean;
}

export default function InteractiveRobot({ sectionMousePos, isSectionActive = true }: InteractiveRobotProps) {
  const [internalMousePos, setInternalMousePos] = useState({ x: 0, y: 0 });
  const [clickMessage, setClickMessage] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isClickBouncing, setIsClickBouncing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMouse = sectionMousePos || internalMousePos;

  // Mouse move handler inside container if props aren't provided
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionMousePos && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setInternalMousePos({ x, y });
    }
  };

  // Click on robot to trigger funny / awesome reactions
  const handleRobotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMsg = CLICK_FUNNY_REACTIONS[clickCount % CLICK_FUNNY_REACTIONS.length];
    setClickMessage(nextMsg);
    setClickCount((prev) => prev + 1);
    setIsClickBouncing(true);
    setTimeout(() => setIsClickBouncing(false), 500);
  };

  const headTiltX = isSectionActive ? activeMouse.y * 26 : 0;
  const headTiltY = isSectionActive ? activeMouse.x * 32 : 0;
  const bodyTiltX = isSectionActive ? activeMouse.y * 10 : 0;
  const bodyTiltY = isSectionActive ? activeMouse.x * 14 : 0;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center select-none cursor-pointer my-auto"
    >
      {/* Background Cyber Glow (Clean, No Orbital Circle Lines) */}
      <div className={`absolute w-96 h-96 rounded-full bg-gradient-to-tr from-violet-600/30 via-indigo-600/25 to-cyan-500/25 blur-[120px] transition-opacity duration-700 pointer-events-none ${isSectionActive ? 'opacity-100 animate-pulse' : 'opacity-40'}`} />

      {/* --- AWESOME DYNAMIC SPEECH BUBBLE (TOP OF ROBOT) --- */}
      <div className="relative z-40 mb-4 h-14 flex items-center justify-center w-full px-4">
        <AnimatePresence mode="wait">
          {clickMessage ? (
            <motion.div
              key={clickMessage}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="bg-gradient-to-r from-violet-950 via-zinc-900 to-cyan-950 border-2 border-cyan-400 text-cyan-200 text-xs md:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-xl flex items-center gap-2 max-w-lg text-center"
            >
              <Zap size={16} className="text-amber-400 shrink-0 animate-bounce" />
              <span>{clickMessage}</span>
            </motion.div>
          ) : isSectionActive ? (
            <motion.div
              key="hover-active"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900/90 border border-violet-500/50 text-violet-200 text-xs font-semibold px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.25)] backdrop-blur-md flex items-center gap-2 max-w-md text-center"
            >
              <Sparkles size={14} className="text-cyan-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{HOVER_QUOTES[clickCount % HOVER_QUOTES.length]} • <strong className="text-cyan-400">Click me!</strong></span>
            </motion.div>
          ) : (
            <motion.div
              key="idle-hint"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="bg-zinc-950/80 border border-zinc-800 text-zinc-400 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm"
            >
              <Bot size={14} className="text-violet-400 animate-pulse" />
              <span>Move mouse into right section to wake robot 🤖</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- ENLARGED 3D ROBOT MODEL (CLEAN CENTERED) --- */}
      <div 
        onClick={handleRobotClick}
        className="relative z-30 flex items-center justify-center w-96 h-96 md:w-[440px] md:h-[440px] hover:scale-[1.03] transition-transform duration-300 active:scale-95"
        style={{ perspective: "1200px" }}
      >
        {/* Main Stationary Forward 3D Body Frame */}
        <motion.div 
          animate={isClickBouncing ? { y: [-15, 0], scale: [1.08, 1] } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${-bodyTiltX}deg) rotateY(${bodyTiltY}deg)`
          }}
        >
          {/* --- ENLARGED ROBOT HEAD --- */}
          <motion.div 
            className="relative z-20 w-52 h-38 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-[36px] border-2 border-violet-500/70 shadow-[0_0_55px_rgba(139,92,246,0.55)] flex flex-col items-center justify-between p-4.5 transition-transform duration-75 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(50px) rotateX(${-headTiltX}deg) rotateY(${headTiltY}deg)`
            }}
          >
            {/* Top Glowing Antenna */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className={`w-4.5 h-4.5 rounded-full ${isSectionActive ? 'bg-cyan-300 shadow-[0_0_22px_#06b6d4]' : 'bg-violet-500 shadow-[0_0_12px_#a855f7]'} animate-pulse`} />
              <span className="w-0.5 h-4 bg-zinc-700" />
            </div>

            {/* Side Cyber Ear Caps */}
            <div className="absolute -left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-10 bg-violet-600/90 rounded-l-xl border border-violet-400/60" />
            <div className="absolute -right-4.5 top-1/2 -translate-y-1/2 w-4.5 h-10 bg-violet-600/90 rounded-r-xl border border-violet-400/60" />

            {/* Glowing Cyber Front Visor */}
            <div className="w-full h-20 bg-black/95 rounded-2xl border border-violet-500/60 p-2.5 flex items-center justify-around shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 via-cyan-900/30 to-violet-900/30 animate-pulse" />

              {/* Glowing Interactive Cyber Eyes */}
              <div className="relative z-10 flex items-center justify-around w-full px-3">
                <div 
                  className={`w-7 h-7 rounded-full ${isSectionActive ? 'bg-cyan-300 shadow-[0_0_22px_#06b6d4]' : 'bg-cyan-400/70 shadow-[0_0_12px_#22d3ee]'} transition-transform duration-75 flex items-center justify-center`}
                  style={{ transform: `translate(${activeMouse.x * 8}px, ${-activeMouse.y * 6}px)` }}
                >
                  <span className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div 
                  className={`w-7 h-7 rounded-full ${isSectionActive ? 'bg-cyan-300 shadow-[0_0_22px_#06b6d4]' : 'bg-cyan-400/70 shadow-[0_0_12px_#22d3ee]'} transition-transform duration-75 flex items-center justify-center`}
                  style={{ transform: `translate(${activeMouse.x * 8}px, ${-activeMouse.y * 6}px)` }}
                >
                  <span className="w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Mouth / Audio Pulse Line */}
            <div className="w-24 h-2 rounded-full bg-violet-500/40 flex items-center justify-center gap-1 overflow-hidden">
              <span className="w-2.5 h-full bg-cyan-400 animate-pulse" />
              <span className="w-2.5 h-full bg-violet-400 animate-pulse" />
              <span className="w-2.5 h-full bg-cyan-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Neck Joint */}
          <div className="w-14 h-4.5 bg-zinc-800 border-x border-violet-500/40 my-1 rounded-md" />

          {/* --- ENLARGED ROBOT CHEST & TORSO --- */}
          <div 
            className="relative z-10 w-64 h-56 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-[36px] border-2 border-violet-500/60 shadow-[0_0_60px_rgba(139,92,246,0.4)] p-5 flex flex-col items-center justify-between"
            style={{ transform: "translateZ(25px)" }}
          >
            {/* Header / Brand */}
            <div className="flex items-center justify-between w-full border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[12px] font-black text-white tracking-widest uppercase">STRATIFii BOT</span>
              </div>
              <span className="text-[10px] bg-violet-600/30 text-violet-300 font-bold px-2 py-0.5 rounded border border-violet-500/40">
                {isSectionActive ? "ACTIVE ⚡" : "IDLE"}
              </span>
            </div>

            {/* Central Stratifii Arc Reactor Core */}
            <div className="relative flex items-center justify-center my-1.5">
              <div className={`w-20 h-20 rounded-full border-2 border-cyan-400/60 flex items-center justify-center ${isSectionActive ? 'bg-cyan-500/30 shadow-[0_0_35px_#06b6d4]' : 'bg-violet-600/20 shadow-[0_0_18px_rgba(139,92,246,0.4)]'} animate-pulse`}>
                <Cpu size={36} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Lower Status Metrics */}
            <div className="w-full bg-black/80 rounded-xl p-2.5 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex justify-between items-center">
              <span>SECURITY: PROCTORED</span>
              <span className="text-emerald-400 font-bold">SCORE: 96%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
