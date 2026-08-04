import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

export default function DossierModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Mission dossier: ${project.title}`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-paper border border-ink max-w-3xl w-full max-h-[85vh] overflow-y-auto chamfer"
          >
            <div className="sticky top-0 bg-paper border-b border-ink px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono text-cyan">{project.codename || "DOSSIER"}</p>
                <h3 className="font-display font-bold text-2xl">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close dossier"
                className="border border-ink p-2 hover:border-cyan hover:text-cyan transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-56 object-cover border border-ink grayscale contrast-125"
                />
              )}

              <div>
                <p className="text-[10px] font-mono text-ink/50 mb-1">OBJECTIVE</p>
                <p className="text-ink/90">{project.objective || project.summary}</p>
              </div>

              {!!(project.tech_stack || []).length && (
                <div>
                  <p className="text-[10px] font-mono text-ink/50 mb-2">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((t) => (
                      <span key={t} className="text-xs font-mono border border-ink px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chamfer-sm bg-ink text-paper px-4 py-2 text-xs font-mono flex items-center gap-2 hover:bg-cyan hover:text-ink transition-colors"
                  >
                    <Github size={14} /> SOURCE
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chamfer-sm border border-ink px-4 py-2 text-xs font-mono flex items-center gap-2 hover:border-cyan hover:text-cyan transition-colors"
                  >
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
