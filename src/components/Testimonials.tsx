"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Software Engineer at Google",
        avatar: "/robot.png",
        rating: 5,
        text: "MockMate AI helped me land my dream job! The AI interviewer asked questions just like real interviews. The feedback was incredibly detailed and helped me improve significantly."
    },
    {
        name: "Michael Rodriguez",
        role: "Full Stack Developer at Meta",
        avatar: "/robot.png",
        rating: 5,
        text: "I practiced with MockMate for 2 weeks before my interview. The real-time feedback and progress tracking gave me the confidence I needed. Highly recommended!"
    },
    {
        name: "Priya Patel",
        role: "Frontend Developer at Amazon",
        avatar: "/robot.png",
        rating: 5,
        text: "The best interview prep platform I've used. The AI is incredibly natural and the analytics show exactly where I need to improve. Worth every minute!"
    },
    {
        name: "David Kim",
        role: "Backend Engineer at Microsoft",
        avatar: "/robot.png",
        rating: 5,
        text: "MockMate's AI interviews are so realistic! It helped me prepare for behavioral and technical questions. I felt completely ready on interview day."
    }
];

export const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const next = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const prev = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-black to-blue-950/20">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Loved by Developers
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Join thousands who landed their dream jobs
                    </p>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="glass-panel-strong p-8 md:p-12 rounded-3xl"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-500/30">
                                        <Image
                                            src={testimonials[current].avatar}
                                            alt={testimonials[current].name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    {/* Rating */}
                                    <div className="flex gap-1 justify-center md:justify-start mb-4">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                                        "{testimonials[current].text}"
                                    </p>

                                    {/* Author */}
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{testimonials[current].name}</h4>
                                        <p className="text-blue-400 text-sm">{testimonials[current].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all border border-white/10"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all border border-white/10"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrent(index);
                                setIsAutoPlaying(false);
                            }}
                            className={`h-2 rounded-full transition-all ${index === current
                                    ? 'w-8 bg-blue-500'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
