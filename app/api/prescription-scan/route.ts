export const dynamic = "force-dynamic";

type ScanItem = {
  name: string;
  confidence: number;
  matchedId?: string;
  matchedName?: string;
};

type CatalogItem = {
  id: string;
  ar: string;
  en: string;
  aliases: string[];
};

const catalog: CatalogItem[] = [
  { id: "panadol-500", ar: "بانادول 500 مجم", en: "Panadol 500 mg", aliases: ["بانادول", "panadol", "paracetamol", "باراسيتامول"] },
  { id: "brufen-400", ar: "بروفين 400 مجم", en: "Brufen 400 mg", aliases: ["بروفين", "brufen", "ibuprofen", "إيبوبروفين"] },
  { id: "cetal-500", ar: "سيتال 500 مجم", en: "Cetal 500 mg", aliases: ["سيتال", "cetal", "paracetamol", "باراسيتامول"] },
  { id: "gaviscon-double-action", ar: "جافيسكون دبل أكشن", en: "Gaviscon Double Action", aliases: ["جافيسكون", "gaviscon", "ارتجاع", "حموضة"] },
  { id: "glucophage-xr-500", ar: "جلوكوفاج XR 500 مجم", en: "Glucophage XR 500 mg", aliases: ["جلوكوفاج", "glucophage", "metformin", "ميتفورمين"] },
  { id: "concor-5", ar: "كونكور 5 مجم", en: "Concor 5 mg", aliases: ["كونكور", "concor", "bisoprolol", "بيسوبرولول"] },
];

function textValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalize(value: string) {
  return value.toLocaleLowerCase("ar").normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").trim();
}

function catalogMatch(value: string) {
  const needle = normalize(value);
  if (!needle) return undefined;
  return catalog.find((item) => [item.ar, item.en, ...item.aliases].some((term) => needle.includes(normalize(term)) || normalize(term).includes(needle)));
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const dataUrl = textValue(payload.dataUrl, 440000);
  const fileName = textValue(payload.fileName, 180) || "prescription-image.jpg";
  const hint = textValue(payload.hint, 140);
  if (!dataUrl.startsWith("data:image/") || dataUrl.length > 440000) {
    return Response.json({ error: "يرجى رفع صورة واضحة بحجم أقل من 4 ميجابايت." }, { status: 413 });
  }

  const fileMatch = catalogMatch(fileName);
  const hintMatch = catalogMatch(hint);
  const candidates: ScanItem[] = [
    ...(fileMatch ? [{ name: fileMatch.ar, confidence: 0.45, matchedId: fileMatch.id, matchedName: `${fileMatch.ar} / ${fileMatch.en}` }] : []),
    ...(hintMatch && hintMatch.id !== fileMatch?.id ? [{ name: hintMatch.ar, confidence: 0.6, matchedId: hintMatch.id, matchedName: `${hintMatch.ar} / ${hintMatch.en}` }] : []),
  ];
  const medicines = candidates.filter((item, index, all) => all.findIndex((candidate) => candidate.matchedId === item.matchedId) === index).slice(0, 12);
  return Response.json({
    status: "needs-review",
    provider: "local-safe",
    medicines,
    notice: medicines.length
      ? "تم العثور على اسم محتمل من اسم الملف أو النص المساعد فقط، وليس من محتوى الصورة. راجع الاسم والجرعة مع الصيدلي قبل أي استخدام."
      : "تم رفع الصورة بنجاح. لم يتم تخمين أسماء الأدوية من الصورة حفاظًا على سلامة المريض؛ أدخل الاسم يدويًا أو اعرض الروشتة على الصيدلي.",
  });
}