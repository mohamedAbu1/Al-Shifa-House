import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دار الدواء — رعايتك الصحية بين أيدي أهل الخبرة",
  description: "مساحتك الصحية لإدارة الوصفات ومواعيد الجرعات والاستشارة الصيدلية.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className="antialiased">{children}</body></html>;
}
