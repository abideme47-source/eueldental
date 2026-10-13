"use client";

import { useEffect, useState, RefObject } from "react";

/**
 * Observes a single element and returns `true` once it has entered the viewport
 * (and was then unobserved, so the callback fires exactly once).
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref?.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}
