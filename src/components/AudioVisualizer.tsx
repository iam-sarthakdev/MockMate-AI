"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudiovisualizerProps {
    isSpeaking: boolean;
    isActive: boolean;
}

export const AudioVisualizer = ({ isSpeaking, isActive }: AudiovisualizerProps) => {
    const barsCount = 20;

    return (
        <div className="flex items-center justify-center gap-1 h-24">
            {[...Array(barsCount)].map((_, i) => {
                const delay = i * 0.05;
                const height = isActive && isSpeaking
                    ? Math.random() * 60 + 20
                    : 4;

                return (
                    <motion.div
                        key={i}
                        animate={{
                            height: isActive && isSpeaking
                                ? [height, Math.random() * 80 + 10, height]
                                : 4,
                            backgroundColor: isActive
                                ? isSpeaking
                                    ? ['#3b82f6', '#8b5cf6', '#3b82f6']
                                    : '#1e293b'
                                : '#0f172a'
                        }}
                        transition={{
                            height: {
                                duration: 0.6,
                                repeat: Infinity,
                                delay,
                                ease: "easeInOut"
                            },
                            backgroundColor: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        className="w-1.5 rounded-full"
                        style={{ minHeight: '4px' }}
                    />
                );
            })}
        </div>
    );
};

// Waveform visualizer variant
export const WaveformVisualizer = ({ isSpeaking, isActive }: AudiovisualizerProps) => {
    return (
        <div className="relative w-full h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 50">
                {[...Array(50)].map((_, i) => {
                    const x = (i / 50) * 200;
                    const baseHeight = 2;
                    const maxHeight = isActive && isSpeaking ? 40 : 5;

                    return (
                        <motion.line
                            key={i}
                            x1={x}
                            y1={25}
                            x2={x}
                            y2={25}
                            stroke="url(#waveGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{
                                y1: isActive && isSpeaking
                                    ? 25 - (Math.sin(i * 0.3 + Date.now() / 200) * maxHeight / 2)
                                    : 25 - baseHeight,
                                y2: isActive && isSpeaking
                                    ? 25 + (Math.sin(i * 0.3 + Date.now() / 200) * maxHeight / 2)
                                    : 25 + baseHeight,
                            }}
                            transition={{
                                duration: 0.1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    );
                })}

                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
