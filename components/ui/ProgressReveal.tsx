"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface ProgressRevealProps {
  width: string;
  delay?: number;
  className?: string;
}

export default function ProgressReveal({
  width,
  delay = 0,
  className = "",
}: ProgressRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`h-[9px] w-full rounded-[4px] bg-[#f1f8ff] overflow-hidden ${className}`}
    >
      <div
        className="h-full w-0 rounded-[4px] bg-brand transition-all ease-out"
        style={{
          width: isInView ? width : "0%",
          transitionDuration: "1000ms",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}
