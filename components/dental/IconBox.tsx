interface IconBoxProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  wide?: boolean;
}

export default function IconBox({
  title,
  desc,
  icon,
  wide = false,
}: IconBoxProps) {
  return (
    <div
      className={`flex h-[175px] w-[347px] flex-col items-center rounded-[4px] border border-[#98b3ff] bg-white p-[24px] shadow-[0_12px_20px_#2091ff21] ${
        wide ? "w-[720px]" : ""
      }`}
    >
      {icon ?? (
        <div className="mb-[20px] flex h-[70px] w-[70px] items-center justify-center rounded-[4px] border border-[#98b3ff] bg-[#f1f8ff] text-[#3267ff]">
          <span className="font-manrope text-[28px] leading-tight">★</span>
        </div>
      )}
      <h3 className="mb-[12px] font-manrope text-[24px] font-extrabold leading-[24px] text-dark">
        {title}
      </h3>
      <p className="font-archivo text-[16px] leading-[25.6px] text-secondary">
        {desc}
      </p>
    </div>
  );
}
