"use client";

import { FaBrain, FaCertificate, FaClock, FaServer } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';
import { yearsExperience, aiProjectCount, certCount, MICROSERVICES_COUNT, API_LATENCY_REDUCTION } from "@/utils/data/computed-stats";

const stats = [
  { icon: FaClock,       value: `${yearsExperience}+`,        label: "Years Experience",    color: "text-[#16f2b3]",  border: "hover:border-[#16f2b3]" },
  { icon: FaServer,      value: `${MICROSERVICES_COUNT}+`,    label: "Microservices Built", color: "text-violet-400", border: "hover:border-violet-400" },
  { icon: FaBrain,       value: `${aiProjectCount}+`,         label: "AI Projects",         color: "text-pink-400",   border: "hover:border-pink-400" },
  { icon: FaCertificate, value: `${certCount}`,               label: "Certifications",      color: "text-amber-400",  border: "hover:border-amber-400" },
  { icon: MdSpeed,       value: `${API_LATENCY_REDUCTION}%`,  label: "API Latency Reduced", color: "text-cyan-400",   border: "hover:border-cyan-400" },
];

function Stats() {
  return (
    <div className="border-t border-[var(--line)] py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-5 rounded-xl bg-[var(--card)] border border-[var(--line)] ${stat.border} transition-all duration-300 group`}
            >
              <Icon className={`text-2xl mb-2 ${stat.color} group-hover:scale-125 transition-all duration-300`} />
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[var(--ink-2)] text-center mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
