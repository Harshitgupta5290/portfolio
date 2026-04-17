"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { certCount, techStackCount, aiProjectCount, MICROSERVICES_COUNT, API_LATENCY_REDUCTION } from "@/utils/data/computed-stats";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const aboutStats = [
  { value: certCount,              suffix: "",  label: "Certifications",   sub: "Oracle & Cloud" },
  { value: techStackCount,         suffix: "+", label: "Tech Stack",        sub: "Python · AWS · LLMs" },
  { value: MICROSERVICES_COUNT,    suffix: "+", label: "Microservices",     sub: "Designed & Shipped" },
  { value: aiProjectCount,         suffix: "+", label: "AI Projects",       sub: "NLP · CV · RAG" },
  { value: API_LATENCY_REDUCTION,  suffix: "%", label: "API Latency Cut",   sub: "Optimised & Profiled" },
];

const CORE_SKILLS = [
  "Python", "Flask", "FastAPI", "Next.js", "React",
  "MySQL", "PostgreSQL", "Docker", "AWS", "REST APIs",
  "LLM Workflows", "RAG Pipelines", "NLP", "Microservices", "Git",
];

const PULL_QUOTE = "I don't just write code — I build systems that outlast the sprint.";
const BODY_PARAGRAPHS = [
  "I've architected distributed microservice platforms handling millions of transactions for enterprise clients across the globe — taking products from raw idea to production-grade infrastructure. My foundation is deep: Python, Flask, MySQL, Docker, AWS, Next.js — but what I bring beyond the stack is the instinct to make hard calls under pressure and ship things that actually hold.",
  "These days I'm deep in AI-native product development — designing LLM-powered workflows, RAG pipelines, and intelligent automation that turn state-of-the-art models into real, revenue-driven features. I care about craft, speed, and outcomes.",
  "What sets me apart: I think like a system architect, not a feature builder. I ship production-grade infrastructure at startup velocity while maintaining enterprise-level reliability. If you're scaling from idea to millions of transactions, or building AI products that need to work under pressure — I'm the engineer who sees both the trees and the forest.",
];

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(target); // default to real value for SSR / bots
  const ref = useRef(null);
  const started = useRef(false);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setCount(0);
        const step = Math.ceil(target / 30);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { setCount(target); clearInterval(t); animated.current = true; }
          else setCount(cur);
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {count}{suffix}
    </span>
  );
}

function AboutSection() {
  const imgRef = useRef(null);
  const [imgTilt, setImgTilt] = useState({});

  const onImgMove = (e) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const ry = ((x - cx) / cx) * 10;
    const rx = -((y - cy) / cy) * 10;
    setImgTilt({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`, transition: "transform 0.08s linear" });
  };

  const onImgLeave = () => setImgTilt({
    transform: "perspective(900px) rotateX(0) rotateY(0) scale(1)",
    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)"
  });

  return (
    <section id="about" aria-label="About Harshit Gupta" className="my-12 lg:my-24 relative mesh-bg">
      {/* Decorative orbs — purely visual, hidden from assistive tech */}
      <div aria-hidden="true" className="orb orb-violet w-72 h-72 -top-20 -right-20 opacity-30" />
      <div aria-hidden="true" className="orb orb-cyan w-56 h-56 bottom-0 -left-16 opacity-25" style={{ animationDelay: "-4s" }} />

      {/* Vertical label */}
      <div aria-hidden="true" className="hidden lg:flex flex-col items-center absolute top-16 -right-8 z-10">
        <span className="section-heading rotate-90 p-2 px-5">ABOUT ME</span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-violet-500/50 to-transparent mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* ── Left: Text ── */}
        <div className="order-2 lg:order-1 flex flex-col gap-6">

          {/* Section label — ATS-readable h2 */}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="w-8 h-[1px] bg-[#16f2b3]" />
            <h2 className="text-[#16f2b3] text-xs uppercase tracking-[0.25em] font-semibold">
              About — {personalData.name}
            </h2>
          </div>

          {/* Designation — prominent for ATS keyword matching */}
          <p className="text-[var(--ink-3)] text-xs tracking-wide -mt-3">
            {personalData.designation} · New Delhi, India
          </p>

          {/* Pull quote */}
          <blockquote className="text-xl sm:text-2xl font-bold text-[var(--ink)] leading-snug border-l-[3px] border-[#16f2b3] pl-4 not-italic">
            {PULL_QUOTE}
          </blockquote>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-4">
            {BODY_PARAGRAPHS.map((para, i) => (
              <p key={i} className="text-[var(--ink-2)] text-sm lg:text-[15px] leading-7 lg:leading-8">
                {para}
              </p>
            ))}
          </div>

          {/* Core Skills — ATS keyword block, visually minimal */}
          <div>
            <p className="text-[var(--ink-3)] text-[10px] uppercase tracking-widest mb-2 font-medium">Core Skills</p>
            <ul aria-label="Core skills" className="flex flex-wrap gap-1.5 list-none p-0 m-0">
              {CORE_SKILLS.map((skill) => (
                <li key={skill} className="text-[11px] text-[var(--ink-2)] border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 rounded-md hover:border-[#16f2b3]/40 hover:text-[#16f2b3] transition-colors duration-200">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Availability pill */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#16f2b3]/10 border border-[#16f2b3]/30 text-[#16f2b3] text-xs font-medium px-3 py-1.5 rounded-full">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
              Open to opportunities
            </span>
          </div>

          {/* Stats row */}
          <div role="list" aria-label="Key metrics" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px border border-[var(--line)] rounded-xl overflow-hidden bg-[var(--surface-2)]">
            {aboutStats.map((stat, i) => (
              <div
                key={i}
                role="listitem"
                className="flex flex-col items-center justify-center gap-0.5 py-4 px-2 bg-[var(--card)] hover:bg-[#16f2b3]/5 transition-colors duration-300 group"
              >
                <p className="text-2xl font-extrabold text-[var(--ink)] group-hover:text-[#16f2b3] transition-colors duration-300">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] text-[var(--ink-2)] uppercase tracking-widest text-center leading-tight">{stat.label}</p>
                <p className="text-[9px] text-[var(--ink-3)] text-center mt-0.5 leading-tight">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Profile image ── */}
        <div className="flex justify-center order-1 lg:order-2">
          <div
            ref={imgRef}
            onMouseMove={onImgMove}
            onMouseLeave={onImgLeave}
            style={imgTilt}
            className="relative group cursor-pointer"
          >
            {/* Ambient glow */}
            <div aria-hidden="true" className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-[#16f2b3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

            {/* Corner accents */}
            <div aria-hidden="true" className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#16f2b3]/60 rounded-tl-lg z-30" />
            <div aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-violet-500/60 rounded-br-lg z-30" />

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden w-[220px] h-[275px] sm:w-[270px] sm:h-[340px] md:w-[320px] md:h-[410px]">
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-[#16f2b3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              <Image
                src={personalData.profile}
                width={320}
                height={410}
                alt={`${personalData.name} — ${personalData.designation}`}
                className="w-full h-full object-cover object-top"
                sizes="(max-width: 640px) 220px, (max-width: 768px) 270px, 320px"
                priority
              />
              {/* Name overlay — visual only, real text is in h2 above */}
              <div aria-hidden="true" className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 py-3 z-20">
                <p className="text-white text-sm font-semibold leading-none">{personalData.name}</p>
                <p className="text-[#16f2b3] text-[10px] uppercase tracking-widest mt-0.5">{personalData.designation}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
