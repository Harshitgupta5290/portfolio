// @flow strict
import { MdVerified } from "react-icons/md";
import {
  FaCloud, FaDatabase, FaCode, FaLink, FaBrain, FaGlobe,
} from "react-icons/fa";
import { categoryMeta, issuerMeta } from "@/utils/data/certifications";

const categoryIcons = {
  "Cloud & AI":      FaCloud,
  "Database":        FaDatabase,
  "Web Development": FaGlobe,
  "Programming":     FaCode,
  "Problem Solving": FaBrain,
  "Blockchain":      FaLink,
};

function CertCard({ cert }) {
  const cat    = categoryMeta[cert.category] ?? { hex: "#16f2b3" };
  const issuer = issuerMeta[cert.issuer]     ?? { color: "text-[#16f2b3]", dot: "bg-[#16f2b3]" };
  const Icon   = categoryIcons[cert.category] ?? FaCode;
  const hex    = cat.hex;

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, #0a0d1a 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${hex}, transparent)` }}
      />

      {/* Left edge glow */}
      <div
        className="absolute top-[3px] left-0 w-[2px] h-full opacity-40"
        style={{ background: `linear-gradient(180deg, ${hex}, transparent 60%)` }}
      />

      <div className="p-5 flex flex-col flex-1 gap-3.5">
        {/* Category + year */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase"
            style={{ color: hex }}
          >
            <Icon size={11} />
            {cert.category}
          </span>
          <span className="shrink-0 text-[10px] font-mono text-gray-500 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.08]">
            {cert.year}
          </span>
        </div>

        {/* Separator */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, ${hex}40, transparent)` }}
        />

        {/* Issuer */}
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: hex }}
          />
          <MdVerified size={13} style={{ color: hex }} />
          <span
            className="text-[11px] font-bold uppercase tracking-wide"
            style={{ color: hex }}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-white leading-snug flex-1">
          {cert.title}
        </p>

        {/* Description */}
        <p className="text-[11px] text-gray-500 leading-relaxed">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {cert.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[9px] font-medium rounded-full"
              style={{
                color: hex,
                background: `${hex}12`,
                border: `1px solid ${hex}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 40px ${hex}08, 0 8px 40px -8px ${hex}30` }}
      />
    </div>
  );
}

export default CertCard;
