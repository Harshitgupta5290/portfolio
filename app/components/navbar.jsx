"use client"
// @flow strict
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const SECTIONS = [
  { label: "ABOUT",          section: "about" },
  { label: "EXPERIENCE",     section: "experience" },
  { label: "SKILLS",         section: "skills" },
  { label: "EDUCATION",      section: "education" },
  { label: "PROJECTS",       section: "projects" },
  { label: "CERTIFICATIONS", section: "certifications" },
  { label: "CONTACT",        section: "contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome   = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 30);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Active section detection — only meaningful on home page
      if (!document.getElementById("about")) return;
      let current = "";
      for (const { section } of SECTIONS) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) current = section;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click handler for all section links
  const handleSectionClick = (e, section) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isHome) {
      // Same page — smooth scroll
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Different page — full reload so browser handles hash scroll natively
      // NEXT_PUBLIC_BASE_PATH is '/portfolio' in production, '' locally
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      window.location.href = `${base}/#${section}`;
    }
  };

  const isSectionActive = (section) => activeSection === section;
  const isBlogActive    = () => pathname?.startsWith("/blog");

  return (
    <nav className="relative bg-transparent">
      <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>

        {/* Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="group relative flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16f2b3] shadow-[0_0_8px_#16f2b3] group-hover:shadow-[0_0_16px_#16f2b3] transition-all duration-300" />
            <span className="text-[#16f2b3] text-lg sm:text-xl font-bold tracking-widest uppercase group-hover:tracking-[0.2em] transition-all duration-300">
              HARSHIT GUPTA
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex lg:items-center lg:gap-0.5">
          {SECTIONS.map(({ label, section }) => {
            const active = isSectionActive(section);
            return (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleSectionClick(e, section)}
                  className="relative block px-3 py-2 no-underline outline-none hover:no-underline group cursor-pointer"
                >
                  <div className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                    {label}
                  </div>
                  <span className={`absolute bottom-0 left-3 right-3 h-[1px] origin-left transition-all duration-300 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3] scale-x-100" : "bg-pink-500 scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              </li>
            );
          })}
          <li>
            <Link
              href="/blog"
              className="relative block px-3 py-2 no-underline outline-none hover:no-underline group"
            >
              <div className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${isBlogActive() ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                BLOGS
              </div>
              <span className={`absolute bottom-0 left-3 right-3 h-[1px] origin-left transition-all duration-300 ${isBlogActive() ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3] scale-x-100" : "bg-pink-500 scale-x-0 group-hover:scale-x-100"}`} />
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden relative p-2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`absolute inset-0 rounded-md bg-white/5 transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16f2b3] via-violet-500 to-pink-500 transition-all duration-100 shadow-[0_0_8px_rgba(22,242,179,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-50 border-t border-[#1b2c6850] bg-[#0d1224]/95 backdrop-blur-md">
          <ul className="flex flex-col py-2">
            {SECTIONS.map(({ label, section }) => {
              const active = isSectionActive(section);
              return (
                <li key={section} className="w-full">
                  <a
                    href={`#${section}`}
                    onClick={(e) => handleSectionClick(e, section)}
                    className="flex items-center gap-3 px-6 py-3 no-underline outline-none group cursor-pointer"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" : "bg-gray-700 group-hover:bg-pink-500"}`} />
                    <div className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                      {label}
                    </div>
                  </a>
                </li>
              );
            })}
            <li className="w-full">
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-3 no-underline outline-none group"
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${isBlogActive() ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" : "bg-gray-700 group-hover:bg-pink-500"}`} />
                <div className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${isBlogActive() ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                  BLOGS
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
