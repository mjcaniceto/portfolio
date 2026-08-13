import React from "react";
import {
  GraduationCap,
  ShieldCheck,
  ExternalLink,
  Award,
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
            {/* Section Header */}
            

            {/* Progressive Education Timeline */}
            {education.length > 0 ? (
              <div className="relative">
                {/* Timeline Base */}
                <div className="absolute left-[15px] top-6 bottom-6 w-px bg-ink/15" />

                {/* Timeline Progress */}
                {education.length > 1 && (
                  <div
                    className="absolute left-[15px] top-6 w-px bg-cyan"
                    style={{
                      height: `calc(${
                        ((education.length - 1) / education.length) * 100
                      }% - 1.5rem)`,
                    }}
                  />
                )}

                <div className="space-y-8">
                  {education.map((edu, idx) => {
                    const isLatest = idx === education.length ;

                    return (
                      <div
                        key={edu._id || idx}
                        className="relative pl-12"
                      >
                        {/* Progress Node */}
                        <div
                          className={`absolute left-0 top-5 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 ${
                            isLatest
                              ? "bg-cyan border-ink shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                              : "bg-paper border-cyan"
                          }`}
                        >
                          <span
                            className={`font-mono text-[10px] font-black ${
                              isLatest ? "text-ink" : "text-cyan"
                            }`}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Education Card */}
                        <article
                          className={`group relative border-2 border-ink p-5 sm:p-7 transition-all duration-300 ${
                            isLatest
                              ? "bg-ink text-paper shadow-[7px_7px_0px_0px_rgba(0,209,255,1)]"
                              : "bg-paper hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,209,255,1)]"
                          }`}
                        >
                          {/* Latest Indicator */}
                          {isLatest && (
                            <div className="absolute top-0 right-0 px-3 py-1 bg-cyan text-ink font-mono text-[9px] font-black tracking-widest uppercase">
                              Latest
                            </div>
                          )}

                          {/* Degree / Track */}
                          <div className="pr-16">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-cyan">
                              Degree / Track
                            </p>

                            <h4
                              className={`font-display font-black text-xl sm:text-2xl leading-tight transition-colors ${
                                isLatest
                                  ? "text-paper group-hover:text-cyan"
                                  : "text-ink group-hover:text-cyan"
                              }`}
                            >
                              {edu.name}
                            </h4>
                          </div>

                          {/* School + Location + Duration */}
                          <div
                            className={`mt-5 pt-5 border-t ${
                              isLatest
                                ? "border-paper/15"
                                : "border-ink/10"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                              {/* School */}
                              <div>
                                <p
                                  className={`font-mono text-[9px] uppercase tracking-widest mb-1 ${
                                    isLatest
                                      ? "text-paper/45"
                                      : "text-ink/40"
                                  }`}
                                >
                                  Institution
                                </p>

                                <p
                                  className={`font-bold text-base sm:text-lg ${
                                    isLatest ? "text-paper" : "text-ink"
                                  }`}
                                >
                                  {edu.issuer}
                                </p>

                                {/* City */}
                                {edu.location && (
                                  <p
                                    className={`mt-1 text-xs font-mono ${
                                      isLatest
                                        ? "text-paper/55"
                                        : "text-ink/50"
                                    }`}
                                  >
                                    {edu.location}
                                  </p>
                                )}
                              </div>

                              {/* Duration */}
                              {(edu.duration || edu.year) && (
                                <div
                                  className={`shrink-0 px-3 py-2 border ${
                                    isLatest
                                      ? "border-cyan/40 bg-cyan/10"
                                      : "border-ink/15 bg-paper-light"
                                  }`}
                                >
                                  <p
                                    className={`font-mono text-[9px] uppercase tracking-widest mb-0.5 ${
                                      isLatest
                                        ? "text-cyan"
                                        : "text-ink/40"
                                    }`}
                                  >
                                    Duration
                                  </p>

                                  <p
                                    className={`font-mono text-xs font-bold ${
                                      isLatest
                                        ? "text-paper"
                                        : "text-ink"
                                    }`}
                                  >
                                    {edu.duration || edu.year}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Additional Notes */}
                          {edu.honors && (
                            <div
                              className={`mt-5 pt-4 border-t ${
                                isLatest
                                  ? "border-paper/15"
                                  : "border-ink/10"
                              }`}
                            >
                              <p
                                className={`font-mono text-[9px] uppercase tracking-widest mb-2 ${
                                  isLatest
                                    ? "text-paper/45"
                                    : "text-ink/40"
                                }`}
                              >
                                Additional Notes
                              </p>

                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-300/15 border border-amber-400/60">
                                <Award
                                  size={13}
                                  className="text-amber-500"
                                />

                                <span
                                  className={`text-xs font-bold ${
                                    isLatest ? "text-paper" : "text-ink"
                                  }`}
                                >
                                  {edu.honors}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Progressive Bottom Indicator */}
                          <div
                            className={`absolute bottom-0 right-0 h-1 transition-all duration-500 ${
                              isLatest
                                ? "w-full bg-cyan"
                                : "w-0 bg-cyan group-hover:w-full"
                            }`}
                          />
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-ink/20 p-8 text-center bg-paper-light/30">
                <p className="text-xs font-mono text-ink/50">
                  // NO EDUCATION RECORDS LOADED
                </p>
              </div>
            )}
          </div>

          {/* ================= SUPPLEMENTAL CERTIFICATIONS ================= */}
          <div className="pt-8 border-t border-ink/20 opacity-80 hover:opacity-100 transition-opacity">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-ink/60">
                <ShieldCheck size={16} />

                <h4 className="text-xs font-mono font-bold tracking-widest uppercase">
                  Certificates
                </h4>
              </div>

              <span className="text-[10px] font-mono text-ink/40">
                ({certs.length} ATTESTATIONS)
              </span>
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
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
                  className={`group p-2.5 bg-paper-light/40 border border-ink/15 flex items-center justify-between gap-3 text-xs transition-all hover:border-ink/50 hover:bg-paper ${
                    cert.credential_url
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-ink/50 uppercase truncate">
                      {cert.issuer}
                    </p>

                    <p className="font-bold text-ink/80 truncate group-hover:text-ink">
                      {cert.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cert.year && (
                      <span className="font-mono text-[10px] text-ink/40">
                        {cert.year}
                      </span>
                    )}

                    {cert.credential_url && (
                      <ExternalLink
                        size={12}
                        className="text-ink/30 group-hover:text-cyan"
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