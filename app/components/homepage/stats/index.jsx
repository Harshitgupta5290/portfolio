"use client";

import { FaBrain, FaCertificate, FaClock, FaServer } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';
import { certifications } from "@/utils/data/certifications";

const stats = [
  { icon: FaClock, value: "3+", label: "Years Experience", color: "text-[#16f2b3]", border: "hover:border-[#16f2b3]" },
  { icon: FaServer, value: "20+", label: "Microservices Built", color: "text-violet-400", border: "hover:border-violet-400" },
  { icon: FaBrain, value: "5+", label: "AI Projects", color: "text-pink-400", border: "hover:border-pink-400" },
  { icon: FaCertificate, value: `${certifications.length}`, label: "Certifications", color: "text-amber-400", border: "hover:border-amber-400" },
  { icon: MdSpeed, value: "35%", label: "API Latency Reduced", color: "text-cyan-400", border: "hover:border-cyan-400" },
];

function Stats() {
  return (
    <div className="border-t border-[#25213b] py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-5 rounded-xl bg-[#0d1224] border border-[#1b2c68a0] ${stat.border} transition-all duration-300 group`}
            >
              <Icon className={`text-2xl mb-2 ${stat.color} group-hover:scale-125 transition-all duration-300`} />
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400 text-center mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
