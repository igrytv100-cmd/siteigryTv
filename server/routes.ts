import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // App Routes
  app.get(api.games.list.path, async (req, res) => {
    const games = await storage.getGames();
    res.json(games);
  });

  app.get(api.games.get.path, async (req, res) => {
    const game = await storage.getGame(Number(req.params.id));
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  });

  app.get(api.streams.list.path, async (req, res) => {
    const streams = await storage.getStreams();
    res.json(streams);
  });

  app.get(api.articles.list.path, async (req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get(api.articles.get.path, async (req, res) => {
    const article = await storage.getArticle(Number(req.params.id));
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  });

  // Seed Data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingGames = await storage.getGames();
  if (existingGames.length === 0) {
    const game1 = await storage.createGame({
      title: "Cyber Odyssey 2077",
      description: "An open-world RPG set in a dystopian future.",
      coverUrl: "https://placehold.co/600x400/purple/white?text=Cyber+Odyssey",
      rating: "4.8",
      releaseDate: new Date(),
    });
    const game2 = await storage.createGame({
      title: "Space Marines: Tactics",
      description: "Strategic turn-based combat in deep space.",
      coverUrl: "https://placehold.co/600x400/blue/white?text=Space+Marines",
      rating: "4.5",
      releaseDate: new Date(),
    });
    
    await storage.createStream({
      title: "Cyber Odyssey Speedrun",
      streamer: "NeonGamer",
      viewers: 12500,
      thumbnailUrl: "https://placehold.co/600x400/1a1a1a/white?text=Live+Stream",
      gameId: game1.id,
      isLive: true,
    });
    
    await storage.createArticle({
      title: "Top 10 RPGs of 2024",
      summary: "We rank the best role-playing games released this year.",
      content: "Full content of the article goes here...",
      imageUrl: "https://placehold.co/600x400/2a2a2a/white?text=News+Article",
      publishedAt: new Date(),
      author: "Editor in Chief",
    });
  }
}
