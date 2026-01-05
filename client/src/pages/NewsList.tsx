import { useArticles } from "@/hooks/use-articles";
import { Link } from "wouter";
import { format } from "date-fns";

export default function NewsList() {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) return <div className="text-center py-20 animate-pulse text-primary">Loading News...</div>;

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="text-center py-8">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">The Daily Feed</span>
        <h1 className="text-5xl md:text-6xl font-black mt-2 uppercase tracking-tight">Gaming News</h1>
      </div>

      <div className="grid gap-12">
        {articles?.map((article, index) => (
          <article key={article.id} className="group relative grid md:grid-cols-2 gap-8 items-center border-b border-white/5 pb-12 last:border-0">
            {/* Image */}
            <Link href={`/news/${article.id}`}>
              <div className={`cursor-pointer overflow-hidden rounded-2xl border border-white/10 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[16/10] bg-muted relative">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1 text-right md:text-left' : ''}`}>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                 <span className="text-accent">News</span>
                 <span>•</span>
                 <span>{article.publishedAt ? format(new Date(article.publishedAt), "MMMM d, yyyy") : "Just Now"}</span>
              </div>
              
              <Link href={`/news/${article.id}`}>
                <h2 className="text-3xl font-bold cursor-pointer group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h2>
              </Link>
              
              <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                {article.summary}
              </p>

              <div className="pt-2">
                 <Link href={`/news/${article.id}`}>
                    <span className="inline-block border-b-2 border-primary/50 text-white font-bold hover:border-primary hover:text-primary transition-all cursor-pointer">
                      Read Full Story
                    </span>
                 </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
