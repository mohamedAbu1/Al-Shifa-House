import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const patientProfiles = sqliteTable(
  "patient_profiles",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull(),
    email: text("email").notNull(),
    fullName: text("full_name").notNull(),
    age: integer("age").notNull(),
    gender: text("gender").notNull(),
    phone: text("phone").notNull(),
    whatsapp: integer("whatsapp", { mode: "boolean" }).notNull().default(false),
    city: text("city").notNull().default(""),
    emergencyPhone: text("emergency_phone").notNull().default(""),
    height: integer("height"),
    weight: integer("weight"),
    chronicDisease: text("chronic_disease").notNull().default("no"),
    chronicConditions: text("chronic_conditions").notNull().default(""),
    allergies: text("allergies").notNull().default(""),
    allergyDetails: text("allergy_details").notNull().default(""),
    medications: text("medications").notNull().default(""),
    medicationDetails: text("medication_details").notNull().default(""),
    symptoms: text("symptoms").notNull(),
    symptomDetails: text("symptom_details").notNull().default(""),
    pregnancyStatus: text("pregnancy_status").notNull().default(""),
    consent: integer("consent", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
    updatedAt: text("updated_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
  },
  (table) => ({
    userIdUnique: uniqueIndex("patient_profiles_user_id_unique").on(table.userId),
  }),
);