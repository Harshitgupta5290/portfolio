// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex flex-col items-center my-5 lg:py-8 gap-3">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white tracking-tight">
          Experience
        </h2>
        <div className="w-12 h-[3px] bg-[#16f2b3] rounded-full" />
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="hidden lg:flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(experience => (
                  <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {experience.duration}
                        </p>
                      </div>
                      <div className="flex items-start gap-x-8 px-3 py-5">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125 mt-1 shrink-0">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div className="flex-1">
                          <p className="text-base sm:text-xl mb-1 font-medium uppercase">
                            {experience.title}
                          </p>
                          <p className="text-sm sm:text-base text-gray-400 mb-3">
                            {experience.company}
                          </p>
                          {experience.points && experience.points.length > 0 && (
                            <ul className="flex flex-col gap-2">
                              {experience.points.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                                  <span className="text-[#16f2b3] mt-1 shrink-0">▹</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;