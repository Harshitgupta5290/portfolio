"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      rafId = requestAnimationFrame(animate);
    }

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    // Detect interactive elements
    const onHoverStart = (e) => {
      const el = e.target;
      if (el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    const onHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onHoverStart, { passive: true });
    document.addEventListener("mouseout", onHoverEnd, { passive: true });

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
    };
  }, [isVisible]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : isHovering ? 0 : 1})`,
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.8 : 1})`,
          borderColor: isHovering ? "rgba(22,242,179,0.8)" : "rgba(139,92,246,0.6)",
          backgroundColor: isHovering ? "rgba(22,242,179,0.06)" : "transparent",
        }}
        aria-hidden="true"
      />
    </>
  );
}
