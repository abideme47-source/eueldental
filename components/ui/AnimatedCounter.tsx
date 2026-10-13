"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  // "1,200+" → 1200, "All Ages" → 0
  const numericValue = Number(value.replace(/[^0-9]/g, "")) || 0;
  const hasPlus = value.includes("+");
  const isNumeric = numericValue > 0;

  const [ref, count] = useCountUp(numericValue, duration);

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {hasPlus ? "+" : ""}
    </span>
  );
}
