import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  Factory,
  Fuel,
  Mountain,
  Pickaxe,
  ShieldCheck,
  Sun,
  Truck,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";

import oilGasImage from "../../assets/industries/oil-gas.webp";
import renewableEnergyImage from "../../assets/industries/renewable-energy.webp";
import infrastructureImage from "../../assets/industries/infrastructure.webp";
import miningMineralsImage from "../../assets/industries/mining-minerals.webp";
import manufacturingImage from "../../assets/industries/manufacturing.webp";
import industrialProjectsImage from "../../assets/industries/industrial-projects.webp";

const industryImages = {
  "oil-gas": oilGasImage,
  "renewable-energy": renewableEnergyImage,
  infrastructure: infrastructureImage,
  "mining-minerals": miningMineralsImage,
  manufacturing: manufacturingImage,
  "industrial-projects": industrialProjectsImage,
};

const API_URL = `${API_BASE_URL}/api/industries/`;

const iconMap = {
  Building2,
  Factory,
  Fuel,
  Mountain,
  Pickaxe,
  ShieldCheck,
  Sun,
  Truck,
  Waves,
};

function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load industries.");
      }

      const data = await response.json();
      setIndustries(data);
    } catch (err) {
      console.error("Industries API error:", err);
      setError("Unable to load industries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <div className="bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <img src={oilGasImage} alt="Industrial project environment" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.55),rgba(2,6,23,0.72))]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-slate-700" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-slate-800" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Industries
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Supporting projects across demanding industrial sectors.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              MAS provides inspection, quality, expediting and technical support
              adapted to the requirements of different project environments.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Discuss Your Project
                <ArrowRight size={17} />
              </Link>

              <a
                href="#industry-portfolio"
                className="inline-flex items-center gap-2 border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500"
              >
                Explore Industries
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Sector Experience
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Understanding the environment behind every project.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-slate-600">
                Every industry brings different technical, quality, regulatory
                and project requirements. MAS approaches each assignment
                according to its defined scope, applicable standards and
                project priorities.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our industry-focused approach helps create a consistent
                framework for inspection, quality assurance, quality control,
                expediting and technical support.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          LOADING / ERROR / EMPTY
      ========================================================= */}
      {loading && (
        <section className="bg-slate-50 py-20">
          <LoadingState message="Loading industries..." />
        </section>
      )}

      {!loading && error && (
        <section className="bg-slate-50 py-20">
          <ErrorState message={error} onRetry={fetchIndustries} />
        </section>
      )}

      {!loading && !error && industries.length === 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-950">
              No industries available
            </h3>

            <p className="mt-3 text-slate-500">
              Industries will appear here once they are added and published
              from the administration panel.
            </p>
          </div>
        </section>
      )}

      {!loading && !error && industries.length > 0 && (
        <>
          {/* =========================================================
              INDUSTRY PORTFOLIO
          ========================================================= */}
          <section
            id="industry-portfolio"
            className="bg-slate-50 py-16 md:py-20"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <Reveal y={28}>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Industry Portfolio
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    Sector-focused support for complex projects.
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    Explore the sectors where MAS can align its technical and
                    quality services with project-specific requirements.
                  </p>
                </div>
              </Reveal>

              {/* Industry navigation */}
              <StaggerContainer
                className="mt-10 flex flex-wrap gap-3"
                delayChildren={0.05}
                staggerChildren={0.06}
              >
                {industries.map((industry, index) => (
                  <StaggerItem key={industry.id} y={15} duration={0.4}>
                    <a
                      href={`#${industry.slug}`}
                      className="border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                    >
                      {String(index + 1).padStart(2, "0")} {industry.title}
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* =====================================================
                  INDUSTRY FEATURE CARDS
              ===================================================== */}
              <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {industries.map((industry, index) => {
                  const Icon = iconMap[industry.icon] || Building2;
                  const number = String(index + 1).padStart(2, "0");

                  return (
                    <StaggerItem key={industry.id}>
                      <Link
                        to={`/industries/${industry.slug}`}
                        className="group block h-full border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl"
                      >
                        {industryImages[industry.slug] && (
                          <div className="mb-8 h-48 overflow-hidden bg-slate-100">
                            <img
                              src={industryImages[industry.slug]}
                              alt={industry.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <div className="flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center bg-slate-950 text-white">
                            <Icon size={22} />
                          </div>

                          <span className="text-sm font-bold tracking-widest text-slate-300">
                            {number}
                          </span>
                        </div>

                        <h3 className="mt-8 text-2xl font-bold text-slate-950">
                          {industry.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {industry.short_description}
                        </p>

                        <div className="mt-7 flex items-center gap-2 text-sm font-bold text-slate-950">
                          Explore sector
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          {/* =========================================================
              DETAILED INDUSTRY SECTIONS
          ========================================================= */}
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <Reveal y={28}>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Industry Capabilities
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    Support aligned with project requirements.
                  </h2>
                </div>
              </Reveal>

              <StaggerContainer
                className="mt-10 space-y-6"
                delayChildren={0.05}
                staggerChildren={0.1}
              >
                {industries.map((industry, index) => {
                  const Icon = iconMap[industry.icon] || Building2;

                  return (
                    <StaggerItem key={industry.id}>
                      <article
                        id={industry.slug}
                        className="scroll-mt-28 border border-slate-200 bg-white"
                      >
                        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
                          {/* LEFT */}
                          <div className="border-b border-slate-200 bg-slate-50 p-7 md:p-8 lg:border-b-0 lg:border-r">
                            {industryImages[industry.slug] && (
                              <div className="mb-8 h-52 overflow-hidden bg-slate-100">
                                <img
                                  src={industryImages[industry.slug]}
                                  alt={industry.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex h-14 w-14 items-center justify-center bg-slate-950 text-white">
                                <Icon size={25} />
                              </div>

                              <span className="text-sm font-bold tracking-[0.2em] text-slate-300">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <h3 className="mt-8 text-3xl font-bold tracking-tight text-slate-950">
                              {industry.title}
                            </h3>

                            <p className="mt-5 text-base leading-7 text-slate-600">
                              {industry.short_description}
                            </p>
                          </div>

                          {/* RIGHT */}
                          <div className="p-7 md:p-8">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                              Sector Support
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                              {industry.description ||
                                "MAS can align its services with the specific technical, quality and project requirements of this sector."}
                            </p>

                            {industry.points?.length > 0 && (
                              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {industry.points.map((point, pointIndex) => (
                                  <div
                                    key={`${industry.id}-${pointIndex}`}
                                    className="flex gap-3 border-l-2 border-slate-950 py-1 pl-4"
                                  >
                                    <ShieldCheck
                                      size={17}
                                      className="mt-0.5 shrink-0 text-slate-700"
                                    />

                                    <span className="text-sm font-semibold leading-6 text-slate-700">
                                      {point}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <Link
                              to="/contact"
                              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-slate-950"
                            >
                              Discuss this sector with MAS
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        </>
      )}

      {/* =========================================================
          PROJECT LIFECYCLE
      ========================================================= */}
      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Project Support
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                  Support throughout the project lifecycle.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                  MAS can structure its support around the requirements,
                  milestones and reporting expectations of individual projects.
                </p>
              </div>
            </Reveal>

            <StaggerContainer
              className="grid gap-5 sm:grid-cols-2"
              delayChildren={0.1}
              staggerChildren={0.12}
            >
              {[
                {
                  number: "01",
                  title: "Plan",
                  text: "Define scope, requirements and project priorities.",
                },
                {
                  number: "02",
                  title: "Monitor",
                  text: "Maintain visibility across relevant project activities.",
                },
                {
                  number: "03",
                  title: "Verify",
                  text: "Support inspection, quality and technical verification.",
                },
                {
                  number: "04",
                  title: "Report",
                  text: "Provide structured documentation and project reporting.",
                },
              ].map((item) => (
                <StaggerItem key={item.number}>
                  <div className="h-full border border-slate-800 p-7 transition hover:border-slate-600">
                    <span className="text-sm font-bold tracking-widest text-slate-500">
                      {item.number}
                    </span>

                    <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-white py-16 md:py-20">
        <Reveal y={30} duration={0.7}>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Start a Conversation
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Have a project in one of these sectors?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Share your project requirements with MAS and discuss the
              inspection, quality or technical support your project requires.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
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

export default Industries;
