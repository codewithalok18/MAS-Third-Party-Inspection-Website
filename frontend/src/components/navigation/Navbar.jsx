import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import masLogoMark from "../../assets/mas-logo-mark(1).png";

const services = [
  {
    label: "Inspection Services",
    href: "/services/inspection-services",
  },
  {
    label: "Quality Assurance",
    href: "/services/quality-assurance",
  },
  {
    label: "Quality Control",
    href: "/services/quality-control",
  },
  {
    label: "Expediting",
    href: "/services/expediting",
  },
  {
    label: "Technical Services",
    href: "/services/technical-services",
  },
  {
    label: "Audit & Compliance",
    href: "/services/audit-compliance",
  },
];

const aboutItems = [
  {
    label: "About MAS",
    href: "/about",
  },
  {
    label: "Our Mission & Vision",
    href: "/about#mission-vision",
  },
  {
    label: "Our Values",
    href: "/about#values",
  },
  {
    label: "Our Approach",
    href: "/about#approach",
  },
  {
    label: "Certifications",
    href: "/about#certifications",
  },
  {
    label: "Corporate Information",
    href: "/about#corporate-information",
  },
];

const industries = [
  {
    label: "Oil & Gas",
    href: "/industries/oil-gas",
  },
  {
    label: "Renewable Energy",
    href: "/industries/renewable-energy",
  },
  {
    label: "Infrastructure",
    href: "/industries/infrastructure",
  },
  {
    label: "Mining & Minerals",
    href: "/industries/mining-minerals",
  },
  {
    label: "Manufacturing",
    href: "/industries/manufacturing",
  },
  {
    label: "Industrial Projects",
    href: "/industries/industrial-projects",
  },
];

function Dropdown({ label, items, open, onToggle }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex items-center gap-1.5 px-2 py-8 text-[13px] font-semibold text-slate-700 transition hover:text-slate-950"
      >
        {label}

        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 w-[310px] -translate-x-1/2 border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)]"
          >
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {label}
              </p>
            </div>

            <div className="p-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center justify-between px-4 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <span>{item.label}</span>

                  <ChevronRight
                    size={15}
                    className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-950"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar() {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchInputRef = useRef(null);

  const isSectionActive = (prefix) =>
    location.pathname === prefix ||
    location.pathname.startsWith(`${prefix}/`);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setOpenMenu(null);
        setMobileOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return;
    }

    if (query.includes("service") || query.includes("inspection")) {
      window.location.href = "/services";
      return;
    }

    if (query.includes("industry") || query.includes("oil")) {
      window.location.href = "/industries";
      return;
    }

    if (query.includes("news")) {
      window.location.href = "/news";
      return;
    }

    if (query.includes("download") || query.includes("brochure")) {
      window.location.href = "/downloads";
      return;
    }

    if (query.includes("contact")) {
      window.location.href = "/contact";
      return;
    }

    window.location.href = "/services";
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center px-5 md:px-8 lg:px-12">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex shrink-0 items-center"
            aria-label="MAS Third-Party Inspection & Expediting Service"
          >
            <img
              src={masLogoMark}
              alt="MAS Third-Party Inspection & Expediting Service"
              className="h-12 w-12 object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="ml-auto hidden items-center lg:flex">
            <Dropdown
              label="Services"
              items={services}
              open={openMenu === "services"}
              onToggle={() =>
                setOpenMenu(
                  openMenu === "services" ? null : "services"
                )
              }
            />

            <Dropdown
              label="About"
              items={aboutItems}
              open={openMenu === "about"}
              onToggle={() =>
                setOpenMenu(openMenu === "about" ? null : "about")
              }
            />

            <Dropdown
              label="Industries"
              items={industries}
              open={openMenu === "industries"}
              onToggle={() =>
                setOpenMenu(
                  openMenu === "industries" ? null : "industries"
                )
              }
            />

            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-3 py-8 text-[13px] font-semibold transition ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-700 hover:text-slate-950"
                }`
              }
            >
              Latest News
            </NavLink>

            <NavLink
              to="/downloads"
              className={({ isActive }) =>
                `px-3 py-8 text-[13px] font-semibold transition ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-700 hover:text-slate-950"
                }`
              }
            >
              Downloads
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-8 text-[13px] font-semibold transition ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-700 hover:text-slate-950"
                }`
              }
            >
              Contacts
            </NavLink>

            {/* CLIENT PORTAL */}
            <Link
              to="/client-portal"
              className="ml-4 inline-flex items-center gap-2 bg-slate-950 px-5 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition hover:bg-slate-800"
            >
              Client Portal
              <ArrowUpRight size={15} />
            </Link>

            {/* SEARCH */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="ml-3 flex h-10 w-10 items-center justify-center text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
          </nav>

          {/* MOBILE ACTIONS */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-slate-700"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center text-slate-900"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
            >
              <div className="max-h-[calc(100vh-82px)] overflow-y-auto px-5 py-5">
                <MobileMenuItem
                  label="Services"
                  items={services}
                  open={mobileSubmenu === "services"}
                  onToggle={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "services" ? null : "services"
                    )
                  }
                />

                <MobileMenuItem
                  label="About"
                  items={aboutItems}
                  open={mobileSubmenu === "about"}
                  onToggle={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "about" ? null : "about"
                    )
                  }
                />

                <MobileMenuItem
                  label="Industries"
                  items={industries}
                  open={mobileSubmenu === "industries"}
                  onToggle={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "industries" ? null : "industries"
                    )
                  }
                />

                <Link
                  to="/news"
                  className={`block border-b border-slate-100 py-4 text-sm font-semibold ${
                    isSectionActive("/news")
                      ? "text-slate-950"
                      : "text-slate-700"
                  }`}
                >
                  Latest News
                </Link>

                <Link
                  to="/downloads"
                  className={`block border-b border-slate-100 py-4 text-sm font-semibold ${
                    isSectionActive("/downloads")
                      ? "text-slate-950"
                      : "text-slate-700"
                  }`}
                >
                  Downloads
                </Link>

                <Link
                  to="/contact"
                  className={`block border-b border-slate-100 py-4 text-sm font-semibold ${
                    isSectionActive("/contact")
                      ? "text-slate-950"
                      : "text-slate-700"
                  }`}
                >
                  Contacts
                </Link>

                <Link
                  to="/client-portal"
                  className="mt-5 flex items-center justify-center gap-2 bg-slate-950 px-5 py-4 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Client Portal
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 p-5 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSearchOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto mt-24 max-w-3xl bg-white p-6 shadow-2xl md:p-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    MAS Search
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    What are you looking for?
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="mt-8">
                <div className="flex border border-slate-300 focus-within:border-slate-950">
                  <Search
                    size={20}
                    className="ml-4 shrink-0 self-center text-slate-400"
                  />

                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search services, industries, news..."
                    className="w-full px-4 py-4 text-sm outline-none"
                  />

                  <button
                    type="submit"
                    className="bg-slate-950 px-6 text-sm font-bold text-white"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Inspection", "Services", "Industries", "News", "Downloads"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSearchValue(item)}
                      className="border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Press <span className="font-semibold text-slate-600">Esc</span>{" "}
                to close.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenuItem({ label, items, open, onToggle }) {
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-slate-800"
      >
        {label}

        <ChevronDown
          size={17}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pb-2"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-between px-3 py-3 text-sm text-slate-500 hover:text-slate-950"
              >
                {item.label}

                <ChevronRight size={14} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
