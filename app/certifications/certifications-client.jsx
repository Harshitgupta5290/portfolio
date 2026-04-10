"use client";

import { useState } from "react";
import { certifications, certCategories, categoryMeta } from "@/utils/data/certifications";
import CertCard from "@/app/components/certifications/cert-card";
import {
  FaCloud, FaDatabase, FaCode, FaLink, FaBrain, FaGlobe,
} from "react-icons/fa";

const categoryIcons = {
  "Cloud & AI":      FaCloud,
  "Database":        FaDatabase,
  "Web Development": FaGlobe,
  "Programming":     FaCode,
  "Problem Solving": FaBrain,
  "Blockchain":      FaLink,
};

export default function CertificationsClient() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? certifications
      : certifications.filter((c) => c.category === active);

  return (
    <>
      {/* ── Stats strip ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-12">
        {[
          { value: certifications.length, label: "Total Certifications" },
          { value: new Set(certifications.map((c) => c.category)).size, label: "Categories" },
          { value: new Set(certifications.map((c) => c.issuer)).size,   label: "Issuers" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] py-6 sm:py-8 px-4 backdrop-blur-sm"
          >
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-[#16f2b3] to-violet-400 bg-clip-text text-transparent">
              {value}+
            </span>
            <span className="text-[10px] sm:text-xs text-gray-600 mt-1.5 tracking-widest uppercase text-center">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* "All" tab */}
        <button
          onClick={() => setActive("All")}
          className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase border transition-all duration-200 ${
            active === "All"
              ? "bg-[#16f2b3]/10 text-[#16f2b3] border-[#16f2b3]/40 shadow-[0_0_16px_-4px_rgba(22,242,179,0.3)]"
              : "border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/20 bg-white/[0.02]"
          }`}
        >
          All
          <span className="ml-1.5 opacity-50">({certifications.length})</span>
        </button>

        {/* Category tabs */}
        {certCategories.filter((c) => c !== "All").map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = categoryIcons[cat] ?? FaCode;
          const count = certifications.filter((c) => c.category === cat).length;
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase border transition-all duration-200 ${
                isActive
                  ? `${meta.filterActive} shadow-[0_0_16px_-4px_rgba(0,0,0,0.5)]`
                  : "border-white/[0.07] text-gray-500 hover:text-gray-300 hover:border-white/20 bg-white/[0.02]"
              }`}
            >
              <Icon size={10} />
              {cat}
              <span className="opacity-50">({count})</span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map((cert) => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-700">
          <FaCode size={32} className="mb-4 opacity-30" />
          <p className="text-sm">No certifications in this category yet.</p>
        </div>
      )}
    </>
  );
}
