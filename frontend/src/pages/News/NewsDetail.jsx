import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../../services/api";



function NewsDetail() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/news/${slug}/`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("News article not found.");
          }

          throw new Error("Failed to load news article.");
        }

        const data = await response.json();

        setArticle(data);
      } catch (err) {
        console.error("News detail API error:", err);
        setError(err.message || "Unable to load this article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (date) => {
    if (!date) {
      return "Recent Update";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-sm font-medium text-slate-500">
            Loading article...
          </p>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="min-h-[60vh] bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <Newspaper
            size={48}
            className="mx-auto text-slate-400"
          />

          <h1 className="mt-6 text-3xl font-bold text-slate-950">
            Article not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "The requested news article could not be found."}
          </p>

          <Link
            to="/news"
            className="mt-8 inline-flex items-center gap-2 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* HERO */}
      <section className="bg-slate-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-bold uppercase tracking-widest text-slate-300">
              {article.category}
            </span>

            <span className="text-slate-600">•</span>

            <span className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={16} />
              {formatDate(article.published_at)}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {article.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {/* Image */}
          {article.image ? (
            <div className="mb-12 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="h-auto max-h-[550px] w-full object-cover"
              />
            </div>
          ) : (
            <div className="mb-12 flex h-72 items-center justify-center bg-slate-100">
              <Newspaper
                size={50}
                className="text-slate-400"
              />
            </div>
          )}

          {/* Content */}
          <div className="max-w-3xl">
            <p className="text-lg font-medium leading-8 text-slate-700">
              {article.excerpt}
            </p>

            {article.content && (
              <div className="mt-10 whitespace-pre-line text-base leading-8 text-slate-600">
                {article.content}
              </div>
            )}
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 border-t border-slate-200 pt-8">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to all news
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;