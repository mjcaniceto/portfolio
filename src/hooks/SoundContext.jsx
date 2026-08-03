import React, { createContext, useContext } from "react";
import { useUiSound } from "./useUiSound.js";

// ==========================================================================
// ENGINEERING NOTE: REACT CONTEXT INITIALIZATION
// Why null default value: Standard pattern when context values are populated 
// dynamically via a Provider higher up in the component tree.
// ==========================================================================
const SoundContext = createContext(null);

/* ==========================================================================
   ENGINEERING NOTE: SOUND PROVIDER COMPONENT
   Why coded here: Wraps around the main app inside `App.jsx` or `main.jsx`.
   It runs `useUiSound()` ONCE at the root level and exposes the return values 
   (playClick, playHum, muted, etc.) to all nested children.
   ========================================================================== */
export function SoundProvider({ children }) {
  const sound = useUiSound();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

/* ==========================================================================
   ENGINEERING NOTE: CUSTOM CONSUMER HOOK
   Why coded this way: Rather than calling `useContext(SoundContext)` in every file, 
   components call `useSound()`.
   Why the error throw check: If a developer tries to use `useSound()` in a 
   component that isn't wrapped inside `<SoundProvider>`, React will throw 
   a helpful developer error explaining exactly what went wrong.
   ========================================================================== */
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}