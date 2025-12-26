"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-blue-500/30 border-t-blue-500"
                />
                <Brain className="w-5 h-5 text-blue-400" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                >
                    <Sparkles className="w-3 h-3 text-purple-400" />
                </motion.div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                MockMate AI
            </span>
        </div>
    );
};
