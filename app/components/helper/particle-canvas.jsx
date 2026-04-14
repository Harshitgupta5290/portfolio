"use client";
import { useEffect, useRef } from "react";

const COLORS = [
  [22, 242, 179],    // cyan
  [139, 92, 246],   // violet
  [236, 72, 153],   // pink
];

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const mouse = { x: null, y: null };

    const isMobile = () => window.innerWidth < 768;
    const PARTICLE_COUNT = () => (isMobile() ? 15 : 40);
    const CONNECTION_DIST = () => (isMobile() ? 60 : 100);

    let particles = [];
    let W = 0, H = 0;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    }

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : H + 10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(Math.random() * 0.2 + 0.05);
        this.size = Math.random() * 1.2 + 0.4;
        this.baseOpacity = Math.random() * 0.4 + 0.15;
        this.opacity = this.baseOpacity;
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.r = c[0]; this.g = c[1]; this.b = c[2];
      }
      update() {
        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            this.vx += (dx / dist) * force * 0.06;
            this.vy += (dy / dist) * force * 0.06;
          }
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;

        // Wrap x
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        // Reset when off top
        if (this.y < -10) this.reset(false);
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${this.r},${this.g},${this.b},0.4)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT() }, () => new Particle());
    }

    function drawConnections() {
      const dist = CONNECTION_DIST();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            const alpha = (1 - d / dist) * 0.18;
            // Blend colors of two particles
            const r = Math.round((a.r + b.r) / 2);
            const g = Math.round((a.g + b.g) / 2);
            const bb = Math.round((a.b + b.b) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bb},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });
      rafRef.current = requestAnimationFrame(animate);
    }

    let lastMouse = 0;
    const onMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouse < 32) return; // ~30fps cap for mouse tracking
      lastMouse = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
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
