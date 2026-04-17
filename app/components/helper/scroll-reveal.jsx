"use client";
import { motion } from "framer-motion";

/**
 * ScrollReveal
 * Wraps children with a Framer Motion whileInView fade-up entrance.
 * Fires once — no re-trigger on scroll-back.
 */
export default function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
