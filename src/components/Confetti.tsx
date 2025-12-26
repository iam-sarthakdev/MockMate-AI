"use client";

import { useEffect, useState } from 'react';

export const Confetti = ({ onComplete }: { onComplete?: () => void }) => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        color: string;
        size: number;
        velocity: { x: number; y: number };
        rotation: number;
        rotationSpeed: number;
    }>>([]);

    useEffect(() => {
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
        const particleCount = 80;

        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: -20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            velocity: {
                x: (Math.random() - 0.5) * 10,
                y: Math.random() * 5 + 5
            },
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        }));

        setParticles(newParticles);

        const gravity = 0.5;
        const interval = setInterval(() => {
            setParticles(prev =>
                prev.map(p => ({
                    ...p,
                    x: p.x + p.velocity.x,
                    y: p.y + p.velocity.y,
                    velocity: {
                        x: p.velocity.x * 0.99,
                        y: p.velocity.y + gravity
                    },
                    rotation: p.rotation + p.rotationSpeed
                })).filter(p => p.y < window.innerHeight + 50)
            );
        }, 16);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setParticles([]);
            onComplete?.();
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[300]">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        transform: `rotate(${p.rotation}deg)`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0',
                        opacity: 0.8
                    }}
                />
            ))}
        </div>
    );
};
