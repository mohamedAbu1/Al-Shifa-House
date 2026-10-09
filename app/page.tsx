"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  CircleHelp,
  Clock3,
  FileText,
  House,
  Leaf,
  Menu,
  MessageCircle,
  Pill,
  Plus,
  ShieldCheck,
  Truck,
  UserRound,
  X,
} from "lucide-react";

type Language = "ar" | "en";
type NavKey = "home" | "prescriptions" | "doses" | "consultation" | "profile";
type QuickKey = "prescriptions" | "doses" | "ask" | "profile";
type CardKey = "prescriptions" | "doses" | "ask" | "profile";
type DoseKey = "morning" | "afternoon" | "evening";

const translations = {
  ar: {
    switchTo: "English",
    languageShort: "EN",
    date: "الأربعاء، ٧ أكتوبر ٢٠٢٦",
    morningGreeting: "صباح الخير، محمد",
    registeredPatient: "مريض مسجل",
    healthSpace: "مساحتك الصحية",
    nav: { home: "الرئيسية", prescriptions: "وصفاتي", doses: "مواعيد الجرعات", consultation: "استشارة صيدلي", profile: "ملفي الصحي" },
    helpTitle: "تحتاج مساعدة؟",
    helpBody: "نحن هنا من أجلك",
    greeting: "أهلاً بك،",
    heroTitle: "رعايتك الصحية",
    heroTitleAccent: "بين أيدي أهل الخبرة",
    heroCopy: "إرشاد صيدلي موثوق، إدارة وصفاتك، ومتابعة جرعاتك ... لصحة أفضل كل يوم.",
    bookConsultation: "احجز استشارة",
    howItWorks: "كيف يعمل دار الدواء؟",
    trustedCare: "رعاية موثوقة",
    everyDay: "كل يوم",
    benefits: ["استشارة صيدلي معتمد", "مراجعة الأدوية والتفاعلات", "متابعة آمنة لرحلتك العلاجية"],
    availableNow: "متاح الآن",
    consultBanner: ["احجز استشارة", "مع صيدلي"],
    servicesEyebrow: "كل ما تحتاجه في مكان واحد",
    servicesTitle: "ماذا تريد أن تفعل اليوم؟",
    allServices: "عرض كل الخدمات",
    quick: {
      prescriptions: ["وصفاتي الطبية", "كل وصفاتك"],
      doses: ["مواعيد الجرعات", "جرعاتك اليوم"],
      ask: ["اسأل الصيدلي", "إجابة موثوقة"],
      profile: ["ملفي الصحي", "بياناتك الصحية"],
    },
    dashboardEyebrow: "خدمات دار الدواء",
    dashboardTitle: "كل رعايتك في متناول يدك",
    cards: {
      prescriptions: ["وصفاتي الطبية", "جميع وصفاتك في مكان واحد بإشراف الصيدلي."],
      doses: ["مواعيد جرعاتي", "تذكيرات بمواعيد أدويتك للاستخدام المنتظم."],
      ask: ["اسأل الصيدلي", "احصل على إجابات موثوقة من صيدلي مختص."],
      profile: ["ملفي الصحي", "معلوماتك الصحية للمساعدة في رعاية أفضل."],
    },
    todayEyebrow: "متابعة اليوم",
    doseTitle: "مواعيد الجرعات",
    doseTodayEyebrow: "لا تنسَ جرعاتك",
    doseTodayTitle: "مواعيد الجرعات اليوم",
    doseHint: "اضغط على الجرعة عند أخذها لتبقى متابعًا.",
    doseCompleted: "تم أخذها",
    doseProgress: "جرعة واحدة مكتملة",
    doseCount: "1/3",
    doses: {
      morning: ["صباحاً", "جرعة الصباح"],
      afternoon: ["ظهراً", "جرعة الظهر"],
      evening: ["مساءً", "جرعة المساء"],
    },
    deliveryEyebrow: "بضغطة واحدة",
    deliveryTitle: "توصيل إلى المنزل",
    deliveryBody: "استلم أدويتك بسهولة وأمان.",
    basicsEyebrow: "اختيارات لك",
    basicsTitle: "أساسيات صحية موصى بها",
    basicsBody: "نصائح ومنتجات مختارة لدعم نمط حياتك الصحي.",
    upload: "رفع وصفة",
    uploadBody: "أرسل وصفتك بسهولة",
    deliveryShort: "سريع وآمن حتى بابك",
    privacy: "معلوماتك الصحية محمية وسرية",
    disclaimer: "تنبيه: هذه الخدمة لا تغني عن استشارة الطبيب المختص عند الحاجة.",
    defaultNotice: "نظرة سريعة على يومك الصحي",
    nextStep: "هذه المساحة ستصبح متاحة في خطوتك القادمة.",
  },
  en: {
    switchTo: "العربية",
    languageShort: "ع",
    date: "Wednesday, October 7, 2026",
    morningGreeting: "Good morning, Mohammed",
    registeredPatient: "Registered patient",
    healthSpace: "Your health space",
    nav: { home: "Home", prescriptions: "My prescriptions", doses: "Dose schedule", consultation: "Ask a pharmacist", profile: "Health profile" },
    helpTitle: "Need help?",
    helpBody: "We are here for you",
    greeting: "Welcome,",
    heroTitle: "Your health care",
    heroTitleAccent: "in expert hands",
    heroCopy: "Trusted pharmacy guidance, prescription management, and dose tracking ... for better health every day.",
    bookConsultation: "Book a consultation",
    howItWorks: "How Dar Al-Dawaa works",
    trustedCare: "Trusted care",
    everyDay: "Every day",
    benefits: ["Certified pharmacist advice", "Medication and interaction review", "Safe support for your care journey"],
    availableNow: "Available now",
    consultBanner: ["Book a consultation", "with a pharmacist"],
    servicesEyebrow: "Everything you need in one place",
    servicesTitle: "What would you like to do today?",
    allServices: "View all services",
    quick: {
      prescriptions: ["My prescriptions", "All your prescriptions"],
      doses: ["Dose schedule", "Your doses today"],
      ask: ["Ask a pharmacist", "Trusted answers"],
      profile: ["Health profile", "Your health data"],
    },
    dashboardEyebrow: "Dar Al-Dawaa services",
    dashboardTitle: "Your care, within reach",
    cards: {
      prescriptions: ["My prescriptions", "All your prescriptions in one place, guided by your pharmacist."],
      doses: ["My dose schedule", "Gentle reminders for your medication routine."],
      ask: ["Ask a pharmacist", "Get trusted answers from a qualified pharmacist."],
      profile: ["Health profile", "Your health information for more personal care."],
    },
    todayEyebrow: "Today’s progress",
    doseTitle: "Dose schedule",
    doseTodayEyebrow: "Stay on track",
    doseTodayTitle: "Today’s doses",
    doseHint: "Tap a dose when you take it to keep track.",
    doseCompleted: "Taken",
    doseProgress: "One dose completed",
    doseCount: "1/3",
    doses: {
      morning: ["Morning", "Morning dose"],
      afternoon: ["Afternoon", "Afternoon dose"],
      evening: ["Evening", "Evening dose"],
    },
    deliveryEyebrow: "One tap away",
    deliveryTitle: "Home delivery",
    deliveryBody: "Receive your medicines with ease and care.",
    basicsEyebrow: "Picked for you",
    basicsTitle: "Recommended health essentials",
    basicsBody: "Thoughtful tips and products to support a healthier routine.",
    upload: "Upload a prescription",
    uploadBody: "Send your prescription easily",
    deliveryShort: "Fast and safe to your door",
    privacy: "Your health information stays private",
    disclaimer: "Note: this service does not replace advice from your doctor when needed.",
    defaultNotice: "A quick view of your health day",
    nextStep: "This space will be available in your next step.",
  },
} as const;

