import { desc, eq, and } from "drizzle-orm";
import { getDb } from "@/db";
import { patientSchedules } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";

function textValue(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }
function serialize(schedule: typeof patientSchedules.$inferSelect) { return { id: schedule.id, medicineName: schedule.medicineName, dose: schedule.dose, frequency: schedule.frequency, times: schedule.times.split("|").filter(Boolean), whatsappEnabled: schedule.whatsappEnabled, active: schedule.active, createdAt: schedule.createdAt }; }

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  try {
    const db = getDb();
    const rows = await db.select().from(patientSchedules).where(eq(patientSchedules.userId, user.userId)).orderBy(desc(patientSchedules.id));
    return Response.json({ schedules: rows.map(serialize) });
  } catch { return Response.json({ error: "تعذر تحميل مواعيد الجرعات الآن." }, { status: 500 }); }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  let payload: Record<string, unknown>;
  try { payload = (await request.json()) as Record<string, unknown>; } catch { return Response.json({ error: "Invalid request body." }, { status: 400 }); }
  const medicineName = textValue(payload.medicineName, 120);
  const dose = textValue(payload.dose, 80);
  const frequency = textValue(payload.frequency, 30);
  const rawTimes = Array.isArray(payload.times) ? payload.times : [];
  const times = rawTimes.filter((item): item is string => typeof item === "string" && /^([01]?\d|2[0-3]):[0-5]\d$/.test(item)).slice(0, 8);
  const whatsappEnabled = payload.whatsappEnabled === true;
  if (!medicineName || !frequency || times.length === 0) return Response.json({ error: "أدخل اسم العلاج والتكرار وموعدًا واحدًا على الأقل." }, { status: 400 });
  try {
    const db = getDb();
    const [schedule] = await db.insert(patientSchedules).values({ userId: user.userId, medicineName, dose, frequency, times: times.join("|"), whatsappEnabled }).returning();
    return Response.json({ schedule: schedule ? serialize(schedule) : null });
  } catch { return Response.json({ error: "تعذر حفظ الجدول الآن." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id)) return Response.json({ error: "Invalid schedule." }, { status: 400 });
  try {
    const db = getDb();
    await db.delete(patientSchedules).where(and(eq(patientSchedules.id, id), eq(patientSchedules.userId, user.userId)));
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "تعذر حذف الموعد الآن." }, { status: 500 }); }
}
