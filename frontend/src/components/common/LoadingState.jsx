function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

        <p className="mt-4 text-sm font-medium text-slate-500">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingState;