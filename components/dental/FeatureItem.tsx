interface FeatureItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
}

export default function FeatureItem({ icon, label }: FeatureItemProps) {
  return (
    <div className="flex h-[74px] w-[265px] items-center gap-[16px]">
      <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] bg-brand text-white">
        {icon ?? <span className="font-manrope text-[18px]">★</span>}
      </span>
      <span className="font-manrope text-[15px] font-extrabold leading-[24px] text-dark">
        {label}
      </span>
    </div>
  );
}
