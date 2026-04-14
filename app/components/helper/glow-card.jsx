"use client"

import { useEffect, useRef } from 'react';

const CONFIG = {
  proximity: 40,
  spread: 80,
  blur: 12,
  gap: 32,
  vertical: false,
  opacity: 0,
};

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Apply container CSS vars once
    container.style.setProperty('--gap', CONFIG.gap);
    container.style.setProperty('--blur', CONFIG.blur);
    container.style.setProperty('--spread', CONFIG.spread);
    container.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');

    const CARDS = container.querySelectorAll(`.glow-card-${identifier}`);

    // Use pointermove on the viewport — but register only one listener per
    // unique identifier to avoid stacking on re-renders
    const UPDATE = (event) => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        const near =
          event.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity;

        CARD.style.setProperty('--active', near ? 1 : CONFIG.opacity);

        const cx = CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5;
        const cy = CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5;
        let angle = (Math.atan2(event.y - cy, event.x - cx) * 180) / Math.PI;
        if (angle < 0) angle += 360;
        CARD.style.setProperty('--start', angle + 90);
      }
    };

    // Register on window with { passive: true } — single listener per card group
    window.addEventListener('pointermove', UPDATE, { passive: true });
    return () => window.removeEventListener('pointermove', UPDATE);
  }, [identifier]);

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
