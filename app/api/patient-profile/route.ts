import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { patientProfiles } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";

type PatientPayload = {
  fullName?: unknown;
  age?: unknown;
  gender?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  city?: unknown;
  emergencyPhone?: unknown;
  height?: unknown;
  weight?: unknown;
  chronicDisease?: unknown;
  chronicConditions?: unknown;
  allergies?: unknown;
  allergyDetails?: unknown;
  medications?: unknown;
  medicationDetails?: unknown;
  symptoms?: unknown;
  symptomDetails?: unknown;
  pregnancyStatus?: unknown;
  consent?: unknown;
};

function stringValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function pipeList(value: unknown): string {
  if (!Array.isArray(value)) return stringValue(value, 500);
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 30)
    .join("|");
}

function optionalInteger(value: unknown): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function toClientProfile(profile: typeof patientProfiles.$inferSelect) {
  return {
    fullName: profile.fullName,
    age: String(profile.age),
    gender: profile.gender,
    email: profile.email,
    phone: profile.phone,
    whatsapp: profile.whatsapp,
    city: profile.city,
    emergencyPhone: profile.emergencyPhone,
    height: profile.height === null ? "" : String(profile.height),
    weight: profile.weight === null ? "" : String(profile.weight),
    chronicDisease: profile.chronicDisease,
    chronicConditions: profile.chronicConditions.split("|").filter(Boolean),
    allergies: profile.allergies,
    allergyDetails: profile.allergyDetails,
    medications: profile.medications,
    medicationDetails: profile.medicationDetails,
    symptoms: profile.symptoms,
    symptomDetails: profile.symptomDetails,
    pregnancyStatus: profile.pregnancyStatus,
    consent: profile.consent,
  };
}

function routeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("no such table") || message.includes("patient_profiles")) {
    return "The patient profile database is not ready yet. Deploy the latest database migration.";
  }
  return "The patient profile could not be saved right now.";
}

async function requireUser() {
  const user = await getChatGPTUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  const user = await requireUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });

  try {
    const db = getDb();
    const [profile] = await db
      .select()
      .from(patientProfiles)
      .where(eq(patientProfiles.userId, user.userId))
      .limit(1);

    return Response.json({
      authenticated: true,
      email: user.email,
      profile: profile ? toClientProfile(profile) : null,
    });
  } catch (error) {
    return Response.json({ error: routeError(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await requireUser();
  if (!user) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401 });

  let payload: PatientPayload;
  try {
    payload = (await request.json()) as PatientPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = stringValue(payload.fullName, 120);
  const age = optionalInteger(payload.age);
  const gender = stringValue(payload.gender, 24);
  const phone = stringValue(payload.phone, 32);
  const city = stringValue(payload.city, 64);
  const emergencyPhone = stringValue(payload.emergencyPhone, 32);
  const height = optionalInteger(payload.height);
  const weight = optionalInteger(payload.weight);
  const chronicDisease = stringValue(payload.chronicDisease, 8);
  const chronicConditions = pipeList(payload.chronicConditions);
  const allergies = stringValue(payload.allergies, 500);
  const allergyDetails = stringValue(payload.allergyDetails, 1000);
  const medications = stringValue(payload.medications, 500);
  const medicationDetails = stringValue(payload.medicationDetails, 1000);
  const symptoms = stringValue(payload.symptoms, 500);
  const symptomDetails = stringValue(payload.symptomDetails, 1500);
  const pregnancyStatus = stringValue(payload.pregnancyStatus, 16);
  const whatsapp = payload.whatsapp === true;
  const consent = payload.consent === true;

  if (!fullName || age === null || age < 0 || age > 120 || !gender || !phone) {
    return Response.json({ error: "Please complete the required patient fields." }, { status: 400 });
  }
  if (!["male", "female", "private"].includes(gender)) {
    return Response.json({ error: "Please choose a valid gender option." }, { status: 400 });
  }
  if (!["no", "yes"].includes(chronicDisease)) {
    return Response.json({ error: "Please choose the chronic-condition answer." }, { status: 400 });
  }
  if (chronicDisease === "yes" && !chronicConditions) {
    return Response.json({ error: "Please choose at least one chronic condition." }, { status: 400 });
  }
  if (!symptoms && !symptomDetails) {
    return Response.json({ error: "Please choose or describe the reason for help." }, { status: 400 });
  }
  if (!whatsapp || !consent) {
    return Response.json({ error: "Please confirm WhatsApp contact and consent." }, { status: 400 });
  }
  if (height !== null && (height < 0 || height > 260)) {
    return Response.json({ error: "Please enter a valid height." }, { status: 400 });
  }
  if (weight !== null && (weight < 0 || weight > 500)) {
    return Response.json({ error: "Please enter a valid weight." }, { status: 400 });
  }

  const values = {
    userId: user.userId,
    email: user.email,
    fullName,
    age,
    gender,
    phone,
    whatsapp,
    city,
    emergencyPhone,
    height,
    weight,
    chronicDisease,
    chronicConditions,
    allergies,
    allergyDetails,
    medications,
    medicationDetails,
    symptoms,
    symptomDetails,
    pregnancyStatus,
    consent,
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = getDb();
    const [existing] = await db
      .select({ id: patientProfiles.id })
      .from(patientProfiles)
      .where(eq(patientProfiles.userId, user.userId))
      .limit(1);

    const [profile] = existing
      ? await db
          .update(patientProfiles)
          .set(values)
          .where(eq(patientProfiles.id, existing.id))
          .returning()
      : await db.insert(patientProfiles).values(values).returning();

    if (!profile) return Response.json({ error: "The patient profile could not be saved right now." }, { status: 500 });
    return Response.json({ profile: toClientProfile(profile) });
  } catch (error) {
    return Response.json({ error: routeError(error) }, { status: 500 });
  }
}