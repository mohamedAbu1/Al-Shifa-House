import { desc, eq, and } from "drizzle-orm";
import { getDb } from "@/db";
import { patientAttachments } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";

const categories = new Set(["xray", "ecg", "prescription"]);

function textValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function serialize(attachment: typeof patientAttachments.$inferSelect) {
  return { id: attachment.id, category: attachment.category, fileName: attachment.fileName, mimeType: attachment.mimeType, dataUrl: attachment.dataUrl, createdAt: attachment.createdAt };
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  try {
    const db = getDb();
    const rows = await db.select().from(patientAttachments).where(eq(patientAttachments.userId, user.userId)).orderBy(desc(patientAttachments.id));
    return Response.json({ attachments: rows.map(serialize) });
  } catch { return Response.json({ error: "تعذر تحميل المرفقات الآن." }, { status: 500 }); }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  let payload: Record<string, unknown>;
  try { payload = (await request.json()) as Record<string, unknown>; } catch { return Response.json({ error: "Invalid request body." }, { status: 400 }); }
  const category = textValue(payload.category, 20);
  const fileName = textValue(payload.fileName, 180);
  const mimeType = textValue(payload.mimeType, 80);
  const dataUrl = textValue(payload.dataUrl, 450000);
  if (!categories.has(category) || !fileName || !mimeType.startsWith("image/") || !dataUrl.startsWith("data:image/")) return Response.json({ error: "يرجى اختيار صورة صحيحة من النوع المطلوب." }, { status: 400 });
  if (dataUrl.length > 440000) return Response.json({ error: "حجم الصورة كبير جدًا. اختر صورة أصغر وحاول مرة أخرى." }, { status: 413 });
  try {
    const db = getDb();
    const [attachment] = await db.insert(patientAttachments).values({ userId: user.userId, category, fileName, mimeType, dataUrl }).returning();
    return Response.json({ attachment: attachment ? serialize(attachment) : null });
  } catch { return Response.json({ error: "تعذر حفظ الصورة الآن." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id)) return Response.json({ error: "Invalid attachment." }, { status: 400 });
  try {
    const db = getDb();
    await db.delete(patientAttachments).where(and(eq(patientAttachments.id, id), eq(patientAttachments.userId, user.userId)));
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "تعذر حذف المرفق الآن." }, { status: 500 }); }
}
