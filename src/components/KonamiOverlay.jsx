import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const HOTSPOTS = [
  {
    id: "spot-1",
    x: 28,
    y: 32,
    label: "PAYLOAD BAY",
    secret:
      "Top Secret // Bench-tested a swappable payload bay that lets the perimeter drone carry a thermal camera or a speaker module. Never shipped — thermal unit was back-ordered for four months.",
  },
  {
    id: "spot-2",
    x: 62,
    y: 22,
    label: "COMMS ARRAY",
    secret:
      "Top Secret // Prototyped mesh-networking between drones so the fleet could keep talking even if the ground station dropped. Shelved after two of three units bricked during flash testing.",
  },
  {
    id: "spot-3",
    x: 50,
    y: 68,
    label: "LANDING GEAR",
    secret:
      "Top Secret // Spring-loaded landing gear designed to absorb a hard landing on gravel. Worked great until it caught on a root and did one very undignified cartwheel.",
  },
];

export default function KonamiOverlay({ active, glitching, onClose }) {
  const [openSpot, setOpenSpot] = useState(null);

  const handleClose = () => {
    setOpenSpot(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[100] bg-paper flex items-center justify-center p-6 ${
            glitching ? "animate-glitch" : ""
          }`}
        >
          <button
            onClick={handleClose}
            aria-label="Close easter egg"
            className="absolute top-6 right-6 border border-ink p-2 hover:border-cyan hover:text-cyan transition-colors z-10"
          >
            <X size={18} />
          </button>

          <div className="absolute top-6 left-6 text-[10px] font-mono text-cyan">
            CLASSIFIED // ACCESS GRANTED
          </div>

          <div className="relative w-full max-w-3xl aspect-[4/3]">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <rect width="400" height="300" fill="none" stroke="#E5E7EB" strokeWidth="1" />
              {/* Drone wireframe */}
              <g stroke="#111111" strokeWidth="1.5" fill="none">
                <circle cx="200" cy="150" r="26" />
                <line x1="200" y1="124" x2="200" y2="100" />
                <line x1="200" y1="176" x2="200" y2="200" />
                <line x1="174" y1="150" x2="150" y2="150" />
                <line x1="226" y1="150" x2="250" y2="150" />
                <circle cx="200" cy="90" r="14" strokeDasharray="2 2" />
                <circle cx="200" cy="210" r="14" strokeDasharray="2 2" />
                <circle cx="140" cy="150" r="14" strokeDasharray="2 2" />
                <circle cx="260" cy="150" r="14" strokeDasharray="2 2" />
              </g>
              <text x="200" y="270" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#00A3C4">
                UNIT SCHEMATIC — REF: DRN-000
              </text>
            </svg>

            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setOpenSpot(spot)}
                aria-label={`Reveal ${spot.label}`}
                className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan bg-paper hover:bg-cyan transition-colors"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <span className="sr-only">{spot.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {openSpot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-ink text-paper border border-cyan p-5"
              >
                <p className="text-[10px] font-mono text-cyan mb-2">{openSpot.label}</p>
                <p className="text-xs font-mono leading-relaxed text-paper/85">{openSpot.secret}</p>
                <button
                  onClick={() => setOpenSpot(null)}
                  className="mt-3 text-[10px] font-mono text-cyan hover:underline"
                >
                  DISMISS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
