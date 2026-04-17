"use client";
import { useEffect, useRef } from "react";

// Enterprise client / work presence locations
const LOCATIONS = [
  // Home base
  { lat: 28.61,  lng: 77.21,   home: true,  label: "New Delhi" },
  // India
  { lat: 12.97,  lng: 77.59,   label: "Bangalore" },
  { lat: 19.08,  lng: 72.88,   label: "Mumbai" },
  // South / SE Asia
  { lat: 1.35,   lng: 103.82,  label: "Singapore" },
  { lat: 13.75,  lng: 100.52,  label: "Bangkok" },
  { lat: 3.14,   lng: 101.69,  label: "Kuala Lumpur" },
  // East Asia
  { lat: 35.68,  lng: 139.69,  label: "Tokyo" },
  { lat: 37.57,  lng: 126.98,  label: "Seoul" },
  { lat: 31.23,  lng: 121.47,  label: "Shanghai" },
  // Middle East
  { lat: 25.20,  lng: 55.27,   label: "Dubai" },
  { lat: 24.71,  lng: 46.68,   label: "Riyadh" },
  // Europe
  { lat: 51.51,  lng: -0.13,   label: "London" },
  { lat: 48.86,  lng: 2.35,    label: "Paris" },
  { lat: 52.52,  lng: 13.41,   label: "Berlin" },
  { lat: 52.37,  lng: 4.90,    label: "Amsterdam" },
  // North America
  { lat: 37.77,  lng: -122.42, label: "San Francisco" },
  { lat: 40.71,  lng: -74.01,  label: "New York" },
  { lat: 43.65,  lng: -79.38,  label: "Toronto" },
  // Africa
  { lat: -26.20, lng: 28.05,   label: "Johannesburg" },
  { lat: -1.29,  lng: 36.82,   label: "Nairobi" },
  // Oceania
  { lat: -33.87, lng: 151.21,  label: "Sydney" },
  // South America
  { lat: -23.55, lng: -46.63,  label: "São Paulo" },
  { lat: 4.71,   lng: -74.07,  label: "Bogotá" },
];

// Arc routes between key hubs
const ARC_ROUTES = [
  [0, 11], [0, 3], [0, 9], [0, 15], [0, 16],  // Delhi → world
  [3, 11], [3, 15], [11, 16], [11, 13],         // Singapore ↔ Europe/US
  [9, 11], [9, 12], [15, 16],                    // Dubai ↔ Europe, US↔US
  [7, 15], [6, 11], [2, 3],                      // Asia ↔ US/Europe
];

