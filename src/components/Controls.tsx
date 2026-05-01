import React from 'react';

interface ControlsProps {
    onShoot: (direction: 'left' | 'center' | 'right') => void;
    disabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ onShoot, disabled }) => {
    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-40">
            <button
                disabled={disabled}
                onClick={() => onShoot('left')}
                className="glass px-6 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 active:scale-95 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#07a5cb] border-r-4 border-r-cyan-400"
            >
                Left
            </button>

            <button
                disabled={disabled}
                onClick={() => onShoot('center')}
                className="glass px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 active:scale-95 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#07a5cb] border-r-4 border-r-cyan-400"
            >
                Center
            </button>

            <button
                disabled={disabled}
                onClick={() => onShoot('right')}
                className="glass px-6 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 active:scale-95 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#07a5cb] border-r-4 border-r-cyan-400"
            >
                Right
            </button>
        </div>
    );
};
