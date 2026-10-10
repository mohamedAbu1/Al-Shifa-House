"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  HeartPulse,
  Home,
  Info,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Navigation,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  Users,
} from "lucide-react";

type MarketingPageKind = "about" | "contact";
type MarketingLanguage = "ar" | "en";
type MarketingTheme = "light" | "dark";

function MarketingBrand({ language, light = false }: { language: MarketingLanguage; light?: boolean }) {
  return (
    <Link className={light ? "marketing-brand light" : "marketing-brand"} href="/" aria-label={language === "ar" ? "العودة إلى الرئيسية" : "Back to home"}>
      <span className="marketing-brand-mark"><Image src="/generated/pharmacy-emblem.png" alt="" width={48} height={48} unoptimized /></span>
      <span><strong>{language === "ar" ? "صيدلية الشفاء" : "Al-Shifa Pharmacy"}</strong><small>{language === "ar" ? "رعاية أقرب إليك" : "Care, closer to you"}</small></span>
    </Link>
  );
}

function MarketingAvailability({ language }: { language: MarketingLanguage }) {
  return (
    <div className="marketing-availability"><span className="marketing-status-dot" /><Image src="/generated/availability-3d.png" alt="" width={38} height={38} unoptimized /><span><strong>{language === "ar" ? "مفتوحة 24/7" : "Open 24/7"}</strong><small>{language === "ar" ? "فريقنا قريب منك دائمًا" : "Our team is always close"}</small></span></div>
  );
}

