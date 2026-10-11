import { getChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getChatGPTUser();
  return Response.json({
    authenticated: Boolean(user),
    displayName: user?.displayName ?? null,
    email: user?.email ?? null,
  });
}
