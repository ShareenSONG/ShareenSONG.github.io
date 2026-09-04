export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  summary: string;
  role: string;
  timeline: string;
  team: string;
  platform: string;
  year: string;
  tags: string[];
  status: string;
  tone: 'garden' | 'signal' | 'human';
  context: string;
  problem: string;
  research: string[];
  insight: string;
  decision: string;
  solution: string[];
  responsibilities: string[];
  outcomes: Array<{ value: string; label: string }>;
  reflection: string;
  boundary: string;
};

export const contact = {
  email: 'sax18063135150@163.com',
  github: 'https://github.com/ShareenSONG/',
  resume: '/shareen-song-resume.pdf',
};

export const projects: Project[] = [
  {
    slug: 'igarden-motion-game',
    number: '01',
    title: 'iGarden Motion Game',
    shortTitle: 'iGarden',
    subtitle: 'Turning the backyard into an AI-powered shared play space.',
    summary: 'A 0→1 product direction for a visual motion game console, shaped by North American backyard behavior, computer-vision constraints, and family play.',
    role: 'Product research, definition, PRD & prototype lead',
    timeline: '2026 · Product review stage',
    team: 'Product, hardware, CV, design & engineering',
    platform: 'Game console · Camera · Controller app',
    year: '2026',
    tags: ['0→1 PRODUCT', 'HARDWARE', 'COMPUTER VISION', 'GAMING'],
    status: 'PROPOSED / REVIEWED',
    tone: 'garden',
    context: 'Fairland was exploring how intelligent outdoor hardware could extend beyond utility into family entertainment. The opportunity sat at the intersection of backyard culture, spatial computing, and lightweight social play.',
    problem: 'The problem was not a shortage of entertainment devices. Backyard play lacked interactive content that could start instantly, work across ages, and feel native to a shared physical space without requiring everyone to learn a complex controller.',
    research: [
      'Designed the research framework and triangulated an N=300 online quantitative survey with public user conversations and market signals.',
      'Analyzed North American backyard gatherings, family play patterns, competitor products, and the technical boundary of camera-based pose and position tracking.',
      'Organized 126 game records, contacted 114 game studios and Steam developers, and held meetings with multiple North American studios.',
    ],
    insight: 'A strong entry point was not “more games.” It was low-learning-cost, family-shared play that starts quickly and uses the backyard itself as the interface.',
    decision: 'Prioritize camera-native motion games for one or two players, then use the companion app as a lightweight setup and control layer—not as the center of the experience.',
    solution: [
      'Defined the target audience, ecosystem, console and interaction-controller relationship.',
      'Translated pose recognition, position judgment and multi-person tracking into spatial movement and special-pose mechanics.',
      'Created the controller app PRD and end-to-end prototype covering connection, game switching, IMU control, media transfer, and reconnection.',
    ],
    responsibilities: [
      'Owned the research framework and product-direction synthesis.',
      'Led the controller app PRD and full-flow prototype.',
      'Facilitated reviews across structure, engineering, design and product stakeholders.',
      'Built information-retrieval agent workflows and led external studio outreach.',
    ],
    outcomes: [
      { value: 'N=300', label: 'ONLINE QUANTITATIVE RESEARCH' },
      { value: '126', label: 'GAME RECORDS STRUCTURED' },
      { value: '114', label: 'STUDIOS & DEVELOPERS CONTACTED' },
      { value: 'MULTIPLE', label: 'NORTH AMERICAN STUDIO MEETINGS' },
    ],
    reflection: 'If I continued the project, I would test the first-time setup and mixed-age play loop with real families earlier, then use observed movement failures to narrow the initial game portfolio.',
    boundary: 'The product and app were reviewed as a proposal; they should not be described as launched. Outreach and meetings do not imply signed partnerships or completed game integrations.',
  },
  {
    slug: 'competitive-intelligence-agent',
    number: '02',
    title: 'Competitive Intelligence Agent',
    shortTitle: 'CI Agent',
    subtitle: 'From scattered market checks to an evidence-first intelligence workflow.',
    summary: 'An internal AI agent, SQLite data layer, and dashboard that turned recurring competitor research into a traceable operating system for product and GTM teams.',
    role: 'Product design, agent development, validation & delivery',
    timeline: '2026 · In internal use',
    team: 'Product, GTM & business users',
    platform: 'AI agent · SQLite · HTML dashboard · DingTalk',
    year: '2026',
    tags: ['AI AGENT', 'AUTOMATION', 'DATA PRODUCT', 'DASHBOARD'],
    status: 'IN INTERNAL USE',
    tone: 'signal',
    context: 'Competitive monitoring across intelligent garden products depended on repetitive page checks, fragmented evidence, and manually assembled reports. Product and GTM teams needed the same facts, but not another opaque AI summary.',
    problem: 'The real challenge was reliability: pages change dynamically, prices and coupons are easy to misread, and a fluent report can hide weak evidence. The workflow needed to preserve source facts, identify change, and make every conclusion traceable.',
    research: [
      'Mapped the existing monitoring and reporting workflow with internal users across product and GTM.',
      'Defined the core entities for brands, markets, SKUs, source snapshots, price and promotion facts, market events, and run logs.',
      'Catalogued failure modes including dynamic pages, low-confidence prices, coupon misclassification, and task timeouts.',
    ],
    insight: 'Facts and interpretation should not share the same failure mode. Deterministic rules and diffs should produce evidence; the language model should explain patterns and compose the report.',
    decision: 'Separate collection, source snapshots, fact extraction, event diffs, and report generation into explicit stages, with confidence thresholds and human review for ambiguous cases.',
    solution: [
      'Built a reusable source-config → collection → snapshot → extraction → diff → event → report workflow.',
      'Used SQLite as a real business data layer for history, traceability, filtering, and dashboard queries.',
      'Added browser execution, multimodal fallback, sliced runs, and manual-review paths for known bad cases.',
      'Delivered Markdown briefs, price tables, exception alerts, and an HTML dashboard through the internal DingTalk workflow.',
    ],
    responsibilities: [
      'Defined the product workflow, information model, quality fields, and evidence contract.',
      'Implemented and iterated the agent workflow, data layer, and dashboard.',
      'Designed exception handling and the boundary between rules, models, and people.',
      'Validated usage and efficiency through an internal DingTalk questionnaire.',
    ],
    outcomes: [
      { value: '20+', label: 'BRANDS FORMALLY MONITORED' },
      { value: '200+', label: 'INTERNAL USERS' },
      { value: '≈30%', label: 'SELF-REPORTED TIME SAVED' },
      { value: 'SQLITE', label: 'REAL BUSINESS DATA WRITES' },
    ],
    reflection: 'The next step would be to instrument task-level usage and correction logs so perceived time savings can be compared with observed behavior, while keeping the evidence trail easy for nontechnical teams to inspect.',
    boundary: 'The ≈30% efficiency figure comes from a questionnaire distributed internally through DingTalk; it is self-reported, not a controlled causal experiment. The system informed decisions but should not be credited with direct revenue or pricing changes.',
  },
  {
    slug: 'ai-digital-human-education',
    number: '03',
    title: 'AI Digital Human Education',
    shortTitle: 'AI Education',
    subtitle: 'A deployable AI teaching product for real institutional constraints.',
    summary: 'A 0→1 education product and reusable ToB/ToG solution system spanning teacher research, product definition, local deployment, proposals, tenders, and delivery.',
    role: 'Product solutions engineer · Product manager',
    timeline: '2024.06–2025.06 · Launched',
    team: 'Product, engineering, sales & university stakeholders',
    platform: 'AI digital human · Local deployment · Web',
    year: '2024–25',
    tags: ['AI PRODUCT', 'TOB / TOG', 'LOCAL DEPLOYMENT', 'DELIVERY'],
    status: 'LAUNCHED / DELIVERED',
    tone: 'human',
    context: 'Universities wanted AI-assisted course production and teaching experiences, but each institution had different infrastructure, procurement, copyright, security, and deployment requirements.',
    problem: 'The challenge was not simply adding a digital avatar. The product had to fit actual teacher workflows, work within institutional deployment constraints, and become repeatable enough to support proposals and delivery across schools.',
    research: [
      'Completed five university-teacher interviews and decomposed three classroom recording workflows.',
      'Mapped requirements for real-time speech synthesis, custom avatars, multimodal input/output, copyright, and private deployment.',
      'Connected product requirements with proposal, tender, quotation, compliance, and acceptance processes.',
    ],
    insight: 'For institutional AI products, deployability and operational clarity are part of the user experience. A compelling demo is not enough if the solution cannot survive procurement, security review, and handover.',
    decision: 'Design the product as a modular, locally deployable capability set, then standardize the surrounding parameters, proposal templates, and delivery language so each project could be configured without restarting from zero.',
    solution: [
      'Produced the PRD for real-time speech, custom avatar, and multimodal capabilities.',
      'Supported local deployment, copyright licensing, solution design, technical Q&A, tender negotiation, and acceptance.',
      'Built a full product-parameter library and reusable proposal templates across university scenarios.',
    ],
    responsibilities: [
      'Owned teacher research, workflow analysis, product requirements, and cross-team alignment.',
      'Supported local deployment and the path from demo to institutional delivery.',
      'Translated technical capabilities into compliant, reusable ToB/ToG solutions.',
      'Worked with sales through presentations, technical clarification, bidding, and acceptance.',
    ],
    outcomes: [
      { value: '5', label: 'UNIVERSITIES WITH PRODUCT DEPLOYMENT' },
      { value: '15', label: 'UNIVERSITIES COVERED BY SOLUTIONS' },
      { value: '¥18M+', label: 'TEAM PROJECT COLLECTIONS SUPPORTED' },
      { value: '0→1', label: 'PRODUCT TO DELIVERY' },
    ],
    reflection: 'If I rebuilt the system, I would define the deployment checklist and post-launch success metrics alongside the first PRD, so product learning continued after project acceptance rather than stopping at delivery.',
    boundary: 'The ¥18M+ figure is cumulative team project collection supported by the solution work, not my individual sales performance. Five product deployments and fifteen schools covered by solutions are separate scopes.',
  },
];

