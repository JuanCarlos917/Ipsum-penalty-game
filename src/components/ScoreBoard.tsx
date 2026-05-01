import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScoreBoardProps {
    score: { player: number; computer: number };
    rounds: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, rounds }) => {
    return (
        <div className="glass-dark px-8 py-4 rounded-2xl flex items-center justify-between gap-12 text-white border border-white/10 z-10 w-full max-w-xl mx-auto shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>

            {/* Animated Light Sweep */}
            <motion.div
                initial={{ left: '-20%' }}
                animate={{ left: ['0%', '120%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
            />

            <div className="flex flex-col items-center w-24">
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-400 font-bold mb-1 drop-shadow-lg">You</span>
                <div className="relative h-16 w-full flex justify-center items-center">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={score.player}
                            initial={{ y: 20, opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -20, opacity: 0, scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute text-4xl md:text-6xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        >
                            {score.player}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Round</span>
                <div className="bg-white/5 px-6 py-1 rounded-full border border-white/10 shadow-inner">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={rounds}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xl font-bold font-mono tracking-widest block"
                        >
                            {rounds}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col items-center w-24">
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-red-400 font-bold mb-1 drop-shadow-lg">MACHINE</span>
                <div className="relative h-16 w-full flex justify-center items-center">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={score.computer}
                            initial={{ y: 20, opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -20, opacity: 0, scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute text-4xl md:text-6xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]"
                        >
                            {score.computer}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
