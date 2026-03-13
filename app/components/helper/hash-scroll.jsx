"use client";
import { useEffect } from "react";

// Reads window.location.hash on mount and scrolls to the target element.
// Retries up to 10 times (1s apart) to handle ssr:false dynamic sections
// that aren't mounted immediately.
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 10) {
        attempts++;
        setTimeout(tryScroll, 200);
      }
    };
    setTimeout(tryScroll, 100);
  }, []);
  return null;
}
