"use client";

import { Button } from '@/src/components/ui/button'
import { HeroBackground } from '@/src/components/ui/HeroBackground'
import Image from 'next/image'
import Link from 'next/link'
import InterviewCardClient from '@/src/components/InterviewCardClient'
import { RefreshButton } from '@/src/components/RefreshButton'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, Target, Clock, Award, Zap, BarChart3, History, LineChart, Lightbulb, ChevronLeft, ChevronRight, Play, Brain, Trophy, BookOpen, Rocket } from 'lucide-react'
import { InterviewTimeline } from '@/src/components/InterviewTimeline'
import { PerformanceCharts } from '@/src/components/PerformanceCharts'
import { AchievementBadges } from '@/src/components/AchievementBadges'
import { toast } from 'sonner'

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const startValue = 0;
        const endValue = value;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeOutQuad * (endValue - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{count}</span>;
};

// Statistics Card Component
const StatCard = ({ icon: Icon, label, value, color, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="glass-panel-strong p-6 rounded-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
        <div className="relative z-10">
            <div className={`p-3 rounded-lg ${color.replace('bg-', 'bg-')}/20 w-fit mb-4`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={value} />
            </p>
        </div>
    </motion.div>
);

interface DashboardClientProps {
    user: any;
    userInterviews: any[];
    latestInterviews: any[];
}

export default function DashboardClient({ user, userInterviews, latestInterviews }: DashboardClientProps) {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);
    const router = useRouter();

    // Tutorial slides for onboarding
    const tutorialSlides = [
        {
            icon: Rocket,
            title: "Welcome to MockMate AI!",
            description: "Your personal AI interview coach. Practice with realistic interview scenarios and get instant feedback to ace your next interview.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Play,
            title: "Start Your First Interview",
            description: "Click 'Start New Interview' to begin. Choose your role, tech stack, and interview type. Our AI will conduct a realistic interview session tailored to your choices.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Brain,
            title: "AI-Powered Feedback",
            description: "After each interview, receive detailed feedback on your performance, including technical accuracy, communication skills, and areas for improvement.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: BarChart3,
            title: "Track Your Progress",
            description: "Monitor your improvement over time with detailed analytics. View your scores, identify trends, and see how you're getting better with each session.",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: Trophy,
            title: "Earn Achievements",
            description: "Complete interviews to unlock badges and achievements. Build your streak and celebrate your milestones as you progress toward interview mastery.",
            color: "from-indigo-500 to-violet-500"
        },
        {
            icon: BookOpen,
            title: "Best Practices",
            description: "Review your feedback carefully, practice regularly, and focus on weak areas. Consistency is key to interview success. Aim for at least 2-3 sessions per week!",
            color: "from-rose-500 to-red-500"
        }
    ];

    // Interview tips
    const tips = [
        "💡 Practice explaining your thought process out loud - it helps interviewers understand your approach.",
        "🎯 Focus on understanding the problem before jumping into code. Ask clarifying questions!",
        "⚡ Start with a brute force solution, then optimize. It shows problem-solving progression.",
        "🔍 Pay attention to edge cases and test your solutions thoroughly.",
        "💬 Communication is key! Articulate your ideas clearly and confidently.",
        "📚 Review your feedback after each session - that's where real learning happens.",
        "🚀 Consistency beats perfection. Regular practice will naturally improve your skills.",
        "🎓 Don't be afraid to admit when you don't know something. It's better to be honest."
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    // Rotate tips every 5 seconds
    useEffect(() => {
        if (mounted) {
            const interval = setInterval(() => {
                setCurrentTip((prev) => (prev + 1) % tips.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [mounted, tips.length]);

    // Show helpful hint for users who just completed an interview
    useEffect(() => {
        if (mounted && userInterviews.length === 0) {
            // Only show once per session
            const hasSeenMessage = sessionStorage.getItem('dashboardRefreshHint');
            if (!hasSeenMessage) {
                setTimeout(() => {
                    toast.info(
                        'Just completed an interview? Click the Refresh button to update your dashboard!',
                        { duration: 6000 }
                    );
                    sessionStorage.setItem('dashboardRefreshHint', 'true');
                }, 2000);
            }
        }
    }, [mounted, userInterviews.length]);

    if (!mounted) return null;

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews.length > 0;

    // Calculate statistics
    const totalInterviews = userInterviews.length;
    const averageScore = userInterviews.length > 0
        ? Math.round(userInterviews.reduce((acc: number, int: any) => acc + (int.score || 0), 0) / userInterviews.length)
        : 0;
    const currentStreak = Math.min(userInterviews.length, 7);
    const hoursSpent = Math.round((totalInterviews * 25) / 60);

    return (
        <div className="min-h-screen relative p-6 space-y-8">
            {/* Dynamic Background */}
            <HeroBackground />

            {/* Welcome Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 glass-panel p-8 rounded-2xl overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                        >
                            Welcome back, {user.name?.split(' ')[0]}! 👋
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-lg"
                        >
                            Ready to ace your next interview? You've completed <span className="text-white font-bold">{userInterviews.length}</span> sessions so far.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-blue-500/25 hover-scale">
                                <Link href="/interview">
                                    <Zap className="w-5 h-5 mr-2 inline" />
                                    Start New Interview
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:block w-64 h-64 relative"
                    >
                        <Image src="/robot.png" alt="AI Coach" fill className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-float" />
                    </motion.div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            </motion.section>

            {/* Tutorial Carousel - Show for new users or always */}
            {!hasPastInterviews && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10"
                >
                    <div className="glass-panel-strong p-8 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Lightbulb className="w-6 h-6 text-yellow-400" />
                                Getting Started Guide
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentSlide((prev) => (prev - 1 + tutorialSlides.length) % tutorialSlides.length)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={() => setCurrentSlide((prev) => (prev + 1) % tutorialSlides.length)}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="min-h-[200px] flex flex-col items-center text-center space-y-6"
                        >
                            <div className={`p-6 rounded-2xl bg-gradient-to-br ${tutorialSlides[currentSlide].color} w-fit`}>
                                {React.createElement(tutorialSlides[currentSlide].icon, { className: "w-12 h-12 text-white" })}
                            </div>
                            <div className="space-y-3 max-w-2xl">
                                <h3 className="text-2xl font-bold text-white">{tutorialSlides[currentSlide].title}</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">{tutorialSlides[currentSlide].description}</p>
                            </div>
                        </motion.div>

                        {/* Slide indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {tutorialSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all ${index === currentSlide
                                        ? 'w-8 bg-gradient-to-r from-blue-400 to-purple-400'
                                        : 'w-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Tips Section - Always visible */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10"
            >
                <div className="glass-panel p-6 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-blue-500/5">
                    <motion.div
                        key={currentTip}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4"
                    >
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                            <Lightbulb className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">Pro Tip</p>
                            <p className="text-white font-medium">{tips[currentTip]}</p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>



            {/* Statistics Dashboard */}
            <section className="relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 mb-6"
                >
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Your Performance</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={Target}
                        label="Total Interviews"
                        value={totalInterviews}
                        color="bg-blue-500"
                        delay={0.6}
                    />
                    <StatCard
                        icon={Award}
                        label="Average Score"
                        value={averageScore}
                        color="bg-purple-500"
                        delay={0.7}
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Current Streak"
                        value={currentStreak}
                        color="bg-green-500"
                        delay={0.8}
                    />
                    <StatCard
                        icon={Clock}
                        label="Hours Practiced"
                        value={hoursSpent}
                        color="bg-orange-500"
                        delay={0.9}
                    />
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-wrap items-center gap-4 mb-6"
                >
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'overview'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <BarChart3 className="w-4 h-4 inline mr-2" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'history'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <History className="w-4 h-4 inline mr-2" />
                        History
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'analytics'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <LineChart className="w-4 h-4 inline mr-2" />
                        Analytics
                    </button>
                    <div className="ml-auto">
                        <RefreshButton />
                    </div>
                </motion.div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {hasPastInterviews ? (
                            userInterviews.map((interview, index) => (
                                <motion.div
                                    key={interview._id.toString()}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="group hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <InterviewCardClient
                                        interviewId={interview._id.toString()}
                                        userId={interview.userId.toString()}
                                        role={interview.role}
                                        type={interview.type}
                                        techstack={interview.techstack}
                                        createdAt={interview.createdAt.toString()}
                                        feedback={interview.feedback}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1 }}
                                className="col-span-full py-16 text-center glass-panel rounded-xl border-dashed border-2 border-white/10"
                            >
                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                                        <Target className="w-12 h-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">Ready to Start Your Journey?</h3>
                                    <p className="text-gray-400 text-lg">You haven't completed any interviews yet. Start your first mock interview to practice your skills and receive AI-powered feedback!</p>
                                    <div className="space-y-3 text-left bg-white/5 p-6 rounded-xl">
                                        <p className="text-sm text-gray-300 font-semibold">What you'll get:</p>
                                        <ul className="space-y-2 text-sm text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                Realistic interview scenarios
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                Instant AI feedback on your performance
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                Detailed score breakdown and suggestions
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                Track your progress over time
                                            </li>
                                        </ul>
                                    </div>
                                    <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 py-4 text-lg hover-scale shadow-xl shadow-blue-500/30">
                                        <Link href="/interview">
                                            <Rocket className="w-5 h-5 mr-2" />
                                            Start Your First Interview
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* History Timeline Tab */}
                {activeTab === 'history' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel-strong p-8 rounded-2xl border border-white/10"
                    >
                        <InterviewTimeline interviews={userInterviews} />
                    </motion.div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <PerformanceCharts interviews={userInterviews} />

                        {/* Achievements Section */}
                        <div className="glass-panel-strong p-8 rounded-2xl border border-white/10">
                            <AchievementBadges
                                totalInterviews={totalInterviews}
                                averageScore={averageScore}
                                currentStreak={currentStreak}
                            />
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Recommended Section */}
            {hasUpcomingInterviews && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="relative z-10"
                >
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                        <span className="w-1 h-8 bg-purple-500 rounded-full" />
                        Recommended for You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestInterviews.map((interview, index) => (
                            <motion.div
                                key={interview._id.toString()}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="group hover:-translate-y-1 transition-transform duration-300"
                            >
                                <InterviewCardClient
                                    interviewId={interview._id.toString()}
                                    userId={interview.userId.toString()}
                                    role={interview.role}
                                    type={interview.type}
                                    techstack={interview.techstack}
                                    createdAt={interview.createdAt.toString()}
                                    feedback={interview.feedback}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    )
}
