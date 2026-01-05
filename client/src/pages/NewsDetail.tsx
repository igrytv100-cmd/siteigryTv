import { useArticle } from "@/hooks/use-articles";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: article, isLoading } = useArticle(id);

  if (isLoading) return <div className="text-center py-20 animate-pulse">Loading Article...</div>;
  if (!article) return <div className="text-center py-20">Article not found</div>;

  return (
    <article className="max-w-4xl mx-auto pb-20">
      <Link href="/news">
        <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 cursor-pointer transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </div>
      </Link>

      <header className="space-y-6 mb-12 text-center">
        <div className="flex justify-center gap-2">
           <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider border border-accent/20">
              Breaking News
           </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground border-t border-b border-white/5 py-4 max-w-lg mx-auto">
           <span>By <strong className="text-white">{article.author}</strong></span>
           <span>•</span>
           <span>{article.publishedAt ? format(new Date(article.publishedAt), "MMMM d, yyyy") : "Just Now"}</span>
        </div>
      </header>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none mx-auto prose-headings:font-display prose-headings:uppercase prose-p:text-muted-foreground prose-a:text-primary">
         {/* In a real app, this would be sanitized HTML */}
         <p className="lead text-xl text-white font-medium border-l-4 border-primary pl-6 py-2 bg-white/5 rounded-r-lg">
            {article.summary}
         </p>
         <div className="whitespace-pre-line mt-8">
            {article.content}
         </div>
      </div>
    </article>
  );
}
