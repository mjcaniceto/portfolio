import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Camera, X, Eye, Github, Linkedin } from "lucide-react";
import { useSound } from "../hooks/SoundContext.jsx";
import { generateResumePdf } from "../utils/generateResume.js";
import { PROFILE } from "../data/profile.js";

export default function Hero({ experiences, skills, certifications }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const { playClick, playHum } = useSound();

  // Primary lookup for PROFILE.avatar from profile.js, with fallbacks
  const portraitSrc =
    PROFILE?.avatar ||
    PROFILE?.avatar_url ||
    PROFILE?.image ||
    PROFILE?.portrait ||
    "/avatar.jpg";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsPortraitOpen(false);
    };
    if (isPortraitOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isPortraitOpen]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setOffset({ x: (relX - 0.5) * 16, y: (relY - 0.5) * 16 });
    setGlow({ x: relX * 100, y: relY * 100 });
  };

  // const handleDownload = () => {
  //   playHum();
  //   generateResumePdf({
  //     profile: PROFILE,
  //     experiences: experiences || [],
  //     skills: skills || [],
  //     certifications: certifications || [],
  //   });
  // };

  const openPortrait = () => {
    playClick();
    setIsPortraitOpen(true);
  };

  return (
    <section
      id="deck"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-12 pb-16"
    >
      <div
        className="absolute inset-0 blueprint-grid pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial cyan glow following cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(0,209,255,0.10), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Interactive vector grid */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="vector-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#00D1FF"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vector-grid)" />
      </motion.svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Lowkey Tactical Portrait Chip + Location Line */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Clickable Lowkey Portrait Badge */}
          <button
            onClick={openPortrait}
            className="group relative flex items-center gap-2.5 px-2 py-1 bg-paper border border-ink/30 hover:border-cyan transition-all duration-200"
            title="Inspect Operator Photo"
          >
            <div className="relative w-7 h-7 bg-ink/10 overflow-hidden border border-ink/30 group-hover:border-cyan">
              <img
                src={portraitSrc}
                alt={PROFILE.name || "Portrait"}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col text-left font-mono leading-none">
              <span className="text-[9px] text-ink/40 group-hover:text-cyan uppercase">
                [PORTRAIT_DATA]
              </span>
              <span className="text-xs text-ink group-hover:text-cyan font-bold flex items-center gap-1">
                INSPECT <Camera size={10} className="text-cyan" />
              </span>
            </div>
          </button>

          <div className="h-4 w-[1px] bg-ink/20 hidden sm:block" />

          {/* Location status line */}
          <div className="flex items-center gap-3 text-xs font-mono text-ink/80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan animate-radar-pulse" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan" />
            </span>
            LOCATION: MANILA, PHILIPPINES
            <span className="text-ink/40 hidden sm:inline">
              // 65.476721, -173.511416
            </span>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-bold leading-[0.95] tracking-tight text-ink"
          style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)" }}
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-display text-xl md:text-2xl text-cyan mt-4 font-semibold"
        >
          {PROFILE.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="max-w-xl mt-5 text-base text-ink/80"
        >
          {PROFILE.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#projects"
            onClick={playClick}
            className="chamfer bg-ink text-paper px-6 py-3 text-sm font-mono font-semibold flex items-center gap-2 hover:bg-cyan hover:text-ink transition-colors"
          >
            EXPLORE <ArrowDown size={14} />
          </a>
          {/* <button
            onClick={handleDownload}
            className="chamfer border border-ink px-6 py-3 text-sm font-mono font-semibold flex items-center gap-2 hover:border-cyan hover:text-cyan transition-colors"
          >
            DOWNLOAD RESUME <Download size={14} />
          </button> */}

          {/* GitHub */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            aria-label="GitHub"
            title="GitHub"
            className="group w-11 h-11 flex items-center justify-center border border-ink bg-paper text-ink hover:bg-ink hover:text-paper hover:border-ink transition-all duration-200 chamfer"
          >
            <Github
              size={20}
              strokeWidth={1.8}
              className="group-hover:scale-110 transition-transform"
            />
          </a>

          {/* LinkedIn */}
          <a
            href={PROFILE.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            aria-label="LinkedIn"
            title="LinkedIn"
            className="group w-11 h-11 flex items-center justify-center border border-ink bg-paper text-ink hover:bg-cyan hover:text-ink hover:border-cyan transition-all duration-200 chamfer"
          >
            <Linkedin
              size={20}
              strokeWidth={1.8}
              className="group-hover:scale-110 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-4 sm:right-6 text-[10px] font-mono text-ink/40 hidden sm:block">
        GRID_STABLE // SECTOR_23
      </div>

      {/* On-Demand Tactical Lightbox Modal */}
      <AnimatePresence>
        {isPortraitOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPortraitOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-paper/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-paper border-2 border-ink p-5 shadow-[10px_10px_0px_0px_rgba(0,209,255,1)] chamfer"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-ink/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan animate-pulse" />
                  <span className="font-mono text-xs font-bold text-ink uppercase tracking-widest">
                    OPERATOR_PORTRAIT // DOSSIER
                  </span>
                </div>
                <button
                  onClick={() => setIsPortraitOpen(false)}
                  className="p-1 border border-ink hover:border-cyan hover:text-cyan transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Image Frame */}
              <div className="relative border border-ink bg-ink/5 p-1">
                <img
                  src={portraitSrc}
                  alt={PROFILE.name}
                  className="w-full max-h-[60vh] object-cover border border-ink/20"
                />
              </div>

              {/* Footer Specs */}
              <div className="mt-4 flex flex-col gap-1 font-mono text-xs border-t border-ink/20 pt-3 text-ink/80">
                <div className="flex justify-between">
                  <span className="text-ink/50">NAME:</span>
                  <span className="font-bold">{PROFILE.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/50">ROLE:</span>
                  <span className="text-cyan font-bold">{PROFILE.title}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}