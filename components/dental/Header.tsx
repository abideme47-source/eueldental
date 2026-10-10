import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const nav = [
  { label: "Home", href: "#", active: true },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-[99px] w-full border-b border-[#e9e9e9] bg-white/80 shadow-[0_10px_10px_#00000010] backdrop-blur">
      <div className="mx-auto flex h-full w-[1240px] items-center justify-between px-[60px]">
        <Link href="/" className="flex h-[60px] w-[268px] items-center justify-center">
          <Image src="/figma/logo.png" alt="DentalCare logo" width={268} height={60} className="object-contain" />
        </Link>

        <nav className="flex items-center gap-[40px]">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={
                "font-manrope text-[15px] font-extrabold leading-[24px]" +
                (n.active
                  ? " text-brand"
                  : " text-dark hover:text-brand")
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Button className="ml-[40px]">Make an Appointment</Button>
      </div>
    </header>
  );
}
