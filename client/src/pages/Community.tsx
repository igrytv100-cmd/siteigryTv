import { Users, MessageSquare, Trophy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Community() {
  return (
    <div className="space-y-12 pb-20">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Community Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join 2.5M+ gamers. Discuss strategies, share clips, and climb the leaderboards.
        </p>
        <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/25 mt-6">
          Join the Discord
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: MessageSquare, title: "Forums", desc: "Discussion boards for every game genre." },
          { icon: Trophy, title: "Tournaments", desc: "Weekly competitions with cash prizes." },
          { icon: Shield, title: "Clans", desc: "Find a team or recruit new members." }
        ].map((item, i) => (
           <div key={i} className="bg-card border border-white/5 rounded-2xl p-8 text-center hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
           </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-secondary to-background rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <h2 className="text-3xl font-bold mb-2">Looking for a squad?</h2>
               <p className="text-muted-foreground">Use our matchmaking tool to find players with similar skill levels.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" />
                    </div>
                  ))}
               </div>
               <Button variant="outline" className="h-12 rounded-xl border-white/10 hover:bg-white/5">
                  Find Teammates
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
