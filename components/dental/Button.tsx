import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "brand-fill";

export interface DentalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: DentalButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[4px] font-manrope font-extrabold text-[15px] leading-[24px] transition-opacity focus:outline-none";
  const styles: Record<ButtonVariant, string> = {
    primary: "h-[59px] w-[153px] bg-brand text-white hover:opacity-90",
    secondary: "h-[59px] w-[230px] bg-cta text-white hover:opacity-90",
    outline: "h-[59px] w-[230px] border border-brand text-brand hover:bg-brand-light",
    "brand-fill":
      "h-[59px] w-[232px] bg-[#98b3ff] text-[#3267ff] hover:opacity-90",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
