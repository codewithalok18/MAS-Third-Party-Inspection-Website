import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Megaphone,
  Newspaper,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";

const API_URL = `${API_BASE_URL}/api/news/`;

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch news articles.");
      }

      const data = await response.json();
      setNewsItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("News API error:", err);
      setError("Unable to load news at the moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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

  const formatCategory = (category) => {
    if (!category) return "Update";

    return category
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const categories = [
    "all",
    ...Array.from(
      new Set(
        newsItems
          .map((item) => item.category)
          .filter(Boolean)
      )
    ),
  ];

  const filteredNews =
    activeCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  const featuredArticle = filteredNews[0] || newsItems[0];

  const remainingArticles = featuredArticle
    ? filteredNews.filter((item) => item.id !== featuredArticle.id)
    : [];

  return (
    <div className="bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-slate-700" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-slate-800" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal duration={0.65} y={24}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              News & Media
            </p>
          </Reveal>

          <Reveal delay={0.1} duration={0.75} y={32}>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Updates, insights and developments from MAS.
            </h1>
          </Reveal>

          <Reveal delay={0.2} duration={0.65} y={24}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Explore company updates, service developments and industry-focused
              information from MAS.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <Reveal duration={0.65} y={28}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                News & Media
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Stay informed about MAS.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12} duration={0.65} y={28}>
            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-slate-600">
                This section brings together published MAS updates, service
                developments and relevant industry information in one place.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                New content can be managed through the administration panel and
                published directly to the website.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          LOADING
      ========================================================= */}
      {loading && (
        <section className="bg-slate-50 py-20">
          <LoadingState message="Loading latest news..." />
        </section>
      )}

      {/* =========================================================
          ERROR
      ========================================================= */}
      {!loading && error && (
        <section className="bg-slate-50 py-20">
          <ErrorState message={error} onRetry={fetchNews} />
        </section>
      )}

      {/* =========================================================
          EMPTY STATE
      ========================================================= */}
      {!loading && !error && newsItems.length === 0 && (
        <>
          <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-2xl px-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-slate-950 text-white">
                <Newspaper size={30} />
              </div>

              <h2 className="mt-7 text-3xl font-bold text-slate-950">
                No news published yet
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-500">
                New MAS announcements, service updates and industry
                information will appear here once published.
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Contact MAS
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* =========================================================
          NEWS CONTENT
      ========================================================= */}
      {!loading && !error && newsItems.length > 0 && (
        <>
          {/* =======================================================
              FEATURED ARTICLE
          ======================================================= */}
          <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <Reveal duration={0.65} y={28}>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Featured
                    </p>

                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                      Latest update
                    </h2>
                  </div>

                  <div className="hidden items-center gap-2 text-sm text-slate-400 md:flex">
                    <CalendarDays size={16} />
                    <span>{formatDate(featuredArticle?.published_at)}</span>
                  </div>
                </div>
              </Reveal>

              {featuredArticle && (
                <Reveal delay={0.12} duration={0.7} y={30}>
                  <article className="mt-12 grid overflow-hidden border border-slate-200 lg:grid-cols-[1.15fr_0.85fr]">
                  {/* FEATURED IMAGE */}
                  <div className="min-h-[360px] bg-slate-100">
                    {featuredArticle.image ? (
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="h-full min-h-[360px] w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[360px] items-center justify-center bg-slate-950 text-white">
                        <div className="text-center">
                          <Megaphone
                            size={48}
                            className="mx-auto text-slate-400"
                          />

                          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                            MAS News
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FEATURED CONTENT */}
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="bg-slate-950 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                        {formatCategory(featuredArticle.category)}
                      </span>

                      <span className="flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={14} />
                        {formatDate(featuredArticle.published_at)}
                      </span>
                    </div>

                    <h3 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
                      {featuredArticle.title}
                    </h3>

                    <p className="mt-5 leading-8 text-slate-600">
                      {featuredArticle.excerpt}
                    </p>

                    <Link
                      to={`/news/${featuredArticle.slug}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Read Full Story
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  </article>
                </Reveal>
              )}
            </div>
          </section>

          {/* =======================================================
              CATEGORY FILTER
          ======================================================= */}
          <section className="border-y border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-6 md:px-10 lg:px-16">
              <Reveal duration={0.55} y={18}>
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">
                    Filter by category
                  </p>

                  <StaggerContainer
                    className="flex flex-wrap gap-2"
                    delayChildren={0.05}
                    staggerChildren={0.05}
                  >
                  {categories.map((category) => {
                    const active = activeCategory === category;

                    return (
                      <StaggerItem key={category} y={12} duration={0.35}>
                        <button
                          key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                          active
                            ? "bg-slate-950 text-white"
                            : "border border-slate-300 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
                        }`}
                      >
                          {category === "all"
                            ? "All"
                            : formatCategory(category)}
                        </button>
                      </StaggerItem>
                    );
                  })}
                  </StaggerContainer>
                </div>
              </Reveal>
            </div>
          </section>

          {/* =======================================================
              LATEST NEWS GRID
          ======================================================= */}
          <section className="bg-slate-50 py-24 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <Reveal duration={0.65} y={28}>
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Latest
                    </p>

                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                      From MAS
                    </h2>
                  </div>

                  <p className="max-w-md text-sm leading-6 text-slate-500">
                    Explore the latest published updates and information from
                    MAS.
                  </p>
                </div>
              </Reveal>

              {remainingArticles.length > 0 ? (
                <StaggerContainer
                  className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  delayChildren={0.08}
                  staggerChildren={0.09}
                >
                  {remainingArticles.map((item) => (
                    <StaggerItem key={item.id} y={25} duration={0.5}>
                    <article
                      key={item.id}
                      className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl"
                    >
                      {/* IMAGE */}
                      {item.image ? (
                        <div className="h-56 overflow-hidden bg-slate-200">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-slate-950">
                          <Newspaper
                            size={40}
                            className="text-slate-500"
                          />
                        </div>
                      )}

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            {formatCategory(item.category)}
                          </span>

                          <span className="text-xs text-slate-400">
                            {formatDate(item.published_at)}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-bold leading-7 text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
                          {item.excerpt}
                        </p>

                        <Link
                          to={`/news/${item.slug}`}
                          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-950"
                        >
                          Read more
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </article>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="mt-14 border border-slate-200 bg-white p-10 text-center">
                  <Newspaper
                    size={35}
                    className="mx-auto text-slate-400"
                  />

                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    No additional articles
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    More updates will appear here as they are published.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =======================================================
              MEDIA AREAS
          ======================================================= */}
          <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <Reveal duration={0.65} y={28}>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Media & Information
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    Information that keeps you connected.
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    MAS can use this space to share company developments,
                    technical perspectives and information relevant to the
                    industries it supports.
                  </p>
                </div>
              </Reveal>

              <StaggerContainer
                className="mt-14 grid gap-6 md:grid-cols-3"
                delayChildren={0.08}
                staggerChildren={0.1}
              >
                {[
                  {
                    number: "01",
                    title: "Company Updates",
                    text: "Announcements, developments and important updates from MAS.",
                  },
                  {
                    number: "02",
                    title: "Technical Insights",
                    text: "Perspectives around inspection, quality and technical services.",
                  },
                  {
                    number: "03",
                    title: "Industry Information",
                    text: "Relevant information and developments across supported sectors.",
                  },
                ].map((item) => (
                  <StaggerItem key={item.number} y={22} duration={0.45}>
                  <div
                    className="border-t-2 border-slate-950 pt-6"
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                      {item.number}
                    </span>

                    <h3 className="mt-5 text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </>
      )}

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-slate-950 py-24 text-white md:py-28">
        <Reveal duration={0.7} y={30}>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Connect With MAS
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Have a project or service requirement?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Get in touch with MAS to discuss your project requirements,
              technical needs or quality support.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Contact MAS
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default News;