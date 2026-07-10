/**
 * timelineData
 * ------------
 * Same convention as data/projectsData.js and data/skillsData.js —
 * Timeline.jsx maps over this array, nothing is hardcoded into JSX.
 *
 * `code`    — short log reference (LOG_01, LOG_02...) shown on hover, not
 *              a fabricated date/timestamp — just a system-style ID.
 * `tag`     — short category label rendered as a badge.
 * `current` — true only on the final "where things stand now" entry; it
 *              renders with a live/amber treatment instead of the default
 *              cyan "logged" treatment.
 */
export const timelineData = [
  {
    id: 'engineering-initialized',
    code: 'LOG_01',
    tag: 'INIT',
    title: 'Engineering Initialized',
    description: 'Started Computer Engineering.',
  },
  {
    id: 'dsa-module-loaded',
    code: 'LOG_02',
    tag: 'DSA',
    title: 'DSA Module Loaded',
    description: 'Started competitive programming and problem solving.',
  },
  {
    id: 'research-module',
    code: 'LOG_03',
    tag: 'RESEARCH',
    title: 'Research Module',
    description: 'Built the TAMSC research project.',
  },
  {
    id: 'tradestreamx-online',
    code: 'LOG_04',
    tag: 'PROJECT',
    title: 'TradeStreamX Online',
    description: 'Developed a distributed trading engine using Kafka, Redis, PostgreSQL and React.',
  },
  {
    id: 'interviewai-online',
    code: 'LOG_05',
    tag: 'PROJECT',
    title: 'InterviewAI Online',
    description: 'Built an AI-powered technical interview platform.',
  },
  {
    id: 'current-status',
    code: 'LOG_06',
    tag: 'STATUS',
    title: 'Current Status',
    description: 'Seeking a Software Engineering internship.',
    current: true,
  },
];
