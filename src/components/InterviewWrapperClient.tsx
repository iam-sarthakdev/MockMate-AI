"use client";

import { useState } from 'react';
import { InterviewModeSelector } from '@/src/components/InterviewModeSelector';
import Agent from '@/src/components/Agent';
import { HeroBackground } from '@/src/components/ui/HeroBackground';

interface InterviewWrapperClientProps {
    userName: string;
    userId: string;
}

export default function InterviewWrapperClient({ userName, userId }: InterviewWrapperClientProps) {
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [isPracticeMode, setIsPracticeMode] = useState(true);

    const handleModeSelect = (modeId: string, isPractice: boolean) => {
        setSelectedMode(modeId);
        setIsPracticeMode(isPractice);
        setInterviewStarted(true);
    };

    if (!interviewStarted) {
        return (
            <div className="min-h-screen relative">
                <HeroBackground />
                <InterviewModeSelector onModeSelect={handleModeSelect} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full p-6 relative">
            <HeroBackground />
            <div className="w-full max-w-6xl z-10">
                <Agent
                    userName={userName}
                    userId={userId}
                    type="generate"
                    interviewMode={selectedMode || 'behavioral'}
                    isPracticeMode={isPracticeMode}
                />
            </div>
        </div>
    );
}
