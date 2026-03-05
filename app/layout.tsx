import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flex America — High-End Signage",
  description:
    "Premium subcontract manufacturing for sign companies. Specialists in Micro-Perf, ChangeGlas™, Neon Style, LED channel letters and block letter signs.",
  keywords:
    "sign manufacturing, channel letters, micro-perf, LED signs, acrylic letters, subcontract manufacturing, ChangeGlas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
