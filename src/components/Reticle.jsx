import React, { useEffect, useRef, useState } from "react";

export default function Reticle() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip on touch-primary devices — a mouse-follow reticle doesn't apply.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none hidden md:block"
      style={{ mixBlendMode: "difference" }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <line x1="14" y1="0" x2="14" y2="9" stroke="#00D1FF" strokeWidth="1" />
          <line x1="14" y1="19" x2="14" y2="28" stroke="#00D1FF" strokeWidth="1" />
          <line x1="0" y1="14" x2="9" y2="14" stroke="#00D1FF" strokeWidth="1" />
          <line x1="19" y1="14" x2="28" y2="14" stroke="#00D1FF" strokeWidth="1" />
          <circle cx="14" cy="14" r="1.4" fill="#00D1FF" />
        </svg>
        <div
          className="absolute left-4 top-4 whitespace-nowrap text-[9px] font-mono px-1"
          style={{ color: "#00D1FF" }}
        >
          X:{String(Math.round(pos.x)).padStart(4, "0")} Y:{String(Math.round(pos.y)).padStart(4, "0")}
        </div>
      </div>
    </div>
  );
}
