"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Code, Network, Lightbulb, Timer, Target } from 'lucide-react';
import { useState } from 'react';

interface InterviewMode {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
    features: string[];
}

interface InterviewModeSelectorProps {
    onModeSelect: (modeId: string, isPractice: boolean) => void;
}

export const InterviewModeSelector = ({ onModeSelect }: InterviewModeSelectorProps) => {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [isPractice, setIsPractice] = useState(true);

    const modes: InterviewMode[] = [
        {
            id: 'behavioral',
            name: 'Behavioral Interview',
            description: 'Practice answering behavioral questions using the STAR method',
            icon: MessageSquare,
            color: 'from-blue-500 to-cyan-500',
            features: ['STAR Method', 'Leadership Scenarios', 'Situational Questions', 'Communication Skills']
        },
        {
            id: 'technical',
            name: 'Technical Interview',
            description: 'Solve coding challenges with live code editor',
            icon: Code,
            color: 'from-purple-500 to-pink-500',
            features: ['Live Coding', 'Multiple Languages', 'Test Cases', 'Algorithm Practice']
        },
        {
            id: 'system-design',
            name: 'System Design',
            description: 'Design scalable systems with architecture diagrams',
            icon: Network,
            color: 'from-green-500 to-emerald-500',
            features: ['Whiteboard Canvas', 'Architecture Components', 'Scalability', 'Trade-offs']
        }
    ];

    const handleStart = () => {
        if (selectedMode) {
            onModeSelect(selectedMode, isPractice);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Interview Type
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Select the type of interview you want to practice
                    </p>
                </motion.div>

                {/* Mode Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {modes.map((mode, index) => {
                        const Icon = mode.icon;
                        const isSelected = selectedMode === mode.id;

                        return (
                            <motion.div
                                key={mode.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedMode(mode.id)}
                                className={`
                  glass-panel-strong p-8 rounded-2xl cursor-pointer transition-all
                  ${isSelected
                                        ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/25'
                                        : 'border border-white/10 hover:border-white/20'
                                    }
                `}
                            >
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${mode.color} mb-4`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                                <p className="text-gray-400 text-sm mb-6">{mode.description}</p>

                                <div className="space-y-2">
                                    {mode.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mode.color}`} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="mt-6 flex items-center justify-center gap-2 text-blue-400 font-semibold"
                                    >
                                        <Target className="w-5 h-5" />
                                        <span>Selected</span>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Practice vs Real Mode Toggle */}
                {selectedMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-6 rounded-2xl border border-white/10 mb-8"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Choose Your Mode</h3>
                                <p className="text-gray-400 text-sm">
                                    Practice mode allows hints and pausing. Real mode simulates actual interview conditions.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsPractice(true)}
                                    className={`
                    px-6 py-3 rounded-xl font-semibold transition-all
                    ${isPractice
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }
                  `}
                                >
                                    <Lightbulb className="w-5 h-5 inline mr-2" />
                                    Practice Mode
                                </button>
                                <button
                                    onClick={() => setIsPractice(false)}
                                    className={`
                    px-6 py-3 rounded-xl font-semibold transition-all
                    ${!isPractice
                                            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/25'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }
                  `}
                                >
                                    <Timer className="w-5 h-5 inline mr-2" />
                                    Real Mode
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Start Button */}
                {selectedMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <button
                            onClick={handleStart}
                            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 hover-scale"
                        >
                            Start Interview
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