export const experience = [
  {
    type: 'WORK',
    organization: 'Fairland Technology Group',
    role: 'AI Product Intern',
    time: '2026.04 — PRESENT',
    location: 'SHENZHEN',
    description: 'Researching overseas intelligent-garden products, defining AI and hardware experiences, and turning agent workflows into tools used by product and GTM teams.',
  },
  {
    type: 'WORK',
    organization: 'Baike Rongchuang Technology',
    role: 'Product Solutions Engineer · Product Manager',
    time: '2024.06 — 2025.06',
    location: 'CHINA',
    description: 'Took an AI digital-human education product from teacher research to PRD, local deployment, standardized solutions, tenders, and project delivery.',
  },
  {
    type: 'EDUCATION',
    organization: 'Hong Kong Baptist University',
    role: 'MSc Computer Science · IT Management',
    time: '2025.09 — 2026.10',
    location: 'HONG KONG',
    description: 'GPA 3.25/4.0, top 5% of the program, and Semester 1 Merit Scholarship.',
  },
  {
    type: 'EDUCATION',
    organization: 'University of Jinan',
    role: 'BSc Computer Science & Technology',
    time: '2020.09 — 2024.06',
    location: 'JINAN',
    description: 'Built a technical foundation across machine learning, databases, cloud computing, data engineering, programming, and information security.',
  },
];

