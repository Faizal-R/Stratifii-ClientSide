


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
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/features/auth/authStore';
import { useRouter } from 'next/navigation';
import OrbitingSkills from '@/components/ui/Orbiting/Orbiting';
import { Roles } from '@/constants/enums/roles';
function LandingPage() {
const {user}=useAuthStore();
const router=useRouter();
useEffect(()=>{
  if(user){
    if(user.role === Roles.INTERVIEWER){
      router.push(`/${user.role}/profile`);
    }else router.push(`/${user.role}/dashboard`);
  }
},[user,router])
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-black/90 border-b border-violet-900/30 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="text-violet-400" size={28} />
            <span className="text-xl font-bold">Stratifii</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-violet-200 hover:text-white transition">Features</Link>
            <Link href="#how-it-works" className="text-violet-200 hover:text-white transition">How It Works</Link>
            <Link href="#pricing" className="text-violet-200 hover:text-white transition">Pricing</Link>
            <Link href={'/signin'}
             className="bg-violet-900 hover:bg-violet-950 px-5 py-2 rounded-lg font-medium transition">
             SignIn
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-violet-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-violet-900/30 py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link href="/signin" className="text-violet-200 hover:text-white py-2 transition">SignIn</Link>
            <Link href="#features" className="text-violet-200 hover:text-white py-2 transition">Features</Link>
            <Link href="#how-it-works" className="text-violet-200 hover:text-white py-2 transition">How It Works</Link>
            <Link href="#testimonials" className="text-violet-200 hover:text-white py-2 transition">Testimonials</Link>
            <Link href="#pricing" className="text-violet-200 hover:text-white py-2 transition">Pricing</Link>
            <button className="bg-violet-700 hover:bg-violet-600 px-5 py-2 rounded-lg font-medium transition w-full">
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 md:py-28 px-6 bg-gradient-to-br from-black via-black to-violet-950/30">
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 ml-5 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Revolutionize Your <span className="text-violet-400">Tech Hiring</span> Process
              </h1>
              <p className="text-xl text-violet-200 mb-8 max-w-lg">
                Our AI-powered platform streamlines technical interviews, saving you time and ensuring you find the best talent for your team.
              </p>

              <div className="mt-12 flex flex-col md:flex-row  gap-6">
            <Link className="group relative inline-flex items-center justify-center px-8 py-4 bg-black/80 text-white border border-violet-900/50 rounded-lg shadow-lg hover:bg-violet-950/100 transition-all duration-300 overflow-hidden" href={'/register/company'}>
              <Building2 className="mr-2 h-5 w-5" />
              <span className="font-medium text-lg">Register as Company</span>
              <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
            </Link>
            
            <Link href={'/register/interviewer'} className="group relative inline-flex items-center justify-center px-8 py-4 bg-black/80 text-white border-2 border-violet-900/50 rounded-lg shadow-md hover:bg-violet-950/100 transition-all duration-300">
              <Users className="mr-2 h-5 w-5" />
              <span className="font-medium text-lg">Register as Interviewer</span>
              <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
            </Link>
          </div>
             
            </div>
             <div className="md:w-1/2">
              <OrbitingSkills/>
             </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-violet-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-violet-300 text-sm uppercase tracking-wider">Trusted by industry leaders</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
              <div key={company} className="opacity-70 hover:opacity-100 transition">
                <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent">
                  {company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-violet-950/30 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-violet-200 max-w-2xl mx-auto">
              Our platform offers everything you need to streamline your technical interview process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl hover:border-violet-700/50 transition group hover:bg-gradient-to-br hover:from-black hover:to-violet-950/40">
              <div className="bg-violet-900/20 p-3 rounded-lg inline-block mb-4 group-hover:bg-violet-900/40 transition">
                <BrainCog className="text-violet-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Interviews</h3>
              <p className="text-violet-200">
                Leverage AI to conduct initial screening interviews and get detailed candidate insights.
              </p>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl hover:border-violet-700/50 transition group hover:bg-gradient-to-br hover:from-black hover:to-violet-950/40">
              <div className="bg-violet-900/20 p-3 rounded-lg inline-block mb-4 group-hover:bg-violet-900/40 transition">
                <Video className="text-violet-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Video Calls</h3>
              <p className="text-violet-200">
                Built-in video conferencing with recording capabilities for later review.
              </p>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl hover:border-violet-700/50 transition group hover:bg-gradient-to-br hover:from-black hover:to-violet-950/40">
              <div className="bg-violet-900/20 p-3 rounded-lg inline-block mb-4 group-hover:bg-violet-900/40 transition">
                <Target className="text-violet-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Assessment</h3>
              <p className="text-violet-200">
                Comprehensive technical interviews and practical coding challenges.
              </p>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl hover:border-violet-700/50 transition group hover:bg-gradient-to-br hover:from-black hover:to-violet-950/40">
              <div className="bg-violet-900/20 p-3 rounded-lg inline-block mb-4 group-hover:bg-violet-900/40 transition">
                <Laptop2 className="text-violet-400" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Collaboration</h3>
              <p className="text-violet-200">
                Interactive coding environments for real-time technical assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code Environment Section */}
   

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-violet-200 max-w-2xl mx-auto">
              Our streamlined process makes technical interviews efficient and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-violet-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-700/30">
                <span className="text-2xl font-bold text-violet-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Interview</h3>
              <p className="text-violet-200">
                Set up custom interview templates with specific technical requirements and questions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-violet-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-700/30">
                <span className="text-2xl font-bold text-violet-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Invite Candidates</h3>
              <p className="text-violet-200">
                Send automated invitations to candidates with all necessary details and preparation materials.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-violet-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-700/30">
                <span className="text-2xl font-bold text-violet-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Evaluate & Decide</h3>
              <p className="text-violet-200">
                Review comprehensive reports and AI-generated insights to make informed hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
   

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-violet-950/30 to-black px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">85%</p>
              <p className="text-violet-300">Time Saved</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">3.5x</p>
              <p className="text-violet-300">Hiring Efficiency</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">92%</p>
              <p className="text-violet-300">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">10k+</p>
              <p className="text-violet-300">Interviews Conducted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-violet-200 max-w-2xl mx-auto">
              Hear from companies that have transformed their hiring process with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&auto=format&fit=crop&crop=face" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  width={60}
                  height={60}
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-violet-300 text-sm">CTO, TechGrowth</p>
                </div>
              </div>
              <p className="text-violet-200">
                This platform has completely transformed our technical hiring process. We&apos; ve reduced our time-to-hire by 70% while improving the quality of our engineering team.
              </p>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&auto=format&fit=crop&crop=face" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  width={60}
                  height={60}
                />
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-violet-300 text-sm">HR Director, CloudSystems</p>
                </div>
              </div>
              <p className="text-violet-200">
                The AI-powered insights have been game-changing for our interview process. We can now objectively evaluate technical skills and make better hiring decisions.
              </p>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&auto=format&fit=crop&crop=face" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  width={60}
                  height={60}
                />
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-violet-300 text-sm">Founder, DevHire</p>
                </div>
              </div>
              <p className="text-violet-200">
                As a tech recruiting agency, we&aposve tried every platform out there. This is by far the most comprehensive solution for technical interviews we&apos;ve found.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20  px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-violet-200 max-w-2xl mx-auto">
              Choose the plan that works best for your team&apos;s needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-black/80 border border-violet-900/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-violet-300 mb-6">For small teams getting started</p>
              <p className="text-4xl font-bold mb-6">$99<span className="text-violet-300 text-lg font-normal">/month</span></p>
              
              <ul className="space-y-3 mb-8">
                {['Up to 10 interviews/month', 'Basic AI assessments', 'Video interviews', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="text-violet-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-violet-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-black border border-violet-700 hover:bg-violet-900/20 px-6 py-3 rounded-lg font-semibold transition">
                Get Started
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-violet-950/50 to-black p-8 rounded-xl border border-violet-700/50 transform md:-translate-y-4 shadow-xl shadow-violet-900/20">
              <div className="bg-violet-700 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-2">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <p className="text-violet-300 mb-6">For growing engineering teams</p>
              <p className="text-4xl font-bold mb-6">$249<span className="text-violet-300 text-lg font-normal">/month</span></p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Up to 50 interviews/month', 
                  'Advanced AI assessments', 
                  'Video interviews with recording', 
                  'Live coding environments',
                  'Team collaboration',
                  'Priority support'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="text-violet-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-violet-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-violet-700 hover:bg-violet-600 px-6 py-3 rounded-lg font-semibold transition">
                Get Started
              </button>
            </div>
            
            <div className="bg-black/80 border border-violet-900/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-violet-300 mb-6">For large organizations</p>
              <p className="text-4xl font-bold mb-6">Custom<span className="text-violet-300 text-lg font-normal"> pricing</span></p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited interviews', 
                  'Custom AI models', 
                  'Advanced analytics', 
                  'API access',
                  'SSO integration',
                  'Dedicated account manager'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="text-violet-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-violet-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-black border border-violet-700 hover:bg-violet-900/20 px-6 py-3 rounded-lg font-semibold transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-black via-black to-violet-950 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl text-violet-200 max-w-2xl mx-auto mb-8">
            Join hundreds of companies that have streamlined their technical interviews with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold transition">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-black/80 border border-violet-900/50 rounded-lg font-semibold hover:bg-violet-950 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}

export default LandingPage;