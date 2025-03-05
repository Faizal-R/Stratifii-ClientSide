


"use client"

import React, { useState } from 'react';
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
  Award,
  Building2,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function LandingPage() {
  const [isLoading,setIsLoading]=useState(false)
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
            <Link href={"/signin"} className="text-violet-200 hover:text-white transition"> SignIn</Link>
            <button disabled={isLoading} onClick={()=>{
                setIsLoading(true)
              toast("welcome to register Page")
            }
            } className="bg-violet-700 hover:bg-violet-600 px-5 py-2 rounded-lg font-medium transition">
             {isLoading?"Loading...":"Get Started"}
            </button>
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
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
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
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80" 
                  alt="Technical Interview" 
                  // layout='intrinsic'
                  width={600}
                  height={250}
                  // fill
                  className="rounded-xl border border-violet-900/30 shadow-2xl shadow-violet-900/20 relative z-10"
                />
                <div className="absolute -bottom-5 -right-5 bg-black/80 border border-violet-900/50 p-4 rounded-lg shadow-lg z-20">
                  <div className="flex items-center space-x-3">
                    <div className="bg-violet-900/30 p-2 rounded-full">
                      <Award className="text-violet-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Trusted by</p>
                      <p className="text-xs text-violet-300">Fortune 500 Companies</p>
                    </div>
                  </div>
                </div>
              </div>
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
      <footer className="bg-black border-t border-violet-900/30 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="text-violet-400" size={24} />
                <span className="text-xl font-bold">InterviewPro</span>
              </div>
              <p className="text-violet-200 mb-4">
                Revolutionizing technical interviews for modern engineering teams.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647 .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Features</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Case Studies</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Reviews</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-violet-200 hover:text-white transition">About</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Careers</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Press</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Partners</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Help Center</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="#" className="text-violet-200 hover:text-white transition">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-violet-900/30 pt-8 text-center">
            <p className="text-violet-300 text-sm">
              © {new Date().getFullYear()} InterviewPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
