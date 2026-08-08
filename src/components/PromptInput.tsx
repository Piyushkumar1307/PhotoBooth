"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROMPT_SUGGESTIONS } from "@/lib/types";

interface PromptInputProps {
  selfieDataUrl: string;
  onSubmit: (prompt: string) => void;
  onBack: () => void;
}

export default function PromptInput({
  selfieDataUrl,
  onSubmit,
  onBack,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onSubmit(prompt.trim());
  };

  return (
    <motion.div
      className="screen-shell screen-shell-scroll"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="shrink-0 pb-4 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Describe Your Vibe
        </h2>
        <p className="mt-1 text-sm text-white/50 sm:mt-2">
          Tell AI how to transform your photo
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-5">
        <div className="relative mx-auto aspect-square h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 shadow-lg sm:h-32 sm:w-32">
          <Image
            src={selfieDataUrl}
            alt="Your selfie"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Turn me into a retro 80s pop star with neon lights..."
            rows={3}
            enterKeyHint="done"
            className="input-mobile w-full resize-none rounded-2xl glass px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-pink-400/20"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="btn-touch rounded-full glass px-6 py-3.5 text-white/70 transition active:bg-white/10 sm:flex-1"
            >
              Retake
            </button>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="btn-touch rounded-full bg-gradient-to-r from-pink-500 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-pink-500/25 transition active:scale-95 disabled:opacity-40 sm:flex-[2]"
            >
              Transform ✨
            </button>
          </div>
        </form>

        <div className="pb-2">
          <p className="mb-3 text-sm text-white/40">Quick ideas</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROMPT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(suggestion)}
                className="btn-touch shrink-0 rounded-full glass px-4 py-2.5 text-left text-xs leading-snug text-white/70 active:bg-white/10 sm:text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
