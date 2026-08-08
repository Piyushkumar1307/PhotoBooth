"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/hydration leaving motion elements at opacity:0 when JS is slow or fails. */
export function useMotionReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
