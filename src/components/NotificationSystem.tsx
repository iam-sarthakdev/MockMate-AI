"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Trophy } from 'lucide-react';
import { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'achievement';

interface NotificationProps {
    type: NotificationType;
    title: string;
    message: string;
    onClose: () => void;
    duration?: number;
}

export const Notification = ({ type, title, message, onClose, duration = 4000 }: NotificationProps) => {
    const icons = {
        success: <CheckCircle className="w-6 h-6" />,
        error: <AlertCircle className="w-6 h-6" />,
        info: <Info className="w-6 h-6" />,
        achievement: <Trophy className="w-6 h-6" />
    };

    const colors = {
        success: 'from-green-500 to-emerald-500',
        error: 'from-red-500 to-rose-500',
        info: 'from-blue-500 to-cyan-500',
        achievement: 'from-yellow-500 to-orange-500'
    };

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-sm overflow-hidden rounded-xl shadow-2xl"
        >
            <div className="glass-panel-strong p-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${colors[type]} text-white`}>
                        {icons[type]}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                        <p className="text-gray-400 text-xs">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress bar */}
                {duration > 0 && (
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors[type]}`}
                    />
                )}
            </div>
        </motion.div>
    );
};

// Notification Container
interface NotificationContainerProps {
    notifications: Array<{ id: string } & NotificationProps>;
    onClose: (id: string) => void;
}

export const NotificationContainer = ({ notifications, onClose }: NotificationContainerProps) => {
    return (
        <div className="fixed top-4 right-4 z-[200] space-y-3 pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <div key={notification.id} className="pointer-events-auto">
                        <Notification
                            {...notification}
                            onClose={() => onClose(notification.id)}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};
