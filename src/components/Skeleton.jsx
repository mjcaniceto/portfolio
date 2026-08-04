import React from "react";

export function SkeletonBlock({ className = "" }) {
  return <div className={`bg-grid/60 animate-pulse ${className}`} />;
}

export function SkeletonGrid({ count = 6, className = "h-40" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock key={i} className={`${className} border border-grid`} />
      ))}
    </div>
  );
}

export function ErrorNote({ message, onRetry }) {
  return (
    <div className="border border-incident text-incident text-sm font-mono p-4 flex items-center justify-between gap-4">
      <span>TRANSMISSION ERROR — {message}</span>
      {onRetry && (
        <button onClick={onRetry} className="underline hover:text-ink transition-colors shrink-0">
          RETRY
        </button>
      )}
    </div>
  );
}
