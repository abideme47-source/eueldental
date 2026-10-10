import Button from "./Button";

interface ServiceCardProps {
  image: string;
  title: string;
  desc: string;
}

export default function ServiceCard({ image, title, desc }: ServiceCardProps) {
  return (
    <div className="flex h-[414px] w-[387px] flex-col rounded-[4px] border border-[#eeeeee] bg-white shadow-[0_2px_4px_#00000005]">
      <div className="relative h-[256px] w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-[24px]">
        <h3 className="mb-[12px] font-manrope text-[24px] font-extrabold leading-[30px] text-dark">
          {title}
        </h3>
        <p className="mb-[16px] font-archivo text-[16px] leading-[25.6px] text-secondary">
          {desc}
        </p>
        <div className="w-max">
          <Button variant="outline" className="h-[44px] w-auto px-[24px] text-[14px]">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
