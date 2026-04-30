"use client";

import { useEffect, useState, useRef } from "react";

interface UseParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.3, direction = "up" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      const multiplier = direction === "up" ? -1 : 1;
      setOffset(distanceFromCenter * speed * multiplier);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return { ref, offset };
}
