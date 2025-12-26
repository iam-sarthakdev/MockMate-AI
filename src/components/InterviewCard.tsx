"use client";

import React from 'react'
import dayjs from "dayjs"
import Image from 'next/image';
import { getRandomInterviewCover } from '../lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
import { InterviewCardProps } from '../types';
import { FeedbackType } from '../types';
import { getFeedbackByInterviewId } from '../lib/action';
import { motion } from 'framer-motion';
import { Calendar, Star, TrendingUp, CheckCircle2 } from 'lucide-react';

const InterviewCard = async ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {

  const feedback = userId && interviewId ? await getFeedbackByInterviewId({ interviewId, userId }) : null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt?.toString() || Date.now()).format("DD/MM/YYYY");

  const score = feedback?.totalScore || 0;
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const hasFeedback = !!feedback;

  return (
    <div className="relative group w-90 max-sm:w-full min-h-96 m-3 rounded-2xl perspective-1000">
      {/* Card Inner with flip effect */}
      <div className="relative w-full h-full transition-all duration-500">
        {/* Front of Card */}
        <div className={`
          relative bg-gradient-to-br from-[#0B0F24] to-[#151933] 
          rounded-2xl overflow-hidden
          border border-white/10
          transition-all duration-300 
          hover:-translate-y-2 
          hover:shadow-[0_0_40px_8px_rgba(56,189,248,0.4)]
          hover:border-blue-500/50
        `}>
          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          <div className="card-interview relative z-10 p-6 space-y-4">
            {/* Type Badge */}
            <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-gradient-to-r from-blue-950 to-blue-900 border-l border-b border-blue-500/30">
              <p className="badge-text text-blue-300 font-semibold text-sm">{normalizedType}</p>
            </div>

            {/* Avatar with glow */}
            <div className="relative w-fit">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
              <Image
                src={getRandomInterviewCover()}
                alt="cover image"
                width={90}
                height={90}
                className="rounded-full object-cover size-[90px] border-2 border-blue-500/30 relative z-10"
              />
              {hasFeedback && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-[#0B0F24]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-5 capitalize text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {role} Interview
            </h3>

            {/* Metadata */}
            <div className="flex flex-row gap-5 mt-3">
              <div className="flex flex-row gap-2 items-center text-gray-400">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">{formattedDate}</p>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className={`text-sm font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {feedback?.totalScore || "---"}/100
                </p>
              </div>
            </div>

            {/* Score Progress Bar (if feedback exists) */}
            {hasFeedback && (
              <div className="mt-4">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${getScoreColor(score)} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  </motion.div>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="line-clamp-2 mt-5 text-gray-400 text-sm leading-relaxed">
              {feedback?.finalAssessment || "You're just one step away! Take the interview now and level up your skills."}
            </p>

            {/* Footer */}
            <div className="flex flex-row justify-between items-center pt-4 border-t border-white/5">
              <DisplayTechIcons techStack={techstack} />

              <Button className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all hover-scale-sm text-white border-0">
                <Link href={feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
                }>
                  {feedback ? (
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      View Feedback
                    </span>
                  ) : (
                    "Start Interview"
                  )}
                </Link>
              </Button>
            </div>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F24] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default InterviewCard
