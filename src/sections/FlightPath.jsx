import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, ChevronRight } from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

function useActiveIndex(itemRefs) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex((prev) =>
        prev !== closestIndex ? closestIndex : prev
      );
    };

    updateActive();

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return activeIndex;
}

export default function FlightPath({
  experiences,
  loading,
  error,
  onRetry,
}) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIndex = useActiveIndex(itemRefs);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  const lightY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionShell
      id="flight-path"
      index="04"
      title="Flight Path"
      refNote="CAREER_TIMELINE"
    >
      {loading && <SkeletonGrid count={3} className="h-32" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div ref={trackRef} className="relative pl-12 sm:pl-16">
          {/* Background Line */}
          <div
            className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-grid"
            aria-hidden="true"
          />

          {/* Progress Line */}
          <motion.div
            className="absolute left-4 sm:left-6 top-0 w-px bg-cyan"
            style={{ height: lightY }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {(experiences || []).map((exp, i) => {
              const isActive = i === activeIndex;
              const hasRoles =
                exp.roles && exp.roles.length > 0;

              return (
                <div
                  key={exp._id || i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`relative transition-all duration-500 ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-35 scale-[0.985]"
                  }`}
                >
                  {/* Marker */}
                  <div className="absolute -left-12 sm:-left-16 top-1 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center border border-ink bg-paper z-10 transition-colors duration-300">
                    <Plane
                      size={18}
                      className={
                        isActive
                          ? "text-cyan"
                          : "text-ink/40"
                      }
                      style={{
                        transform: "rotate(45deg)",
                      }}
                    />
                  </div>

                  {/* Company */}
                  <p className="text-l font-mono text-cyan mb-2 tracking-wide">
                    {exp.duration}
                    {exp.current && (
                      <span className="ml-2 text-incident">
                        // ACTIVE
                      </span>
                    )}
                  </p>

                  <h3 className="font-display font-bold text-3xl mb-2">
                    {exp.company}
                  </h3>

                  {!hasRoles && (
                    <p className="text-lg text-ink/65 font-mono mb-4">
                      {exp.role}
                    </p>
                  )}

                  {hasRoles ? (
                    <div className="mt-6 pl-5 border-l border-ink/20 space-y-8">
                      <div className="text-xs font-mono uppercase tracking-[0.25em] text-ink/40">
                        [ Career Progression ]
                      </div>

                      {exp.roles.map((subRole, rIdx) => (
                        <div
                          key={rIdx}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-3">
                            <ChevronRight
                              size={18}
                              className="text-cyan shrink-0"
                            />

                            <h4 className="font-display font-semibold text-xl">
                              {subRole.title}
                            </h4>
                          </div>

                          <p className="pl-7 text-xs font-mono text-ink/60">
                            {subRole.duration}

                            {subRole.current && (
                              <span className="ml-2 text-incident">
                                // CURRENT ROLE
                              </span>
                            )}
                          </p>

                          <ul className="space-y-3 pl-7">
                            {(subRole.accomplishments || []).map(
                              (line, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-3 text-base lg:text-lg text-ink/85 leading-relaxed"
                                >
                                  <span className="text-cyan shrink-0">
                                    —
                                  </span>

                                  <span>{line}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3 mt-5">
                      {(exp.accomplishments || []).map(
                        (line, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-base lg:text-lg text-ink/85 leading-relaxed"
                          >
                            <span className="text-cyan shrink-0">
                              —
                            </span>

                            <span>{line}</span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionShell>
  );
}