export const certifications = [
  // ── Cloud & AI ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    year: "2025",
    category: "Cloud & AI",
    featured: true,
    description:
      "Demonstrated expertise in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and building generative AI applications using OCI Generative AI services.",
    tags: ["LLMs", "RAG", "Generative AI", "OCI"],
  },
  {
    id: 2,
    title: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    year: "2025",
    category: "Cloud & AI",
    featured: true,
    description:
      "Certified in vector embeddings, similarity search, and building AI applications using vector databases and semantic retrieval techniques.",
    tags: ["Vector DB", "Embeddings", "Semantic Search", "AI"],
  },
  {
    id: 3,
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    category: "Cloud & AI",
    featured: true,
    description:
      "Validated knowledge in AI/ML fundamentals, deep learning, NLP, cloud-based model deployment, and AI lifecycle management.",
    tags: ["AI/ML", "Deep Learning", "NLP", "Cloud AI"],
  },

  // ── Database ─────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    year: "2024",
    category: "Database",
    featured: true,
    description:
      "Demonstrated advanced SQL proficiency including complex queries, window functions, joins, aggregations, and database optimization techniques.",
    tags: ["SQL", "Database", "Query Optimization"],
  },
  {
    id: 5,
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    year: "2024",
    category: "Database",
    featured: true,
    description:
      "Proficiency in intermediate SQL concepts including subqueries, aggregation, and set operations.",
    tags: ["SQL", "Database"],
  },
  // { id: 6, title: "SQL (Basic)", issuer: "HackerRank", year: "2023", category: "Database", featured: false,
  //   description: "Foundational SQL skills including SELECT queries, filtering, sorting, and basic joins.",
  //   tags: ["SQL", "Database"] },
  // ← Redundant — SQL (Advanced) + SQL (Intermediate) already present

  // ── Programming ──────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Python (Basic)",
    issuer: "HackerRank",
    year: "2023",
    category: "Programming",
    featured: true,
    description:
      "Validated foundational Python programming skills including data types, control flow, functions, and OOP basics.",
    tags: ["Python", "Programming"],
  },

  // { id: 8, title: "C Course", issuer: "Sololearn", year: "2021", category: "Programming", featured: false,
  //   description: "Completed C programming course covering pointers, memory management, data structures, and file handling.",
  //   tags: ["C", "Programming", "Memory Management"] },
  // ← Sololearn student-level, not relevant to AI/backend trajectory

  // ── Web Development ──────────────────────────────────────────────────────
  {
    id: 9,
    title: "Introduction to Front End Development",
    issuer: "Meta",
    year: "2023",
    category: "Web Development",
    featured: true,
    description:
      "Covered HTML, CSS, JavaScript fundamentals, and React basics as part of Meta's Front-End Developer Professional Certificate.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 15,
    title: "Rest API (Intermediate)",
    issuer: "HackerRank",
    year: "2026",
    category: "Web Development",
    featured: true,
    description:
      "Validated intermediate REST API skills including fetching data from APIs, working with query parameters, pagination, and processing API responses.",
    tags: ["REST API", "HTTP", "API Design", "Web Services"],
  },
  {
    id: 10,
    title: "React (Basic)",
    issuer: "HackerRank",
    year: "2023",
    category: "Web Development",
    featured: false,
    description:
      "Validated knowledge of React fundamentals including components, props, state management, and hooks.",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 11,
    title: "Git (Basic)",
    issuer: "HackerRank",
    year: "2023",
    category: "Web Development",
    featured: false,
    description:
      "Validated foundational Git skills including version control, branching, merging, and collaboration workflows.",
    tags: ["Git", "Version Control", "DevOps"],
  },
  // { id: 12, title: "HTML Course", issuer: "Sololearn", year: "2021", category: "Web Development", featured: false,
  //   description: "Completed comprehensive HTML course covering semantic markup, forms, tables, and web structure best practices.",
  //   tags: ["HTML", "Web Development"] },
  // ← Sololearn student-level, not relevant at senior level

  // ── Problem Solving ──────────────────────────────────────────────────────
  {
    id: 16,
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    year: "2026",
    category: "Problem Solving",
    featured: true,
    description:
      "Validated intermediate problem solving skills covering Data Structures (HashMaps, Stacks, Queues) and Algorithms including optimal solutions.",
    tags: ["Algorithms", "Data Structures", "HashMaps", "Problem Solving"],
  },
  // { id: 13, title: "Problem Solving (Basic)", issuer: "HackerRank", year: "2023", category: "Problem Solving", featured: false,
  //   description: "Validated foundational knowledge of algorithms, data structures, and logical problem solving.",
  //   tags: ["Algorithms", "Data Structures", "Problem Solving"] },
  // ← Superseded by Problem Solving (Intermediate)

  // ── Blockchain ───────────────────────────────────────────────────────────
  // { id: 14, title: "Blockchain Basics", issuer: "Great Learning Academy", year: "2023", category: "Blockchain", featured: false,
  //   description: "Covered blockchain architecture, distributed ledgers, cryptographic hashing, and real-world blockchain use cases.",
  //   tags: ["Blockchain", "Distributed Ledger", "Cryptography"] },
  // ← Reads unfocused next to AI trajectory — restore only if pivoting to Web3
];

