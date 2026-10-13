import Link from "next/link";

const nav = [
  { label: "Home", href: "#", active: true },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="border-b border-[#e9e9e9]">
        <div className="mx-auto flex min-h-[42px] max-w-[1240px] items-center justify-between px-5 py-2 font-archivo text-[12px] text-secondary sm:px-8 sm:text-[14px] lg:px-0">
          <div className="flex flex-wrap gap-x-6 gap-y-1"><a href="tel:+251910363238" className="hover:text-brand">09 10 36 32 38</a><span className="hidden sm:inline">Bole, Getu Commercial Center 3rd Floor</span></div>
          <span className="hidden sm:inline">Mon-Sat 8AM-8PM · Sun 9AM-5PM</span>
        </div>
      </div>
      <div className="border-b border-[#e9e9e9] shadow-[0_6px_10px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex min-h-[99px] max-w-[1240px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-0">
          <Link href="/" className="flex min-w-0 items-center gap-3 text-brand"><img src="/figma/assets/logo.png" alt="" className="h-[54px] w-[54px] shrink-0 rounded-full object-cover" /><span className="min-w-0"><span className="block whitespace-nowrap font-baskervville text-[22px] leading-6 sm:text-[28px]">Dr Euel Lewi</span><span className="block whitespace-nowrap font-archivo text-[11px] leading-4 sm:text-[13px]">Speciality Dental Clinic</span></span></Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{nav.map((n) => <Link key={n.label} href={n.href} className={`font-manrope text-[15px] font-bold leading-6 transition-colors ${n.active ? "text-brand" : "text-dark hover:text-brand"}`}>{n.label}</Link>)}</nav>
          <Link href="#appointment" className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-[4px] bg-brand px-4 font-manrope text-[12px] font-bold text-white hover:bg-[#1644ef] sm:px-6 sm:text-[14px] lg:min-h-[59px] lg:px-8 lg:text-[15px]"><span className="sm:hidden">Book Visit</span><span className="hidden sm:inline">Make an Appointment</span></Link>
        </div>
        <nav aria-label="Mobile navigation" className="mx-auto flex max-w-[1240px] justify-center gap-7 px-5 pb-4 font-manrope text-[13px] font-bold lg:hidden">{nav.map((n) => <Link key={n.label} href={n.href} className={n.active ? "text-brand" : "text-dark"}>{n.label}</Link>)}</nav>
      </div>
    </header>
  );
}
