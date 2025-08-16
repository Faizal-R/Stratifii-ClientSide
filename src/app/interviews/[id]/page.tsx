"use client"
import RoomPage from '@/components/features/common/interview/Room'
import { useSocketStore } from '@/features/socket/Socket'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'


const InterviewRoom = () => {
    const {socket}=useSocketStore()
    const {id:interviewId}=useParams()
    const room=useSearchParams().get("room") as string
  return (
   <RoomPage socket={socket} room={room as string} interviewId={interviewId as string}  />
  )
}

export default InterviewRoom