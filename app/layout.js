import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const PreloaderWrapper = dynamic(() => import("./components/helper/preloader-wrapper"), { ssr: false });
const ParticleCanvas = dynamic(() => import("./components/helper/particle-canvas"), { ssr: false });
const CustomCursor = dynamic(() => import("./components/helper/custom-cursor"), { ssr: false });

const inter = Inter({ subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: false,
});

const siteUrl = "https://harshitgupta5290.github.io/portfolio";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harshit Gupta | Software Engineer — Full Stack & AI",
    template: "%s | Harshit Gupta",
  },
  description:
    "Portfolio of Harshit Gupta — Software Engineer — Full Stack & AI specializing in Python, Flask, Microservices, LLMs, RAG, and cloud-native SaaS platforms. Based in New Delhi, India.",
  keywords: [
    "Harshit Gupta", "Full Stack Developer", "AI Engineer", "Backend Engineer",
    "Python", "Flask", "Microservices", "LLMs", "RAG", "LangChain",
    "Docker", "AWS", "Redis", "SQLAlchemy", "REST API",
    "Backend Developer", "Software Developer", "New Delhi", "portfolio",
  ],
  authors: [{ name: "Harshit Gupta", url: siteUrl }],
  creator: "Harshit Gupta",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Harshit Gupta | Software Engineer — Full Stack & AI",
    description:
      "Software Engineer — Full Stack & AI specializing in Python, Flask, Microservices, LLMs, and cloud-native SaaS. Based in New Delhi, India.",
    siteName: "Harshit Gupta Portfolio",
    images: [{ url: "/profile.png", width: 1200, height: 630, alt: "Harshit Gupta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit Gupta | Software Engineer — Full Stack & AI",
    description:
      "Software Engineer — Full Stack & AI specializing in Python, Flask, Microservices, LLMs, and cloud-native SaaS.",
    images: ["/profile.png"],
    creator: "@harshitgupta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="cursor-none" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harshit Gupta",
              url: siteUrl,
              email: "harshitgupta5290@gmail.com",
              jobTitle: "Software Engineer — Full Stack & AI",
              description: "Software Engineer — Full Stack & AI specializing in Python, Flask, Microservices, LLMs, and cloud-native SaaS platforms.",
              address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
              sameAs: [
                "https://github.com/harshitgupta5290",
                "https://www.linkedin.com/in/harshitgupta1215/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} cursor-none`} suppressHydrationWarning>
        <PreloaderWrapper />
        <CustomCursor />
        <ParticleCanvas />
        <ToastContainer />
        <header className="sticky top-0 z-[100] w-full border-b border-[#1b2c6830] bg-[#0d1224]/85 backdrop-blur-xl">
          <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
            <Navbar />
          </div>
        </header>
        <main className="min-h-screen relative z-10 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
    </html>
  );
}
