"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

// Corner directions for resize handles
const CORNERS = [
  { id: "tl", cls: "top-0 left-0", cursor: "nw-resize", arrow: "↖" },
  { id: "tr", cls: "top-0 right-0", cursor: "ne-resize", arrow: "↗" },
  { id: "bl", cls: "bottom-0 left-0", cursor: "sw-resize", arrow: "↙" },
  { id: "br", cls: "bottom-0 right-0", cursor: "se-resize", arrow: "↘" },
];

function HeroSection() {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, visible: false });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCorner, setActiveCorner] = useState(null);
  const [typedTitle, setTypedTitle] = useState("");
  const titles = ["Full Stack Developer", "AI Engineer", "Software Developer"];

  // Cycling typing animation
  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const current = titles[titleIndex];
      if (!deleting) {
        charIndex++;
        setTypedTitle(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        setTypedTitle(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          timeout = setTimeout(tick, 400);
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 14;
    const rotateX = -((y - cy) / cy) * 14;
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.08s linear",
    });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, visible: true });

    const THRESHOLD = 40;
    const w = rect.width;
    const h = rect.height;
    if (x < THRESHOLD && y < THRESHOLD) setActiveCorner("tl");
    else if (x > w - THRESHOLD && y < THRESHOLD) setActiveCorner("tr");
    else if (x < THRESHOLD && y > h - THRESHOLD) setActiveCorner("bl");
    else if (x > w - THRESHOLD && y > h - THRESHOLD) setActiveCorner("br");
    else setActiveCorner(null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
    });
    setGlowPos((p) => ({ ...p, visible: false }));
    setIsHovering(false);
    setActiveCorner(null);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        {/* Left: Text content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-10 md:pb-6 lg:pb-0 lg:pt-10">
          {/* Greeting pill */}
          <div className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#16f2b320] bg-[#16f2b308]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
            <span className="text-[#16f2b3] text-xs font-mono tracking-wider">Available for hire</span>
          </div>

          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is{" "}
            <span className="text-pink-500 relative">
              {personalData.name}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-transparent" />
            </span>
            <br />
            {`I'm a `}
            <span className="text-[#16f2b3] relative">
              {typedTitle}
              <span className="inline-block w-[2px] h-[0.85em] bg-[#16f2b3] ml-0.5 align-middle animate-pulse" />
            </span>
          </h1>

          {/* Social links */}
          <div className="my-10 flex items-center gap-4">
            {[
              { href: personalData.github, Icon: BsGithub, label: "GitHub" },
              { href: personalData.linkedIn, Icon: BsLinkedin, label: "LinkedIn" },
              { href: personalData.instagram, Icon: FaInstagram, label: "Instagram" },
            ].map(({ href, Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="group relative p-2.5 rounded-lg border border-gray-800 hover:border-pink-500/50 bg-white/[0.02] hover:bg-pink-500/5 transition-all duration-300"
              >
                <Icon size={22} className="text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
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
              <button className="px-6 py-3 md:px-8 md:py-4 bg-[#0d1224] rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2 hover:gap-3 transition-all duration-200">
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

          {/* Stats row */}
          <div className="mt-12 flex items-center gap-6 flex-wrap">
            {[
              { value: "100K+", label: "Users Impacted" },
              { value: "99.9%", label: "Uptime Achieved" },
              { value: "15+", label: "Technologies" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#16f2b3]">{value}</span>
                <span className="text-xs text-gray-500 tracking-wider uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Code Window */}
        <div className={`order-1 lg:order-2 ${isHovering ? "" : "hero-code-float"}`}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={tiltStyle}
            className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] cursor-crosshair select-none"
          >
            {/* Cursor-following glow overlay */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
              style={{
                opacity: glowPos.visible ? 1 : 0,
                background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(139,92,246,0.22) 0%, transparent 60%)`,
              }}
            />

            {/* Corner resize handles */}
            {CORNERS.map((corner) => (
              <div
                key={corner.id}
                className={`absolute ${corner.cls} w-10 h-10 z-10 pointer-events-none flex items-center justify-center`}
                style={{ cursor: corner.cursor }}
              >
                {/* Corner bracket lines */}
                <div className={`absolute w-4 h-4 transition-all duration-200 ${activeCorner === corner.id ? "opacity-100 scale-110" : "opacity-30"}`}
                  style={{
                    borderTop: corner.id.startsWith("t") ? "2px solid #16f2b3" : "none",
                    borderBottom: corner.id.startsWith("b") ? "2px solid #16f2b3" : "none",
                    borderLeft: corner.id.endsWith("l") ? "2px solid #16f2b3" : "none",
                    borderRight: corner.id.endsWith("r") ? "2px solid #16f2b3" : "none",
                    boxShadow: activeCorner === corner.id ? "0 0 8px rgba(22,242,179,0.6)" : "none",
                  }}
                />
                {/* Arrow indicator on active */}
                {activeCorner === corner.id && (
                  <span className="absolute text-[10px] text-[#16f2b3] font-mono animate-bounce" style={{
                    top: corner.id.startsWith("t") ? "2px" : "auto",
                    bottom: corner.id.startsWith("b") ? "2px" : "auto",
                    left: corner.id.endsWith("l") ? "2px" : "auto",
                    right: corner.id.endsWith("r") ? "2px" : "auto",
                  }}>
                    {corner.arrow}
                  </span>
                )}
              </div>
            ))}

            {/* Top gradient line */}
            <div className="flex flex-row overflow-hidden rounded-t-lg">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
              <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
            </div>

            {/* Title bar with traffic lights */}
            <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex flex-row space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)] hover:shadow-[0_0_12px_rgba(248,113,113,1)] transition-shadow duration-200 cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)] hover:shadow-[0_0_12px_rgba(251,146,60,1)] transition-shadow duration-200 cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-green-300 shadow-[0_0_6px_rgba(134,239,172,0.8)] hover:shadow-[0_0_12px_rgba(134,239,172,1)] transition-shadow duration-200 cursor-pointer" />
              </div>
              <div className="flex items-center gap-1.5 text-gray-600 font-mono text-[10px]">
                <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                coder.js
              </div>
            </div>

            {/* Code area */}
            <div className="overflow-x-auto border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
              <code className="font-mono text-[10px] sm:text-xs md:text-sm lg:text-base">
                <div className="blink">
                  <span className="mr-2 text-pink-500">const</span>
                  <span className="mr-2 text-white">coder</span>
                  <span className="mr-2 text-pink-500">=</span>
                  <span className="text-gray-400">{"{"}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                  <span className="text-gray-400">{`'`}</span>
                  <span className="text-amber-300">Harshit Gupta</span>
                  <span className="text-gray-400">{`',`}</span>
                </div>
                <div className="ml-4 lg:ml-8 mr-2">
                  <span className="text-white">skills:</span>
                  <span className="text-gray-400">{`['`}</span>
                  <span className="text-amber-300">Python</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Flask</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Microservices</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">MySQL</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Redis</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">LLMs</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">RAG</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">Docker</span>
                  <span className="text-gray-400">{"', '"}</span>
                  <span className="text-amber-300">AWS</span>
                  <span className="text-gray-400">{"'],"}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                  <span className="text-orange-400">function</span>
                  <span className="text-gray-400">{"() {"}</span>
                </div>
                <div>
                  <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                  <span className="text-gray-400">{`(`}</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">hardWorker</span>
                  <span className="text-amber-300">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">problemSolver</span>
                  <span className="text-amber-300">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                  <span className="mr-2 text-white">skills.length</span>
                  <span className="mr-2 text-amber-300">&gt;=</span>
                  <span className="text-orange-400">5</span>
                </div>
                <div>
                  <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
                </div>
                <div>
                  <span className="text-gray-400">{`};`}</span>
                </div>
              </code>
            </div>

            {/* Bottom status bar */}
            <div className="border-t border-indigo-900/50 px-4 lg:px-8 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-600">
                <span className="text-[#16f2b3]">JS</span>
                <span>UTF-8</span>
                <span>LF</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] shadow-[0_0_4px_#16f2b3]" />
                <span className="text-[#16f2b3]">Ln 18, Col 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
