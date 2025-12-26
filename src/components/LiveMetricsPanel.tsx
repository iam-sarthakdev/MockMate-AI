"use client";

import { motion } from 'framer-motion';
import { Timer, Target, TrendingUp, Brain, Volume2, Gauge, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LiveMetricsPanelProps {
    currentQuestion: number;
    totalQuestions: number;
    elapsedTime: number;
    isPracticeMode: boolean;
}

export const LiveMetricsPanel = ({
    currentQuestion,
    totalQuestions,
    elapsedTime,
    isPracticeMode
}: LiveMetricsPanelProps) => {
    const [confidence, setConfidence] = useState(75);
    const [clarity, setClarity] = useState(82);
    const [pace, setPace] = useState(68);

    // Simulate real-time metric updates
    useEffect(() => {
        const interval = setInterval(() => {
            setConfidence(prev => Math.min(100, prev + Math.random() * 2 - 1));
            setClarity(prev => Math.min(100, prev + Math.random() * 2 - 1));
            setPace(prev => Math.min(100, prev + Math.random() * 3 - 1.5));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (currentQuestion / totalQuestions) * 100;

    const getMetricColor = (value: number) => {
        if (value >= 80) return 'text-green-400';
        if (value >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getMetricBg = (value: number) => {
        if (value >= 80) return 'from-green-500 to-emerald-500';
        if (value >= 60) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };

    return (
        <div className="space-y-4">
            {/* Timer */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-4 rounded-xl border border-white/10"
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Timer className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">Elapsed Time</span>
                    </div>
                    {!isPracticeMode && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                            Timed
                        </span>
                    )}
                </div>
                <div className="text-3xl font-bold text-white font-mono">
                    {formatTime(elapsedTime)}
                </div>
            </motion.div>

            {/* Question Progress */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-4 rounded-xl border border-white/10"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Progress</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white">
                        Question {currentQuestion} of {totalQuestions}
                    </span>
                    <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                </div>
            </motion.div>

            {/* Live Metrics */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-4 rounded-xl border border-white/10"
            >
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-gray-400">Real-time Metrics</span>
                </div>

                {/* Confidence */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Confidence</span>
                        </div>
                        <span className={`text-sm font-bold ${getMetricColor(confidence)}`}>
                            {Math.round(confidence)}%
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${confidence}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full bg-gradient-to-r ${getMetricBg(confidence)}`}
                        />
                    </div>
                </div>

                {/* Clarity */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Clarity</span>
                        </div>
                        <span className={`text-sm font-bold ${getMetricColor(clarity)}`}>
                            {Math.round(clarity)}%
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${clarity}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full bg-gradient-to-r ${getMetricBg(clarity)}`}
                        />
                    </div>
                </div>

                {/* Pace */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Pace</span>
                        </div>
                        <span className={`text-sm font-bold ${getMetricColor(pace)}`}>
                            {pace < 50 ? 'Too Slow' : pace > 85 ? 'Too Fast' : 'Good'}
                        </span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${pace}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full bg-gradient-to-r ${getMetricBg(pace)}`}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Quick Tips */}
            {isPracticeMode && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-4 rounded-xl border border-green-500/30 bg-green-500/5"
                >
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-green-400 mb-1">Practice Mode Active</p>
                            <p className="text-xs text-gray-400">
                                You can request hints and pause anytime during the interview.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {!isPracticeMode && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-4 rounded-xl border border-red-500/30 bg-red-500/5"
                >
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-red-400 mb-1">Real Mode Active</p>
                            <p className="text-xs text-gray-400">
                                Timed mode with no hints. Stay focused!
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
