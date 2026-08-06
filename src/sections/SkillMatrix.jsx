import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";
import { useSound } from "../hooks/SoundContext.jsx";

const CATEGORIES = ["Languages", "Frameworks", "Drone/Hardware", "Tools"];

function PowerBar({ proficiency }) {
  const segments = 10;
  const filled = Math.round((proficiency / 100) * segments);
  return (
    <div className="flex gap-[3px]" aria-hidden="true">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 border border-ink ${i < filled ? "bg-cyan" : "bg-paper"}`}
        />
      ))}
    </div>
  );
}

function SkillCell({ skill, isOpen, onToggle }) {
  const { playClick } = useSound();
  return (
    <div className="border border-ink">
      <button
        onClick={() => {
          playClick();
          onToggle(skill._id);
        }}
        className="w-full text-left p-4 hover:bg-grid/20 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-display font-bold text-sm">{skill.name}</span>
          <span className="text-xs font-mono text-cyan">{skill.proficiency}%</span>
        </div>
        <PowerBar proficiency={skill.proficiency} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-ink text-paper"
          >
            <div className="p-4 text-xs font-mono space-y-1">
              <p className="text-cyan">CATEGORY: {skill.category.toUpperCase()}</p>
              <p>PROFICIENCY: {skill.proficiency}%</p>
              {skill.usage_context && <p className="text-paper/70 pt-1">{skill.usage_context}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillMatrix({ skills, loading, error, onRetry }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <SectionShell id="skills" index="02" title="Tech Loadout" refNote="SKILL_MATRIX">
      {loading && <SkeletonGrid count={8} className="h-24" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const items = (skills || []).filter((s) => s.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <h3 className="text-xs font-mono tracking-wider text-ink/60 mb-3 border-b border-grid pb-2">
                  {cat.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-3">
                  {items.map((skill) => (
                    <SkillCell key={skill._id} skill={skill} isOpen={openId === skill._id} onToggle={toggle} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}
