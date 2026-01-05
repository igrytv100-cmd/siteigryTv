import { Users, PlayCircle } from "lucide-react";
import { type Stream } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface StreamCardProps {
  stream: Stream;
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <div className="group cursor-pointer rounded-xl bg-card border border-white/5 overflow-hidden hover:border-accent/50 transition-all duration-300">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={stream.thumbnailUrl}
          alt={stream.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <PlayCircle className="w-12 h-12 text-white drop-shadow-lg scale-90 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div className="absolute top-2 left-2">
          <Badge variant="destructive" className="animate-pulse bg-red-600 font-bold uppercase tracking-wider text-[10px] px-1.5">
            Live
          </Badge>
        </div>

        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-md flex items-center gap-1.5">
          <Users className="w-3 h-3" />
          <span className="font-mono font-bold">{stream.viewers.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 flex-shrink-0">
             <img 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.streamer}`}
               alt={stream.streamer}
               className="w-full h-full rounded-full bg-background object-cover"
             />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-white text-sm truncate group-hover:text-accent transition-colors">
              {stream.title}
            </h4>
            <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
              {stream.streamer}
            </p>
            <p className="text-[10px] text-primary mt-1 font-semibold uppercase tracking-wide">
              Playing Overwatch 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
