"use client";
import { useEffect, useRef } from "react";

// ─── Lightweight neural network canvas using vanilla WebGL-style Canvas2D ──────
// Three.js adds ~180KB even tree-shaken; a hand-coded canvas is <1KB and faster
// for this 2-D particle-connection pattern.

const CONFIG = {
  NODES:        80,
  CONNECT_DIST: 140,       // px — max edge distance
  PACKET_SPEED: 1.2,       // data-packet travel speed
  NODE_RADIUS:  2.5,
  SPEED:        0.35,
  MOUSE_RADIUS: 180,       // px — mouse repulsion radius
  MOUSE_FORCE:  0.015,     // repulsion strength
  COLORS: {
    node:   "rgba(22,242,179,",
    edge:   "rgba(22,242,179,",
    packet: "rgba(232,197,71,",   // gold data packets
  },
};

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

export default function NeuralNetCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── State ──────────────────────────────────────────────────────────────────
    let nodes   = [];
    let packets = [];
    let mouse   = { x: -9999, y: -9999 };
    let raf;
    let frame = 0;
    const mobile = isMobile();
    const nodeCount = mobile ? 40 : CONFIG.NODES;

    // ── Canvas resize ─────────────────────────────────────────────────────────
    let resizeTimer;
    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initNodes(); }, 200);
    }

    // ── Node factory ──────────────────────────────────────────────────────────
    function makeNode() {
      return {
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.SPEED,
        vy: (Math.random() - 0.5) * CONFIG.SPEED,
        r:  CONFIG.NODE_RADIUS + Math.random() * 1.5,
        alpha: 0.4 + Math.random() * 0.5,
      };
    }

    function initNodes() {
      nodes   = Array.from({ length: nodeCount }, makeNode);
      packets = [];
    }

    // ── Mouse tracking ────────────────────────────────────────────────────────
    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // ── Packet spawning ───────────────────────────────────────────────────────
    function maybeSpawnPacket(a, b) {
      if (Math.random() > 0.0015) return;
      packets.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0 });
    }

    // ── Draw ──────────────────────────────────────────────────────────────────
    function draw() {
      if (document.hidden) { raf = requestAnimationFrame(draw); return; }
      frame++;
      // 30fps on mobile
      if (mobile && frame % 2 !== 0) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONFIG.MOUSE_RADIUS * CONFIG.MOUSE_RADIUS && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = CONFIG.MOUSE_FORCE * (1 - dist / CONFIG.MOUSE_RADIUS);
          n.vx += (dx / dist) * force * 3;
          n.vy += (dy / dist) * force * 3;
        }

        // Damping + move
        n.vx *= 0.995;
        n.vy *= 0.995;
        n.x  += n.vx;
        n.y  += n.vy;

        // Wrap edges
        if (n.x < -10)               n.x = canvas.width  + 10;
        if (n.x > canvas.width  + 10) n.x = -10;
        if (n.y < -10)               n.y = canvas.height + 10;
        if (n.y > canvas.height + 10) n.y = -10;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.COLORS.node + n.alpha + ")";
        ctx.fill();
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > CONFIG.CONNECT_DIST * CONFIG.CONNECT_DIST) continue;

          const dist  = Math.sqrt(distSq);
          const alpha = (1 - dist / CONFIG.CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = CONFIG.COLORS.edge + alpha + ")";
          ctx.lineWidth   = 0.7;
          ctx.stroke();

          maybeSpawnPacket(a, b);
        }
      }

      // Draw + advance packets
      packets = packets.filter((p) => {
        p.t += CONFIG.PACKET_SPEED / 100;
        if (p.t >= 1) return false;
        const x = p.ax + (p.bx - p.ax) * p.t;
        const y = p.ay + (p.by - p.ay) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.COLORS.packet + "0.9)";
        ctx.fill();
        return true;
      });

      raf = requestAnimationFrame(draw);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    resize();
    initNodes();
    draw();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
