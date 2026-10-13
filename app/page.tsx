/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Header from "@/components/dental/Header";
import Footer from "@/components/dental/Footer";
import WhatsAppAppointmentForm from "@/components/dental/WhatsAppAppointmentForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProgressReveal from "@/components/ui/ProgressReveal";

const asset = "/figma/assets/";
const clinicMapSearch = encodeURIComponent("Dr Euel Lewi Speciality Dental Clinic, Getu Commercial Center, Bole, Addis Ababa, Ethiopia");

const highlights = [
  { image: "icon-record.png", title: "Comfortable Visits", copy: "Gentle care in a calm, clean clinic, so you feel relaxed from start to finish." },
  { image: "icon-tools.png", title: "Experienced Dentists", copy: "Skilled specialists who explain every step and treat kids, teens, and adults." },
  { image: "icon-chair.png", title: "Satisfactory Service", copy: "Friendly staff and clear treatment plans, with follow-up care after every visit." },
];

const services = [
  { image: "service-decay.png", icon: "service-icon-decay.png", title: "Tooth Decay", copy: "We clean the decay and repair the tooth before it gets worse." },
  { image: "service-yellow.png", icon: "service-icon-yellow.png", title: "Yellow Teeth", copy: "We clean away stains so your teeth look bright." },
  { image: "service-crooked.png", icon: "service-icon-crooked.png", title: "Crooked Teeth", copy: "Braces help your teeth grow straight and look great." },
  { image: "service-pain.png", icon: "service-icon-pain.png", title: "Tooth Pain", copy: "We find the cause and treat it to stop your pain." },
  { image: "service-broken.png", icon: "service-icon-broken.png", title: "Broken Tooth", copy: "We fix it, or take it out gently if needed." },
  { image: "service-missing.png", icon: "service-icon-missing.png", title: "Missing Teeth", copy: "We replace them with teeth that look and feel natural." },
];

const articles = [
  { image: "blog-gums.png", category: "Gum", title: "Bleeding Gums? Don't Ignore the Warning", copy: "Bleeding gums are a warning sign. Brush gently, clean between your teeth, and see a dentist if it keeps happening." },
  { image: "blog-sensitive.png", category: "Sensitive Teeth", title: "Ouch! Why Cold Drinks Make Teeth Hurt?", copy: "Sharp pain from cold or hot food can mean worn teeth or a small hole. A dentist can find the cause and help." },
  { image: "blog-breath.png", category: "Fresh Breath", title: "Bad Breath Getting You Down? Here Is How to Get Fresh Again", copy: "Most bad breath starts in the mouth. Brush your teeth and tongue, drink water, and see us if the smell stays." },
];

const stats = [
  { image: "stat-tooth.png", value: "1,200+", label: "Happy Client" },
  { image: "stat-clinic.png", value: "8+", label: "Year Experience" },
  { image: "stat-schedule.png", value: "200+", label: "Online Appointment" },
  { image: "stat-dentist.png", value: "All Ages", label: "Welcome" },
];

const checks = ["Modern Equipment", "Comfortable Clinic", "Easy Online Appointment", "Always Monitored"];

