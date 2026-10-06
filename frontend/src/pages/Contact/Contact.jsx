import { useState } from "react";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import API_BASE_URL from "../../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.email?.[0] ||
            data?.message?.[0] ||
            "Unable to submit your enquiry."
        );
      }

      setStatus({
        type: "success",
        message:
          "Thank you. Your enquiry has been submitted successfully.",
      });

      setFormData({
        first_name: "",
        last_name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    "Inspection Services",
    "Quality Assurance",
    "Quality Control",
    "Expediting",
    "Technical Services",
    "Audit & Compliance",
    "Other",
  ];

  return (
    <main className="bg-white">
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
              Contact MAS
            </p>
          </Reveal>

          <Reveal delay={0.1} duration={0.75} y={32}>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Let's discuss your
              <span className="block text-slate-400">
                project requirements.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} duration={0.65} y={24}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Tell us about your inspection, quality, technical or project
              requirements. Our team can help identify the right MAS service
              for your needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          GENERAL ENQUIRIES
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal duration={0.65} y={28}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  General Enquiries
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Start a conversation with MAS.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} duration={0.65} y={28}>
              <div className="max-w-3xl">
                <p className="text-lg leading-8 text-slate-600">
                  Whether you are planning a new project, looking for
                  inspection support or need assistance with quality and
                  technical requirements, send us your enquiry and provide
                  as much project information as possible.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Our enquiry form helps us understand your requirements before
                  responding with relevant information.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT + FORM
      ========================================================= */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-16">
          {/* LEFT INFORMATION */}
          <Reveal duration={0.65} y={28}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Get in Touch
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              We are here to help.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Contact MAS to discuss your project requirements and find out
              how our services may support your quality, inspection and
              technical needs.
            </p>

            {/* CONTACT DETAILS */}
            <StaggerContainer
              className="mt-10 space-y-7"
              delayChildren={0.05}
              staggerChildren={0.08}
            >
              <StaggerItem y={18} duration={0.45}>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-slate-950 text-white">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:info@mas.com"
                    className="mt-2 block font-semibold text-slate-950 transition hover:text-slate-500"
                  >
                    info@mas.com
                  </a>
                </div>
              </div>
              </StaggerItem>

              <StaggerItem y={18} duration={0.45}>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-slate-950 text-white">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Phone
                  </p>

                  <a
                    href="tel:+910000000000"
                    className="mt-2 block font-semibold text-slate-950 transition hover:text-slate-500"
                  >
                    +91 00000 00000
                  </a>
                </div>
              </div>
              </StaggerItem>

              <StaggerItem y={18} duration={0.45}>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-slate-950 text-white">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Office
                  </p>

                  <p className="mt-2 font-semibold leading-6 text-slate-950">
                    MAS
                    <br />
                    India
                  </p>
                </div>
              </div>
              </StaggerItem>
            </StaggerContainer>

            {/* SERVICE NOTE */}
            <div className="mt-10 border-l-2 border-slate-950 bg-white p-6">
              <div className="flex gap-4">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-slate-950"
                />

                <div>
                  <h3 className="font-bold text-slate-950">
                    Tell us what you need
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Select the relevant service and provide your project
                    requirements so the enquiry can be directed appropriately.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={0.12} duration={0.7} y={28}>
          <div className="bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                General Enquiry
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Send us a message
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fields marked with * are required.
              </p>
            </div>

            {/* SUCCESS */}
            {status.type === "success" && (
              <div className="mb-7 flex gap-3 border border-green-200 bg-green-50 p-4 text-green-800">
                <CheckCircle
                  className="mt-0.5 shrink-0"
                  size={20}
                />

                <p className="text-sm leading-6">
                  {status.message}
                </p>
              </div>
            )}

            {/* ERROR */}
            {status.type === "error" && (
              <div className="mb-7 flex gap-3 border border-red-200 bg-red-50 p-4 text-red-800">
                <AlertCircle
                  className="mt-0.5 shrink-0"
                  size={20}
                />

                <p className="text-sm leading-6">
                  {status.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    First Name *
                  </label>

                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Last Name
                  </label>

                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  />
                </div>
              </div>

              {/* COMPANY */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  />
                </div>
              </div>

              {/* SERVICE */}
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Service
                </label>

                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                >
                  <option value="">Select a service</option>

                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or requirements..."
                  className="w-full resize-none border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-3 bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Send Enquiry"}

                {!isSubmitting && (
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Your enquiry will be submitted securely to the MAS enquiry
                system.
              </p>
            </form>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          HOW WE CAN HELP
      ========================================================= */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal duration={0.65} y={28}>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              How We Can Help
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Discuss the requirements that matter to your project.
            </h2>
          </div>
          </Reveal>

          <StaggerContainer
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            delayChildren={0.08}
            staggerChildren={0.08}
          >
            {[
              {
                number: "01",
                title: "Inspection",
                text: "Discuss inspection requirements, equipment and project support needs.",
              },
              {
                number: "02",
                title: "Quality",
                text: "Talk to us about quality assurance, quality control and compliance requirements.",
              },
              {
                number: "03",
                title: "Expediting",
                text: "Share supplier, manufacturing progress and documentation requirements.",
              },
              {
                number: "04",
                title: "Technical",
                text: "Discuss technical personnel, project support and coordination requirements.",
              },
            ].map((item) => (
              <StaggerItem key={item.number} y={22} duration={0.5}>
              <div
                className="group border-t-2 border-slate-950 pt-6 transition duration-300 hover:-translate-y-1 hover:border-slate-400"
              >
                <p className="text-xs font-bold tracking-widest text-slate-400">
                  {item.number}
                </p>

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

      {/* =========================================================
          LOCATION / PRESENCE
      ========================================================= */}
      <section className="bg-slate-50 py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal duration={0.65} y={28}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Locations & Presence
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Supporting projects from India.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                MAS is presented through its India-based operations. Project
                and service requirements can be discussed directly with our
                team through the enquiry channel.
              </p>
            </div>
            </Reveal>

            <Reveal delay={0.12} duration={0.65} y={28}>
            <div className="group flex items-center border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl md:p-10">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-slate-950 text-white transition duration-300 group-hover:scale-105">
                  <MapPin size={25} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Current Office Information
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    MAS
                  </h3>

                  <p className="mt-2 text-slate-600">
                    India
                  </p>

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    Detailed office address and location information can be
                    added here once the final MAS office details are confirmed.
                  </p>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-slate-950 py-24 text-white md:py-28">
        <Reveal duration={0.7} y={28}>
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            General Enquiries
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Have a project in mind?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Send us your requirements and the MAS team can start the
            conversation.
          </p>

          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="mt-8 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Send an Enquiry
            <ArrowRight size={17} />
          </a>
        </div>
        </Reveal>
      </section>
    </main>
  );
}

export default Contact;