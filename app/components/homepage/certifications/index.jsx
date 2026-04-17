// @flow strict

import { certifications, categoryMeta, issuerMeta } from "@/utils/data/certifications";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCloud, FaDatabase, FaCode, FaLink, FaBrain, FaGlobe } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const issuerWeight = {
  Google:      100,
  AWS:         100,
  Microsoft:   100,
  Oracle:       90,
  Meta:         80,
  IBM:          80,
  Coursera:     60,
  LinkedIn:     50,
  HackerRank:   30,
  Sololearn:    10,
};

const featured = [...certifications]
  .filter((c) => c.featured)
  .sort((a, b) => {
    const wa = issuerWeight[a.issuer] ?? 40;
    const wb = issuerWeight[b.issuer] ?? 40;
    if (wb !== wa) return wb - wa;
    return Number(b.year) - Number(a.year);
  });

const categoryIcons = {
  "Cloud & AI":      FaCloud,
  "Database":        FaDatabase,
  "Web Development": FaGlobe,
  "Programming":     FaCode,
  "Problem Solving": FaBrain,
  "Blockchain":      FaLink,
};

const defaultMeta    = { hex: "#16f2b3", text: "text-[#16f2b3]" };
const defaultIssuer  = { color: "text-[#16f2b3]", dot: "bg-[#16f2b3]" };

function FeaturedCertCard({ cert }) {
  const cat    = categoryMeta[cert.category] ?? defaultMeta;
  const issuer = issuerMeta[cert.issuer]     ?? defaultIssuer;
  const Icon   = categoryIcons[cert.category] ?? FaCode;

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, var(--card) 100%)",
        border: `1px solid var(--line)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Colored top accent bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${cat.hex}, transparent)` }}
      />

      {/* Colored side glow (left edge) */}
      <div
        className="absolute top-[3px] left-0 w-[2px] h-full opacity-40"
        style={{ background: `linear-gradient(180deg, ${cat.hex}, transparent 60%)` }}
      />

      <div className="p-5 flex flex-col flex-1 gap-3.5">
        {/* Row 1: Category icon + label + year */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase"
            style={{ color: cat.hex }}
          >
            <Icon size={11} />
            {cert.category}
          </span>
          <span className="shrink-0 text-[10px] font-mono text-[var(--ink-3)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full border border-[var(--line)]">
            {cert.year}
          </span>
        </div>

        {/* Gradient separator */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, ${cat.hex}40, transparent)` }}
        />

        {/* Issuer row */}
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: cat.hex }}
          />
          <MdVerified size={13} style={{ color: cat.hex }} />
          <span
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: cat.hex }}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-[var(--ink)] leading-snug flex-1">
          {cert.title}
        </p>

        {/* Description */}
        <p className="text-[11px] text-[var(--ink-2)] leading-relaxed">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {cert.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[9px] font-medium rounded-full"
              style={{
                color: cat.hex,
                background: `${cat.hex}12`,
                border: `1px solid ${cat.hex}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: `inset 0 0 40px ${cat.hex}08, 0 8px 40px -8px ${cat.hex}30` }}
      />
    </div>
  );
}

const categorySummary = [...new Set(certifications.map((c) => c.category))].map((cat) => ({
  cat,
  count: certifications.filter((c) => c.category === cat).length,
  hex:   categoryMeta[cat]?.hex ?? "#16f2b3",
  Icon:  categoryIcons[cat] ?? FaCode,
}));

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[var(--line)]">
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Top gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>

      {/* Background blobs */}
      <div className="absolute top-20 left-[15%] w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-[15%] w-64 h-64 bg-pink-600/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-[40%] w-48 h-48 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="text-center mt-12 mb-10">
        <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#16f2b3] mb-3">
          ✦ Verified Credentials ✦
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
          <span className="text-[var(--ink)]">My </span>
          <span className="bg-gradient-to-r from-violet-400 via-[#16f2b3] to-pink-400 bg-clip-text text-transparent">
            Certifications
          </span>
        </h2>
        <p className="mt-4 text-sm text-[var(--ink-2)] max-w-md mx-auto leading-relaxed">
          Professional credentials across Cloud AI, databases, web development,
          and programming — certified by industry-leading platforms.
        </p>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
        {[
          { value: certifications.length, label: "Certifications", color: "#16f2b3" },
          { value: new Set(certifications.map((c) => c.category)).size, label: "Categories", color: "#8b5cf6" },
          { value: new Set(certifications.map((c) => c.issuer)).size,   label: "Issuers",     color: "#ec4899" },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className="relative flex flex-col items-center justify-center rounded-2xl py-5 sm:py-6 px-4 overflow-hidden"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            />
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-black"
              style={{ color }}
            >
              {value}+
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--ink-3)] mt-1 tracking-widest uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Category legend ─────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categorySummary.map(({ cat, count, hex, Icon }) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase"
            style={{
              color: hex,
              background: `${hex}14`,
              border: `1px solid ${hex}35`,
            }}
          >
            <Icon size={10} />
            {cat}
            <span className="opacity-50 ml-0.5">· {count}</span>
          </span>
        ))}
      </div>

      {/* ── Featured certs grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featured.slice(0, 6).map((cert) => (
          <FeaturedCertCard key={cert.id} cert={cert} />
        ))}
      </div>

      {/* ── View All CTA ────────────────────────────────────────── */}
      <div className="flex justify-center mt-10">
        <Link
          href="/certifications"
          role="button"
          className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-violet-300 no-underline hover:no-underline transition-all duration-300 hover:gap-3 hover:text-violet-200 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.5)] border border-violet-500/30 hover:border-violet-500/60 bg-gradient-to-r from-violet-500/10 to-pink-500/10"
        >
          View All {certifications.length} Certifications
          <FaArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default Certifications;