function ActionLink({ children, href, secondary = false }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  return (
    <Link href={href} className={`inline-flex min-h-[52px] items-center justify-center rounded-[4px] px-[28px] font-manrope text-[15px] font-bold leading-[24px] transition-colors ${secondary ? "border border-[#3267ff] bg-white/50 text-brand hover:bg-[#f1f8ff]" : "bg-brand text-white hover:bg-[#1644ef]"}`}>
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-white text-dark">
      <Header />
      <main>
        {/* ===== Hero ===== */}
        <section id="home" className="relative overflow-hidden bg-white lg:bg-[linear-gradient(to_right,#ffffff_0%,#ffffff_50%,#f1f8ff_50%,#f1f8ff_100%)]">
          <div className="mx-auto grid min-h-[771px] max-w-[1240px] items-center gap-0 px-5 sm:px-8 lg:grid-cols-2 lg:px-0">
            <div className="relative z-10 max-w-[594px] py-16 lg:translate-y-[36px] lg:pl-[10px]">
              <ScrollReveal variant="slideUp" delay={200}>
                <h1 className="font-manrope text-[38px] font-extrabold leading-[1.1] text-dark sm:text-[54px] lg:text-[68px] lg:leading-[74.8px]">
                  Helping You to<br />Bring Back Your<br /><span className="relative inline-block">Happy Smile<img src={`${asset}hero-draw-line.png`} alt="" className="absolute right-[-27px] top-[8px] h-[33px] w-[30px] rotate-[11deg] draw-in" style={{ animationDelay: "0.6s" }} /></span>
                </h1>
                <p className="mt-6 max-w-[500px] font-archivo text-[16px] leading-[25.6px] text-secondary">Caring dentists, modern treatment, and a comfortable visit every time.</p>
              </ScrollReveal>
            </div>
            <div className="relative mx-auto h-[470px] w-full max-w-[620px] overflow-visible bg-[#f1f8ff] lg:h-[771px] lg:bg-transparent">
              <ScrollReveal variant="slideRight" delay={300} className="absolute right-[-50px] top-[calc(50%+105px)] h-[82%] max-h-[559px] w-[79%] max-w-[490px] -translate-y-1/2">
                <img src={`${asset}hero-backdrop.png`} alt="" className="h-full w-full object-contain" />
              </ScrollReveal>
              <ScrollReveal variant="slideLeft" delay={200} className="absolute left-[calc(50%+64px)] top-[calc(50%+52px)] z-10 w-[96%] max-w-[590px] -translate-x-1/2 -translate-y-1/2">
                <img src={`${asset}hero-circle.png`} alt="" className="h-full w-full object-contain" />
              </ScrollReveal>
              <ScrollReveal variant="fade" delay={100} className="absolute left-[calc(50%+78.5px)] top-[calc(50%+19.9px)] h-[96%] max-h-[732px] w-[91%] max-w-[561px] -translate-x-1/2 -translate-y-1/2">
                <img src={`${asset}hero-dentist.png`} alt="Dentist holding a toothbrush and dental model" className="h-full w-full object-cover" />
              </ScrollReveal>
              <div className="absolute left-5 top-6 z-20 h-[151px] w-[269px] rounded-[4px] border border-white/70 bg-white/55 shadow-[3px_0_12px_rgba(32,145,255,0.13)] backdrop-blur-[2px] lg:left-[29px] lg:top-[198px] heartbeat">
                <div className="absolute left-5 top-5 flex items-center">
                  <span className="h-12 w-12 rounded-full border-4 border-white bg-brand dot-pulse" style={{ animationDelay: "0s" }} />
                  <span className="-ml-[15px] h-12 w-12 rounded-full border-4 border-white bg-brand dot-pulse" style={{ animationDelay: "0.3s" }} />
                  <span className="-ml-[15px] h-12 w-12 rounded-full border-4 border-white bg-brand dot-pulse" style={{ animationDelay: "0.6s" }} />
                </div>
                <p className="absolute left-[138px] top-[27px] font-manrope text-[42px] font-extrabold leading-[42px] text-dark">
                  <AnimatedCounter value="1,200+" />
                </p>
                <span className="absolute left-[228px] top-[29px] flex h-7 w-7 items-center justify-center rounded-full bg-brand font-manrope text-[15px] font-bold text-white">+</span>
                <p className="absolute left-5 top-[91px] font-manrope text-[15px] font-bold leading-[20px] text-dark">Satisfied Customer</p>
                <p className="absolute left-5 top-[116px] font-archivo text-[13px] leading-[20px] text-secondary">Having Great Reviews</p>
              </div>
            </div>
          </div>

          <ScrollReveal variant="slideUp" delay={400} className="relative z-20">
            <WhatsAppAppointmentForm id="appointment" className="mx-auto -mt-28 grid w-[calc(100%-2.5rem)] max-w-[1220px] gap-4 rounded-[4px] bg-white p-5 shadow-[0_4px_20px_rgba(0,60,179,0.14)] sm:px-7 lg:-mt-32 md:grid-cols-[repeat(3,minmax(0,1fr))_auto] md:items-end">
              <h2 className="font-manrope text-[18px] font-bold leading-6 md:col-span-full">Book An Appointment Right Now</h2>
              <label className="font-manrope text-[12px] font-bold">Your Name<input name="name" autoComplete="name" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" placeholder="e.g. Abebech" /></label>
              <label className="font-manrope text-[12px] font-bold">Phone Number<input name="phone" type="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" placeholder="e.g. 0912 345 678" /></label>
              <label className="font-manrope text-[12px] font-bold">Date<input name="date" type="date" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" /></label>
              <button type="submit" className="min-h-12 rounded-[4px] bg-brand px-6 font-manrope text-[14px] font-bold text-white hover:bg-[#1644ef]">Book Now</button>
            </WhatsAppAppointmentForm>
          </ScrollReveal>
        </section>

        {/* ===== Highlights ===== */}
        <section aria-label="Clinic benefits" className="mx-auto grid max-w-[1220px] gap-9 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-0 lg:py-[70px]">
          {highlights.map((item, index) => (
            <ScrollReveal
              key={item.title}
              variant="scale"
              delay={index * 150}
              className="text-center"
            >
              <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-[4px] border border-[#e4ebff] bg-[#f1f8ff]">
                <img
                  src={`${asset}${item.image}`}
                  alt=""
                  className="h-12 w-12 object-contain"
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
              </div>
              <h2 className="mt-5 font-manrope text-[22px] font-bold leading-7">{item.title}</h2>
              <p className="mx-auto mt-3 max-w-[285px] font-archivo text-[15px] leading-[25px] text-secondary">{item.copy}</p>
            </ScrollReveal>
          ))}
        </section>

        {/* ===== About ===== */}
        <section id="about" className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:gap-16 lg:px-0 lg:py-24">
          <ScrollReveal variant="slideRight" delay={100} className="relative mx-auto h-[520px] w-full max-w-[640px] sm:h-[620px]">
            <img src={`${asset}about-backdrop.png`} alt="" className="absolute inset-0 h-full w-full object-contain" />
            <img src={`${asset}about-circle.png`} alt="" className="absolute bottom-[7%] left-[8%] z-30 h-[76%] w-[74%] origin-bottom object-contain md:scale-[1.2] lg:scale-[1.25]" />
            <div className="absolute inset-0 overflow-hidden">
              <img src={`${asset}about-dentist.png`} alt="Dentist presenting a dental model" className="absolute left-[10%] top-0 z-20 h-[108%] w-[88%] origin-top object-contain object-top md:top-[-16px] md:scale-[1.75] lg:top-[-24px] lg:scale-[2]" />
            </div>
            <img src={`${asset}about-patient.png`} alt="Patient receiving gentle dental care" className="absolute bottom-[20%] left-[2%] z-40 h-[108px] w-[108px] rounded-full border-[6px] border-white object-cover shadow-[0_4px_18px_rgba(32,145,255,0.16)] sm:h-[118px] sm:w-[118px] sm:border-[7px] lg:h-[132px] lg:w-[132px] heartbeat" style={{ animationDelay: "0.3s" }} />
            <img src={`${asset}about-treatment.png`} alt="Dentist examining a patient" className="absolute bottom-[15%] right-[2%] z-40 h-[104px] w-[104px] rounded-full border-[6px] border-white object-cover shadow-[0_4px_18px_rgba(32,145,255,0.16)] sm:h-[114px] sm:w-[114px] sm:border-[7px] lg:h-[128px] lg:w-[128px] heartbeat" style={{ animationDelay: "0.6s" }} />
          </ScrollReveal>
          <ScrollReveal variant="slideLeft" delay={200} className="self-start">
            <h2 className="max-w-[540px] font-manrope text-[38px] font-extrabold leading-[1.12] sm:text-[48px] lg:text-[52px]">The Best Dental Clinic That You Can Trust</h2>
            <p className="mt-6 max-w-[500px] font-archivo text-[16px] leading-[25.6px] text-secondary">At Dr Euel Lewi Speciality Dental Clinic, we’re your partner in lifelong oral health. Our experienced, caring team makes every visit gentle, clear, and comfortable for patients of all ages.</p>
            <p className="mt-4 max-w-[470px] font-archivo text-[16px] leading-[25.6px] text-secondary">Our clinic is calm, clean, and designed to help you relax. We take the time to listen to your concerns, because a comfortable patient is a confident patient.</p>
            <ul className="mt-7 grid gap-x-5 gap-y-4 sm:grid-cols-2">
              {checks.map((item, index) => (
                <ScrollReveal
                  key={item}
                  variant="fade"
                  delay={index * 100}
                  className="flex items-center gap-3 font-manrope text-[15px] font-bold"
                >
                  <span aria-hidden="true" className="text-[20px] leading-none text-brand">✓</span>
                  {item}
                </ScrollReveal>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#services">Our Services</ActionLink>
              <ActionLink href="#appointment" secondary>Make an Appointment</ActionLink>
            </div>
          </ScrollReveal>
        </section>

        {/* ===== Care Confidence ===== */}
        <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-0 lg:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <ScrollReveal variant="slideLeft" delay={200} className="self-start">
              <h2 className="font-manrope text-[38px] font-extrabold leading-[1.12] sm:text-[48px] lg:text-[52px]">Care You Can Count On</h2>
              <p className="mt-5 font-archivo text-[16px] leading-[25.6px] text-secondary">We make dental care simple, gentle, and clear. From your first visit to your follow-up, our team is with you every step of the way.</p>
              <div className="mt-7 space-y-5">
                {[{ title: "Gentle, Painless Care", width: "95%" }, { title: "Clear Treatment Plans", width: "87%" }].map((item, index) => (
                  <div key={item.title}>
                    <p className="mb-2 font-manrope text-[16px] font-bold">{item.title}</p>
                    <ProgressReveal width={item.width} delay={index * 300} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slideRight" delay={200} className="relative mx-auto h-[720px] w-full max-w-[520px] sm:h-[740px]">
              <img src={`${asset}hero-circle.png`} alt="" className="absolute bottom-[12%] left-[11%] z-30 h-[76%] w-[78%] object-contain" style={{ animationDelay: "0.2s" }} />
              <img src={`${asset}why-doctor.png`} alt="Dental professional ready to help" className="absolute left-0 top-0 z-20 h-[97%] w-[84%] object-contain object-top" />
              <ScrollReveal
                variant="slideRight"
                delay={300}
                className="absolute left-[calc(100%_-_250px)] top-[71%] z-40 w-[250px] -translate-y-1/2 sm:left-[calc(100%_-_300px)] sm:w-[300px] lg:left-[40%]"
              >
                <aside className="rounded-[4px] bg-white p-4 shadow-[0_4px_24px_rgba(0,60,179,0.13)] sm:p-6">
                  <h3 className="font-manrope text-[26px] font-extrabold leading-tight">Book Your Consultation</h3>
                  <p className="mt-3 font-archivo text-[15px] leading-6 text-secondary">Not sure what you need? Call us or visit the clinic, and we’ll help you find the right treatment.</p>
                  <dl className="mt-7 space-y-4 border-t border-[#e9edf5] pt-5 font-archivo text-[15px]">
                    <div className="flex justify-between gap-3"><dt className="font-manrope font-bold">Monday - Friday</dt><dd className="text-secondary">8AM - 10PM</dd></div>
                    <div className="flex justify-between gap-3"><dt className="font-manrope font-bold">Saturday</dt><dd className="text-secondary">8AM - 10PM</dd></div>
                    <div className="flex justify-between gap-3"><dt className="font-manrope font-bold">Sunday</dt><dd className="text-secondary">9AM - 5PM</dd></div>
                  </dl>
                  <a href="tel:+251910363238" className="mt-7 flex min-h-[54px] items-center justify-center rounded-[4px] bg-brand font-manrope text-[15px] font-bold text-white hover:bg-[#1644ef]">Call Now</a>
                </aside>
              </ScrollReveal>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== Stats ===== */}
        <section aria-label="Clinic facts" className="bg-[#f1f8ff]">
          <div className="mx-auto grid max-w-[1220px] gap-8 px-5 py-10 sm:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-0 lg:py-[70px]">
            {stats.map((item, index) => (
              <ScrollReveal
                key={item.label}
                variant="fade"
                delay={index * 200}
                className="flex items-center gap-5"
              >
                <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[4px] bg-brand">
                  <img
                    src={`${asset}${item.image}`}
                    alt=""
                    className="h-[50px] w-[50px] object-contain spin-slow"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                </div>
                <div>
                  <p className="font-manrope text-[30px] font-extrabold leading-9">
                    <AnimatedCounter value={item.value} />
                  </p>
                  <p className="mt-1 font-archivo text-[14px] leading-5 text-secondary">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== Mosaic ===== */}
        <section aria-label="Our clinic" className="mx-auto grid max-w-[1240px] gap-0 py-12 md:grid-cols-3 lg:py-20">
          <div className="grid grid-cols-2 md:col-span-2">
            <ScrollReveal variant="slideLeft" delay={100} className="relative min-h-[260px] overflow-hidden sm:min-h-[370px]">
              <img src={`${asset}mosaic-clinic.png`} alt="Modern dental clinic" className="absolute inset-0 h-full w-full object-cover sweep-reveal" />
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={200} className="flex min-h-[260px] flex-col items-center justify-center bg-brand px-7 py-10 text-center text-white sm:min-h-[370px]">
              <span aria-hidden="true" className="text-[40px]">✦</span>
              <h2 className="mt-4 font-manrope text-[22px] font-bold">Modern Technology</h2>
              <p className="mt-3 max-w-[280px] font-archivo text-[15px] leading-6">We use up-to-date equipment and proven techniques to give you precise, lasting results.</p>
            </ScrollReveal>
            <ScrollReveal variant="scale" delay={300} className="flex min-h-[260px] flex-col items-center justify-center bg-[#1644ef] px-7 py-10 text-center text-white sm:min-h-[370px]">
              <span aria-hidden="true" className="text-[40px]">＋</span>
              <h2 className="mt-4 font-manrope text-[22px] font-bold">Care for Every Age</h2>
              <p className="mt-3 max-w-[280px] font-archivo text-[15px] leading-6">From children to grandparents, our team makes every visit calm, clear, and comfortable.</p>
            </ScrollReveal>
            <ScrollReveal variant="slideRight" delay={100} className="relative min-h-[260px] overflow-hidden sm:min-h-[370px]">
              <img src={`${asset}mosaic-technology.png`} alt="Patient receiving care in our clinic" className="absolute inset-0 h-full w-full object-cover sweep-reveal" style={{ animationDelay: "0.2s" }} />
            </ScrollReveal>
          </div>
          <ScrollReveal variant="slideRight" delay={300} className="relative min-h-[380px] overflow-hidden md:min-h-full">
            <img src={`${asset}mosaic-care.png`} alt="Dental professional caring for a patient" className="absolute inset-0 h-full w-full object-cover sweep-reveal" style={{ animationDelay: "0.4s" }} />
          </ScrollReveal>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-0 lg:py-24">
          <ScrollReveal variant="slideUp" className="mx-auto mb-12 max-w-[650px] text-center">
            <h2 className="font-manrope text-[36px] font-extrabold leading-tight sm:text-[48px] lg:text-[52px]">What's Bothering Your Smile?</h2>
            <p className="mt-4 font-archivo text-[16px] leading-[25.6px] text-secondary">Tell us what you're feeling and we'll find the right treatment. Our dentists will examine you and explain your options.</p>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {services.map((item, index) => (
              <ScrollReveal
                key={item.title}
                variant="slideUp"
                delay={index * 100}
                className="group relative h-[390px] overflow-hidden rounded-[4px] bg-[#eef5ff]"
              >
                <img
                  src={`${asset}${item.image}`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                <div className="absolute bottom-0 left-0 min-h-[176px] w-[min(280px,90%)] rounded-tr-[4px] bg-white p-5 shadow-[0_4px_20px_rgba(0,60,179,0.14)] transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_8px_30px_rgba(0,60,179,0.20)] sm:p-6">
                  <div className="flex items-center gap-4">
                    <img src={`${asset}${item.icon}`} alt="" className="h-10 w-10 object-contain" />
                    <h3 className="font-manrope text-[19px] font-bold">{item.title}</h3>
                  </div>
                  <p className="mt-4 font-archivo text-[14px] leading-[22px] text-secondary">{item.copy}</p>
                  <Link
                    href="#appointment"
                    className="mt-4 inline-flex items-center gap-2 font-manrope text-[14px] font-bold text-brand hover:text-[#1644ef] arrow-glide group-hover:translate-x-1"
                  >
                    Get Consultation <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== Reviews ===== */}
        <section id="reviews" className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-3 gap-y-6 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:px-0 lg:py-24">
          <div className="col-span-2 max-w-[470px] self-center md:col-span-1">
            <ScrollReveal variant="slideLeft" delay={200}>
              <h2 className="font-manrope text-[38px] font-extrabold leading-[1.12] sm:text-[48px] lg:text-[52px]">What Our Patients Say About Us</h2>
            </ScrollReveal>
            <div className="mt-8 hidden md:block">
              <ActionLink href="#appointment">Book Appointment</ActionLink>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3 md:col-span-1 md:block md:space-y-5">
            {[
              { image: "testimonial-saron.png", quote: "I was very afraid of the dentist. The team was kind and told me everything first. It did not hurt at all.", name: "Saron K.", treatment: "Root Canal Treatment" },
              { image: "testimonial-daniel.png", quote: "My teeth look straight and clean now. The staff was friendly and the clinic is very clean.", name: "Daniel T.", treatment: "Braces Treatment" },
            ].map((item, index) => (
              <ScrollReveal
                key={item.name}
                variant="slideUp"
                delay={index * 200}
                className="group grid min-h-[210px] overflow-hidden rounded-[4px] bg-white shadow-[0_4px_16px_rgba(0,60,179,0.13)] transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_8px_30px_rgba(0,60,179,0.2)] md:grid-cols-[1fr_180px]"
              >
                <div className="p-3 md:p-6 lg:p-8">
                  <p className="font-archivo text-[13px] italic leading-[20px] text-secondary md:text-[16px] md:leading-[27px]">"{item.quote}"</p>
                  <p className="mt-4 font-manrope text-[15px] font-bold md:mt-5 md:text-[18px]">{item.name}</p>
                  <p className="mt-1 font-archivo text-[11px] text-secondary md:text-[13px]">{item.treatment}</p>
                </div>
                <img
                  src={`${asset}${item.image}`}
                  alt={item.name}
                  className="hidden h-full min-h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:block"
                />
              </ScrollReveal>
            ))}
          </div>
          <div className="col-span-2 md:hidden">
            <ActionLink href="#appointment">Book Appointment</ActionLink>
          </div>
        </section>

        {/* ===== Contact CTA Banner ===== */}
        <section className="relative overflow-hidden bg-[#f1f8ff]">
          <div className="mx-auto grid min-h-[570px] max-w-[1240px] items-center gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 lg:min-h-[630px] lg:px-0 lg:py-0">
            <div className="relative z-10 max-w-[470px] self-start md:self-center">
              <ScrollReveal variant="slideUp" delay={200}>
                <h2 className="font-manrope text-[38px] font-extrabold leading-[1.12] sm:text-[48px] lg:text-[52px]">Let Us Take Care of Your Smile</h2>
                <p className="mt-6 font-archivo text-[16px] leading-[25.6px] text-secondary">Our dentist will check your teeth and explain your choices in simple words. We take our time, answer all your questions, and make sure you feel calm and comfortable. Call us today to book your visit.</p>
                <div className="mt-8">
                  <ActionLink href="#contact">Contact Us</ActionLink>
                </div>
              </ScrollReveal>
            </div>
            <div className="relative mx-auto h-[360px] w-full max-w-[560px] [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)] sm:h-[470px] lg:h-[630px] self-end md:self-center">
              <ScrollReveal variant="slideRight" delay={200}>
                <img src={`${asset}smile-visit.png`} alt="Dentist caring for a patient" className="absolute inset-0 h-full w-full object-cover sweep-reveal" style={{ animationDelay: "0.2s" }} />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-0 lg:py-24">
          <ScrollReveal variant="slideUp" className="mx-auto mb-12 max-w-[600px] text-center">
            <h2 className="font-manrope text-[36px] font-extrabold leading-tight sm:text-[48px] lg:text-[52px]">Quick Answers to Common Questions</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollReveal
                key={article.category}
                variant="slideUp"
                delay={index * 200}
                className="group"
              >
                <article>
                  <div className="relative h-[250px] overflow-hidden rounded-[4px] sm:h-[300px]">
                    <img
                      src={`${asset}${article.image}`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-0 left-0 rounded-tr-[4px] bg-white px-4 py-2 font-manrope text-[14px] font-bold text-brand transition-all group-hover:bg-brand group-hover:text-white">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="mt-5 font-manrope text-[20px] font-bold leading-[26px] transition-colors group-hover:text-brand">
                    {article.title}
                  </h3>
                  <p className="mt-3 font-archivo text-[15px] leading-[24px] text-secondary">{article.copy}</p>
                  <Link
                    href="#appointment"
                    className="mt-5 inline-flex min-h-11 items-center rounded-[4px] bg-brand px-5 font-manrope text-[14px] font-bold text-white hover:bg-[#1644ef] arrow-glide group-hover:translate-x-1"
                  >
                    Book A Visit <span aria-hidden="true" className="ml-3">→</span>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== Contact Section ===== */}
        <section id="contact" className="relative isolate mx-auto my-8 grid max-w-[1240px] overflow-visible bg-[#f1f8ff] px-5 py-12 sm:px-10 md:grid-cols-2 lg:my-16 lg:min-h-[440px] lg:px-[50px] lg:py-14">
          <div className="relative z-20 max-w-[440px] self-center">
            <ScrollReveal variant="slideUp" delay={200}>
              <h2 className="font-manrope text-[38px] font-extrabold leading-[1.12] sm:text-[48px] lg:text-[52px]">Contact Us</h2>
              <p className="mt-4 font-archivo text-[16px] font-bold leading-[25.6px] text-secondary">Location:</p>
              <p className="pl-[46px] font-archivo text-[16px] leading-[25.6px] text-secondary">Bole, Getu Commercial Center 3rd Floor</p>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${clinicMapSearch}`} target="_blank" rel="noreferrer" className="ml-[46px] mt-1 inline-flex font-manrope text-[14px] font-bold text-brand hover:text-[#1644ef] arrow-glide">
                Get Directions <span aria-hidden="true" className="ml-2">↗</span>
              </a>
              <div className="mt-4 h-[180px] w-full overflow-hidden rounded-[4px] border border-[#e4ebff]">
                <iframe
                  title="Map to Dr Euel Lewi Speciality Dental Clinic"
                  src={`https://www.google.com/maps?q=${clinicMapSearch}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 font-archivo text-[16px] font-bold leading-[25.6px] text-secondary">Open Hours:</p>
              <p className="pl-[46px] font-archivo text-[16px] leading-[25.6px] text-secondary">
                Mon-Sat: 8AM - 8PM<br />
                Sun: 9AM - 5PM
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink href="#appointment">Book an Appointment</ActionLink>
                <a href="tel:+251910363238" className="inline-flex min-h-[52px] items-center justify-center rounded-[4px] bg-[#1644ef] px-7 font-manrope text-[15px] font-bold text-white">Call Us</a>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative mt-8 min-h-[300px] md:mt-0 lg:absolute lg:inset-y-0 lg:right-[50px] lg:h-full lg:min-h-0 lg:w-[570px]">
            <ScrollReveal variant="slideRight" delay={300}>
              <img
                src={`${asset}hero-circle.png`}
                alt=""
                className="absolute bottom-[2%] left-0 z-10 w-full object-contain lg:bottom-[12px] lg:left-[102px] lg:w-[465px]"
              />
              <img
                src={`${asset}contact-dentist.png`}
                alt="Dentist holding a dental model"
                className="absolute bottom-[-8%] left-1/2 z-0 h-[112%] max-w-full -translate-x-1/2 object-contain object-bottom lg:bottom-auto lg:left-[50px] lg:top-[-96px] lg:h-[536px] lg:w-[485px] lg:max-w-none lg:translate-x-0"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== Contact Appointment Form ===== */}
        <ScrollReveal variant="slideUp" delay={300} className="mx-auto my-16">
          <WhatsAppAppointmentForm
            id="contact-appointment"
            className="grid w-[calc(100%-2.5rem)] max-w-[1220px] gap-4 rounded-[4px] bg-white p-5 shadow-[0_4px_20px_rgba(0,60,179,0.14)] sm:px-7 md:grid-cols-[repeat(3,minmax(0,1fr))_auto] md:items-end"
          >
            <h2 className="font-manrope text-[18px] font-bold leading-6 md:col-span-full">Book An Appointment Right Now</h2>
            <label className="font-manrope text-[12px] font-bold">Your Name<input name="contact-name" autoComplete="name" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" placeholder="e.g. Abebech" /></label>
            <label className="font-manrope text-[12px] font-bold">Phone Number<input name="contact-phone" type="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" placeholder="e.g. 0912 345 678" /></label>
            <label className="font-manrope text-[12px] font-bold">Date<input name="contact-date" type="date" className="mt-2 h-12 w-full rounded-[4px] border border-input px-4 font-archivo text-[14px] font-normal rubber-band-focus" /></label>
            <label className="font-manrope text-[12px] font-bold md:col-span-full">Your Symptoms<textarea name="symptoms" rows={4} className="mt-2 min-h-[112px] w-full resize-y rounded-[4px] border border-input px-4 py-3 font-archivo text-[14px] font-normal rubber-band-focus" placeholder="Describe your symptoms or reason for visit" /></label>
            <button type="submit" className="min-h-12 rounded-[4px] bg-brand px-6 font-manrope text-[14px] font-bold text-white hover:bg-[#1644ef] md:col-start-4 md:justify-self-end">Book Now</button>
          </WhatsAppAppointmentForm>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
