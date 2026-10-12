"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent, type PointerEvent } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Home,
  Info,
  Package,
  Pill,
  RotateCw,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Droplet,
} from "lucide-react";

type Language = "ar" | "en";
type FormType = "tablet" | "syrup" | "suppository" | "injection" | "cream" | "spray";

type MedicineForm = {
  id: FormType;
  ar: string;
  en: string;
  routeAr: string;
  routeEn: string;
};

type Medicine = {
  id: string;
  ar: string;
  en: string;
  aliases: string[];
  image: string;
  categoryAr: string;
  categoryEn: string;
  bodySystemAr: string;
  bodySystemEn: string;
  indicationsAr: string[];
  indicationsEn: string[];
  ageAr: string;
  ageEn: string;
  avoidAr: string[];
  avoidEn: string[];
  warningAr: string;
  warningEn: string;
  forms: MedicineForm[];
};

const medicines: Medicine[] = [
  {
    id: "panadol-500",
    ar: "بانادول 500 مجم",
    en: "Panadol 500 mg",
    aliases: ["باراسيتامول", "paracetamol", "acetaminophen", "panadol", "الألم والحرارة", "العناية بالأطفال"],
    image: "/generated/medicines/panadol-500mg.png",
    categoryAr: "مسكن وخافض للحرارة",
    categoryEn: "Pain reliever & fever reducer",
    bodySystemAr: "الألم والحرارة",
    bodySystemEn: "Pain & fever",
    indicationsAr: ["تخفيف الألم الخفيف إلى المتوسط", "خفض الحرارة مؤقتًا"],
    indicationsEn: ["Relief of mild to moderate pain", "Temporary fever reduction"],
    ageAr: "للبالغين والأطفال حسب العمر والوزن؛ جرعة الأطفال تحتاج سؤال الصيدلي.",
    ageEn: "For adults and children according to age and weight; ask a pharmacist about children’s doses.",
    avoidAr: ["مرض الكبد الشديد", "الحساسية للباراسيتامول", "تكرار دواء آخر يحتوي على باراسيتامول"],
    avoidEn: ["Severe liver disease", "Paracetamol allergy", "Taking another product containing paracetamol"],
    warningAr: "لا تتجاوز الجرعة المكتوبة على العبوة ولا تجمعه مع منتجات برد تحتوي على باراسيتامول.",
    warningEn: "Do not exceed the package dose or combine it with cold products containing paracetamol.",
    forms: [
      { id: "tablet", ar: "أقراص", en: "Tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" },
      { id: "syrup", ar: "شراب", en: "Syrup", routeAr: "عن طريق الفم", routeEn: "By mouth" },
      { id: "suppository", ar: "لبوس", en: "Suppository", routeAr: "عن طريق المستقيم", routeEn: "Rectal use" },
    ],
  },
  {
    id: "brufen-400",
    ar: "بروفين 400 مجم",
    en: "Brufen 400 mg",
    aliases: ["إيبوبروفين", "ibuprofen", "brufen", "الألم والحرارة"],
    image: "/generated/medicines/brufen-400mg.png",
    categoryAr: "مسكن ومضاد للالتهاب",
    categoryEn: "Pain reliever & anti-inflammatory",
    bodySystemAr: "الألم والالتهاب",
    bodySystemEn: "Pain & inflammation",
    indicationsAr: ["الألم والالتهاب قصير المدى", "آلام العضلات والمفاصل حسب توجيه المختص"],
    indicationsEn: ["Short-term pain and inflammation", "Muscle and joint pain as advised"],
    ageAr: "للبالغين وبعض الأطفال بجرعات تعتمد على الوزن؛ لا يُعطى للرضع دون وصفة.",
    ageEn: "For adults and some children with weight-based dosing; never give to infants without medical advice.",
    avoidAr: ["قرحة أو نزيف المعدة", "حساسية من مضادات الالتهاب", "الفشل الكلوي أو قصور القلب دون إشراف"],
    avoidEn: ["Stomach ulcer or bleeding", "NSAID allergy", "Kidney failure or heart failure without supervision"],
    warningAr: "تجنبه في الحمل خصوصًا بعد الأسبوع 20 إلا بتوجيه طبي.",
    warningEn: "Avoid in pregnancy, especially after 20 weeks, unless a clinician advises it.",
    forms: [
      { id: "tablet", ar: "أقراص", en: "Tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" },
      { id: "syrup", ar: "شراب أطفال", en: "Children’s syrup", routeAr: "عن طريق الفم", routeEn: "By mouth" },
    ],
  },
  {
    id: "cetal-500",
    ar: "سيتال 500 مجم",
    en: "Cetal 500 mg",
    aliases: ["باراسيتامول", "paracetamol", "cetal"],
    image: "/generated/medicines/cetal-500mg.png",
    categoryAr: "مسكن وخافض للحرارة",
    categoryEn: "Pain reliever & fever reducer",
    bodySystemAr: "الألم والحرارة",
    bodySystemEn: "Pain & fever",
    indicationsAr: ["الصداع وآلام الجسم الخفيفة", "الحمى المؤقتة"],
    indicationsEn: ["Mild headache and body aches", "Temporary fever"],
    ageAr: "تختلف الجرعة للأطفال حسب الوزن؛ استشر الصيدلي قبل الاستخدام.",
    ageEn: "Children’s doses depend on weight; ask a pharmacist before use.",
    avoidAr: ["مرض كبدي شديد", "حساسية للمادة الفعالة", "الجرعات المتكررة دون حساب إجمالي الباراسيتامول"],
    avoidEn: ["Severe liver disease", "Allergy to the active ingredient", "Repeated doses without counting total paracetamol"],
    warningAr: "هذا المنتج يحتوي على باراسيتامول؛ انتبه من تكراره مع علاج آخر.",
    warningEn: "This product contains paracetamol; avoid duplicating it with another medicine.",
    forms: [{ id: "tablet", ar: "أقراص", en: "Tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" }],
  },
  {
    id: "gaviscon-double-action",
    ar: "جافيسكون دبل أكشن",
    en: "Gaviscon Double Action",
    aliases: ["حموضة", "ارتجاع", "reflux", "gaviscon", "الجهاز الهضمي"],
    image: "/generated/medicines/gaviscon-double-action-liquid-150ml.png",
    categoryAr: "للحموضة والارتجاع",
    categoryEn: "For heartburn & reflux",
    bodySystemAr: "الجهاز الهضمي",
    bodySystemEn: "Digestive system",
    indicationsAr: ["حرقة المعدة العرضية", "أعراض الارتجاع بعد الطعام"],
    indicationsEn: ["Occasional heartburn", "Reflux symptoms after meals"],
    ageAr: "للبالغين والأطفال فوق 12 عامًا حسب النشرة؛ الأصغر يحتاج توجيهًا طبيًا.",
    ageEn: "For adults and children over 12 according to the leaflet; younger children need medical advice.",
    avoidAr: ["حساسية لأي مكوّن", "نظام غذائي منخفض الصوديوم أو الكالسيوم دون سؤال المختص", "مرض كلوي شديد دون إشراف"],
    avoidEn: ["Allergy to an ingredient", "Low-sodium or low-calcium diet without advice", "Severe kidney disease without supervision"],
    warningAr: "افصل بينه وبين بعض الأدوية الأخرى بمدة يحددها الصيدلي.",
    warningEn: "Ask a pharmacist about spacing it from other medicines.",
    forms: [{ id: "syrup", ar: "معلّق فموي", en: "Oral suspension", routeAr: "عن طريق الفم", routeEn: "By mouth" }],
  },
  {
    id: "glucophage-xr-500",
    ar: "جلوكوفاج XR 500 مجم",
    en: "Glucophage XR 500 mg",
    aliases: ["ميتفورمين", "metformin", "glucophage", "السكري"],
    image: "/generated/medicines/glucophage-xr-500mg.png",
    categoryAr: "للسكري من النوع الثاني",
    categoryEn: "For type 2 diabetes",
    bodySystemAr: "السكري والتمثيل الغذائي",
    bodySystemEn: "Diabetes & metabolism",
    indicationsAr: ["جزء من خطة علاج السكري من النوع الثاني", "يستخدم مع التغذية والنشاط حسب الخطة الطبية"],
    indicationsEn: ["Part of a type 2 diabetes plan", "Used with diet and activity as prescribed"],
    ageAr: "يُستخدم بوصفة ومتابعة؛ لا تبدأه أو توقفه من نفسك.",
    ageEn: "Prescription and monitoring are required; do not start or stop it yourself.",
    avoidAr: ["قصور كلوي شديد", "الجفاف أو القيء الشديد", "إجراءات أشعة بصبغة دون إبلاغ الفريق الطبي"],
    avoidEn: ["Severe kidney impairment", "Dehydration or severe vomiting", "Contrast imaging without informing the medical team"],
    warningAr: "هذه معلومة تعريفية وليست جرعة علاجية؛ الجرعة يحددها الطبيب.",
    warningEn: "This is educational information, not dosing advice; the clinician decides the dose.",
    forms: [{ id: "tablet", ar: "أقراص ممتدة المفعول", en: "Extended-release tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" }],
  },
  {
    id: "concor-5",
    ar: "كونكور 5 مجم",
    en: "Concor 5 mg",
    aliases: ["بيسوبرولول", "bisoprolol", "concor", "ضغط", "القلب"],
    image: "/generated/medicines/concor-5mg.png",
    categoryAr: "لضغط الدم وبعض حالات القلب",
    categoryEn: "For blood pressure and selected heart conditions",
    bodySystemAr: "الضغط والقلب",
    bodySystemEn: "Blood pressure & heart",
    indicationsAr: ["يُستخدم ضمن خطة علاجية يحددها الطبيب", "قد يُوصف لبعض حالات ضغط الدم أو القلب حسب التقييم"],
    indicationsEn: ["Used as part of a clinician-led treatment plan", "May be prescribed for selected blood-pressure or heart conditions"],
    ageAr: "دواء بوصفة ومتابعة؛ لا تبدأه أو توقفه فجأة، والجرعة يحددها الطبيب.",
    ageEn: "Prescription and monitoring are required; do not start or stop it suddenly, and follow the prescribed dose.",
    avoidAr: ["بطء شديد في نبض القلب أو انخفاض الضغط", "الربو أو مشاكل التنفس دون سؤال الطبيب", "الحمل أو الرضاعة دون توجيه طبي"],
    avoidEn: ["Very slow heart rate or low blood pressure", "Asthma or breathing problems without medical advice", "Pregnancy or breastfeeding without guidance"],
    warningAr: "هذه معلومات تعريفية وليست بديلًا عن الطبيب؛ لا تغيّر جرعتك ولا توقف العلاج من نفسك.",
    warningEn: "This is identification information, not a substitute for medical care; never change or stop it on your own.",
    forms: [{ id: "tablet", ar: "أقراص", en: "Tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" }],
  },
  {
    id: "ventolin-inhaler",
    ar: "فنتولين بخاخ",
    en: "Ventolin Inhaler",
    aliases: ["سالبوتامول", "salbutamol", "ventolin", "ربو"],
    image: "/generated/medicines/ventolin-inhaler-100mcg.png",
    categoryAr: "موسّع للشُعب الهوائية",
    categoryEn: "Bronchodilator",
    bodySystemAr: "التنفس والشُعب الهوائية",
    bodySystemEn: "Breathing & airways",
    indicationsAr: ["تخفيف أعراض ضيق النفس أو الصفير عند وصفه", "جزء من خطة الربو أو الانسداد الهوائي"],
    indicationsEn: ["Relief of wheeze or breathlessness when prescribed", "Part of an asthma or airway plan"],
    ageAr: "قد يُستخدم للأطفال بتوجيه طبي؛ طريقة الاستخدام الصحيحة مهمة.",
    ageEn: "May be used in children with medical guidance; technique matters.",
    avoidAr: ["حساسية للمادة الفعالة", "تسارع قلب أو أمراض قلب دون مراجعة الطبيب", "الاعتماد عليه بدل علاج السيطرة"],
    avoidEn: ["Allergy to the active ingredient", "Fast heartbeat or heart disease without advice", "Using it instead of controller treatment"],
    warningAr: "صعوبة التنفس الشديدة أو عدم الاستجابة تستدعي الطوارئ، لا تكتفِ بتكرار البخاخ.",
    warningEn: "Severe breathing difficulty or poor response needs urgent care; do not simply repeat doses.",
    forms: [{ id: "spray", ar: "بخاخ", en: "Inhaler", routeAr: "عن طريق الاستنشاق", routeEn: "By inhalation" }],
  },
  {
    id: "aerius-5",
    ar: "أيريوس 5 مجم",
    en: "Aerius 5 mg",
    aliases: ["ديسلوراتادين", "desloratadine", "aerius", "حساسية", "البرد والحساسية"],
    image: "/generated/medicines/aerius-5mg.png",
    categoryAr: "مضاد للحساسية",
    categoryEn: "Antihistamine",
    bodySystemAr: "الحساسية والأنف",
    bodySystemEn: "Allergy & nose",
    indicationsAr: ["أعراض حساسية الأنف", "الحكة والشرى حسب التقييم"],
    indicationsEn: ["Allergic rhinitis symptoms", "Itching and hives as assessed"],
    ageAr: "اختيار التركيز والشكل للأطفال يعتمد على العمر؛ لا تستخدم قرص البالغين للصغار.",
    ageEn: "Children need age-appropriate strength and form; do not use adult tablets for young children.",
    avoidAr: ["حساسية للمادة الفعالة", "قصور كلوي شديد دون استشارة", "الحمل أو الرضاعة دون سؤال المختص"],
    avoidEn: ["Allergy to the active ingredient", "Severe kidney impairment without advice", "Pregnancy or breastfeeding without guidance"],
    warningAr: "إذا ظهرت صعوبة تنفس أو تورم بالوجه فهذه حالة طارئة.",
    warningEn: "Breathing difficulty or facial swelling is an emergency.",
    forms: [{ id: "tablet", ar: "أقراص", en: "Tablets", routeAr: "عن طريق الفم", routeEn: "By mouth" }],
  },
  {
    id: "bepanthen-ointment",
    ar: "بيبانثين مرهم",
    en: "Bepanthen Ointment",
    aliases: ["ديكسبانثينول", "dexpanthenol", "bepanthen", "جلد"],
    image: "/generated/medicines/bepanthen-ointment-30g.png",
    categoryAr: "للعناية بالجلد",
    categoryEn: "Skin care",
    bodySystemAr: "الجلد والحاجز الواقي",
    bodySystemEn: "Skin barrier",
    indicationsAr: ["جفاف الجلد والتهيج البسيط", "العناية الموضعية حسب الحالة"],
    indicationsEn: ["Dry or mildly irritated skin", "Topical care according to the condition"],
    ageAr: "يمكن استخدامه موضعيًا في أعمار مختلفة وفق نوع المنتج والحالة.",
    ageEn: "Topical use varies by age, product type, and condition.",
    avoidAr: ["الحساسية أو التهيج المتزايد", "وضعه على جرح عميق أو عدوى دون تقييم", "ملامسة العين"],
    avoidEn: ["Allergy or worsening irritation", "Deep wounds or infection without assessment", "Contact with eyes"],
    warningAr: "لا تستخدمه على مساحة كبيرة أو لفترة طويلة دون تقييم إذا لم تتحسن الحالة.",
    warningEn: "Do not use over large areas or long-term without assessment if symptoms persist.",
    forms: [{ id: "cream", ar: "مرهم", en: "Ointment", routeAr: "للاستخدام الموضعي", routeEn: "For topical use" }],
  },
];

