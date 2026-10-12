import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { medicineCatalog } from "@/db/schema";

export const dynamic = "force-dynamic";

type CatalogMedicine = { id: string; ar: string; en: string; aliases: string[]; categoryAr: string; categoryEn: string; active?: boolean };
type MedicineMatch = CatalogMedicine & { confidence: number; extractedName?: string; availability: "available" };
type MedicineCheck = { extractedName: string; availability: "available"; confidence: number; matchedId: string; matchedName: string };

const fallbackCatalog: CatalogMedicine[] = [
  { id: "panadol-500", ar: "بانادول 500 مجم", en: "Panadol 500 mg", aliases: ["باراسيتامول", "paracetamol", "acetaminophen", "panadol", "الألم والحرارة", "العناية بالأطفال"], categoryAr: "مسكن وخافض للحرارة", categoryEn: "Pain reliever & fever reducer" },
  { id: "brufen-400", ar: "بروفين 400 مجم", en: "Brufen 400 mg", aliases: ["إيبوبروفين", "ibuprofen", "brufen", "الألم والحرارة"], categoryAr: "مسكن ومضاد للالتهاب", categoryEn: "Pain reliever & anti-inflammatory" },
  { id: "cetal-500", ar: "سيتال 500 مجم", en: "Cetal 500 mg", aliases: ["باراسيتامول", "paracetamol", "cetal"], categoryAr: "مسكن وخافض للحرارة", categoryEn: "Pain reliever & fever reducer" },
  { id: "gaviscon-double-action", ar: "جافيسكون دبل أكشن", en: "Gaviscon Double Action", aliases: ["حموضة", "ارتجاع", "reflux", "gaviscon", "الجهاز الهضمي"], categoryAr: "للحموضة والارتجاع", categoryEn: "For heartburn & reflux" },
  { id: "glucophage-xr-500", ar: "جلوكوفاج XR 500 مجم", en: "Glucophage XR 500 mg", aliases: ["ميتفورمين", "metformin", "glucophage", "السكري"], categoryAr: "دواء للسكري", categoryEn: "Diabetes medicine" },
  { id: "concor-5", ar: "كونكور 5 مجم", en: "Concor 5 mg", aliases: ["بيسوبرولول", "bisoprolol", "concor", "ضغط", "القلب"], categoryAr: "دعم القلب والضغط", categoryEn: "Heart & blood pressure support" },
  { id: "ventolin-inhaler", ar: "فنتولين بخاخ", en: "Ventolin Inhaler", aliases: ["سالبوتامول", "salbutamol", "ventolin", "ربو"], categoryAr: "موسّع للشعب الهوائية", categoryEn: "Bronchodilator" },
  { id: "aerius-5", ar: "أيريوس 5 مجم", en: "Aerius 5 mg", aliases: ["ديسلوراتادين", "desloratadine", "aerius", "حساسية", "البرد والحساسية"], categoryAr: "للحساسية", categoryEn: "For allergies" },
  { id: "bepanthen-ointment", ar: "بيبانثين مرهم", en: "Bepanthen Ointment", aliases: ["ديكسبانثينول", "dexpanthenol", "bepanthen", "جلد"], categoryAr: "العناية بالجلد", categoryEn: "Skin care" },
];

function normalizeEnglish(value: string) {
  return value.toLocaleLowerCase("en").normalize("NFKD").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function rowToMedicine(row: typeof medicineCatalog.$inferSelect): CatalogMedicine {
  return { id: row.id, ar: row.nameAr, en: row.nameEn, aliases: row.aliases.split("|").filter(Boolean), categoryAr: row.categoryAr, categoryEn: row.categoryEn, active: row.active };
}

function englishTerms(medicine: CatalogMedicine) {
  return [medicine.en, ...medicine.aliases].map(normalizeEnglish).filter((term) => /[a-z]/.test(term) && term.length >= 3);
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const above = previous[column];
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      previous[column] = Math.min(previous[column] + 1, previous[column - 1] + 1, diagonal + cost);
      diagonal = above;
    }
  }
  return previous[right.length];
}

