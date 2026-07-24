/**
 * skillsData
 * ----------
 * Same convention as data/projectsData.js: every field a SkillModule
 * renders comes from here, and Skills.jsx maps over this array — no
 * module is hardcoded into JSX.
 *
 * Duplication policy:
 *  - Backend owns: Node.js, Express, REST APIs, JWT, WebSockets
 *  - Database & Infrastructure owns: MongoDB, PostgreSQL, Redis, Docker, Kafka
 *  - Developer Tools owns: Git, GitHub, Linux, VS Code, Postman, Firebase, Vercel, NPM
 *  - AI/ML owns: Python, TensorFlow, PyTorch, OpenCV, Scikit-learn, LLMs,
 *                Prompt Engineering, Computer Vision
 *  - Frontend owns: React, JavaScript, TypeScript, Tailwind CSS, Framer Motion,
 *                   HTML, CSS, Responsive Design
 */
export const skillsData = [
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'Training and deploying intelligent systems — from classical ML pipelines to LLM-powered applications.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'LLMs', 'Prompt Engineering', 'Computer Vision'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Designing reliable APIs, real-time services, and authentication layers that hold up under load.',
    technologies: ['Node.js', 'Express', 'REST APIs', 'JWT', 'WebSockets'],
  },
  {
    id: 'frontend-interface',
    title: 'Frontend',
    description: 'Building fast, accessible, and expressive interfaces people actually enjoy using.',
    technologies: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS', 'Responsive Design'],
  },
  {
    id: 'database-infrastructure',
    title: 'Database & Infrastructure',
    description: 'Structuring, storing, and querying data efficiently at scale — from SQL to message queues and containers.',
    technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Kafka'],
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    description: 'The daily operating environment — version control, hosting, editors, and cloud utilities.',
    technologies: ['Git', 'GitHub', 'Linux', 'VS Code', 'Postman', 'Firebase', 'Vercel', 'NPM'],
  },
];