export const thoughtTopics = [
  {
    title: 'Build notes & AI experiments',
    date: 'ONGOING',
    tag: 'GITHUB',
    description: 'Code, prototypes, and experiments that sit behind my product thinking.',
    href: contact.github,
    source: 'VISIT GITHUB',
  },
  {
    title: 'What makes a good AI agent?',
    date: 'WRITING',
    tag: 'AGENT UX',
    description: 'Why capability breadth matters less than evidence, boundaries, and a recoverable workflow.',
    source: 'DRAFT IN PROGRESS',
  },
  {
    title: 'Research should change the decision.',
    date: 'WRITING',
    tag: 'PRODUCT',
    description: 'A note on moving from collected information to an explicit, testable product judgment.',
    source: 'DRAFT IN PROGRESS',
  },
];

export const additionalWork = [
  ['OpenClaw Agent Security', 'AI SAFETY / ACCESS CONTROL / VALIDATION', '2026'],
  ['MindCare', 'USER RESEARCH / UX / PRODUCT DESIGN', '2026'],
  ['Sasa Beauty AI Transformation', 'RETAIL / AI / A/B TESTING', '2025'],
  ['Spark E-commerce Analytics', 'DATA ENGINEERING / INSIGHT', '2024'],
];

export const lifeImages = [
  { src: '/images/harbour-sunset.jpg', alt: 'Shareen by Victoria Harbour at sunset', caption: 'HONG KONG / GOLDEN HOUR', shape: 'wide' },
  { src: '/images/un-visit.jpg', alt: 'Shareen visiting the United Nations in Geneva', caption: 'GENEVA / LEARNING EXPEDITION', shape: 'portrait' },
  { src: '/images/hong-kong-night.jpg', alt: 'Shareen beside Victoria Harbour at night', caption: 'HONG KONG / BETWEEN CITIES', shape: 'portrait' },
  { src: '/images/travel.jpg', alt: 'Shareen traveling during the winter season', caption: 'TRAVEL / SMALL MOMENTS', shape: 'portrait' },
  { src: '/images/vibecoders.jpg', alt: 'Shareen at a Vibe Coders community event', caption: 'VIBE CODERS / COMMUNITY', shape: 'wide' },
  { src: '/images/collaboration.jpg', alt: 'Shareen collaborating with a small group around laptops', caption: 'BUILDING / WITH PEOPLE', shape: 'wide' },
];

export const interests = [
  { name: 'Guzheng', detail: 'Grade 10 · a long practice in rhythm and patience' },
  { name: 'Yoga', detail: '11 years · attention, consistency, and body awareness' },
  { name: 'Cinema', detail: 'Science fiction, visual language, and stories about human choices' },
  { name: 'Travel', detail: 'Cities, nature, museums, and learning through unfamiliar contexts' },
  { name: 'Technology', detail: 'AI experiments, spatial interfaces, and tools that change behavior' },
  { name: 'Calligraphy', detail: 'Structure, negative space, and the beauty of deliberate marks' },
];
