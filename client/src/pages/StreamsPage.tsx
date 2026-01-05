import { useStreams } from "@/hooks/use-streams";
import { StreamCard } from "@/components/stream/StreamCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function StreamsPage() {
  const { data: streams, isLoading } = useStreams();

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            Live Channels
          </h1>
          <p className="text-muted-foreground mt-2">
            Watch top players dominate the leaderboard right now.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10">
          <div className="px-4 py-2 bg-primary rounded-lg text-sm font-bold text-white shadow-lg">Top Viewers</div>
          <div className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white cursor-pointer transition-colors">Recommended</div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-video bg-white/5 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {streams?.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      )}
    </div>
  );
}
