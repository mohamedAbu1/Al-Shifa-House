"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Droplets,
  Flower2,
  HeartPulse,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
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

  if (welcomeVisible) {
    return (
      <main className="welcome-screen" dir="rtl">
        <div className="welcome-backdrop" />
        <div className="welcome-glow glow-one" />
        <div className="welcome-glow glow-two" />
        <div className="welcome-content">
          <div className="welcome-topline"><span>صحة أفضل تبدأ بخطوة واعية</span><span className="welcome-status"><CircleCheck size={15} /> مفتوح لخدمتك</span></div>
          <div className="welcome-center">
            <div className="welcome-logo-wrap"><PharmacyMark light /></div>
            <span className="welcome-kicker">أهلًا بك في</span>
            <h1>صيدلية الشفاء</h1>
            <p>رعاية موثوقة، إرشاد واضح، واختيارات صحية أقرب إلى حياتك اليومية.</p>
            <button className="welcome-cta" type="button" onClick={enterHome}>اكتشف خدمات الشفاء <ArrowLeft size={19} /></button>
            <span className="welcome-note"><ShieldCheck size={14} /> معلومات عامة موثوقة مع احترام خصوصيتك</span>
          </div>
          <div className="welcome-bottomline"><span>نعتني بالتفاصيل الصغيرة التي تصنع فرقًا</span><span>دارك الصحي يبدأ من هنا</span></div>
        </div>
      </main>
    );
  }

  return (
    <main className="site-shell" dir="rtl">
      <div className="site-background" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu-button" type="button" aria-label="فتح القائمة" aria-expanded={mobileMenu} onClick={() => setMobileMenu(true)}><Menu size={22} /></button>
          <button className="header-brand-button" type="button" onClick={() => goTo("home")} aria-label="العودة إلى الصفحة الرئيسية"><PharmacyMark compact /></button>
          <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label="التنقل الرئيسي">
            <button className="mobile-nav-close" type="button" aria-label="إغلاق القائمة" onClick={() => setMobileMenu(false)}><X size={20} /></button>
            <button type="button" onClick={() => goTo("conditions")}>الحالات الصحية</button>
            <button type="button" onClick={() => goTo("beauty")}>العناية والجمال</button>
            <button type="button" onClick={() => goTo("tips")}>إرشادات طبية</button>
            <button type="button" onClick={() => goTo("natural")}>العلاج البديل</button>
          </nav>
          <div className="header-actions">
            <button className="header-search" type="button" aria-label="البحث" onClick={() => showToast("سيتم تفعيل البحث قريبًا")}><Search size={19} /></button>
            <button className="header-login" type="button" onClick={() => showToast("تسجيل الدخول سيكون متاحًا قريبًا")}><UserRound size={17} /> تسجيل الدخول</button>
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
              <button className="button-primary" type="button" onClick={() => goTo("conditions")}>تصفح الأقسام <ArrowLeft size={18} /></button>
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

      <section className="trust-strip" aria-label="مزايا الشفاء">
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
              <span className="card-arrow"><ChevronLeft size={17} /></span>
              <strong>{title}</strong>
              <small>{body}</small>
              <span className="category-link">استكشف القسم <ArrowLeft size={14} /></span>
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
          <button className="text-link" type="button" onClick={() => showToast("سيتم عرض المنتجات قريبًا")}>شاهد كل الاختيارات <ArrowLeft size={17} /></button>
        </div>
      </section>

      <section id="tips" className="tips-section">
        <div className="tips-inner">
          <div className="tips-heading">
            <SectionHeading light eyebrow="نبض المعرفة" title="إرشادات طبية مهمة" body="معلومات مختصرة من مصادر صحية رسمية، لتساعدك على السؤال الصحيح في الوقت المناسب." />
            <div className="tip-controls"><button type="button" aria-label="الإرشاد السابق" onClick={previousTip}><ChevronRight size={19} /></button><span>{String(tipIndex + 1).padStart(2, "0")} / {String(tips.length).padStart(2, "0")}</span><button type="button" aria-label="الإرشاد التالي" onClick={nextTip}><ChevronLeft size={19} /></button></div>
          </div>
          <article className={"tip-card tip-" + currentTip.tone} aria-live="polite">
            <div className="tip-visual"><div className="tip-orbit orbit-one" /><div className="tip-orbit orbit-two" /><span>{(() => { const TipIcon = currentTip.Icon; return <TipIcon size={42} strokeWidth={1.5} />; })()}</span></div>
            <div className="tip-copy"><span className="tip-tag">{currentTip.tag}</span><h3>{currentTip.title}</h3><p>{currentTip.body}</p><a href={currentTip.sourceUrl} target="_blank" rel="noreferrer">المصدر: {currentTip.source} <ArrowLeft size={15} /></a></div>
          </article>
          <div className="tip-dots" aria-label="التنقل بين الإرشادات">{tips.map((tip, index) => <button key={tip.tag} type="button" className={index === tipIndex ? "active" : ""} aria-label={"عرض إرشاد " + (index + 1)} aria-current={index === tipIndex} onClick={() => setTipIndex(index)} />)}</div>
        </div>
      </section>

      <section id="natural" className="natural-section content-section">
        <div className="natural-copy">
          <span className="natural-badge"><Leaf size={16} /> توازن من الطبيعة</span>
          <h2>العلاج البديل<br /><strong>بعلم ومسؤولية</strong></h2>
          <p>نعرّفك على الأعشاب والمكملات كجزء من حوار صحي متكامل، لا كبديل عن وصفة الطبيب أو المتابعة اللازمة.</p>
          <div className="natural-points"><span><CircleCheck size={17} /> مراجعة التداخلات الدوائية</span><span><CircleCheck size={17} /> اختيار مصادر موثوقة</span><span><CircleCheck size={17} /> سؤال الصيدلي قبل الاستخدام</span></div>
          <button className="button-primary dark-button" type="button" onClick={() => showToast("سيتم فتح دليل العلاج البديل قريبًا")}>استكشف الدليل <ArrowLeft size={18} /></button>
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

      {toast ? <div className="site-toast" role="status"><CircleCheck size={17} /> {toast}<button type="button" aria-label="إغلاق التنبيه" onClick={() => setToast(null)}><X size={15} /></button></div> : null}
    </main>
  );
}

export default App;