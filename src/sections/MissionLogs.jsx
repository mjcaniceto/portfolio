import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import DossierModal from "../components/DossierModal.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";
import { useSound } from "../hooks/SoundContext.jsx";

const CATEGORY_LABEL = {
  systems: "SYSTEMS",
  web: "WEB",
  hardware: "HARDWARE",
  ai: "AI",
};

function SchematicCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="text-left border border-ink group hover:border-cyan transition-colors"
    >
      <div className="h-44 overflow-hidden border-b border-ink bg-grid/30">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] font-mono text-cyan mb-1">{project.codename}</p>
        <h3 className="font-display font-bold text-lg leading-tight">{project.title}</h3>
        <p className="text-xs font-mono text-ink/60 mt-2 line-clamp-2">{project.summary}</p>
      </div>
    </button>
  );
}

function ComicCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="text-left border-[4px] border-ink group -skew-y-[0.5deg] hover:skew-y-0 transition-transform duration-200"
      style={{ boxShadow: "6px 6px 0 #111111" }}
    >
      <div className="h-44 overflow-hidden border-b-[4px] border-ink relative bg-grid/30">
        {project.image_url && (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        )}
        <span className="absolute top-2 left-2 bg-cyan text-ink text-[10px] font-mono font-bold px-2 py-1 border border-ink">
          {CATEGORY_LABEL[project.category] || project.category?.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg leading-tight">{project.title}</h3>
        <p className="text-xs font-mono text-ink/60 mt-2 line-clamp-2">{project.summary}</p>
        <p className="text-xs font-mono font-bold text-cyan mt-3">DOSSIER →</p>
      </div>
    </button>
  );
}

export default function MissionLogs({ projects, loading, error, onRetry }) {
  const [view, setView] = useState("schematic");
  const [active, setActive] = useState(null);
  const { playClick } = useSound();

  const switchView = (v) => {
    playClick();
    setView(v);
  };

  return (
    <SectionShell id="missions" index="03" title="Mission Logs" refNote="ACTIVE_DEPLOYMENTS">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[10px] font-mono text-ink/50 mr-2">VIEW MODE:</span>
        {["schematic", "comic"].map((v) => (
          <button
            key={v}
            onClick={() => switchView(v)}
            className={`chamfer-sm px-4 py-2 text-xs font-mono border border-ink transition-colors ${
              view === v ? "bg-ink text-paper" : "hover:border-cyan hover:text-cyan"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <SkeletonGrid count={6} className="h-64" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${view === "comic" ? "gap-8" : "gap-6"}`}
        >
          {(projects || []).map((project) =>
            view === "schematic" ? (
              <SchematicCard key={project._id} project={project} onOpen={setActive} />
            ) : (
              <ComicCard key={project._id} project={project} onOpen={setActive} />
            )
          )}
        </motion.div>
      )}

      <DossierModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}
