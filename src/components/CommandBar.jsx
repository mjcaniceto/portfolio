import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Menu, X, Crosshair } from "lucide-react"; // Lightweight SVG icon engine
import { useSound } from "../hooks/SoundContext.jsx"; // Custom hook for audio effects

const NAV = [
  { label: "DECK", href: "#deck" },
  { label: "LOADOUT", href: "#loadout" },
  { label: "MISSIONS", href: "#missions" },
  { label: "FLIGHT PATH", href: "#flight-path" },
  { label: "CLEARANCE", href: "#clearance" },
  { label: "DISPATCH", href: "#dispatch" },
  { label: "CONTACT", href: "#contact" },
];

const { muted, toggleMute, playClick } = useSound();

function useClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); 
  }, []);
  
  return time.toLocaleTimeString("en-US", {hour12:false});
}

