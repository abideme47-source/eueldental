/* eslint-disable @next/next/no-img-element */
import Header from "@/components/dental/Header";
import Footer from "@/components/dental/Footer";
import Button from "@/components/dental/Button";
import SectionHeader from "@/components/dental/SectionHeader";
import IconBox from "@/components/dental/IconBox";
import FeatureItem from "@/components/dental/FeatureItem";
import ServiceCard from "@/components/dental/ServiceCard";
import TestimonialCard from "@/components/dental/TestimonialCard";
import BlogCard from "@/components/dental/BlogCard";

const docRight = "/figma/hero-doctor.png";
const docCircle = "/figma/circle-hero.png";
const docAbout = "/figma/about-doctor.png";
const svc = [
  "/figma/svc-1.png",
  "/figma/svc-2.png",
  "/figma/svc-3.png",
  "/figma/svc-4.png",
  "/figma/svc-5.png",
  "/figma/svc-6.png",
];
const blog = ["/figma/blog-1.png", "/figma/blog-2.png", "/figma/blog-3.png"];

export default function Home() {
  return (
    <div className="w-full">
      <Header />

      {/* HERO — gradient 1920x771, left text + right doctor image (spec 1:40) */}
      <section className="relative flex h-[771px] w-full items-center bg-gradient-to-r from-[#3267FF] to-[#1644EF]">
        <div className="mx-auto flex w-[1240px] items-center justify-between px-[60px]">
          <div className="w-[580px]">
            <div className="mb-[24px] inline-flex h-[36px] items-center rounded-[4px] border border-[#eeeeee] bg-white/10 px-[16px] font-manrope text-[14px] font-bold leading-[22.4px] text-white">
              Modern Dental Care
            </div>
            <h1 className="font-manrope text-[52px] font-extrabold leading-[57.2px] tracking-[-1.5px] text-white">
              The Best Dental Clinic<br />That You Can Trust
            </h1>
            <p className="mt-[24px] font-archivo text-[16px] leading-[25.6px] text-[#f1f8ff]">
              Discover the power of modern dentistry with our expert team and
              state-of-the-art technology for a healthier, more confident you.
            </p>
            <div className="mt-[40px] flex items-center gap-[24px]">
              <Button variant="primary">Book Consultation</Button>
              <Button variant="outline" className="border-[#98b3ff] text-[#98b3ff] hover:bg-white/10">
                Watch Video
              </Button>
            </div>
          </div>

          <div className="relative h-[771px] w-[434px] -mr-[60px]">
            <img
              src={docCircle}
              alt=""
              className="absolute bottom-[60px] right-0 h-[231px] w-[384px] object-cover opacity-90"
            />
            <img
              src={docRight}
              alt="Dentist"
              className="absolute bottom-0 right-0 h-[550px] w-[434px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* 3 floating feature tiles (spec 1:113) */}
      <div className="mx-auto mb-[-40px] flex w-[1240px] justify-between gap-[40px] px-[60px]">
        <IconBox title="Affordable Price" desc="Transparent pricing for every budget." />
        <IconBox title="Professional Dentist" desc="Experienced, certified dental professionals." />
        <IconBox title="Satisfactory Service" desc="Guaranteed care and satisfaction." />
      </div>

      {/* FEATURE STRIP — 1920x214 #F1F8FF (spec 1:217) */}
      <section className="h-[214px] w-full bg-[#f1f8ff] py-[40px]">
        <div className="mx-auto flex w-[1240px] items-center justify-center gap-[60px] px-[60px]">
          <FeatureItem label="Emergency Care" />
          <FeatureItem label="Safe Treatment" />
          <FeatureItem label="Specialist Team" />
          <FeatureItem label="24/7 Support" />
        </div>
      </section>

      {/* ABOUT — dark 1920x740, 50/50 split (spec 1:255) */}
      <section className="flex h-[740px] w-full items-center bg-[#000A2D] font-archivo">
        <div className="mx-auto flex w-[1240px] items-center justify-between px-[60px]">
          <div className="w-[580px]">
            <span className="mb-[20px] inline-flex h-[36px] items-center rounded-[4px] border border-[#eeeeee] bg-[#f1f8ff] px-[16px] font-manrope text-[14px] font-bold leading-[22.4px] text-brand">
              More About Us
            </span>
            <h2 className="mt-[20px] font-manrope text-[52px] font-extrabold leading-[57.2px] tracking-[-1.5px] text-white">
              The Best Dental Clinic<br />That You Can Trust
            </h2>
            <p className="mt-[24px] max-w-[500px] text-[#e4e7ec]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient.
            </p>

            <div className="mt-[40px] space-y-[24px]">
              <div>
                <span className="mb-[8px] block font-manrope text-[18px] font-extrabold leading-[18px] text-white">
                  Dental and Mouth Care
                </span>
                <div className="h-[10px] w-full rounded-[4px] bg-[#f1f8ff]" />
              </div>
              <div>
                <span className="mb-[8px] block font-manrope text-[18px] font-extrabold leading-[18px] text-white">
                  Cosmetic Treatment
                </span>
                <div className="h-[10px] w-full rounded-[4px] bg-[#f1f8ff]" />
              </div>
            </div>

            <div className="mt-[40px] flex items-center gap-[24px]">
              <Button variant="primary">Learn More</Button>
              <Button variant="brand-fill">Make an Appointment</Button>
            </div>
          </div>

          <div className="w-[434px]">
            <img src={docAbout} alt="Dentist" className="h-[740px] w-[434px] object-cover opacity-90" />
          </div>
        </div>
      </section>

      {/* SERVICES — "Best Quality Services" 6 cards (spec 1:285) */}
      <section className="mx-auto w-[1240px] py-[80px]">
        <div className="px-[60px]">
          <SectionHeader
            label="Our Services"
            title="Best Quality Services"
            subtitle="Our dedicated team delivers comprehensive, high-quality care."
            align="left"
          />
        </div>
        <div className="grid grid-cols-3 gap-[40px] px-[60px]">
          <ServiceCard image={svc[0]} title="Teeth Cleaning" desc="Professional cleaning to remove plaque and stains." />
          <ServiceCard image={svc[1]} title="Dental Implants" desc="Reliable implants to restore your bite and confidence." />
          <ServiceCard image={svc[2]} title="Cosmetic Dentistry" desc="Whitening, veneers, and shaping for a perfect smile." />
          <ServiceCard image={svc[3]} title="Emergency Care" desc="Immediate relief for sudden tooth pain or injury." />
          <ServiceCard image={svc[4]} title="Kids Dentistry" desc="Gentle, caring dentistry for your child's smile." />
          <ServiceCard image={svc[5]} title="Dental Veneers" desc="Custom veneers to fix gaps and discoloration." />
        </div>
      </section>

      {/* TESTIMONIAL — "The Honest Review From Our Client" (spec 1:419) */}
      <section className="mx-auto w-[1240px] py-[80px]">
        <div className="px-[60px]">
          <SectionHeader
            label="Our Testimonial"
            title="The Honest Review
 From Our Client"
            align="left"
          />
        </div>
        <div className="mt-[40px] flex gap-[40px] px-[60px]">
          <TestimonialCard
            quote="The team here is incredible. My kids love visiting the dentist now!"
            name="Sarah Johnson"
            role="Patient"
          />
          <TestimonialCard
            quote="Top-tier care and the technology is amazing. I finally have the smile I wanted."
            name="Michael Chen"
            role="Patient"
          />
        </div>

        {/* booking card (spec 1:466) */}
        <div className="mt-[40px] mx-[60px] rounded-[4px] border border-[#eeeeee] bg-white p-[32px] shadow-[0_20px_40px_#003cb321]">
          <div className="flex items-end gap-[24px]">
            <div className="w-[257px]">
              <label className="mb-[8px] block font-manrope text-[16px] font-extrabold leading-[16px] text-dark">
                Email Address
              </label>
              <input className="h-[48px] w-full rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="you@example.com" />
            </div>
            <div className="w-[257px]">
              <label className="mb-[8px] block font-manrope text-[16px] font-extrabold leading-[16px] text-dark">
                Phone Number
              </label>
              <input type="tel" className="h-[48px] w-full rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="(555) 000-0000" />
            </div>
            <div className="w-[268px]">
              <label className="mb-[8px] block font-manrope text-[16px] font-extrabold leading-[16px] text-dark">
                Date
              </label>
              <input type="date" className="h-[48px] w-full rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" />
            </div>
            <Button variant="primary" className="h-[54px] w-[163px]">
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* BLOGS — "Blogs & Articles" (spec 1:361) */}
      <section className="mx-auto w-[1240px] py-[80px]">
        <div className="px-[60px]">
          <SectionHeader
            label="Our Blogs"
            title="Blogs & Articles"
            subtitle="Tips, news, and insights from our dental experts."
            align="left"
          />
        </div>
        <div className="mt-[40px] flex gap-[40px] px-[60px]">
          <BlogCard image={blog[0]} title="5 Ways to Keep Your Smile Healthy" excerpt="Daily habits that protect your teeth and gums for life." date={"12\nOct"} />
          <BlogCard image={blog[1]} title="Everything About Dental Implants" excerpt="Understanding implants, the procedure, and recovery." date={"08\nOct"} />
          <BlogCard image={blog[2]} title="Whitening vs. Veneers" excerpt="Which cosmetic option is right for your goals." date={"03\nOct"} />
        </div>
      </section>

      {/* CONTACT — image-bg #F1F8FF, "Become The Next Our Happy Client" (spec 1:404) */}
      <section className="mx-auto my-[80px] h-[792px] w-[1240px] overflow-hidden rounded-[12px] border border-[#eeeeee] bg-[#f1f8ff]">
        <div className="grid h-full w-full grid-cols-2">
          <div className="relative w-[485px] bg-[#3267FF]">
            <img src="/figma/contact-dentist.png" alt="Dentist" className="h-[536px] w-[485px] object-cover opacity-90" />
            <img src="/figma/contact-circle.png" alt="" className="absolute left-1/2 top-1/2 h-[280px] w-[465px] -translate-x-1/2 -translate-y-1/2 object-cover opacity-90" />
          </div>
          <div className="p-[80px] pl-[60px]">
            <span className="mb-[20px] inline-flex h-[36px] items-center rounded-[4px] border border-[#98b3ff] px-[16px] font-manrope text-[14px] font-bold leading-[22.4px] text-brand">
              Contact Us
            </span>
            <h2 className="mt-[20px] font-manrope text-[52px] font-extrabold leading-[57.2px] tracking-[-1.5px] text-dark">
              Become The Next<br />Our Happy Client
            </h2>
            <p className="mt-[24px] font-archivo text-[16px] leading-[25.6px] text-secondary">
              Fill the form and we'll get back to you shortly.
            </p>
            <form className="mt-[32px] space-y-[24px]">
              <div className="grid grid-cols-2 gap-[24px]">
                <input className="h-[48px] rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="Full Name" />
                <input className="h-[48px] rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="Email Address" />
              </div>
              <div className="grid grid-cols-2 gap-[24px]">
                <input type="tel" className="h-[48px] rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="Phone Number" />
                <input className="h-[48px] rounded-[4px] border border-input bg-white px-[16px] font-archivo text-[16px] text-secondary" placeholder="Subject" />
              </div>
              <textarea className="h-[120px] w-full resize-none rounded-[4px] border border-input bg-white px-[16px] py-[16px] font-archivo text-[16px] text-secondary" placeholder="Your message"></textarea>
              <Button variant="primary" className="w-[230px]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
