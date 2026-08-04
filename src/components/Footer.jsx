import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/profile.js";

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export default function Footer() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const formatUptime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="font-display font-bold text-2xl mb-3">Ready for the next mission.</h3>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-block text-cyan text-sm font-mono border border-cyan px-4 py-2 hover:bg-cyan hover:text-ink transition-colors"
            >
              {PROFILE.email}
            </a>
          </div>

          <div>
            <p className="text-[10px] font-mono text-paper/50 mb-3">CHANNEL LINKS</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/example"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-cyan transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-cyan transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="hover:text-cyan transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="text-[10px] font-mono text-paper/60 space-y-1">
            <p>BUILD: {BUILD_DATE}</p>
            <p>UPTIME: {formatUptime(uptime)}</p>
            <p>SECTOR: 07</p>
            <p className="text-cyan">STATUS: OPERATIONAL</p>
          </div>
        </div>

        <div className="border-t border-paper/20 pt-6 text-[10px] font-mono text-paper/40 flex flex-wrap justify-between gap-2">
          <span>REF_NO: COMMAND-CENTER-01</span>
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
