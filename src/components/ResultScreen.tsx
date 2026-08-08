"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ResultScreenProps {
  imageUrl: string;
  onRestart: () => void;
}

export default function ResultScreen({ imageUrl, onRestart }: ResultScreenProps) {
  const handleDownload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], `photbooth-${Date.now()}.png`, {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "PhotoBooth AI" });
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  const handleShare = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], `photbooth-${Date.now()}.png`, {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "My PhotoBooth AI Look",
          text: "Check out my AI-transformed photo!",
          files: [file],
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "My PhotoBooth AI Look",
          text: "Check out my AI-transformed photo!",
          url: imageUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(imageUrl);
      alert("Link copied to clipboard!");
    } catch {
      /* user cancelled or unsupported */
    }
  };

  return (
    <motion.div
      className="screen-shell screen-shell-scroll items-center justify-start py-2 sm:justify-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-4 shrink-0 text-center sm:mb-6"
      >
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Your Masterpiece 🎉
        </h2>
        <p className="mt-1 text-sm text-white/50">Saved to Cloudinary</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, type: "spring" }}
        className="relative aspect-square w-full max-w-[min(100%,400px)] shrink-0 overflow-hidden rounded-3xl border-2 border-white/10 shadow-2xl shadow-purple-500/20"
      >
        <Image
          src={imageUrl}
          alt="AI transformed photo"
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 480px) 100vw, 400px"
        />
      </motion.div>

      <motion.div
        className="mt-5 flex w-full max-w-[min(100%,400px)] shrink-0 flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleDownload}
          className="btn-touch w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-pink-500/25 transition active:scale-95 sm:w-auto sm:px-6"
        >
          Save Photo ⬇️
        </button>
        <button
          onClick={handleShare}
          className="btn-touch w-full rounded-full glass py-3.5 font-semibold text-white/80 transition active:bg-white/10 sm:w-auto sm:px-6"
        >
          Share 🔗
        </button>
        <button
          onClick={onRestart}
          className="btn-touch w-full rounded-full glass py-3.5 text-white/60 transition active:bg-white/10 active:text-white sm:w-auto sm:px-6"
        >
          New Photo
        </button>
      </motion.div>
    </motion.div>
  );
}
