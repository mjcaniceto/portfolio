import React from "react";

export default function SectionShell({
  id,
  index,
  title,
  refNote,
  children,
  className = "",
  bare = false,
}) {
  return (
    <section id={id} className={`relative border-t border-ink overflow-hidden ${className}`}>
      <div className="absolute inset-0 blueprint-grid pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        {!bare && (
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <h2 className="font-display text-4xl md:text-[2.5rem] font-bold">
              <span className="text-cyan mr-2">{index}</span>
              {title}
            </h2>
            {refNote && (
              <span className="hidden sm:block text-[10px] font-mono text-ink/50 tracking-wider">
                {refNote}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