const anatomyViews = [
  { file: "/generated/anatomy/human-anatomy-front.png", ar: "الأمامي", en: "Front" },
  { file: "/generated/anatomy/human-anatomy-right.png", ar: "الجانب الأيمن", en: "Right side" },
  { file: "/generated/anatomy/human-anatomy-back.png", ar: "الخلفي", en: "Back" },
  { file: "/generated/anatomy/human-anatomy-left.png", ar: "الجانب الأيسر", en: "Left side" },
] as const;

function normalize(value: string) {
  return value.toLocaleLowerCase("ar").normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").trim();
}

type PrescriptionScanItem = { name: string; confidence: number; matchedId?: string; matchedName?: string };
type PrescriptionMedicineCheck = { extractedName: string; availability: "available" | "not-found"; confidence: number; matchedId?: string; matchedName?: string };
type PrescriptionScanResult = { status: string; provider: string; medicines: PrescriptionScanItem[]; checks: PrescriptionMedicineCheck[]; notice: string };

function readCompressedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة."));
    reader.onload = () => {
      if (typeof reader.result !== "string") { reject(new Error("تعذر قراءة الصورة.")); return; }
      const source = reader.result;
      const image = new window.Image();
      image.onerror = () => reject(new Error("صيغة الصورة غير مدعومة."));
      image.onload = () => {
        const maxDimension = 1400;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) { resolve(source); return; }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const encode = (quality: number) => canvas.toBlob((blob) => {
          if (!blob) { resolve(source); return; }
          const encoded = new FileReader();
          encoded.onerror = () => reject(new Error("تعذر تجهيز الصورة."));
          encoded.onload = () => {
            if (typeof encoded.result !== "string") { reject(new Error("تعذر تجهيز الصورة.")); return; }
            if (encoded.result.length > 438000 && quality > 0.42) { encode(quality - 0.1); return; }
            resolve(encoded.result);
          };
          encoded.readAsDataURL(blob);
        }, "image/jpeg", quality);
        encode(0.78);
      };
      image.src = source;
    };
    reader.readAsDataURL(file);
  });
}

