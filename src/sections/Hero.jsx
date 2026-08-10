import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useSound } from "../hooks/SoundContext.jsx";
import { generateResumePdf } from "../utils/generateResume.js";
import { PROFILE } from "../data/profile.js";

export default function Hero({ experiences, skills, certifications }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const { playClick, playHum } = useSound();

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setOffset({ x: (relX - 0.5) * 16, y: (relY - 0.5) * 16 });
    setGlow({ x: relX * 100, y: relY * 100 });
  };

  const handleDownload = () => {
    playHum();
    generateResumePdf({
      profile: PROFILE,
      experiences: experiences || [],
      skills: skills || [],
      certifications: certifications || [],
    });
  };

  return (
    <section
      id="deck"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-12"
    >
      <div className="absolute inset-0 blueprint-grid pointer-events-none" aria-hidden="true" />

      {/* Radial cyan glow following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(0,209,255,0.10), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Interactive vector grid, translates toward cursor */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="vector-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#00D1FF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vector-grid)" />
      </motion.svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center gap-3 mb-6 text-xs font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan animate-radar-pulse" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan" />
          </span>
          LOCATION: MANILIA, PHILIPPINES
          <span className="text-ink/40">// 65.476721, -173.511416</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-bold leading-[0.95] tracking-tight"
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
            VIEW MISSION LOGS <ArrowDown size={14} />
          </a>
          <button
            onClick={handleDownload}
            className="chamfer border border-ink px-6 py-3 text-sm font-mono font-semibold flex items-center gap-2 hover:border-cyan hover:text-cyan transition-colors"
          >
            DOWNLOAD RESUME <Download size={14} />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-4 sm:right-6 text-[10px] font-mono text-ink/40 hidden sm:block">
        GRID_STABLE // SECTOR_23
      </div>
    </section>
  );
}
