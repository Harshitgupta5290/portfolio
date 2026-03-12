// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from 'react-icons/fa';
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";

function ContactSection() {
  return (
    <div id="contact" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Contact
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="flex flex-col items-center text-white py-6 gap-10">
        <div className="text-center max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Let&apos;s <span className="text-[#16f2b3]">Connect</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Open to full-time roles, freelance projects, and collaboration on AI &amp; backend systems.
            Feel free to reach out — I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <a
            href={`mailto:${personalData.email}`}
            className="flex flex-col items-center gap-2 p-5 rounded-xl bg-[#0d1224] border border-[#1b2c68a0] hover:border-[#16f2b3] transition-all duration-300 group"
          >
            <MdAlternateEmail className="text-[#8b98a5] group-hover:text-[#16f2b3] transition-colors duration-300" size={28} />
            <span className="text-xs text-gray-400 text-center break-all">{personalData.email}</span>
          </a>

          <a
            href={`tel:${personalData.phone}`}
            className="flex flex-col items-center gap-2 p-5 rounded-xl bg-[#0d1224] border border-[#1b2c68a0] hover:border-[#16f2b3] transition-all duration-300 group"
          >
            <IoMdCall className="text-[#8b98a5] group-hover:text-[#16f2b3] transition-colors duration-300" size={28} />
            <span className="text-xs text-gray-400 text-center">{personalData.phone}</span>
          </a>

          <div className="flex flex-col items-center gap-2 p-5 rounded-xl bg-[#0d1224] border border-[#1b2c68a0]">
            <CiLocationOn className="text-[#8b98a5]" size={28} />
            <span className="text-xs text-gray-400 text-center">{personalData.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link target="_blank" href={personalData.github}>
            <IoLogoGithub className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={44} />
          </Link>
          <Link target="_blank" href={personalData.linkedIn}>
            <BiLogoLinkedin className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={44} />
          </Link>
          <Link target="_blank" href={personalData.instagram}>
            <FaInstagram className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer" size={44} />
          </Link>
        </div>

        <Link
          href={`mailto:${personalData.email}`}
          className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200"
        >
          <MdAlternateEmail size={18} />
          Send me an Email
        </Link>
      </div>
    </div>
  );
}

export default ContactSection;