function FormIcon({ type }: { type: FormType }) {
  if (type === "injection") return <Syringe size={17} />;
  if (type === "suppository") return <Package size={17} />;
  if (type === "cream" || type === "spray" || type === "syrup") return <Droplet size={17} />;
  return <Pill size={17} />;
}

function AnatomySearchViewer({ language }: { language: Language }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const isArabic = language === "ar";
  const move = (step: number) => setIndex((current) => (current + step + anatomyViews.length) % anatomyViews.length);
  const down = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) < 34) return;
    move(distance < 0 ? 1 : -1);
    startX.current = event.clientX;
  };
  const up = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") move(isArabic ? -1 : 1);
    if (event.key === "ArrowLeft") move(isArabic ? 1 : -1);
  };
  return (
    <div className="search-anatomy-card">
      <div className="search-anatomy-heading"><span className="search-eyebrow"><Activity size={14} /> {isArabic ? "مرجع بصري تفاعلي" : "Interactive visual reference"}</span><strong>{isArabic ? "جسم الإنسان" : "Human body"}</strong><small>{isArabic ? "اسحب للتدوير بين الجهات الأربع" : "Drag to rotate through four views"}</small></div>
      <div className="search-anatomy-viewer" onKeyDown={keyDown} onPointerDown={down} onPointerMove={movePointer} onPointerUp={up} onPointerCancel={up} role="application" tabIndex={0} aria-label={isArabic ? "عارض الجسم التشريحي" : "Anatomy viewer"}>
        <span className="search-anatomy-halo" aria-hidden="true" />
        <Image src={anatomyViews[index].file} alt={isArabic ? "المنظر " + anatomyViews[index].ar : anatomyViews[index].en + " view"} width={400} height={600} unoptimized draggable={false} />
        <span className="search-anatomy-hint"><RotateCw size={14} /> {isArabic ? "اسحب للتدوير" : "Drag to rotate"}</span>
      </div>
      <div className="search-anatomy-controls"><button type="button" onClick={() => move(isArabic ? 1 : -1)} aria-label={isArabic ? "المنظر السابق" : "Previous view"}><ChevronRight size={18} /></button><div><strong>{isArabic ? anatomyViews[index].ar : anatomyViews[index].en}</strong><span>{String(index + 1).padStart(2, "0")} / 04</span></div><button type="button" onClick={() => move(isArabic ? -1 : 1)} aria-label={isArabic ? "المنظر التالي" : "Next view"}><ChevronLeft size={18} /></button></div>
    </div>
  );
}

