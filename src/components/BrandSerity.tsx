import { motion } from 'framer-motion';

export function BrandSerity() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 blur-2xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)',
                        transform: 'scale(1.5) translateY(10%)'
                    }}
                />

                <motion.img
                    src="/brand/LogoSerity.png"
                    alt="Serity"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="relative h-16 md:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(251, 251, 251, 0.5)]"
                />
            </div>
        </motion.div>
    );
}
