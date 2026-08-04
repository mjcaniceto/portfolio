import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "command-center:muted";

let sharedCtx = null;
function getContext() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    sharedCtx = new Ctx();
  }
  return sharedCtx;
}

export function useUiSound() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(muted));
  }, [muted]);

  const playTone = useCallback((freq, type, duration, gainPeak = 0.05) => {
    if (mutedRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playClick = useCallback(() => playTone(660, "square", 0.06, 0.04), [playTone]);
  const playHum = useCallback(() => playTone(120, "sine", 0.35, 0.03), [playTone]);
  const playGlitch = useCallback(() => playTone(90, "sawtooth", 0.2, 0.05), [playTone]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { muted, toggleMute, playClick, playHum, playGlitch };
}
