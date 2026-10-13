"use client";

import type { FormEvent, ReactNode } from "react";

type WhatsAppAppointmentFormProps = {
  id: string;
  className: string;
  children: ReactNode;
};

const whatsappNumber = "251910363238";

export default function WhatsAppAppointmentForm({ id, className, children }: WhatsAppAppointmentFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const valueFor = (...names: string[]) => {
      for (const name of names) {
        const value = formData.get(name);
        if (typeof value === "string" && value.trim()) return value.trim();
      }
      return "Not provided";
    };
    const message = [
      "Hello, I would like to book an appointment at Dr Euel Lewi Speciality Dental Clinic.",
      "",
      `Name: ${valueFor("name", "contact-name")}`,
      `Phone: ${valueFor("phone", "contact-phone")}`,
      `Preferred date: ${valueFor("date", "contact-date")}`,
      `Reason for visit: ${valueFor("symptoms")}`,
    ].join("\n");
    const whatsappUrl = new URL(`https://wa.me/${whatsappNumber}`);
    whatsappUrl.searchParams.set("text", message);

    window.location.assign(whatsappUrl.toString());
  }

  return (
    <form id={id} className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}