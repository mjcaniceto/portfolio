import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";
import { useSound } from "../hooks/SoundContext.jsx";

const BADGE_STYLE = {
  "field-note": "bg-ink text-paper",
  release: "bg-cyan text-ink",
  incident: "bg-incident text-paper",
  insight: "bg-link text-paper",
};

const BADGE_LABEL = {
  "field-note": "FIELD NOTE",
  release: "RELEASE",
  incident: "INCIDENT",
  insight: "INSIGHT",
};

function DispatchCard({ post }) {
  const [open, setOpen] = useState(false);
  const { playClick, playHum } = useSound();

  const toggle = () => {
    playClick();
    if (!open) playHum();
    setOpen((o) => !o);
  };

  return (
    <div className="border border-ink">
      <button onClick={toggle} className="w-full text-left p-5 hover:bg-grid/20 transition-colors" aria-expanded={open}>
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[10px] font-mono font-bold px-2 py-1 ${BADGE_STYLE[post.category]}`}>
            {BADGE_LABEL[post.category]}
          </span>
          <span className="text-[10px] font-mono text-ink/50">{post.date_label}</span>
        </div>
        <h3 className="font-display font-bold text-lg leading-tight mb-2">{post.title}</h3>
        <p className="text-sm text-ink/70 mb-3">{post.excerpt}</p>
        <div className="flex justify-between items-center text-[10px] font-mono text-ink/50">
          <span>{post.tag}</span>
          <span className="text-cyan font-bold">
            {post.read_time} MIN READ · {open ? "COLLAPSE ←" : "DECODE →"}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-ink text-paper"
          >
            <div className="p-5 text-sm leading-relaxed">
              <p className="text-[10px] font-mono text-cyan mb-3">PAYLOAD</p>
              <p className="text-paper/85">{post.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Dispatch({ posts, loading, error, onRetry }) {
  return (
    <SectionShell id="dispatch" index="06" title="Dispatch" refNote="QUICK_UPDATES">
      {loading && <SkeletonGrid count={4} className="h-40" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(posts || []).map((post) => (
            <DispatchCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
