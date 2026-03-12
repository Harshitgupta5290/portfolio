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
      {/* Top gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-col items-center mt-12 mb-14">
        <p className="text-[#16f2b3] text-[10px] uppercase tracking-[5px] font-mono mb-4">
          // get in touch
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center leading-tight">
          Let&apos;s{' '}
          <span className="bg-gradient-to-r from-violet-400 to-[#16f2b3] bg-clip-text text-transparent">
            Connect
          </span>
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-md text-center leading-relaxed">
          Open to full-time roles, freelance projects, and AI/backend collaborations.
          I usually respond within 24 hours.
        </p>
        <div className="w-20 h-[2px] bg-gradient-to-r from-violet-500 to-[#16f2b3] mt-5 rounded-full" />
      </div>

      {/* Main content: 3-column info + terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Contact info + socials — left 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">// contact info</p>

          {[
            { icon: MdAlternateEmail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, color: "#16f2b3" },
            { icon: IoMdCall, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone}`, color: "#a78bfa" },
            { icon: CiLocationOn, label: "Location", value: personalData.address, href: null, color: "#ec4899" },
          ].map(({ icon: Icon, label, value, href, color }) => (
            <div
              key={label}
              className="group flex items-center gap-4 p-4 rounded-xl border border-[#1b2c6840] bg-[#0d1224] hover:border-[#1b2c6880] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}12`, border: `1px solid ${color}28` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-0.5">{label}</p>
                {href ? (
                  <a href={href} className="text-gray-300 text-sm hover:text-white transition-colors duration-200 truncate block">
                    {value}
                  </a>
                ) : (
                  <p className="text-gray-300 text-sm">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social links */}
          <div className="mt-2">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-3">// find me on</p>
            <div className="flex items-center gap-3">
              {[
                { href: personalData.github, Icon: IoLogoGithub, label: "GitHub" },
                { href: personalData.linkedIn, Icon: BiLogoLinkedin, label: "LinkedIn" },
                { href: personalData.instagram, Icon: FaInstagram, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1b2c6840] bg-[#0d1224] hover:border-[#16f2b3]/40 hover:bg-[#16f2b305] transition-all duration-300"
                >
                  <Icon size={15} className="text-gray-500 group-hover:text-[#16f2b3] transition-colors duration-300" />
                  <span className="text-gray-500 group-hover:text-gray-300 text-xs font-mono transition-colors duration-300">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal — right 3 cols */}
        <div className="lg:col-span-3 rounded-xl border border-[#1b2c6840] bg-[#080d1a] overflow-hidden flex flex-col">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1b2c6830] flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-gray-600 text-[10px] font-mono ml-2">harshit@portfolio ~ status.sh</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[9px] font-mono">live</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-xs flex-1 space-y-3">
            <div>
              <span className="text-[#16f2b3]">$</span>
              <span className="text-gray-500"> whoami</span>
            </div>
            <p className="text-gray-400 pl-2">Harshit Gupta — Senior Product Engineer</p>

            <div className="pt-1">
              <span className="text-[#16f2b3]">$</span>
              <span className="text-gray-500"> check-availability --verbose</span>
            </div>
            <div className="pl-2 space-y-1.5">
              <p className="text-gray-500">
                {'>'} Status: <span className="text-green-400 font-semibold">Available</span> for new opportunities
              </p>
              <p className="text-gray-500">
                {'>'} Response time: <span className="text-[#16f2b3]">within 24 hours</span>
              </p>
              <p className="text-gray-500">
                {'>'} Timezone: <span className="text-violet-400">IST (UTC+5:30)</span>
              </p>
              <p className="text-gray-500">
                {'>'} Open to: <span className="text-white">Full-time · Freelance · Contract</span>
              </p>
              <p className="text-gray-500">
                {'>'} Domains: <span className="text-[#16f2b3]">Backend · AI/ML · SaaS · Microservices</span>
              </p>
            </div>

            <div className="pt-1">
              <span className="text-[#16f2b3]">$</span>
              <span className="text-gray-500"> cat preferred-contact.txt</span>
            </div>
            <div className="pl-2 space-y-1.5">
              <p className="text-gray-500">
                {'>'} Email: <a href={`mailto:${personalData.email}`} className="text-[#16f2b3] hover:underline">{personalData.email}</a>
              </p>
              <p className="text-gray-500">
                {'>'} LinkedIn: <a href={personalData.linkedIn} target="_blank" className="text-violet-400 hover:underline">linkedin.com/in/harshitgupta1215</a>
              </p>
            </div>

            <div className="pt-1 flex items-center">
              <span className="text-[#16f2b3]">$</span>
              <span className="inline-block w-2 h-3.5 bg-[#16f2b3]/60 ml-1 animate-pulse" />
            </div>
          </div>

          {/* CTA strip */}
          <div className="border-t border-[#1b2c6830] px-6 py-4 flex items-center justify-between">
            <span className="text-gray-600 text-[10px] font-mono">ready to collaborate?</span>
            <a
              href={`mailto:${personalData.email}`}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-[#16f2b3]/80 text-white text-xs font-semibold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(22,242,179,0.2)] transition-all duration-300"
            >
              <MdAlternateEmail size={14} />
              Send Email
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactSection;
