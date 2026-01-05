import { Link } from "wouter";
import { Menu, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
            GAMES<span className="text-white">TV</span>
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground hover:bg-white/10 rounded-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Games", href: "/games" },
              { label: "Streams", href: "/streams" },
              { label: "News", href: "/news" },
              { label: "Community", href: "/community" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className="px-4 py-3 text-lg font-medium hover:bg-white/5 rounded-xl text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-4">
            {user ? (
              <div className="flex items-center justify-between px-4">
                <span className="font-medium text-white">Signed in as {user.username}</span>
                <button
                  onClick={() => logout()}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <a
                href="/api/login"
                className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-bold text-white shadow-lg shadow-primary/25"
              >
                Login Now
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
