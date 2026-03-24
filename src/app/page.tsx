


"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { 
  BrainCog, 
  Video, 
  Target, 
  Laptop2, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
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
  Sparkles,
  Search,
  Users2,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/features/auth/authStore';
import { useRouter } from 'next/navigation';
import OrbitingSkills from '@/components/ui/Orbiting/Orbiting';
import { Roles } from '@/constants/enums/roles';

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-violet-900/30 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-violet-600 p-1.5 rounded-lg group-hover:bg-violet-500 transition-colors">
            <Globe className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Stratifii</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="#features" className="text-violet-200/70 hover:text-white transition-colors text-sm font-medium">Features</Link>
          <Link href="#pipeline" className="text-violet-200/70 hover:text-white transition-colors text-sm font-medium">Pipeline</Link>
          <Link href="#pricing" className="text-violet-200/70 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
          <div className="h-4 w-[1px] bg-violet-900/40 mx-2" />
          <Link href="/signin" className="text-white hover:text-violet-400 transition-colors text-sm font-medium">Sign In</Link>
          <Link href="/register/company" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-violet-600/20 active:scale-95">
            Get Started
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-violet-200 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-violet-900/30 py-6 px-6 flex flex-col space-y-4 md:hidden backdrop-blur-xl"
          >
            <Link href="#features" className="text-violet-200 text-lg py-2 border-b border-violet-900/10" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#pipeline" className="text-violet-200 text-lg py-2 border-b border-violet-900/10" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
            <Link href="#pricing" className="text-violet-200 text-lg py-2 border-b border-violet-900/10" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/signin" className="w-full text-center py-3 text-white border border-violet-900/50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link href="/register/company" className="w-full text-center py-3 bg-violet-600 text-white rounded-xl font-semibold" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group relative p-8 rounded-3xl bg-violet-950/5 border border-violet-900/20 hover:border-violet-500/40 transition-all duration-500 hover:bg-violet-950/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-violet-900/20 rounded-2xl flex items-center justify-center mb-6 border border-violet-700/20 group-hover:scale-110 group-hover:bg-violet-600/20 transition-all duration-500">
        <Icon className="text-violet-400 group-hover:text-violet-300 transition-colors" size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-100 transition-colors">{title}</h3>
      <p className="text-violet-200/60 leading-relaxed text-sm group-hover:text-violet-200/80 transition-colors">
        {description}
      </p>
    </div>
  </motion.div>
);

const PipelineStep = ({ number, title, description, icon: Icon }: any) => (
  <div className="relative flex flex-col items-center text-center px-4">
    <div className="w-16 h-16 rounded-full bg-violet-600/10 border border-violet-600/40 flex items-center justify-center mb-6 relative z-10 backdrop-blur-sm group-hover:scale-110 transition-transform">
      <Icon className="text-violet-400" size={24} />
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">
        {number}
      </div>
    </div>
    <h4 className="text-lg font-bold mb-2 text-white">{title}</h4>
    <p className="text-violet-300/60 text-sm max-w-[200px]">{description}</p>
  </div>
);

// --- Main Page ---

