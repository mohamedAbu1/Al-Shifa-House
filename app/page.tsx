"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Home,
  HeartPulse,
  Leaf,
  Languages,
  LockKeyhole,
  Mail,
  Moon,
  MapPin,
  Menu,
  MessageCircle,
  Sun,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

type Tip = {
  tag: string;
  title: string;
  body: string;
  source: string;
  sourceUrl: string;
  tone: string;
  image: string;
};

const conditions = [
  { title: "الضغط والقلب", body: "متابعة واعية لضغط الدم وصحة القلب.", image: "health-heart-3d.png", tone: "rose" },
  { title: "السكري", body: "منتجات ومعلومات تساعدك على روتين متوازن.", image: "health-diabetes-3d.png", tone: "blue" },
  { title: "البرد والحساسية", body: "راحة موسمية وإرشادات للاستخدام الآمن.", image: "health-cold-3d.png", tone: "orange" },
  { title: "الجهاز الهضمي", body: "حلول يومية لطيفة للهضم والراحة.", image: "health-digestive-3d.png", tone: "mint" },
  { title: "الألم والحرارة", body: "اختيارات واضحة مع سؤال الصيدلي أولًا.", image: "health-fever-3d.png", tone: "purple" },
  { title: "العناية بالأطفال", body: "عناية موثوقة تناسب احتياجات العائلة.", image: "health-child-3d.png", tone: "sky" },
];

const beautyItems = [
  { title: "عناية البشرة", body: "روتين يومي بسيط لبشرة أكثر نضارة.", image: "beauty-skin-3d.png", tone: "peach", label: "روتينك اليومي" },
  { title: "العناية بالشعر", body: "منتجات مختارة للعناية بفروة الرأس والشعر.", image: "beauty-hair-3d.png", tone: "lavender", label: "اختيارات لطيفة" },
  { title: "الزيوت الطبيعية", body: "زيوت نقية للاستخدام الخارجي والعناية الشخصية.", image: "beauty-oils-3d.png", tone: "green", label: "طبيعي بعناية" },
  { title: "إكسسوارات صحية", body: "تفاصيل صغيرة تجعل يومك الصحي أسهل.", image: "beauty-wellness-3d.png", tone: "blue", label: "أسلوب صحي" },
];

const tips: Tip[] = [
  {
    tag: "ضغط الدم",
    title: "الضغط المرتفع قد لا يسبب أعراضًا واضحة",
    body: "القياس المنتظم لدى مختص أو بجهاز موثوق هو الطريقة الأفضل لاكتشاف ارتفاع الضغط ومتابعته.",
    source: "منظمة الصحة العالمية",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
    tone: "blue",
    image: "health-heart-3d.png",
  },
  {
    tag: "الاستخدام الآمن",
    title: "المضاد الحيوي لا يعالج نزلات البرد الفيروسية",
    body: "لا تستخدم المضادات الحيوية من نفسك؛ فهي مخصصة لعدوى بكتيرية محددة وقد تسبب آثارًا جانبية عند استخدامها بلا حاجة.",
    source: "مراكز مكافحة الأمراض CDC",
    sourceUrl: "https://www.cdc.gov/common-cold/treatment/index.html",
    tone: "orange",
    image: "tip-antibiotic-3d.png",
  },
  {
    tag: "السكري",
    title: "الحركة والغذاء المتوازن جزء من رعاية السكري",
    body: "النشاط البدني المنتظم والغذاء الصحي يساعدان على الوقاية من السكري من النوع الثاني وتقليل مضاعفاته مع المتابعة الطبية.",
    source: "منظمة الصحة العالمية",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    tone: "mint",
    image: "health-diabetes-3d.png",
  },
  {
    tag: "الأعشاب والمكملات",
    title: "طبيعي لا يعني آمنًا للجميع",
    body: "قد تتداخل الأعشاب والمكملات مع الأدوية أو تؤثر في فعاليتها؛ أخبر طبيبك أو الصيدلي بكل ما تتناوله.",
    source: "هيئة الغذاء والدواء FDA",
    sourceUrl: "https://www.fda.gov/consumers/consumer-updates/mixing-medications-and-dietary-supplements-can-endanger-your-health",
    tone: "purple",
    image: "tip-herbs-3d.png",
  },
];

type Language = "ar" | "en";
type Theme = "light" | "dark";

