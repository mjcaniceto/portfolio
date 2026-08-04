import React, { useCallback, useState } from "react";
import { SoundProvider } from "./hooks/SoundContext.jsx";
import { useFetch } from "./hooks/useFetch.js";
import { useKonamiCode } from "./hooks/useKonamiCode.js";
import { api } from "./api/client.js";

import CommandBar from "./components/CommandBar.jsx";
import Reticle from "./components/Reticle.jsx";
import Footer from "./components/Footer.jsx";
import KonamiOverlay from "./components/KonamiOverlay.jsx";

import Hero from "./sections/Hero.jsx";
import SkillMatrix from "./sections/SkillMatrix.jsx";
import MissionLogs from "./sections/MissionLogs.jsx";
import FlightPath from "./sections/FlightPath.jsx";
import Clearance from "./sections/Clearance.jsx";
import Dispatch from "./sections/Dispatch.jsx";
import Contact from "./sections/Contact.jsx";

function AppContent() {
  const projects = useFetch(api.getProjects, []);
  const skills = useFetch(api.getSkills, []);
  const experiences = useFetch(api.getExperiences, []);
  const certifications = useFetch(api.getCertifications, []);
  const posts = useFetch(api.getPosts, []);

  const [konamiActive, setKonamiActive] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const triggerKonami = useCallback(() => {
    setGlitching(true);
    window.setTimeout(() => {
      setGlitching(false);
      setKonamiActive(true);
    }, 200);
  }, []);

  useKonamiCode(triggerKonami);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <CommandBar />
      <Reticle />

      <main>
        <Hero
          experiences={experiences.data || []}
          skills={skills.data || []}
          certifications={certifications.data || []}
        />
        <SkillMatrix
          skills={skills.data}
          loading={skills.loading}
          error={skills.error}
          onRetry={skills.reload}
        />
        <MissionLogs
          projects={projects.data}
          loading={projects.loading}
          error={projects.error}
          onRetry={projects.reload}
        />
        <FlightPath
          experiences={experiences.data}
          loading={experiences.loading}
          error={experiences.error}
          onRetry={experiences.reload}
        />
        <Clearance
          certifications={certifications.data}
          loading={certifications.loading}
          error={certifications.error}
          onRetry={certifications.reload}
        />
        <Dispatch
          posts={posts.data}
          loading={posts.loading}
          error={posts.error}
          onRetry={posts.reload}
        />
        <Contact />
      </main>

      <Footer />

      <KonamiOverlay active={konamiActive} glitching={glitching} onClose={() => setKonamiActive(false)} />
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}
