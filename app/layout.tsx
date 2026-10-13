import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr Euel Lewi | Speciality Dental Clinic",
  description: "Gentle, modern dental care for patients of all ages in Bole, Addis Ababa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
