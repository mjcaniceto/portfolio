import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "command-center:muted";

let sharedCtx = null;
function getContext() {
  if (typeof window === "undefined") return null; // Guard clause for SSR (Server-Side Rendering)
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext; // Handles cross-browser compatibility (Safari/Chrome)
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

  // Persist mute setting to browser localStorage whenever `muted` state changes
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(muted));
  }, [muted]);

  const playTone = useCallback((freq, type, duration, gainPeak = 0.05) => {
    if (mutedRef.current) return; // Exit immediately if user muted audio
    
    const ctx = getContext();
    if (!ctx) return;
    
    // Browsers suspend AudioContext until the first user interaction (click/keypress)
    if (ctx.state === "suspended") ctx.resume();

    // Create an Oscillator (Sound Wave Generator) & Gain Node (Volume Controller)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type; // "square", "sine", or "sawtooth" wave types
    osc.frequency.value = freq; // Pitch frequency in Hertz (Hz)

    // Smooth envelope attack and decay to eliminate harsh audio pops/clicks
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    // Connect nodes: Oscillator -> Volume Gain -> Speaker Destination
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration); // Self-terminates after duration
  }, []);

  // Pre-configured tactical sound presets built on `playTone`
  const playClick = useCallback(() => playTone(660, "square", 0.06, 0.04), [playTone]);
  const playHum = useCallback(() => playTone(120, "sine", 0.35, 0.03), [playTone]);
  const playGlitch = useCallback(() => playTone(90, "sawtooth", 0.2, 0.05), [playTone]);

  // Toggle function for mute state
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { muted, toggleMute, playClick, playHum, playGlitch };
}