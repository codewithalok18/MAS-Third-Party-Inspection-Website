import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";

import inspectionImage from "../../assets/services/inspection.webp";
import qualityAssuranceImage from "../../assets/services/quality-assurance.webp";
import qualityControlImage from "../../assets/services/quality-control.webp";
import expeditingImage from "../../assets/services/expediting.webp";
import technicalServicesImage from "../../assets/services/technical-services.webp";
import auditComplianceImage from "../../assets/services/audit-compliance.webp";

const iconMap = {
  SearchCheck,
  ShieldCheck,
  FileCheck2,
  Truck,
  Settings2,
};

const serviceImages = {
  "inspection-services": inspectionImage,
  "quality-assurance": qualityAssuranceImage,
  "quality-control": qualityControlImage,
  expediting: expeditingImage,
  "technical-services": technicalServicesImage,
  "audit-compliance": auditComplianceImage,
};

function ServiceDetail() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/services/${slug}/`
        );

        if (!response.ok) {
          throw new Error("Service not found.");
        }

        const data = await response.json();

        setService(data);
      } catch (err) {
        console.error("Service detail error:", err);
        setError("Unable to load this service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  useEffect(() => {
    const fetchRelatedServices = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setRelatedServices(
          data.filter((item) => item.slug !== slug).slice(0, 3)
        );
      } catch (err) {
        console.error("Related services error:", err);
      }
    };

    fetchRelatedServices();
  }, [slug]);

  if (loading) {
    return <LoadingState message="Loading service..." />;
  }

  if (error || !service) {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ErrorState
            message={error || "Service not found."}
            onRetry={() => window.location.reload()}
          />

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
          >
            <ChevronRight size={16} className="rotate-180" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || FileCheck2;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,255,255,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="max-w-4xl">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              Services
              <ChevronRight size={15} />
            </Link>

            <div className="mt-10 flex h-14 w-14 items-center justify-center bg-white text-slate-950">
              <Icon size={27} />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              MAS Services
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              {service.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {service.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Service Overview
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Practical support for demanding project requirements.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              {service.description ||
                service.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* KEY CAPABILITIES */}
      {service.points?.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal y={22}>
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Key Capabilities
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Focused on the activities that matter.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2">
              {service.points.map((point, index) => (
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

      {/* HOW WE WORK */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal y={22}>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                How We Work
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                A structured approach from requirement to reporting.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid border-l border-t border-slate-200 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Understand",
                text: "Review the project scope, requirements and expected outcomes.",
              },
              {
                number: "02",
                title: "Plan",
                text: "Define the activities, resources and service requirements.",
              },
              {
                number: "03",
                title: "Execute",
                text: "Carry out the agreed inspection, quality or technical activities.",
              },
              {
                number: "04",
                title: "Report",
                text: "Provide clear findings, records and relevant project updates.",
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
              Why MAS
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Service support built around project needs.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              Our service approach is designed around the requirements,
              scope and priorities of each project.
            </p>

            <p>
              We focus on technical visibility, quality control,
              documentation and clear communication throughout the
              agreed scope of work.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Explore More
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                  Related Services
                </h2>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                View all services
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedServices.map((item) => {
                const RelatedIcon =
                  iconMap[item.icon] || FileCheck2;

                return (
                  <Link
                    key={item.id}
                    to={`/services/${item.slug}`}
                    className="group border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-xl"
                  >
                    {serviceImages[item.slug] ? (
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <img
                          src={serviceImages[item.slug]}
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
            Discuss Your Requirements
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Need support for your next project?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Share your project requirements with MAS and discuss the
            appropriate service support for your scope.
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

export default ServiceDetail;
