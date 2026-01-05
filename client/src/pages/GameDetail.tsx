import { useGame } from "@/hooks/use-games";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Share2, Heart, Play, Download } from "lucide-react";
import { format } from "date-fns";

export default function GameDetail() {
  const [, params] = useRoute("/games/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: game, isLoading } = useGame(id);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center text-primary animate-pulse">Loading Game Data...</div>;
  }

  if (!game) {
    return <div className="h-screen flex items-center justify-center text-muted-foreground">Game not found</div>;
  }

  return (
    <div className="-mt-8 -mx-8"> {/* Negative margin to break out of container padding for hero */}
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={game.coverUrl} 
          alt={game.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
             <div className="hidden md:block w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-card">
                <img src={game.coverUrl} alt="Cover" className="w-full h-full object-cover" />
             </div>
             
             <div className="flex-1 space-y-4 mb-4">
               <div className="flex gap-2">
                 <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white">Action</span>
                 <span className="bg-secondary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white">RPG</span>
               </div>
               
               <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                 {game.title}
               </h1>

               <div className="flex items-center gap-6 text-sm md:text-base">
                 <div className="flex items-center gap-2 text-accent">
                   <Star className="fill-current w-5 h-5" />
                   <span className="font-bold text-lg">{game.rating}</span>
                   <span className="text-muted-foreground">/ 5.0</span>
                 </div>
                 <div className="text-muted-foreground">
                   Released: <span className="text-white font-medium">{game.releaseDate ? format(new Date(game.releaseDate), "MMMM d, yyyy") : "TBA"}</span>
                 </div>
               </div>
             </div>

             <div className="flex gap-3 mb-4 w-full md:w-auto">
                <Button className="flex-1 md:flex-none rounded-xl bg-primary hover:bg-primary/90 text-lg py-6 px-8 shadow-lg shadow-primary/25">
                   <Download className="mr-2 w-5 h-5" /> Install
                </Button>
                <Button variant="outline" className="rounded-xl border-white/20 hover:bg-white/10 p-3 aspect-square">
                   <Heart className="w-6 h-6" />
                </Button>
                <Button variant="outline" className="rounded-xl border-white/20 hover:bg-white/10 p-3 aspect-square">
                   <Share2 className="w-6 h-6" />
                </Button>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <section>
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-accent rounded-full" />
                About The Game
             </h2>
             <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
               <p>{game.description}</p>
               <p>Experience the next generation of gaming with stunning visuals, immersive gameplay, and a story that will keep you on the edge of your seat. {game.title} redefines what is possible in the genre.</p>
             </div>
           </section>

           <section>
             <h2 className="text-2xl font-bold mb-4">Media</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-white/5 rounded-xl flex items-center justify-center group cursor-pointer border border-white/5 hover:border-primary/50 transition-colors">
                   <Play className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div className="aspect-video bg-white/5 rounded-xl border border-white/5" />
             </div>
           </section>
        </div>

        <div className="space-y-6">
           <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4 text-white">Game Info</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-muted-foreground">Developer</dt>
                  <dd className="font-medium text-white">Ubisoft Montreal</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-muted-foreground">Publisher</dt>
                  <dd className="font-medium text-white">Ubisoft</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-muted-foreground">Platforms</dt>
                  <dd className="font-medium text-white">PC, PS5, Xbox</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-muted-foreground">Size</dt>
                  <dd className="font-medium text-white">85 GB</dd>
                </div>
              </dl>
           </div>
        </div>
      </div>
    </div>
  );
}
