"use client";

import { motion } from "framer-motion";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <motion.div
      className="screen-shell relative items-center justify-center px-5 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl shadow-pink-500/30 sm:mb-8 sm:h-28 sm:w-28"
      >
        <span className="text-4xl sm:text-5xl">📸</span>
      </motion.div>

      <motion.h1
        className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        PhotoBooth AI
      </motion.h1>

      <motion.p
        className="mt-3 max-w-xs text-base leading-relaxed text-white/60 sm:mt-4 sm:max-w-sm sm:text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        Snap a selfie, describe your dream look, and watch AI transform you in
        seconds.
      </motion.p>

      <motion.div
        className="mt-8 flex w-full max-w-sm flex-col items-center gap-4 sm:mt-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={onStart}
          className="btn-touch group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-pink-500/30 transition active:scale-95 sm:w-auto sm:px-10"
        >
          <span className="relative z-10">Start Booth ✨</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition group-active:opacity-100" />
        </button>
        <p className="text-[11px] text-white/30 sm:text-xs">
          Powered by OpenAI · Stored on Cloudinary
        </p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-pink-400/30"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
