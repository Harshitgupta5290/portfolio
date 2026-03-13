import dynamic from 'next/dynamic';
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import HashScroll from "./components/helper/hash-scroll";

// Below-fold sections — code-split and client-only to reduce initial bundle
const Stats = dynamic(() => import('./components/homepage/stats'), { ssr: false });
const Experience = dynamic(() => import('./components/homepage/experience'), { ssr: false });
const Skills = dynamic(() => import('./components/homepage/skills'), { ssr: false });
const Projects = dynamic(() => import('./components/homepage/projects'), { ssr: false });
const Education = dynamic(() => import('./components/homepage/education'), { ssr: false });
const Certifications = dynamic(() => import('./components/homepage/certifications'), { ssr: false });
const Blog = dynamic(() => import('./components/homepage/blog'), { ssr: false });
const ContactSection = dynamic(() => import('./components/homepage/contact'), { ssr: false });

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HashScroll />
      <HeroSection />
      <AboutSection />
      <Stats />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Blog />
      <ContactSection />
    </div>
  );
}