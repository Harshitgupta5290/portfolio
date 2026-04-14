"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const aboutStats = [
  { value: "8", label: "Certifications", back: "Oracle & Cloud" },
  { value: "15+", label: "Tech Stack", back: "Python · AWS · LLMs" },
  { value: "10+", label: "GitHub Repos", back: "Open Source" },
  { value: "3+", label: "AI Projects", back: "NLP · CV · RAG" },
];

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const step = Math.ceil(target / 30);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(cur);
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
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
    const ry = ((x - cx) / cx) * 12;
    const rx = -((y - cy) / cy) * 12;
    setImgTilt({ transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`, transition: "transform 0.08s linear" });
  };

  const onImgLeave = () => setImgTilt({
    transform: "perspective(800px) rotateX(0) rotateY(0) scale(1)",
    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)"
  });

  return (
    <div id="about" className="my-12 lg:my-20 relative mesh-bg">
      {/* Decorative orbs */}
      <div className="orb orb-violet w-64 h-64 -top-16 -right-16 opacity-40" />
      <div className="orb orb-cyan w-48 h-48 bottom-0 -left-12 opacity-30" style={{ animationDelay: "-4s" }} />

      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8 z-10">
        <span className="section-heading rotate-90 p-2 px-5">ABOUT ME</span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-violet-500/50 to-transparent mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="font-semibold mb-4 text-[#16f2b3] text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#16f2b3]" />
            Who I am?
          </p>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed lg:leading-loose">
            {personalData.description}
          </p>

          {/* 3D flip stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8">
            {aboutStats.map((stat, i) => {
              const num = parseInt(stat.value);
              const hasSuffix = stat.value.includes("+");
              return (
                <div key={i} className="stat-card-3d h-20">
                  <div className="stat-inner h-full">
                    <div className="stat-front h-full">
                      <p className="text-2xl font-extrabold text-[#16f2b3]">
                        <CountUp target={num} suffix={hasSuffix ? "+" : ""} />
                      </p>
                      <p className="text-[10px] text-gray-400 text-center mt-1 uppercase tracking-wide">{stat.label}</p>
                    </div>
                    <div className="stat-back h-full">
                      <p className="text-xs text-[#16f2b3] font-semibold text-center tracking-wide">{stat.back}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile image with 3D tilt */}
        <div className="flex justify-center order-1 lg:order-2">
          <div
            ref={imgRef}
            onMouseMove={onImgMove}
            onMouseLeave={onImgLeave}
            style={imgTilt}
            className="relative group cursor-pointer"
          >
            {/* Outer glow — outside the image bounds, no overflow-hidden here */}
            <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
            {/* Image + border glow — clipped to the image shape */}
            <div className="relative rounded-xl overflow-hidden w-[200px] h-[250px] sm:w-[240px] sm:h-[300px] md:w-[280px] md:h-[350px]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/30 to-[#16f2b3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              <Image
                src={personalData.profile}
                width={280}
                height={350}
                alt="Harshit Gupta"
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
