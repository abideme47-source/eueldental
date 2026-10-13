"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

export type RevealVariant =
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "slideDown"
  | "scale"
  | "flip"
  | "fade"
  | "bounce";

interface ScrollRevealProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
}

const variantMap: Record<
  RevealVariant,
  { initial: string; animate: string }
> = {
  slideUp: {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  slideLeft: {
    initial: "opacity-0 -translate-x-16",
    animate: "opacity-100 translate-x-0",
  },
  slideRight: {
    initial: "opacity-0 translate-x-16",
    animate: "opacity-100 translate-x-0",
  },
  slideDown: {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  scale: {
    initial: "opacity-0 scale-90",
    animate: "opacity-100 scale-100",
  },
  flip: {
    initial: "opacity-0 rotate-y-90",
    animate: "opacity-100 rotate-y-0",
  },
  fade: {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  bounce: {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0 bounce-settle",
  },
};

export default function ScrollReveal({
  children,
  variant = "slideUp",
  delay = 0,
  className = "",
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { initial, animate } = variantMap[variant];

  return (
    <div
      ref={ref}
      className={[
        "transition-all",
        "duration-700",
        "ease-out",
        isInView ? animate : initial,
        className,
      ].join(" ")}
      style={{
        transitionDelay: isInView ? `${delay}ms` : "0ms",
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