function SearchHeader({ language, setLanguage }: { language: Language; setLanguage: (value: Language) => void }) {
  const isArabic = language === "ar";
  return (
    <header className="search-topbar">
      <Link href="/" className="search-brand"><span><Image src="/generated/pharmacy-emblem.png" alt="" width={48} height={48} unoptimized /></span><strong>{isArabic ? "صيدلية الشفاء" : "Al-Shifa Pharmacy"}<small>{isArabic ? "رعاية أقرب إليك" : "Care, closer to you"}</small></strong></Link>
      <nav className="search-nav" aria-label={isArabic ? "التنقل" : "Navigation"}><Link href="/"><Home size={16} /> {isArabic ? "الرئيسية" : "Home"}</Link><Link href="/about">{isArabic ? "من نحن" : "About"}</Link><Link href="/contact">{isArabic ? "تواصل معنا" : "Contact"}</Link></nav>
      <div className="search-top-actions"><Link className="search-language-toggle" href={isArabic ? "/search?lang=en" : "/search?lang=ar"} onClick={(event) => { event.preventDefault(); const next = isArabic ? "en" : "ar"; setLanguage(next); try { window.localStorage.setItem("al-shifa-language", next); } catch {} }} aria-label={isArabic ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}><span>文</span>{isArabic ? "English" : "العربية"}</Link><Link href="/">{isArabic ? "العودة" : "Back"}</Link></div>
    </header>
  );
}

