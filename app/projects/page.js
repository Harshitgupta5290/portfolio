import ProjectsClient from "./projects-client";

export const metadata = {
  title: "Projects",
  description:
    "All projects built by Harshit Gupta — Full Stack systems, AI/ML engines, creative tools, and production-grade applications across 5 categories.",
  openGraph: {
    title: "Projects | Harshit Gupta",
    description:
      "Explore 16+ projects spanning Full Stack, AI/ML, Frontend, Tools, and Creative engineering by Harshit Gupta.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="py-8">
      {/* Page header */}
      <div className="text-center mt-6 mb-4">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#16f2b3] mb-3">
          Engineering Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
          <span className="text-white">All </span>
          <span className="bg-gradient-to-r from-violet-400 via-[#16f2b3] to-pink-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          A curated showcase of production-grade systems — from AI-powered recommendation engines
          and full-stack platforms to creative 3D experiences and developer tooling.
        </p>
      </div>

      {/* Gradient line separator */}
      <div className="flex justify-center my-8">
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>

      <ProjectsClient />
    </div>
  );
}
