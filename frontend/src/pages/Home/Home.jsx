import { useEffect, useState } from "react";
import API_BASE_URL from "../../services/api";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Newspaper,
  SearchCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import { Link } from "react-router-dom";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";

const SERVICES_API = `${API_BASE_URL}/api/services/`;
const INDUSTRIES_API = `${API_BASE_URL}/api/industries/`;
const NEWS_API = `${API_BASE_URL}/api/news/`;

const iconMap = {
  SearchCheck,
  ShieldCheck,
  Truck,
  Wrench,
};

const capabilityItems = [
  {
    number: "01",
    title: "Quality Focus",
    description:
      "Structured processes, verification and documentation aligned with project requirements.",
  },
  {
    number: "02",
    title: "Technical Support",
    description:
      "Professional support designed around the technical scope and priorities of each project.",
  },
  {
    number: "03",
    title: "Project Visibility",
    description:
      "Clear communication and reporting throughout key stages of service delivery.",
  },
  {
    number: "04",
    title: "Practical Execution",
    description:
      "A disciplined approach focused on requirements, execution and reliable project support.",
  },
];

const whyMasItems = [
  "Technical services structured around project requirements",
  "Clear reporting and documentation",
  "Quality-focused inspection and verification",
  "Practical communication throughout service delivery",
];

function formatNewsDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Home() {
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [news, setNews] = useState([]);

  const [servicesLoading, setServicesLoading] = useState(true);
  const [industriesLoading, setIndustriesLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const [servicesError, setServicesError] = useState("");
  const [industriesError, setIndustriesError] = useState("");
  const [newsError, setNewsError] = useState("");

  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      setServicesError("");

      const response = await fetch(SERVICES_API);

      if (!response.ok) {
        throw new Error("Failed to load services.");
      }

      const data = await response.json();
      setServices(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error(error);
      setServicesError("Unable to load services.");
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchIndustries = async () => {
    try {
      setIndustriesLoading(true);
      setIndustriesError("");

      const response = await fetch(INDUSTRIES_API);

      if (!response.ok) {
        throw new Error("Failed to load industries.");
      }

      const data = await response.json();
      setIndustries(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error(error);
      setIndustriesError("Unable to load industries.");
    } finally {
      setIndustriesLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError("");

      const response = await fetch(NEWS_API);

      if (!response.ok) {
        throw new Error("Failed to load news.");
      }

      const data = await response.json();
      setNews(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error(error);
      setNewsError("Unable to load latest news.");
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchIndustries();
    fetchNews();
  }, []);

  return (
    <main>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.10),transparent_34%)]" />

        <div className="absolute -right-28 top-16 h-80 w-80 rounded-full border border-slate-800" />
        <div className="absolute -right-8 top-32 h-56 w-56 rounded-full border border-slate-800" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-24">
          <div>
            <Reveal duration={0.65} y={24}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Inspection • Technical • Quality Services
              </p>
            </Reveal>

            <Reveal delay={0.1} duration={0.75} y={32}>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Technical expertise for projects that demand precision.
              </h1>
            </Reveal>

            <Reveal delay={0.2} duration={0.65} y={24}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                MAS provides professional inspection, quality assurance,
                quality control, expediting and technical project support
                services for demanding industrial environments.
              </p>
            </Reveal>

            <Reveal delay={0.3} duration={0.6} y={20}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Discuss Your Project
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Explore Services
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Corporate Visual */}
          <Reveal delay={0.2} duration={0.8} y={20} className="hidden lg:block">
            <div className="relative ml-auto h-[460px] max-w-[500px] border border-slate-700 bg-slate-900">
              <div className="absolute inset-8 border border-slate-700" />

              <div className="absolute left-12 top-12 h-28 w-28 border border-slate-500" />

              <div className="absolute right-12 top-28 h-20 w-20 border border-slate-700" />

              <div className="absolute bottom-12 right-12 h-40 w-40 border border-slate-500" />

              <div className="absolute bottom-20 left-20">
                <p className="text-7xl font-bold text-white">MAS</p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                  Technical Services
                </p>
              </div>

              <div className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center border border-slate-700">
                <ShieldCheck size={20} className="text-slate-400" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CAPABILITY STRIP
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          <StaggerContainer
            className="contents"
            delayChildren={0.05}
            staggerChildren={0.08}
          >
            {capabilityItems.map((item, index) => (
              <StaggerItem key={item.number} y={20} duration={0.5}>
                <div
                  className={`border-b border-slate-200 px-6 py-8 md:px-8 lg:border-b-0 ${
                    index !== capabilityItems.length - 1 ? "lg:border-r" : ""
                  }`}
                >
                  <p className="text-xs font-bold tracking-widest text-slate-400">
                    {item.number}
                  </p>

                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal duration={0.65} y={24} className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Our Services
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Technical services built around project requirements.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                From inspection and quality control to expediting and
                technical support, MAS provides services structured around
                project scope and delivery requirements.
              </p>
            </Reveal>

            <Reveal delay={0.1} duration={0.55} y={18}>
              <Link
                to="/services"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-600"
              >
                View all services
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12">
            {servicesLoading && (
              <LoadingState message="Loading services..." />
            )}

            {!servicesLoading && servicesError && (
              <ErrorState
                message={servicesError}
                onRetry={fetchServices}
              />
            )}

            {!servicesLoading &&
              !servicesError &&
              services.length === 0 && (
                <div className="border border-slate-200 bg-white p-10 text-center">
                  <Wrench
                    size={36}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-4 font-semibold text-slate-800">
                    No services available.
                  </p>
                </div>
              )}

            {!servicesLoading &&
              !servicesError &&
              services.length > 0 && (
                <StaggerContainer
                  className="grid gap-px overflow-hidden bg-slate-300 md:grid-cols-2 lg:grid-cols-3"
                  delayChildren={0.05}
                  staggerChildren={0.08}
                >
                  {services.slice(0, 6).map((service) => {
                    const Icon = iconMap[service.icon] || Wrench;

                    return (
                      <StaggerItem key={service.id} y={25} duration={0.5}>
                        <Link
                          to="/services"
                          className="group block bg-white p-7 transition duration-300 hover:-translate-y-1 hover:bg-slate-950 hover:text-white hover:shadow-xl md:p-8"
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex h-11 w-11 items-center justify-center bg-slate-100 transition duration-300 group-hover:scale-105 group-hover:bg-slate-800">
                              <Icon
                                size={22}
                                className="text-slate-700 group-hover:text-white"
                              />
                            </div>

                            <ArrowRight
                              size={19}
                              className="mt-2 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </div>

                          <h3 className="mt-8 text-xl font-bold">
                            {service.title}
                          </h3>

                          <p className="mt-4 text-sm leading-7 text-slate-500 group-hover:text-slate-300">
                            {service.short_description}
                          </p>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT SUPPORT
      ====================================================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal duration={0.65} y={24}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Project Support
                </p>

                <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                  Supporting key stages from requirement to delivery.
                </h2>

                <p className="mt-6 max-w-md leading-8 text-slate-600">
                  MAS services can support project activities across procurement,
                  manufacturing, inspection, quality verification and delivery.
                </p>
              </div>
            </Reveal>

            <StaggerContainer
              className="grid gap-0 border-t border-slate-200"
              delayChildren={0.05}
              staggerChildren={0.08}
            >
              {[
                {
                  number: "01",
                  title: "Procurement",
                  text: "Support visibility of technical and quality requirements.",
                },
                {
                  number: "02",
                  title: "Manufacturing",
                  text: "Inspection and quality-focused monitoring during execution.",
                },
                {
                  number: "03",
                  title: "Verification",
                  text: "Technical checks, documentation and quality verification.",
                },
                {
                  number: "04",
                  title: "Delivery",
                  text: "Clear reporting and documentation supporting project decisions.",
                },
              ].map((item) => (
                <StaggerItem key={item.number} y={20} duration={0.5}>
                  <div className="grid gap-4 border-b border-slate-200 py-6 sm:grid-cols-[70px_180px_1fr] sm:items-start">
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                      {item.number}
                    </span>

                    <h3 className="text-lg font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-7 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT MAS
      ====================================================== */}
      <section className="bg-slate-950 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
          <Reveal duration={0.65} y={24}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                About MAS
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Practical technical support for complex projects.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12} duration={0.65} y={24}>
            <div>
              <p className="text-base leading-8 text-slate-300 md:text-lg">
                MAS is a technical services organization focused on inspection,
                quality assurance, quality control and technical project support.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-400">
                Our approach is centered on clear communication, disciplined
                execution, technical knowledge and reliable project support.
              </p>

              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-slate-400"
              >
                Learn more about MAS
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ====================================================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal duration={0.65} y={24} className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Industries
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Supporting demanding industrial sectors.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Our service portfolio is structured to support technical,
                inspection and quality requirements across multiple sectors.
              </p>
            </Reveal>

            <Reveal delay={0.1} duration={0.55} y={18}>
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-600"
              >
                View all industries
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12">
            {industriesLoading && (
              <LoadingState message="Loading industries..." />
            )}

            {!industriesLoading && industriesError && (
              <ErrorState
                message={industriesError}
                onRetry={fetchIndustries}
              />
            )}

            {!industriesLoading &&
              !industriesError &&
              industries.length === 0 && (
                <div className="border border-slate-200 p-10 text-center">
                  <p className="text-slate-500">
                    No industries available.
                  </p>
                </div>
              )}

            {!industriesLoading &&
              !industriesError &&
              industries.length > 0 && (
                <StaggerContainer
                  className="grid gap-px overflow-hidden bg-slate-300 sm:grid-cols-2 lg:grid-cols-3"
                  delayChildren={0.05}
                  staggerChildren={0.08}
                >
                  {industries.slice(0, 6).map((industry) => (
                    <StaggerItem key={industry.id} y={25} duration={0.5}>
                      <Link
                        to="/industries"
                        className="group block min-h-[220px] bg-slate-950 p-7 text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:shadow-xl md:p-8"
                      >
                        <div className="flex items-start justify-between">
                          <Globe2
                            size={28}
                            className="text-slate-500 transition duration-300 group-hover:scale-105 group-hover:text-white"
                          />

                          <ArrowRight
                            size={18}
                            className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </div>

                        <h3 className="mt-16 text-xl font-bold">
                          {industry.title}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                          {industry.short_description}
                        </p>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY MAS
      ====================================================== */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
          <Reveal duration={0.65} y={24}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Why MAS
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Built around quality, transparency and technical discipline.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-slate-600">
                Our services are structured around practical project
                requirements, clear communication and dependable technical
                support.
              </p>
            </div>
          </Reveal>

          <StaggerContainer
            className="space-y-6"
            delayChildren={0.05}
            staggerChildren={0.08}
          >
            {whyMasItems.map((item, index) => (
              <StaggerItem key={item} y={20} duration={0.5}>
                <div className="flex gap-4 border-b border-slate-200 pb-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-950 text-xs font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-1 shrink-0 text-slate-700"
                    />

                    <p className="text-base font-medium leading-7 text-slate-700 md:text-lg">
                      {item}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =====================================================
          LATEST NEWS
      ====================================================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal duration={0.65} y={24} className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Latest Updates
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                News and company updates.
              </h2>
            </Reveal>

            <Reveal delay={0.1} duration={0.55} y={18}>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-600"
              >
                View all news
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12">
            {newsLoading && (
              <LoadingState message="Loading latest updates..." />
            )}

            {!newsLoading && newsError && (
              <ErrorState
                message={newsError}
                onRetry={fetchNews}
              />
            )}

            {!newsLoading &&
              !newsError &&
              news.length === 0 && (
                <div className="border border-slate-200 p-10 text-center">
                  <Newspaper
                    size={36}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-4 font-semibold text-slate-800">
                    No news updates available yet.
                  </p>
                </div>
              )}

            {!newsLoading &&
              !newsError &&
              news.length > 0 && (
                <StaggerContainer
                  className="grid gap-6 md:grid-cols-3"
                  delayChildren={0.05}
                  staggerChildren={0.1}
                >
                  {news.slice(0, 3).map((article) => (
                    <StaggerItem key={article.id} y={25} duration={0.55}>
                      <Link
                        to={`/news/${article.slug}`}
                        className="group block overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg"
                      >
                        {article.image ? (
                          <div className="h-52 overflow-hidden bg-slate-100">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="flex h-52 items-center justify-center bg-slate-100">
                            <Newspaper
                              size={42}
                              className="text-slate-300"
                            />
                          </div>
                        )}

                        <div className="p-7">
                          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <span>{article.category}</span>

                            <span className="h-1 w-1 rounded-full bg-slate-300" />

                            <span className="inline-flex items-center gap-1">
                              <CalendarDays size={13} />
                              {formatNewsDate(article.published_at)}
                            </span>
                          </div>

                          <h3 className="mt-4 text-xl font-bold leading-snug text-slate-950">
                            {article.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                            {article.excerpt}
                          </p>

                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950">
                            Read article
                            <ArrowRight
                              size={15}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================
          GENERAL ENQUIRY
      ====================================================== */}
      <section className="bg-slate-950 py-20 text-white md:py-24">
        <Reveal duration={0.7} y={28}>
          <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-white text-slate-950">
              <ShieldCheck size={22} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              General Enquiries
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Have a project requirement?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Tell us about your project, technical requirements or inspection
              needs. Our team can discuss the appropriate support for your scope.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Send an Enquiry
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default Home;