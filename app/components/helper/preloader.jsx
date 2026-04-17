"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Compiling modules...",
  "Connecting services...",
  "Bundling assets...",
  "Running type checks...",
  "Loading portfolio...",
  "Optimizing render...",
  "Almost there...",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [phrase, setPhrase] = useState(PHRASES[0]);

  useEffect(() => {
    let idx = 0;
    const phraseInterval = setInterval(() => {
      idx = (idx + 1) % PHRASES.length;
      setPhrase(PHRASES[idx]);
    }, 400);
    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    let animFrame;
    let startTime = null;
    const totalDuration = 1800;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / totalDuration, 1);
      setProgress(Math.round(easeOutCubic(t) * 95));
      if (t < 1) animFrame = requestAnimationFrame(animateProgress);
    };

    animFrame = requestAnimationFrame(animateProgress);

    const finish = () => {
      cancelAnimationFrame(animFrame);
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 750);
      }, 350);
    };

    if (document.readyState === "complete") {
      setTimeout(finish, 600);
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const fallback = setTimeout(finish, 5000);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader-root"
      style={{
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.04)" : "scale(1)",
      }}
    >
      {/* Grid background */}
      <div className="preloader-grid" />

      {/* Radial glow */}
      <div className="preloader-glow" />

      {/* Orbital rings + monogram */}
      <div className="preloader-orbit">
        <div className="preloader-ring preloader-ring-outer" />
        <div className="preloader-ring preloader-ring-mid" />
        <div className="preloader-ring preloader-ring-inner" />

        {/* Corner dots */}
        <div className="preloader-dot preloader-dot-tl" />
        <div className="preloader-dot preloader-dot-tr" />
        <div className="preloader-dot preloader-dot-bl" />
        <div className="preloader-dot preloader-dot-br" />

        {/* Monogram */}
        <div className="preloader-monogram">&lt;HG/&gt;</div>
      </div>

      {/* Counter */}
      <div className="preloader-counter">
        {String(progress).padStart(2, "0")}
        <span className="preloader-percent">%</span>
      </div>

      {/* Loading label — cycles through technical phrases */}
      <div className="preloader-label">{phrase}</div>

      {/* Progress bar */}
      <div className="preloader-bar-track">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
