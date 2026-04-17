"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import {
  FaLayerGroup, FaBrain, FaPaintBrush, FaTools, FaCode,
} from "react-icons/fa";
import { projectsData, projectCategoryMeta } from "@/utils/data/projects-data";

const categoryIcons = {
  "Full Stack": FaLayerGroup,
  "AI / ML":    FaBrain,
  "Frontend":   FaPaintBrush,
  "Tools":      FaTools,
  "Creative":   FaCode,
};

/* ─── Featured Card (large) ───────────────────────────────────────── */
function FeaturedCard({ project, large }) {
  const cardRef = useRef(null);
  const [glow, setGlow]   = useState({ x: 50, y: 50, visible: false });
  const [tilt, setTilt]   = useState({});

  const meta = projectCategoryMeta[project.category] ?? { hex: "#16f2b3", glow: "rgba(22,242,179,0.12)" };
  const hex  = meta.hex;
  const Icon = categoryIcons[project.category] ?? FaCode;

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const ry = ((x - cx) / cx) * 8;
    const rx = -((y - cy) / cy) * 8;
    setTilt({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`,
      transition: "transform 0.08s linear",
    });
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      visible: true,
    });
  };

  const onLeave = () => {
    setTilt({
      transform: "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)",
      transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
    });
    setGlow((p) => ({ ...p, visible: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...tilt,
        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, var(--card) 100%)",
        border: "1px solid var(--line)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-200 h-full flex flex-col"
    >
      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${meta.glow} 0%, transparent 55%)`,
        }}
      />

      {/* Top gradient bar */}
      <div
        className="h-[3px] w-full flex-shrink-0 relative z-10"
        style={{ background: `linear-gradient(90deg, ${hex}, transparent 80%)` }}
      />
      {/* Left glow edge */}
      <div
        className="absolute top-[3px] left-0 w-[2px] h-full opacity-40 z-10"
        style={{ background: `linear-gradient(180deg, ${hex}, transparent 55%)` }}
      />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col flex-1 gap-3.5">
        {/* Category + role */}
        <div className="flex items-center justify-between">
          <span
            className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase"
            style={{ color: hex }}
          >
            <Icon size={10} />
            {project.category}
          </span>
          <span
            className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: hex, background: `${hex}12`, borderColor: `${hex}30` }}
          >
            {project.role}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, ${hex}50, transparent)` }} />

        {/* Name + tagline */}
        <div>
          <h3 className={`text-[var(--ink)] font-bold leading-snug ${large ? "text-lg sm:text-xl" : "text-base"}`}>
            {project.name}
          </h3>
          <p className="mt-1 text-[11px] font-medium tracking-wide" style={{ color: hex }}>
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className={`text-[var(--ink-2)] leading-relaxed flex-1 ${large ? "text-xs line-clamp-4" : "text-[11px] line-clamp-3"}`}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[9px] font-medium rounded-full"
              style={{ color: hex, background: `${hex}10`, border: `1px solid ${hex}28` }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-[var(--line)]">
          {project.code && (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors duration-200 group/link"
            >
              <BsGithub size={13} className="group-hover/link:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all" />
              <span>View Source</span>
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] transition-colors duration-200 group/demo"
              style={{ color: `${hex}99` }}
            >
              <FiExternalLink size={12} className="group-hover/demo:scale-110 transition-all" />
              <span className="group-hover/demo:underline underline-offset-2">Live Demo</span>
            </Link>
          )}
        </div>
      </div>

      {/* Hover glow border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 40px ${hex}06, 0 8px 40px -8px ${hex}30` }}
      />
    </div>
  );
}

/* ─── Main Homepage Section ──────────────────────────────────────── */
const featuredProjects = projectsData.filter((p) => p.featured);
const totalProjects    = projectsData.length;
const totalCategories  = [...new Set(projectsData.map((p) => p.category))].length;
const totalTech        = [...new Set(projectsData.flatMap((p) => p.tools))].length;

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">

      {/* ── Section header ── */}
      <div className="sticky top-10 z-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30 pointer-events-none" />
        <div className="flex items-center justify-start relative pb-3">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold italic tracking-tighter">
            <span className="text-[var(--ink)]">My </span>
            <span className="bg-gradient-to-r from-[#16f2b3] to-violet-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="ml-4 flex-1 h-px bg-gradient-to-r from-[#16f2b3]/30 to-transparent" />
        </div>
      </div>

      <div className="pt-24">
        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
          {[
            { value: `${totalProjects}+`, label: "Projects Built" },
            { value: `${totalCategories}`,  label: "Domains" },
            { value: `${totalTech}+`,       label: "Technologies" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-[#16f2b3] to-violet-400 bg-clip-text text-transparent">
                {value}
              </span>
              <span className="text-[10px] text-[var(--ink-3)] tracking-widest uppercase">{label}</span>
            </div>
          ))}
          <div className="h-4 w-px bg-[var(--line)] hidden sm:block" />
          <div className="flex flex-wrap gap-1.5">
            {[...new Set(projectsData.map((p) => p.category))].map((cat) => {
              const hex = projectCategoryMeta[cat]?.hex ?? "#16f2b3";
              return (
                <span
                  key={cat}
                  className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: hex, background: `${hex}0e`, borderColor: `${hex}25` }}
                >
                  {cat}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Row 1: large card (col-span-2) + normal card */}
          <div className="sm:col-span-2 lg:col-span-2">
            <FeaturedCard project={featuredProjects[0]} large />
          </div>
          <div>
            <FeaturedCard project={featuredProjects[1]} />
          </div>

          {/* Row 2: 3 equal cards */}
          {featuredProjects.slice(2, 5).map((p) => (
            <div key={p.id}>
              <FeaturedCard project={p} />
            </div>
          ))}

          {/* Row 3: last featured spanning full width (or just last card) */}
          {featuredProjects[5] && (
            <div className="sm:col-span-2 lg:col-span-3">
              <FeaturedCard project={featuredProjects[5]} large />
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5 border border-[var(--line)] bg-[var(--surface)]">
          <div>
            <p className="text-[var(--ink)] font-semibold text-sm">
              Explore the full portfolio →{" "}
              <span className="text-[var(--ink-2)] font-normal">
                {totalProjects - featuredProjects.length} more projects across{" "}
                {totalCategories} domains
              </span>
            </p>
            <p className="text-[11px] text-[var(--ink-3)] mt-0.5">
              Including AI/ML engines, 3D experiences, dev tools, and open-source contributions.
            </p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-gradient-to-r from-violet-600 to-[#16f2b3] text-white shadow-[0_4px_24px_-4px_rgba(139,92,246,0.5)] hover:shadow-[0_4px_32px_-4px_rgba(22,242,179,0.5)] hover:scale-105"
          >
            View All {totalProjects} Projects
            <FiArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
