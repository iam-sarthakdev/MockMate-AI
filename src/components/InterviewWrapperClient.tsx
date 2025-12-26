"use client";

import { useState } from 'react';
import { InterviewModeSelector } from '@/src/components/InterviewModeSelector';
import Agent from '@/src/components/Agent';
import { HeroBackground } from '@/src/components/ui/HeroBackground';
import { getQuestionsByType, formatQuestionsForVAPI } from '@/src/constants/interviewQuestions';

interface InterviewWrapperClientProps {
    userName: string;
    userId: string;
}

export default function InterviewWrapperClient({ userName, userId }: InterviewWrapperClientProps) {
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [isPracticeMode, setIsPracticeMode] = useState(true);
    const [structuredQuestions, setStructuredQuestions] = useState<string>('');

    const handleModeSelect = (modeId: string, isPractice: boolean) => {
        setSelectedMode(modeId);
        setIsPracticeMode(isPractice);

        // Generate structured questions based on interview type
        const questionType = modeId as 'behavioral' | 'technical' | 'system-design';
        const questions = getQuestionsByType(questionType, 10);
        const formattedQuestions = formatQuestionsForVAPI(questions);

        setStructuredQuestions(formattedQuestions);
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
                    questions={structuredQuestions}
                />
            </div>
        </div>
    );
}
