"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SelfieCaptureProps {
  onCapture: (dataUrl: string) => void;
  onBack: () => void;
}

export default function SelfieCapture({ onCapture, onBack }: SelfieCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch {
        setError(
          "Camera access denied. Please allow camera permissions in your browser settings and try again."
        );
      }
    }

    startCamera();
    return () => {
      mounted = false;
      stopCamera();
    };
  }, [stopCamera]);

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offsetX = (video.videoWidth - size) / 2;
    const offsetY = (video.videoHeight - size) / 2;

    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);

    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const dataUrl = canvas.toDataURL("image/png");
    stopCamera();
    onCapture(dataUrl);
  }, [onCapture, stopCamera]);

  const startCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      takePhoto();
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, takePhoto]);

  return (
    <motion.div
      className="screen-shell"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="shrink-0 pb-4 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Strike a Pose</h2>
        <p className="mt-1 text-sm text-white/50 sm:mt-2">
          Center your face in the frame
        </p>
      </div>

      {error ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="glass w-full max-w-md rounded-2xl p-6 text-center">
            <p className="text-sm leading-relaxed text-red-300">{error}</p>
            <button
              onClick={onBack}
              className="btn-touch mt-5 w-full rounded-full glass px-6 py-3 text-white/70 active:bg-white/10"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div
              className={`relative aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-3xl border-4 border-white/10 ${ready ? "shutter-ring" : ""}`}
            >
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
              />
              {flash && (
                <div className="absolute inset-0 z-10 bg-white animate-pulse" />
              )}
              {countdown !== null && countdown > 0 && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                  <span className="text-7xl font-black text-white drop-shadow-lg sm:text-8xl">
                    {countdown}
                  </span>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="mt-4 flex w-full max-w-[min(100%,420px)] shrink-0 flex-col gap-3 sm:mx-auto sm:flex-row">
            <button
              onClick={() => {
                stopCamera();
                onBack();
              }}
              className="btn-touch order-2 rounded-full glass px-6 py-3.5 text-white/70 transition active:bg-white/10 sm:order-1 sm:flex-1"
            >
              Back
            </button>
            <button
              onClick={startCountdown}
              disabled={!ready || countdown !== null}
              className="btn-touch order-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition active:scale-95 disabled:opacity-40 sm:order-2 sm:flex-[2]"
            >
              {countdown !== null ? "Get Ready..." : "Take Selfie 📸"}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
