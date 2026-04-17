"use client";
import { useEffect, useRef } from "react";

const COLORS = [
  [22, 242, 179],   // cyan
  [139, 92, 246],   // violet
  [236, 72, 153],   // pink
];

// Pre-render a radial glow sprite once per color — eliminates ctx.shadowBlur on every frame
function createSprite(r, g, b, size = 12) {
  const s = document.createElement("canvas");
  s.width = s.height = size;
  const c = s.getContext("2d");
  const half = size / 2;
  const grad = c.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.95)`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.4)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  c.fillStyle = grad;
  c.fillRect(0, 0, size, size);
  return s;
}

const SPRITES = COLORS.map(([r, g, b]) => ({ r, g, b, sprite: null }));

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Build sprites once (requires DOM — safe inside useEffect)
    SPRITES.forEach((s) => {
      if (!s.sprite) s.sprite = createSprite(s.r, s.g, s.b, 14);
    });

    const isMobile = () => window.innerWidth < 768;
    const PARTICLE_COUNT = () => (isMobile() ? 15 : 40);
    const CONNECTION_DIST = () => (isMobile() ? 70 : 110);

    let particles = [];
    let W = 0, H = 0;

    // ── Resize with debounce — avoids GC storm on drag-resize ──────────────
    let resizeTimer = null;
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      // Only reinit if particle count target changed (mobile ↔ desktop flip)
      const target = PARTICLE_COUNT();
      if (particles.length !== target) {
        particles = Array.from({ length: target }, () => new Particle());
      } else {
        // Just clamp positions to new bounds — no GC
        particles.forEach((p) => {
          p.x = Math.min(p.x, W);
          p.y = Math.min(p.y, H);
        });
      }
    }
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }

    class Particle {
      constructor() { this.init(true); }
      init(initial = false) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : H + 10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(Math.random() * 0.2 + 0.05);
        this.size = Math.random() * 1.4 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.colorIdx = Math.floor(Math.random() * SPRITES.length);
      }
      update() {
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) { // 100px radius
            const dist = Math.sqrt(distSq);
            const force = (100 - dist) / 100;
            this.vx += (dx / dist) * force * 0.06;
            this.vy += (dy / dist) * force * 0.06;
          }
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.init(false);
      }
      draw() {
        // drawImage instead of arc+shadowBlur — 4× faster on most devices
        const { sprite } = SPRITES[this.colorIdx];
        const half = 7; // sprite is 14px, so half = 7
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(sprite, this.x - half, this.y - half);
        ctx.globalAlpha = 1;
      }
    }

    function drawConnections() {
      const dist = CONNECTION_DIST();
      const distSq = dist * dist;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < distSq) {
            const alpha = (1 - Math.sqrt(d2) / dist) * 0.18;
            const sc = SPRITES[a.colorIdx], ec = SPRITES[b.colorIdx];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${Math.round((sc.r+ec.r)/2)},${Math.round((sc.g+ec.g)/2)},${Math.round((sc.b+ec.b)/2)},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    let frameCount = 0;
    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      // Skip render when tab is hidden — zero GPU work in background
      if (document.hidden) return;
      // Throttle to ~30fps on mobile to save battery
      frameCount++;
      if (isMobile() && frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
    }

    // Mouse tracking — throttled to ~30fps
    const mouse = { x: null, y: null };
    let lastMouse = 0;
    const onMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouse < 32) return;
      lastMouse = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };

    // Initial sizing
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = Array.from({ length: PARTICLE_COUNT() }, () => new Particle());

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
