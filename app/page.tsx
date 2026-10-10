"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  Droplets,
  Flower2,
  HeartPulse,
  Home,
  Leaf,
  Languages,
  Mail,
  Moon,
  MapPin,
  Menu,
  MessageCircle,
  Sun,
  PhoneCall,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
  Truck,
  UserRound,
  X,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

type Tip = {
  tag: string;
  title: string;
  body: string;
  source: string;
  sourceUrl: string;
  tone: string;
  Icon: IconType;
};

const conditions = [
  { title: "الضغط والقلب", body: "متابعة واعية لضغط الدم وصحة القلب.", Icon: HeartPulse, tone: "rose" },
  { title: "السكري", body: "منتجات ومعلومات تساعدك على روتين متوازن.", Icon: Activity, tone: "blue" },
  { title: "البرد والحساسية", body: "راحة موسمية وإرشادات للاستخدام الآمن.", Icon: Thermometer, tone: "orange" },
  { title: "الجهاز الهضمي", body: "حلول يومية لطيفة للهضم والراحة.", Icon: Droplets, tone: "mint" },
  { title: "الألم والحرارة", body: "اختيارات واضحة مع سؤال الصيدلي أولًا.", Icon: Pill, tone: "purple" },
  { title: "العناية بالأطفال", body: "عناية موثوقة تناسب احتياجات العائلة.", Icon: ShieldCheck, tone: "sky" },
];

const beautyItems = [
  { title: "عناية البشرة", body: "روتين يومي بسيط لبشرة أكثر نضارة.", Icon: Sparkles, tone: "peach", label: "روتينك اليومي" },
  { title: "العناية بالشعر", body: "منتجات مختارة للعناية بفروة الرأس والشعر.", Icon: Flower2, tone: "lavender", label: "اختيارات لطيفة" },
  { title: "الزيوت الطبيعية", body: "زيوت نقية للاستخدام الخارجي والعناية الشخصية.", Icon: Droplets, tone: "green", label: "طبيعي بعناية" },
  { title: "إكسسوارات صحية", body: "تفاصيل صغيرة تجعل يومك الصحي أسهل.", Icon: ShoppingBag, tone: "blue", label: "أسلوب صحي" },
];

const tips: Tip[] = [
  {
    tag: "ضغط الدم",
    title: "الضغط المرتفع قد لا يسبب أعراضًا واضحة",
    body: "القياس المنتظم لدى مختص أو بجهاز موثوق هو الطريقة الأفضل لاكتشاف ارتفاع الضغط ومتابعته.",
    source: "منظمة الصحة العالمية",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
    tone: "blue",
    Icon: HeartPulse,
  },
  {
    tag: "الاستخدام الآمن",
    title: "المضاد الحيوي لا يعالج نزلات البرد الفيروسية",
    body: "لا تستخدم المضادات الحيوية من نفسك؛ فهي مخصصة لعدوى بكتيرية محددة وقد تسبب آثارًا جانبية عند استخدامها بلا حاجة.",
    source: "مراكز مكافحة الأمراض CDC",
    sourceUrl: "https://www.cdc.gov/common-cold/treatment/index.html",
    tone: "orange",
    Icon: Syringe,
  },
  {
    tag: "السكري",
    title: "الحركة والغذاء المتوازن جزء من رعاية السكري",
    body: "النشاط البدني المنتظم والغذاء الصحي يساعدان على الوقاية من السكري من النوع الثاني وتقليل مضاعفاته مع المتابعة الطبية.",
    source: "منظمة الصحة العالمية",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    tone: "mint",
    Icon: Activity,
  },
  {
    tag: "الأعشاب والمكملات",
    title: "طبيعي لا يعني آمنًا للجميع",
    body: "قد تتداخل الأعشاب والمكملات مع الأدوية أو تؤثر في فعاليتها؛ أخبر طبيبك أو الصيدلي بكل ما تتناوله.",
    source: "هيئة الغذاء والدواء FDA",
    sourceUrl: "https://www.fda.gov/consumers/consumer-updates/mixing-medications-and-dietary-supplements-can-endanger-your-health",
    tone: "purple",
    Icon: Leaf,
  },
];

