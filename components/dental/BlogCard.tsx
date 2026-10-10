interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogCard({
  image,
  title,
  excerpt,
  date,
}: BlogCardProps) {
  return (
    <div className="flex h-[540px] w-[380px] flex-col rounded-[4px] border border-[#eeeeee] bg-white shadow-[0_2px_4px_#00000005]">
      <div className="relative h-[300px] w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex h-[80px] w-[80px] items-center justify-center rounded-br-[100px] rounded-tl-[100px] bg-brand absolute left-[24px] top-[-40px]">
        <span className="font-manrope text-[22px] font-extrabold text-white">{date}</span>
      </div>
      <div className="px-[24px] pb-[24px] pt-[40px]">
        <h3 className="mb-[12px] font-manrope text-[24px] font-extrabold leading-[30px] text-dark">
          {title}
        </h3>
        <p className="font-archivo text-[16px] leading-[25.6px] text-secondary">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