export const certCategories = [
  "All",
  "Cloud & AI",
  "Database",
  "Web Development",
  "Programming",
  "Problem Solving",
  "Blockchain",
];

// Full Tailwind class sets — written as complete strings so the JIT scanner picks them up
export const categoryMeta = {
  "Cloud & AI": {
    hex: "#8b5cf6",
    text: "text-violet-400",
    accentBar: "bg-gradient-to-r from-violet-600 via-violet-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-violet-500/30 via-violet-500/10 to-transparent",
    tagStyle: "border-violet-500/25 text-violet-300 bg-violet-500/5",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    hoverCard: "hover:border-violet-500/50 hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.35)]",
    filterActive: "bg-violet-500/15 text-violet-300 border-violet-500/50",
    statBg: "bg-violet-500/10 border-violet-500/20",
  },
  "Database": {
    hex: "#06b6d4",
    text: "text-cyan-400",
    accentBar: "bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent",
    tagStyle: "border-cyan-500/25 text-cyan-300 bg-cyan-500/5",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    hoverCard: "hover:border-cyan-500/50 hover:shadow-[0_8px_40px_-8px_rgba(6,182,212,0.35)]",
    filterActive: "bg-cyan-500/15 text-cyan-300 border-cyan-500/50",
    statBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  "Web Development": {
    hex: "#ec4899",
    text: "text-pink-400",
    accentBar: "bg-gradient-to-r from-pink-600 via-pink-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-pink-500/30 via-pink-500/10 to-transparent",
    tagStyle: "border-pink-500/25 text-pink-300 bg-pink-500/5",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    hoverCard: "hover:border-pink-500/50 hover:shadow-[0_8px_40px_-8px_rgba(236,72,153,0.35)]",
    filterActive: "bg-pink-500/15 text-pink-300 border-pink-500/50",
    statBg: "bg-pink-500/10 border-pink-500/20",
  },
  "Programming": {
    hex: "#f59e0b",
    text: "text-amber-400",
    accentBar: "bg-gradient-to-r from-amber-500 via-amber-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent",
    tagStyle: "border-amber-500/25 text-amber-300 bg-amber-500/5",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    hoverCard: "hover:border-amber-500/50 hover:shadow-[0_8px_40px_-8px_rgba(245,158,11,0.35)]",
    filterActive: "bg-amber-500/15 text-amber-300 border-amber-500/50",
    statBg: "bg-amber-500/10 border-amber-500/20",
  },
  "Problem Solving": {
    hex: "#f97316",
    text: "text-orange-400",
    accentBar: "bg-gradient-to-r from-orange-500 via-orange-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-orange-500/30 via-orange-500/10 to-transparent",
    tagStyle: "border-orange-500/25 text-orange-300 bg-orange-500/5",
    badge: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    hoverCard: "hover:border-orange-500/50 hover:shadow-[0_8px_40px_-8px_rgba(249,115,22,0.35)]",
    filterActive: "bg-orange-500/15 text-orange-300 border-orange-500/50",
    statBg: "bg-orange-500/10 border-orange-500/20",
  },
  "Blockchain": {
    hex: "#10b981",
    text: "text-emerald-400",
    accentBar: "bg-gradient-to-r from-emerald-600 via-emerald-400 to-transparent",
    separatorGrad: "bg-gradient-to-r from-emerald-500/30 via-emerald-500/10 to-transparent",
    tagStyle: "border-emerald-500/25 text-emerald-300 bg-emerald-500/5",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    hoverCard: "hover:border-emerald-500/50 hover:shadow-[0_8px_40px_-8px_rgba(16,185,129,0.35)]",
    filterActive: "bg-emerald-500/15 text-emerald-300 border-emerald-500/50",
    statBg: "bg-emerald-500/10 border-emerald-500/20",
  },
};

export const issuerMeta = {
  Oracle:                   { color: "text-red-400",    dot: "bg-red-400" },
  HackerRank:               { color: "text-green-400",  dot: "bg-green-400" },
  "Great Learning Academy": { color: "text-orange-400", dot: "bg-orange-400" },
  Sololearn:                { color: "text-purple-400", dot: "bg-purple-400" },
  Meta:                     { color: "text-blue-400",   dot: "bg-blue-400" },
};
