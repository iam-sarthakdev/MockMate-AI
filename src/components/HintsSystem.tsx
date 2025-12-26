"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface HintsSystemProps {
    currentQuestion: string;
    isPracticeMode: boolean;
    onHintUsed: () => void;
}

const hintLevels = [
    {
        level: 1,
        name: 'Light Hint',
        description: 'A gentle nudge in the right direction',
        penalty: 0
    },
    {
        level: 2,
        name: 'Medium Hint',
        description: 'More specific guidance',
        penalty: 5
    },
    {
        level: 3,
        name: 'Detailed Hint',
        description: 'Comprehensive explanation',
        penalty: 10
    }
];

export const HintsSystem = ({ currentQuestion, isPracticeMode, onHintUsed }: HintsSystemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [revealed, setRevealed] = useState(false);

    const handleReveal = () => {
        if (selectedLevel !== null) {
            setRevealed(true);
            onHintUsed();
        }
    };

    const getHintContent = (level: number) => {
        // Simulate different hint levels
        const hints = [
            "Think about the key components of the problem. What's the first step you need to take?",
            "Consider using a hash map to store the data. This will give you O(1) lookup time.",
            "Here's the complete approach: 1) Create a hash map, 2) Iterate through the array once, 3) For each element, check if its complement exists in the map."
        ];
        return hints[level - 1] || "No hint available";
    };

    if (!isPracticeMode) {
        return null;
    }

    return (
        <>
            {/* Hint Button */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full shadow-lg shadow-yellow-500/25 text-white hover:opacity-90 transition-all"
                >
                    <Lightbulb className="w-6 h-6" />
                </motion.button>
            )}

            {/* Hint Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-2xl glass-panel-strong p-8 rounded-2xl border border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Get a Hint</h3>
                                        <p className="text-sm text-gray-400">Choose your hint level</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setRevealed(false);
                                        setSelectedLevel(null);
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Warning */}
                            {!revealed && (
                                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-6">
                                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-400">Practice Mode</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Hints are available in practice mode. In real mode, hints will deduct points from your score.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Hint Levels */}
                            {!revealed && (
                                <div className="space-y-3 mb-6">
                                    {hintLevels.map((hint) => (
                                        <motion.button
                                            key={hint.level}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedLevel(hint.level)}
                                            className={`
                        w-full p-4 rounded-xl border text-left transition-all
                        ${selectedLevel === hint.level
                                                    ? 'border-yellow-500 bg-yellow-500/10'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }
                      `}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{hint.name}</h4>
                                                    <p className="text-sm text-gray-400">{hint.description}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {hint.penalty > 0 && (
                                                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                                                            -{hint.penalty} pts
                                                        </span>
                                                    )}
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Revealed Hint */}
                            {revealed && selectedLevel && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl mb-6"
                                >
                                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Hint:</h4>
                                    <p className="text-white leading-relaxed">
                                        {getHintContent(selectedLevel)}
                                    </p>
                                </motion.div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                {!revealed ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                setSelectedLevel(null);
                                            }}
                                            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleReveal}
                                            disabled={selectedLevel === null}
                                            className={`
                        flex-1 px-6 py-3 rounded-xl font-semibold transition-all
                        ${selectedLevel !== null
                                                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:opacity-90'
                                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                }
                      `}
                                        >
                                            Reveal Hint
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setRevealed(false);
                                            setSelectedLevel(null);
                                        }}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
                                    >
                                        Continue Interview
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
