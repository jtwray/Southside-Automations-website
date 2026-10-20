CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`business` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`workflow` text NOT NULL,
	`software` text,
	`status` text DEFAULT 'new' NOT NULL
);
