"use client";

import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Shield, Zap, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const TrustBadges = () => {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({
        users: 10000,
        interviews: 150000,
        satisfaction: 94
    });

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Simulate live counter (in production, fetch from API)
    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setStats(prev => ({
                users: prev.users + Math.floor(Math.random() * 3),
                interviews: prev.interviews + Math.floor(Math.random() * 10),
                satisfaction: 94
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, [mounted]);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <section className="py-16 px-6 relative overflow-hidden border-y border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-purple-950/10 to-blue-950/10" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-500/20 mb-4 animate-pulse" />
                                <div className="h-10 w-32 bg-gray-500/20 rounded mx-auto mb-2 animate-pulse" />
                                <div className="h-4 w-24 bg-gray-500/20 rounded mx-auto animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-6 relative overflow-hidden border-y border-white/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-purple-950/10 to-blue-950/10" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Live Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                            <Users className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">
                            {stats.users.toLocaleString()}+
                        </div>
                        <div className="text-gray-400">Active Users</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                            <Award className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">
                            {stats.interviews.toLocaleString()}+
                        </div>
                        <div className="text-gray-400">Interviews Completed</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                            <TrendingUp className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">
                            {stats.satisfaction}%
                        </div>
                        <div className="text-gray-400">Success Rate</div>
                    </motion.div>
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-8"
                >
                    <div className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-sm">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm">99.9% Uptime</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Award className="w-5 h-5 text-blue-400" />
                        <span className="text-sm">Award Winning</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
