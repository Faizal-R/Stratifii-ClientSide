"use client"
import { Roles } from '@/constants/roles'
import { useAuthStore } from '@/features/auth/authStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CandidateDashboard = () => {
  const router=useRouter()
  const user=useAuthStore((state)=>state.user)
  useEffect(()=>{
      if(!user || user.role!==Roles.CANDIDATE){
        router.push('/signin')
        return
      }
  },[router,user])
  return (
    <div className="text-white text-4xl">CandidateDashboard</div>
  )
}

export default CandidateDashboard