type Language = "ar" | "en";
type Theme = "light" | "dark";

const translationPairs: Array<[string, string]> = [
  ["صيدلية الشفاء", "Al-Shifa Pharmacy"], ["رعاية أقرب إليك", "Care, closer to you"], ["صحة أفضل تبدأ بخطوة واعية", "A healthier life starts with a mindful step"], ["مفتوح لخدمتك", "Open to serve you"], ["مفتوحة 24/7", "Open 24/7"], ["خدمة على مدار الساعة", "Round-the-clock service"], ["أهلًا بك في", "Welcome to"], ["رعاية موثوقة، إرشاد واضح، واختيارات صحية أقرب إلى حياتك اليومية.", "Trusted care, clear guidance, and healthier choices for everyday life."], ["اكتشف خدمات الشفاء", "Discover Al-Shifa services"], ["معلومات عامة موثوقة مع احترام خصوصيتك", "Reliable general information with respect for your privacy"], ["نعتني بالتفاصيل الصغيرة التي تصنع فرقًا", "We care about the small details that make a difference"], ["دارك الصحي يبدأ من هنا", "Your health journey starts here"],
  ["الرئيسية", "Home"], ["الحالات الصحية", "Health conditions"], ["العناية والجمال", "Beauty & care"], ["إرشادات طبية", "Medical guidance"], ["الإرشادات الطبية", "Medical guidance"], ["العلاج البديل", "Alternative care"], ["فتح القائمة", "Open menu"], ["إغلاق القائمة", "Close menu"], ["البحث", "Search"], ["تسجيل الدخول", "Sign in"], ["العودة إلى الصفحة الرئيسية", "Back to home"], ["سيتم تفعيل البحث قريبًا", "Search will be available soon"], ["تسجيل الدخول سيكون متاحًا قريبًا", "Sign in will be available soon"],
  ["رعاية صحية بطابع إنساني", "Human-centered healthcare"], ["صحتك أولًا،", "Your health comes first,"], ["والاختيار أسهل.", "and choosing is easier."], ["من العلاجات اليومية إلى العناية الطبيعية، نساعدك على اتخاذ قرار صحي أوضح مع إرشاد صيدلي موثوق.", "From everyday treatments to natural care, we help you make clearer health decisions with trusted pharmacy guidance."], ["تصفح الأقسام", "Explore sections"], ["اقرأ إرشاداتنا", "Read our guidance"], ["اختيارات موثوقة", "Trusted choices"], ["خصوصية ووضوح", "Privacy & clarity"], ["اسأل الصيدلي", "Ask the pharmacist"], ["رعاية موثوقة", "Trusted care"], ["كل يوم، بخطوة أوضح", "Every day, one clearer step"], ["اختيارات بعناية", "Carefully selected"], ["لروتينك الصحي", "For your health routine"],
  ["إرشاد صيدلي", "Pharmacy guidance"], ["معلومة مفهومة قبل الاختيار", "Clear information before you choose"], ["خدمة قريبة", "Care close to home"], ["تجربة سهلة من مكان واحد", "An easy experience in one place"], ["طبيعي بوعي", "Natural care, with awareness"], ["لا نخلط الطبيعي بالآمن تلقائيًا", "Natural does not always mean safe"], ["وضوح وخصوصية", "Clarity & privacy"], ["معلوماتك وقرارك في أمان", "Your information and choice stay safe"],
  ["اختيارات تبدأ من احتياجك", "Care tailored to your needs"], ["علاجات الحالات الصحية الشائعة", "Treatments for common health conditions"], ["تعرّف على الأقسام التي تساعدك في روتينك اليومي، واسأل الصيدلي قبل بدء أي علاج جديد.", "Explore sections that support your daily routine, and ask the pharmacist before starting any new treatment."], ["استكشف القسم", "Explore section"], ["سيتم تجهيز قسم ", "The "] , [" قريبًا", " section will be available soon"],
  ["الضغط والقلب", "Blood pressure & heart"], ["متابعة واعية لضغط الدم وصحة القلب.", "Mindful support for blood pressure and heart health."], ["السكري", "Diabetes"], ["منتجات ومعلومات تساعدك على روتين متوازن.", "Products and information for a balanced routine."], ["البرد والحساسية", "Colds & allergies"], ["راحة موسمية وإرشادات للاستخدام الآمن.", "Seasonal relief and safe-use guidance."], ["الجهاز الهضمي", "Digestive health"], ["حلول يومية لطيفة للهضم والراحة.", "Gentle everyday support for digestion and comfort."], ["الألم والحرارة", "Pain & fever"], ["اختيارات واضحة مع سؤال الصيدلي أولًا.", "Clear options, with a pharmacist to guide you."], ["العناية بالأطفال", "Child care"], ["عناية موثوقة تناسب احتياجات العائلة.", "Trusted care for your family’s needs."],
  ["جمال يبدأ من عناية واعية", "Beauty starts with mindful care"], ["روتينك اليومي", "Your daily routine"], ["اختيارات لطيفة", "Gentle choices"], ["طبيعي بعناية", "Natural care, thoughtfully selected"], ["أسلوب صحي", "Healthy style"], ["اختياراتك الطبيعية، بأسلوب أهدأ", "Your natural choices, made simple"], ["منتجات للعناية بالبشرة والشعر والزيوت الطبيعية والإكسسوارات الصحية، مع وصف واضح يساعدك على الاختيار.", "Products for skin, hair, natural oils, and wellness accessories, with clear descriptions to guide your choice."], ["شاهد كل الاختيارات", "See all choices"],
  ["عناية البشرة", "Skin care"], ["روتين يومي بسيط لبشرة أكثر نضارة.", "A simple daily routine for fresher-looking skin."], ["العناية بالشعر", "Hair care"], ["منتجات مختارة للعناية بفروة الرأس والشعر.", "Selected products for scalp and hair care."], ["الزيوت الطبيعية", "Natural oils"], ["زيوت نقية للاستخدام الخارجي والعناية الشخصية.", "Pure oils for external use and personal care."], ["إكسسوارات صحية", "Wellness accessories"], ["تفاصيل صغيرة تجعل يومك الصحي أسهل.", "Small details that make your health routine easier."], ["سيتم فتح ", "Opening the "], ["سيتم عرض المنتجات قريبًا", "Products will be shown soon"],
  ["نبض المعرفة", "Health insights"], ["إرشادات طبية مهمة", "Important medical guidance"], ["معلومات مختصرة من مصادر صحية رسمية، لتساعدك على السؤال الصحيح في الوقت المناسب.", "Brief information from official health sources to help you ask the right question at the right time."], ["الإرشاد السابق", "Previous guidance"], ["الإرشاد التالي", "Next guidance"], ["المصدر: ", "Source: "], ["عرض إرشاد ", "Show guidance "],
  ["ضغط الدم", "Blood pressure"], ["الضغط المرتفع قد لا يسبب أعراضًا واضحة", "High blood pressure may have no obvious symptoms"], ["القياس المنتظم لدى مختص أو بجهاز موثوق هو الطريقة الأفضل لاكتشاف ارتفاع الضغط ومتابعته.", "Regular checks by a professional or with a reliable device are the best way to detect and monitor high blood pressure."], ["منظمة الصحة العالمية", "World Health Organization"], ["الاستخدام الآمن", "Safe use"], ["المضاد الحيوي لا يعالج نزلات البرد الفيروسية", "Antibiotics do not treat viral colds"], ["لا تستخدم المضادات الحيوية من نفسك؛ فهي مخصصة لعدوى بكتيرية محددة وقد تسبب آثارًا جانبية عند استخدامها بلا حاجة.", "Do not self-medicate with antibiotics; they target specific bacterial infections and can cause side effects when unnecessary."], ["مراكز مكافحة الأمراض CDC", "Centers for Disease Control and Prevention (CDC)"], ["الحركة والغذاء المتوازن جزء من رعاية السكري", "Movement and balanced nutrition are part of diabetes care"], ["النشاط البدني المنتظم والغذاء الصحي يساعدان على الوقاية من السكري من النوع الثاني وتقليل مضاعفاته مع المتابعة الطبية.", "Regular activity and healthy food can help prevent type 2 diabetes and reduce complications alongside medical care."], ["الأعشاب والمكملات", "Herbs & supplements"], ["طبيعي لا يعني آمنًا للجميع", "Natural does not mean safe for everyone"], ["قد تتداخل الأعشاب والمكملات مع الأدوية أو تؤثر في فعاليتها؛ أخبر طبيبك أو الصيدلي بكل ما تتناوله.", "Herbs and supplements can interact with medicines or affect their action; tell your doctor or pharmacist everything you take."], ["هيئة الغذاء والدواء FDA", "Food and Drug Administration (FDA)"],
  ["توازن من الطبيعة", "Balance from nature"], ["العلاج البديل", "Alternative care"], ["بعلم ومسؤولية", "with science and responsibility"], ["نعرّفك على الأعشاب والمكملات كجزء من حوار صحي متكامل، لا كبديل عن وصفة الطبيب أو المتابعة اللازمة.", "We introduce herbs and supplements as part of a complete health conversation—not a replacement for a doctor’s prescription or necessary follow-up."], ["مراجعة التداخلات الدوائية", "Review medicine interactions"], ["اختيار مصادر موثوقة", "Choose trusted sources"], ["سؤال الصيدلي قبل الاستخدام", "Ask the pharmacist before use"], ["استكشف الدليل", "Explore the guide"], ["اعرف التداخلات", "Know the interactions"], ["لا توقف دواءك بنفسك", "Never stop your medicine on your own"], ["سيتم فتح دليل العلاج البديل قريبًا", "The alternative-care guide will be available soon"],
  ["تحتاج إجابة واضحة؟", "Need a clear answer?"], ["اسأل الصيدلي قبل أن تحتار.", "Ask the pharmacist when you need clarity."], ["خطوة صغيرة من السؤال قد تجعل اختيارك الصحي أكثر أمانًا.", "One small question can make your health choice safer."], ["تواصل معنا", "Contact us"], ["سيتم تفعيل الاستشارة قريبًا", "Consultation will be available soon"], ["في صيدلية الشفاء، نؤمن أن الرعاية الصحية تبدأ من معلومة واضحة وقلب حاضر.", "At Al-Shifa Pharmacy, we believe healthcare starts with clear information and a caring presence."], ["روابط سريعة", "Quick links"], ["خدمات الشفاء", "Al-Shifa services"], ["رفع وصفة طبية", "Upload a prescription"], ["سيتم تفعيل رفع الوصفة قريبًا", "Prescription upload will be available soon"], ["توصيل إلى المنزل", "Home delivery"], ["سيتم تفعيل التوصيل قريبًا", "Delivery will be available soon"], ["استشارة صيدلي", "Pharmacist consultation"], ["القاهرة، مصر", "Cairo, Egypt"], ["جميع الحقوق محفوظة.", "All rights reserved."], ["هذه المعلومات للتوعية ولا تغني عن استشارة الطبيب.", "This information is educational and does not replace medical advice."], ["إغلاق التنبيه", "Dismiss notification"],
];
function PharmacyMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className={compact ? "pharmacy-brand compact" : "pharmacy-brand"}>
      <span className={light ? "pharmacy-mark light" : "pharmacy-mark"} aria-hidden="true">
        <Image src="/generated/pharmacy-emblem.png" alt="" width={compact ? 52 : 64} height={compact ? 52 : 64} className="pharmacy-emblem-image" unoptimized />
      </span>
      <span className="pharmacy-brand-copy">
        <strong>صيدلية الشفاء</strong>
        <small>رعاية أقرب إليك</small>
      </span>
    </div>
  );
}

