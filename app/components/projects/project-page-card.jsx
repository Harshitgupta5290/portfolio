"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { projectCategoryMeta } from "@/utils/data/projects-data";
import {
  FaLayerGroup, FaBrain, FaPaintBrush, FaTools, FaCode,
} from "react-icons/fa";

const categoryIcons = {
  "Full Stack": FaLayerGroup,
  "AI / ML":    FaBrain,
  "Frontend":   FaPaintBrush,
  "Tools":      FaTools,
  "Creative":   FaCode,
};

function ProjectPageCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const meta = projectCategoryMeta[project.category] ?? { hex: "#16f2b3", glow: "rgba(22,242,179,0.12)" };
  const hex  = meta.hex;
  const Icon = categoryIcons[project.category] ?? FaCode;
  const num  = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
      style={{
        background: "#080b18",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `4px solid ${hex}`,
        boxShadow: hovered
          ? `0 0 30px -8px ${hex}40, inset 0 0 60px -30px ${hex}18`
          : "0 2px 16px -4px rgba(0,0,0,0.6)",
      }}
    >
      {/* Ghost index number */}
      <span
        className="pointer-events-none absolute -top-2 right-3 text-[5rem] font-black leading-none select-none transition-opacity duration-300"
        style={{ color: `${hex}10`, opacity: hovered ? 0.9 : 0.6 }}
      >
        {num}
      </span>

      <div className="relative z-10 p-5 flex flex-col flex-1 gap-3.5">

        {/* Category badge + role */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase"
            style={{ color: hex }}
          >
            <Icon size={10} />
            {project.category}
          </span>
          <span className="shrink-0 text-[9px] text-gray-600 font-mono uppercase tracking-wider">
            {project.role}
          </span>
        </div>

        {/* Project name */}
        <div>
          <h3 className="text-white font-extrabold text-[1.05rem] leading-tight tracking-tight">
            {project.name}
          </h3>
          <p
            className="mt-1 text-[11px] font-medium italic"
            style={{ color: `${hex}cc` }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-[11px] text-gray-500 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack — inline dot-separated */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {project.tools.map((tool, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">{tool}</span>
              {i < project.tools.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-gray-700 flex-shrink-0" />
              )}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05]" />

        {/* Links — full-width row */}
        <div className="flex items-center gap-2">
          {project.code && (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200"
            >
              <BsGithub size={12} />
              Source
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                color: hex,
                border: `1px solid ${hex}40`,
                background: `${hex}10`,
              }}
            >
              <FiExternalLink size={11} />
              Live Demo
            </Link>
          )}
          {!project.code && !project.demo && (
            <span className="text-[10px] text-gray-700 italic">No public links</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPageCard;
