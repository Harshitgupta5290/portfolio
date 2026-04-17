"use client";
// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LEVEL_BADGE = {
  senior: { label: "Senior",  cls: "text-[#16f2b3] border-[#16f2b3]/30 bg-[#16f2b3]/8" },
  mid:    { label: "Mid-Level", cls: "text-violet-400 border-violet-400/30 bg-violet-400/8" },
  intern: { label: "Intern",   cls: "text-[var(--ink-2)] border-[var(--line)] bg-[var(--surface-2)]"  },
};

function TimelineCard({ exp, side, visible }) {
  const badge = LEVEL_BADGE[exp.level] || LEVEL_BADGE.mid;

  return (
    <div
      className={`
        relative w-full lg:w-[calc(50%-2.5rem)]
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${side === "right" ? "lg:ml-auto" : ""}
      `}
    >
      {/* Connector line to spine — desktop only */}
      <div aria-hidden="true"
        className={`hidden lg:block absolute top-6 w-10 h-[1px] bg-gradient-to-r
          ${side === "left"
            ? "right-[-2.5rem] from-[#16f2b3]/30 to-transparent"
            : "left-[-2.5rem] from-transparent to-[#16f2b3]/30"
          }
        `}
      />

      <div className="group relative rounded-xl border border-[var(--line)] bg-[var(--card)] backdrop-blur-sm p-5 sm:p-6 hover:border-[#16f2b3]/25 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(22,242,179,0.12)]">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {exp.promoted && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#e8c547]/30 bg-[#e8c547]/10 text-[#e8c547]">
                ↑ Promoted
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
          <time className="text-[11px] font-mono text-[#16f2b3]/80 shrink-0">{exp.duration}</time>
        </div>

        {/* Title + company */}
        <h3 className="text-[var(--ink)] font-bold text-base sm:text-lg leading-tight mb-0.5 group-hover:text-[#16f2b3] transition-colors duration-300">
          {exp.title}
        </h3>
        <p className="text-[var(--ink-3)] text-xs sm:text-sm mb-4">{exp.company}</p>

        {/* Bullets */}
        {exp.points?.length > 0 && (
          <ul className="flex flex-col gap-2" aria-label={`Key contributions at ${exp.company}`}>
            {exp.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[var(--ink-2)] leading-relaxed">
                <span aria-hidden="true" className="text-[#16f2b3]/70 mt-[3px] shrink-0 text-[10px]">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Experience() {
  const itemRefs  = useRef([]);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [i]: true }));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="experience" aria-label="Work Experience" className="relative z-50 border-t my-12 lg:my-24 border-[var(--line)]">
      <Image src="/section.svg" alt="" aria-hidden="true" width={1572} height={795} className="absolute top-0 -z-10" />

      {/* Section header */}
      <div className="flex flex-col items-center my-5 lg:py-8 gap-3">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="w-8 h-[1px] bg-[#16f2b3]" />
          <h2 className="text-[#16f2b3] text-xs uppercase tracking-[0.25em] font-semibold">Work History</h2>
          <span aria-hidden="true" className="w-8 h-[1px] bg-[#16f2b3]" />
        </div>
        <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-tight">
          Experience
        </p>
        <div aria-hidden="true" className="w-12 h-[3px] bg-[#16f2b3] rounded-full" />
      </div>

      {/* Timeline */}
      <div className="relative py-8 px-4 sm:px-0">

        {/* Vertical spine — desktop */}
        <div aria-hidden="true" className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#16f2b3]/20 to-transparent" />

        <div className="flex flex-col gap-10 lg:gap-14">
          {experiences.map((exp, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <div
                key={exp.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative flex flex-col lg:flex-row items-stretch"
              >
                {/* Mobile: timeline dot */}
                <div aria-hidden="true" className="lg:hidden flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full border-2 border-[#16f2b3] bg-[#16f2b3]/20 shadow-[0_0_8px_#16f2b3]" />
                  <span className="flex-1 h-[1px] bg-gradient-to-r from-[#16f2b3]/30 to-transparent" />
                </div>

                {/* Desktop: centered node */}
                <div aria-hidden="true" className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 items-center justify-center w-5 h-5 rounded-full border-2 border-[#16f2b3] bg-[var(--card)] shadow-[0_0_12px_#16f2b3]">
                  <span className="w-2 h-2 rounded-full bg-[#16f2b3]" />
                </div>

                <TimelineCard exp={exp} side={side} visible={!!visible[i]} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
