import React from "react";
import {
  GraduationCap,
  ShieldCheck,
  ExternalLink,
  Award,
  ArrowUpRight,
} from "lucide-react";
import SectionShell from "../components/SectionShell.jsx";
import { SkeletonGrid, ErrorNote } from "../components/Skeleton.jsx";

export default function Clearance({ certifications, loading, error, onRetry }) {
  const certs = (certifications || []).filter((c) => c.kind === "cert");
  const education = (certifications || []).filter(
    (c) => c.kind === "education"
  );

  return (
    <SectionShell
      id="certifications"
      index="05"
      title="Education"
      refNote="ACADEMIC_DOSSIER_VERIFIED"
    >
      {loading && <SkeletonGrid count={4} className="h-32" />}
      {error && <ErrorNote message={error} onRetry={onRetry} />}

      {!loading && !error && (
        <div className="space-y-16">
          {/* ================= EDUCATION ================= */}
          <div className="space-y-8">

            {/* Education Cards Grid / Mission Log Layout */}
            {education.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {education.map((edu, idx) => {
                  const isCollege = idx === 0;
                  const phaseId = `LOG-EDU-0${idx + 1}`;

                  return (
                    <article
                      key={edu._id || idx}
                      className={`group relative border-2 border-ink transition-all duration-300 ${
                        isCollege
                          ? "bg-ink text-paper shadow-[8px_8px_0px_0px_rgba(0,209,255,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,209,255,1)]"
                          : "bg-paper text-ink shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,209,255,1)]"
                      }`}
                    >
                      {/* Top Bar / Header Metadata */}
                      <div
                        className={`flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 border-b-2 font-mono text-[10px] tracking-widest uppercase ${
                          isCollege
                            ? "border-paper/20 bg-paper/5 text-cyan"
                            : "border-ink bg-paper-light text-ink/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-black">{phaseId}</span>
                          <span>•</span>
                          <span>
                            {isCollege ? "HIGHER_EDUCATION" : "PREVIOUS_ACADEMIC"}
                          </span>
                        </div>

                        {isCollege && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan text-ink font-bold text-[9px] uppercase tracking-wider">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-ink animate-ping opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ink" />
                            </span>
                            PRIMARY DEGREE
                          </div>
                        )}
                      </div>

                      {/* Main Card Body */}
                      <div className="p-5 sm:p-7 space-y-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          {/* Degree & Institution */}
                          <div className="space-y-2">
                            <p
                              className={`font-mono text-[10px] font-bold tracking-widest uppercase ${
                                isCollege ? "text-cyan" : "text-cyan"
                              }`}
                            >
                              DEGREE / PROGRAM
                            </p>
                            <h4
                              className={`font-display font-black text-2xl sm:text-3xl leading-tight ${
                                isCollege ? "text-paper" : "text-ink"
                              }`}
                            >
                              {edu.name}
                            </h4>
                            <p
                              className={`font-bold text-base sm:text-lg ${
                                isCollege ? "text-paper/90" : "text-ink/80"
                              }`}
                            >
                              {edu.issuer}
                            </p>
                          </div>

                          {/* Duration Badge */}
                          {(edu.duration || edu.year) && (
                            <div
                              className={`shrink-0 px-4 py-3 border-2 border-ink font-mono self-start ${
                                isCollege
                                  ? "bg-cyan text-ink shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                                  : "bg-paper-light text-ink shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                              }`}
                            >
                              <p className="text-[9px] uppercase tracking-widest opacity-70 font-bold">
                                DURATION / YEAR
                              </p>
                              <p className="text-sm font-black mt-0.5">
                                {edu.duration || edu.year}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Additional Info / Footer Grid */}
                        <div
                          className={`pt-5 border-t-2 grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                            isCollege ? "border-paper/20" : "border-ink/10"
                          }`}
                        >
                          {/* Location */}
                          {edu.location && (
                            <div>
                              <p
                                className={`font-mono text-[9px] uppercase tracking-widest ${
                                  isCollege ? "text-paper/50" : "text-ink/40"
                                }`}
                              >
                                LOCATION
                              </p>
                              <p
                                className={`text-xs font-mono font-bold mt-1 ${
                                  isCollege ? "text-paper/90" : "text-ink/80"
                                }`}
                              >
                                {edu.location}
                              </p>
                            </div>  
                          )}

                          {/* Honors / Honors Attainment */}
                          {edu.honors && (
                            <div>
                              <p
                                className={`font-mono text-[9px] uppercase tracking-widest ${
                                  isCollege ? "text-paper/50" : "text-ink/40"
                                }`}
                              >
                                HONORS / ATTAINMENTS
                              </p>
                              <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 bg-amber-400/20 border border-amber-400/60 text-amber-500 text-xs font-bold font-mono">
                                <Award size={13} />
                                <span>{edu.honors}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Research Publication */}
                        {isCollege && edu.pubLink && (
                          <div
                            className={`pt-5 border-t-2 ${
                              isCollege ? "border-paper/20" : "border-ink/10"
                            }`}
                          >
                            <p
                              className={`font-mono text-[9px] uppercase tracking-widest ${
                                isCollege ? "text-paper/50" : "text-ink/40"
                              }`}
                            >
                              RESEARCH PUBLICATION
                            </p>

                            <a
                              href={edu.pubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`mt-3 inline-flex items-center gap-2 px-4 py-2 border-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                isCollege
                                  ? "bg-cyan text-ink border-cyan hover:bg-paper hover:border-paper"
                                  : "bg-paper text-ink border-ink hover:border-cyan hover:text-cyan"
                              }`}
                            >
                              View Published Research
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Bottom Visual Accent Line */}
                      <div
                        className={`h-1.5 w-full ${
                          isCollege ? "bg-cyan" : "bg-ink/10 group-hover:bg-cyan"
                        } transition-colors duration-300`}
                      />
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="border-2 border-dashed border-ink/20 p-8 text-center bg-paper-light/30">
                <p className="text-xs font-mono text-ink/50">
                  // NO ACADEMIC RECORDS LOGGED
                </p>
              </div>
            )}
          </div>

          {/* ================= SUPPLEMENTAL CERTIFICATIONS ================= */}
          <div className="pt-8 border-t border-ink/20">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-ink/70">
                <ShieldCheck size={16} />

                <h4 className="text-xs font-mono font-bold tracking-widest uppercase">
                  Supplemental Credentials & Clearances
                </h4>
              </div>

              <span className="text-[10px] font-mono text-ink/50">
                ({certs.length} ATTESTATIONS)
              </span>
            </div>

            {/* Certification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certs.map((cert) => (
                <a
                  key={cert._id}
                  href={cert.credential_url || undefined}
                  target={cert.credential_url ? "_blank" : undefined}
                  rel={
                    cert.credential_url
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group relative p-4 bg-paper border border-ink/20 flex items-center justify-between gap-3 transition-all duration-200 ${
                    cert.credential_url
                      ? "cursor-pointer hover:border-cyan hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,209,255,1)]"
                      : "cursor-default"
                  }`}
                >
                  {/* Cyan Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan/50 group-hover:bg-cyan transition-colors" />

                  <div className="min-w-0 pl-1">
                    <p className="font-mono text-[10px] text-ink/50 uppercase truncate">
                      {cert.issuer}
                    </p>

                    <p className="mt-0.5 font-bold text-ink truncate group-hover:text-cyan transition-colors">
                      {cert.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cert.year && (
                      <span className="font-mono text-[10px] text-ink/50">
                        {cert.year}
                      </span>
                    )}

                    {cert.credential_url && (
                      <ExternalLink
                        size={13}
                        className="text-ink/40 group-hover:text-cyan transition-colors"
                      />
                    )}
                  </div>
                </a>
              ))}

              {!certs.length && (
                <p className="text-xs font-mono text-ink/40 col-span-full">
                  No supplemental certifications logged.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}