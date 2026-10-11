CREATE TABLE `medicine_catalog` (
	`id` text PRIMARY KEY NOT NULL,
	`name_ar` text NOT NULL,
	`name_en` text NOT NULL,
	`aliases` text DEFAULT '' NOT NULL,
	`category_ar` text DEFAULT '' NOT NULL,
	`category_en` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT true NOT NULL
);

INSERT OR IGNORE INTO `medicine_catalog` (`id`, `name_ar`, `name_en`, `aliases`, `category_ar`, `category_en`, `active`) VALUES
('panadol-500', 'بانادول 500 مجم', 'Panadol 500 mg', 'باراسيتامول|paracetamol|acetaminophen|panadol|الألم والحرارة|العناية بالأطفال', 'مسكن وخافض للحرارة', 'Pain reliever & fever reducer', 1),
('brufen-400', 'بروفين 400 مجم', 'Brufen 400 mg', 'إيبوبروفين|ibuprofen|brufen|الألم والحرارة', 'مسكن ومضاد للالتهاب', 'Pain reliever & anti-inflammatory', 1),
('cetal-500', 'سيتال 500 مجم', 'Cetal 500 mg', 'باراسيتامول|paracetamol|cetal', 'مسكن وخافض للحرارة', 'Pain reliever & fever reducer', 1),
('gaviscon-double-action', 'جافيسكون دبل أكشن', 'Gaviscon Double Action', 'حموضة|ارتجاع|reflux|gaviscon|الجهاز الهضمي', 'للحموضة والارتجاع', 'For heartburn & reflux', 1),
('glucophage-xr-500', 'جلوكوفاج XR 500 مجم', 'Glucophage XR 500 mg', 'ميتفورمين|metformin|glucophage|السكري', 'دواء للسكري', 'Diabetes medicine', 1),
('concor-5', 'كونكور 5 مجم', 'Concor 5 mg', 'بيسوبرولول|bisoprolol|concor|ضغط|القلب', 'دعم القلب والضغط', 'Heart & blood pressure support', 1),
('ventolin-inhaler', 'فنتولين بخاخ', 'Ventolin Inhaler', 'سالبوتامول|salbutamol|ventolin|ربو', 'موسّع للشعب الهوائية', 'Bronchodilator', 1),
('aerius-5', 'أيريوس 5 مجم', 'Aerius 5 mg', 'ديسلوراتادين|desloratadine|aerius|حساسية|البرد والحساسية', 'للحساسية', 'For allergies', 1),
('bepanthen-ointment', 'بيبانثين مرهم', 'Bepanthen Ointment', 'ديكسبانثينول|dexpanthenol|bepanthen|جلد', 'العناية بالجلد', 'Skin care', 1);