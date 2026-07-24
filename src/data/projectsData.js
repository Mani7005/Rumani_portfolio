/**
 * projectsData
 * ------------
 * Every field ProjectCard or ProjectDossier renders comes from here.
 * To add a project: add an object to this array. No component needs to
 * change.
 *
 * `status`             — 'online' | 'active' (read by ProjectStatus)
 * `liveDemo`           — set to null when there isn't a public demo;
 *                         ProjectCard/ProjectDossier hide that button
 *                         rather than rendering a dead link.
 * `performanceMetrics` — optional; ProjectDossier only renders that
 *                         section when the array is non-empty.
 * `screenshots`        — each entry is { id, caption, src }. `src` is
 *                         null for all seed data (no real image assets
 *                         yet) — ProjectDossier renders a labeled HUD
 *                         placeholder tile instead of a broken <img>.
 *                         Drop a real path in `src` once screenshots
 *                         exist and it renders as an actual image.
 */
export const projectsData = [
  {
    id: 'tradestreamx',
    name: 'TradeStreamX',
    status: 'online',
    type: 'LOW-LATENCY TRADING EXCHANGE · DISTRIBUTED SYSTEMS',
    shortDescription:
      'Distributed stock exchange simulator with price-time priority order matching, Kafka event streaming, Redis caching, PostgreSQL persistence, REST APIs, and real-time WebSocket market feeds.',
    techStack: [
     'React',
     'Node.js',
     'Kafka',
     'Redis',
     'Socket.IO',
     'PostgreSQL',
     'Docker'
    ],
    github: 'https://github.com/Mani7005/tradestream',
    liveDemo: 'https://tradestream-chi.vercel.app/',

    overview:
      'A distributed stock exchange simulator featuring real-time order matching, live market updates, and a modern trading dashboard.',
    problemStatement:
      'Designed to demonstrate how modern exchanges process concurrent orders with low latency and real-time data synchronization.',
    architecture:
      'React frontend → Node.js API → Kafka event pipeline → Matching Engine → PostgreSQL + Redis → Socket.IO live updates.',
    engineeringChallenges: [
      'Built deterministic price-time priority order matching.',
      'Kept Redis, PostgreSQL, and live WebSocket clients synchronized.',
    ],
    keyLearnings: [
       'Designed scalable event-driven systems using Kafka.',
       'Optimized low-latency real-time communication with Socket.IO.',
    ],
    performanceMetrics: [
      { label: 'Order Match Latency', value: '<5ms' },
      { label: 'Live WebSocket Clients', value: '50+' },
      { label: 'Events / Second', value: '1,000+' },
    ],
  },
  {
  id: 'scanix',
  name: 'Scanix',
  status: 'online',
  type: 'AI · Cybersecurity Platform',
  shortDescription:
    'An AI-powered scam detection platform that analyzes suspicious messages and URLs to identify phishing attempts and online fraud.',

  techStack: [
    'React',
    'Node.js',
    'Python',
    'FastAPI',
    'Machine Learning',
    'MongoDB'
  ],

  github: 'https://github.com/Mani7005/Scanix',
  apk: '/scanix_f.apk',

  overview:
    'Scanix uses machine learning to detect phishing links and scam messages, providing users with instant risk analysis and actionable security recommendations.',

  problemStatement:
    'Online scams and phishing attacks are becoming increasingly sophisticated, making it difficult for users to distinguish legitimate content from malicious attempts.',

  architecture:
    'A React frontend communicates with a Node.js backend that routes requests to a Python-based ML service. The prediction engine evaluates suspicious content and returns risk scores with explanations.',

  engineeringChallenges: [
    'Improving detection accuracy while minimizing false positives.',
    'Designing a fast prediction pipeline for near real-time analysis.'
  ],

  keyLearnings: [
    'Feature engineering significantly impacts phishing detection performance.',
    'Clear risk explanations improve user trust more than confidence scores alone.',
    'Separating the ML inference service from the API improves scalability.'
  ],

  performanceMetrics: [
    { label: 'Detection Accuracy', value: '95%+' },
  ],
},
  {
  id: 'interviewai',
  name: 'InterviewAI',
  status: 'online',
  type: 'AI · Developer Tool',

  shortDescription:
    'An AI-powered mock interview platform that conducts real-time technical interviews, evaluates code submissions, and delivers structured feedback using large language models.',

  techStack: [
    'React',
    'Node.js',
    'Python',
    'FastAPI',
    'OpenAI API',
    'MongoDB',
    'Socket.IO',
  ],

  github: 'https://github.com/Mani7005',
  liveDemo: null,

  overview:
    'InterviewAI simulates a full technical interview experience — presenting coding problems, listening to spoken or typed responses, evaluating logic and code quality, and generating a structured performance report at the end.',

  problemStatement:
    'Candidates preparing for software engineering interviews lack access to realistic, feedback-rich practice sessions. Generic platforms provide problems but not the evaluation and coaching loop that real interviews provide.',

  architecture:
    'React frontend communicates via Socket.IO with a Node.js session manager. Code submissions are routed to a FastAPI evaluation service backed by an LLM. Session state and transcripts are stored in MongoDB.',

  engineeringChallenges: [
    'Streaming LLM responses in real time while keeping the interview session state consistent.',
    'Designing a rubric-based evaluation prompt that produces structured, repeatable JSON feedback.',
  ],

  keyLearnings: [
    'Prompt engineering for structured output requires iterative refinement against a fixed schema.',
    'WebSocket session management becomes complex when multiple async services share the same connection.',
    'Separating evaluation logic into a dedicated microservice made the LLM layer independently testable.',
  ],

  performanceMetrics: [
    { label: 'Avg Feedback Latency', value: '<3s' },
    { label: 'Questions per Session', value: '5–10' },
  ],
},
  {
  id: 'tamsc',
  name: 'TAMSC',
  status: 'online',
  type: 'AI Research · Computer Vision',

  shortDescription:
    'A fog-robust scene text detection model using text-aware multi-scale contrastive learning to improve detection accuracy under adverse weather conditions.',

  techStack: [
    'Python',
    'PyTorch',
    'OpenCV',
    'NumPy',
    'Deep Learning',
    'Computer Vision'
  ],

  github: 'https://github.com/',
  liveDemo: null,

  overview:
    'Implemented and evaluated a research-driven scene text detection model that learns fog-invariant representations using multi-scale contrastive learning.',

  problemStatement:
    'Traditional scene text detectors experience significant performance degradation in foggy environments due to reduced visibility and low contrast.',

  architecture:
    'Built using a CNN-based backbone with Feature Pyramid Networks and text-aware multi-scale contrastive learning to align clear and foggy feature representations.',

  engineeringChallenges: [
    'Designing an effective contrastive learning strategy across multiple feature scales.',
    'Training robustly with synthetic fog augmentation while preserving text features.'
  ],

  keyLearnings: [
    'Multi-scale contrastive learning significantly improves feature robustness.',
    'Proper fog augmentation is essential for real-world generalization.',
    'Research implementation requires careful reproduction and extensive experimentation.'
  ],

  performanceMetrics: [
    { label: 'Precision', value: '79.7%' },
    { label: 'Recall', value: '78.6%' },
    { label: 'F1 Score', value: '79.2%' },
  ],
},

{
  id: 'redrop',
  name: 'Redrop',
  status: 'online',
  type: 'DBMS · Full-Stack Application',

  shortDescription:
    'A blood donation management system that connects donors with recipients using MySQL procedures, functions, triggers, and a Flask backend.',

  techStack: [
    'Flask',
    'Python',
    'MySQL',
    'SQL',
    'PL/SQL',
    'HTML'
  ],

  github: 'https://github.com/Mani7005/redrop',
  liveDemo: null,

  overview:
    'Developed a database-driven blood donation platform featuring donor search, availability tracking, and automated database operations using PL/SQL.',

  problemStatement:
    'Finding eligible blood donors quickly is challenging when donor availability and eligibility are not updated automatically.',

  architecture:
    'Built with a Flask backend connected to MySQL. Stored procedures, functions, cursors, and triggers handle donor search, availability updates, and dashboard statistics.',

  engineeringChallenges: [
    'Automating donor availability using database triggers.',
    'Designing reusable stored procedures for efficient donor search.'
  ],

  keyLearnings: [
    'Business logic can be efficiently handled inside the database using stored procedures.',
    'Triggers help maintain data consistency automatically.',
    'Proper database design simplifies backend development.'
  ],

  performanceMetrics: [
    { label: 'PL/SQL Routines', value: '15+' },
    { label: 'Donor Search Time', value: '<1s' },
  ],
},
]