type Copy = (typeof translations)[Language];

const navItems: { key: NavKey; icon: typeof House }[] = [
  { key: "home", icon: House },
  { key: "prescriptions", icon: FileText },
  { key: "doses", icon: CalendarDays },
  { key: "consultation", icon: MessageCircle },
  { key: "profile", icon: UserRound },
];

const quickActions: { key: QuickKey; icon: typeof FileText; tone: string }[] = [
  { key: "prescriptions", icon: FileText, tone: "blue" },
  { key: "doses", icon: Clock3, tone: "orange" },
  { key: "ask", icon: MessageCircle, tone: "green" },
  { key: "profile", icon: UserRound, tone: "purple" },
];

const cardData: { key: CardKey; icon: typeof FileText; tone: string; art: string }[] = [
  { key: "prescriptions", icon: FileText, tone: "blue", art: "prescription" },
  { key: "doses", icon: Clock3, tone: "mint", art: "timeline" },
  { key: "ask", icon: MessageCircle, tone: "sky", art: "chat" },
  { key: "profile", icon: UserRound, tone: "purple", art: "profile" },
];

const doseItems: { key: DoseKey; time: string; tone: "mint" | "orange" | "blue"; icon: "sun" | "pill" | "moon" }[] = [
  { key: "morning", time: "08:00", tone: "mint", icon: "sun" },
  { key: "afternoon", time: "14:00", tone: "orange", icon: "pill" },
  { key: "evening", time: "20:00", tone: "blue", icon: "moon" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "brand brand-compact" : "brand"}><span className="brand-mark" aria-hidden="true"><Plus size={compact ? 24 : 30} strokeWidth={3.2} /><Leaf className="brand-leaf" size={compact ? 14 : 17} strokeWidth={2.6} /></span><span className="brand-wordmark">دار الدواء</span></div>;
}

