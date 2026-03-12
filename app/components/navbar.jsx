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
          <Link href="/" className="text-[#16f2b3] text-xl sm:text-3xl font-bold">
            HARSHIT GUPTA
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:items-center md:space-x-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={link.href}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-start pb-4 gap-1">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full">
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
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
