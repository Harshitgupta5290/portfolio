"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { yearsExperience, techStackCount, MICROSERVICES_COUNT } from "@/utils/data/computed-stats";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import WireframeGlobe from "@/app/components/helper/wireframe-globe";

const TITLES = ["Full Stack Developer", "AI Engineer", "Software Engineer", "Backend Architect"];

function HeroSection() {
  const cardRef     = useRef(null);
  const [tiltStyle, setTiltStyle]   = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  // Cycling typing animation
  useEffect(() => {
    let titleIndex = 0;
    let charIndex  = 0;
    let deleting   = false;
    let timeout;

    const tick = () => {
      const current = TITLES[titleIndex];
      if (!deleting) {
        charIndex++;
        setTypedTitle(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout  = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        setTypedTitle(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          titleIndex = (titleIndex + 1) % TITLES.length;
          timeout  = setTimeout(tick, 400);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 40 : 65);
    };

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x  = e.clientX - rect.left;
    const y  = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 8;
    const rotateX = -((y - cy) / cy) * 8;
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`,
      transition: "transform 0.08s linear",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
    });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  return (
    <section aria-label="Hero" className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt=""
        aria-hidden="true"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        {/* Left: Text content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-10 md:pb-6 lg:pb-0 lg:pt-10">

          {/* Availability pill */}
          <div className="mb-5 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#16f2b320] bg-[#16f2b308]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
            <span className="text-[#16f2b3] text-xs font-mono tracking-wider">Available for hire</span>
          </div>

          {/* Editorial H1 */}
          <h1 className="flex flex-col gap-1">
            <span className="text-[11px] font-mono text-[var(--ink-3)] tracking-[0.25em] uppercase">
              {personalData.name}
            </span>
            <span className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-black leading-[1.05] text-[var(--ink)] tracking-tight">
              Full Stack &amp; AI
              <br />
              <span className="text-[#16f2b3]">Engineer</span>
            </span>
            <span className="mt-2 text-base sm:text-lg font-mono text-[var(--ink-2)] flex items-center gap-1">
              /{" "}
              <span aria-live="polite">{typedTitle}</span>
              <span aria-hidden="true" className="inline-block w-[2px] h-[0.85em] bg-[#16f2b3] ml-0.5 align-middle animate-pulse" />
            </span>
          </h1>

          {/* Social links — GitHub + LinkedIn only */}
          <div className="my-8 flex items-center gap-3">
            {[
              { href: personalData.github,    Icon: BsGithub,    label: "GitHub"    },
              { href: personalData.linkedIn,  Icon: BsLinkedin,  label: "LinkedIn"  },
              { href: personalData.instagram, Icon: BsInstagram, label: "Instagram" },
            ].map(({ href, Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="group relative p-2.5 rounded-lg border border-[var(--line)] hover:border-pink-500/50 bg-[var(--surface)] hover:bg-pink-500/5 transition-all duration-300"
              >
                <Icon size={22} className="text-[var(--ink-2)] group-hover:text-pink-500 transition-colors duration-300" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] bg-[var(--surface-2)] text-[var(--ink-2)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            >
              <button className="px-6 py-3 md:px-8 md:py-4 bg-[var(--card)] rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--ink)] flex items-center gap-2 hover:gap-3 transition-all duration-200">
                <span>Contact me</span>
                <RiContactsFill size={15} />
              </button>
            </Link>

            <Link
              className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-white no-underline transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              role="button"
              target="_blank"
              href={personalData.resume}
              download="Harshit_Gupta_Resume.pdf"
            >
              <span>Get Resume</span>
              <MdDownload size={15} />
            </Link>
          </div>

          {/* Stats row — real data from skillsData */}
          <div className="mt-12 flex items-center gap-8 flex-wrap" role="list" aria-label="Key stats">
            {[
              { value: `${yearsExperience}+`,     label: "Years Production" },
              { value: `${MICROSERVICES_COUNT}+`, label: "Microservices Built" },
              { value: `${techStackCount}+`,      label: "Technologies" },
            ].map(({ value, label }) => (
              <div key={label} role="listitem" className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#16f2b3]">{value}</span>
                <span className="text-xs text-[var(--ink-3)] tracking-wider uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Globe */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-3 w-full">
            {/* Header label */}
            <div className="flex items-center gap-2 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
              <span className="text-[10px] font-mono text-[#16f2b3]/70 tracking-wider uppercase">Global Reach</span>
            </div>

            {/* Globe canvas wrapper */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              style={tiltStyle}
              className={`relative w-full max-w-[560px] aspect-square ${isHovering ? "" : "hero-code-float"}`}
            >
              {/* Ambient glow behind globe */}
              <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,242,179,0.06)_0%,transparent_70%)] pointer-events-none" />
              <WireframeGlobe />
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-5 self-start mt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e8c547]" />
                <span className="text-[10px] font-mono text-[var(--ink-3)]">40+ countries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16f2b3]" />
                <span className="text-[10px] font-mono text-[var(--ink-3)]">enterprise clients</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
                <span className="text-[10px] font-mono text-[#16f2b3]/80">live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