function AvailabilityBadge({ compact = false, language }: { compact?: boolean; language: Language }) {
  return (
    <span className={compact ? "availability-badge compact" : "availability-badge"} aria-label={language === "ar" ? "مفتوحة 24/7" : "Open 24/7"}>
      <span className="availability-dot" aria-hidden="true" />
      <span className="availability-icon"><Clock size={compact ? 15 : 17} /></span>
      <span className="availability-copy"><strong>{language === "ar" ? "مفتوحة 24/7" : "Open 24/7"}</strong><small>{language === "ar" ? "خدمة على مدار الساعة" : "Round-the-clock service"}</small></span>
    </span>
  );
}
function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className={light ? "section-heading light" : "section-heading"}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("ar");
  const [theme, setTheme] = useState<Theme>("light");
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedLanguage = window.localStorage.getItem("al-shifa-language");
        const savedTheme = window.localStorage.getItem("al-shifa-theme");
        if (savedLanguage === "en") setLanguage("en");
        if (savedTheme === "dark") setTheme("dark");
      } catch {
        // Preferences remain at their safe defaults when storage is unavailable.
      } finally {
        setPreferencesReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    try {
      if (window.localStorage.getItem("al-shifa-welcome-seen") === "1") {
        timer = window.setTimeout(() => setWelcomeVisible(false), 0);
      }
    } catch {
      // The welcome screen still works when storage is unavailable.
    }
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (welcomeVisible) return;
    const timer = window.setInterval(() => setTipIndex((current) => (current + 1) % tips.length), 8500);
    return () => window.clearInterval(timer);
  }, [welcomeVisible]);

  const currentTip = useMemo(() => tips[tipIndex], [tipIndex]);

  const enterHome = () => {
    try {
      window.localStorage.setItem("al-shifa-welcome-seen", "1");
    } catch {
      // Continue without persistence.
    }
    setWelcomeVisible(false);
  };

  const goTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3600);
  };

  const nextTip = () => setTipIndex((current) => (current + 1) % tips.length);
  const previousTip = () => setTipIndex((current) => (current - 1 + tips.length) % tips.length);

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    try {
        window.localStorage.setItem("al-shifa-language", language);
        window.localStorage.setItem("al-shifa-theme", theme);
    } catch {
      // Preferences remain available for the current session.
    }
    const timer = window.setTimeout(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      const pairs = [...(language === "en" ? translationPairs : translationPairs.map(([arabic, english]) => [english, arabic] as [string, string]))].sort(([fromA], [fromB]) => fromB.length - fromA.length);
      nodes.forEach((node) => {
        let value = node.nodeValue ?? "";
        pairs.forEach(([from, to]) => {
          if (from) value = value.split(from).join(to);
        });
        node.nodeValue = value;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [language, theme, preferencesReady, tipIndex, toast, welcomeVisible]);

  const toggleLanguage = () => setLanguage((current) => (current === "ar" ? "en" : "ar"));
  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));
  const DirectionArrow = language === "ar" ? ArrowLeft : ArrowRight;

  if (welcomeVisible) {
    return (
      <main className="welcome-screen" dir={language === "ar" ? "rtl" : "ltr"} data-theme={theme}>
        <div className="welcome-backdrop" />
        <div className="welcome-glow glow-one" />
        <div className="welcome-glow glow-two" />
        <div className="welcome-content">
          <div className="welcome-topline"><span>صحة أفضل تبدأ بخطوة واعية</span><AvailabilityBadge language={language} /><span className="welcome-preferences"><button className="welcome-control" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}>{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}</button><button className="welcome-control welcome-language" type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}><Languages size={14} /><span>{language === "ar" ? "EN" : "عربي"}</span></button></span></div>
          <div className="welcome-center">
            <div className="welcome-logo-wrap"><PharmacyMark light /></div>
            <span className="welcome-kicker">أهلًا بك في</span>
            <h1>صيدلية الشفاء</h1>
            <p>رعاية موثوقة، إرشاد واضح، واختيارات صحية أقرب إلى حياتك اليومية.</p>
            <button className="welcome-cta" type="button" onClick={enterHome}>اكتشف خدمات الشفاء <DirectionArrow size={19} /></button>
            <span className="welcome-note"><ShieldCheck size={14} /> معلومات عامة موثوقة مع احترام خصوصيتك</span>
          </div>
          <div className="welcome-bottomline"><span>نعتني بالتفاصيل الصغيرة التي تصنع فرقًا</span><span>دارك الصحي يبدأ من هنا</span></div>
        </div>
      </main>
    );
  }

  return (
    <main className="site-shell" dir={language === "ar" ? "rtl" : "ltr"} data-theme={theme}>
      <div className="site-background" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu-button" type="button" aria-label={language === "ar" ? "فتح القائمة" : "Open menu"} aria-expanded={mobileMenu} onClick={() => setMobileMenu(true)}><Menu size={22} /></button>
          <button className="header-brand-button" type="button" onClick={() => goTo("home")} aria-label={language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to home"}><PharmacyMark compact /></button>
          <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
            <button className="mobile-nav-close" type="button" aria-label={language === "ar" ? "إغلاق القائمة" : "Close menu"} onClick={() => setMobileMenu(false)}><X size={20} /></button>
            <button type="button" onClick={() => goTo("home")}><Home size={18} /><span className="nav-label">الرئيسية</span></button>
            <button type="button" onClick={() => goTo("conditions")}><Activity size={18} /><span className="nav-label">الحالات الصحية</span></button>
            <button type="button" onClick={() => goTo("beauty")}><Sparkles size={18} /><span className="nav-label">العناية والجمال</span></button>
            <button type="button" onClick={() => goTo("tips")}><BookOpen size={18} /><span className="nav-label">إرشادات طبية</span></button>
            <button type="button" onClick={() => goTo("natural")}><Leaf size={18} /><span className="nav-label">العلاج البديل</span></button>
          </nav>
          <div className="header-actions">
            <AvailabilityBadge language={language} />
            <div className="header-utility-row">
              <button className="header-theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"} title={theme === "light" ? "Dark mode" : "Light mode"}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
              <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"} title={language === "ar" ? "English" : "العربية"}><Languages size={16} /><span>{language === "ar" ? "EN" : "عربي"}</span></button>
              <button className="header-search" type="button" aria-label={language === "ar" ? "البحث" : "Search"} onClick={() => showToast("سيتم تفعيل البحث قريبًا")}><Search size={19} /></button>
            </div>
            <button className="header-login" type="button" onClick={() => showToast("تسجيل الدخول سيكون متاحًا قريبًا")}><UserRound size={17} /><span>تسجيل الدخول</span></button>
          </div>
        </div>
      </header>

      <section id="home" className="public-hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-copy-public">
            <span className="hero-kicker"><span /> رعاية صحية بطابع إنساني</span>
            <h1>صحتك أولًا،<br /><strong>والاختيار أسهل.</strong></h1>
            <p>من العلاجات اليومية إلى العناية الطبيعية، نساعدك على اتخاذ قرار صحي أوضح مع إرشاد صيدلي موثوق.</p>
            <div className="hero-actions-public">
              <button className="button-primary" type="button" onClick={() => goTo("conditions")}>تصفح الأقسام <DirectionArrow size={18} /></button>
              <button className="button-ghost" type="button" onClick={() => goTo("tips")}><BookOpen size={18} /> اقرأ إرشاداتنا</button>
            </div>
            <div className="hero-trust-row"><span><BadgeCheck size={17} /> اختيارات موثوقة</span><span><ShieldCheck size={17} /> خصوصية ووضوح</span><span><MessageCircle size={17} /> اسأل الصيدلي</span></div>
          </div>
          <div className="hero-visual-public">
            <div className="hero-circle" />
            <Image className="hero-pharmacist" src="/generated/hero-pharmacist.png" alt="صيدلي من فريق الشفاء" width={880} height={640} priority />
            <div className="hero-floating-card card-top"><span className="floating-icon"><CircleCheck size={17} /></span><span><strong>رعاية موثوقة</strong><small>كل يوم، بخطوة أوضح</small></span></div>
            <div className="hero-floating-card card-bottom"><span className="floating-stars">★★★★★</span><span><strong>اختيارات بعناية</strong><small>لروتينك الصحي</small></span></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label={language === "ar" ? "مزايا الشفاء" : "Al-Shifa benefits"}>
        <div><span className="trust-icon"><Stethoscope size={21} /></span><span><strong>إرشاد صيدلي</strong><small>معلومة مفهومة قبل الاختيار</small></span></div>
        <div><span className="trust-icon"><Truck size={21} /></span><span><strong>خدمة قريبة</strong><small>تجربة سهلة من مكان واحد</small></span></div>
        <div><span className="trust-icon"><Leaf size={21} /></span><span><strong>طبيعي بوعي</strong><small>لا نخلط الطبيعي بالآمن تلقائيًا</small></span></div>
        <div><span className="trust-icon"><ShieldCheck size={21} /></span><span><strong>وضوح وخصوصية</strong><small>معلوماتك وقرارك في أمان</small></span></div>
      </section>

      <section id="conditions" className="content-section conditions-section">
        <SectionHeading eyebrow="اختيارات تبدأ من احتياجك" title="علاجات الحالات الصحية الشائعة" body="تعرّف على الأقسام التي تساعدك في روتينك اليومي، واسأل الصيدلي قبل بدء أي علاج جديد." />
        <div className="condition-grid">
          {conditions.map(({ title, body, Icon, tone }) => (
            <button className="condition-card" type="button" key={title} onClick={() => showToast("سيتم تجهيز قسم " + title + " قريبًا")}>
              <span className={"category-icon " + tone}><Icon size={25} /></span>
              <span className="card-arrow">{language === "ar" ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}</span>
              <strong>{title}</strong>
              <small>{body}</small>
              <span className="category-link">استكشف القسم <DirectionArrow size={14} /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="beauty" className="content-section beauty-section">
        <div className="beauty-image-panel">
          <Image src="/generated/health-basics-card.png" alt="منتجات عناية صحية طبيعية" width={480} height={260} />
          <div className="beauty-image-caption"><span><Sparkles size={15} /></span><strong>جمال يبدأ من عناية واعية</strong></div>
        </div>
        <div className="beauty-content">
          <SectionHeading eyebrow="العناية والجمال" title="اختياراتك الطبيعية، بأسلوب أهدأ" body="منتجات للعناية بالبشرة والشعر والزيوت الطبيعية والإكسسوارات الصحية، مع وصف واضح يساعدك على الاختيار." />
          <div className="beauty-grid">
            {beautyItems.map(({ title, body, Icon, tone, label }) => (
              <button className="beauty-card" type="button" key={title} onClick={() => showToast("سيتم فتح " + title + " قريبًا")}>
                <span className={"beauty-icon " + tone}><Icon size={21} /></span>
                <span><strong>{title}</strong><small>{body}</small></span>
                <em>{label}</em>
              </button>
            ))}
          </div>
          <button className="text-link" type="button" onClick={() => showToast("سيتم عرض المنتجات قريبًا")}>شاهد كل الاختيارات <DirectionArrow size={17} /></button>
        </div>
      </section>

      <section id="tips" className="tips-section">
        <div className="tips-inner">
          <div className="tips-heading">
            <SectionHeading light eyebrow="نبض المعرفة" title="إرشادات طبية مهمة" body="معلومات مختصرة من مصادر صحية رسمية، لتساعدك على السؤال الصحيح في الوقت المناسب." />
            <div className="tip-controls"><button type="button" aria-label={language === "ar" ? "الإرشاد السابق" : "Previous guidance"} onClick={previousTip}>{language === "ar" ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}</button><span>{String(tipIndex + 1).padStart(2, "0")} / {String(tips.length).padStart(2, "0")}</span><button type="button" aria-label={language === "ar" ? "الإرشاد التالي" : "Next guidance"} onClick={nextTip}>{language === "ar" ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}</button></div>
          </div>
          <article className={"tip-card tip-" + currentTip.tone} aria-live="polite">
            <div className="tip-visual"><div className="tip-orbit orbit-one" /><div className="tip-orbit orbit-two" /><span>{(() => { const TipIcon = currentTip.Icon; return <TipIcon size={42} strokeWidth={1.5} />; })()}</span></div>
            <div className="tip-copy"><span className="tip-tag">{currentTip.tag}</span><h3>{currentTip.title}</h3><p>{currentTip.body}</p><a href={currentTip.sourceUrl} target="_blank" rel="noreferrer">المصدر: {currentTip.source} <DirectionArrow size={15} /></a></div>
          </article>
          <div className="tip-dots" aria-label={language === "ar" ? "التنقل بين الإرشادات" : "Guidance navigation"}>{tips.map((tip, index) => <button key={tip.tag} type="button" className={index === tipIndex ? "active" : ""} aria-label={language === "ar" ? "عرض إرشاد " + (index + 1) : "Show guidance " + (index + 1)} aria-current={index === tipIndex} onClick={() => setTipIndex(index)} />)}</div>
        </div>
      </section>

      <section id="natural" className="natural-section content-section">
        <div className="natural-copy">
          <span className="natural-badge"><Leaf size={16} /> توازن من الطبيعة</span>
          <h2>العلاج البديل<br /><strong>بعلم ومسؤولية</strong></h2>
          <p>نعرّفك على الأعشاب والمكملات كجزء من حوار صحي متكامل، لا كبديل عن وصفة الطبيب أو المتابعة اللازمة.</p>
          <div className="natural-points"><span><CircleCheck size={17} /> مراجعة التداخلات الدوائية</span><span><CircleCheck size={17} /> اختيار مصادر موثوقة</span><span><CircleCheck size={17} /> سؤال الصيدلي قبل الاستخدام</span></div>
          <button className="button-primary dark-button" type="button" onClick={() => showToast("سيتم فتح دليل العلاج البديل قريبًا")}>استكشف الدليل <DirectionArrow size={18} /></button>
        </div>
        <div className="natural-art"><div className="leaf-orb orb-main"><Leaf size={72} /></div><div className="leaf-orb orb-small"><Droplets size={30} /></div><span className="natural-pill pill-one">اعرف التداخلات</span><span className="natural-pill pill-two">لا توقف دواءك بنفسك</span></div>
      </section>

      <section className="consultation-banner content-section">
        <div><span className="section-eyebrow">تحتاج إجابة واضحة؟</span><h2>اسأل الصيدلي قبل أن تحتار.</h2><p>خطوة صغيرة من السؤال قد تجعل اختيارك الصحي أكثر أمانًا.</p></div>
        <button className="button-primary" type="button" onClick={() => showToast("سيتم تفعيل الاستشارة قريبًا")}>تواصل معنا <MessageCircle size={18} /></button>
      </section>

      <footer id="footer" className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><PharmacyMark light /><p>في صيدلية الشفاء، نؤمن أن الرعاية الصحية تبدأ من معلومة واضحة وقلب حاضر.</p><div className="social-links"><a href="#footer" aria-label="فيسبوك"><span aria-hidden="true">f</span></a><a href="#footer" aria-label="إنستغرام"><span aria-hidden="true">ig</span></a><a href="#footer" aria-label="يوتيوب"><span aria-hidden="true">▶</span></a></div></div>
          <div className="footer-column"><strong>روابط سريعة</strong><button type="button" onClick={() => goTo("conditions")}>الحالات الصحية</button><button type="button" onClick={() => goTo("beauty")}>العناية والجمال</button><button type="button" onClick={() => goTo("tips")}>الإرشادات الطبية</button></div>
          <div className="footer-column"><strong>خدمات الشفاء</strong><button type="button" onClick={() => showToast("سيتم تفعيل رفع الوصفة قريبًا")}>رفع وصفة طبية</button><button type="button" onClick={() => showToast("سيتم تفعيل التوصيل قريبًا")}>توصيل إلى المنزل</button><button type="button" onClick={() => showToast("سيتم تفعيل الاستشارة قريبًا")}>استشارة صيدلي</button></div>
          <div className="footer-contact"><strong>تواصل معنا</strong><span><PhoneCall size={16} /> ١٦٦٢٣</span><span><Mail size={16} /> hello@alshifa.example</span><span><MapPin size={16} /> القاهرة، مصر</span></div>
        </div>
        <div className="footer-bottom"><span>© ٢٠٢٦ صيدلية الشفاء. جميع الحقوق محفوظة.</span><span>هذه المعلومات للتوعية ولا تغني عن استشارة الطبيب.</span></div>
      </footer>

      {toast ? <div className="site-toast" role="status"><CircleCheck size={17} /> {toast}<button type="button" aria-label={language === "ar" ? "إغلاق التنبيه" : "Dismiss notification"} onClick={() => setToast(null)}><X size={15} /></button></div> : null}
    </main>
  );
}

export default App;