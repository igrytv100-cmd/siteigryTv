import { Link, useLocation } from "wouter";
import { Gamepad2, Tv, Newspaper, Users, Home, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Gamepad2, label: "Games", href: "/games" },
  { icon: Tv, label: "Streams", href: "/streams" },
  { icon: Newspaper, label: "News", href: "/news" },
  { icon: Users, label: "Community", href: "/community" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/50 backdrop-blur-xl hidden lg:flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
          GAMES<span className="text-white">TV</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform")} />
                <span className="font-medium tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/20">
        {user ? (
          <div className="flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary p-0.5">
                <img
                  src={user.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={user.username}
                  className="w-full h-full rounded-full bg-background object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-white">{user.firstName || user.username}</p>
                <p className="text-xs text-muted-foreground truncate">Online</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="text-muted-foreground hover:text-destructive transition-colors p-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <a
            href="/api/login"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 hover:scale-[1.02] transition-all"
          >
            Login / Register
          </a>
        )}
      </div>
    </aside>
  );
}
