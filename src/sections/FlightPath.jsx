import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane } from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

function useActiveIndex(itemRefs) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemRefs.current.length]);

  return activeIndex;
}

export default function FlightPath({ experiences, loading, error, onRetry }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIndex = useActiveIndex(itemRefs);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const lightY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionShell id="flight-path" index="04" title="Flight Path" refNote="CAREER_TIMELINE">
      {loading && <SkeletonGrid count={3} className="h-32" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div ref={trackRef} className="relative pl-10 sm:pl-14">
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-grid" aria-hidden="true" />
          <motion.div
            className="absolute left-3 sm:left-5 top-0 w-px bg-cyan"
            style={{ height: lightY }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-14">
            {(experiences || []).map((exp, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={exp._id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`relative transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="absolute -left-10 sm:-left-14 top-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-ink bg-paper">
                    <Plane
                      size={16}
                      className={isActive ? "text-cyan" : "text-ink/50"}
                      style={{ transform: "rotate(45deg)" }}
                    />
                  </div>

                  <p className="text-[10px] font-mono text-cyan mb-1">
                    {exp.duration}
                    {exp.current && <span className="ml-2 text-incident">// ACTIVE</span>}
                  </p>
                  <h3 className="font-display font-bold text-xl">{exp.role}</h3>
                  <p className="text-sm text-ink/60 font-mono mb-3">{exp.company}</p>

                  <ul className="space-y-2">
                    {(exp.accomplishments || []).map((line, idx) => (
                      <li key={idx} className="text-sm text-ink/80 flex gap-2">
                        <span className="text-cyan shrink-0">—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
