import CertificationsClient from "./certifications-client";

export const metadata = {
  title: "Certifications",
  description:
    "All professional certifications earned by Harshit Gupta — Oracle Cloud AI, SQL, Python, Blockchain, Web Development and more.",
  openGraph: {
    title: "Certifications | Harshit Gupta",
    description:
      "Professional certifications across Cloud & AI, Database, Web Development, and Programming.",
    type: "website",
  },
};

export default function CertificationsPage() {
  return (
    <div className="py-8">
      {/* Page header */}
      <div className="text-center mt-6 mb-4">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#16f2b3] mb-3">
          Verified credentials
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
          <span className="text-white">All </span>
          <span className="bg-gradient-to-r from-violet-400 via-[#16f2b3] to-pink-400 bg-clip-text text-transparent">
            Certifications
          </span>
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          A curated collection of professional credentials spanning Cloud AI, databases,
          web development, and programming — verified by industry-leading platforms.
        </p>
      </div>

      {/* Gradient line separator */}
      <div className="flex justify-center my-8">
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>

      <CertificationsClient />
    </div>
  );
}
