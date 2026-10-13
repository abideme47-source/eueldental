import Link from "next/link";

const columns = [
  { title: "Quick Link", links: [["Home", "#home"], ["About Us", "#about"], ["Services", "#services"], ["Reviews", "#reviews"], ["Contact Us", "#contact"]] },
  { title: "Services", links: [["Tooth Decay", "#services"], ["Yellow Teeth", "#services"], ["Crooked Teeth", "#services"], ["Tooth Pain", "#services"], ["Broken Tooth", "#services"], ["Missing Teeth", "#services"]] },
];

const socialLinks = [
  { name: "Facebook", url: "https://web.facebook.com/Lewidentalclinic/", bg: "linear-gradient(135deg, #1877F2 0%, #0B5ED7 100%)", icon: "facebook" },
  { name: "Instagram", url: "https://www.instagram.com/dr.euellewispecialitydental", bg: "linear-gradient(135deg, #f58529 0%, #dd2a7b 35%, #8134af 70%, #515bd4 100%)", icon: "instagram" },
  { name: "TikTok", url: "https://www.tiktok.com/@lewispecialitydental", bg: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)", icon: "tiktok" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#000a2d] px-5 pt-14 text-white sm:px-8 lg:px-0 lg:pt-[70px]">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_1fr_1.25fr] lg:gap-12">
          <div><Link href="/" className="flex items-center gap-3"><img src="/figma/assets/logo.png" alt="" className="h-[54px] w-[54px] rounded-full object-cover" /><span><span className="block font-baskervville text-[26px] leading-7">Dr Euel Lewi</span><span className="block font-archivo text-[12px] leading-4">Speciality Dental Clinic</span></span></Link><p className="mt-5 max-w-[270px] font-archivo text-[15px] leading-[25px]">Gentle, caring dental care for patients of all ages in Bole, Addis Ababa.</p><div className="mt-5 flex gap-3" aria-label="Social media">{socialLinks.map(({ name, url, bg, icon }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name} className="flex h-11 w-11 items-center justify-center rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.25)] ring-2 ring-white/10 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" style={{ background: bg }}><svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 text-white">{icon === "facebook" ? <path fill="currentColor" d="M18.7 10.8h3.2v-4.5c-.5-.1-2.2-.3-4.2-.3-4.2 0-7.1 2.6-7.1 7.5v3.5H7.2v4.5h3.4V32h4.9V21.5h3.8l.6-4.5h-4.4v-2.9c0-1.4.4-2.3 2.8-2.3Z" /> : icon === "instagram" ? <><rect x="5.5" y="5.5" width="21" height="21" rx="6" fill="none" stroke="currentColor" strokeWidth="2.8" /><circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="2.8" /><circle cx="23" cy="9.5" r="1.6" fill="currentColor" /></> : <><path d="M19.6 5.1h-3.8v15.1c0 1.8-1.5 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.5-3.2 3.2-3.2c.4 0 .8.1 1.1.2v-3.9c-.4-.1-.8-.1-1.2-.1-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1v-7.7c1.5 1.1 3.4 1.8 5.4 1.8v-3.9c-3-.2-5.3-2.6-5.4-5.4Z" fill="#25F4EE" transform="translate(-0.8 -0.5)" /><path d="M19.6 5.1h-3.8v15.1c0 1.8-1.5 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.5-3.2 3.2-3.2c.4 0 .8.1 1.1.2v-3.9c-.4-.1-.8-.1-1.2-.1-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1v-7.7c1.5 1.1 3.4 1.8 5.4 1.8v-3.9c-3-.2-5.3-2.6-5.4-5.4Z" fill="#FE2C55" transform="translate(0.8 0.5)" /><path d="M19.6 5.1h-3.8v15.1c0 1.8-1.5 3.2-3.2 3.2s-3.2-1.4-3.2-3.2 1.5-3.2 3.2-3.2c.4 0 .8.1 1.1.2v-3.9c-.4-.1-.8-.1-1.2-.1-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1v-7.7c1.5 1.1 3.4 1.8 5.4 1.8v-3.9c-3-.2-5.3-2.6-5.4-5.4Z" fill="white" /></>}</svg></a>)}</div></div>
          {columns.map((column) => <div key={column.title}><h2 className="font-manrope text-[20px] font-bold leading-[26px]">{column.title}</h2><div className="mt-3 h-[2px] w-20 bg-brand" /><ul className="mt-5 space-y-2.5 font-archivo text-[14px] leading-[22px]">{column.links.map(([label, href]) => <li key={label}><Link href={href} className="hover:text-[#98b3ff]">{label}</Link></li>)}</ul></div>)}
          <div><h2 className="font-manrope text-[20px] font-bold leading-[26px]">Contact Us</h2><div className="mt-3 h-[2px] w-20 bg-brand" /><div className="mt-5 flex flex-wrap gap-3"><Link href="#appointment" className="rounded-[4px] bg-brand px-5 py-3 font-manrope text-[13px] font-bold">Book A Visit</Link><a href="tel:+251910363238" className="rounded-[4px] bg-brand px-5 py-3 font-manrope text-[13px] font-bold">Call Us</a></div><p className="mt-5 font-archivo text-[14px] leading-6">Bole, Getu Commercial Center 3rd Floor<br />+251 910 363 238</p></div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-5 font-archivo text-[12px] text-white/80 sm:flex-row sm:items-center sm:justify-between sm:text-[14px]"><span>© 2026 Dr Euel Lewi Speciality Dental Clinic. All rights reserved.</span><span>Site by Rahwa Digitals</span></div>
      </div>
    </footer>
  );
}
