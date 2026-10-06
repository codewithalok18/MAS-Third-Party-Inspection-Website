import { useEffect, useState } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

const API_URL = `${API_BASE_URL}/api/services/`;

const iconMap = {
  SearchCheck,
  ShieldCheck,
  ClipboardCheck,
  Truck,
  Settings2,
  FileCheck2,
  Wrench,
};

const serviceGroups = [
  {
    id: "quality-services",
    number: "01",
    title: "Quality Services",
    description:
      "Services focused on inspection, quality assurance, quality control and compliance throughout critical project activities.",
    services: [
      "inspection-services",
      "quality-assurance",
      "quality-control",
      "audit-compliance",
    ],
  },
  {
    id: "project-supply",
    number: "02",
    title: "Project & Supply Chain Services",
    description:
      "Support designed to improve visibility and follow-up across supplier and project-related activities.",
    services: ["expediting"],
  },
  {
    id: "technical-services",
    number: "03",
    title: "Technical Services",
    description:
      "Technical support for projects requiring specialist knowledge, coordination and practical execution support.",
    services: ["technical-services"],
  },
];

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load services.");
      }

      const data = await response.json();

      setServices(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getService = (slug) => {
    return services.find((service) => service.slug === slug);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="max-w-4xl">
            <Reveal duration={0.65} y={24}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Our Services
              </p>
            </Reveal>

            <Reveal delay={0.1} duration={0.75} y={32}>
              <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Technical services supporting quality, control and project
                delivery.
              </h1>
            </Reveal>

            <Reveal delay={0.2} duration={0.65} y={24}>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                MAS provides inspection, quality, technical and project support
                services structured around the requirements of industrial and
                infrastructure projects.
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

                <a
                  href="#service-groups"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white"
                >
                  Explore Services
                  <ArrowRight size={17} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <Reveal y={28}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                What We Do
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Services aligned with project requirements.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12} y={28}>
            <div>
              <p className="text-lg leading-8 text-slate-600">
                MAS brings together inspection, quality assurance, quality
                control, expediting and technical capabilities to support
                projects through important stages of execution.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-500">
                Our services can be structured around the scope, technical
                requirements and priorities of each engagement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE GROUPS */}
      <section
        id="service-groups"
        className="scroll-mt-20 bg-slate-50 py-24 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal y={28}>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Service Portfolio
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Professional support across critical project activities.
              </h2>
            </div>
          </Reveal>

          {/* Loading */}
          {loading && (
            <div className="mt-14">
              <LoadingState message="Loading our services..." />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-14">
              <ErrorState
                message={error}
                onRetry={fetchServices}
              />
            </div>
          )}

          {/* Empty */}
          {!loading && !error && services.length === 0 && (
            <div className="mt-14 border border-slate-200 bg-white p-12 text-center">
              <Wrench
                size={40}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                No services available
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                Services will appear here once they are added and published
                through the administration panel.
              </p>
            </div>
          )}

          {/* Groups */}
          {!loading && !error && services.length > 0 && (
            <div className="mt-14 space-y-20">
              {serviceGroups.map((group) => {
                const groupServices = group.services
                  .map((slug) => getService(slug))
                  .filter(Boolean);

                if (groupServices.length === 0) {
                  return null;
                }

                return (
                  <div key={group.id} id={group.id}>
                    {/* Group heading */}
                    <Reveal y={26}>
                      <div className="grid gap-8 border-t border-slate-300 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                          <span className="text-xs font-bold tracking-[0.25em] text-slate-400">
                            {group.number}
                          </span>

                          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                            {group.title}
                          </h3>
                        </div>

                        <p className="max-w-2xl text-base leading-7 text-slate-600">
                          {group.description}
                        </p>
                      </div>
                    </Reveal>

                    {/* Service cards */}
                    <StaggerContainer className="mt-10 grid gap-px bg-slate-300 md:grid-cols-2">
                      {groupServices.map((service, index) => {
                        const Icon =
                          iconMap[service.icon] || FileCheck2;

                        return (
                          <StaggerItem key={service.id} y={24}>
                            <article
                              className="group bg-white p-8 transition duration-300 hover:-translate-y-1 hover:bg-slate-950 hover:text-white hover:shadow-xl md:p-10"
                            >
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex h-12 w-12 items-center justify-center bg-slate-950 text-white transition duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-slate-950">
                                <Icon size={22} />
                              </div>

                              <span className="text-xs font-bold tracking-[0.2em] text-slate-300 group-hover:text-slate-600">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <h4 className="mt-8 text-2xl font-bold text-slate-950 group-hover:text-white">
                              {service.title}
                            </h4>

                            <p className="mt-4 text-sm leading-7 text-slate-600 group-hover:text-slate-300">
                              {service.short_description}
                            </p>

                            {service.points?.length > 0 && (
                              <div className="mt-7 border-t border-slate-200 pt-6 group-hover:border-slate-700">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                  Key Areas
                                </p>

                                <ul className="mt-4 space-y-3">
                                  {service.points.map(
                                    (point, pointIndex) => (
                                      <li
                                        key={`${service.id}-${pointIndex}`}
                                        className="flex items-start gap-3 text-sm leading-6 text-slate-600 group-hover:text-slate-300"
                                      >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-slate-950 group-hover:bg-white" />

                                        <span>{point}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            <Link
  to={`/services/${service.slug}`}
  className="inline-flex items-center gap-2 text-sm font-bold text-slate-950"
>
  Explore service
  <ArrowRight
    size={16}
    className="transition-transform group-hover:translate-x-1"
  />
</Link>
                            </article>
                          </StaggerItem>
                        );
                      })}
                    </StaggerContainer>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SERVICE DELIVERY */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal y={28}>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Service Delivery
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                A clear approach from scope to reporting.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Our service delivery approach is structured around understanding
                requirements, planning the work, executing agreed activities and
                maintaining clear communication.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="mt-14 grid border-l border-t border-slate-200 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Understand",
                text: "Review project scope, technical requirements and expected outcomes.",
              },
              {
                number: "02",
                title: "Plan",
                text: "Define appropriate resources, activities and reporting requirements.",
              },
              {
                number: "03",
                title: "Execute",
                text: "Perform agreed technical, inspection and quality activities.",
              },
              {
                number: "04",
                title: "Report",
                text: "Provide clear records, findings and project communication.",
              },
            ].map((step) => (
              <StaggerItem key={step.number} y={24}>
                <div
                  className="border-b border-r border-slate-200 p-7 md:p-8"
                >
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.text}
                </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24 text-white md:py-28">
        <Reveal y={30}>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Work With MAS
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Have a project requirement?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Share your project scope and requirements with our team to discuss
              the appropriate technical and quality support.
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
    </div>
  );
}

export default Services;