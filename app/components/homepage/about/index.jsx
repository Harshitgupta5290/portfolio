// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const aboutStats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Microservices Built" },
  { value: "5+", label: "AI Projects" },
  { value: "6", label: "Certifications" },
];


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {aboutStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0d1224] border border-[#1b2c68a0]">
                <p className="text-xl font-bold text-[#16f2b3]">{stat.value}</p>
                <p className="text-[11px] text-gray-400 text-center mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <Image
            src={personalData.profile}
            width={280}
            height={350}
            alt="Harshit Gupta"
            className="rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;