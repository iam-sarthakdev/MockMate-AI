"use client";

import { motion } from 'framer-motion';
import { Calendar, Clock, Award, TrendingUp, Code, MessageSquare, Target } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Interview {
    _id: string;
    role: string;
    interviewType: string;
    score?: number;
    createdAt: Date;
    duration?: number;
    feedback?: any;
}

interface InterviewTimelineProps {
    interviews: Interview[];
}

const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 75) return 'from-blue-500 to-cyan-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
};

const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 75) return 'bg-blue-500/20 border-blue-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
};

const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'technical':
            return <Code className="w-5 h-5" />;
        case 'behavioral':
            return <MessageSquare className="w-5 h-5" />;
        case 'system design':
            return <Target className="w-5 h-5" />;
        default:
            return <MessageSquare className="w-5 h-5" />;
    }
};

export const InterviewTimeline = ({ interviews }: InterviewTimelineProps) => {
    if (!interviews || interviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No interviews yet</h3>
                <p className="text-gray-400">Start your first interview and begin your journey to success!</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-8">
                {interviews.map((interview, index) => {
                    const score = interview.feedback?.overallScore || interview.score || 0;

                    return (
                        <motion.div
                            key={interview._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex gap-6 md:gap-8"
                        >
                            {/* Timeline Dot */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${getScoreColor(score)} ring-4 ring-black relative z-10`}
                                />
                            </div>

                            {/* Interview Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, translateX: 5 }}
                                className="flex-1 glass-panel-strong p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    {/* Left Side - Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                                {getIcon(interview.interviewType)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {interview.role}
                                                </h3>
                                                <p className="text-sm text-gray-400 capitalize">{interview.interviewType}</p>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDistanceToNow(new Date(interview.createdAt), { addSuffix: true })}</span>
                                            </div>
                                            {interview.duration && (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{Math.round(interview.duration / 60)} min</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Feedback Highlights */}
                                        {interview.feedback && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                                                    <TrendingUp className="w-3 h-3" />
                                                    Strong Communication
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                                    Technical Knowledge
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Side - Score Badge */}
                                    <div className={`flex-shrink-0 ${getScoreBg(score)} border rounded-xl p-4 text-center min-w-[100px]`}>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Award className="w-4 h-4 text-white" />
                                        </div>
                                        <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getScoreColor(score)}`}>
                                            {score}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">Score</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
