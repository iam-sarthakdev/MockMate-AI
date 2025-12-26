"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { AgentProps } from '../types';
import { useRouter } from 'next/navigation';
import { vapi } from '../lib/vapi';
import { cn } from '../lib/utils';
import { interviewer } from '../constants';
import { createFeedBack } from '../lib/action';
import { toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Video, Volume2, Sparkles } from 'lucide-react';
import { HeroBackground } from './ui/HeroBackground';
import { AudioVisualizer } from './AudioVisualizer';
import { Confetti } from './Confetti';
import { LiveMetricsPanel } from './LiveMetricsPanel';
import { HintsSystem } from './HintsSystem';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED"
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string
}

const Agent = ({ userName, userId, type, interviewId, questions, interviewMode = 'behavioral', isPracticeMode = true }: AgentProps) => {

  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10; // Can be dynamic based on interview type

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {

    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage]);
      }
    }

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error)

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    //clean up function
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    }
  }, [])

  // Timer for elapsed time
  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callStatus]);


  //------------------------------------------------------------------------------------------------------------------------------------------------
  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("Generate Feedback here");

    //mock message
    const { success, feedbackId } = await createFeedBack({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages
    })

    if (success && interviewId) {
      router.push(`/interview/${interviewId}/feedback`)
    } else {
      console.log("Error saving feedback");
      toast.error("Failed to generate feedback. Please try again.");
      router.push("/");
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------

  //after the call ends, take the user back to the home page so that they can see their fully generated interview
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      //generate the interview and push the user to the home page
      if (type === "generate") {
        router.push('/');
      } else {
        handleGenerateFeedback(messages);
      }
    }

  }, [messages, callStatus, type, userId]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //start the call function
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    console.log("Sending to VAPI:", { username: userName, userid: userId });

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          username: userName,
          userid: userId
        }
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions.map((question: string) => `-${question}`).join('\n');
      }
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions
        }
      })
    }
  }

  //disconnecting the call
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    setShowConfetti(true);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <div className="relative w-full mx-auto flex gap-6 min-h-[600px]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Dynamic Background for this Component */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {callStatus === CallStatus.ACTIVE && (
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-blue-900/10 rounded-full blur-[100px]"
            />
          )}
        </div>

        {/* Avatar Stage */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center relative z-10 w-full mb-12">

          {/* AI Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Pulse Rings */}
              {isSpeaking && (
                <>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                  />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full border border-blue-400/50"
                  />
                </>
              )}

              {/* Avatar Image */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500/30 bg-black/50 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Image src="/ai-avatar.png" alt="AI Interviewer" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Dynamic Status Icon */}
              <motion.div
                animate={isSpeaking ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-3 shadow-xl border border-white/10"
              >
                {isSpeaking ? <Volume2 className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-blue-100 flex items-center gap-2">
              AI Interviewer
              {callStatus === CallStatus.ACTIVE && <span className="flex w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </h3>
          </div>

          {/* Visualizer / Connector */}
          <div className="hidden md:flex flex-col items-center gap-2 w-32">
            {callStatus === CallStatus.ACTIVE ? (
              <div className="flex items-center gap-1 h-12">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: isSpeaking ? [10, 32, 10] : 4 }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  />
                ))}
              </div>
            ) : (
              <div className="h-[2px] w-full bg-white/10 rounded-full" />
            )}
          </div>

          {/* User Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-purple-500/50 transition-colors bg-black/50">
                <Image src="/user-avatar.png" alt="User" fill className="object-cover" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-300">{userName}</h3>
          </div>

        </div>

        {/* Audio Visualizer */}
        {callStatus === CallStatus.ACTIVE && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <div className="glass-panel-strong p-6 rounded-2xl">
              <AudioVisualizer isSpeaking={isSpeaking} isActive={callStatus === CallStatus.ACTIVE} />
            </div>
          </motion.div>
        )}


        {/* Live Transcript / Status Message */}
        <AnimatePresence mode="wait">
          {messages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center mb-10 min-h-[100px] flex items-center justify-center"
            >
              <p className="text-lg md:text-xl font-light text-blue-100/90 leading-relaxed">
                "{latestMessage}"
              </p>
            </motion.div>
          ) : (
            <div className="h-[100px] flex items-center justify-center text-gray-500 mb-10">
              {callStatus === CallStatus.ACTIVE ? "Listening..." : "Ready to start interview"}
            </div>
          )}
        </AnimatePresence>


        {/* Interactive Control Dock */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCall}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-blue-500/25 flex items-center gap-3"
            >
              <Mic className="w-5 h-5" />
              {callStatus === CallStatus.FINISHED ? "Start New Interview" : "Start Interview"}
            </motion.button>
          ) : (
            <div className="flex items-center gap-4 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={cn(
                  "p-4 rounded-full transition-all duration-200",
                  isMicOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500/20 text-red-500"
                )}
              >
                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              {callStatus === CallStatus.CONNECTING && (
                <div className="px-6 text-sm font-mono text-blue-300 animate-pulse">
                  CONNECTING...
                </div>
              )}

              <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 cursor-not-allowed">
                <Video className="w-6 h-6" />
              </button>

              <button
                onClick={handleDisconnect}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Confetti on interview completion */}
        {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      </div>

      {/* Sidebar: Live Metrics Panel (only show during active call) */}
      {callStatus === CallStatus.ACTIVE && (
        <div className="hidden lg:block w-80 flex-shrink-0">
          <LiveMetricsPanel
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            elapsedTime={elapsedTime}
            isPracticeMode={isPracticeMode || false}
          />
        </div>
      )}

      {/* Hints System (only in practice mode) */}
      {isPracticeMode && callStatus === CallStatus.ACTIVE && (
        <HintsSystem
          currentQuestion={latestMessage || "Current question"}
          isPracticeMode={isPracticeMode}
          onHintUsed={() => console.log('Hint used')}
        />
      )}
    </div>
  );
};

export default Agent;
