import React from "react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

const CATEGORIES = [
  "Languages",
  "Frameworks & Runtime",
  "Enterprise Systems & QA",
  "Tools",
  "Currently Learning",
];

// Different mechanism than the bar/expand version: proficiency is encoded as
// type size and weight instead of a segmented bar. A skimmer reads the
// biggest, boldest words in each column first — which is also, by design,
// your strongest skill in that category. No click, no legend to decode
// beyond "bigger = stronger," and the exact number is still there in-line
// for anyone who wants precision.

function tierClasses(proficiency) {
  if (proficiency >= 90) return "text-xl font-bold text-ink";
  if (proficiency >= 75) return "text-base font-bold text-ink";
  if (proficiency >= 60) return "text-sm font-semibold text-ink/80";
  return "text-xs font-medium text-ink/50";
}

function SkillTag({ skill }) {
  return (
    <span
      title={skill.usage_context || undefined}
      className={`font-display leading-none cursor-default ${tierClasses(skill.proficiency)}`}
    >
      {skill.name}
      <sup className="ml-0.5 text-[9px] font-mono font-normal text-cyan align-super">
        {skill.proficiency}
      </sup>
    </span>
  );
}

function LearningTag({ skill }) {
  return (
    <span
      title={skill.usage_context || undefined}
      className="text-xs font-mono border border-dashed border-ink/50 text-ink/70 px-2 py-1 cursor-default"
    >
      + {skill.name}
    </span>
  );
}

export default function SkillMatrix({ skills, loading, error, onRetry }) {
  return (
    <SectionShell id="skills" index="03" title="Tech Loadout" refNote="SKILL_MATRIX">
      {loading && <SkeletonGrid count={8} className="h-24" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}
      {!loading && !error && (
        <>
          <p className="text-[10px] font-mono tracking-wider text-ink/40 mb-6">
            SIZE = PROFICIENCY · SUPERSCRIPT = %
          </p>
          <div className="flex flex-col gap-8">
            {CATEGORIES.map((cat) => {
              const items = (skills || [])
                .filter((s) => s.category === cat)
                .sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));
              if (!items.length) return null;
              const isLearning = cat === "Currently Learning";
              return (
                <div key={cat} className="border-b border-grid pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-xs font-mono tracking-wider text-cyan mb-3">
                    {cat.toUpperCase()}
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    {items.map((skill) =>
                      isLearning ? (
                        <LearningTag key={skill._id} skill={skill} />
                      ) : (
                        <SkillTag key={skill._id} skill={skill} />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </SectionShell>
  );
}
