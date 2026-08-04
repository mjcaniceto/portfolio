import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, XCircle } from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { useSound } from "../hooks/SoundContext.jsx";
import { api } from "../api/client.js";
import { PROFILE } from "../data/profile.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null);
  const { playClick, playHum } = useSound();

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const showToast = (kind, text) => {
    setToast({ kind, text });
    window.setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setStatus("sending");
    try {
      await api.postContact(form);
      playHum();
      setStatus("success");
      showToast("success", "TRANSMISSION RECEIVED");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      showToast("error", err.message ? `TRANSMISSION FAILED — ${err.message}` : "TRANSMISSION FAILED");
    } finally {
      window.setTimeout(() => setStatus("idle"), 1200);
    }
  };

  return (
    <SectionShell id="contact" index="07" title="Contact" refNote="OPEN_CHANNEL">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: direct line */}
        <div className="border border-ink p-6 flex flex-col gap-6">
          <div>
            <p className="text-[10px] font-mono text-ink/50 mb-2">DIRECT LINE</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-display font-bold text-xl md:text-2xl flex items-center gap-3 hover:text-cyan transition-colors break-all"
            >
              <Mail size={20} className="shrink-0" /> {PROFILE.email}
            </a>
          </div>

          <p className="text-sm text-ink/70">{PROFILE.availability}</p>

          <div className="border border-grid p-4 text-xs font-mono space-y-2 mt-auto">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan animate-radar-pulse" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              CHANNEL STATUS: OPEN
            </div>
            <div>RESPONSE WINDOW: &lt; 24H</div>
            <div>SECURITY: END-TO-END</div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-[10px] font-mono text-ink/50 mb-1">
              CALLSIGN
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update("name")}
              className="w-full border border-ink px-3 py-2.5 text-sm font-mono bg-paper focus:outline-none focus:border-cyan"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[10px] font-mono text-ink/50 mb-1">
              RELAY ADDR
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              className="w-full border border-ink px-3 py-2.5 text-sm font-mono bg-paper focus:outline-none focus:border-cyan"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-[10px] font-mono text-ink/50 mb-1">
              SUBJECT HEADER
            </label>
            <input
              id="subject"
              value={form.subject}
              onChange={update("subject")}
              className="w-full border border-ink px-3 py-2.5 text-sm font-mono bg-paper focus:outline-none focus:border-cyan"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[10px] font-mono text-ink/50 mb-1">
              PAYLOAD
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              className="w-full border border-ink px-3 py-2.5 text-sm font-mono bg-paper focus:outline-none focus:border-cyan resize-none"
              placeholder="Your message"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="chamfer bg-ink text-paper px-6 py-3.5 text-sm font-mono font-semibold flex items-center justify-center gap-2 hover:bg-cyan hover:text-ink transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "TRANSMITTING…" : "TRANSMIT MESSAGE →"}
            {status !== "sending" && <Send size={14} />}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-[80] border px-4 py-3 text-xs font-mono font-bold flex items-center gap-2 bg-paper ${
              toast.kind === "success" ? "border-cyan text-cyan" : "border-incident text-incident"
            }`}
          >
            {toast.kind === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
