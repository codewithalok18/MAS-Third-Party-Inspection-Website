import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Newspaper,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import Reveal from "../../components/common/Reveal";

function NewsDetail() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
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

        try {
          const relatedResponse = await fetch(`${API_BASE_URL}/api/news/`);

          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const items = Array.isArray(relatedData)
              ? relatedData
              : relatedData.results || [];

            setRelatedNews(
              items
                .filter((item) => item.slug !== data.slug)
                .slice(0, 3)
            );
          }
        } catch (relatedError) {
          console.error("Related news API error:", relatedError);
        }
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
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <p className="mt-4 text-sm font-medium text-slate-500">
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
          <Newspaper size={48} className="mx-auto text-slate-400" />

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
    <div className="bg-white">
      {/* HERO */}
      <section className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white md:min-h-[590px]">
        {article.image && (
          <>
            <img
              src={article.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40" />
          </>
        )}

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-6 py-16 md:min-h-[590px] md:px-10 md:py-20 lg:px-16">
          <div className="max-w-5xl">
            <Reveal y={20} duration={0.55}>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to News
              </Link>
            </Reveal>

            <Reveal delay={0.08} y={24} duration={0.6}>
              <div className="mt-9 flex flex-wrap items-center gap-4 text-sm">
                <span className="font-bold uppercase tracking-[0.18em] text-white">
                  {article.category}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-400" />

                <span className="flex items-center gap-2 text-slate-300">
                  <CalendarDays size={16} />
                  {formatDate(article.published_at)}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.14} y={28} duration={0.65}>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
                {article.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2} y={24} duration={0.6}>
              <p className="mt-7 max-w-3xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                {article.excerpt}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <div>
              <Reveal y={25} duration={0.65}>
                {article.image ? (
                  <div className="group overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="max-h-[600px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="flex h-72 items-center justify-center bg-slate-100">
                    <Newspaper size={50} className="text-slate-400" />
                  </div>
                )}
              </Reveal>

              <Reveal delay={0.08} y={25} duration={0.6}>
                <div className="mt-10 max-w-3xl border-l-2 border-slate-950 pl-6 md:pl-8">
                  <p className="text-lg font-medium leading-8 text-slate-700">
                    {article.excerpt}
                  </p>
                </div>
              </Reveal>

              {article.content && (
                <Reveal delay={0.14} y={25} duration={0.6}>
                  <div className="mt-9 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600">
                    {article.content}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.18} y={20}>
                <div className="mt-14 border-t border-slate-200 pt-7">
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:gap-3"
                  >
                    <ArrowLeft size={16} />
                    Back to all news
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ARTICLE SIDEBAR */}
            <Reveal delay={0.12} y={25} duration={0.6}>
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="border-t-2 border-slate-950 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    News & Media
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    MAS Updates
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    Follow company updates, service developments and industry
                    information from MAS.
                  </p>

                  <Link
                    to="/news"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:gap-3"
                  >
                    View all news
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </article>

      {/* RELATED NEWS */}
      {relatedNews.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal y={25}>
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  More from MAS
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                  Related News
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedNews.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.08} y={25}>
                  <Link
                    to={`/news/${item.slug}`}
                    className="group block h-full overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl"
                  >
                    <div className="h-52 overflow-hidden bg-slate-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Newspaper
                            size={42}
                            className="text-slate-400"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-7">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span>{item.category}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-400" />
                        <span>{formatDate(item.published_at)}</span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-tight text-slate-950 transition group-hover:text-slate-700">
                        {item.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                        {item.excerpt}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition group-hover:gap-3">
                        Read article
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default NewsDetail;

