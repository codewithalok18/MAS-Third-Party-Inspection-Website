import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <SearchX size={38} className="text-slate-500" />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600">
          The page you are looking for may have been moved, removed,
          or the address may be incorrect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Home size={16} />
            Go to Homepage
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-950"
          >
            <ArrowLeft size={16} />
            Explore Services
          </Link>

        </div>
      </div>
    </section>
  );
}

export default NotFound;