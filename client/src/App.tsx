import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import GamesCatalog from "@/pages/GamesCatalog";
import StreamsPage from "@/pages/StreamsPage";
import GameDetail from "@/pages/GameDetail";
import NewsList from "@/pages/NewsList";
import NewsDetail from "@/pages/NewsDetail";
import Community from "@/pages/Community";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/games" component={GamesCatalog} />
      <Route path="/games/:id" component={GameDetail} />
      <Route path="/streams" component={StreamsPage} />
      <Route path="/news" component={NewsList} />
      <Route path="/news/:id" component={NewsDetail} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background font-sans text-foreground">
          <Sidebar />
          
          <div className="lg:pl-64 flex flex-col min-h-screen">
            <MobileHeader />
            
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
              <Router />
            </main>
          </div>
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
