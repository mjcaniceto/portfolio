import React from "react";
import { ShieldCheck, GraduationCap, ExternalLink } from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

export default function Clearance({ certifications, loading, error, onRetry }) {
  const certs = (certifications || []).filter((c) => c.kind === "cert");
  const education = (certifications || []).filter((c) => c.kind === "education");

  return (
    <SectionShell id="clearance" index="05" title="Clearance" refNote="CREDENTIALS_ON_FILE">
      {loading && <SkeletonGrid count={4} className="h-32" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono tracking-wider text-ink/60 mb-4">CERTIFICATIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certs.map((cert) => (
                <a
                  key={cert._id}
                  href={cert.credential_url || undefined}
                  target={cert.credential_url ? "_blank" : undefined}
                  rel={cert.credential_url ? "noopener noreferrer" : undefined}
                  className={`group border border-ink p-4 flex flex-col gap-2 transition-all duration-300 ${
                    cert.credential_url ? "cursor-pointer hover:shadow-[0_0_0_1px_#00D1FF,0_0_16px_rgba(0,209,255,0.4)]" : "cursor-default"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <ShieldCheck size={18} className="text-cyan shrink-0" />
                    {cert.credential_url && (
                      <ExternalLink size={14} className="text-ink/40 group-hover:text-cyan transition-colors" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm leading-tight">{cert.name}</h4>
                  <p className="text-xs font-mono text-ink/60">
                    {cert.issuer} {cert.year ? `· ${cert.year}` : ""}
                  </p>
                </a>
              ))}
              {!certs.length && (
                <p className="text-xs font-mono text-ink/40">No certifications on file.</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-wider text-ink/60 mb-4">EDUCATION</h3>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu._id} className="border border-ink p-4 flex gap-4 items-center">
                  <span className="font-display font-bold text-3xl text-cyan shrink-0">
                    {String(edu.year).slice(-2)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} className="text-ink/60" />
                      <h4 className="font-display font-bold text-sm leading-tight">{edu.name}</h4>
                    </div>
                    <p className="text-xs font-mono text-ink/60 mt-1">{edu.issuer}</p>
                  </div>
                </div>
              ))}
              {!education.length && (
                <p className="text-xs font-mono text-ink/40">No education modules on file.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
