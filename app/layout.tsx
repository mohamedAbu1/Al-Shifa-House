import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صيدلية الشفاء — رعاية أقرب إليك",
  description: "رعاية صيدلية موثوقة، إرشادات طبية واضحة، وعناية أقرب إلى حياتك اليومية.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className="antialiased">{children}</body></html>;
}
