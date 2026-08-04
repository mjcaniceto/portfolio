import { jsPDF } from "jspdf";

const INK = "#111111";
const CYAN = "#00A3C4"; // slightly darkened for print legibility
const GRID = "#B5BAC2";

export function generateResumePdf({ profile, experiences = [], skills = [], certifications = [] }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 56;

  doc.setDrawColor(GRID);
  doc.setLineWidth(0.5);
  for (let gx = margin; gx < pageWidth - margin; gx += 32) {
    doc.line(gx, margin, gx, doc.internal.pageSize.getHeight() - margin);
  }

  doc.setTextColor(INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(profile.name.toUpperCase(), margin, y);
  y += 22;

  doc.setFontSize(11);
  doc.setFont("courier", "normal");
  doc.setTextColor(CYAN);
  doc.text(profile.title.toUpperCase(), margin, y);
  y += 20;

  doc.setDrawColor(INK);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  doc.setTextColor(INK);
  doc.setFontSize(10);
  doc.setFont("courier", "normal");
  const bioLines = doc.splitTextToSize(profile.bio, pageWidth - margin * 2);
  doc.text(bioLines, margin, y);
  y += bioLines.length * 13 + 18;

  const sectionHeader = (label) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(INK);
    doc.text(label.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(CYAN);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + 40, y);
    y += 16;
  };

  sectionHeader("Flight Path — Experience");
  doc.setFont("courier", "normal");
  experiences.forEach((exp) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${exp.role} — ${exp.company}`, margin, y);
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.text(exp.duration || "", pageWidth - margin - doc.getTextWidth(exp.duration || ""), y);
    y += 14;

    (exp.accomplishments || []).forEach((line) => {
      const wrapped = doc.splitTextToSize(`— ${line}`, pageWidth - margin * 2 - 10);
      doc.setFontSize(9.5);
      doc.text(wrapped, margin + 10, y);
      y += wrapped.length * 12;
    });
    y += 10;

    if (y > 720) {
      doc.addPage();
      y = 56;
    }
  });

  y += 4;
  sectionHeader("Tech Loadout — Skills");
  doc.setFontSize(9.5);
  doc.setFont("courier", "normal");
  const skillLine = skills.map((s) => s.name).join("   ·   ");
  const skillWrapped = doc.splitTextToSize(skillLine, pageWidth - margin * 2);
  doc.text(skillWrapped, margin, y);
  y += skillWrapped.length * 13 + 20;

  if (certifications.length) {
    sectionHeader("Clearance — Certifications & Education");
    certifications.forEach((c) => {
      doc.setFontSize(9.5);
      doc.setFont("courier", "normal");
      doc.text(`${c.year || ""}  ${c.name} — ${c.issuer}`, margin, y);
      y += 14;
    });
  }

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    `GENERATED ${new Date().toISOString().slice(0, 10)} · REF_NO: RESUME-AUTOGEN`,
    margin,
    doc.internal.pageSize.getHeight() - 24
  );

  doc.save(`${profile.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
