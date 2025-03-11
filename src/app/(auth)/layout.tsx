"use client"
import { Globe } from 'lucide-react'
import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
   <>
    {children}
    <footer className="bg-black border-t border-violet-900/30 py-8 px-6">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Globe className="text-violet-400" size={20} />
              <span className="text-lg font-bold text-violet-200">Stratifii</span>
            </div>
            <p className="text-violet-300 text-sm">
              © {new Date().getFullYear()} Stratifii. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
   </>
  )
}

export default AuthLayout