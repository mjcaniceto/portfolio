import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ZoomIn } from "lucide-react";

export default function DossierModal({ project, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle ESC key: close lightbox first if open, otherwise close dossier modal
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose, selectedImage]);

  // Reset selected image if the active project changes
  useEffect(() => {
    setSelectedImage(null);
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* Dossier Card Container */}
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
            {/* Header */}
            <div className="sticky top-0 z-10 bg-paper border-b border-ink px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono text-cyan">
                  {project.codename || "DOSSIER"}
                </p>
                <h3 className="font-display font-bold text-2xl">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close dossier"
                className="border border-ink p-2 hover:border-cyan hover:text-cyan transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-5 text-sm">
              {/* Main Thumbnail */}
              {project.thumbnail && (
                <div
                  onClick={() =>
                    setSelectedImage({
                      url: project.thumbnail,
                      label: "PRIMARY THUMBNAIL",
                    })
                  }
                  className="relative group cursor-pointer border border-ink overflow-hidden"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-100 sm:h-100 object-contain grayscale contrast-125 group-hover:scale-[1.01] transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-paper text-xs font-mono font-bold bg-ink/40">
                    <ZoomIn size={18} /> CLICK TO INSPECT
                  </div>
                </div>
              )}

              {/* Visual Archive (Thumbnails Grid) */}
              {project.images?.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-ink pb-1.5">
                    <p className="text-[10px] font-mono text-ink/50">
                      VISUAL ARCHIVE [CLICK TO ENLARGE]
                    </p>

                    <p className="text-[10px] font-mono text-ink/40">
                      {String(project.images.length).padStart(2, "0")} FILES
                    </p>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {project.images.map((image, index) => {
                      const imgLabel = `IMG_${String(index + 1).padStart(2, "0")}`;
                      return (
                        <button
                          key={`${project.id}-image-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedImage({
                              url: image,
                              label: imgLabel,
                            })
                          }
                          className="relative shrink-0 w-28 sm:w-36 border border-ink bg-paper group overflow-hidden hover:border-cyan transition-colors text-left focus:outline-none"
                        >
                          <img
                            src={image}
                            alt={`${project.title} archive image ${index + 1}`}
                            className="w-full h-16 sm:h-20 object-cover grayscale contrast-125 group-hover:contrast-100 group-hover:grayscale-0 transition-all duration-200"
                          />

                          {/* Hover Overlay Hint */}
                          <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-paper">
                            <ZoomIn size={16} />
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 bg-ink/90 text-paper px-1.5 py-0.5 flex justify-between items-center">
                            <span className="text-[8px] font-mono">
                              {imgLabel}
                            </span>
                            <span className="text-[7px] font-mono text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                              INSPECT
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Objective */}
              <div>
                <p className="text-[10px] font-mono text-ink/50 mb-1">
                  OBJECTIVE
                </p>
                <p className="text-ink/90">
                  {project.objective || project.summary}
                </p>
              </div>

              {/* Tech Stack */}
              {!!(project.stack || []).length && (
                <div>
                  <p className="text-[10px] font-mono text-ink/50 mb-2">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono border border-ink px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chamfer-sm bg-ink text-paper px-4 py-2 text-xs font-mono flex items-center gap-2 hover:bg-cyan hover:text-ink transition-colors"
                  >
                    <Github size={14} /> SOURCE
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
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

          {/* Lightbox / Expanded Image Inspection Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-ink/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  className="relative max-w-5xl w-full bg-paper border-2 border-ink p-2 sm:p-4 chamfer shadow-2xl space-y-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Lightbox Header Bar */}
                  <div className="flex items-center justify-between border-b border-ink pb-2 px-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-cyan animate-pulse" />
                      <p className="text-xs font-mono text-cyan uppercase tracking-wider">
                        FULL-RES INSPECTION // {selectedImage.label}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="border border-ink p-1 hover:border-cyan hover:text-cyan transition-colors"
                      aria-label="Close enlarged image view"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Lightbox Image View Container */}
                  <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-paper/50 p-2">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.label}
                      className="max-w-full max-h-[70vh] object-contain border border-ink/30"
                    />
                  </div>

                  {/* Lightbox Footer Bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-ink/60 border-t border-ink pt-2 px-1">
                    <span>STATUS: ACTIVE INSPECTION</span>
                    <span>PRESS [ESC] OR CLICK OUTSIDE TO RETURN</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}