export default function SearchPage() {
  const [language, setLanguage] = useState<Language>("ar");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(medicines[0].id);
  const [formId, setFormId] = useState<FormType>(medicines[0].forms[0].id);
  const [prescriptionImage, setPrescriptionImage] = useState<{ dataUrl: string; fileName: string } | null>(null);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [scanError, setScanError] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);
  const [scanResult, setScanResult] = useState<PrescriptionScanResult | null>(null);
  const isArabic = language === "ar";
  const selectedMedicine = medicines.find((medicine) => medicine.id === selectedId) ?? medicines[0];
  const matches = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return medicines.slice(0, 6);
    return medicines.filter((medicine) => [medicine.ar, medicine.en, ...medicine.aliases, medicine.bodySystemAr, medicine.bodySystemEn].some((term) => normalize(term).includes(needle))).slice(0, 7);
  }, [query]);
  const noResults = query.trim().length > 0 && matches.length === 0;

  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "ar") {
      // URL language is an external browser preference; the state update is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(requestedLanguage);
      try { window.localStorage.setItem("al-shifa-language", requestedLanguage); } catch {}
      return;
    }
    try {
      const stored = window.localStorage.getItem("al-shifa-language");
      if (stored === "en") setLanguage("en");
    } catch {}
  }, []);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q")?.trim();
    if (!initialQuery) return;
    // Initialize the search state from the deep-link query once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(initialQuery);
    const needle = normalize(initialQuery);
    const match = medicines.find((medicine) => [medicine.ar, medicine.en, ...medicine.aliases, medicine.bodySystemAr, medicine.bodySystemEn].some((term) => normalize(term).includes(needle)));
    if (match) {
      setSelectedId(match.id);
      setFormId(match.forms[0].id);
    }
  }, []);

  useEffect(() => {
    if (!selectedMedicine.forms.some((form) => form.id === formId)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormId(selectedMedicine.forms[0].id);
    }
  }, [selectedMedicine, formId]);

  const chooseMedicine = (medicine: Medicine) => {
    setSelectedId(medicine.id);
    setQuery(medicine.ar);
    setFormId(medicine.forms[0].id);
  };
  const searchMedicineDatabase = async (recognizedText: string) => {
    const text = recognizedText.trim();
    if (!text) throw new Error("لم نستطع قراءة اسم إنجليزي واضح من الصورة. جرّب صورة أوضح أو اكتب أسماء الأدوية بالإنجليزية يدويًا.");
    const response = await fetch("/api/medicines?q=" + encodeURIComponent(text));
    const payload = await response.json() as { source?: string; language?: string; medicines?: Array<{ id: string; en: string; confidence: number }>; checks?: PrescriptionMedicineCheck[] };
    if (!response.ok) throw new Error("تعذر البحث في قاعدة العلاجات الآن.");
    const checks = payload.checks || [];
    const items = checks.filter((item) => item.availability === "available" && item.matchedId).map((item) => ({ name: item.extractedName, confidence: item.confidence, matchedId: item.matchedId, matchedName: item.matchedName || item.extractedName }));
    const availableCount = checks.filter((item) => item.availability === "available").length;
    const missingCount = checks.filter((item) => item.availability === "not-found").length;
    const notice = checks.length
      ? `تم استخراج ${checks.length} اسمًا بالإنجليزية فقط: ${availableCount} متوفر في قاعدة البيانات${missingCount ? ` و${missingCount} غير موجود حاليًا` : ""}. راجع الاسم والجرعة مع الصيدلي قبل الاستخدام.`
      : "تمت قراءة النص بالإنجليزية، لكن لم يتم التعرف على أسماء أدوية واضحة. صحّح النص ثم أعد البحث.";
    setOcrText(text);
    setScanResult({ status: "needs-review", provider: payload.source || "database", medicines: items, checks, notice });
    setScanState("done");
    const firstMedicine = items[0]?.matchedId ? medicines.find((item) => item.id === items[0].matchedId) : undefined;
    if (firstMedicine) chooseMedicine(firstMedicine);
  };
  const analyzePrescription = async (dataUrl: string) => {
    setScanState("scanning");
    setScanError("");
    setOcrProgress(1);
    setOcrText("");
    let worker: { recognize: (image: string) => Promise<{ data: { text: string } }>; terminate: () => Promise<unknown> } | null = null;
    try {
      const { createWorker } = await import("tesseract.js");
      worker = await createWorker(["eng"], 1, { logger: (message) => { if (message.status && Number.isFinite(message.progress)) setOcrProgress(Math.max(1, Math.min(99, Math.round(message.progress * 100)))); } });
      const result = await worker.recognize(dataUrl);
      await searchMedicineDatabase(result.data.text);
    } catch (error) {
      setScanState("error");
      setScanError(error instanceof Error ? error.message : "تعذر قراءة الروشتة الآن.");
    } finally {
      if (worker) await worker.terminate().catch(() => undefined);
    }
  };
  const handlePrescriptionFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { setScanState("error"); setScanError("اختر صورة JPG أو PNG أو WebP."); return; }
    try {
      const dataUrl = await readCompressedImage(file);
      if (dataUrl.length > 440000) throw new Error("الصورة ما زالت كبيرة. اختر صورة أوضح وأقل حجمًا.");
      const preparedName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      setPrescriptionImage({ dataUrl, fileName: preparedName });
      await analyzePrescription(dataUrl);
    } catch (error) {
      setScanState("error");
      setScanError(error instanceof Error ? error.message : "تعذر تجهيز الصورة.");
    }
  };
  const clearPrescription = () => { setPrescriptionImage(null); setScanResult(null); setScanError(""); setOcrText(""); setOcrProgress(0); setScanState("idle"); };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matches[0]) chooseMedicine(matches[0]);
  };
  const selectedForm = selectedMedicine.forms.find((form) => form.id === formId) ?? selectedMedicine.forms[0];
  const indications = isArabic ? selectedMedicine.indicationsAr : selectedMedicine.indicationsEn;
  const avoid = isArabic ? selectedMedicine.avoidAr : selectedMedicine.avoidEn;

  return (
    <main className="search-page" dir={isArabic ? "rtl" : "ltr"}>
      <SearchHeader language={language} setLanguage={(value) => { setLanguage(value); try { window.localStorage.setItem("al-shifa-language", value); } catch {} }} />
      <section className="search-hero">
        <div className="search-hero-copy">
          <span className="search-eyebrow"><Stethoscope size={15} /> {isArabic ? "مساعد اختيار دوائي" : "Medicine guidance assistant"}</span>
          <h1>{isArabic ? "ابحث عن العلاج، وافهمه قبل الاختيار." : "Find a medicine, understand it before choosing."}</h1>
          <p>{isArabic ? "اكتب الاسم بالعربية أو الإنجليزية، وسنقترح عليك أسماء قريبة لتصل للمعلومة بسهولة." : "Type the name in Arabic or English and get helpful suggestions to find the right information."}</p>
          <form className="search-box" role="search" onSubmit={submitSearch}>
            <Search size={21} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isArabic ? "مثال: بانادول أو Panadol أو باراسيتامول" : "Example: Panadol, Brufen, or paracetamol"} aria-label={isArabic ? "اسم العلاج" : "Medicine name"} autoComplete="off" />
            <button type="submit">{isArabic ? "بحث" : "Search"} <ArrowLeft size={17} /></button>
          </form>
          <section className="prescription-upload-panel" aria-label={isArabic ? "رفع وتحليل الروشتة" : "Prescription upload and review"}>
            <div className="prescription-upload-heading"><span className="search-card-kicker"><Package size={15} /> {isArabic ? "مراجعة الروشتة" : "Prescription review"}</span><strong>{isArabic ? "استخرج أسماء الأدوية بالإنجليزية" : "Extract English medicine names"}</strong><p>{isArabic ? "سنقرأ أسماء الأدوية المكتوبة بالإنجليزية فقط، ثم نبحث عن كل اسم في قاعدة البيانات لمعرفة هل هو متوفر." : "We read English medicine names only, then check each name against the medicine database."}</p></div>
            <div className="prescription-upload-actions"><label className="prescription-upload-trigger"><Package size={17} /> {isArabic ? "اختيار صورة الروشتة" : "Choose prescription image"}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePrescriptionFile} /></label>{prescriptionImage && <button className="prescription-clear-button" type="button" onClick={clearPrescription}>{isArabic ? "إزالة" : "Remove"}</button>}</div>
            {prescriptionImage && <div className="prescription-preview"><img src={prescriptionImage.dataUrl} alt={isArabic ? "معاينة صورة الروشتة" : "Prescription preview"} /><div><strong>{prescriptionImage.fileName}</strong><span>{scanState === "scanning" ? (isArabic ? `جاري قراءة أسماء الأدوية بالإنجليزية... ${ocrProgress}%` : `Reading English medicine names... ${ocrProgress}%`) : (isArabic ? "الصورة جاهزة للمراجعة" : "Image ready for review")}</span></div></div>}
            {scanState === "error" && <div className="prescription-scan-message error"><AlertTriangle size={15} /> {scanError}</div>}
            {scanResult && <div className="prescription-scan-result"><div><strong>{isArabic ? "نتيجة قراءة الأسماء والتحقق من التوفر" : "English OCR and availability check"}</strong><p>{scanResult.notice}</p></div><label className="prescription-ocr-text-field"><span>{isArabic ? "أسماء الأدوية المقروءة بالإنجليزية — يمكنك تصحيحها" : "English medicine names — you can correct them"}</span><textarea dir="ltr" lang="en" value={ocrText} onChange={(event) => setOcrText(event.target.value)} rows={3} placeholder="Panadol 500 mg\nBrufen 400 mg" /></label><button className="prescription-recheck-button" type="button" onClick={() => searchMedicineDatabase(ocrText)}>{isArabic ? "إعادة التحقق من قاعدة البيانات" : "Check availability again"}</button>{scanResult.checks.length > 0 && <div className="prescription-availability-list">{scanResult.checks.map((item) => <div className={item.availability === "available" ? "prescription-availability-item available" : "prescription-availability-item missing"} key={`${item.extractedName}-${item.matchedId || "missing"}`}><div><strong dir="ltr">{item.extractedName}</strong>{item.availability === "available" && item.matchedName && <small dir="ltr">{item.matchedName} · {Math.round(item.confidence * 100)}% match</small>}</div><span>{item.availability === "available" ? (isArabic ? "متوفر في قاعدة البيانات" : "Available in database") : (isArabic ? "غير موجود في قاعدة البيانات" : "Not found in database")}</span>{item.availability === "available" && item.matchedId && <button type="button" onClick={() => { const medicine = medicines.find((entry) => entry.id === item.matchedId); if (medicine) chooseMedicine(medicine); }}>{isArabic ? "عرض التفاصيل" : "View details"}</button>}</div>)}</div>}{scanResult.medicines.length > 0 && <div className="prescription-candidate-list">{scanResult.medicines.map((item) => <button type="button" key={item.matchedId || item.name} onClick={() => { const medicine = item.matchedId ? medicines.find((entry) => entry.id === item.matchedId) : undefined; if (medicine) chooseMedicine(medicine); }}>{item.matchedName || item.name}<small>{Math.round(item.confidence * 100)}% · {isArabic ? "اختيار للمراجعة" : "Review candidate"}</small></button>)}</div>}<Link href="/profile#medical-files" className="prescription-save-link">{isArabic ? "حفظ الصورة في ملفي الصحي" : "Save image to my health profile"} <ArrowLeft size={14} /></Link></div>}
          </section>
          <div className="search-suggestion-panel" aria-live="polite"><span><Info size={15} /> {isArabic ? "مساعدة في الكتابة" : "Typing help"}</span><p>{isArabic ? "جرّب الاسم التجاري أو المادة الفعالة بالعربية والإنجليزية:" : "Try a brand name or active ingredient in Arabic or English:"}</p><div>{matches.length ? matches.map((medicine) => <button key={medicine.id} type="button" onClick={() => chooseMedicine(medicine)}>{medicine.ar} <small>{medicine.en}</small></button>) : <span className="search-no-suggestions">{isArabic ? "لم نجد علاجًا مطابقًا. جرّب اسمًا تجاريًا أو مادة فعالة مختلفة." : "No matching medicine yet. Try another brand or active ingredient."}</span>}</div></div>
        </div>
        <div className="search-hero-orb"><span className="search-orb-ring ring-one" /><span className="search-orb-ring ring-two" /><Image src="/generated/health-profile-card.png" alt="" width={280} height={280} unoptimized /></div>
      </section>

      <section className="search-result-section" aria-live="polite">
        <div className="search-result-header"><div><span className="search-eyebrow"><CircleCheck size={15} /> {isArabic ? "نتيجة البحث" : "Search result"}</span><h2>{noResults ? (isArabic ? "لا توجد نتيجة مطابقة" : "No matching result") : (isArabic ? selectedMedicine.ar : selectedMedicine.en)}</h2><p>{noResults ? (isArabic ? "جرّب اسمًا آخر أو راجع الكتابة." : "Try another name or check the spelling.") : (isArabic ? selectedMedicine.categoryAr : selectedMedicine.categoryEn)}</p></div><span className="search-result-tag"><ShieldCheck size={15} /> {isArabic ? "معلومات تعليمية" : "Educational information"}</span></div>
        <>{noResults ? <div className="search-no-result-card"><Search size={26} /><h3>{isArabic ? "لم نعثر على هذا العلاج بعد" : "We could not find that medicine yet"}</h3><p>{isArabic ? "تحقق من الكتابة أو جرّب الاسم التجاري أو المادة الفعالة بالعربية والإنجليزية." : "Check the spelling or try the brand name or active ingredient in Arabic or English."}</p><button type="button" onClick={() => setQuery("")}>{isArabic ? "عرض الاقتراحات" : "Show suggestions"}</button></div> : <div className="search-result-grid">
          <article className="search-product-card">
            <div className="search-product-visual"><Image src={selectedMedicine.image} alt={isArabic ? selectedMedicine.ar : selectedMedicine.en} width={330} height={330} unoptimized /><span>{isArabic ? "صورة المنتج للتعرّف البصري" : "Visual product reference"}</span></div>
            <div className="search-product-copy"><span className="search-card-kicker"><Package size={15} /> {isArabic ? "الأشكال المتاحة" : "Available forms"}</span><h3>{isArabic ? selectedMedicine.ar : selectedMedicine.en}</h3><p>{isArabic ? "اختر الشكل الدوائي المتوفر مع هذا المنتج لعرض طريقة الاستخدام العامة." : "Choose an available form to see its general route of use."}</p><div className="medicine-form-grid">{selectedMedicine.forms.map((form) => <button type="button" key={form.id} className={form.id === selectedForm.id ? "medicine-form active" : "medicine-form"} onClick={() => setFormId(form.id)}><span><FormIcon type={form.id} /></span><strong>{isArabic ? form.ar : form.en}</strong><small>{isArabic ? form.routeAr : form.routeEn}</small></button>)}</div><div className="selected-form-note"><strong>{isArabic ? selectedForm.ar : selectedForm.en}</strong><span>{isArabic ? selectedForm.routeAr : selectedForm.routeEn}</span></div></div>
          </article>

          <AnatomySearchViewer language={language} />

          <article className="search-guidance-card"><div className="search-guidance-heading"><span className="search-eyebrow"><Activity size={15} /> {isArabic ? selectedMedicine.bodySystemAr : selectedMedicine.bodySystemEn}</span><h3>{isArabic ? "متى يُستخدم؟" : "What is it used for?"}</h3></div><ul>{indications.map((item) => <li key={item}><CircleCheck size={16} /> {item}</li>)}</ul><div className="search-age-note"><Info size={18} /><div><strong>{isArabic ? "ملاحظة العمر" : "Age note"}</strong><p>{isArabic ? selectedMedicine.ageAr : selectedMedicine.ageEn}</p></div></div><div className="search-avoid-note"><AlertTriangle size={18} /><div><strong>{isArabic ? "متى يجب تجنبه أو سؤال الطبيب؟" : "When to avoid or ask a doctor"}</strong><ul>{avoid.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className="search-doctor-note"><Stethoscope size={18} /><p>{isArabic ? selectedMedicine.warningAr : selectedMedicine.warningEn}</p></div></article>
        </div>}</>
        <div className="search-disclaimer"><ShieldCheck size={19} /><p>{isArabic ? "المحتوى للتوعية والتعرّف على المنتج فقط، ولا يحدد التشخيص أو الجرعة. استشر طبيبك أو الصيدلي للحصول على نصيحة مناسبة لحالتك." : "This content is for education and product identification only. It does not diagnose or provide dosing. Ask your doctor or pharmacist for advice for your condition."}</p></div>
      </section>

      <footer className="search-footer"><span>© ٢٠٢٦ صيدلية الشفاء</span><span>{isArabic ? "رعاية أوضح، وقرار صحي أكثر أمانًا." : "Clearer care, safer health decisions."}</span></footer>
    </main>
  );
}
