import { experiences }   from './experience';
import { projectsData }  from './projects-data';
import { certifications } from './certifications';
import { skillsData }    from './skills';

const MONTH_INDEX = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
  Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11,
};

function parseMonthYear(str) {
  const [m, y] = str.trim().split(' ');
  return new Date(parseInt(y), MONTH_INDEX[m] ?? 0);
}

// Years of experience — earliest start → latest end (or today if "Present")
export const yearsExperience = (() => {
  const dates = experiences.flatMap(({ duration }) => {
    const [start, end] = duration.split('–').map(s => s.trim());
    return [
      parseMonthYear(start),
      end.toLowerCase() === 'present' ? new Date() : parseMonthYear(end),
    ];
  });
  const earliest = new Date(Math.min(...dates));
  const latest   = new Date(Math.max(...dates));
  return Math.floor((latest - earliest) / (1000 * 60 * 60 * 24 * 365.25));
})();

// AI-involved projects — by category OR AI-related tools
const AI_TOOLS = ['ml', 'nlp', 'tensorflow', 'opencv', 'pytorch', 'claude', 'langchain', 'rag', 'scikit-learn', 'llm'];
export const aiProjectCount = projectsData.filter(p =>
  p.category === 'AI / ML' ||
  p.tools.some(t => AI_TOOLS.some(k => t.toLowerCase().includes(k)))
).length;

// Total projects
export const totalProjects = projectsData.length;

// Re-export already-dynamic values for a single import point
export const certCount      = certifications.length;
export const techStackCount = skillsData.length;

// Hardcoded — no structured data source
export const MICROSERVICES_COUNT = 20;
export const API_LATENCY_REDUCTION = 35;
