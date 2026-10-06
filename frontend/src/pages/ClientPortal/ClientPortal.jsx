import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";
import StaggerContainer from "../../components/common/StaggerContainer";
import StaggerItem from "../../components/common/StaggerItem";

function ClientPortal() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-slate-800" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <Reveal duration={0.65} y={24}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Client Portal
            </p>
          </Reveal>

          <Reveal delay={0.1} duration={0.75} y={32}>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              A dedicated space for
              <span className="block text-slate-400">
                client project access.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} duration={0.65} y={24}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              The MAS client portal will provide a dedicated environment for
              authorized clients to access project information, documentation
              and related services.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8 lg:px-12">
          <Reveal duration={0.7} y={28}>
            <div className="border border-slate-200 bg-slate-50 p-7 md:p-9">
              <StaggerContainer
                delayChildren={0.05}
                staggerChildren={0.08}
              >
                <StaggerItem y={18} duration={0.45}>
                  <div className="flex h-14 w-14 items-center justify-center bg-slate-950 text-white">
                    <ShieldCheck size={26} />
                  </div>
                </StaggerItem>

                <StaggerItem y={20} duration={0.5}>
                  <h2 className="mt-7 text-3xl font-bold text-slate-950">
                    Portal access is being prepared
                  </h2>
                </StaggerItem>

                <StaggerItem y={20} duration={0.5}>
                  <p className="mt-5 max-w-2xl leading-8 text-slate-600">
                    The client portal interface is currently a placeholder while
                    the secure portal functionality is being developed. Portal
                    access will be enabled for authorized clients once the system
                    is ready.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <Reveal delay={0.15} duration={0.6} y={20}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Contact MAS
                    <ExternalLink size={16} />
                  </Link>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-950"
                  >
                    <ArrowLeft size={16} />
                    Back to Home
                  </Link>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default ClientPortal;

