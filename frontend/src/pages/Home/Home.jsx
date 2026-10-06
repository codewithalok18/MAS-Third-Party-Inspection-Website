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

import homeHero from "../../assets/home/home-hero.webp";
import homeInspection from "../../assets/home/home-inspection.webp";
import homeQuality from "../../assets/home/home-quality.webp";
import homeProject from "../../assets/home/home-project.webp";
import homeIndustrial from "../../assets/home/home-industrial.webp";

const SERVICES_API = `${API_BASE_URL}/api/services/`;
const INDUSTRIES_API = `${API_BASE_URL}/api/industries/`;
const NEWS_API = `${API_BASE_URL}/api/news/`;

const iconMap = {
  SearchCheck,
  ShieldCheck,
  Truck,
  Wrench,
};

const serviceGroups = [
  {
    title: "Quality Services",
    description:
      "Inspection, quality assurance and quality control support structured around project requirements.",
    image: homeInspection,
    slugs: ["inspection-services", "quality-assurance", "quality-control"],
  },
  {
    title: "Technical Services",
    description:
      "Expediting and technical project support helping teams maintain visibility across critical activities.",
    image: homeProject,
    slugs: ["expediting", "technical-services"],
  },
  {
    title: "Audit & Compliance",
    description:
      "Practical assessment, compliance review and documentation support for project and supplier requirements.",
    image: homeQuality,
    slugs: ["audit-compliance"],
  },
];

