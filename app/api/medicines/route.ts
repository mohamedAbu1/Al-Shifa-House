import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { medicineCatalog } from "@/db/schema";

export const dynamic = "force-dynamic";

type CatalogMedicine = { id: string; ar: string; en: string; aliases: string[]; categoryAr: string; categoryEn: string; active?: boolean };

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

function normalize(value: string) {
  return value.toLocaleLowerCase("ar").normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").trim();
}

function rowToMedicine(row: typeof medicineCatalog.$inferSelect): CatalogMedicine {
  return { id: row.id, ar: row.nameAr, en: row.nameEn, aliases: row.aliases.split("|").filter(Boolean), categoryAr: row.categoryAr, categoryEn: row.categoryEn, active: row.active };
}

function scoreMedicine(medicine: CatalogMedicine, query: string) {
  const needle = normalize(query);
  if (!needle) return 0;
  const terms = [medicine.ar, medicine.en, ...medicine.aliases].map(normalize).filter((term) => term.length >= 3);
  const exact = terms.some((term) => needle === term);
  const included = terms.filter((term) => needle.includes(term) || term.includes(needle));
  if (exact) return 0.98;
  if (included.length > 0) return Math.min(0.94, 0.76 + included.length * 0.04);
  return 0;
}

function findMatches(catalog: CatalogMedicine[], query: string) {
  if (!query) return catalog.slice(0, 12).map((medicine) => ({ ...medicine, confidence: 0 }));
  return catalog
    .map((medicine) => ({ medicine, confidence: scoreMedicine(medicine, query) }))
    .filter((item) => item.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 12)
    .map(({ medicine, confidence }) => ({ ...medicine, confidence }));
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().slice(0, 3000) || "";
  try {
    const db = getDb();
    const rows = await db.select().from(medicineCatalog).where(eq(medicineCatalog.active, true)).orderBy(desc(medicineCatalog.nameEn));
    return Response.json({ source: "database", query, medicines: findMatches(rows.map(rowToMedicine), query) });
  } catch {
    return Response.json({ source: "fallback-catalog", query, medicines: findMatches(fallbackCatalog, query) });
  }
}