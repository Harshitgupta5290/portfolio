"use client"
// @flow strict
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "ABOUT", href: "/#about" },
    { label: "EXPERIENCE", href: "/#experience" },
    { label: "SKILLS", href: "/#skills" },
    { label: "EDUCATION", href: "/#education" },
    { label: "PROJECTS", href: "/#projects" },
    { label: "CERTIFICATIONS", href: "/#certifications" },
    { label: "BLOGS", href: "/blog" },
    { label: "CONTACT", href: "/#contact" },
  ];

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-lg sm:text-2xl font-bold tracking-wide">
            HARSHIT GUPTA
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex lg:items-center lg:gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="block px-2 py-2 no-underline outline-none hover:no-underline"
                href={link.href}
              >
                <div className="text-xs font-medium tracking-wider text-gray-300 transition-colors duration-300 hover:text-pink-500">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col items-start pb-4 border-t border-gray-700 pt-3 gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full">
              <Link
                className="block px-4 py-2.5 no-underline outline-none hover:no-underline"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="text-sm font-medium tracking-wider text-gray-300 transition-colors duration-300 hover:text-pink-500">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
