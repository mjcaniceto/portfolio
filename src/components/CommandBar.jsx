import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Menu, X, Crosshair } from "lucide-react";
import { useSound } from "../hooks/SoundContext.jsx";

const NAV = [
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "FLIGHT PATH", href: "#flight-path" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "UPDATES", href: "#updates" },
  { label: "CONTACT", href: "#contact" },
];

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString("en-US", { hour12: false });
}

export default function CommandBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { muted, toggleMute, playClick } = useSound();
  const clock = useClock();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => {
    playClick();
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-12 bg-paper/95 backdrop-blur-sm border-b ${
        scrolled ? "border-cyan" : "border-ink"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <a
          href="#deck"
          onClick={handleNavClick}
          className="flex items-center gap-2 font-display font-bold text-sm tracking-tight"
        >
          <Crosshair size={16} className="text-cyan" strokeWidth={2.5} />
          COMMAND_CENTER
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wide">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="hover:text-cyan transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs font-mono text-ink/70 tabular-nums">{clock} LT</span>
          <button
            aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"}
            onClick={() => {
              toggleMute();
            }}
            className="hover:text-cyan transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            aria-label="Toggle navigation menu"
            className="lg:hidden hover:text-cyan transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden absolute top-12 left-0 right-0 bg-paper border-b border-ink flex flex-col text-xs font-mono">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="px-4 py-3 border-b border-grid hover:text-cyan hover:bg-grid/20 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
