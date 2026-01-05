import { useGames } from "@/hooks/use-games";
import { GameCard } from "@/components/game/GameCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function GamesCatalog() {
  const { data: games, isLoading } = useGames();
  const [search, setSearch] = useState("");

  const filteredGames = games?.filter(game => 
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Game Library
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Explore our massive collection of titles. From indie gems to AAA blockbusters, find your next obsession here.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search games..." 
            className="pl-10 bg-white/5 border-white/10 focus:border-primary focus:ring-primary/20 rounded-xl h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="aspect-[3/4] bg-white/5 rounded-xl" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames?.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No games found matching "{search}"
            </div>
          ) : (
            filteredGames?.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
