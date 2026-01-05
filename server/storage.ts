import { db } from "./db";
import { games, streams, articles, type Game, type InsertGame, type Stream, type InsertStream, type Article, type InsertArticle } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  
  getStreams(): Promise<Stream[]>;
  createStream(stream: InsertStream): Promise<Stream>;
  
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
}

export class DatabaseStorage implements IStorage {
  async getGames(): Promise<Game[]> {
    return await db.select().from(games);
  }

  async getGame(id: number): Promise<Game | undefined> {
    const [game] = await db.select().from(games).where(eq(games.id, id));
    return game;
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const [game] = await db.insert(games).values(insertGame).returning();
    return game;
  }

  async getStreams(): Promise<Stream[]> {
    return await db.select().from(streams);
  }

  async createStream(insertStream: InsertStream): Promise<Stream> {
    const [stream] = await db.insert(streams).values(insertStream).returning();
    return stream;
  }

  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }
}

export const storage = new DatabaseStorage();
