
"use client"
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
    const {user}=useAuthStore()
    const router=useRouter()
    useEffect(() => {
        if(user){
          router.push(`/${user.role}`);
        }
      },[user,router])
  return (
  <div>
    {children}
  </div>
  )
}

export default layout