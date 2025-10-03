"use client"
import React, { useState } from 'react';
import { Mail, ArrowRight,  } from 'lucide-react';

import { useSendForgotPasswordOtpRequest } from '@/hooks/api/useAuth';
import {  useSearchParams } from 'next/navigation';
import {  HashLoader } from 'react-spinners';
import { errorToast, successToast } from '@/utils/customToast';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const {loading,sendForgotPasswordOtpRequest}=useSendForgotPasswordOtpRequest()
  const role=useSearchParams().get('role')

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      errorToast('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorToast('Please enter a valid email address');
      return;
    }
  const response= await  sendForgotPasswordOtpRequest(email,role!);

     if(!response.success){
        errorToast(response.message)
        return;
     }
     
     successToast(response.message)
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="border border-violet-950 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-violet-200 text-center mb-2">Forgot Password?</h1>
        <p className="text-violet-200 text-center mb-8">
          Enter your email to receive a verification code (OTP)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-violet-200 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-black/80 text-violet-200 outline-none border-2 border-violet-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400" size={20} />
            </div>
          </div>

          <button
           disabled={loading}
            type="submit"
            className="w-full bg-violet-600 text-violet-200 py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-200 font-medium flex items-center justify-center gap-2"

          >
            {loading?<HashLoader size={24} color='white' className='text-center'/>:<>
              Send Verification Code...
              <ArrowRight size={18} />
            </> }
          </button>

          <div className="text-sm text-violet-200 text-bold space-y-4 bg-violet-500 p-4 rounded-lg">
            <h3 className="font-medium text-violet-200">What happens next?</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>We&apos;ll verify if your email exists in our system</li>
              <li>If found, we&apos;ll send you a 6-digit verification code (OTP)</li>
              <li>Use the code to verify your identity and reset your password</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;