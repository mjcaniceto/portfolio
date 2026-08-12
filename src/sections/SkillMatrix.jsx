import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";
import { useSound } from "../hooks/SoundContext.jsx";

const CATEGORIES = [
  "Languages",
  "Frameworks & Runtime",
  "Enterprise Systems & QA",
  "Tools",
  "Currently Learning",
];

// --- SCHEMATIC VIEW CARDS ---

function SchematicSkillCard({ skill }) {
  return (
    <div className="group text-left border border-ink/20 bg-paper p-3 hover:border-cyan hover:shadow-[0_4px_16px_rgba(0,255,255,0.12)] transition-all duration-200 flex flex-col justify-between relative min-h-[80px]">
      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-ink/40 group-hover:border-cyan transition-colors z-10" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-ink/40 group-hover:border-cyan transition-colors z-10" />

      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-display font-bold text-sm text-ink group-hover:text-cyan transition-colors leading-tight">
          {skill.name}
        </span>
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-paper/90 text-ink/70 border border-ink/20 shrink-0">
          VERIFIED
        </span>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-ink/50 border-t border-ink/5 pt-2 mt-auto">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          READY
        </span>
        {skill.usage_context && (
          <span className="truncate max-w-[120px] text-right text-ink/40 group-hover:text-ink/70">
            {skill.usage_context}
          </span>
        )}
      </div>
    </div>
  );
}

function SchematicLearningCard({ skill }) {
  return (
    <div className="relative p-3.5 border-2 border-cyan bg-cyan/5 hover:bg-cyan/10 transition-all space-y-2 flex flex-col justify-between min-h-[90px]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
          ACTIVE_UPSKILLING
        </span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan text-paper font-bold uppercase">
          IN PROGRESS
        </span>
      </div>

      <h4 className="font-display text-sm font-bold text-ink">
        {skill.name}
      </h4>

      <p className="text-[11px] font-mono text-ink/70 leading-snug">
        {skill.usage_context || "Expanding core competency and modern stack mastery."}
      </p>
    </div>
  );
}

// --- COMIC VIEW CARDS ---

function ComicSkillCard({ skill }) {
  return (
    <div
      className="text-left border-[3px] border-ink bg-paper p-3.5 group -skew-y-[0.5deg] hover:skew-y-0 transition-all duration-200 hover:border-cyan flex flex-col justify-between min-h-[85px]"
      style={{ boxShadow: "4px 4px 0 #111111" }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display font-bold text-base leading-tight text-ink group-hover:text-cyan transition-colors">
          {skill.name}
        </h3>
        <span className="bg-cyan text-paper text-[9px] font-mono font-bold px-1.5 py-0.5 border border-ink uppercase shrink-0">
          ACTIVE
        </span>
      </div>

      <p className="text-xs font-mono text-ink/70 truncate">
        {skill.usage_context || "Core production capability."}
      </p>
    </div>
  );
}

function ComicLearningCard({ skill }) {
  return (
    <div
      className="text-left border-[3px] border-ink bg-cyan/10 p-3.5 group -skew-y-[0.5deg] hover:skew-y-0 transition-all duration-200 hover:border-cyan flex flex-col justify-between min-h-[85px]"
      style={{ boxShadow: "4px 4px 0 #111111" }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono font-bold text-cyan uppercase tracking-wider">
          ⚡ ACQUISITION
        </span>
        <span className="bg-ink text-paper text-[9px] font-mono font-bold px-1.5 py-0.5 border border-ink uppercase">
          IN_PROGRESS
        </span>
      </div>

      <h3 className="font-display font-bold text-base leading-tight text-ink group-hover:text-cyan transition-colors">
        {skill.name}
      </h3>

      <p className="text-xs font-mono text-ink/80 line-clamp-1 mt-1">
        {skill.usage_context || "Expanding core competency."}
      </p>
    </div>
  );
}

// --- MAIN COMPONENT ---

export default function SkillMatrix({ skills, loading, error, onRetry }) {
  const [view, setView] = useState("schematic");
  const { playClick } = useSound();

  const switchView = (v) => {
    if (playClick) playClick();
    setView(v);
  };

  const learningSkills = (skills || []).filter(
    (s) => s.category === "Currently Learning"
  );
  const coreCategories = CATEGORIES.filter(
    (cat) => cat !== "Currently Learning"
  );

  return (
    <SectionShell id="skills" index="03" title="Tech Loadout" refNote="SKILL_MATRIX">
      {loading && <SkeletonGrid count={8} className="h-24" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Active Upskilling Radar Banner (Matches Priority Mission Banner) */}
          {learningSkills.length > 0 && (
            <div className="border border-cyan/40 bg-cyan/[0.02] p-4 md:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-cyan uppercase block">
                    // GROWTH ENGINE & CONTINUOUS LEARNING
                  </span>
                  <h3 className="text-sm font-bold font-display text-ink uppercase tracking-wide">
                    Active Capability Acquisition
                  </h3>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono px-2 py-1 bg-ink text-paper font-semibold tracking-wider uppercase">
                  {learningSkills.length} RADAR TARGETS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningSkills.map((skill) =>
                  view === "schematic" ? (
                    <SchematicLearningCard
                      key={skill._id || skill.name}
                      skill={skill}
                    />
                  ) : (
                    <ComicLearningCard
                      key={skill._id || skill.name}
                      skill={skill}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* View Mode Switcher Header (Identical control bar to MissionLogs.jsx) */}
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-ink/40 uppercase tracking-widest mr-2">
                VIEW_MODULE:
              </span>
              {["schematic", "comic"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className={`text-xs font-mono px-3 py-1 border transition-all ${
                    view === v
                      ? "border-cyan bg-cyan text-paper font-bold"
                      : "border-ink/30 text-ink/70 hover:border-ink hover:text-ink"
                  }`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-mono text-ink/40 hidden sm:inline-block">
              VERIFIED_CAPABILITIES: {(skills || []).length}
            </span>
          </div>

          {/* Category-by-Category Skills Grid */}
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {coreCategories.map((cat) => {
              const items = (skills || []).filter((s) => s.category === cat);
              if (!items.length) return null;

              return (
                <div key={cat} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan" />
                      <h3 className="text-xs font-mono font-bold tracking-widest text-ink uppercase">
                        {cat}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-ink/40">
                      [{items.length}]
                    </span>
                  </div>

                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${
                      view === "comic" ? "gap-4" : "gap-3"
                    }`}
                  >
                    {items.map((skill) =>
                      view === "schematic" ? (
                        <SchematicSkillCard
                          key={skill._id || skill.name}
                          skill={skill}
                        />
                      ) : (
                        <ComicSkillCard
                          key={skill._id || skill.name}
                          skill={skill}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </SectionShell>
  );
}