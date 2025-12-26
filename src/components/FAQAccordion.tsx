"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI interviewer work?",
        answer: "Our AI uses advanced natural language processing to conduct realistic interviews. It asks relevant questions based on your role and tech stack, provides follow-up questions, and evaluates your answers in real-time."
    },
    {
        question: "Is my interview data private and secure?",
        answer: "Absolutely! All your interview sessions, recordings, and feedback are encrypted and stored securely. We never share your data with third parties. You have full control over your account and can delete your data anytime."
    },
    {
        question: "Can I practice for specific companies?",
        answer: "Yes! You can customize your interview to match specific company requirements, tech stacks, and interview styles. Our AI adapts to different interview formats including behavioral, technical, and system design."
    },
    {
        question: "How accurate is the AI feedback?",
        answer: "Our AI has been trained on thousands of real interviews and provides feedback comparable to experienced interviewers. It evaluates communication, technical knowledge, problem-solving approach, and provides actionable improvement suggestions."
    },
    {
        question: "Do I need any special equipment?",
        answer: "Just a computer with a microphone! Our platform works in any modern web browser. A webcam is optional but recommended for a more realistic experience."
    },
    {
        question: "How long does an interview session last?",
        answer: "Interview sessions typically last 20-40 minutes depending on the role and question complexity. You can pause and resume anytime, making it easy to fit practice into your schedule."
    },
    {
        question: "Can I track my progress over time?",
        answer: "Yes! Your dashboard shows comprehensive analytics including score trends, skill improvements, areas to focus on, and personalized recommendations based on your performance history."
    },
    {
        question: "What roles and tech stacks are supported?",
        answer: "We support 50+ roles across Frontend, Backend, Full Stack, DevOps, Data Science, and more. You can choose from hundreds of tech stacks including JavaScript, Python, Java, React, Node.js, AWS, and many others."
    }
];

export const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Everything you need to know about MockMate AI
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-panel-strong rounded-xl overflow-hidden border border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-white font-semibold pr-8">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredFaqs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No questions found. Try a different search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
