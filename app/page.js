import dynamic from 'next/dynamic';
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import HashScroll from "./components/helper/hash-scroll";
import ScrollReveal from "./components/helper/scroll-reveal";

// Below-fold sections — code-split and client-only to reduce initial bundle
const Stats          = dynamic(() => import('./components/homepage/stats'),          { ssr: false });
const Experience     = dynamic(() => import('./components/homepage/experience'),     { ssr: false });
const Skills         = dynamic(() => import('./components/homepage/skills'),         { ssr: false });
const Projects       = dynamic(() => import('./components/homepage/projects'),       { ssr: false });
const Education      = dynamic(() => import('./components/homepage/education'),      { ssr: false });
const Certifications = dynamic(() => import('./components/homepage/certifications'), { ssr: false });
const Blog           = dynamic(() => import('./components/homepage/blog'),           { ssr: false });
const ContactSection = dynamic(() => import('./components/homepage/contact'),        { ssr: false });

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HashScroll />

      {/* Hero + About are above-fold — no entrance delay */}
      <HeroSection />
      <AboutSection />

      {/* Below-fold — each fades up when scrolled into view */}
      <ScrollReveal><Stats /></ScrollReveal>
      <ScrollReveal delay={0.05}><Experience /></ScrollReveal>
      <ScrollReveal delay={0.05}><Skills /></ScrollReveal>
      <ScrollReveal delay={0.05}><Projects /></ScrollReveal>
      <ScrollReveal delay={0.05}><Education /></ScrollReveal>
      <ScrollReveal delay={0.05}><Certifications /></ScrollReveal>
      <ScrollReveal delay={0.05}><Blog /></ScrollReveal>
      <ScrollReveal delay={0.05}><ContactSection /></ScrollReveal>
    </div>
  );
}
