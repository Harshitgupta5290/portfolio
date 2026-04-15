import { projectsData } from './projects-data';
import { certifications } from './certifications';

// Maps lowercase name variants → canonical display name
const NORMALIZE = {
  'react':          'React',
  'reactjs':        'React',
  'next.js':        'Next.js',
  'nextjs':         'Next.js',
  'node.js':        'Node.js',
  'nodejs':         'Node.js',
  'tailwind':       'Tailwind',
  'tailwind css':   'Tailwind',
  'tailwindcss':    'Tailwind',
  'scikit-learn':   'scikit-learn',
  'sklearn':        'scikit-learn',
  'javascript':     'JavaScript',
  'typescript':     'TypeScript',
  'python':         'Python',
  'flask':          'Flask',
  'mysql':          'MySQL',
  'postgresql':     'PostgreSQL',
  'git':            'Git',
  'docker':         'Docker',
  'aws':            'AWS',
  'opencv':         'OpenCV',
  'numpy':          'Numpy',
  'pytorch':        'PyTorch',
  'tensorflow':     'TensorFlow',
  'nginx':          'Nginx',
  'bootstrap':      'Bootstrap',
  'sqlalchemy':     'SQLAlchemy',
  'linux':          'Linux',
  'pandas':         'Pandas',
  'redis':          'Redis',
  'langchain':      'LangChain',
  'selenium':       'Selenium',
  'php':            'PHP',
  'sqlite':         'SQLite',
  'blender':        'Blender',
  'django':         'Django',
  'fastapi':        'FastAPI',
  'kubernetes':     'Kubernetes',
  'rest api':       'REST API',
  'rag':            'RAG',
  'three.js':       'Three.js',
  'typescript':     'TypeScript',
};

// Terms to skip — APIs, generic concepts, framework internals with no icon
const EXCLUDE = new Set([
  'NLP', 'ML', 'TMDb API', 'Twitter API', 'Google Sheets API', 'Google Forms API',
  'Zoho SMTP', 'Nodemailer', 'Claude AI', 'Claude API', 'PWA', 'OOP',
  'Sprite Animation', 'GLSL', 'SCSS', 'GitHub Actions', 'Flask-Login',
  'Werkzeug', 'Jinja2', 'Pygame', 'WebGL', 'Sequelize', 'Express',
  // Cert tags that aren't standalone skills
  'LLMs', 'Generative AI', 'OCI', 'Vector DB', 'Embeddings', 'Semantic Search',
  'AI', 'Deep Learning', 'Cloud AI', 'AI/ML', 'Database', 'Query Optimization',
  'Programming', 'HTML', 'CSS', 'Frontend', 'Version Control', 'DevOps',
  'Algorithms', 'Data Structures', 'HashMaps', 'Problem Solving',
  'HTTP', 'API Design', 'Web Services', 'Web Development',
]);

// Curated base — always present and defines display order
const BASE_SKILLS = [
  'Python', 'Flask', 'MySQL', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Tailwind', 'Node.js', 'Git', 'Docker', 'AWS', 'OpenCV', 'Numpy', 'PyTorch',
  'TensorFlow', 'Nginx', 'PostgreSQL', 'Bootstrap', 'SQLAlchemy', 'Linux',
  'Pandas', 'scikit-learn', 'Redis', 'LangChain', 'RAG', 'REST API',
];

function toCanonical(name) {
  const key = name.toLowerCase().trim();
  return NORMALIZE[key] ?? null;
}

function extractFromProjects() {
  return projectsData
    .flatMap(p => p.tools)
    .map(t => toCanonical(t))
    .filter(Boolean);
}

function extractFromCerts() {
  return certifications
    .flatMap(c => c.tags)
    .map(t => toCanonical(t))
    .filter(Boolean);
}

// Merge base + derived, deduplicate, preserve base order
const derived = [...extractFromProjects(), ...extractFromCerts()];
export const skillsData = [...new Set([...BASE_SKILLS, ...derived])];

// Category assignment per skill — used for badge counts
export const SKILL_CATEGORIES = {
  // Backend
  'Python':      'Backend',  'Flask':       'Backend',  'Node.js':     'Backend',
  'MySQL':       'Backend',  'PostgreSQL':  'Backend',  'SQLAlchemy':  'Backend',
  'Redis':       'Backend',  'REST API':    'Backend',  'SQLite':      'Backend',
  'Django':      'Backend',  'FastAPI':     'Backend',  'PHP':         'Backend',
  // Frontend
  'JavaScript':  'Frontend', 'TypeScript':  'Frontend', 'React':       'Frontend',
  'Next.js':     'Frontend', 'Tailwind':    'Frontend', 'Bootstrap':   'Frontend',
  'Three.js':    'Frontend',
  // AI / ML
  'PyTorch':     'AI / ML',  'TensorFlow':  'AI / ML',  'OpenCV':      'AI / ML',
  'Numpy':       'AI / ML',  'Pandas':      'AI / ML',  'scikit-learn':'AI / ML',
  'LangChain':   'AI / ML',  'RAG':         'AI / ML',  'Selenium':    'AI / ML',
  // DevOps
  'Docker':      'DevOps',   'AWS':         'DevOps',   'Git':         'DevOps',
  'Nginx':       'DevOps',   'Linux':       'DevOps',   'Kubernetes':  'DevOps',
  // Creative
  'Blender':     'Creative',
};

// Dynamically computed badge stats — auto-updates as skillsData grows
export const categoryStats = (() => {
  const counts = { 'Backend': 0, 'Frontend': 0, 'AI / ML': 0, 'DevOps': 0 };
  for (const skill of skillsData) {
    const cat = SKILL_CATEGORIES[skill];
    if (cat && Object.prototype.hasOwnProperty.call(counts, cat)) counts[cat]++;
  }
  return [
    { label: 'Backend',  count: counts['Backend'],  color: '#16f2b3' },
    { label: 'Frontend', count: counts['Frontend'], color: '#a78bfa' },
    { label: 'AI / ML',  count: counts['AI / ML'],  color: '#ec4899' },
    { label: 'DevOps',   count: counts['DevOps'],   color: '#f59e0b' },
  ].filter(c => c.count > 0);
})();
