import { motion } from 'framer-motion';

interface BrandLogoProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({
  src = '/brand/logo.png',
  alt = 'Logo',
  size = 'md'
}: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const glowSize = {
    sm: '15px',
    md: '25px',
    lg: '40px'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Glow effect behind logo */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30 blur-xl"
        style={{
          filter: `blur(${glowSize[size]})`,
          transform: 'scale(1.5)'
        }}
      />

      {/* Logo container */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`
          relative ${sizeClasses[size]} rounded-2xl overflow-hidden
          bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90
          border border-white/10 backdrop-blur-sm
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
          flex items-center justify-center
        `}
      >
        {/* Inner shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Logo image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-[85%] h-[85%] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] relative z-10"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement?.querySelector('.placeholder')?.classList.remove('hidden');
          }}
        />

        {/* Placeholder when no image */}
        <div className="placeholder hidden absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            ⚽
          </motion.div>
        </div>

        {/* Hover shine sweep */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '200%', opacity: 0.3 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>

      {/* Subtle reflection */}
      <div
        className={`
          absolute -bottom-2 left-1/2 -translate-x-1/2
          ${sizeClasses[size]} opacity-20 blur-sm scale-y-[-0.3] scale-x-90
          bg-gradient-to-t from-cyan-500/50 to-transparent rounded-full
        `}
      />
    </motion.div>
  );
}