export function MarketingPage({ kind }: { kind: MarketingPageKind }) {
  const [language, setLanguage] = useState<MarketingLanguage>("ar");
  const [theme, setTheme] = useState<MarketingTheme>("dark");
  const [sent, setSent] = useState(false);
  const isArabic = language === "ar";
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedLanguage = window.localStorage.getItem("al-shifa-language");
        const savedTheme = window.localStorage.getItem("al-shifa-theme");
        if (savedLanguage === "en") setLanguage("en");
        if (savedTheme === "light") setTheme("light");
      } catch {
        // Keep the polished defaults when browser storage is unavailable.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    const next = language === "ar" ? "en" : "ar";
    setLanguage(next);
    try { window.localStorage.setItem("al-shifa-language", next); } catch { /* Keep the current session preference. */ }
  };
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try { window.localStorage.setItem("al-shifa-theme", next); } catch { /* Keep the current session preference. */ }
  };
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4500);
  };

  const navItems = [
    { href: "/", label: isArabic ? "الرئيسية" : "Home", icon: Home },
    { href: "/about", label: isArabic ? "عن الصيدلية" : "About us", icon: Info, active: kind === "about" },
    { href: "/contact", label: isArabic ? "تواصل معنا" : "Contact", icon: MessageCircle, active: kind === "contact" },
  ];
  const branches = isArabic ? [
    { name: "فرع مدينة نصر", place: "القاهرة · شارع عباس العقاد", phone: "02 2400 16623", tone: "mint" },
    { name: "فرع الدقي", place: "الجيزة · ميدان الدقي", phone: "02 3331 16623", tone: "gold" },
    { name: "فرع سموحة", place: "الإسكندرية · شارع فوزي معاذ", phone: "03 4280 16623", tone: "blue" },
  ] : [
    { name: "Nasr City branch", place: "Cairo · Abbas El Akkad St.", phone: "02 2400 16623", tone: "mint" },
    { name: "Dokki branch", place: "Giza · Dokki Square", phone: "02 3331 16623", tone: "gold" },
    { name: "Smouha branch", place: "Alexandria · Fawzi Moaz St.", phone: "03 4280 16623", tone: "blue" },
  ];

  return (
    <main className="marketing-page" dir={isArabic ? "rtl" : "ltr"} data-theme={theme}>
      <aside className="marketing-sidebar">
        <MarketingBrand language={language} light />
        <nav className="marketing-nav" aria-label={isArabic ? "تنقل الصفحات" : "Page navigation"}>
          {navItems.map(({ href, label, icon: Icon, active }) => <Link className={active ? "active" : ""} href={href} key={href}><Icon size={18} /><span>{label}</span></Link>)}
          <Link href={kind === "about" ? "/#conditions" : "/#dashboard"}><HeartPulse size={18} /><span>{isArabic ? "الخدمات الصحية" : "Health services"}</span></Link>
        </nav>
        <div className="marketing-sidebar-bottom">
          <MarketingAvailability language={language} />
          <Link className="marketing-sidebar-delivery" href="/contact"><Navigation size={17} /><span><strong>{isArabic ? "توصيل إلى باب البيت" : "Doorstep delivery"}</strong><small>{isArabic ? "بأقرب وقت" : "As soon as possible"}</small></span></Link>
          <div className="marketing-sidebar-controls"><button type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Dark mode" : "Light mode"}>{theme === "light" ? <Moon size={17} /> : <Sun size={17} />}</button><button type="button" onClick={toggleLanguage} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}><Languages size={16} /><span>{isArabic ? "EN" : "عربي"}</span></button></div>
          <Link className="marketing-sidebar-login" href="/?openProfile=1"><UserRound size={17} />{isArabic ? "ملفي الصحي" : "My health profile"}</Link>
        </div>
      </aside>

      <div className="marketing-main">
        <header className="marketing-topbar"><MarketingBrand language={language} /><div className="marketing-top-actions"><button type="button" onClick={toggleTheme}>{theme === "light" ? <Moon size={17} /> : <Sun size={17} />}</button><button type="button" onClick={toggleLanguage}><Languages size={16} /><span>{isArabic ? "EN" : "عربي"}</span></button><Link href="/?openProfile=1"><UserRound size={17} />{isArabic ? "ملفي الصحي" : "My profile"}</Link></div></header>

        {kind === "about" ? (
          <>
            <section className="marketing-hero about-marketing-hero">
              <div className="marketing-hero-copy"><span className="marketing-eyebrow"><Sparkles size={15} /> {isArabic ? "منذ ٢٠٠٨ · رعاية بطابع إنساني" : "Since 2008 · Human-centered care"}</span><h1>{isArabic ? <>رعاية صحية أكثر إنسانية،<strong> بلمسة تقنية.</strong></> : <>A more human kind of care,<strong> shaped by technology.</strong></>}</h1><p>{isArabic ? "نقرّب المعلومة الصحية والمنتج المناسب إلى يومك، عبر فريق صيدلي يستمع أولًا ويشرح بوضوح." : "We bring clear health guidance and the right pharmacy choices closer to your everyday life through a team that listens first."}</p><div className="marketing-hero-actions"><Link className="marketing-primary" href="/#dashboard">{isArabic ? "اكتشف خدماتنا" : "Explore our services"} <DirectionArrow size={18} /></Link><Link className="marketing-secondary" href="/contact"><MessageCircle size={17} /> {isArabic ? "تحدث مع الفريق" : "Talk to our team"}</Link></div><div className="marketing-proof-row"><span><BadgeCheck size={16} /> {isArabic ? "اختيارات موثوقة" : "Trusted choices"}</span><span><ShieldCheck size={16} /> {isArabic ? "خصوصية واضحة" : "Clear privacy"}</span><span><Users size={16} /> {isArabic ? "فريق متخصص" : "Specialist team"}</span></div></div>
              <div className="marketing-hero-art"><span className="marketing-art-grid" /><span className="marketing-art-orbit orbit-a" /><span className="marketing-art-orbit orbit-b" /><div className="marketing-art-glow" /><Image className="marketing-hero-pharmacist" src="/generated/hero-pharmacist.png" alt={isArabic ? "صيدلي من فريق الشفاء" : "Al-Shifa pharmacist"} width={820} height={620} priority /><div className="marketing-float-card float-one"><span><CheckCircle2 size={18} /></span><strong>{isArabic ? "خبرة موثوقة" : "Trusted expertise"}<small>{isArabic ? "نراجع التفاصيل معك" : "We review the details with you"}</small></strong></div><div className="marketing-float-card float-two"><span>6</span><strong>{isArabic ? "فروع قريبة" : "Nearby branches"}<small>{isArabic ? "في القاهرة والجيزة والإسكندرية" : "Across Cairo, Giza & Alexandria"}</small></strong></div></div>
            </section>
            <section className="marketing-stat-grid" aria-label={isArabic ? "أرقام الصيدلية" : "Pharmacy numbers"}><article><strong>18<span>+</span></strong><small>{isArabic ? "عامًا من الخبرة" : "years of care"}</small></article><article><strong>06</strong><small>{isArabic ? "فروع تخدمك" : "branches near you"}</small></article><article><strong>42</strong><small>{isArabic ? "صيدليًا متخصصًا" : "specialist pharmacists"}</small></article><article><strong>120K</strong><small>{isArabic ? "تجربة رعاية سنوية" : "annual care moments"}</small></article></section>
            <section className="marketing-story-section"><div className="marketing-section-heading"><span className="marketing-eyebrow">{isArabic ? "ما الذي يميز الشفاء؟" : "What makes Al-Shifa different?"}</span><h2>{isArabic ? "نصمم كل خطوة حول احتياجك." : "We design every step around you."}</h2><p>{isArabic ? "من أول سؤال إلى آخر متابعة، نستخدم التقنية لتبسيط التجربة لا لتعقيدها." : "From the first question to the next follow-up, we use technology to make care simpler, never more complicated."}</p></div><div className="marketing-values-grid"><article><span className="marketing-value-icon"><Image src="/generated/trust-guidance-3d.png" alt="" width={82} height={82} unoptimized /></span><h3>{isArabic ? "إرشاد مفهوم" : "Clear guidance"}</h3><p>{isArabic ? "نشرح الخيارات بلغة بسيطة ونضع السلامة قبل السرعة." : "We explain choices simply and put safety before speed."}</p></article><article><span className="marketing-value-icon"><Image src="/generated/trust-privacy-3d.png" alt="" width={82} height={82} unoptimized /></span><h3>{isArabic ? "خصوصية تحترمك" : "Privacy by design"}</h3><p>{isArabic ? "بياناتك الصحية تُعامل بعناية ووضوح في كل تفاعل." : "Your health details are handled with care and transparency."}</p></article><article><span className="marketing-value-icon"><Image src="/generated/trust-natural-3d.png" alt="" width={82} height={82} unoptimized /></span><h3>{isArabic ? "اختيار بوعي" : "Mindful choices"}</h3><p>{isArabic ? "نوازن بين الطبيعة والدليل العلمي قبل أي توصية." : "We balance natural options with evidence before every recommendation."}</p></article></div></section>
            <section className="marketing-branches-section"><div className="marketing-section-heading compact"><span className="marketing-eyebrow"><Building2 size={15} /> {isArabic ? "شبكة الشفاء" : "The Al-Shifa network"}</span><h2>{isArabic ? "فرع قريب، وفريق يعرفك." : "A nearby branch, a team that knows you."}</h2></div><div className="marketing-branches-grid">{branches.map((branch) => <article className={`marketing-branch-card ${branch.tone}`} key={branch.name}><span className="branch-number"><MapPin size={18} /></span><div><h3>{branch.name}</h3><p>{branch.place}</p><Link href="/contact"><PhoneCall size={14} /> {branch.phone}</Link></div><span className="branch-open"><span />{isArabic ? "مفتوح الآن" : "Open now"}</span></article>)}</div></section>
          </>
        ) : (
          <>
            <section className="marketing-hero contact-marketing-hero"><div className="marketing-hero-copy"><span className="marketing-eyebrow"><MessageCircle size={15} /> {isArabic ? "نحن قريبون عندما تحتاجنا" : "Close when you need us"}</span><h1>{isArabic ? <>لديك سؤال؟<strong> دعنا نبدأ الحديث.</strong></> : <>Have a question?<strong> Let’s start a conversation.</strong></>}</h1><p>{isArabic ? "اختر الطريقة الأنسب لك للتواصل مع فريق الشفاء، وسنعود إليك بمعلومة واضحة وخطوة عملية." : "Choose the way that feels easiest and our Al-Shifa team will come back with a clear answer and a practical next step."}</p><div className="marketing-hero-actions"><Link className="marketing-primary" href="#contact-form">{isArabic ? "أرسل رسالة" : "Send a message"} <DirectionArrow size={18} /></Link><a className="marketing-secondary" href="tel:16623"><PhoneCall size={17} /> ١٦٦٢٣</a></div><div className="marketing-proof-row"><span><Clock3 size={16} /> {isArabic ? "مفتوحون 24/7" : "Open 24/7"}</span><span><MessageCircle size={16} /> {isArabic ? "واتساب متاح" : "WhatsApp available"}</span><span><Navigation size={16} /> {isArabic ? "6 فروع" : "6 branches"}</span></div></div><div className="marketing-contact-art"><span className="marketing-contact-ring ring-a" /><span className="marketing-contact-ring ring-b" /><div className="marketing-contact-card"><span><ShieldCheck size={20} /></span><strong>{isArabic ? "رد واضح، بدون انتظار" : "Clear answers, no runaround"}<small>{isArabic ? "فريق صيدلي يستمع لك" : "A pharmacist team that listens"}</small></strong></div><Image src="/generated/doctor-avatar-3d.png" alt={isArabic ? "دكتورة ثلاثية الأبعاد" : "3D female doctor"} width={600} height={600} priority /></div></section>
            <section className="marketing-contact-methods"><article><span><PhoneCall size={20} /></span><div><small>{isArabic ? "اتصل بنا" : "Call us"}</small><strong>١٦٦٢٣</strong><p>{isArabic ? "يوميًا · على مدار الساعة" : "Every day · around the clock"}</p></div></article><article><span><MessageCircle size={20} /></span><div><small>WhatsApp</small><strong>+20 100 166 23 00</strong><p>{isArabic ? "رسائل سريعة من فريق الصيدلية" : "Quick messages from our pharmacy team"}</p></div></article><article><span><Mail size={20} /></span><div><small>{isArabic ? "البريد الإلكتروني" : "Email"}</small><strong>hello@alshifa.example</strong><p>{isArabic ? "نرد خلال يوم عمل" : "Reply within one business day"}</p></div></article></section>
            <section className="marketing-contact-layout"><div className="marketing-form-card" id="contact-form"><div className="marketing-section-heading compact"><span className="marketing-eyebrow">{isArabic ? "رسالتك تصل مباشرة" : "Your message goes straight to us"}</span><h2>{isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help?"}</h2><p>{isArabic ? "اترك بياناتك وسيتواصل معك أحد أفراد فريقنا بأقرب وقت." : "Leave your details and a member of our team will reach out soon."}</p></div>{sent ? <div className="marketing-form-success" role="status"><CheckCircle2 size={19} /><span>{isArabic ? "تم استلام رسالتك. شكرًا لثقتك بفريق الشفاء." : "Your message is with us. Thank you for trusting Al-Shifa."}</span></div> : null}<form onSubmit={submitContact}><label><span>{isArabic ? "الاسم" : "Name"}</span><input required name="name" placeholder={isArabic ? "اكتب اسمك" : "Your name"} /></label><label><span>{isArabic ? "رقم الهاتف أو واتساب" : "Phone or WhatsApp"}</span><input required name="phone" type="tel" placeholder="01XXXXXXXXX" /></label><label><span>{isArabic ? "نوع المساعدة" : "What do you need help with?"}</span><select name="topic" defaultValue=""><option value="" disabled>{isArabic ? "اختر نوع التواصل" : "Choose a topic"}</option><option>{isArabic ? "استشارة صيدلية" : "Pharmacist consultation"}</option><option>{isArabic ? "توصيل إلى المنزل" : "Home delivery"}</option><option>{isArabic ? "معلومات عن أحد الفروع" : "Branch information"}</option></select></label><label className="marketing-form-wide"><span>{isArabic ? "رسالتك" : "Message"}</span><textarea required name="message" rows={4} placeholder={isArabic ? "اكتب سؤالك أو رسالتك هنا" : "Write your question or message here"} /></label><button className="marketing-primary" type="submit"><Send size={17} /> {isArabic ? "إرسال الرسالة" : "Send message"} <DirectionArrow size={17} /></button></form></div><aside className="marketing-hours-card"><span className="marketing-hours-icon"><CalendarDays size={25} /></span><span className="marketing-eyebrow">{isArabic ? "ساعات العمل" : "Opening hours"}</span><h2>{isArabic ? "مفتوحون عندما تحتاجنا." : "Open when you need us."}</h2><div className="marketing-hours-list"><span><b>{isArabic ? "الفروع" : "Branches"}</b><em>{isArabic ? "08:00 ص — 12:00 م" : "08:00 AM — 12:00 AM"}</em></span><span><b>{isArabic ? "خدمة الهاتف" : "Phone support"}</b><em>{isArabic ? "24 ساعة · 7 أيام" : "24 hours · 7 days"}</em></span><span><b>{isArabic ? "التوصيل" : "Delivery"}</b><em>{isArabic ? "أقرب وقت متاح" : "Next available slot"}</em></span></div><div className="marketing-hours-note"><ShieldCheck size={16} />{isArabic ? "للطوارئ الطبية، اتصل بخدمات الطوارئ المحلية فورًا." : "For medical emergencies, contact local emergency services immediately."}</div></aside></section>
            <section className="marketing-branches-section contact-branches"><div className="marketing-section-heading compact"><span className="marketing-eyebrow"><Globe2 size={15} /> {isArabic ? "مواقعنا" : "Find us"}</span><h2>{isArabic ? "اختر الفرع الأقرب إليك." : "Choose the branch closest to you."}</h2></div><div className="marketing-branches-grid">{branches.map((branch) => <article className={`marketing-branch-card ${branch.tone}`} key={branch.name}><span className="branch-number"><MapPin size={18} /></span><div><h3>{branch.name}</h3><p>{branch.place}</p><a href="tel:16623"><PhoneCall size={14} /> {branch.phone}</a></div><Link className="branch-direction" href="#contact-form"><Navigation size={16} /> {isArabic ? "تواصل" : "Contact"}</Link></article>)}</div></section>
          </>
        )}

        <footer className="marketing-footer"><div><MarketingBrand language={language} light /><p>{isArabic ? "رعاية موثوقة، إرشاد واضح، واختيارات صحية أقرب إلى حياتك اليومية." : "Trusted care, clear guidance, and healthier choices closer to everyday life."}</p></div><div className="marketing-footer-links"><strong>{isArabic ? "روابط سريعة" : "Quick links"}</strong><Link href="/">{isArabic ? "الرئيسية" : "Home"}</Link><Link href="/about">{isArabic ? "عن الصيدلية" : "About us"}</Link><Link href="/contact">{isArabic ? "تواصل معنا" : "Contact"}</Link></div><div className="marketing-footer-contact"><strong>{isArabic ? "نحن هنا" : "We are here"}</strong><span><PhoneCall size={15} /> ١٦٦٢٣</span><span><MapPin size={15} /> {isArabic ? "القاهرة · الجيزة · الإسكندرية" : "Cairo · Giza · Alexandria"}</span></div></footer>
        <div className="marketing-footer-bottom"><span>© ٢٠٢٦ {isArabic ? "صيدلية الشفاء" : "Al-Shifa Pharmacy"}</span><span>{isArabic ? "المعلومات للتوعية ولا تغني عن استشارة الطبيب." : "Educational information does not replace medical advice."}</span></div>
      </div>
    </main>
  );
}