"use client";

import { useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  // Section 05: Do not make the page feel like a loading screen.
  // The portfolio itself choreographs into existence.
  return null;
}
