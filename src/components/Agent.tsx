"use client";

import Image from 'next/image'
import { useState } from 'react';


enum CallStatus{
  INACTIVE="INACTIVE" ,
  CONNECTING="CONNECTING" ,
  ACTIVE="ACTIVE",
  FINISHED="FINISHED"
}



const Agent = ({userName}:AgentProps) => {
  const isSpeaking=false;
  const callStatus=CallStatus.FINISHED;
  const messages=[
    "what is your name",
    "my name is amber" ,
    "nice to meet you"
  ]
  const lastMessage=messages[messages.length-1];

  return (
  <>  
  <div className="flex flex-col justify-center items-center w-full ">
    <div className="flex gap-4 m-4 w-[70%] items-center">
        <div className="card-interviewer ">
            <div className="relative flex items-center justify-center">
              <Image src="/ai-avatar.png" alt="vapi" width={200} height={200} className="object-cover rounded-full"/>
                {isSpeaking && <span className="animate-speak"/>}
            </div>
            <h3>AI Interviewer</h3>
        </div>
        <div className="card-interviewer">
          <div className="relative flex items-center justify-center">
          <Image src="/user-avatar.png" alt="user avatar" width={200} height={200}className="object-cover rounded-full" />
          {isSpeaking && <span className="animate-speak"/>}
          </div>
          <h3>You{userName}</h3>
        </div>
         </div>
    
         
          
      {messages.length > 0 && (
  <div className="transcript-border w-[70%] m-2">
    <div className="transcript w-full">
      <p
        key={lastMessage}
        className="animate-fadeIn transition-opacity duration-500"
      >
        {lastMessage}
      </p>
    </div>
  </div>
  
)}


       {callStatus !== CallStatus.ACTIVE ? (
     <button className="relative btn-call">
      <span>
        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "Call" : "..."}
      </span>
     </button>   
       ):( 
        <button className="btn-disconnect">END</button>
       )}

      
  </div>
  </> 
  )
};

export default Agent;
