import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-6">
      <div className="max-w-md text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle size={28} className="text-red-500" />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-950">
          Unable to load this content
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        )}

      </div>
    </div>
  );
}

export default ErrorState;