import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { patientChatMessages } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";

function textValue(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }
function serialize(message: typeof patientChatMessages.$inferSelect) { return { id: message.id, sender: message.sender, message: message.message, createdAt: message.createdAt }; }

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  try {
    const db = getDb();
    const rows = await db.select().from(patientChatMessages).where(eq(patientChatMessages.userId, user.userId)).orderBy(asc(patientChatMessages.id));
    return Response.json({ messages: rows.map(serialize) });
  } catch { return Response.json({ error: "تعذر تحميل المحادثة الآن." }, { status: 500 }); }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });
  let payload: Record<string, unknown>;
  try { payload = (await request.json()) as Record<string, unknown>; } catch { return Response.json({ error: "Invalid request body." }, { status: 400 }); }
  const message = textValue(payload.message, 3000);
  if (!message) return Response.json({ error: "اكتب سؤالك أولًا." }, { status: 400 });
  try {
    const db = getDb();
    const [saved] = await db.insert(patientChatMessages).values({ userId: user.userId, sender: "patient", message }).returning();
    return Response.json({ message: saved ? serialize(saved) : null });
  } catch { return Response.json({ error: "تعذر إرسال الرسالة الآن." }, { status: 500 }); }
}
