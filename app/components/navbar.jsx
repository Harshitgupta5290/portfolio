"use client"
// @flow strict
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  const isHome = pathname === "/";
  const navLinks = [
    { label: "ABOUT", href: isHome ? "#about" : "/#about", section: "about" },
    { label: "EXPERIENCE", href: isHome ? "#experience" : "/#experience", section: "experience" },
    { label: "SKILLS", href: isHome ? "#skills" : "/#skills", section: "skills" },
    { label: "EDUCATION", href: isHome ? "#education" : "/#education", section: "education" },
    { label: "PROJECTS", href: isHome ? "#projects" : "/#projects", section: "projects" },
    { label: "CERTIFICATIONS", href: isHome ? "#certifications" : "/#certifications", section: "certifications" },
    { label: "BLOGS", href: "/blog", section: "blog" },
    { label: "CONTACT", href: isHome ? "#contact" : "/#contact", section: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 30);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Active section detection
      const sections = navLinks
        .filter((l) => l.section !== "blog")
        .map((l) => l.section);
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (link) => {
    if (link.href === "/blog") return pathname?.startsWith("/blog");
    return activeSection === link.section;
  };

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
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href}>
                <Link
                  className="relative block px-3 py-2 no-underline outline-none hover:no-underline group"
                  href={link.href}
                >
                  <div className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                    {link.label}
                  </div>
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-3 right-3 h-[1px] origin-left transition-all duration-300 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3] scale-x-100" : "bg-pink-500 scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger button */}
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
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href} className="w-full">
                  <Link
                    className="flex items-center gap-3 px-6 py-3 no-underline outline-none hover:no-underline group"
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${active ? "bg-[#16f2b3] shadow-[0_0_6px_#16f2b3]" : "bg-gray-700 group-hover:bg-pink-500"}`} />
                    <div className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${active ? "text-[#16f2b3]" : "text-gray-400 group-hover:text-white"}`}>
                      {link.label}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
