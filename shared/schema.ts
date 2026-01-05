import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export auth models so they are included in the schema
export * from "./models/auth";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  rating: text("rating").notNull(), // e.g. "4.5"
  releaseDate: timestamp("release_date").defaultNow(),
});

export const streams = pgTable("streams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  streamer: text("streamer").notNull(),
  viewers: integer("viewers").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  gameId: integer("game_id").references(() => games.id),
  isLive: boolean("is_live").default(true),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  author: text("author").notNull(),
});

// Schemas
export const insertGameSchema = createInsertSchema(games).omit({ id: true });
export const insertStreamSchema = createInsertSchema(streams).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true });

// Types
export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type Stream = typeof streams.$inferSelect;
export type InsertStream = z.infer<typeof insertStreamSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
