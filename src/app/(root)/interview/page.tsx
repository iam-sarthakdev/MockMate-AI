import React from 'react'
import Agent from '@/src/components/Agent'



const page = () => {
  return (
   <div className="min-h-screen flex flex-col items-center w-full p-3">
   <h3>Interview Generation</h3>
   <Agent userName="you" userId='user1' type="generate"/>
   </div>
  )
}

export default page