function IconBubble({ children, tone }: { children: ReactNode; tone: string }) {
  return <span className={`icon-bubble icon-${tone}`}>{children}</span>;
}

function CardArtwork({ kind, alt }: { kind: string; alt: string }) {
  if (kind === "timeline") return <div className="art-mini-timeline" aria-hidden="true"><div><b className="dot mint-dot" /><span>08:00</span><em>✓</em></div><div><b className="dot blue-dot" /><span>14:00</span><em className="bell-dot">◔</em></div><div><b className="dot orange-dot" /><span>20:00</span><em className="bell-dot">◔</em></div></div>;
  const src = kind === "prescription" ? "/generated/prescription-card.png" : kind === "chat" ? "/generated/ask-pharmacist-card.png" : "/generated/health-profile-card.png";
  return <Image className={`card-art-image card-art-${kind}`} src={src} alt={alt} width={400} height={260} loading="lazy" />;
}

function DoseIcon({ icon }: { icon: "sun" | "pill" | "moon" }) {
  if (icon === "sun") return <span className="dose-sun">☀</span>;
  if (icon === "moon") return <span className="dose-moon">☾</span>;
  return <span className="dose-pill"><Pill size={17} /></span>;
}

function DoseTimeline({ language, compact = false }: { language: Language; compact?: boolean }) {
  const copy = translations[language];
  const [completed, setCompleted] = useState<string[]>(["08:00"]);
  const toggleDose = (time: string) => setCompleted((current) => current.includes(time) ? current.filter((item) => item !== time) : [...current, time]);
  return <div className={compact ? "dose-list compact" : "dose-list"}>{doseItems.map((dose) => { const isDone = completed.includes(dose.time); const info = copy.doses[dose.key]; return <button className={`dose-row ${isDone ? "is-done" : ""}`} key={dose.time} onClick={() => toggleDose(dose.time)} type="button" aria-pressed={isDone}><span className={`dose-marker ${dose.tone}`} /><span className="dose-copy"><strong>{info[0]}</strong><small>{dose.time}</small></span><DoseIcon icon={dose.icon} /><span className={`dose-note ${isDone ? "visible" : ""}`}>{isDone ? copy.doseCompleted : info[1]}</span><span className={`dose-check ${isDone ? "checked" : ""}`}>{isDone && <Check size={14} strokeWidth={3} />}</span></button>; })}</div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [activeNav, setActiveNav] = useState<NavKey>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy: Copy = translations[language];
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const handleAction = (label: string) => setNotice(`${label} — ${copy.nextStep}`);
  const toggleLanguage = () => {
    setNotice(null);
    setLanguage((current) => current === "ar" ? "en" : "ar");
  };
  const currentNav = (key: NavKey) => copy.nav[key];

  return <main className="app-shell" dir={language === "ar" ? "rtl" : "ltr"}>
    <div className="scene-backdrop" aria-hidden="true" />
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="sidebar-top"><Logo /><button className="sidebar-close" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={20} /></button></div>
      <p className="sidebar-kicker">{copy.healthSpace}</p>
      <nav className="side-nav" aria-label="Primary navigation">{navItems.map((item) => { const Icon = item.icon; const active = activeNav === item.key; return <button className={`side-link ${active ? "active" : ""}`} key={item.key} type="button" onClick={() => { setActiveNav(item.key); handleAction(currentNav(item.key)); setMobileOpen(false); }}><Icon size={21} strokeWidth={active ? 2.6 : 2} /><span>{currentNav(item.key)}</span>{active && <span className="side-link-dot" />}</button>; })}</nav>
      <div className="sidebar-help"><span className="help-orb"><CircleHelp size={22} /></span><div><strong>{copy.helpTitle}</strong><span>{copy.helpBody}</span></div><button type="button" aria-label={copy.helpTitle} onClick={() => handleAction(copy.helpTitle)}><ChevronLeft size={18} /></button></div><div className="sidebar-decoration"><Leaf size={130} strokeWidth={0.8} /></div>
    </aside>
    {mobileOpen && <button className="backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <section className="main-content">
      <header className="topbar"><button className="menu-button" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={22} /></button><div className="topbar-context"><span className="eyebrow">{copy.date}</span><span className="context-title">{copy.morningGreeting} <span aria-hidden="true">✦</span></span></div><div className="topbar-actions"><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={copy.switchTo}><span>{copy.languageShort}</span><small>{copy.switchTo}</small></button><button className="icon-button notification" type="button" aria-label="Notifications" onClick={() => handleAction(language === "ar" ? "الإشعارات" : "Notifications")}><Bell size={21} /><span /></button><button className="profile-chip" type="button" onClick={() => handleAction(copy.nav.profile)}><span className="profile-avatar"><UserRound size={20} /></span><span className="profile-chip-copy"><strong>Mohammed Ahmed</strong><small>{copy.registeredPatient}</small></span><ChevronLeft size={17} /></button></div></header>
      <div className="mobile-brand-row"><Logo compact /><button className="language-switch" type="button" onClick={toggleLanguage} aria-label={copy.switchTo}><span>{copy.languageShort}</span><small>{copy.switchTo}</small></button></div>
      <div className="content-wrap">
        <section className="welcome-row"><div><p className="mobile-greeting">{copy.greeting}</p><h1>{copy.heroTitle}<br /><span>{copy.heroTitleAccent}</span></h1><p className="hero-copy">{copy.heroCopy}</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => handleAction(copy.bookConsultation)}><CalendarDays size={19} /> {copy.bookConsultation} <ChevronLeft size={20} /></button><button className="quiet-button" type="button" onClick={() => handleAction(copy.howItWorks)}><span className="quiet-play">▶</span> {copy.howItWorks}</button></div></div><div className="hero-visual-wrap"><div className="hero-shelves"><span /><span /><span /><span /><span /><span /></div><Image className="hero-pharmacist-image" src="/generated/hero-pharmacist.png" alt={language === "ar" ? "صيدلي دار الدواء" : "Dar Al-Dawaa pharmacist"} width={880} height={640} priority /><div className="hero-stamp"><ShieldCheck size={18} /><span>{copy.trustedCare}<br /><b>{copy.everyDay}</b></span></div><div className="hero-benefits glass-card">{copy.benefits.map((benefit, index) => <div key={benefit}>{index === 0 ? <MessageCircle size={17} /> : index === 1 ? <Pill size={17} /> : <ShieldCheck size={17} />}<span>{benefit}</span></div>)}</div></div></section>
        <section className="mobile-consult-banner" onClick={() => handleAction(copy.nav.consultation)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); handleAction(copy.nav.consultation); } }} role="button" tabIndex={0}><div className="consult-copy"><span>{copy.availableNow}</span><strong>{copy.consultBanner[0]}<br />{copy.consultBanner[1]}</strong><i><ChevronLeft size={18} /></i></div></section>
        <div className="section-heading"><div><span className="eyebrow">{copy.servicesEyebrow}</span><h2>{copy.servicesTitle}</h2></div><button className="link-button" type="button" onClick={() => handleAction(copy.allServices)}>{copy.allServices} <ChevronLeft size={17} /></button></div>
        <section className="quick-actions" aria-label={copy.servicesTitle}>{quickActions.map((action) => { const Icon = action.icon; const item = copy.quick[action.key]; return <button className="quick-action" key={action.key} type="button" onClick={() => handleAction(item[0])}><IconBubble tone={action.tone}><Icon size={24} /></IconBubble><strong>{item[0]}</strong><span>{item[1]}</span></button>; })}</section>
        <div className="dashboard-grid"><section className="section-block feature-section"><div className="section-heading compact-heading"><div><span className="eyebrow">{copy.dashboardEyebrow}</span><h2>{copy.dashboardTitle}</h2></div></div><div className="feature-grid">{cardData.map((card) => { const Icon = card.icon; const item = copy.cards[card.key]; return <button className={`feature-card card-${card.tone}`} key={card.key} type="button" onClick={() => handleAction(item[0])}><div className="feature-card-head"><IconBubble tone={card.tone}><Icon size={22} /></IconBubble><span className="card-arrow"><ChevronLeft size={18} /></span></div><div className="feature-card-copy"><h3>{item[0]}</h3><p>{item[1]}</p></div><CardArtwork kind={card.art} alt={item[0]} /></button>; })}</div></section><section className="dose-panel glass-card"><div className="panel-heading"><div><span className="eyebrow">{copy.todayEyebrow}</span><h2>{copy.doseTitle}</h2></div><span className="panel-icon"><Clock3 size={21} /></span></div><p className="panel-note">{copy.doseHint}</p><DoseTimeline language={language} /><div className="progress-line"><span /><small>{copy.doseProgress}</small><b>{copy.doseCount}</b></div></section></div>
        <section className="lower-grid"><button className="lower-card delivery" type="button" onClick={() => handleAction(copy.deliveryTitle)}><span className="lower-arrow"><ChevronLeft size={18} /></span><div><span className="eyebrow">{copy.deliveryEyebrow}</span><h3>{copy.deliveryTitle}</h3><p>{copy.deliveryBody}</p></div><Image className="delivery-image" src="/generated/delivery-card.png" alt="" width={480} height={260} loading="lazy" /></button><button className="lower-card basics" type="button" onClick={() => handleAction(copy.basicsTitle)}><IconBubble tone="green"><Leaf size={20} /></IconBubble><div><span className="eyebrow">{copy.basicsEyebrow}</span><h3>{copy.basicsTitle}</h3><p>{copy.basicsBody}</p></div><Image className="basics-image" src="/generated/health-basics-card.png" alt="" width={480} height={260} loading="lazy" /></button></section>
        <div className="mobile-only-panels"><section className="mobile-dose glass-card"><div className="panel-heading"><div><span className="eyebrow">{copy.doseTodayEyebrow}</span><h2>{copy.doseTodayTitle}</h2></div><Clock3 size={22} /></div><DoseTimeline compact language={language} /></section><section className="mobile-two-cards"><button type="button" onClick={() => handleAction(copy.upload)}><span className="upload-art"><FileText size={30} /><ArrowUp size={19} /></span><strong>{copy.upload}</strong><small>{copy.uploadBody}</small></button><button type="button" onClick={() => handleAction(copy.deliveryTitle)}><span className="mobile-truck-art"><Truck size={34} /></span><strong>{copy.deliveryTitle}</strong><small>{copy.deliveryShort}</small></button></section></div>
        <footer className="footer-note"><span><ShieldCheck size={16} /> {copy.privacy}</span><span>{copy.disclaimer}</span></footer>
      </div>
      <div className="notice-bar" aria-live="polite"><span className="notice-dot" />{notice ?? copy.defaultNotice}<button type="button" onClick={() => setNotice(null)} aria-label="Dismiss">×</button></div>
    </section>
    <nav className="mobile-tabbar" aria-label="Quick navigation">{[{ key: "home" as NavKey, icon: House }, { key: "prescriptions" as NavKey, icon: FileText }, { key: "doses" as NavKey, icon: Pill }, { key: "profile" as NavKey, icon: UserRound }].map((item) => { const Icon = item.icon; const active = activeNav === item.key; return <button key={item.key} type="button" className={active ? "active" : ""} onClick={() => { setActiveNav(item.key); handleAction(copy.nav[item.key]); }}><Icon size={21} /><span>{copy.nav[item.key]}</span></button>; })}</nav>
  </main>;
}
