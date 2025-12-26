"use client";

import { motion } from 'framer-motion';
import { Trophy, Target, Flame, Crown, Star, Zap, Award, TrendingUp } from 'lucide-react';

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
    progress: number;
    earned: boolean;
}

interface AchievementBadgesProps {
    totalInterviews: number;
    averageScore: number;
    currentStreak: number;
}

export const AchievementBadges = ({ totalInterviews, averageScore, currentStreak }: AchievementBadgesProps) => {
    const badges: Badge[] = [
        {
            id: 'first_interview',
            name: 'First Steps',
            description: 'Complete your first interview',
            icon: Target,
            color: 'from-blue-500 to-cyan-500',
            progress: totalInterviews >= 1 ? 100 : 0,
            earned: totalInterviews >= 1
        },
        {
            id: 'perfect_score',
            name: 'Perfect Score',
            description: 'Score 100 in an interview',
            icon: Star,
            color: 'from-yellow-500 to-orange-500',
            progress: averageScore >= 100 ? 100 : Math.min(averageScore, 99),
            earned: averageScore >= 100
        },
        {
            id: 'week_streak',
            name: 'On Fire',
            description: 'Maintain a 7-day streak',
            icon: Flame,
            color: 'from-red-500 to-pink-500',
            progress: (currentStreak / 7) * 100,
            earned: currentStreak >= 7
        },
        {
            id: 'ten_interviews',
            name: 'Dedicated',
            description: 'Complete 10 interviews',
            icon: Trophy,
            color: 'from-green-500 to-emerald-500',
            progress: (totalInterviews / 10) * 100,
            earned: totalInterviews >= 10
        },
        {
            id: 'master',
            name: 'Interview Master',
            description: 'Complete 50 interviews',
            icon: Crown,
            color: 'from-purple-500 to-indigo-500',
            progress: (totalInterviews / 50) * 100,
            earned: totalInterviews >= 50
        },
        {
            id: 'high_scorer',
            name: 'High Achiever',
            description: 'Average score above 85',
            icon: TrendingUp,
            color: 'from-cyan-500 to-blue-500',
            progress: (averageScore / 85) * 100,
            earned: averageScore >= 85
        }
    ];

    const earnedCount = badges.filter(b => b.earned).length;
    const totalCount = badges.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Award className="w-6 h-6 text-yellow-400" />
                        Achievements
                    </h3>
                    <p className="text-gray-400 mt-1">
                        {earnedCount} of {totalCount} badges earned
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                        {Math.round((earnedCount / totalCount) * 100)}%
                    </div>
                    <div className="text-sm text-gray-400">Complete</div>
                </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge, index) => {
                    const Icon = badge.icon;
                    const isEarned = badge.earned;
                    const progress = Math.min(badge.progress, 100);

                    return (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                glass-panel-strong p-6 rounded-2xl border 
                ${isEarned ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-white/10'}
                hover:scale-105 transition-all cursor-pointer group relative overflow-hidden
              `}
                        >
                            {/* Glow Effect */}
                            {isEarned && (
                                <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-10 blur-xl`} />
                            )}

                            {/* Badge Content */}
                            <div className="relative z-10 text-center space-y-3">
                                {/* Icon */}
                                <div className="flex justify-center">
                                    <div
                                        className={`
                      p-4 rounded-full 
                      ${isEarned
                                                ? `bg-gradient-to-r ${badge.color}`
                                                : 'bg-gray-700/50'
                                            }
                      ${isEarned ? 'shadow-lg shadow-yellow-500/25 animate-pulse' : ''}
                    `}
                                    >
                                        <Icon
                                            className={`w-8 h-8 ${isEarned ? 'text-white' : 'text-gray-500'}`}
                                        />
                                    </div>
                                </div>

                                {/* Badge Name */}
                                <h4 className={`font-bold ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                                    {badge.name}
                                </h4>

                                {/* Description */}
                                <p className="text-xs text-gray-400 line-clamp-2">
                                    {badge.description}
                                </p>

                                {/* Progress Bar */}
                                {!isEarned && (
                                    <div className="space-y-1">
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                                className={`h-full bg-gradient-to-r ${badge.color}`}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">{Math.round(progress)}%</p>
                                    </div>
                                )}

                                {/* Earned Badge */}
                                {isEarned && (
                                    <div className="flex items-center justify-center gap-1 text-yellow-400 text-sm font-semibold">
                                        <Zap className="w-4 h-4" />
                                        <span>Unlocked!</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Next Badge */}
            {earnedCount < totalCount && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-panel p-4 rounded-xl border border-blue-500/30 bg-blue-500/5"
                >
                    <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <div>
                            <p className="text-sm font-semibold text-white">Next Achievement</p>
                            <p className="text-xs text-gray-400">
                                Complete {10 - (totalInterviews % 10)} more interview{10 - (totalInterviews % 10) !== 1 ? 's' : ''} to unlock the next badge!
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
