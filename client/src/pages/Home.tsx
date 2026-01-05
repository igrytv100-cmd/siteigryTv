import { useGames } from "@/hooks/use-games";
import { useStreams } from "@/hooks/use-streams";
import { useArticles } from "@/hooks/use-articles";
import { GameCard } from "@/components/game/GameCard";
import { StreamCard } from "@/components/stream/StreamCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Flame } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: games, isLoading: gamesLoading } = useGames();
  const { data: streams, isLoading: streamsLoading } = useStreams();
  const { data: articles, isLoading: articlesLoading } = useArticles();

  if (gamesLoading || streamsLoading || articlesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Hero Article (Use first article as hero)
  const heroArticle = articles?.[0];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      {heroArticle && (
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src={heroArticle.imageUrl} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          </div>

          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-4xl">
            <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-sm font-bold text-accent backdrop-blur-md">
                <Flame className="w-4 h-4 fill-current" />
                Featured Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tight">
                {heroArticle.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 line-clamp-2 max-w-2xl font-light">
                {heroArticle.summary}
              </p>
              <div className="flex gap-4 pt-4">
                <Link href={`/news/${heroArticle.id}`}>
                  <Button size="lg" className="rounded-xl px-8 text-lg font-bold bg-white text-black hover:bg-white/90">
                    Read Article
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-xl px-8 text-lg font-bold border-white/20 hover:bg-white/10">
                  More News
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Games Row */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Trending Games
          </h2>
          <Link href="/games">
            <Button variant="ghost" className="text-muted-foreground hover:text-white">
              View All <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {games?.slice(0, 5).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Live Streams Row */}
      <section className="bg-white/5 -mx-4 md:-mx-8 px-4 md:px-8 py-12 border-y border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Now
          </h2>
          <Link href="/streams">
            <Button variant="ghost" className="text-muted-foreground hover:text-white">
              Browse Streams <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {streams?.slice(0, 4).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Latest News Grid */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-accent rounded-full" />
            Latest News
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.slice(1, 4).map((article) => (
            <Link key={article.id} href={`/news/${article.id}`}>
               <div className="group cursor-pointer flex flex-col gap-4 rounded-2xl bg-card border border-white/5 p-4 hover:bg-white/5 transition-colors">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white">
                      NEWS
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="text-xs text-primary font-bold uppercase tracking-wider pt-2">
                      Read More &rarr;
                    </div>
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
