import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "NoarBeauty AI — Analiza lica veštačkom inteligencijom",
  description:
    "Profesionalna cefalometrijska analiza lica zasnovana na Farkas i Powell standardima. Saznajte sve o proporcijama, simetriji i estetici vašeg lica.",
  keywords: ["analiza lica", "cefalometrija", "zlatni rez", "estetika lica", "AI analiza"],
  openGraph: {
    title: "NoarBeauty AI",
    description: "AI analiza lica — simetrija, proporcije, skin analiza",
    url: "https://noarbeauty.ai",
    siteName: "NoarBeauty AI",
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <PostHogProvider>
          {children}
          <Toaster theme="dark" position="top-right" richColors />
        </PostHogProvider>
      </body>
    </html>
  );
}
