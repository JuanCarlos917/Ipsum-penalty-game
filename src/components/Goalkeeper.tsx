import React from 'react';
import { motion } from 'framer-motion';

export type GoalkeeperAction = 'center' | 'dive-left' | 'dive-right' | 'idle';

interface GoalkeeperProps {
    action: GoalkeeperAction;
}

export const Goalkeeper: React.FC<GoalkeeperProps> = ({ action }) => {
    // Animation states - each with explicit transition to prevent loops
    const variants = {
        idle: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
        },
        center: {
            x: 0,
            y: -30,
            scale: 1.15,
            rotate: 0,
            transition: { type: 'spring' as const, stiffness: 300, damping: 15 }
        },
        'dive-left': {
            x: -220,
            y: 30,
            rotate: -85,
            transition: { type: 'spring' as const, stiffness: 250, damping: 18 }
        },
        'dive-right': {
            x: 220,
            y: 30,
            rotate: 85,
            transition: { type: 'spring' as const, stiffness: 250, damping: 18 }
        },
    };

    const isIdle = action === 'idle';

    return (
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 z-20 pointer-events-none transform -translate-y-1/2 h-40 flex items-center justify-center">
            <motion.div
                key={action}
                initial={false}
                animate={action}
                variants={variants}
                className="relative w-32 h-48 md:w-36 md:h-56"
            >
                {/* Shadow */}
                <motion.div
                    animate={isIdle
                        ? { scaleX: [1.4, 1.6, 1.4], opacity: 0.4 }
                        : { scaleX: 1, opacity: 0 }
                    }
                    transition={isIdle ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : {}}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/40 blur-md rounded-full transform"
                ></motion.div>

                {/* Idle bounce animation wrapper */}
                <motion.div
                    animate={isIdle ? { y: [0, -8, 0] } : { y: 0 }}
                    transition={isIdle ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                    className="w-full h-full"
                >
                    {/* Goalkeeper SVG Body */}
                    <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-visible">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Legs */}
                        <motion.path
                            d="M35 160 L50 120 L65 160"
                            stroke="#002d42"
                            fill="none"
                            strokeWidth="14"
                            strokeLinecap="round"
                        />

                        {/* Feet/Shoes */}
                        <ellipse cx="32" cy="168" rx="12" ry="6" fill="#07a5cb" stroke="#0590b0" strokeWidth="2" />
                        <ellipse cx="68" cy="168" rx="12" ry="6" fill="#07a5cb" stroke="#0590b0" strokeWidth="2" />

                        {/* Body */}
                        <path d="M50 120 L50 60" stroke="#8bc441" fill="none" strokeWidth="24" strokeLinecap="round" />

                        {/* Arms with idle sway animation */}
                        <motion.g
                            animate={isIdle ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
                            transition={isIdle ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : {}}
                            style={{ originX: "50px", originY: "60px" }}
                        >
                            <path d="M15 75 L50 60 L85 75" stroke="#8bc441" fill="none" strokeWidth="14" strokeLinecap="round" />

                            {/* Gloves with pulse */}
                            <motion.circle
                                cx="12" cy="78" r="11"
                                fill="#ffffff"
                                filter="url(#glow)"
                                animate={isIdle ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={isIdle ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : {}}
                            />
                            <motion.circle
                                cx="88" cy="78" r="11"
                                fill="#ffffff"
                                filter="url(#glow)"
                                animate={isIdle ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={isIdle ? { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 } : {}}
                            />
                        </motion.g>

                        {/* Head with slight movement */}
                        <motion.circle
                            cx="50" cy="35" r="14"
                            fill="#ffde1d"
                            animate={isIdle ? { y: [0, -2, 0], scale: [1, 1.02, 1] } : {}}
                            transition={isIdle ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : {}}
                        />

                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};
