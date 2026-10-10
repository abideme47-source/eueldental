import type { Metadata } from "next";
import { Manrope, Archivo } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "DentalCare | Modern Dentistry",
  description: "Built from a Figma design",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${archivo.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
