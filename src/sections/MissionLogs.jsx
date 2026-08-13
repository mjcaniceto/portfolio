import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import DossierModal from "../components/DossierModal.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";
import { useSound } from "../hooks/SoundContext.jsx";

function SchematicCard({ project, index, onOpen }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(project)}
      className="group relative bg-white text-left flex flex-col border border-[#111111] shadow-sm"
    >
      <div className="relative aspect-[4/3] border-b border-[#111111] overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
          />
        ) : (
          <div className="absolute inset-0 blueprint-grid-fine" />
        )}

        <div className="absolute top-2 left-2 font-mono text-[9px] tracking-widest bg-white/90 px-1.5 py-0.5 border border-[#111111]">
          {project.codename || `PRJ-${String(index + 1).padStart(2, "0")}`}
        </div>

        <div className="absolute bottom-2 right-2 font-mono text-[9px] tracking-widest bg-white/90 px-1.5 py-0.5 border border-[#111111]">
          {project.callout || "1:1 SCALE"}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col bg-white">
        <h3 className="font-heading font-bold text-lg tracking-tight2 group-hover:text-cyan-accent transition-colors">
          {project.title}
        </h3>

        <p className="mt-1 font-body text-xs leading-[1.6] text-muted-foreground flex-1">
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {(project.tech_stack || project.techStack || [])
            .slice(0, 3)
            .map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] tracking-widest border border-border px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </motion.button>
  );
}

export default function MissionLogs({
  projects,
  loading,
  error,
  onRetry,
}) {
  const [active, setActive] = useState(null);
  const { playClick } = useSound();

  return (
    <SectionShell
      id="projects"
      index="02"
      title="Mission Logs"
      refNote="ACTIVE_DEPLOYMENTS"
    >
      {loading && <SkeletonGrid count={6} className="h-64" />}

      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <motion.div
          layout
          className="grid gap-4 md:gap-6 md:grid-cols-3"
        >
          {(projects || []).map((project, index) => (
            <SchematicCard
              key={
                project._id ||
                project.id ||
                project.title
              }
              project={project}
              index={index}
              onOpen={(selected) => {
                playClick();
                setActive(selected);
              }}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {active && (
          <DossierModal
            project={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </SectionShell>
  );
}