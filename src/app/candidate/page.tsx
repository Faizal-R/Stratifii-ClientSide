"use client"
import { Roles } from '@/constants/roles'
import { useAuthStore } from '@/stores/authStore'
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
    <div className="text-white">CandidateDashboard</div>
  )
}

export default CandidateDashboard