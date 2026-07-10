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
    type: 'Distributed Systems · Real-Time Data',
    shortDescription:
      'A real-time market data pipeline that ingests, normalizes, and streams trading data to thousands of concurrent subscribers with sub-100ms latency.',
    techStack: ['Go', 'Kafka', 'Redis', 'WebSockets', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/',
    liveDemo: 'https://example.com/',

    overview:
      'TradeStreamX is a real-time market data platform built to move trading data from exchange feeds to thousands of subscribers with minimal delay, replacing an earlier polling-based prototype that could not keep pace with volume.',
    problemStatement:
      'Traders and downstream services needed live price and order-book updates, but the original polling approach introduced multi-second lag and fell over under bursty load — unacceptable for anything time-sensitive.',
    architecture:
      'Market data enters through a Go ingestion layer, gets normalized against a unified schema, and is fanned out through Kafka topics partitioned by instrument. A WebSocket gateway layer subscribes to relevant partitions per client and pushes deltas rather than full snapshots to keep bandwidth low.',
    engineeringChallenges: [
      'Out-of-order message arrival across multiple upstream feeds, resolved with a watermark-based reordering buffer',
      'Thundering-herd reconnects during upstream outages, mitigated with jittered backoff and staged resubscription',
    ],
    keyLearnings: [
      'Reordering buffers need an explicit watermark strategy — "wait a bit longer" is not a real algorithm.',
      'A binary wire protocol paid for itself almost immediately once client counts grew past a few thousand.',
      'Backpressure has to be designed in from day one; retrofitting it after clients start lagging is much harder.',
    ],
    screenshots: [
      { id: 'dashboard', caption: 'Live trading dashboard — streaming order book and price chart', src: null },
      { id: 'architecture-diagram', caption: 'Ingestion → Kafka → WebSocket gateway data flow', src: null },
    ],
    performanceMetrics: [
      { label: 'P99 Latency', value: '87ms' },
      { label: 'Concurrent Streams', value: '12k+' },
      { label: 'Uptime', value: '99.95%' },
    ],
  },
  {
    id: 'interviewai',
    name: 'InterviewAI',
    status: 'online',
    type: 'AI · Full-Stack Application',
    shortDescription:
      'An AI-driven mock interview platform that conducts adaptive technical interviews and gives structured, actionable feedback in real time.',
    techStack: ['React', 'Node.js', 'Python', 'OpenAI API', 'PostgreSQL', 'WebRTC'],
    github: 'https://github.com/',
    liveDemo: 'https://example.com/',

    overview:
      'InterviewAI runs adaptive, AI-evaluated mock technical interviews end-to-end — from question selection, through spoken or written responses, to a structured feedback report.',
    problemStatement:
      'Practicing technical interviews alone gives no real feedback, and human mock interviewers are expensive and hard to schedule. InterviewAI needed to stand in for that feedback loop convincingly.',
    architecture:
      'A Node.js API orchestrates interview sessions and persists transcripts, while a Python service handles response evaluation against a rubric built from the target role. WebRTC handles low-latency audio capture for spoken-answer interviews.',
    engineeringChallenges: [
      'Keeping evaluation latency low enough for a natural conversational pace, solved by streaming partial model output instead of waiting for full completions',
      'Preventing generic, unhelpful feedback by grounding evaluation prompts in a structured rubric rather than open-ended scoring',
    ],
    keyLearnings: [
      'Rubric-grounded prompts made evaluation far more consistent than open-ended "grade this answer" prompting.',
      'Streaming partial responses mattered more for perceived quality than raw model accuracy.',
      'Users trusted structured, categorized feedback noticeably more than a single overall score.',
    ],
    screenshots: [
      { id: 'interview-session', caption: 'Live interview session with adaptive follow-up questions', src: null },
      { id: 'feedback-report', caption: 'Structured feedback report broken down by category', src: null },
    ],
    performanceMetrics: [
      { label: 'Avg. Feedback Time', value: '3.2s' },
      { label: 'Question Bank', value: '600+' },
    ],
  },
  {
    id: 'shardmesh',
    name: 'ShardMesh',
    status: 'active',
    type: 'Distributed Systems · Storage Engine',
    shortDescription:
      'A horizontally-sharded key-value store built to explore consistent hashing, replication, and leader election from first principles.',
    techStack: ['Rust', 'gRPC', 'Raft', 'RocksDB'],
    github: 'https://github.com/',
    liveDemo: null,

    overview:
      'ShardMesh is a from-scratch distributed key-value store built to understand consistent hashing, replication, and consensus by implementing them, rather than only reading about them.',
    problemStatement:
      'Off-the-shelf distributed databases hide almost all of the interesting mechanics behind a clean API. The goal here was the opposite: build the sharding, replication, and leader election directly to understand the real trade-offs.',
    architecture:
      'Data is partitioned across nodes using consistent hashing with virtual nodes to keep shard distribution even as the cluster resizes. Each shard is replicated across three nodes using a Raft consensus group, with RocksDB as the local storage engine per replica.',
    engineeringChallenges: [
      'Split-brain risk during network partitions, addressed by enforcing quorum writes through Raft rather than optimistic replication',
      'Hot-shard imbalance under skewed key access, mitigated with virtual node rebalancing',
    ],
    keyLearnings: [
      'Implementing Raft from scratch made the purpose of quorum writes click in a way reading the paper alone never did.',
      'Virtual nodes are a simple idea that meaningfully smooths out shard imbalance in practice.',
      'Consensus systems fail in ways that are hard to reproduce without an explicit fault-injection harness.',
    ],
    screenshots: [
      { id: 'cluster-topology', caption: 'Cluster topology with shard replicas across nodes', src: null },
      { id: 'benchmark-results', caption: 'Latency benchmark under simulated node failure', src: null },
    ],
    performanceMetrics: [],
  },
];