const translationPairs: Array<[string, string]> = [
  ["صيدلية الشفاء", "Al-Shifa Pharmacy"], ["رعاية أقرب إليك", "Care, closer to you"], ["صحة أفضل تبدأ بخطوة واعية", "A healthier life starts with a mindful step"], ["مفتوح لخدمتك", "Open to serve you"], ["مفتوحة 24/7", "Open 24/7"], ["خدمة على مدار الساعة", "Round-the-clock service"], ["أهلًا بك في", "Welcome to"], ["رعاية موثوقة، إرشاد واضح، واختيارات صحية أقرب إلى حياتك اليومية.", "Trusted care, clear guidance, and healthier choices for everyday life."], ["اكتشف خدمات الشفاء", "Discover Al-Shifa services"], ["معلومات عامة موثوقة مع احترام خصوصيتك", "Reliable general information with respect for your privacy"], ["نعتني بالتفاصيل الصغيرة التي تصنع فرقًا", "We care about the small details that make a difference"], ["دارك الصحي يبدأ من هنا", "Your health journey starts here"],
  ["توصيل إلى باب البيت", "Doorstep delivery"], ["بأقرب وقت", "As soon as possible"], ["الرئيسية", "Home"], ["الحالات الصحية", "Health conditions"], ["العناية والجمال", "Beauty & care"], ["إرشادات طبية", "Medical guidance"], ["الإرشادات الطبية", "Medical guidance"], ["العلاج البديل", "Alternative care"], ["فتح القائمة", "Open menu"], ["إغلاق القائمة", "Close menu"], ["البحث", "Search"], ["تسجيل الدخول", "Sign in"], ["العودة إلى الصفحة الرئيسية", "Back to home"], ["سيتم تفعيل البحث قريبًا", "Search will be available soon"], ["تسجيل الدخول سيكون متاحًا قريبًا", "Sign in will be available soon"],
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
function PharmacyMark({ light = false, compact = false, language = "ar" }: { light?: boolean; compact?: boolean; language?: Language }) {
  const isArabic = language === "ar";
  return (
    <div className={compact ? "pharmacy-brand compact" : "pharmacy-brand"}>
      <span className={light ? "pharmacy-mark light" : "pharmacy-mark"} aria-hidden="true">
        <Image src="/generated/pharmacy-emblem.png" alt="" width={compact ? 52 : 64} height={compact ? 52 : 64} className="pharmacy-emblem-image" unoptimized />
      </span>
      <span className="pharmacy-brand-copy">
        <strong>{isArabic ? "صيدلية الشفاء" : "Al-Shifa Pharmacy"}</strong>
        <small>{isArabic ? "رعاية أقرب إليك" : "Care, closer to you"}</small>
      </span>
    </div>
  );
}
function AvailabilityBadge({ compact = false, language }: { compact?: boolean; language: Language }) {
  return (
    <span className={compact ? "availability-badge compact" : "availability-badge"} aria-label={language === "ar" ? "مفتوحة 24/7" : "Open 24/7"}>
      <span className="availability-dot" aria-hidden="true" />
      <GeneratedIcon src="availability-3d.png" className="availability-icon-image" />
      <span className="availability-copy"><strong>{language === "ar" ? "مفتوحة 24/7" : "Open 24/7"}</strong><small>{language === "ar" ? "خدمة على مدار الساعة" : "Round-the-clock service"}</small></span>
    </span>
  );
}
function DeliveryBadge({ compact = false, language }: { compact?: boolean; language: Language }) {
  return (
    <span className={compact ? "delivery-badge compact" : "delivery-badge"} aria-label={language === "ar" ? "توصيل إلى باب البيت" : "Doorstep delivery"}>
      <GeneratedIcon src="delivery-3d.png" className="delivery-icon-image" />
      <span className="delivery-copy"><strong>{language === "ar" ? "توصيل إلى باب البيت" : "Doorstep delivery"}</strong><small>{language === "ar" ? "بأقرب وقت" : "As soon as possible"}</small></span>
    </span>
  );
}
function GeneratedIcon({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span className={`generated-3d-icon ${className}`} aria-hidden="true">
      <Image src={`/generated/${src}`} alt="" width={96} height={96} unoptimized />
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

type PatientFormState = {
  fullName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  password: string;
  confirmPassword: string;
  city: string;
  emergencyPhone: string;
  height: string;
  weight: string;
  chronicDisease: "no" | "yes";
  chronicConditions: string[];
  allergies: string;
  allergyDetails: string;
  medications: string;
  medicationDetails: string;
  symptoms: string;
  symptomDetails: string;
  pregnancyStatus: string;
  consent: boolean;
};

const emptyPatientForm: PatientFormState = {
  fullName: "",
  age: "",
  gender: "",
  email: "",
  phone: "",
  whatsapp: false,
  password: "",
  confirmPassword: "",
  city: "",
  emergencyPhone: "",
  height: "",
  weight: "",
  chronicDisease: "no",
  chronicConditions: [],
  allergies: "",
  allergyDetails: "",
  medications: "",
  medicationDetails: "",
  symptoms: "",
  symptomDetails: "",
  pregnancyStatus: "",
  consent: false,
};

function PatientIntakePage({ language, theme, languageSwitching, onBack }: { language: Language; theme: Theme; languageSwitching: boolean; onBack: () => void }) {
  const isArabic = language === "ar";
  const AuthDirectionArrow = isArabic ? ArrowLeft : ArrowRight;
  const [form, setForm] = useState<PatientFormState>(emptyPatientForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const copy = isArabic ? {
    back: "العودة إلى الرئيسية",
    kicker: "تسجيل آمن وملف صحي أوضح",
    title: "أدخل معلومات المريض لنساعدك بشكل أدق",
    intro: "املأ البيانات المطلوبة حتى يتمكن الصيدلي من فهم حالتك وتقديم إرشاد عام أكثر ملاءمة، مع احترام خصوصيتك.",
    visualTitle: "رعاية تبدأ من التفاصيل",
    visualBody: "كل معلومة صحيحة تساعد فريق الشفاء على طرح السؤال المناسب قبل اقتراح أي خيار صحي.",
    visualNote: "مراجعة بشرية وإرشاد واضح",
    account: "بيانات الحساب",
    accountHint: "استخدم بريدًا إلكترونيًا ورقمًا يمكنك الوصول إليهما.",
    profile: "البيانات الشخصية",
    health: "التاريخ الصحي",
    contact: "التواصل والطوارئ",
    fullName: "الاسم الكامل",
    age: "العمر",
    gender: "النوع",
    male: "رجل",
    female: "امرأة",
    preferNot: "أفضل عدم التحديد",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    whatsapp: "هذا الرقم متصل بواتساب *",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    city: "المدينة / المحافظة",
    emergencyPhone: "رقم للتواصل عند الطوارئ (اختياري)",
    height: "الطول بالسنتيمتر (اختياري)",
    weight: "الوزن بالكيلوجرام (اختياري)",
    chronic: "هل لديك مرض مزمن؟",
    yes: "نعم",
    no: "لا",
    conditions: "اختر الأمراض المزمنة إن وُجدت",
    allergies: "الحساسيات المعروفة من أدوية أو أطعمة",
    medications: "الأدوية أو المكملات المستخدمة حاليًا",
    symptoms: "الأعراض أو سبب طلب المساعدة",
    selectAll: "اختر كل ما ينطبق",
    symptomDetails: "تفاصيل إضافية عن الأعراض (اختياري)",
    allergyDetails: "تفاصيل الحساسية (اختياري)",
    medicationDetails: "تفاصيل الأدوية أو المكملات (اختياري)",
    pregnancy: "الحمل أو الرضاعة (اختياري)",
    notApplicable: "لا ينطبق",
    notPregnant: "لا",
    pregnant: "نعم",
    consent: "أوافق على استخدام هذه المعلومات لتقديم إرشاد صيدلي عام، وأفهم أنها لا تغني عن زيارة الطبيب.",
    privacy: "لا يتم حفظ البيانات الحساسة في المتصفح قبل ربط النظام بخدمة آمنة.",
    progressNote: "الحقول التي تحمل علامة * مطلوبة.",
    requiredError: "أكمل الحقول المطلوبة أولًا، وسنضع المؤشر على أول حقل ناقص.",
    conditionError: "اختر مرضًا مزمنًا واحدًا على الأقل أو اختر «لا». ",
    whatsappError: "يرجى تأكيد أن رقم الهاتف متصل بواتساب.",
    submit: "حفظ البيانات والمتابعة",
    success: "تمت مراجعة الحقول بنجاح. النموذج جاهز الآن للربط بخدمة حسابات آمنة وفريق الصيدلية.",
    passwordError: "يجب أن تتطابق كلمتا المرور وأن تتكون كلمة المرور من 8 أحرف على الأقل.",
    consentError: "يرجى الموافقة على ملاحظة الاستخدام قبل المتابعة.",
  } : {
    back: "Back to home",
    kicker: "Secure sign-up and a clearer health profile",
    title: "Tell us about the patient so we can help more accurately",
    intro: "Complete the requested details so the pharmacist can understand the situation and provide more relevant general guidance while respecting privacy.",
    visualTitle: "Care starts with details",
    visualBody: "Every accurate detail helps the Al-Shifa team ask the right question before suggesting any health option.",
    visualNote: "Human review and clear guidance",
    account: "Account details",
    accountHint: "Use an email and phone number you can access.",
    profile: "Personal profile",
    health: "Health history",
    contact: "Contact and emergency",
    fullName: "Full name",
    age: "Age",
    gender: "Gender",
    male: "Man",
    female: "Woman",
    preferNot: "Prefer not to say",
    email: "Email address",
    phone: "Phone number",
    whatsapp: "This number is connected to WhatsApp *",
    password: "Password",
    confirmPassword: "Confirm password",
    city: "City / governorate",
    emergencyPhone: "Emergency contact number (optional)",
    height: "Height in cm (optional)",
    weight: "Weight in kg (optional)",
    chronic: "Do you have a chronic condition?",
    yes: "Yes",
    no: "No",
    conditions: "Select chronic conditions if applicable",
    allergies: "Known medicine or food allergies",
    medications: "Current medicines or supplements",
    symptoms: "Symptoms or reason for seeking help",
    selectAll: "Select all that apply",
    symptomDetails: "Additional symptom details (optional)",
    allergyDetails: "Allergy details (optional)",
    medicationDetails: "Medicine or supplement details (optional)",
    pregnancy: "Pregnancy or breastfeeding (optional)",
    notApplicable: "Not applicable",
    notPregnant: "No",
    pregnant: "Yes",
    consent: "I agree to use this information for general pharmacy guidance and understand it does not replace a doctor visit.",
    privacy: "Sensitive data is not stored in the browser before a secure service is connected.",
    progressNote: "Fields marked with * are required.",
    requiredError: "Complete the required fields first. We will focus the first missing field.",
    conditionError: "Select at least one chronic condition, or choose No.",
    whatsappError: "Please confirm that this phone number is connected to WhatsApp.",
    submit: "Save details and continue",
    success: "The fields were validated successfully. The form is ready to connect to a secure account service and pharmacy team.",
    passwordError: "Passwords must match and contain at least 8 characters.",
    consentError: "Please accept the information-use notice before continuing.",
  };
  const chronicOptions = isArabic ? [
    ["diabetes", "السكري"], ["hypertension", "الضغط المرتفع"], ["heart", "أمراض القلب"], ["asthma", "الربو"], ["kidney", "أمراض الكلى"], ["liver", "أمراض الكبد"], ["other", "أخرى"],
  ] : [
    ["diabetes", "Diabetes"], ["hypertension", "High blood pressure"], ["heart", "Heart disease"], ["asthma", "Asthma"], ["kidney", "Kidney disease"], ["liver", "Liver disease"], ["other", "Other"],
  ];
  const cityOptions = isArabic ? [
    ["cairo", "القاهرة"], ["giza", "الجيزة"], ["alexandria", "الإسكندرية"], ["qalyubia", "القليوبية"], ["dakahlia", "الدقهلية"], ["sharqia", "الشرقية"], ["gharbia", "الغربية"], ["other", "محافظة أخرى"],
  ] : [
    ["cairo", "Cairo"], ["giza", "Giza"], ["alexandria", "Alexandria"], ["qalyubia", "Qalyubia"], ["dakahlia", "Dakahlia"], ["sharqia", "Sharqia"], ["gharbia", "Gharbia"], ["other", "Other governorate"],
  ];
  const symptomOptions = isArabic ? [
    ["fever", "حرارة"], ["cold", "برد أو حساسية"], ["pain", "ألم"], ["cough", "سعال"], ["digestive", "اضطراب هضمي"], ["fatigue", "إرهاق"], ["other", "أعراض أخرى"],
  ] : [
    ["fever", "Fever"], ["cold", "Cold or allergy"], ["pain", "Pain"], ["cough", "Cough"], ["digestive", "Digestive discomfort"], ["fatigue", "Fatigue"], ["other", "Other symptoms"],
  ];
  const allergyOptions = isArabic ? [
    ["none", "لا توجد حساسية"], ["medicines", "أدوية"], ["penicillin", "بنسلين"], ["food", "أطعمة"], ["latex", "لاتكس"], ["other", "أخرى"],
  ] : [
    ["none", "No known allergies"], ["medicines", "Medicines"], ["penicillin", "Penicillin"], ["food", "Food"], ["latex", "Latex"], ["other", "Other"],
  ];
  const medicationOptions = isArabic ? [
    ["none", "لا أستخدم حاليًا"], ["prescriptions", "أدوية موصوفة"], ["painkillers", "مسكنات"], ["vitamins", "فيتامينات"], ["herbs", "أعشاب أو مكملات"], ["other", "أخرى"],
  ] : [
    ["none", "None currently"], ["prescriptions", "Prescribed medicines"], ["painkillers", "Painkillers"], ["vitamins", "Vitamins"], ["herbs", "Herbs or supplements"], ["other", "Other"],
  ];  const setField = <K extends keyof PatientFormState>(key: K, value: PatientFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setSubmitted(false);
  };
  const toggleCondition = (value: string) => {
    setForm((current) => ({ ...current, chronicConditions: current.chronicConditions.includes(value) ? current.chronicConditions.filter((item) => item !== value) : [...current.chronicConditions, value] }));
    setSubmitted(false);
  };
  const toggleCsvField = (key: "symptoms" | "allergies" | "medications", value: string) => {
    setForm((current) => {
      const selected = current[key].split("|").filter(Boolean);
      const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...(value === "none" ? [] : selected.filter((item) => item !== "none")), value];
      return { ...current, [key]: next.join("|") };
    });
    setError("");
    setSubmitted(false);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredFields: Array<[boolean, string]> = [
      [!form.email, "auth-email"], [!form.password, "auth-password"], [!form.confirmPassword, "auth-confirm-password"],
      [!form.fullName, "auth-full-name"], [!form.age, "auth-age"], [!form.gender, "auth-gender"], [!form.phone, "auth-phone"],
      [!form.symptoms && !form.symptomDetails, "auth-symptoms"],
    ];
    const firstMissing = requiredFields.find(([missing]) => missing);
    if (firstMissing) {
      setError(copy.requiredError);
      requestAnimationFrame(() => document.getElementById(firstMissing[1])?.focus());
      return;
    }
    if (form.password.length < 8 || form.password !== form.confirmPassword) {
      setError(copy.passwordError);
      requestAnimationFrame(() => document.getElementById("auth-password")?.focus());
      return;
    }
    if (form.chronicDisease === "yes" && form.chronicConditions.length === 0) {
      setError(copy.conditionError);
      return;
    }
    if (!form.whatsapp) {
      setError(copy.whatsappError);
      requestAnimationFrame(() => document.getElementById("auth-whatsapp")?.focus());
      return;
    }
    if (!form.consent) {
      setError(copy.consentError);
      requestAnimationFrame(() => document.getElementById("auth-consent")?.focus());
      return;
    }
    setError("");
    setSubmitted(true);
  };
  return (
    <main className={languageSwitching ? "auth-screen language-switching" : "auth-screen"} dir={isArabic ? "rtl" : "ltr"} data-theme={theme}>
      <div className="auth-background" aria-hidden="true" />
      <div className="auth-page">
        <button className="auth-back" type="button" onClick={onBack}><AuthDirectionArrow size={18} /> <span>{copy.back}</span></button>
        <div className="auth-shell">
          <aside className="auth-visual">
            <div className="auth-visual-top"><PharmacyMark light language={language} /><AvailabilityBadge language={language} /></div>
            <div className="auth-visual-copy"><span className="auth-kicker"><HeartPulse size={16} /> {copy.kicker}</span><h1>{copy.visualTitle}</h1><p>{copy.visualBody}</p></div>
            <div className="auth-avatar-stage"><span className="auth-avatar-glow" /><Image className="auth-doctor-avatar" src="/generated/doctor-avatar-3d.png" alt={isArabic ? "دكتورة ثلاثية الأبعاد" : "3D female doctor"} width={720} height={720} priority /></div>
            <div className="auth-visual-note"><CircleCheck size={18} /><span>{copy.visualNote}</span></div>
          </aside>
          <section className="auth-form-panel" aria-labelledby="auth-title">
            <div className="auth-form-heading"><span className="auth-eyebrow"><ClipboardList size={16} /> {copy.kicker}</span><h2 id="auth-title">{copy.title}</h2><p>{copy.intro}</p><div className="auth-safety-note"><ShieldCheck size={17} /><span>{copy.privacy}</span></div></div>
            <div className="auth-progress" aria-label={isArabic ? "مراحل التسجيل" : "Registration steps"}>
              {[copy.account, copy.profile, copy.contact, copy.health].map((label, index) => <span className="auth-progress-step" key={label}><b>{index + 1}</b><small>{label}</small></span>)}
              <span className="auth-progress-note">{copy.progressNote}</span>
            </div>
            {submitted ? <div className="auth-success" role="status"><CircleCheck size={19} /><span>{copy.success}</span></div> : null}
            {error ? <div className="auth-error" role="alert"><ShieldCheck size={18} /><span>{error}</span></div> : null}
            <form className="patient-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="auth-form-section"><legend><span className="auth-section-icon"><LockKeyhole size={17} /></span>{copy.account}</legend><p className="auth-section-hint">{copy.accountHint}</p><div className="auth-form-grid"><label className="auth-field"><span>{copy.email} *</span><span className="auth-input-wrap"><Mail size={17} /><input id="auth-email" type="email" autoComplete="email" required value={form.email} onChange={(event) => setField("email", event.target.value)} placeholder="name@example.com" /></span></label><label className="auth-field"><span>{copy.password} *</span><span className="auth-input-wrap"><LockKeyhole size={17} /><input id="auth-password" type="password" autoComplete="new-password" required minLength={8} value={form.password} onChange={(event) => setField("password", event.target.value)} /></span></label><label className="auth-field"><span>{copy.confirmPassword} *</span><span className="auth-input-wrap"><LockKeyhole size={17} /><input id="auth-confirm-password" type="password" autoComplete="new-password" required minLength={8} value={form.confirmPassword} onChange={(event) => setField("confirmPassword", event.target.value)} /></span></label></div></fieldset>
              <fieldset className="auth-form-section"><legend><span className="auth-section-icon"><UserRound size={17} /></span>{copy.profile}</legend><div className="auth-form-grid"><label className="auth-field auth-field-wide"><span>{copy.fullName} *</span><span className="auth-input-wrap"><UserRound size={17} /><input id="auth-full-name" autoComplete="name" required value={form.fullName} onChange={(event) => setField("fullName", event.target.value)} /></span></label><label className="auth-field"><span>{copy.age} *</span><span className="auth-input-wrap"><CalendarDays size={17} /><input id="auth-age" type="number" inputMode="numeric" required min="0" max="120" value={form.age} onChange={(event) => setField("age", event.target.value)} /></span></label><label className="auth-field"><span>{copy.gender} *</span><span className="auth-input-wrap"><UserRound size={17} /><select id="auth-gender" required value={form.gender} onChange={(event) => setField("gender", event.target.value)}><option value="">{isArabic ? "اختر" : "Select"}</option><option value="male">{copy.male}</option><option value="female">{copy.female}</option><option value="private">{copy.preferNot}</option></select></span></label><label className="auth-field"><span>{copy.height}</span><span className="auth-input-wrap"><Activity size={17} /><input type="number" min="0" value={form.height} onChange={(event) => setField("height", event.target.value)} /></span></label><label className="auth-field"><span>{copy.weight}</span><span className="auth-input-wrap"><Activity size={17} /><input type="number" min="0" value={form.weight} onChange={(event) => setField("weight", event.target.value)} /></span></label></div></fieldset>
              <fieldset className="auth-form-section"><legend><span className="auth-section-icon"><PhoneCall size={17} /></span>{copy.contact}</legend><div className="auth-form-grid"><label className="auth-field"><span>{copy.phone} *</span><span className="auth-input-wrap"><PhoneCall size={17} /><input id="auth-phone" type="tel" autoComplete="tel" inputMode="tel" required value={form.phone} onChange={(event) => setField("phone", event.target.value)} placeholder="01XXXXXXXXX" /></span></label><label className="auth-field"><span>{copy.city}</span><span className="auth-input-wrap"><MapPin size={17} /><select id="auth-city" value={form.city} onChange={(event) => setField("city", event.target.value)}><option value="">{isArabic ? "اختر المحافظة" : "Select governorate"}</option>{cityOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></span></label><label className="auth-field auth-field-wide"><span>{copy.emergencyPhone}</span><span className="auth-input-wrap"><PhoneCall size={17} /><input type="tel" value={form.emergencyPhone} onChange={(event) => setField("emergencyPhone", event.target.value)} /></span></label><label className="auth-check auth-field-wide"><input id="auth-whatsapp" type="checkbox" checked={form.whatsapp} onChange={(event) => setField("whatsapp", event.target.checked)} /><span>{copy.whatsapp}</span></label></div></fieldset>
              <fieldset className="auth-form-section">
                <legend><span className="auth-section-icon"><HeartPulse size={17} /></span>{copy.health}</legend>
                <div className="auth-question"><span>{copy.chronic} *</span><div className="auth-choice-row"><label className={form.chronicDisease === "no" ? "auth-choice active" : "auth-choice"}><input type="radio" name="chronicDisease" checked={form.chronicDisease === "no"} onChange={() => setField("chronicDisease", "no")} />{copy.no}</label><label className={form.chronicDisease === "yes" ? "auth-choice active" : "auth-choice"}><input type="radio" name="chronicDisease" checked={form.chronicDisease === "yes"} onChange={() => setField("chronicDisease", "yes")} />{copy.yes}</label></div></div>
                {form.chronicDisease === "yes" ? <div className="auth-condition-block"><span>{copy.conditions}</span><div className="auth-check-grid">{chronicOptions.map(([value, label]) => <label className="auth-check" key={value}><input type="checkbox" checked={form.chronicConditions.includes(value)} onChange={() => toggleCondition(value)} /><span>{label}</span></label>)}</div></div> : null}
                <div className="auth-quick-groups">
                  <div className="auth-option-group auth-option-group-wide"><div className="auth-option-heading"><span>{copy.symptoms} *</span><small>{copy.selectAll}</small></div><div className="auth-check-grid">{symptomOptions.map(([value, label]) => <label className="auth-check" key={value}><input type="checkbox" checked={form.symptoms.split("|").includes(value)} onChange={() => toggleCsvField("symptoms", value)} /><span>{label}</span></label>)}</div></div>
                  <div className="auth-option-group"><div className="auth-option-heading"><span>{copy.allergies}</span><small>{copy.selectAll}</small></div><div className="auth-check-grid">{allergyOptions.map(([value, label]) => <label className="auth-check" key={value}><input type="checkbox" checked={form.allergies.split("|").includes(value)} onChange={() => toggleCsvField("allergies", value)} /><span>{label}</span></label>)}</div></div>
                  <div className="auth-option-group"><div className="auth-option-heading"><span>{copy.medications}</span><small>{copy.selectAll}</small></div><div className="auth-check-grid">{medicationOptions.map(([value, label]) => <label className="auth-check" key={value}><input type="checkbox" checked={form.medications.split("|").includes(value)} onChange={() => toggleCsvField("medications", value)} /><span>{label}</span></label>)}</div></div>
                </div>
                <div className="auth-details-grid"><label className="auth-field auth-field-wide"><span>{copy.symptomDetails}</span><textarea id="auth-symptoms" rows={3} value={form.symptomDetails} onChange={(event) => setField("symptomDetails", event.target.value)} /></label><label className="auth-field"><span>{copy.allergyDetails}</span><textarea rows={3} value={form.allergyDetails} onChange={(event) => setField("allergyDetails", event.target.value)} /></label><label className="auth-field"><span>{copy.medicationDetails}</span><textarea rows={3} value={form.medicationDetails} onChange={(event) => setField("medicationDetails", event.target.value)} /></label><label className="auth-field auth-field-wide"><span>{copy.pregnancy}</span><span className="auth-input-wrap"><HeartPulse size={17} /><select value={form.pregnancyStatus} onChange={(event) => setField("pregnancyStatus", event.target.value)}><option value="">{copy.notApplicable}</option><option value="no">{copy.notPregnant}</option><option value="yes">{copy.pregnant}</option></select></span></label></div>
              </fieldset>
              <label className="auth-consent"><input id="auth-consent" type="checkbox" required checked={form.consent} onChange={(event) => setField("consent", event.target.checked)} /><span>{copy.consent}</span></label><button className="auth-submit button-primary" type="submit">{copy.submit} <AuthDirectionArrow size={18} /></button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [authVisible, setAuthVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("ar");
  const [theme, setTheme] = useState<Theme>("light");
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [languageSwitching, setLanguageSwitching] = useState(false);

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

  const toggleLanguage = () => {
    if (languageSwitching) return;
    setLanguageSwitching(true);
    setLanguage((current) => (current === "ar" ? "en" : "ar"));
    window.setTimeout(() => setLanguageSwitching(false), 560);
  };
  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));
  const DirectionArrow = language === "ar" ? ArrowLeft : ArrowRight;

  if (welcomeVisible) {
    return (
      <main className={languageSwitching ? "welcome-screen language-switching" : "welcome-screen"} dir={language === "ar" ? "rtl" : "ltr"} data-theme={theme}>
        <div className="welcome-backdrop" />
        <div className="welcome-glow glow-one" />
        <div className="welcome-glow glow-two" />
        <div className="welcome-content">
          <div className="welcome-topline"><span>صحة أفضل تبدأ بخطوة واعية</span><AvailabilityBadge language={language} /><span className="welcome-preferences"><button className="welcome-control" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}>{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}</button><button className={languageSwitching ? "welcome-control welcome-language is-switching" : "welcome-control welcome-language"} type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}><Languages size={14} /><span>{language === "ar" ? "EN" : "عربي"}</span></button></span></div>
          <div className="welcome-center">
            <div className="welcome-logo-wrap"><PharmacyMark light language={language} /></div>
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

  if (authVisible) {
    return <PatientIntakePage language={language} theme={theme} languageSwitching={languageSwitching} onBack={() => setAuthVisible(false)} />;
  }

  return (
    <main className={languageSwitching ? "site-shell language-switching" : "site-shell"} dir={language === "ar" ? "rtl" : "ltr"} data-theme={theme}>
      <div className="site-background" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu-button" type="button" aria-label={language === "ar" ? "فتح القائمة" : "Open menu"} aria-expanded={mobileMenu} onClick={() => setMobileMenu(true)}><Menu size={22} /></button>
          <button className="header-brand-button" type="button" onClick={() => goTo("home")} aria-label={language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to home"}><PharmacyMark compact language={language} /></button>
          <nav className={mobileMenu ? "main-nav open" : "main-nav"} aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
            <button className="mobile-nav-close" type="button" aria-label={language === "ar" ? "إغلاق القائمة" : "Close menu"} onClick={() => setMobileMenu(false)}><X size={20} /></button>
            <button type="button" onClick={() => goTo("home")}><Home size={18} /><span className="nav-label">الرئيسية</span></button>
            <button type="button" onClick={() => goTo("conditions")}><Activity size={18} /><span className="nav-label">الحالات الصحية</span></button>
            <button type="button" onClick={() => goTo("beauty")}><Sparkles size={18} /><span className="nav-label">العناية والجمال</span></button>
            <button type="button" onClick={() => goTo("tips")}><BookOpen size={18} /><span className="nav-label">إرشادات طبية</span></button>
            <button type="button" onClick={() => goTo("natural")}><Leaf size={18} /><span className="nav-label">العلاج البديل</span></button>
            <button className="mobile-login-nav" type="button" onClick={() => { setMobileMenu(false); setAuthVisible(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}><UserRound size={18} /><span className="nav-label">تسجيل الدخول</span></button>
          </nav>
          <div className="header-actions">
            <AvailabilityBadge language={language} />
            <DeliveryBadge compact language={language} />
            <div className="header-utility-row">
              <button className="header-theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"} title={theme === "light" ? "Dark mode" : "Light mode"}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
              <button className={languageSwitching ? "language-toggle is-switching" : "language-toggle"} type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"} title={language === "ar" ? "English" : "العربية"}><Languages size={16} /><span>{language === "ar" ? "EN" : "عربي"}</span></button>
              <button className="header-search" type="button" aria-label={language === "ar" ? "البحث" : "Search"} onClick={() => showToast("سيتم تفعيل البحث قريبًا")}><Search size={19} /></button>
            </div>
            <button className="header-login" type="button" onClick={() => { setMobileMenu(false); setAuthVisible(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}><UserRound size={17} /><span>تسجيل الدخول</span></button>
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
            <div className="hero-depth-scene" aria-hidden="true">
              <span className="depth-plate" />
              <span className="depth-ring depth-ring-one" />
              <span className="depth-ring depth-ring-two" />
              <span className="depth-node depth-node-one" />
              <span className="depth-node depth-node-two" />
            </div>
            <div className="hero-circle" />
            <Image className="hero-pharmacist" src="/generated/hero-pharmacist.png" alt="صيدلي من فريق الشفاء" width={880} height={640} priority />
            <div className="hero-floating-card card-top"><span className="floating-icon"><CircleCheck size={17} /></span><span><strong>رعاية موثوقة</strong><small>كل يوم، بخطوة أوضح</small></span></div>
            <div className="hero-floating-card card-bottom"><span className="floating-stars">★★★★★</span><span><strong>اختيارات بعناية</strong><small>لروتينك الصحي</small></span></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label={language === "ar" ? "مزايا الشفاء" : "Al-Shifa benefits"}>
        <div><span className="trust-icon"><GeneratedIcon src="trust-guidance-3d.png" /></span><span><strong>إرشاد صيدلي</strong><small>معلومة مفهومة قبل الاختيار</small></span></div>
        <div><span className="trust-icon"><GeneratedIcon src="delivery-3d.png" /></span><span><strong>خدمة قريبة</strong><small>تجربة سهلة من مكان واحد</small></span></div>
        <div><span className="trust-icon"><GeneratedIcon src="trust-natural-3d.png" /></span><span><strong>طبيعي بوعي</strong><small>لا نخلط الطبيعي بالآمن تلقائيًا</small></span></div>
        <div><span className="trust-icon"><GeneratedIcon src="trust-privacy-3d.png" /></span><span><strong>وضوح وخصوصية</strong><small>معلوماتك وقرارك في أمان</small></span></div>
      </section>

      <section id="conditions" className="content-section conditions-section">
        <SectionHeading eyebrow="اختيارات تبدأ من احتياجك" title="علاجات الحالات الصحية الشائعة" body="تعرّف على الأقسام التي تساعدك في روتينك اليومي، واسأل الصيدلي قبل بدء أي علاج جديد." />
        <div className="condition-grid">
          {conditions.map(({ title, body, image, tone }) => (
            <button className="condition-card" type="button" key={title} onClick={() => showToast("سيتم تجهيز قسم " + title + " قريبًا")}>
              <span className={"category-icon " + tone}><GeneratedIcon src={image} /></span>
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
          <Image src="/generated/beauty-panel-bg.png" alt="منتجات عناية بالبشرة في صيدلية عصرية" width={480} height={260} />
          <div className="beauty-image-caption"><span><GeneratedIcon src="beauty-caption-3d.png" className="beauty-caption-icon" /></span><strong>جمال يبدأ من عناية واعية</strong></div>
        </div>
        <div className="beauty-content">
          <SectionHeading eyebrow="العناية والجمال" title="اختياراتك الطبيعية، بأسلوب أهدأ" body="منتجات للعناية بالبشرة والشعر والزيوت الطبيعية والإكسسوارات الصحية، مع وصف واضح يساعدك على الاختيار." />
          <div className="beauty-grid">
            {beautyItems.map(({ title, body, image, tone, label }) => (
              <button className="beauty-card" type="button" key={title} onClick={() => showToast("سيتم فتح " + title + " قريبًا")}>
                <span className={"beauty-icon " + tone}><GeneratedIcon src={image} /></span>
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
            <div className="tip-visual"><div className="tip-orbit orbit-one" /><div className="tip-orbit orbit-two" /><span><GeneratedIcon src={currentTip.image} className="tip-3d-icon" /></span></div>
            <div className="tip-copy"><span className="tip-tag">{currentTip.tag}</span><h3>{currentTip.title}</h3><p>{currentTip.body}</p><a href={currentTip.sourceUrl} target="_blank" rel="noreferrer">المصدر: {currentTip.source} <DirectionArrow size={15} /></a></div>
          </article>
          <div className="tip-dots" aria-label={language === "ar" ? "التنقل بين الإرشادات" : "Guidance navigation"}>{tips.map((tip, index) => <button key={tip.tag} type="button" className={index === tipIndex ? "active" : ""} aria-label={language === "ar" ? "عرض إرشاد " + (index + 1) : "Show guidance " + (index + 1)} aria-current={index === tipIndex} onClick={() => setTipIndex(index)} />)}</div>
        </div>
      </section>

      <section id="natural" className="natural-section content-section">
        <div className="natural-copy">
          <span className="natural-badge"><GeneratedIcon src="trust-natural-3d.png" className="natural-badge-icon" /> توازن من الطبيعة</span>
          <h2>العلاج البديل<br /><strong>بعلم ومسؤولية</strong></h2>
          <p>نعرّفك على الأعشاب والمكملات كجزء من حوار صحي متكامل، لا كبديل عن وصفة الطبيب أو المتابعة اللازمة.</p>
          <div className="natural-points"><span><CircleCheck size={17} /> مراجعة التداخلات الدوائية</span><span><CircleCheck size={17} /> اختيار مصادر موثوقة</span><span><CircleCheck size={17} /> سؤال الصيدلي قبل الاستخدام</span></div>
          <button className="button-primary dark-button" type="button" onClick={() => showToast("سيتم فتح دليل العلاج البديل قريبًا")}>استكشف الدليل <DirectionArrow size={18} /></button>
        </div>
        <div className="natural-art"><div className="leaf-orb orb-main"><GeneratedIcon src="natural-care-3d.png" className="natural-art-icon" /></div><div className="leaf-orb orb-small"><GeneratedIcon src="tip-herbs-3d.png" className="natural-drop-icon" /></div><span className="natural-pill pill-one">اعرف التداخلات</span><span className="natural-pill pill-two">لا توقف دواءك بنفسك</span></div>
      </section>

      <section className="consultation-banner content-section">
        <div><span className="section-eyebrow">تحتاج إجابة واضحة؟</span><h2>اسأل الصيدلي قبل أن تحتار.</h2><p>خطوة صغيرة من السؤال قد تجعل اختيارك الصحي أكثر أمانًا.</p></div>
        <button className="button-primary" type="button" onClick={() => showToast("سيتم تفعيل الاستشارة قريبًا")}>تواصل معنا <MessageCircle size={18} /></button>
      </section>

      <footer id="footer" className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><PharmacyMark light language={language} /><p>في صيدلية الشفاء، نؤمن أن الرعاية الصحية تبدأ من معلومة واضحة وقلب حاضر.</p><div className="social-links"><a href="#footer" aria-label="فيسبوك"><span aria-hidden="true">f</span></a><a href="#footer" aria-label="إنستغرام"><span aria-hidden="true">ig</span></a><a href="#footer" aria-label="يوتيوب"><span aria-hidden="true">▶</span></a></div></div>
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