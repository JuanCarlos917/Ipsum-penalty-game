import { motion } from 'framer-motion';

export function BrandPartner() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
        >
            {/* Logo Ipsum */}
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
                        background: 'radial-gradient(circle, #07a5cb 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
                        transform: 'scale(1.5) translateY(10%)'
                    }}
                />

                <motion.img
                    src="/brand/LogoIpsum.png"
                    alt="Ipsum"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-16 md:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                />
            </div>

            {/* Logo Elite - A la derecha de Ipsum */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
            >
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 blur-xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(245,158,11,0.2) 50%, transparent 70%)',
                        transform: 'scale(1.5)'
                    }}
                />
                <img
                    src="/brand/LogoElite.png"
                    alt="Elite"
                    className="relative h-14 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                />
            </motion.div>
        </motion.div>
    );
}
