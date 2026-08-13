
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

function Waypoint({ current, hovered }) {
  const highlighted = current || hovered;

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      className={highlighted ? "text-cyan" : "text-ink"}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
        fillOpacity={highlighted ? "0.1" : "0.05"}
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle
        cx="12"
        cy="12"
        r="1.6"
        fill="currentColor"
      />
      <path
        d="M12 0V3M12 21v3M0 12h3M21 12h3"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function FlightPath({
  experiences,
  loading,
  error,
  onRetry,
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const lightHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  useEffect(() => {
    if (loading || !experiences?.length) {
      itemRefs.current = [];
      return undefined;
    }

    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current
        .slice(0, experiences.length)
        .forEach((element, index) => {
          if (!element) return;

          const rect = element.getBoundingClientRect();

          if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight
          ) {
            return;
          }

          const elementCenter =
            rect.top + rect.height / 2;

          const distance = Math.abs(
            elementCenter - viewportCenter
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

      setActive((previous) =>
        previous === closestIndex
          ? previous
          : closestIndex
      );

      rafRef.current = null;
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) return;

      rafRef.current =
        window.requestAnimationFrame(updateActive);
    };

    setActive(0);
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );
      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [experiences, loading]);

  return (
    <SectionShell
      id="flight-path"
      index="04"
      title="Flight Path"
      refNote="CAREER_TIMELINE"
    >
      {loading && (
        <SkeletonGrid count={3} className="h-32" />
      )}

      {error && (
        <ErrorNote message={error} onRetry={onRetry} />
      )}

      {!loading && !error && (
        <div
          ref={ref}
          className="relative pl-10 md:pl-16"
        >
          {/* Vertical timeline track */}
          <div className="absolute left-[18px] md:left-[34px] top-0 bottom-0 w-px bg-grid">
            <motion.div
              className="w-px bg-cyan shadow-[0_0_12px_2px_rgba(0,209,255,0.6)]"
              style={{ height: lightHeight }}
            />
          </div>

          {(experiences || []).map((exp, i) => {
            const isActive = active === i;
            const isHovered = hovered === i;
            const isHighlighted =
              isActive || isHovered;
            const hasRoles =
              exp.roles && exp.roles.length > 0;

            return (
              <div
                key={exp._id || exp.id || i}
                ref={(element) => {
                  itemRefs.current[i] = element;
                }}
                data-idx={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative pb-14 transition-opacity duration-300 ${
                  isHighlighted
                    ? "opacity-100"
                    : "opacity-40"
                }`}
              >
                {/* Waypoint */}
                <div className="absolute -left-[26px] md:-left-[42px] top-0 bg-paper p-1 z-10">
                  <Waypoint
                    current={isActive}
                    hovered={isHovered}
                  />
                </div>

                <div className="relative z-10 grid gap-1 md:grid-cols-[160px_1fr] md:gap-8">
                  {/* Timeline metadata */}
                  <div>
                    <div
                      className={`font-mono text-xs tracking-[0.3em] transition-colors duration-300 ${
                        isHovered
                          ? "text-cyan"
                          : "text-blue-link"
                      }`}
                    >
                      {exp.duration}
                    </div>

                    {exp.current && (
                      <div className="font-mono text-xs tracking-[0.3em] text-cyan">
                        // ACTIVE
                      </div>
                    )}

                    <div
                      className={`mt-1 inline-block font-mono text-[11px] tracking-widest px-1.5 py-0.5 border transition-colors duration-300 ${
                        isHovered
                          ? "border-cyan text-cyan"
                          : "border-ink text-ink"
                      }`}
                    >
                      {exp.current
                        ? "PRESENT"
                        : "COMPLETED"}
                    </div>
                  </div>

                  {/* Experience content */}
                  <div
                    className={`border-l-2 pl-4 md:pl-6 transition-colors duration-300 ${
                      isHovered
                        ? "border-cyan"
                        : "border-ink"
                    }`}
                  >
                    <h3
                      className={`font-display font-bold text-[22px] tracking-tight2 transition-colors duration-300 ${
                        isHovered
                          ? "text-cyan"
                          : "text-ink"
                      }`}
                    >
                      {exp.company}
                    </h3>

                    {!hasRoles && (
                      <div className="font-mono text-sm tracking-widest text-cyan">
                        {exp.role}
                      </div>
                    )}

                    {hasRoles ? (
                      <div className="mt-3 space-y-5">
                        <div className="font-mono text-[11px] tracking-widest text-ink/40 uppercase">
                          [ CAREER PROGRESSION ]
                        </div>

                        {exp.roles.map(
                          (subRole, roleIndex) => (
                            <div
                              key={roleIndex}
                              className="space-y-2"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-cyan">
                                  ▸
                                </span>

                                <h4
                                  className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
                                    isHovered
                                      ? "text-cyan"
                                      : "text-ink"
                                  }`}
                                >
                                  {subRole.title}
                                </h4>
                              </div>

                              <div className="font-mono text-xs tracking-widest text-ink/50 pl-4">
                                {subRole.duration}

                                {subRole.current && (
                                  <span className="ml-2 text-cyan">
                                    // CURRENT
                                  </span>
                                )}
                              </div>

                              <ul className="space-y-1.5 pl-4">
                                {(
                                  subRole.accomplishments ||
                                  []
                                ).map(
                                  (
                                    accomplishment,
                                    index
                                  ) => (
                                    <li
                                      key={index}
                                      className={`font-mono text-base leading-[1.6] flex gap-2 transition-colors duration-300 ${
                                        isHovered
                                          ? "text-ink/80"
                                          : "text-ink/60"
                                      }`}
                                    >
                                      <span className="text-cyan mt-0.5">
                                        ▸
                                      </span>
                                      <span>
                                        {accomplishment}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <ul className="mt-3 space-y-1.5">
                        {(
                          exp.accomplishments || []
                        ).map(
                          (accomplishment, index) => (
                            <li
                              key={index}
                              className={`font-mono text-base leading-[1.6] flex gap-2 transition-colors duration-300 ${
                                isHovered
                                  ? "text-ink/80"
                                  : "text-ink/60"
                              }`}
                            >
                              <span className="text-cyan mt-0.5">
                                ▸
                              </span>
                              <span>
                                {accomplishment}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}

