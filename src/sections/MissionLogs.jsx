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
  const isFeatured = project.featured || project.status === "active";

  return (
    <button
      onClick={() => onOpen(project)}
      className="group text-left border border-ink/20 bg-paper hover:border-cyan hover:shadow-[0_4px_16px_rgba(0,255,255,0.12)] transition-all duration-200 flex flex-col justify-between h-full relative"
    >
      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-ink/40 group-hover:border-cyan transition-colors z-10" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-ink/40 group-hover:border-cyan transition-colors z-10" />

      <div>
        {/* Card Header Metadata */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-ink/10 bg-paper/80 text-[10px] font-mono">
          <span className="text-cyan font-bold tracking-wider">
            //{project.codename || "LOG_ENTRY"}
          </span>
          <span className="text-ink/40 uppercase">
            {CATEGORY_LABEL[project.category] || project.category?.toUpperCase() || "SPEC"}
          </span>
        </div>

        {/* Image / Canvas Header */}
        <div className="h-44 overflow-hidden border-b border-ink/10 relative bg-ink/5">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/30 italic">
              NO_SCHEMATIC_PREVIEW
            </div>
          )}

          {/* Status Badge */}
          <span className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[9px] font-mono font-bold px-2 py-0.5 bg-paper/90 text-ink border border-ink/30 shadow-sm">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isFeatured ? "bg-cyan animate-pulse" : "bg-ink/40"
              }`}
            />
            {isFeatured ? "ACTIVE_DEPLOYMENT" : "DEPL_READY"}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <h3 className="font-display font-bold text-base leading-snug text-ink group-hover:text-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-ink/60 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Card Footer Telemetry */}
      <div className="p-4 pt-0 mt-2 flex items-center justify-between border-t border-ink/5 text-[10px] font-mono text-ink/40">
        <span className="group-hover:text-cyan transition-colors font-bold uppercase tracking-wider">
          OPEN_DOSSIER →
        </span>
        <span>ID: {project._id ? String(project._id).slice(-4) : "0000"}</span>
      </div>
    </button>
  );
}

function ComicCard({ project, onOpen }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="text-left border-[3px] border-ink bg-paper group -skew-y-[0.5deg] hover:skew-y-0 transition-all duration-200 hover:border-cyan"
      style={{ boxShadow: "5px 5px 0 #111111" }}
    >
      <div className="h-44 overflow-hidden border-b-[3px] border-ink relative bg-ink/5">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40">
            [DOSSIER_GRAPHIC]
          </div>
        )}
        <span className="absolute top-2 left-2 bg-cyan text-paper text-[10px] font-mono font-bold px-2 py-0.5 border border-ink uppercase">
          {CATEGORY_LABEL[project.category] || project.category?.toUpperCase()}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <span className="text-[10px] font-mono text-cyan font-bold tracking-widest block uppercase">
          //{project.codename || "FIELD_LOG"}
        </span>
        <h3 className="font-display font-bold text-lg leading-tight text-ink group-hover:text-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-ink/70 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
        <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-cyan">
          <span>INSPECT_DOSSIER</span>
          <span>→</span>
        </div>
      </div>
    </button>
  );
}

function FeaturedRadarCard({ project, onOpen }) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="group relative p-4 border-2 border-cyan bg-cyan/5 hover:bg-cyan/10 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            PRIORITY_MISSION
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 bg-cyan text-paper font-bold uppercase">
            IN_PRODUCTION
          </span>
        </div>

        <span className="text-[10px] font-mono text-ink/40 block mb-1">
          //{project.codename || "FLAGSHIP_SYSTEM"}
        </span>
        <h4 className="font-display text-base font-bold text-ink group-hover:text-cyan transition-colors">
          {project.title}
        </h4>
        <p className="text-xs font-mono text-ink/70 line-clamp-2 mt-1 leading-snug">
          {project.summary}
        </p>
      </div>

      <div className="pt-2 border-t border-cyan/20 flex items-center justify-between text-[10px] font-mono font-bold text-cyan">
        <span>INSPECT_DEPLOYMENT</span>
        <span>→</span>
      </div>
    </div>
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

  const featuredProjects = (projects || []).filter(
    (p) => p.featured || p.status === "active"
  );
  const standardProjects = (projects || []).filter(
    (p) => !p.featured && p.status !== "active"
  );

  return (
    <SectionShell id="projects" index="02" title="Mission Logs" refNote="ACTIVE_DEPLOYMENTS">
      {loading && <SkeletonGrid count={6} className="h-64" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Active Mission / Priority Deployments Banner */}
          {featuredProjects.length > 0 && (
            <div className="border border-cyan/40 bg-cyan/[0.02] p-4 md:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-cyan uppercase block">
                    // TELEMETRY & ACTIVE DEPLOYMENTS
                  </span>
                  <h3 className="text-sm font-bold font-display text-ink uppercase tracking-wide">
                    Flagship & Ongoing Missions
                  </h3>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono px-2 py-1 bg-ink text-paper font-semibold tracking-wider uppercase">
                  {featuredProjects.length} ACTIVE DEPLOYMENTS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProjects.map((project) => (
                  <FeaturedRadarCard
                    key={project._id || project.id || project.title}
                    project={project}
                    onOpen={setActive}
                  />
                ))}
              </div>
            </div>
          )}

          {/* View Mode Switcher Header */}
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
              TOTAL_LOGS: {(projects || []).length}
            </span>
          </div>

          {/* Project Grid View */}
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
              view === "comic" ? "gap-8" : "gap-6"
            }`}
          >
            {(standardProjects.length > 0 ? standardProjects : projects || []).map(
              (project) =>
                view === "schematic" ? (
                  <SchematicCard
                    key={project._id || project.id || project.title}
                    project={project}
                    onOpen={setActive}
                  />
                ) : (
                  <ComicCard
                    key={project._id || project.id || project.title}
                    project={project}
                    onOpen={setActive}
                  />
                )
            )}
          </motion.div>
        </div>
      )}

      <DossierModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}