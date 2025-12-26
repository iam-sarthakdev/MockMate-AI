"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { HeroBackground } from "../../components/ui/HeroBackground";
import { ArrowRight, Activity, TrendingUp, Shield, Zap, Target, Brain, Users, Star, Award, Sparkles, Video, CheckCircle2, ChevronDown, Home } from "lucide-react";

// Lazy load heavy components for performance
const HowItWorks = dynamic(() => import('../../components/HowItWorks').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
});

const Testimonials = dynamic(() => import('../../components/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96" />
});

const PricingTiers = dynamic(() => import('../../components/PricingTiers').then(mod => ({ default: mod.PricingTiers })), {
  loading: () => <div className="h-96" />
});

const FAQAccordion = dynamic(() => import('../../components/FAQAccordion').then(mod => ({ default: mod.FAQAccordion })), {
  loading: () => <div className="h-96" />
});

const TrustBadges = dynamic(() => import('../../components/TrustBadges').then(mod => ({ default: mod.TrustBadges })), {
  loading: () => <div className="h-48" />
});

// Animated Counter Hook
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
};

// StatCard Component
const StatCard = ({ icon: Icon, label, value, suffix, delay }: any) => {
  const { count, setIsVisible } = useCountUp(value);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [setIsVisible]);

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-panel-strong p-6 rounded-xl text-center hover-scale"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
          <Icon className="w-8 h-8" />
        </div>
        <p className="text-4xl md:text-5xl font-bold text-white">
          {count}{suffix}
        </p>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: 'AI-Powered Interviewing',
      description: 'Practice real interview questions generated on the spot by advanced AI tailored to your role and tech stack.'
    },
    {
      icon: <Activity className="w-8 h-8 text-purple-400" />,
      title: 'Smart Performance Analytics',
      description: 'Get detailed insights on your answers, including accuracy, clarity, confidence level, and improvement areas.'
    },
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: 'Role-Based Question Sets',
      description: 'Choose roles, levels, and tech stacks to get highly relevant questions for your dream job.'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Secure & Private Practice',
      description: 'Your interview attempts, recordings, and feedback remain fully private and protected.'
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: 'Instant Feedback & Scoring',
      description: 'Receive AI-generated feedback, strengths, weaknesses, and an overall score immediately after each interview.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: 'Continuous Skill Improvement',
      description: 'Track your progress across multiple interviews and see where you’re getting stronger over time.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  // Statistics
  const stats = [
    { icon: Users, label: "Active Users", value: 5000, suffix: "+" },
    { icon: Star, label: "Interviews Conducted", value: 15000, suffix: "+" },
    { icon: Award, label: "Success Rate", value: 94, suffix: "%" },
    { icon: TrendingUp, label: "Avg Improvement", value: 35, suffix: "%" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <HeroBackground />
      {/* <ParticleBackground /> - Disabled for better performance */}

      {/* Navbar */}
      <nav className="fixed top-0 w-full px-8 md:px-12 py-5 flex items-center justify-between z-[100] bg-black/50 backdrop-blur-xl border-b border-white/10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
              <Home className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            MockMate AI
          </span>
        </button>
        <Link href="/sign-up">
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-medium">
            Sign In
          </button>
        </Link>
      </nav>

      {/* Hero Section - Ultra Premium */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">AI-Powered Interview Platform</span>
            </motion.div>

            {/* Animated Headline */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                <span className="block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 drop-shadow-[0_0_50px_rgba(168,85,247,0.6)] animate-pulse">
                  Master Your
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_60px_rgba(59,130,246,0.5)]">
                  Interviews with AI
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 leading-relaxed max-w-xl"
            >
              Practice with our advanced AI interviewer. Get real-time feedback, track your progress, and land your dream job with confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/sign-up">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden hover-scale">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>

              <button
                onClick={() => {
                  const howItWorksSection = document.querySelector('#how-it-works');
                  if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">10,000+ users</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-sm text-gray-400 ml-2">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block h-[600px]"
          >
            {/* Main Card - Interview Preview */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
            >
              <div className="glass-panel-strong p-6 rounded-3xl shadow-2xl shadow-blue-500/20 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI Interviewer</h4>
                    <p className="text-gray-400 text-sm">Live Session</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300 text-sm italic">"Tell me about your experience with React..."</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-1 flex-1 bg-blue-500 rounded" />
                    <div className="h-1 flex-1 bg-purple-500 rounded" />
                    <div className="h-1 flex-1 bg-cyan-500 rounded" />
                    <div className="h-1 flex-1 bg-white/20 rounded" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-2xl font-bold text-white">92</div>
                      <div className="text-xs text-gray-400">Confidence</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-lg border border-purple-500/20">
                      <div className="text-2xl font-bold text-white">8.5</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge 1 */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-20 -left-8 glass-panel-strong p-4 rounded-2xl border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Interview Complete!</div>
                  <div className="text-gray-400 text-xs">Score: 94/100</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-32 -right-8 glass-panel-strong p-3 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white text-sm font-semibold">+15%</div>
                  <div className="text-gray-400 text-xs">This week</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge 3 */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute top-1/2 -right-12 glass-panel-strong p-3 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="flex flex-col items-center">
                <Target className="w-6 h-6 text-purple-400 mb-1" />
                <div className="text-white text-xs font-semibold">50+</div>
                <div className="text-gray-400 text-xs">Roles</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400">Everything you need to ace your next interview</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-6 p-3 rounded-lg bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - Social Proof */}
      <TrustBadges />

      {/* How It Works Timeline */}
      <HowItWorks />

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* Pricing Tiers */}
      <PricingTiers />

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 backdrop-blur-md text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to land your dream job?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of candidates who are mastering their interview skills with MockMate AI.
          </p>
          <Link href="/sign-up">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 text-lg font-bold rounded-full bg-white text-black shadow-xl hover:shadow-2xl transition-all"
            >
              Start Practicing Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/5 bg-black/40 backdrop-blur-sm relative z-10">
        <p>&copy; 2025 MockMate AI by Sarthak Kanoi</p>
      </footer>
    </div>
  );
}