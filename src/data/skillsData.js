/**
 * skillsData
 * ----------
 * Same convention as data/projectsData.js: every field a SkillModule
 * renders comes from here, and Skills.jsx maps over this array — no
 * module is hardcoded into JSX.
 */
export const skillsData = [
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'Training and deploying intelligent systems — from classical ML pipelines to LLM-powered applications.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'LLMs', 'Prompt Engineering', 'Computer Vision', 'Machine Learning', 'Deep Learning'],
  },
  {
    id: 'backend-infrastructure',
    title: 'Backend',
    description: 'Designing reliable server infrastructure, APIs, and authentication layers that hold up under load.',
    technologies: ['Node.js', 'Express', 'REST APIs', 'JWT', 'MongoDB', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'WebSockets'],
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
    description: 'Structuring, storing, and querying data efficiently at scale with modern DevOps practices.',
    technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Kafka', 'REST APIs'],
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    description: 'The daily operating environment behind everything else — version control, containers, infrastructure.',
    technologies: ['Git', 'GitHub', 'Linux', 'VS Code', 'Postman', 'Firebase', 'Vercel', 'NPM'],
  },
];
