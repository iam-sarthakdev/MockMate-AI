"use client";

import { motion } from "framer-motion";

export const HeroBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black" />

            {/* Mesh Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [-20, 20, -20]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="hero-orb w-[500px] h-[500px] bg-blue-600 top-[-10%] left-[-10%]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    y: [-30, 30, -30]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hero-orb w-[600px] h-[600px] bg-purple-600 bottom-[-20%] right-[-10%]"
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        </div>
    );
};
