import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Target,
  ShieldCheck,
  Users,
  ClipboardCheck,
  MessageSquare,
 } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";
import aboutTeamImage from "../../assets/about/about-team.webp";

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Quality",
    text: "Focus on defined requirements, documentation and verification.",
  },
  {
    icon: Users,
    title: "Technical Team",
    text: "Professionals working according to project-specific requirements.",
  },
  {
    icon: Target,
    title: "Project Focus",
    text: "Services structured around the scope, schedule and priorities of each project.",
  },
  {
    icon: Eye,
    title: "Transparency",
    text: "Clear communication and reporting throughout service delivery.",
  },
];

const values = [
  "Professional integrity",
  "Technical discipline",
  "Quality and accountability",
  "Clear communication",
  "Client-focused delivery",
];

const approachSteps = [
  {
    number: "01",
    title: "Understand",
    text: "Understand the project scope, technical requirements and expected outcomes.",
  },
  {
    number: "02",
    title: "Plan",
    text: "Define the appropriate resources, activities and reporting requirements.",
  },
  {
    number: "03",
    title: "Execute",
    text: "Deliver services according to agreed technical and quality requirements.",
  },
  {
    number: "04",
    title: "Report",
    text: "Provide clear documentation and communication to support project decisions.",
  },
];

function About() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <img src={aboutTeamImage} alt="MAS technical team" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/78" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.55),rgba(2,6,23,0.75))]" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl">
            <Reveal duration={0.65} y={24}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                About MAS
              </p>
            </Reveal>

            <Reveal delay={0.1} duration={0.75} y={32}>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Technical knowledge.
                <span className="block text-slate-400">
                  Practical execution.
                </span>
                <span className="block">Reliable support.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2} duration={0.65} y={24}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                MAS provides technical, inspection and quality-focused services
                designed to support organizations working on complex projects
                and demanding industrial requirements.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:px-16">
          <Reveal y={30}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Who We Are
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Supporting better project outcomes through technical expertise.
              </h2>

              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  MAS is a technical services organization focused on providing
                  inspection, quality assurance, quality control and technical
                  project support.
                </p>

                <p>
                  Our services are designed to help clients maintain visibility,
                  quality and control throughout different stages of a project,
                  from procurement and manufacturing to inspection and delivery.
                </p>

                <p>
                  We work with a practical approach, combining technical
                  knowledge, structured processes and clear communication.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} y={30}>
            <div className="group overflow-hidden bg-slate-100">
              <img
                src={aboutTeamImage}
                alt="MAS technical team"
                className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[460px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {/* Mission */}
            <StaggerItem>
              <article className="group border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/50 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center bg-slate-950 text-white transition duration-300 group-hover:scale-105 group-hover:bg-slate-800">
                  <Target size={24} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  01
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Our Mission
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  To provide dependable technical and quality services that
                  help clients manage project requirements with confidence,
                  clarity and discipline.
                </p>
              </article>
            </StaggerItem>

            {/* Vision */}
            <StaggerItem>
              <article className="group border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/50 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center bg-slate-950 text-white transition duration-300 group-hover:scale-105 group-hover:bg-slate-800">
                  <Eye size={24} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  02
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Our Vision
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  To build a trusted technical services organization known
                  for professional execution, technical capability and
                  consistent service delivery.
                </p>
              </article>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal y={30}>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Our Capabilities
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                A structured approach to technical service delivery.
              </h2>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title}>
                  <article className="group border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center bg-slate-100 transition duration-300 group-hover:scale-105 group-hover:bg-slate-950 group-hover:text-white">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-7 text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {item.text}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-950 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-16">
          <Reveal y={30}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Our Values
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Principles that guide our work.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-slate-400">
                Professional service delivery depends on more than technical
                capability. We aim to maintain a consistent standard across
                communication, execution and reporting.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="space-y-5">
            {values.map((value, index) => (
              <StaggerItem key={value}>
                <div className="group flex items-center gap-4 border-b border-slate-800 pb-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-700 text-xs font-bold text-slate-400 transition group-hover:border-slate-400 group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-slate-500 transition group-hover:text-white"
                  />

                  <span className="text-base font-medium text-slate-200 sm:text-lg">
                    {value}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <Reveal y={30}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Our Approach
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  From requirement to reliable execution.
                </h2>

                <p className="mt-5 max-w-md leading-7 text-slate-600">
                  Our approach focuses on understanding requirements,
                  planning activities, executing the agreed scope and
                  maintaining clear reporting throughout delivery.
                </p>
              </div>
            </Reveal>

            <StaggerContainer className="grid gap-8 sm:grid-cols-2">
              {approachSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <article className="border-t border-slate-300 pt-5 transition hover:border-slate-950">
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-400">
                      {step.number}
                    </p>

                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {step.text}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-100 py-16 md:py-20">
        <Reveal y={30}>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-slate-950 text-white">
              <MessageSquare size={21} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Start a Conversation
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Let's discuss your project requirements.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Contact MAS to discuss inspection, quality or technical support
              requirements for your project.
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

    </main>
  );
}

export default About;
