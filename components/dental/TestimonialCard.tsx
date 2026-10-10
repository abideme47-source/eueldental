interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
}: TestimonialCardProps) {
  return (
    <div className="flex h-[238px] w-[600px] flex-col justify-between rounded-[4px] border border-[#eeeeee] bg-white p-[24px] shadow-[0_20px_40px_#003cb321]">
      <p className="font-archivo text-[16px] font-normal leading-[25.6px] text-secondary">
        "{quote}"
      </p>
      <div className="flex items-center gap-[16px]">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#eeeeee]">
          <span className="font-manrope text-[10px] font-bold text-dark">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-manrope text-[16px] font-extrabold leading-[24px] text-dark">
            {name}
          </span>
          <span className="font-archivo text-[14px] leading-[22.4px] text-secondary">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
