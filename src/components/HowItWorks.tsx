"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: "01",
        title: "Choose Your Role & Tech Stack",
        description: "Select from dozens of roles and customize your tech stack to match your dream job requirements.",
        icon: "🎯"
    },
    {
        number: "02",
        title: "Start AI-Powered Interview",
        description: "Our advanced AI conducts realistic interviews with natural conversation and follow-up questions.",
        icon: "🤖"
    },
    {
        number: "03",
        title: "Get Real-Time Feedback",
        description: "Receive instant, detailed feedback on your answers, communication skills, and technical knowledge.",
        icon: "📊"
    },
    {
        number: "04",
        title: "Track Your Progress",
        description: "Monitor improvement over time with comprehensive analytics and personalized recommendations.",
        icon: "📈"
    }
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        How It Works
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Get interview-ready in 4 simple steps
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

                    {/* Steps */}
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="glass-panel-strong p-6 rounded-2xl hover:scale-105 transition-transform duration-300 border border-white/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-4xl">{step.icon}</span>
                                            <span className="text-blue-400 font-bold text-xl">{step.number}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 + 0.3 }}
                                        className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-black"
                                    />
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link href="/sign-up">
                        <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:opacity-90 transition-all hover-scale inline-flex items-center gap-2">
                            Start Your First Interview
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
