"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import SelfieCapture from "@/components/SelfieCapture";
import PromptInput from "@/components/PromptInput";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultScreen from "@/components/ResultScreen";
import type { AppStep } from "@/lib/types";

export default function PhotoBooth() {
  const [step, setStep] = useState<AppStep>("splash");
  const [selfieDataUrl, setSelfieDataUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleTransform = useCallback(
    async (userPrompt: string) => {
      setPrompt(userPrompt);
      setStep("processing");
      setError(null);

      try {
        const res = await fetch("/api/transform", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: selfieDataUrl, prompt: userPrompt }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Transformation failed");
        }

        setResultUrl(data.url);
        setStep("result");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStep("prompt");
      }
    },
    [selfieDataUrl]
  );

  const restart = () => {
    setStep("splash");
    setSelfieDataUrl("");
    setPrompt("");
    setResultUrl("");
    setError(null);
  };

  return (
    <main className="relative min-h-dvh min-h-[100svh] overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "splash" && (
          <SplashScreen key="splash" onStart={() => setStep("camera")} />
        )}
        {step === "camera" && (
          <SelfieCapture
            key="camera"
            onCapture={(url) => {
              setSelfieDataUrl(url);
              setStep("prompt");
            }}
            onBack={() => setStep("splash")}
          />
        )}
        {step === "prompt" && (
          <PromptInput
            key="prompt"
            selfieDataUrl={selfieDataUrl}
            onSubmit={handleTransform}
            onBack={() => setStep("camera")}
          />
        )}
        {step === "processing" && (
          <ProcessingScreen key="processing" prompt={prompt} />
        )}
        {step === "result" && (
          <ResultScreen key="result" imageUrl={resultUrl} onRestart={restart} />
        )}
      </AnimatePresence>

      {error && step === "prompt" && (
        <div
          className="fixed left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-red-500/30 bg-red-950/90 px-4 py-3 text-sm leading-snug text-red-200 backdrop-blur"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          {error}
        </div>
      )}
    </main>
  );
}