function scoreMedicine(medicine: CatalogMedicine, query: string) {
  const needle = normalizeEnglish(query);
  if (!needle) return 0;
  const terms = englishTerms(medicine);
  const exact = terms.some((term) => needle === term);
  const included = terms.filter((term) => needle.includes(term) || term.includes(needle));
  if (exact) return 0.98;
  if (included.length > 0) return Math.min(0.94, 0.76 + included.length * 0.04);
  const queryTokens = needle.split(" ").filter((token) => token.length >= 3);
  const bestFuzzy = terms.reduce((best, term) => {
    const termTokens = term.split(" ").filter((token) => token.length >= 3);
    if (!termTokens.length || !queryTokens.length) return best;
    const tokenScore = termTokens.reduce((total, token) => {
      const closest = Math.max(...queryTokens.map((queryToken) => {
        const longest = Math.max(token.length, queryToken.length);
        return longest ? 1 - editDistance(token, queryToken) / longest : 0;
      }));
      return total + closest;
    }, 0) / termTokens.length;
    return Math.max(best, tokenScore);
  }, 0);
  if (bestFuzzy >= 0.72) return Math.min(0.86, 0.58 + bestFuzzy * 0.32);
  return 0;
}

function findMatches(catalog: CatalogMedicine[], query: string): MedicineMatch[] {
  if (!query) return catalog.slice(0, 12).map((medicine) => ({ ...medicine, confidence: 0, availability: "available" as const }));
  return catalog
    .map((medicine) => ({ medicine, confidence: scoreMedicine(medicine, query) }))
    .filter((item) => item.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 12)
    .map(({ medicine, confidence }) => ({ ...medicine, confidence, availability: "available" as const }));
}

const prescriptionNoise = new Set(["tablet", "tablets", "capsule", "capsules", "syrup", "cream", "ointment", "inhaler", "solution", "mg", "ml", "take", "daily", "twice", "once", "after", "before", "morning", "evening", "night", "days", "day", "use", "prescription", "patient", "name", "doctor", "dose", "for", "the", "and", "with"]);

function extractEnglishLines(query: string) {
  return query
    .split(/[\r\n|;,]+/)
    .map((line) => normalizeEnglish(line))
    .filter((line) => line.length >= 3 && /[a-z]/.test(line) && line.split(" ").some((token) => token.length >= 4 && !prescriptionNoise.has(token)))
    .slice(0, 30);
}

function identifyPrescriptionMedicines(catalog: CatalogMedicine[], query: string) {
  const lines = extractEnglishLines(query);
  if (!lines.length) return { checks: [] as MedicineCheck[], ignoredCount: 0 };
  const checks: MedicineCheck[] = [];
  let ignoredCount = 0;
  for (const extractedName of lines) {
    const match = findMatches(catalog, extractedName)[0];
    if (match && match.confidence >= 0.58) {
      if (!checks.some((check) => check.matchedId === match.id)) {
        checks.push({ extractedName, availability: "available", confidence: match.confidence, matchedId: match.id, matchedName: match.en });
      }
    } else {
      ignoredCount += 1;
    }
  }
  return { checks, ignoredCount };
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().slice(0, 3000) || "";
  try {
    const db = getDb();
    const rows = await db.select().from(medicineCatalog).where(eq(medicineCatalog.active, true)).orderBy(desc(medicineCatalog.nameEn));
    const catalog = rows.map(rowToMedicine);
    const prescription = identifyPrescriptionMedicines(catalog, query);
    return Response.json({ source: "database", language: "en", query, medicines: findMatches(catalog, query), checks: prescription.checks, ignoredCount: prescription.ignoredCount });
  } catch {
    const prescription = identifyPrescriptionMedicines(fallbackCatalog, query);
    return Response.json({ source: "fallback-catalog", language: "en", query, medicines: findMatches(fallbackCatalog, query), checks: prescription.checks, ignoredCount: prescription.ignoredCount });
  }
}
