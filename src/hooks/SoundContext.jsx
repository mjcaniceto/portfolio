import React, { createContext, useContext } from "react";
import { useUiSound } from "./useUiSound.js";

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const sound = useUiSound();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}
