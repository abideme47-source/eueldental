interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  children,
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div
      className={`mb-[60px] flex w-full flex-col items-${align === "center" ? "center" : "flex-start"} ${alignCls}`}
    >
      <span className="mb-[20px] font-manrope text-[15px] font-bold leading-[22.4px] text-brand">
        {label}
      </span>
      <h2 className="font-manrope text-[52px] font-extrabold leading-[57.2px] tracking-[-1.5px] text-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[20px] max-w-[700px] font-archivo text-[16px] font-normal leading-[25.6px] text-secondary">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
