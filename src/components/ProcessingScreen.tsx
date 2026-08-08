"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/motion";

const STEPS = [
  "Analyzing your selfie...",
  "Crafting your transformation...",
  "Applying AI magic...",
  "Uploading to cloud...",
];

interface ProcessingScreenProps {
  prompt: string;
}

export default function ProcessingScreen({ prompt }: ProcessingScreenProps) {
  const motionReady = useMotionReady();

  return (
    <motion.div
      className="screen-shell items-center justify-center px-5 text-center"
      initial={motionReady ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative mb-8 sm:mb-10">
        <div className="mx-auto h-20 w-20 animate-spin-slow rounded-full border-4 border-white/10 border-t-pink-500 sm:h-24 sm:w-24" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse-glow sm:text-3xl">
          ✨
        </div>
      </div>

      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Creating Your Look
      </h2>
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-white/40 italic sm:max-w-xs">
        &ldquo;{prompt}&rdquo;
      </p>

      <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
        {STEPS.map((step, i) => (
          <motion.p
            key={step}
            className="text-xs text-white/50 sm:text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 1.2 }}
          >
            {step}
          </motion.p>
        ))}
      </div>

      <p className="mt-8 text-[11px] text-white/25 sm:mt-10 sm:text-xs">
        Using GPT Image 1 · This may take 15–30 seconds
      </p>
    </motion.div>
  );
}
