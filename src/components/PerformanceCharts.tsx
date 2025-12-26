"use client";

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Target, Brain } from 'lucide-react';

interface PerformanceChartsProps {
    interviews: any[];
}

export const PerformanceCharts = ({ interviews }: PerformanceChartsProps) => {
    // Prepare data for line chart (score progression)
    const scoreProgression = interviews
        .slice(-10) // Last 10 interviews
        .map((interview, index) => ({
            interview: `#${index + 1}`,
            score: interview.feedback?.overallScore || interview.score || 0,
            date: new Date(interview.createdAt).toLocaleDateString()
        }));

    // Prepare data for radar chart (skills breakdown)
    const skillsData = interviews.length > 0 ? [
        {
            skill: 'Communication',
            value: interviews[interviews.length - 1]?.feedback?.communicationScore || 75,
            fullMark: 100,
        },
        {
            skill: 'Technical',
            value: interviews[interviews.length - 1]?.feedback?.technicalScore || 70,
            fullMark: 100,
        },
        {
            skill: 'Confidence',
            value: interviews[interviews.length - 1]?.feedback?.confidenceScore || 80,
            fullMark: 100,
        },
        {
            skill: 'Clarity',
            value: interviews[interviews.length - 1]?.feedback?.clarityScore || 85,
            fullMark: 100,
        },
        {
            skill: 'Problem Solving',
            value: interviews[interviews.length - 1]?.feedback?.problemSolvingScore || 65,
            fullMark: 100,
        },
    ] : [];

    // Prepare data for bar chart (interview type distribution)
    const typeDistribution = interviews.reduce((acc: any, interview) => {
        const type = interview.interviewType || 'Other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const typeData = Object.entries(typeDistribution).map(([type, count]) => ({
        type,
        count
    }));

    if (interviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No data yet</h3>
                <p className="text-gray-400">Complete interviews to see your performance analytics!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Score Progression Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel-strong p-6 rounded-2xl border border-white/10"
            >
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Score Progression</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={scoreProgression}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="interview" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ fill: '#3B82F6', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Skills Radar Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel-strong p-6 rounded-2xl border border-white/10"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Skills Breakdown</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={skillsData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                        <PolarRadiusAxis stroke="#9CA3AF" domain={[0, 100]} />
                        <Radar
                            name="Skills"
                            dataKey="value"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Interview Type Distribution */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel-strong p-6 rounded-2xl border border-white/10 lg:col-span-2"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Interview Type Distribution</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={typeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="type" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="count" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};
