import Link from "next/link";
import Image from "next/image";

const columns = [
  { title: "Helpfull Link", links: ["Home", "About Us", "Services", "Blog", "Contact"] },
  { title: "Support", links: ["Privacy Policy", "Terms of Use", "FAQs", "Contact Us"] },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#000A2D] pt-[80px]">
      <div className="mx-auto w-[1240px] px-[60px]">
        <div className="flex gap-[120px]">
          <div className="w-[320px]">
            <Image src="/figma/logo-footer.png" alt="DentalCare" width={268} height={60} className="object-contain" />
            <p className="mt-[24px] font-archivo text-[16px] leading-[25.6px] text-[#e4e7ec]">
              Modern dental care for the whole family.
            </p>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="flex flex-col">
              <span className="mb-[24px] font-manrope text-[22px] font-extrabold leading-[26.4px] text-white">
                {c.title}
              </span>
              <div className="flex flex-col gap-[16px]">
                {c.links.map((l) => (
                  <Link
                    key={l}
                    href="#"
                    className="font-archivo text-[16px] leading-[25.6px] text-[#e4e7ec] hover:text-brand"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col">
            <span className="mb-[24px] font-manrope text-[22px] font-extrabold leading-[26.4px] text-white">
              Contact Us
            </span>
            <div className="flex items-center gap-[12px] rounded-[4px] border border-[#e7e7e7] bg-white px-[16px] py-[12px]">
              <span className="font-archivo text-[14px] text-[#636571]">
                you@example.com
              </span>
            </div>
            <div className="mt-[16px] flex gap-[12px]">
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[1.8px] bg-[#3267FF] text-[12px] text-white">f</span>
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[1.8px] bg-[#3267FF] text-[12px] text-white">in</span>
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[1.8px] bg-[#3267FF] text-[12px] text-white">y</span>
            </div>
          </div>
        </div>

        <div className="mt-[40px] flex h-[48px] border-t border-[#e9e9e9] pt-[24px]">
          <span className="font-archivo text-[14px] leading-[22.4px] text-[#e4e7ec]">
            Dental
          </span>
          <span className="ml-auto font-archivo text-[14px] leading-[22.4px] text-[#e4e7ec]">
            Copyright © 2023. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
