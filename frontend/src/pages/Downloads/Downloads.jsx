import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  FileCheck2,
  FileText,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Reveal from "../../components/common/Reveal";
import companyCover from "../../assets/home/company-cover.png";

const API_URL = `${API_BASE_URL}/api/downloads/`;

const documentTypeConfig = {
  company: {
    label: "Company",
    icon: BriefcaseBusiness,
  },
  brochure: {
    label: "Brochure",
    icon: FileText,
  },
  capability: {
    label: "Capability Statement",
    icon: FileCheck2,
  },
  certificate: {
    label: "Certificate",
    icon: ShieldCheck,
  },
  policy: {
    label: "Policy",
    icon: FileCheck2,
  },
  other: {
    label: "Other",
    icon: FileText,
  },
};

function Downloads() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState("all");

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load documents.");
      }

      const data = await response.json();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Downloads API error:", err);
      setError("Unable to load documents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const formatDocumentType = (type) => {
    return documentTypeConfig[type]?.label || type || "Other";
  };

  const availableTypes = useMemo(() => {
    const types = documents
      .map((document) => document.document_type)
      .filter(Boolean);

    return ["all", ...new Set(types)];
  }, [documents]);

  const filteredDocuments =
    activeType === "all"
      ? documents
      : documents.filter(
          (document) => document.document_type === activeType
        );

  return (
    <div className="bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <img src={companyCover} alt="MAS company information" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/78" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.55),rgba(2,6,23,0.75))]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-slate-700" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-slate-800" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Reveal duration={0.65} y={24}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Downloads
            </p>
          </Reveal>

          <Reveal delay={0.1} duration={0.75} y={32}>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Company information and project resources.
            </h1>
          </Reveal>

          <Reveal delay={0.2} duration={0.65} y={24}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Access published MAS company information, capability documents,
              policies and other resources.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-b border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Resource Centre
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Information for clients and project partners.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-slate-600">
              Find relevant MAS documentation in one central location.
              Published resources can include company profiles, capability
              statements, brochures, policies and certification-related
              documents.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Documents are managed through the administration panel and only
              published resources are displayed here.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOADING
      ========================================================= */}
      {loading && (
        <section className="bg-slate-50 py-20">
          <LoadingState message="Loading documents..." />
        </section>
      )}

      {/* =========================================================
          ERROR
      ========================================================= */}
      {!loading && error && (
        <section className="bg-slate-50 py-20">
          <ErrorState
            message={error}
            onRetry={fetchDocuments}
          />
        </section>
      )}

      {/* =========================================================
          EMPTY
      ========================================================= */}
      {!loading && !error && documents.length === 0 && (
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-slate-950 text-white">
              <FileText size={30} />
            </div>

            <h2 className="mt-7 text-3xl font-bold text-slate-950">
              No documents available
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Documents will appear here once they are uploaded and published
              through the administration panel.
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
      )}

      {/* =========================================================
          DOCUMENT CONTENT
      ========================================================= */}
      {!loading && !error && documents.length > 0 && (
        <>
          {/* =======================================================
              RESOURCE SUMMARY
          ======================================================= */}
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border border-slate-200 bg-white p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Published Resources
                  </p>

                  <p className="mt-4 text-4xl font-bold text-slate-950">
                    {documents.length}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Documents currently available.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Resource Categories
                  </p>

                  <p className="mt-4 text-4xl font-bold text-slate-950">
                    {availableTypes.length - 1}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Types of published resources.
                  </p>
                </div>

                <div className="border border-slate-200 bg-white p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Access
                  </p>

                  <p className="mt-4 text-4xl font-bold text-slate-950">
                    Open
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Download published documents directly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              DOCUMENT LIBRARY
          ======================================================= */}
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Document Library
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    Available resources.
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Filter size={16} />
                  <span>Filter resources</span>
                </div>
              </div>

              {/* CATEGORY FILTER */}
              <div className="mt-10 flex flex-wrap gap-2">
                {availableTypes.map((type) => {
                  const active = activeType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                        active
                          ? "bg-slate-950 text-white"
                          : "border border-slate-300 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
                      }`}
                    >
                      {type === "all"
                        ? "All Resources"
                        : formatDocumentType(type)}
                    </button>
                  );
                })}
              </div>

              {/* DOCUMENTS */}
              {filteredDocuments.length > 0 ? (
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {filteredDocuments.map((document) => {
                    const config =
                      documentTypeConfig[document.document_type] ||
                      documentTypeConfig.other;

                    const Icon = config.icon;

                    return (
                      <article
                        key={document.id}
                        className="group border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:shadow-lg md:p-8"
                      >
                        <div className="flex items-start justify-between gap-5">
                          <div className="flex h-14 w-14 items-center justify-center bg-slate-950 text-white">
                            <Icon size={25} />
                          </div>

                          <span className="bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
                            {formatDocumentType(
                              document.document_type
                            )}
                          </span>
                        </div>

                        <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-950">
                          {document.title}
                        </h3>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                          {document.description ||
                            "MAS company document available for download."}
                        </p>

                        <div className="mt-8 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                              Document
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Published resource
                            </p>
                          </div>

                          {document.file ? (
                            <a
                              href={document.file}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex w-fit items-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Download
                              <ArrowDownToLine size={16} />
                            </a>
                          ) : (
                            <span className="inline-flex w-fit cursor-not-allowed items-center gap-2 border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-400">
                              Unavailable
                              <ArrowDownToLine size={16} />
                            </span>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-10 border border-slate-200 bg-slate-50 p-12 text-center">
                  <FileText
                    size={38}
                    className="mx-auto text-slate-400"
                  />

                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    No resources in this category
                  </h3>

                  <p className="mt-3 text-sm text-slate-500">
                    Try another category to view available documents.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =======================================================
              RESOURCE TYPES
          ======================================================= */}
          <section className="bg-slate-50 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Resource Types
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Documents for different project needs.
                </h2>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="border-t-2 border-slate-950 bg-white p-7">
                  <BriefcaseBusiness size={27} />

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    Company Information
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Company profiles, brochures and corporate information
                    published by MAS.
                  </p>
                </div>

                <div className="border-t-2 border-slate-950 bg-white p-7">
                  <FileCheck2 size={27} />

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    Capability Information
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Published information describing MAS services and
                    capabilities.
                  </p>
                </div>

                <div className="border-t-2 border-slate-950 bg-white p-7">
                  <ShieldCheck size={27} />

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    Quality & Policies
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Relevant quality, policy and certification documents when
                    published.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-slate-950 py-24 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Need More Information?
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Looking for a specific document?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Contact the MAS team if you need additional information or a
            resource that is not currently available in the downloads section.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Contact MAS
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Downloads;
