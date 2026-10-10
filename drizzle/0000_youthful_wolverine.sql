CREATE TABLE `patient_profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`full_name` text NOT NULL,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`phone` text NOT NULL,
	`whatsapp` integer DEFAULT false NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`emergency_phone` text DEFAULT '' NOT NULL,
	`height` integer,
	`weight` integer,
	`chronic_disease` text DEFAULT 'no' NOT NULL,
	`chronic_conditions` text DEFAULT '' NOT NULL,
	`allergies` text DEFAULT '' NOT NULL,
	`allergy_details` text DEFAULT '' NOT NULL,
	`medications` text DEFAULT '' NOT NULL,
	`medication_details` text DEFAULT '' NOT NULL,
	`symptoms` text NOT NULL,
	`symptom_details` text DEFAULT '' NOT NULL,
	`pregnancy_status` text DEFAULT '' NOT NULL,
	`consent` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `patient_profiles_user_id_unique` ON `patient_profiles` (`user_id`);