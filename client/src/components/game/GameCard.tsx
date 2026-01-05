import { Link } from "wouter";
import { Star, Calendar } from "lucide-react";
import { type Game } from "@shared/schema";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  variant?: "portrait" | "landscape";
  className?: string;
}

export function GameCard({ game, variant = "portrait", className }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <div 
        className={cn(
          "group relative overflow-hidden rounded-xl bg-card border border-white/5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50",
          variant === "landscape" ? "flex gap-4" : "flex flex-col",
          className
        )}
      >
        {/* Image Container */}
        <div className={cn(
          "relative overflow-hidden bg-muted",
          variant === "portrait" ? "aspect-[3/4] w-full" : "w-1/3 aspect-video"
        )}>
          <img
            src={game.coverUrl}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
             <span className="bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">
                RPG
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
              {game.title}
            </h3>
            <div className="flex items-center gap-1 text-accent text-sm font-bold bg-accent/10 px-1.5 rounded">
              <Star className="w-3 h-3 fill-current" />
              <span>{game.rating}</span>
            </div>
          </div>
          
          {variant === "portrait" && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {game.description}
            </p>
          )}

          <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-muted-foreground border-t border-white/5">
            <Calendar className="w-3 h-3" />
            <span>{game.releaseDate ? format(new Date(game.releaseDate), "MMM yyyy") : "TBA"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