const industryHighlights = ["oil-gas", "renewable-energy", "infrastructure", "mining-minerals"];

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
      if (!response.ok) throw new Error("Failed to load services.");

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
      if (!response.ok) throw new Error("Failed to load industries.");

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
      if (!response.ok) throw new Error("Failed to load news.");

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

  const getServicesForGroup = (slugs) =>
    services.filter((service) => slugs.includes(service.slug));

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 text-white md:min-h-[680px]">
        <img
          src={homeHero}
          alt="Industrial inspection and technical services"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/25" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-6 py-20 md:min-h-[680px] md:px-10 md:py-24 lg:px-16">
          <div className="max-w-4xl">
            <Reveal duration={0.65} y={24}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 md:text-sm">
                Inspection • Quality • Technical Services
              </p>
            </Reveal>

            <Reveal delay={0.08} duration={0.75} y={30}>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Technical expertise for projects that demand precision.
              </h1>
            </Reveal>

            <Reveal delay={0.16} duration={0.65} y={24}>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                MAS provides professional inspection, quality assurance,
                quality control, expediting and technical project support
                for demanding industrial environments.
              </p>
            </Reveal>

            <Reveal delay={0.24} duration={0.6} y={20}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Discuss Your Project
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Explore Services
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal duration={0.65} y={24}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Our Services
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                  Practical support across the project lifecycle.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} duration={0.65} y={24}>
              <div className="max-w-3xl">
                <p className="text-base leading-8 text-slate-600 md:text-lg">
                  MAS brings together inspection, quality and technical
                  services to support project requirements from procurement
                  and manufacturing through verification and delivery.
                </p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-500"
                >
                  View all services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICE GROUPS */}
      <section className="bg-slate-50 pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          {servicesLoading && <LoadingState message="Loading services..." />}

          {!servicesLoading && servicesError && (
            <ErrorState message={servicesError} onRetry={fetchServices} />
          )}

          {!servicesLoading && !servicesError && (
            <StaggerContainer
              className="grid gap-6 md:grid-cols-3"
              delayChildren={0.05}
              staggerChildren={0.1}
            >
              {serviceGroups.map((group) => {
                const groupServices = getServicesForGroup(group.slugs);

                return (
                  <StaggerItem key={group.title} y={25} duration={0.55}>
                    <div className="group h-full overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl">
                      <div className="h-52 overflow-hidden bg-slate-100">
                        <img
                          src={group.image}
                          alt={group.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-7 md:p-8">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                          {String(serviceGroups.indexOf(group) + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-slate-950">
                          {group.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {group.description}
                        </p>

                        <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                          {groupServices.map((service) => {
                            const Icon = iconMap[service.icon] || Wrench;

                            return (
                              <Link
                                key={service.id}
                                to={`/services/${service.slug}`}
                                className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-800 transition hover:text-slate-500"
                              >
                                <span className="flex items-center gap-3">
                                  <Icon size={16} className="text-slate-400" />
                                  {service.title}
                                </span>
                                <ArrowRight size={15} />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CLIENT PORTAL */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal duration={0.7} y={24}>
            <div className="flex min-h-[390px] flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:px-16">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Client Portal
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Keep project information clear, organised and accessible.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                MAS can provide a structured digital point of access for
                project communication, documentation and service information.
              </p>
              <Link
                to="/client-portal"
                className="mt-7 inline-flex w-fit items-center gap-2 border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                Open Client Portal
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} duration={0.7} y={24}>
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <img
                src={homeQuality}
                alt="Quality inspection and project documentation"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/35" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <Reveal duration={0.65} y={24}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Industries
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                  Experience across demanding industrial sectors.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} duration={0.65} y={24}>
              <div>
                <p className="max-w-2xl text-base leading-8 text-slate-600">
                  Our services are structured to support technical, inspection
                  and quality requirements across multiple industrial sectors.
                </p>
                <Link
                  to="/industries"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-500"
                >
                  View all industries
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} duration={0.7} y={24}>
            <div className="mt-10 h-[300px] overflow-hidden md:h-[380px]">
              <img
                src={homeIndustrial}
                alt="Industrial project environment"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          {industriesLoading && (
            <LoadingState message="Loading industries..." />
          )}

          {!industriesLoading && industriesError && (
            <ErrorState message={industriesError} onRetry={fetchIndustries} />
          )}

          {!industriesLoading && !industriesError && (
            <StaggerContainer
              className="mt-6 grid gap-px overflow-hidden bg-slate-300 sm:grid-cols-2 lg:grid-cols-4"
              delayChildren={0.05}
              staggerChildren={0.08}
            >
              {industries
                .filter((industry) => industryHighlights.includes(industry.slug))
                .map((industry) => (
                  <StaggerItem key={industry.id} y={20} duration={0.5}>
                    <Link
                      to={`/industries/${industry.slug}`}
                      className="group flex min-h-[150px] flex-col justify-between bg-slate-950 p-6 text-white transition duration-300 hover:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Globe2
                          size={23}
                          className="text-slate-500 transition group-hover:text-white"
                        />
                        <ArrowRight
                          size={17}
                          className="opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">{industry.title}</h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                          {industry.short_description}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <Reveal duration={0.65} y={24}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  News & Media
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  Latest news and company updates.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} duration={0.55} y={18}>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-500"
              >
                View all news
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10">
            {newsLoading && <LoadingState message="Loading latest updates..." />}

            {!newsLoading && newsError && (
              <ErrorState message={newsError} onRetry={fetchNews} />
            )}

            {!newsLoading && !newsError && news.length === 0 && (
              <div className="border border-slate-200 bg-white p-10 text-center">
                <Newspaper size={34} className="mx-auto text-slate-400" />
                <p className="mt-4 font-semibold text-slate-800">
                  No news updates available yet.
                </p>
              </div>
            )}

            {!newsLoading && !newsError && news.length > 0 && (
              <StaggerContainer
                className="grid gap-6 md:grid-cols-3"
                delayChildren={0.05}
                staggerChildren={0.1}
              >
                {news.slice(0, 3).map((article) => (
                  <StaggerItem key={article.id} y={22} duration={0.5}>
                    <Link
                      to={`/news/${article.slug}`}
                      className="group block h-full overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg"
                    >
                      {article.image ? (
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-slate-100">
                          <Newspaper size={40} className="text-slate-300" />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          <span>{article.category}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={12} />
                            {formatNewsDate(article.published_at)}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950">
                          {article.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                          {article.excerpt}
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-950">
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

      {/* GENERAL ENQUIRY */}
      <section className="bg-white py-20 md:py-24">
        <Reveal duration={0.7} y={24}>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-slate-950 text-white">
              <CheckCircle2 size={21} />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              General Enquiries
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Have a project requirement?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Tell us about your project, technical requirements or inspection
              needs. Our team can discuss the appropriate support for your scope.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
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

