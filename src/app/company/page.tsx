"use client"
import { Roles } from '@/constants/roles'
import withProtectedRoute from '@/lib/withProtectedRoutes'

import React from 'react'

const CompanyDashboard = () => {
  
  return (
    <div className='text-white ml-20'>CompanyDashboard</div>
  )
}

export default withProtectedRoute(CompanyDashboard,[Roles.COMPANY])