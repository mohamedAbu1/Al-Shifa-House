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

export const medicineCatalog = sqliteTable("medicine_catalog", {
  id: text("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  aliases: text("aliases").notNull().default(""),
  categoryAr: text("category_ar").notNull().default(""),
  categoryEn: text("category_en").notNull().default(""),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});

export const patientAttachments = sqliteTable("patient_attachments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  category: text("category").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  dataUrl: text("data_url").notNull(),
  createdAt: text("created_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
});

export const patientSchedules = sqliteTable("patient_schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  medicineName: text("medicine_name").notNull(),
  dose: text("dose").notNull().default(""),
  frequency: text("frequency").notNull(),
  times: text("times").notNull(),
  whatsappEnabled: integer("whatsapp_enabled", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
  updatedAt: text("updated_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
});

export const patientChatMessages = sqliteTable("patient_chat_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  sender: text("sender").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
});
