// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from 'next/link';
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { HiDocumentDownload } from "react-icons/hi";

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-[#16f2b3]">Harshit Gupta</span> · New Delhi, India
          </p>
          <div className="flex items-center gap-5">
            <Link
              target="_blank"
              href={personalData.github}
              className="text-gray-400 hover:text-[#16f2b3] transition-colors duration-300"
              aria-label="GitHub"
            >
              <BsGithub size={20} />
            </Link>
            <Link
              target="_blank"
              href={personalData.linkedIn}
              className="text-gray-400 hover:text-[#16f2b3] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <BsLinkedin size={20} />
            </Link>
            <Link
              target="_blank"
              href={personalData.instagram}
              className="text-gray-400 hover:text-[#16f2b3] transition-colors duration-300"
              aria-label="Instagram"
            >
              <BsInstagram size={20} />
            </Link>
            <Link
              target="_blank"
              href={personalData.resume}
              className="text-gray-400 hover:text-[#16f2b3] transition-colors duration-300"
              aria-label="Resume"
            >
              <HiDocumentDownload size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;