"use client";

import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";

/**
 * Animates a number from 0 to `target` the first time the returned
 * ref's element enters the viewport.
 *
 * Returns `[ref, value]`.
 */
export function useCountUp(
  target: number,
  duration = 2000,
  delay = 0,
): [MutableRefObject<HTMLSpanElement | null>, number] {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let startTimestamp: number | null = null;

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const elapsed = timestamp - startTimestamp;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic — smooth deceleration
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(step);
            };

            setTimeout(() => requestAnimationFrame(step), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, target, duration, delay]);

  return [ref, value];
}
