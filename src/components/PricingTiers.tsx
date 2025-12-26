"use client";

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "5 AI interviews per month",
            "Basic feedback & scoring",
            "Interview history",
            "10+ role templates",
            "Basic analytics"
        ],
        cta: "Get Started Free",
        popular: false
    },
    {
        name: "Pro",
        price: "19",
        description: "For serious interview prep",
        features: [
            "Unlimited AI interviews",
            "Advanced detailed feedback",
            "Performance analytics & trends",
            "50+ role templates",
            "Custom tech stacks",
            "Priority support",
            "Export interviews & feedback"
        ],
        cta: "Start Free Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For teams & organizations",
        features: [
            "Everything in Pro",
            "Team dashboard & analytics",
            "Custom interview templates",
            "API access",
            "Dedicated support",
            "SSO & advanced security",
            "Custom integrations"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

export const PricingTiers = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Choose the plan that's right for you
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative glass-panel-strong p-8 rounded-2xl border ${plan.popular
                                    ? 'border-blue-500 scale-105 md:scale-110'
                                    : 'border-white/10'
                                } hover:scale-105 transition-transform duration-300`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold text-white">
                                        <Sparkles className="w-4 h-4" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                                <div className="flex items-baseline justify-center gap-1">
                                    {plan.price !== "Custom" && (
                                        <span className="text-gray-400 text-2xl">$</span>
                                    )}
                                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                                    {plan.price !== "Custom" && (
                                        <span className="text-gray-400">/month</span>
                                    )}
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 text-gray-400 text-sm"
                >
                    <p>All plans include a 14-day free trial. No credit card required.</p>
                </motion.div>
            </div>
        </section>
    );
};
