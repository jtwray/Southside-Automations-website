import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  name: text("name").notNull(),
  business: text("business").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  workflow: text("workflow").notNull(),
  software: text("software"),
  status: text("status").notNull().default("new"),
});
