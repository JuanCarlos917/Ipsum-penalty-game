import { useState } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { Goal } from './components/Goal';
import { Goalkeeper } from './components/Goalkeeper';
import type { GoalkeeperAction } from './components/Goalkeeper';
import { Ball } from './components/Ball';
import { Controls } from './components/Controls';
import { HeroTitle } from './components/HeroTitle';
import { BrandPartner } from './components/BrandPartner';
import { BrandSerity } from './components/BrandSerity';
import { motion, AnimatePresence } from 'framer-motion';

type GameStatus = 'idle' | 'shooting' | 'scored' | 'saved' | 'finished';

const MAX_ROUNDS = 3;

function App() {
    const [score, setScore] = useState({ player: 0, computer: 0 });
    const [round, setRound] = useState(1);
    const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
    const [ballTarget, setBallTarget] = useState(0);
    const [keeperAction, setKeeperAction] = useState<GoalkeeperAction>('idle');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [cheatActive, setCheatActive] = useState(false);

    const isGameOver = round > MAX_ROUNDS;

    const resetGame = () => {
        setScore({ player: 0, computer: 0 });
        setRound(1);
        setGameStatus('idle');
        setBallTarget(0);
        setKeeperAction('idle');
        setFeedback(null);
        setCheatActive(false);
    };

    const handleShoot = (direction: 'left' | 'center' | 'right') => {
        if (gameStatus !== 'idle' || isGameOver) return;

        setGameStatus('shooting');

        // Determine shot target
        let targetX = 0;
        if (direction === 'left') targetX = -180; // Match goal width/keeper dive range
        if (direction === 'center') targetX = 0;
        if (direction === 'right') targetX = 180;

        setBallTarget(targetX);

        // Determine Keeper move
        let keeperChoice: GoalkeeperAction;
        if (cheatActive) {
            // Cheat: keeper always goes opposite direction
            const oppositeMap: Record<string, GoalkeeperAction[]> = {
                'left': ['center', 'dive-right'],
                'center': ['dive-left', 'dive-right'],
                'right': ['dive-left', 'center'],
            };
            const opposites = oppositeMap[direction];
            keeperChoice = opposites[Math.floor(Math.random() * opposites.length)];
        } else {
            const options: GoalkeeperAction[] = ['dive-left', 'center', 'dive-right'];
            keeperChoice = options[Math.floor(Math.random() * options.length)];
        }

        // Slight delay for keeper reaction realism (100ms)
        setTimeout(() => {
            setKeeperAction(keeperChoice);
        }, 100);

        // Calculate Result
        setTimeout(() => {
            // Logic: if direction matches keeper, it's a save.
            // Left matches dive-left, Center matches center, Right matches dive-right
            const isSave =
                (direction === 'left' && keeperChoice === 'dive-left') ||
                (direction === 'center' && keeperChoice === 'center') ||
                (direction === 'right' && keeperChoice === 'dive-right');

            if (isSave) {
                setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
                setGameStatus('saved');
                setFeedback('SAVED!');
            } else {
                setScore(prev => ({ ...prev, player: prev.player + 1 }));
                setGameStatus('scored');
                setFeedback('GOAL!!!');
            }

            // Reset for next round or end game
            setTimeout(() => {
                setKeeperAction('idle');
                setFeedback(null);
                const nextRound = round + 1;
                setRound(nextRound);
                if (nextRound > MAX_ROUNDS) {
                    setGameStatus('finished');
                    setCheatActive(false);
                } else {
                    setGameStatus('idle');
                }
            }, 3000);

        }, 800); // Wait for ball animation to complete (approx)
    };

    return (
        // Stadium Background
        <motion.div
            className="relative w-full h-screen overflow-hidden bg-cover bg-center font-sans select-none"
            style={{
                background: `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`
            }}
            animate={{
                background: [
                    `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
                    `radial-gradient(circle at 45% 15%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
                    `radial-gradient(circle at 55% 15%, #1e293b 0%, #0f172a 40%, #020617 80%)`,
                    `radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 40%, #020617 80%)`
                ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >

            {/* Hidden cheat button */}
            <button
                onClick={() => setCheatActive(true)}
                className="absolute bottom-0 left-0 w-full h-8 bg-red-500 border-none cursor-default z-50"
                aria-hidden="true"
            />

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none mix-blend-overlay"></div>

            {/* Stadium Lights Effect - Flickering */}
            <motion.div
                animate={{ opacity: [0.3, 0.4, 0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/4 w-[50%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"
            ></motion.div>
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3, 0.4, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-1/4 w-[50%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
            ></motion.div>

            {/* Confetti/Particles for Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full blur-[1px] ${gameStatus === 'scored' ? 'bg-green-400' : 'bg-white/10'}`}
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                        }}
                        initial={{
                            top: `${Math.random() * 60}%`,
                            left: `${Math.random() * 100}%`,
                            scale: 1,
                            opacity: 0.5
                        }}
                        animate={gameStatus === 'scored' ? {
                            top: '50%',
                            left: '50%',
                            scale: [1, 5, 0],
                            opacity: [1, 1, 0],
                            x: (Math.random() - 0.5) * 800,
                            y: (Math.random() - 0.5) * 800,
                        } : {
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={gameStatus === 'scored' ? { duration: 1, ease: "easeOut" } : { duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Main Containers */}
            <div className="relative z-10 flex flex-col h-full justify-between py-6">

                {/* Top: Brand Partner, Scoreboard & Hero Title */}
                <div className="w-full max-w-4xl mx-auto px-4 relative">
                    <ScoreBoard score={score} rounds={Math.min(round, MAX_ROUNDS)} />
                    {gameStatus === 'idle' && !isGameOver && <HeroTitle />}
                </div>

                {/* Brand Partner - Esquina superior izquierda */}
                <div className="absolute top-4 left-4 md:top-6 md:left-8 z-20">
                    <BrandPartner />
                </div>

                {/* Brand Serity - Esquina superior derecha */}
                <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
                    <BrandSerity />
                </div>

                {/* Center: Game Area with Camera Zoom */}
                <motion.div
                    animate={{ scale: gameStatus === 'shooting' ? 1.05 : 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex-1 relative flex items-center justify-center perspective-[1000px]"
                >
                    {/* Goal Area */}
                    <div className="relative w-full cursor-crosshair h-full max-h-[600px] flex items-center justify-center">
                        <Goal />
                        <Goalkeeper action={keeperAction} />

                        {/* Feedback Overlay */}
                        <AnimatePresence>
                            {feedback && (
                                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0, rotate: -10 }}
                                        animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                                        exit={{ scale: 2, opacity: 0 }}
                                        className={`text-6xl md:text-9xl font-black italic tracking-tighter uppercase whitespace-nowrap drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]
                                    ${gameStatus === 'scored' ? 'text-green-400 drop-shadow-[0_0_50px_rgba(74,222,128,1)]' : 'text-red-500 drop-shadow-[0_0_50px_rgba(248,113,113,0.8)]'}
                                `}
                                    >
                                        {feedback}
                                    </motion.div>

                                    {/* Flash Effect */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        exit={{ opacity: 0 }}
                                        className={`absolute inset-0 w-[150vw] h-[150vh] -translate-x-1/4 -translate-y-1/4 ${gameStatus === 'scored' ? 'bg-green-500' : 'bg-red-500'} mix-blend-overlay`}
                                    />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Ball
                        isShot={gameStatus !== 'idle' && gameStatus !== 'finished'}
                        targetX={ballTarget}
                    />

                    {/* Game Over Overlay */}
                    <AnimatePresence>
                        {isGameOver && gameStatus === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                    className="flex flex-col items-center gap-8"
                                >
                                    {/* Result Title */}
                                    <motion.div
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className={`text-4xl md:text-6xl font-black uppercase tracking-wider ${score.player > score.computer
                                            ? 'text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.8)]'
                                            : score.player < score.computer
                                                ? 'text-red-400 drop-shadow-[0_0_30px_rgba(248,113,113,0.8)]'
                                                : 'text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]'
                                            }`}
                                    >
                                        {score.player > score.computer ? 'VICTORY!' : score.player < score.computer ? 'DEFEAT' : 'DRAW'}
                                    </motion.div>

                                    {/* Score Display */}
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                                        className="flex items-center gap-6"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            className="text-8xl md:text-[10rem] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                        >
                                            {score.player}
                                        </motion.div>
                                        <div className="text-4xl md:text-6xl font-bold text-gray-500">-</div>
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
                                            className="text-8xl md:text-[10rem] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                        >
                                            {score.computer}
                                        </motion.div>
                                    </motion.div>

                                    {/* Labels */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="flex items-center gap-16 text-lg md:text-xl text-gray-400 uppercase tracking-widest"
                                    >
                                        <span>You</span>
                                        <span>Keeper</span>
                                    </motion.div>

                                    {/* Play Again Button */}
                                    <motion.button
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(7, 165, 203)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetGame}
                                        className="mt-4 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl md:text-2xl font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-500/30 border-2 border-white/20 cursor-pointer"
                                    >
                                        Play Again
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom: Controls */}
                <div className="w-full relative h-[100px]">
                    <Controls disabled={gameStatus !== 'idle' || isGameOver} onShoot={handleShoot} />

                    {/* Reset Button */}
                    {!isGameOver && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetGame}
                            className="absolute top-0 right-4 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 text-sm font-medium rounded-lg border border-gray-500/30 cursor-pointer transition-colors"
                        >
                            Reset
                        </motion.button>
                    )}
                </div>

            </div>
        </motion.div>
    );
}

export default App;
