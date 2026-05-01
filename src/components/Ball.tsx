import React from 'react';
import { motion } from 'framer-motion';

interface BallProps {
    isShot: boolean;
    targetX: number; // -100 to 100 range for logical position
    onShoot?: () => void;
    reset?: boolean;
}

export const Ball: React.FC<BallProps> = ({ isShot, targetX, onShoot }) => {
    // Convert logical X.
    // We use targetX directly now for simpler control.

    const xOffset = targetX;
    const yOffset = -250; // Visual distance to goal

    return (
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-30 perspective-[500px]">
            <motion.div
                layout
                initial={{ scale: 1, y: 0, x: 0, rotate: 0 }}
                animate={isShot ? {
                    scale: 0.5,
                    y: yOffset,
                    x: xOffset,
                    rotate: 720 + xOffset,
                } : {
                    scale: 1,
                    y: [0, -5, 0],
                    x: 0,
                    rotate: [0, 5, -5, 0]
                }}
                transition={isShot ? {
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                    mass: 0.8
                } : {
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                onClick={!isShot ? onShoot : undefined}
                className={`
                    relative w-16 h-16 md:w-20 md:h-20
                    cursor-pointer hover:scale-105 transition-transform
                    ${isShot ? 'cursor-default' : 'cursor-pointer hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]'}
                `}
            >
                {/* Professional Soccer Ball SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    <defs>
                        {/* 3D Gradient for ball surface */}
                        <radialGradient id="ballGradient" cx="30%" cy="25%" r="65%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#f5f5f5" />
                            <stop offset="60%" stopColor="#e0e0e0" />
                            <stop offset="85%" stopColor="#b0b0b0" />
                            <stop offset="100%" stopColor="#808080" />
                        </radialGradient>

                        {/* Highlight gradient */}
                        <radialGradient id="highlight" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>

                        {/* Center pentagon gradient - appears more lit */}
                        <radialGradient id="pentagonCenter" cx="40%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#3a3a3a" />
                            <stop offset="50%" stopColor="#252525" />
                            <stop offset="100%" stopColor="#0a0a0a" />
                        </radialGradient>

                        {/* Top pentagon - most lit */}
                        <radialGradient id="pentagonTop" cx="50%" cy="80%" r="80%">
                            <stop offset="0%" stopColor="#4a4a4a" />
                            <stop offset="60%" stopColor="#2a2a2a" />
                            <stop offset="100%" stopColor="#151515" />
                        </radialGradient>

                        {/* Side pentagons - medium lighting */}
                        <radialGradient id="pentagonSide" cx="30%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="#383838" />
                            <stop offset="50%" stopColor="#202020" />
                            <stop offset="100%" stopColor="#0a0a0a" />
                        </radialGradient>

                        {/* Bottom pentagons - darker, in shadow */}
                        <radialGradient id="pentagonBottom" cx="50%" cy="20%" r="80%">
                            <stop offset="0%" stopColor="#252525" />
                            <stop offset="50%" stopColor="#151515" />
                            <stop offset="100%" stopColor="#050505" />
                        </radialGradient>

                        {/* Seam gradient for 3D effect */}
                        <linearGradient id="seamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#999" />
                            <stop offset="50%" stopColor="#666" />
                            <stop offset="100%" stopColor="#444" />
                        </linearGradient>
                    </defs>

                    {/* Base ball with 3D shading */}
                    <circle cx="50" cy="50" r="48" fill="url(#ballGradient)" />

                    {/* Center pentagon */}
                    <path
                        d="M50,28 Q60,32 61,42 Q56,52 50,54 Q44,52 39,42 Q40,32 50,28"
                        fill="url(#pentagonCenter)"
                        stroke="#222"
                        strokeWidth="0.8"
                    />

                    {/* Top pentagon */}
                    <path
                        d="M50,3 Q58,5 60,12 Q56,18 50,19 Q44,18 40,12 Q42,5 50,3"
                        fill="url(#pentagonTop)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Top-right pentagon */}
                    <path
                        d="M82,14 Q94,22 94,34 Q88,42 80,40 Q72,36 72,26 Q74,16 82,14"
                        fill="url(#pentagonSide)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Top-left pentagon */}
                    <path
                        d="M18,14 Q26,16 28,26 Q28,36 20,40 Q12,42 6,34 Q6,22 18,14"
                        fill="url(#pentagonSide)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Right pentagon */}
                    <path
                        d="M90,52 Q98,60 96,72 Q90,82 80,80 Q72,74 74,64 Q78,54 90,52"
                        fill="url(#pentagonBottom)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Left pentagon */}
                    <path
                        d="M10,52 Q22,54 26,64 Q28,74 20,80 Q10,82 4,72 Q2,60 10,52"
                        fill="url(#pentagonBottom)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Bottom pentagon */}
                    <path
                        d="M50,97 Q58,95 60,88 Q56,82 50,81 Q44,82 40,88 Q42,95 50,97"
                        fill="url(#pentagonBottom)"
                        stroke="#222"
                        strokeWidth="0.6"
                    />

                    {/* Curved seam lines for spherical effect */}
                    <g stroke="url(#seamGradient)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                        {/* Center to top */}
                        <path d="M50,28 Q50,22 50,19" />
                        {/* Center to top-right */}
                        <path d="M61,42 Q70,32 72,26" />
                        {/* Center to top-left */}
                        <path d="M39,42 Q30,32 28,26" />
                        {/* Center to bottom-right */}
                        <path d="M61,42 Q72,50 74,64" />
                        {/* Center to bottom-left */}
                        <path d="M39,42 Q28,50 26,64" />
                        {/* Center to bottom */}
                        <path d="M50,54 Q50,68 50,81" />

                        {/* Top connections */}
                        <path d="M60,12 Q68,14 72,26" />
                        <path d="M40,12 Q32,14 28,26" />

                        {/* Side to corner connections */}
                        <path d="M94,34 Q92,44 90,52" />
                        <path d="M6,34 Q8,44 10,52" />
                        <path d="M80,40 Q84,46 90,52" />
                        <path d="M20,40 Q16,46 10,52" />

                        {/* Bottom connections */}
                        <path d="M80,80 Q66,88 50,97" />
                        <path d="M20,80 Q34,88 50,97" />
                        <path d="M74,64 Q72,72 60,88" />
                        <path d="M26,64 Q28,72 40,88" />
                    </g>

                    {/* Clip to circle */}
                    <clipPath id="ballClip">
                        <circle cx="50" cy="50" r="48" />
                    </clipPath>

                    {/* Inner shadow for depth */}
                    <circle cx="50" cy="50" r="47" fill="none" stroke="#000" strokeWidth="3" opacity="0.15" />

                    {/* Specular highlight - main */}
                    <ellipse cx="30" cy="26" rx="16" ry="12" fill="url(#highlight)" />

                    {/* Secondary small highlight */}
                    <ellipse cx="22" cy="18" rx="6" ry="4" fill="#fff" opacity="0.7" />

                    {/* Rim light on bottom right */}
                    <path
                        d="M72,88 Q90,75 95,55"
                        stroke="#fff"
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.2"
                        strokeLinecap="round"
                    />
                </svg>
            </motion.div>

            {/* Shadow on the ground */}
            {!isShot && (
                <motion.div
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: [0.6, 0.4, 0.6], scale: [1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/60 blur-md rounded-[100%]"
                />
            )}
        </div>
    );
};
