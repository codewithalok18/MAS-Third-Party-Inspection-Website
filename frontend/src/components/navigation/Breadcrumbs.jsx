import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const labels = {
  about: "About",
  services: "Services",
  industries: "Industries",
  news: "News & Media",
  downloads: "Downloads",
  contact: "Contacts",
  "client-portal": "Client Portal",
};

function Breadcrumbs() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-5 py-4 text-xs md:px-8 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-1.5 font-medium text-slate-400 transition hover:text-slate-950"
        >
          <Home size={13} />
          Home
        </Link>

        {parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const label =
            labels[part] ||
            part
              .replace(/-/g, " ")
              .replace(/\b\w/g, (letter) => letter.toUpperCase());

          const path = `/${parts.slice(0, index + 1).join("/")}`;

          return (
            <div key={`${part}-${index}`} className="flex items-center gap-2">
              <ChevronRight size={13} className="text-slate-300" />

              {isLast ? (
                <span className="font-semibold text-slate-700">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="font-medium text-slate-400 hover:text-slate-950"
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumbs;