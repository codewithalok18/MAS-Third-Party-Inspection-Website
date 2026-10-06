import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Factory,
  Fuel,
  Pickaxe,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Sun,
  Truck,
} from "lucide-react";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";

import oilGasImage from "../../assets/industries/oil-gas.webp";
import renewableEnergyImage from "../../assets/industries/renewable-energy.webp";
import infrastructureImage from "../../assets/industries/infrastructure.webp";
import miningMineralsImage from "../../assets/industries/mining-minerals.webp";
import manufacturingImage from "../../assets/industries/manufacturing.webp";
import industrialProjectsImage from "../../assets/industries/industrial-projects.webp";

const iconMap = {
  FileCheck2,
  Factory,
  Fuel,
  Pickaxe,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Sun,
  Truck,
};

const industryImages = {
  "oil-gas": oilGasImage,
  "renewable-energy": renewableEnergyImage,
  infrastructure: infrastructureImage,
  "mining-minerals": miningMineralsImage,
  manufacturing: manufacturingImage,
  "industrial-projects": industrialProjectsImage,
};

function IndustryDetail() {
  const { slug } = useParams();

  const [industry, setIndustry] = useState(null);
  const [relatedIndustries, setRelatedIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/industries/${slug}/`
        );

        if (!response.ok) {
          throw new Error("Industry not found.");
        }

        const data = await response.json();

        setIndustry(data);
      } catch (err) {
        console.error("Industry detail error:", err);
        setError("Unable to load this industry.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndustry();
  }, [slug]);

  useEffect(() => {
    const fetchRelatedIndustries = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/industries/`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setRelatedIndustries(
          data.filter((item) => item.slug !== slug).slice(0, 3)
        );
      } catch (err) {
        console.error("Related industries error:", err);
      }
    };

    fetchRelatedIndustries();
  }, [slug]);

  if (loading) {
    return <LoadingState message="Loading industry..." />;
  }

  if (error || !industry) {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ErrorState
            message={error || "Industry not found."}
            onRetry={() => window.location.reload()}
          />

          <Link
            to="/industries"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
          >
            <ChevronRight size={16} className="rotate-180" />
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[industry.icon] || Factory;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,255,255,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="max-w-4xl">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Industries
              <ChevronRight size={15} />
            </Link>

            <div className="mt-10 flex h-14 w-14 items-center justify-center bg-white text-slate-950">
              <Icon size={27} />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Industry
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              {industry.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {industry.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Industry Overview
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Technical support adapted to sector requirements.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              {industry.description ||
                industry.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORT AREAS */}
      {industry.points?.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal y={22}>
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  MAS Support Areas
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Support where quality and project visibility matter.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2">
              {industry.points.map((point, index) => (
                <div
                  key={index}
                  className="group flex gap-5 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 md:p-8"
                >
                  <CheckCircle2
                    size={22}
                    className="mt-1 shrink-0 text-slate-950"
                  />

                  <div>
                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECT LIFECYCLE */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal y={22}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Project Lifecycle
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Support across critical project stages.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid border-l border-t border-slate-200 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Planning",
                text: "Understand scope, requirements and project priorities.",
              },
              {
                number: "02",
                title: "Procurement",
                text: "Support quality and technical visibility during supplier activities.",
              },
              {
                number: "03",
                title: "Execution",
                text: "Support inspection, quality and technical activities during delivery.",
              },
              {
                number: "04",
                title: "Completion",
                text: "Provide documentation, findings and project reporting.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border-b border-r border-slate-200 p-7 md:p-8"
              >
                <span className="text-xs font-bold tracking-widest text-slate-400">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MAS */}
      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              MAS Approach
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Practical support for demanding industries.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              Every industry has different technical and project
              requirements. Our service model is structured to adapt
              to the scope and priorities of individual projects.
            </p>

            <p>
              We focus on clear communication, quality control,
              technical visibility and reliable documentation.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED INDUSTRIES */}
      {relatedIndustries.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Explore More
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                  Other Industries
                </h2>
              </div>

              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                View all industries
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedIndustries.map((item) => {
                const RelatedIcon =
                  iconMap[item.icon] || Factory;

                return (
                  <Link
                    key={item.id}
                    to={`/industries/${item.slug}`}
                    className="group border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl"
                  >
                    {industryImages[item.slug] ? (
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <img
                          src={industryImages[item.slug]}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/10" />
                      </div>
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center bg-slate-950 text-white">
                        <RelatedIcon size={21} />
                      </div>
                    )}

                    <h3 className="mt-7 text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                      {item.short_description}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950">
                      Explore
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Discuss Your Project
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Looking for support in this sector?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Share your project requirements with MAS and discuss
            the appropriate technical and quality support.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Contact MAS
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default IndustryDetail;
