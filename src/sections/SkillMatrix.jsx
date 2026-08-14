import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, BookOpen, Layers, Cpu } from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

const NON_LOGO_CATEGORIES = [
  "Languages",
  "Enterprise Systems & QA",
  "Tools",
];

// --- SQUARE LOGO CARD (FOR FRAMEWORKS & CORE TECH) ---
function SquareLogoCard({ skill }) {
  return (
    <div
      className="aspect-square border-2 border-ink/80 bg-paper p-3 md:p-4 group hover:border-cyan hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between rounded-sm relative overflow-hidden"
      style={{ boxShadow: "3px 3px 0 rgba(17, 17, 17, 0.85)" }}
    >
      <div className="flex items-center justify-between border-b border-ink/10 pb-1.5">
        <span className="text-[9px] font-mono text-cyan font-bold tracking-wider uppercase">
          TECH STACK
        </span>
        <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center my-auto space-y-2 text-center p-1">
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-200 filter drop-shadow-sm"
          />
        ) : (
          <Cpu className="w-10 h-10 text-ink/40 group-hover:text-cyan transition-colors" />
        )}
        <h3 className="font-display font-bold text-xs md:text-sm text-ink group-hover:text-cyan transition-colors leading-tight">
          {skill.name}
        </h3>
      </div>

      <p className="text-[9px] md:text-[10px] font-mono text-ink/60 line-clamp-2 text-center">
        {skill.usage_context || "Core technical capability."}
      </p>
    </div>
  );
}

// --- STANDARD NON-LOGO CARD ---
function ComicSkillCard({ skill }) {
  return (
    <div
      className="text-left border-2 border-ink/80 bg-paper p-3.5 group hover:border-cyan hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between min-h-[85px] rounded-sm"
      style={{ boxShadow: "2px 2px 0 rgba(17, 17, 17, 0.85)" }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-display font-semibold text-sm text-ink group-hover:text-cyan transition-colors">
          {skill.name}
        </h3>
        <span className="text-[9px] font-mono text-ink/60 font-semibold px-1 py-0.5 bg-ink/5 border border-ink/20 uppercase shrink-0">
          ACTIVE
        </span>
      </div>

      <p className="text-xs font-mono text-ink/60 truncate">
        {skill.usage_context || "Core production capability."}
      </p>
    </div>
  );
}

// --- UPSKILLING CARD ---
function ComicUpskillCard({ skill }) {
  return (
    <div
      className="text-left border-2 border-ink bg-cyan/5 p-4 group hover:border-cyan hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between rounded-sm"
      style={{ boxShadow: "3px 3px 0 rgba(17, 17, 17, 0.85)" }}
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-ink/10">
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-cyan uppercase tracking-wide">
          <Zap size={12} className="text-cyan fill-cyan" />
          <span>UPSKILLING</span>
        </span>
        <span className="bg-ink text-paper text-[9px] font-mono font-semibold px-1.5 py-0.5 border border-ink uppercase">
          IN PROGRESS
        </span>
      </div>

      <div className="space-y-1 my-1">
        <h3 className="font-display font-bold text-base text-ink group-hover:text-cyan transition-colors">
          {skill.name}
        </h3>
        <p className="text-xs font-mono text-ink/70 leading-relaxed">
          {skill.usage_context || "Actively acquiring certification and technical mastery."}
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-dashed border-ink/15 flex items-center justify-between text-[10px] font-mono text-ink/60">
        <span className="flex items-center gap-1 text-cyan font-semibold">
          <BookOpen size={11} /> CERTIFICATION TRACK
        </span>
        <span className="text-ink/40">ADVANCING</span>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function SkillsMatrix({ skills, loading, error, onRetry }) {
  const learningSkills = (skills || []).filter(
    (s) => s.category === "Currently Learning"
  );
  
  // Filter all items marked with logo OR in "Frameworks & Core Tech" category
  const logoSkills = (skills || []).filter(
    (s) => s.hasLogo || s.category === "Frameworks & Core Tech"
  );

  return (
    <SectionShell id="skills" index="03" title="Tech Loadout" refNote="SKILL_MATRIX">
      {loading && <SkeletonGrid count={8} className="h-24" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="space-y-10">
          
          {/* 1. UPSKILLING & CERTIFICATIONS */}
          {learningSkills.length > 0 && (
            <div
              className="border-2 border-ink bg-paper p-4 md:p-5 space-y-4 rounded-sm"
              style={{ boxShadow: "4px 4px 0 rgba(17, 17, 17, 0.85)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/15 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan uppercase">
                      // CERTIFICATIONS & UPSKILLING
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-ink uppercase tracking-wide flex items-center gap-2">
                    <Award size={16} className="text-cyan" />
                    Target Capability Acquisition
                  </h3>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono px-2 py-0.5 bg-ink text-paper font-semibold tracking-wide uppercase border border-ink">
                  {learningSkills.length} ACTIVE TARGETS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningSkills.map((skill) => (
                  <ComicUpskillCard
                    key={skill._id || skill.name}
                    skill={skill}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 2. LOGO CARDS SECTION (FRAMEWORKS, LANGUAGES, CLOUD, FIRMWARE) */}
          {logoSkills.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-ink/15 pb-1.5">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-cyan" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-ink uppercase">
                    Core Technical Frameworks & Platforms
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-ink/50">
                  [{logoSkills.length}]
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
                {logoSkills.map((skill) => (
                  <SquareLogoCard
                    key={skill._id || skill.name}
                    skill={skill}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. NON-LOGO CARDS BY CATEGORY */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {NON_LOGO_CATEGORIES.map((cat) => {
              const items = (skills || []).filter(
                (s) => s.category === cat && !s.hasLogo
              );
              if (!items.length) return null;

              return (
                <div key={cat} className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-ink/15 pb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan inline-block border border-ink/40" />
                      <h3 className="text-xs font-mono font-bold tracking-wider text-ink uppercase">
                        {cat}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-ink/50">
                      [{items.length}]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {items.map((skill) => (
                      <ComicSkillCard
                        key={skill._id || skill.name}
                        skill={skill}
                      />
                    ))}
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