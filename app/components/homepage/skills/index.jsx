"use client";
// @flow strict

import { skillsData, categoryStats } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Split skills evenly across 3 marquee rows
const rowSize = Math.ceil(skillsData.length / 3);
const skillGroups = [
  skillsData.slice(0, rowSize),
  skillsData.slice(rowSize, rowSize * 2),
  skillsData.slice(rowSize * 2),
];

function SkillPill({ skill }) {
  const img = skillsImage(skill);
  return (
    <div className="group relative mx-2 flex-shrink-0 cursor-default">
      <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--line)] bg-[var(--card)] hover:border-[#16f2b3]/40 hover:bg-[#16f2b305] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700 ease-in-out" />
        {img && (
          <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={img.src}
              alt={skill}
              width={28}
              height={28}
              className="rounded-sm object-contain"
              style={{ width: 28, height: 28 }}
              unoptimized
            />
          </div>
        )}
        <span className="text-[var(--ink-2)] group-hover:text-[var(--ink)] text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">
          {skill}
        </span>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[var(--line)]">
      {/* Top gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-col items-center mt-12 mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight tracking-tight bg-gradient-to-r from-violet-400 to-[#16f2b3] bg-clip-text text-transparent">
          Skills &amp; Technologies
        </h2>
        <div className="w-12 h-[3px] bg-gradient-to-r from-violet-400 to-[#16f2b3] mt-5 rounded-full" />
      </div>

      {/* Category badges — counts derived dynamically */}
      <div className="flex justify-center flex-wrap gap-3 mb-12 px-4">
        {categoryStats.map(({ label, count, color }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--card)] hover:border-[var(--ink-3)] transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[var(--ink-2)] text-xs font-mono">{label}</span>
            <span
              className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
              style={{ color, backgroundColor: `${color}18` }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>

      {/* Marquee rows with edge fades */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />

        <div className="flex flex-col gap-5 py-2">
          <Marquee gradient={false} speed={38} pauseOnHover direction="left">
            {skillGroups[0].map((skill, i) => (
              <SkillPill key={i} skill={skill} />
            ))}
          </Marquee>

          <Marquee gradient={false} speed={28} pauseOnHover direction="right">
            {skillGroups[1].map((skill, i) => (
              <SkillPill key={i} skill={skill} />
            ))}
          </Marquee>

          <Marquee gradient={false} speed={44} pauseOnHover direction="left">
            {skillGroups[2].map((skill, i) => (
              <SkillPill key={i} skill={skill} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Bottom status pill */}
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--line)] bg-[var(--card)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
          <span className="text-[var(--ink-2)] text-xs font-mono tracking-wider">
            Always learning · Always shipping
          </span>
        </div>
      </div>
    </div>
  );
}

export default Skills;
