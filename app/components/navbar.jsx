"use client";
// @flow strict
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { useLocale, SUPPORTED_LOCALES } from "@/app/context/locale-context";

const SECTIONS = [
  { label: "ABOUT",          section: "about" },
  { label: "EXPERIENCE",     section: "experience" },
  { label: "SKILLS",         section: "skills" },
  { label: "PROJECTS",       section: "projects" },
  { label: "EDUCATION",      section: "education" },
  { label: "CERTIFICATIONS", section: "certifications" },
  { label: "BLOGS",          section: "blogs" },
  { label: "CONTACT",        section: "contact" },
];

const LANGUAGE_NAMES = {
  en: "English", hi: "हिन्दी", es: "Español", fr: "Français",
  de: "Deutsch", pt: "Português", zh: "中文", ja: "日本語",
  ar: "العربية", ru: "Русский", ko: "한국어", it: "Italiano",
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState("");
  const [langOpen, setLangOpen]             = useState(false);

  const pathname   = usePathname();
  const isHome     = pathname === "/";
  const langRef    = useRef(null);

  const { locale, setLocale }              = useLocale();

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(scrollTop > 30);
        setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        let current = "";
        for (const { section } of SECTIONS) {
          const el = document.getElementById(section);
          if (el && el.getBoundingClientRect().top <= 100) current = section;
        }
        setActiveSection(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (e, section) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      window.location.href = `${base}/#${section}`;
    }
  };

  const isItemActive = (section, href) =>
    href ? pathname?.startsWith(href) || activeSection === section : activeSection === section;

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
          {SECTIONS.map(({ label, section, isRoute, href }) => {
            if (isRoute) {
              const active = isItemActive(section, href);
              return (
                <li key={section}>
                  <Link href={href} className="relative block px-3 py-2 no-underline outline-none hover:no-underline group">
                    <div className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                      {label}
                    </div>
                    <span className={`absolute bottom-0 left-3 right-3 h-[1px] origin-left transition-all duration-300 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3] scale-x-100" : "bg-pink-500 scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              );
            }
            const active = isItemActive(section);
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
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-2">

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Select language"
              className="flex items-center gap-1.5 p-2 rounded-md border border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
            >
              <MdLanguage size={17} />
              <span className="text-[10px] font-mono uppercase tracking-wider">{locale}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 z-[200] w-40 rounded-lg border border-white/10 bg-[#0d1117]/95 backdrop-blur-md shadow-xl overflow-hidden">
                <div className="py-1 max-h-64 overflow-y-auto">
                  {SUPPORTED_LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150 ${locale === l ? "text-[#16f2b3] bg-[#16f2b3]/10" : "text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]"}`}
                    >
                      <span>{LANGUAGE_NAMES[l]}</span>
                      <span className="text-[10px] font-mono text-[var(--ink-3)]">{l}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resume button */}
          <Link
            href="/Harshit_Gupta_Resume.pdf"
            download="Harshit_Gupta_Resume.pdf"
            target="_blank"
            className="flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-md border border-[#16f2b3]/40 text-[#16f2b3] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#16f2b3]/10 hover:border-[#16f2b3] transition-all duration-300"
          >
            Resume
          </Link>
        </div>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`absolute inset-0 rounded-md bg-white/5 transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0"}`} />
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
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
            {SECTIONS.map(({ label, section, isRoute, href }) => {
              if (isRoute) {
                const active = isItemActive(section, href);
                return (
                  <li key={section} className="w-full">
                    <Link href={href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 no-underline outline-none group">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" : "bg-gray-700 group-hover:bg-pink-500"}`} />
                      <div className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>{label}</div>
                    </Link>
                  </li>
                );
              }
              const active = isItemActive(section);
              return (
                <li key={section} className="w-full">
                  <a href={`#${section}`} onClick={(e) => handleSectionClick(e, section)} className="flex items-center gap-3 px-6 py-3 no-underline outline-none group cursor-pointer">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" : "bg-gray-700 group-hover:bg-pink-500"}`} />
                    <div className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>{label}</div>
                  </a>
                </li>
              );
            })}

            {/* Mobile language picker row */}
            <li className="w-full px-6 py-3">
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setIsMenuOpen(false); }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors duration-150 ${locale === l ? "border-[#16f2b3]/50 text-[#16f2b3] bg-[#16f2b3]/10" : "border-white/10 text-gray-500 hover:text-white hover:border-white/25"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </li>

            {/* Resume — mobile */}
            <li className="w-full px-6 py-3 md:hidden">
              <Link href="/Harshit_Gupta_Resume.pdf" download="Harshit_Gupta_Resume.pdf" target="_blank" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" />
                <div className="text-xs font-semibold tracking-widest uppercase text-[#16f2b3]">Resume</div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
