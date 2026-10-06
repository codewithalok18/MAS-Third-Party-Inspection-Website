import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import masLogoHorizontal from "../../assets/mas-logo-horizontal-footer.png";

const serviceLinks = [
  ["Inspection Services", "/services#inspection-services"],
  ["Quality Assurance", "/services#quality-assurance"],
  ["Quality Control", "/services#quality-control"],
  ["Expediting", "/services#expediting"],
  ["Technical Services", "/services#technical-services"],
  ["Audit & Compliance", "/services#audit-compliance"],
];

const industryLinks = [
  ["Oil & Gas", "/industries#oil-gas"],
  ["Renewable Energy", "/industries#renewable-energy"],
  ["Infrastructure", "/industries#infrastructure"],
  ["Mining & Minerals", "/industries#mining-minerals"],
  ["Manufacturing", "/industries#manufacturing"],
  ["Industrial Projects", "/industries#industrial-projects"],
];

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* TOP CTA */}
      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              General Enquiries
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Have a project requirement?
              <span className="block text-slate-400">
                Let&apos;s discuss it.
              </span>
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
          >
            Contact MAS
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <img
                src={masLogoHorizontal}
                alt="MAS Third-Party Inspection & Expediting Service"
                className="h-auto w-[260px] max-w-full object-contain object-left"
              />
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-slate-400">
              Professional inspection, quality, expediting and technical
              support services for industrial and infrastructure projects.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href="mailto:info@mastpi.com"
                className="flex items-center gap-3 text-slate-400 transition hover:text-white"
              >
                <Mail size={16} />
                info@mastpi.com
              </a>

              <a
                href="tel:+918527457745"
                className="flex items-center gap-3 text-slate-400 transition hover:text-white"
              >
                <Phone size={16} />
                +91 85274 57745
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Services
            </h3>

            <div className="mt-6 space-y-3">
              {serviceLinks.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="block text-sm text-slate-400 transition hover:translate-x-1 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* INDUSTRIES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Industries
            </h3>

            <div className="mt-6 space-y-3">
              {industryLinks.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="block text-sm text-slate-400 transition hover:translate-x-1 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h3>

            <div className="mt-6 space-y-3">
              <Link
                to="/about"
                className="block text-sm text-slate-400 hover:text-white"
              >
                About MAS
              </Link>

              <Link
                to="/news"
                className="block text-sm text-slate-400 hover:text-white"
              >
                Latest News
              </Link>

              <Link
                to="/downloads"
                className="block text-sm text-slate-400 hover:text-white"
              >
                Downloads
              </Link>

              <Link
                to="/contact"
                className="block text-sm text-slate-400 hover:text-white"
              >
                Contacts
              </Link>

              <Link
                to="/client-portal"
                className="flex items-center gap-2 text-sm font-semibold text-white"
              >
                Client Portal
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} MAS Third-Party Inspection &
            Expediting Service. All rights reserved.
          </p>

          <p>Professional inspection & technical services</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

