"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll, { passive: true });
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      className="hidden lg:flex fixed bottom-8 right-6 z-50 items-center rounded-full bg-gradient-to-r from-pink-500/70 to-violet-600/70 backdrop-blur-sm p-4 hover:from-pink-500 hover:to-violet-600 transition-all duration-300 ease-out shadow-lg"
      onClick={onClickBtn}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