export default function WireframeGlobe() {
  const canvasRef    = useRef(null);
  const rotationRef  = useRef(1.8);  // start showing India-facing side
  const tiltRef      = useRef(0.2);  // slight downward tilt on load
  const dragRef      = useRef({ active: false, lastX: 0, lastY: 0 });
  const arcsRef      = useRef([]);
  const frameRef     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── Size ────────────────────────────────────────────────────────────
    const container = canvas.parentElement;
    function applySize() {
      const s = Math.min(container.offsetWidth || 560, 560);
      canvas.width  = s;
      canvas.height = s;
    }
    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(container);

    // ── Helpers — read canvas dimensions each call so resize works ──────
    function project(latDeg, lngDeg) {
      const sz   = canvas.width;
      const cx   = sz / 2,  cy = sz / 2,  R = sz * 0.38;
      const lat  = (latDeg * Math.PI) / 180;
      const lng  = (lngDeg * Math.PI) / 180;
      const rot  = rotationRef.current;
      const tilt = tiltRef.current;
      const x0 = R * Math.cos(lat) * Math.sin(lng + rot);
      const y0 = -R * Math.sin(lat);
      const z0 = R * Math.cos(lat) * Math.cos(lng + rot);
      const y1 = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
      const z1 = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
      return { sx: cx + x0, sy: cy + y1, z: z1, R, cx, cy, sz };
    }

    function arcCtrl(p1, p2) {
      const { cx, cy, R } = p1;
      const mx = (p1.sx + p2.sx) / 2;
      const my = (p1.sy + p2.sy) / 2;
      const dx = mx - cx,  dy = my - cy;
      const d  = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: mx + (dx / d) * R * 0.22, y: my + (dy / d) * R * 0.22 };
    }

    function bezier(p1, ctrl, p2, t) {
      const mt = 1 - t;
      return {
        x: mt * mt * p1.sx + 2 * mt * t * ctrl.x + t * t * p2.sx,
        y: mt * mt * p1.sy + 2 * mt * t * ctrl.y + t * t * p2.sy,
      };
    }

    // ── Arc management ──────────────────────────────────────────────────
    function spawnArc() {
      const route = ARC_ROUTES[Math.floor(Math.random() * ARC_ROUTES.length)];
      arcsRef.current.push({ a: route[0], b: route[1], t: 0, speed: 0.006 + Math.random() * 0.005 });
    }
    spawnArc(); spawnArc(); // seed two arcs immediately

    // ── Draw ────────────────────────────────────────────────────────────
    let raf;

    function draw() {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return;

      const size = canvas.width;
      const cx   = size / 2,  cy = size / 2,  R = size * 0.38;
      frameRef.current++;
      ctx.clearRect(0, 0, size, size);

      // Auto-rotate when not dragging
      if (!dragRef.current.active) {
        rotationRef.current += 0.0025;
      }

      // Spawn new arc periodically
      if (frameRef.current % 180 === 0 && arcsRef.current.length < 4) spawnArc();

      // ── Sphere glow ───────────────────────────────────────────────────
      const grd = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.1);
      grd.addColorStop(0, "rgba(22,242,179,0.04)");
      grd.addColorStop(1, "rgba(22,242,179,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // ── Sphere outline ────────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(22,242,179,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Latitude lines ────────────────────────────────────────────────
      for (const latDeg of [-60, -30, 0, 30, 60]) {
        ctx.beginPath();
        let first = true;
        for (let lng = 0; lng <= 360; lng += 4) {
          const { sx, sy, z } = project(latDeg, lng);
          const alpha = Math.max(0, z / R) * 0.18 + 0.04;
          if (first) { ctx.beginPath(); ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(22,242,179,0.10)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Longitude lines ───────────────────────────────────────────────
      for (let lngDeg = 0; lngDeg < 180; lngDeg += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 4) {
          const { sx, sy, z } = project(lat, lngDeg);
          const visible = z > -R * 0.15;
          if (!visible) { first = true; continue; }
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(22,242,179,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Opposite meridian
        ctx.beginPath();
        first = true;
        for (let lat = -90; lat <= 90; lat += 4) {
          const { sx, sy, z } = project(lat, lngDeg + 180);
          const visible = z > -R * 0.15;
          if (!visible) { first = true; continue; }
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(22,242,179,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Arcs ──────────────────────────────────────────────────────────
      arcsRef.current = arcsRef.current.filter((arc) => {
        const p1   = project(LOCATIONS[arc.a].lat, LOCATIONS[arc.a].lng);
        const p2   = project(LOCATIONS[arc.b].lat, LOCATIONS[arc.b].lng);
        if (p1.z < -R * 0.4 || p2.z < -R * 0.4) { arc.t += arc.speed; return arc.t < 1; }

        const ctrl = arcCtrl(p1, p2);

        // Draw trail
        const steps = Math.max(1, Math.floor(arc.t * 40));
        ctx.beginPath();
        const p0 = bezier(p1, ctrl, p2, 0);
        ctx.moveTo(p0.x, p0.y);
        for (let i = 1; i <= steps; i++) {
          const { x, y } = bezier(p1, ctrl, p2, (i / 40) * arc.t * (40 / steps));
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(232,197,71,0.28)";
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Particle head
        const head = bezier(p1, ctrl, p2, arc.t);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,197,71,0.95)";
        ctx.fill();

        arc.t += arc.speed;
        return arc.t < 1;
      });

      // ── Location dots ─────────────────────────────────────────────────
      // Sort by z so front dots draw on top
      const sorted = LOCATIONS
        .map((loc, i) => ({ ...loc, ...project(loc.lat, loc.lng), i }))
        .sort((a, b) => a.z - b.z);

      for (const loc of sorted) {
        if (loc.z < -R * 0.05) continue;
        const alpha = Math.min(1, (loc.z / R) * 1.2 + 0.1);

        if (loc.home) {
          // New Delhi — gold, larger, pulsing glow
          const pulse = 0.5 + 0.5 * Math.sin(frameRef.current * 0.06);
          ctx.beginPath();
          ctx.arc(loc.sx, loc.sy, 9 + pulse * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,197,71,${0.06 * alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(loc.sx, loc.sy, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,197,71,${0.25 * alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(loc.sx, loc.sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,197,71,${alpha})`;
          ctx.fill();

          // Label
          if (alpha > 0.5) {
            ctx.font = `bold ${Math.round(9 * (size / 440))}px 'Courier New', monospace`;
            ctx.fillStyle = `rgba(232,197,71,${alpha * 0.9})`;
            ctx.fillText("◉ New Delhi", loc.sx + 7, loc.sy - 4);
          }
        } else {
          // Other cities — cyan dots
          ctx.beginPath();
          ctx.arc(loc.sx, loc.sy, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(22,242,179,${0.08 * alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(loc.sx, loc.sy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(22,242,179,${0.85 * alpha})`;
          ctx.fill();
        }
      }

      // ── Legend ────────────────────────────────────────────────────────
      const fontSize = Math.round(8 * (size / 440));
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.fillStyle = "rgba(22,242,179,0.5)";
      ctx.fillText(`${LOCATIONS.length} cities · 6 continents`, cx - 52, size - 14);
    }

    draw();

    // ── Mouse / touch drag ────────────────────────────────────────────
    function onMouseDown(e) {
      dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
    }
    function onMouseMove(e) {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      rotationRef.current += dx * 0.008;
      tiltRef.current = Math.max(-1.2, Math.min(1.2, tiltRef.current + dy * 0.008));
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    }
    function onMouseUp() { dragRef.current.active = false; }

    function onTouchStart(e) {
      dragRef.current = { active: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
    }
    function onTouchMove(e) {
      if (!dragRef.current.active) return;
      const dx = e.touches[0].clientX - dragRef.current.lastX;
      const dy = e.touches[0].clientY - dragRef.current.lastY;
      rotationRef.current += dx * 0.008;
      tiltRef.current = Math.max(-1.2, Math.min(1.2, tiltRef.current + dy * 0.008));
      dragRef.current.lastX = e.touches[0].clientX;
      dragRef.current.lastY = e.touches[0].clientY;
    }
    function onTouchEnd() { dragRef.current.active = false; }

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove,  { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive globe showing client locations across 6 continents"
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ maxWidth: 560, maxHeight: 560 }}
    />
  );
}