import SubscriptionCard from '@/components/ui/SubscriptionCard';
import { ISubscription } from '@/types/ISubscription';
import { LANDING_SUBSCRIPTION_PLANS } from '@/constants/subscriptions';

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
      
      {/* Background Noise & Drifting Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-[#000] opacity-100" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        
        {/* Drifting Blobs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"
        />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-950/30 border border-violet-800/50 text-violet-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-inner"
              >
                <Sparkles size={14} className="mr-2 text-violet-400 animate-pulse" />
                Next-Gen Interview Outsourcing
              </motion.div>
              
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tight text-white">
                Delegate Your <br />
                <span className="text-gradient">Tech Vetting.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-violet-200/40 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light italic">
                Companies don&apos;t just screen — they delegate. Stratifii provides a structured, high-precision evaluation funnel for your IT roles.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link href="/register/company" className="group relative px-12 py-5 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-white transition-all shadow-2xl shadow-violet-600/40 hover:scale-[1.03] active:scale-95 flex items-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Delegate Now
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-500" size={20} />
                </Link>
                
                <Link href="/register/interviewer" className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 rounded-2xl font-black text-white transition-all backdrop-blur-md flex items-center group">
                  Join Ecosystem
                  <div className="ml-2 w-2 h-2 rounded-full bg-violet-400 group-hover:scale-150 transition-transform duration-500 shadow-[0_0_10px_#a78bfa]" />
                </Link>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-10 opacity-20 grayscale"
              >
                <div className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">Scale-ups</div>
                <div className="w-1 h-1 rounded-full bg-violet-500" />
                <div className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">Agencies</div>
                <div className="w-1 h-1 rounded-full bg-violet-500" />
                <div className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">Enterprise</div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 h-[600px] flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-violet-600/10 rounded-full border border-violet-500/10 scale-125 -z-10 blur-3xl animate-pulse" />
              <OrbitingSkills />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-32 relative px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Bespoke Evaluation Labs</h2>
            <p className="text-violet-200/40 max-w-2xl mx-auto text-lg md:text-xl font-light italic">
              Experience a premium delegation workflow. We are more than a platform — we are your precision hiring partner.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <FeatureCard 
              icon={Layers}
              title="Global Delegation"
              description="Seamlessly assign your software engineering, DevOps, and mobile candidates. We manage the high-stakes evaluation journey."
            />
            <FeatureCard 
              icon={BrainCog}
              title="AI Mock Sentinel"
              description="A multi-agent AI environment that challenges candidates with role-specific MCQs, ensuring only the elite pass the gate."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Expert Verifiers"
              description="Industry veterans from our ecosystem engage candidates in deep-dive technical sessions with real-time feedback."
            />
            <FeatureCard 
              icon={LayoutDashboard}
              title="Precision Analytics"
              description="Deep metrics beyond simple scores. Understand the strengths, weaknesses, and potential of every delegated profile."
            />
            <FeatureCard 
              icon={Wallet}
              title="Integrated Economy"
              description="A transparent reward system for our experts. Controlled quality via an assigned, not open, professional network."
            />
            <FeatureCard 
              icon={Zap}
              title="Scalable Logic"
              description="Whether you delegate 10 or 1,000 interviews, our infrastructure maintains consistency and speed without compromise."
            />
          </motion.div>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section id="pipeline" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-violet-900/20 rounded-[60px] p-12 md:p-32 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.02]" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px]" />
            
            <div className="flex flex-col lg:flex-row items-center gap-24 relative z-10">
              <div className="lg:w-2/5">
                <h2 className="text-5xl font-black mb-10 leading-[1.1]">The Delegation <br /><span className="text-violet-500">Mastery</span></h2>
                <p className="text-xl text-violet-200/40 mb-12 font-light italic leading-relaxed">
                  We specialize exclusively in IT roles. You provide the candidates; our infrastructure provides the technical truth.
                </p>
                <div className="space-y-6">
                  {["IT-Specific Benchmarking", "No-Portal Experience", "Expert-led Decisioning"].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center text-lg font-black text-white group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center mr-4 group-hover:bg-violet-600 transition-colors">
                        <CheckCircle size={14} className="text-violet-400 group-hover:text-white" />
                      </div>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-12">
                <PipelineStep 
                  number="01"
                  icon={Users2}
                  title="Onboard"
                  description="Company delegates candidates to specific job slots via dashboard."
                />
                <PipelineStep 
                  number="02"
                  icon={Zap}
                  title="Verify"
                  description="Candidates survive the AI-driven technical mock screening round."
                />
                <PipelineStep 
                  number="03"
                  icon={Award}
                  title="Verdict"
                  description="Final expert evaluation and structured decision report delivered."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">Premium Tiers</h2>
            <p className="text-violet-200/40 max-w-2xl mx-auto text-lg md:text-xl font-light italic">
              Scale your evaluation capability effortlessly.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-center">
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

      {/* Final CTA */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter leading-none">Delegate Now. <br /><span className="text-violet-800">No Portal needed.</span></h2>
            <Link href="/register/company" className="inline-flex px-16 py-6 bg-white text-black rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Partner with Stratifii
            </Link>
            <div className="mt-12 flex items-center justify-center gap-10 opacity-30 grayscale grayscale-0">
               <ShieldCheck size={24} className="text-violet-500" />
               <p className="text-sm font-black uppercase tracking-[0.2em]">The IT Standards Board Selection</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-2 rounded-2xl group-hover:rotate-[360deg] transition-transform duration-1000">
                <Globe className="text-black" size={24} />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Stratifii.</span>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-violet-200/20">
              <Link href="#" className="hover:text-white transition-colors">Legal</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Manifesto</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-violet-200/10 italic">© 2026 Stratifii Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;