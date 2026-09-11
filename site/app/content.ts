import type { LocalizedCopy } from './components/Localized';

type Copy = LocalizedCopy;

export type Project = {
  slug: string; number: string; title: Copy; shortTitle: Copy; subtitle: Copy; summary: Copy;
  role: Copy; timeline: Copy; team: Copy; platform: Copy; year: string; tags: Copy[];
  status: Copy; tone: 'garden' | 'signal' | 'human'; context: Copy; problem: Copy;
  research: Copy[]; insight: Copy; decision: Copy; solution: Copy[]; responsibilities: Copy[];
  outcomes: Array<{ value: string; label: Copy }>; reflection: Copy; boundary: Copy;
};

export const contact = {
  email: 'sax18063135150@163.com',
  github: 'https://github.com/ShareenSONG/',
  resume: '/shareen-song-resume.pdf',
};

export const projects: Project[] = [
  {
    slug: 'igarden-motion-game', number: '01', year: '2026', tone: 'garden',
    title: { zh: 'iGarden 体感游戏', en: 'iGarden Motion Game' },
    shortTitle: { zh: 'iGarden', en: 'iGarden' },
    subtitle: { zh: '把后院变成由 AI 驱动的共享游戏空间。', en: 'Turning the backyard into an AI-powered shared play space.' },
    summary: { zh: '从北美后院行为、计算机视觉边界与家庭共玩需求出发，定义一套 0→1 视觉体感游戏主机方向。', en: 'A 0→1 product direction for a visual motion game console, shaped by North American backyard behavior, computer-vision constraints, and family play.' },
    role: { zh: '产品研究、定义、PRD 与原型负责人', en: 'Product research, definition, PRD & prototype lead' },
    timeline: { zh: '2026 · 产品评审阶段', en: '2026 · Product review stage' },
    team: { zh: '产品、硬件、计算机视觉、设计与研发', en: 'Product, hardware, CV, design & engineering' },
    platform: { zh: '游戏主机 · 摄像头 · 控制 App', en: 'Game console · Camera · Controller app' },
    tags: [
      { zh: '0→1 产品', en: '0→1 PRODUCT' }, { zh: '硬件', en: 'HARDWARE' },
      { zh: '计算机视觉', en: 'COMPUTER VISION' }, { zh: '游戏', en: 'GAMING' },
    ],
    status: { zh: '方案已评审', en: 'PROPOSED / REVIEWED' },
    context: { zh: '菲亚兰德正在探索智能户外硬件如何从工具延伸到家庭娱乐。机会位于后院文化、空间计算与轻量社交游戏的交叉点。', en: 'Fairland was exploring how intelligent outdoor hardware could extend beyond utility into family entertainment. The opportunity sat at the intersection of backyard culture, spatial computing, and lightweight social play.' },
    problem: { zh: '真正的问题不是缺少娱乐设备，而是后院共玩缺少一种能立即开始、跨年龄参与、又不要求所有人学习复杂控制器的互动内容。', en: 'The problem was not a shortage of entertainment devices. Backyard play lacked interactive content that could start instantly, work across ages, and feel native to a shared physical space without requiring everyone to learn a complex controller.' },
    research: [
      { zh: '设计研究框架，将 N=300 的线上定量问卷、公开用户讨论与市场信号交叉验证。', en: 'Designed the research framework and triangulated an N=300 online quantitative survey with public user conversations and market signals.' },
      { zh: '分析北美后院聚会、家庭共玩方式、竞品与摄像头姿态和位置识别的技术边界。', en: 'Analyzed North American backyard gatherings, family play patterns, competitor products, and the technical boundary of camera-based pose and position tracking.' },
      { zh: '整理 126 条游戏记录，联系 114 家游戏工作室与 Steam 开发者，并与多家北美工作室会谈。', en: 'Organized 126 game records, contacted 114 game studios and Steam developers, and held meetings with multiple North American studios.' },
    ],
    insight: { zh: '更强的切入口不是“更多游戏”，而是低学习成本、快速启动、让后院本身成为界面的家庭共玩。', en: 'A strong entry point was not “more games.” It was low-learning-cost, family-shared play that starts quickly and uses the backyard itself as the interface.' },
    decision: { zh: '优先面向一至两人的摄像头原生体感游戏，并把配套 App 定位为轻量设置与控制层，而不是体验中心。', en: 'Prioritize camera-native motion games for one or two players, then use the companion app as a lightweight setup and control layer—not as the center of the experience.' },
    solution: [
      { zh: '定义目标人群、产品生态、主机与交互控制器的关系。', en: 'Defined the target audience, ecosystem, console and interaction-controller relationship.' },
      { zh: '把姿态识别、位置判断与多人追踪转译为空间移动和特殊姿势玩法。', en: 'Translated pose recognition, position judgment and multi-person tracking into spatial movement and special-pose mechanics.' },
      { zh: '完成控制 App PRD 与全流程原型，覆盖连接、切换游戏、IMU 控制、媒体传输与断线重连。', en: 'Created the controller app PRD and end-to-end prototype covering connection, game switching, IMU control, media transfer, and reconnection.' },
    ],
    responsibilities: [
      { zh: '负责研究框架与产品方向综合判断。', en: 'Owned the research framework and product-direction synthesis.' },
      { zh: '主导控制 App PRD 与全流程原型。', en: 'Led the controller app PRD and full-flow prototype.' },
      { zh: '推动结构、研发、设计与产品相关方评审。', en: 'Facilitated reviews across structure, engineering, design and product stakeholders.' },
      { zh: '搭建信息检索 Agent 工作流并推进外部工作室沟通。', en: 'Built information-retrieval agent workflows and led external studio outreach.' },
    ],
    outcomes: [
      { value: 'N=300', label: { zh: '线上定量研究', en: 'ONLINE QUANTITATIVE RESEARCH' } },
      { value: '126', label: { zh: '结构化游戏记录', en: 'GAME RECORDS STRUCTURED' } },
      { value: '114', label: { zh: '联系工作室与开发者', en: 'STUDIOS & DEVELOPERS CONTACTED' } },
      { value: '多家', label: { zh: '北美工作室会谈', en: 'NORTH AMERICAN STUDIO MEETINGS' } },
    ],
    reflection: { zh: '如果继续推进，我会更早与真实家庭测试首次设置和混龄共玩，并用观察到的动作识别失败来收窄首批游戏组合。', en: 'If I continued the project, I would test the first-time setup and mixed-age play loop with real families earlier, then use observed movement failures to narrow the initial game portfolio.' },
    boundary: { zh: '产品与 App 处于方案评审阶段，不应描述为已经上线；外联与会谈不代表已签约或完成游戏接入。', en: 'The product and app were reviewed as a proposal; they should not be described as launched. Outreach and meetings do not imply signed partnerships or completed game integrations.' },
  },
  {
    slug: 'competitive-intelligence-agent', number: '02', year: '2026', tone: 'signal',
    title: { zh: '竞品监控 Agent', en: 'Competitive Intelligence Agent' },
    shortTitle: { zh: '竞品 Agent', en: 'CI Agent' },
    subtitle: { zh: '把零散市场检查变成证据优先的情报工作流。', en: 'From scattered market checks to an evidence-first intelligence workflow.' },
    summary: { zh: '用 AI Agent、SQLite 数据层与可视化看板，把重复竞品研究变成可追溯的产品与 GTM 工作系统。', en: 'An internal AI agent, SQLite data layer, and dashboard that turned recurring competitor research into a traceable operating system for product and GTM teams.' },
    role: { zh: '产品设计、Agent 开发、验证与交付', en: 'Product design, agent development, validation & delivery' },
    timeline: { zh: '2026 · 内部使用中', en: '2026 · In internal use' },
    team: { zh: '产品、GTM 与业务用户', en: 'Product, GTM & business users' },
    platform: { zh: 'AI Agent · SQLite · HTML 看板 · 钉钉', en: 'AI agent · SQLite · HTML dashboard · DingTalk' },
    tags: [
      { zh: 'AI Agent', en: 'AI AGENT' }, { zh: '自动化', en: 'AUTOMATION' },
      { zh: '数据产品', en: 'DATA PRODUCT' }, { zh: '看板', en: 'DASHBOARD' },
    ],
    status: { zh: '内部使用中', en: 'IN INTERNAL USE' },
    context: { zh: '智能庭院产品的竞品监控依赖重复页面检查、碎片化证据与手工拼接报告。产品与 GTM 团队需要共享事实，但不需要另一个不透明的 AI 摘要。', en: 'Competitive monitoring across intelligent garden products depended on repetitive page checks, fragmented evidence, and manually assembled reports. Product and GTM teams needed the same facts, but not another opaque AI summary.' },
    problem: { zh: '核心挑战是可靠性：动态页面会变化，价格和优惠券容易误读，流畅的报告也可能掩盖薄弱证据。工作流必须保留来源事实、识别变化，并让结论可追溯。', en: 'The real challenge was reliability: pages change dynamically, prices and coupons are easy to misread, and a fluent report can hide weak evidence. The workflow needed to preserve source facts, identify change, and make every conclusion traceable.' },
    research: [
      { zh: '与产品和 GTM 用户梳理原有监控与报告流程。', en: 'Mapped the existing monitoring and reporting workflow with internal users across product and GTM.' },
      { zh: '定义品牌、市场、SKU、来源快照、价格与促销事实、市场事件和运行日志等核心实体。', en: 'Defined the core entities for brands, markets, SKUs, source snapshots, price and promotion facts, market events, and run logs.' },
      { zh: '归纳动态页面、低置信价格、优惠券误判和任务超时等失效模式。', en: 'Catalogued failure modes including dynamic pages, low-confidence prices, coupon misclassification, and task timeouts.' },
    ],
    insight: { zh: '事实与解释不应共享同一种失效方式。确定性规则与差异比较负责证据，语言模型负责解释模式与组织报告。', en: 'Facts and interpretation should not share the same failure mode. Deterministic rules and diffs should produce evidence; the language model should explain patterns and compose the report.' },
    decision: { zh: '把采集、来源快照、事实抽取、事件差异与报告生成拆成显式阶段，并为模糊案例设置置信阈值与人工复核。', en: 'Separate collection, source snapshots, fact extraction, event diffs, and report generation into explicit stages, with confidence thresholds and human review for ambiguous cases.' },
    solution: [
      { zh: '构建可复用的“来源配置 → 采集 → 快照 → 抽取 → 差异 → 事件 → 报告”流程。', en: 'Built a reusable source-config → collection → snapshot → extraction → diff → event → report workflow.' },
      { zh: '以 SQLite 承载历史、追溯、筛选与看板查询，作为真实业务数据层。', en: 'Used SQLite as a real business data layer for history, traceability, filtering, and dashboard queries.' },
      { zh: '为已知坏案例加入浏览器执行、多模态回退、分片运行与人工复核路径。', en: 'Added browser execution, multimodal fallback, sliced runs, and manual-review paths for known bad cases.' },
      { zh: '通过内部钉钉流程交付 Markdown 简报、价格表、异常提醒与 HTML 看板。', en: 'Delivered Markdown briefs, price tables, exception alerts, and an HTML dashboard through the internal DingTalk workflow.' },
    ],
    responsibilities: [
      { zh: '定义产品流程、信息模型、质量字段与证据契约。', en: 'Defined the product workflow, information model, quality fields, and evidence contract.' },
      { zh: '实现并迭代 Agent 工作流、数据层与看板。', en: 'Implemented and iterated the agent workflow, data layer, and dashboard.' },
      { zh: '设计异常处理以及规则、模型与人的责任边界。', en: 'Designed exception handling and the boundary between rules, models, and people.' },
      { zh: '通过内部钉钉问卷验证使用情况与效率感知。', en: 'Validated usage and efficiency through an internal DingTalk questionnaire.' },
    ],
    outcomes: [
      { value: '20+', label: { zh: '正式监控品牌', en: 'BRANDS FORMALLY MONITORED' } },
      { value: '200+', label: { zh: '内部用户', en: 'INTERNAL USERS' } },
      { value: '≈30%', label: { zh: '自报节省时间', en: 'SELF-REPORTED TIME SAVED' } },
      { value: 'SQLite', label: { zh: '真实业务数据写入', en: 'REAL BUSINESS DATA WRITES' } },
    ],
    reflection: { zh: '下一步会记录任务级使用与纠错日志，让感知效率与观察行为可以比较，同时保持证据链对非技术团队可读。', en: 'The next step would be to instrument task-level usage and correction logs so perceived time savings can be compared with observed behavior, while keeping the evidence trail easy for nontechnical teams to inspect.' },
    boundary: { zh: '约 30% 的效率提升来自内部钉钉问卷，是自报结果而非受控因果实验；系统支持决策，但不应归因于直接营收或定价变化。', en: 'The ≈30% efficiency figure comes from a questionnaire distributed internally through DingTalk; it is self-reported, not a controlled causal experiment. The system informed decisions but should not be credited with direct revenue or pricing changes.' },
  },
  {
    slug: 'ai-digital-human-education', number: '03', year: '2024–25', tone: 'human',
    title: { zh: 'AI 数字人教育产品', en: 'AI Digital Human Education' },
    shortTitle: { zh: 'AI 教育', en: 'AI Education' },
    subtitle: { zh: '在真实机构约束下可部署的 AI 教学产品。', en: 'A deployable AI teaching product for real institutional constraints.' },
    summary: { zh: '覆盖教师研究、产品定义、本地部署、方案、招投标与交付的 0→1 教育产品和可复用 ToB/ToG 方案体系。', en: 'A 0→1 education product and reusable ToB/ToG solution system spanning teacher research, product definition, local deployment, proposals, tenders, and delivery.' },
    role: { zh: '产品解决方案工程师 · 产品经理', en: 'Product solutions engineer · Product manager' },
    timeline: { zh: '2024.06–2025.06 · 已上线', en: '2024.06–2025.06 · Launched' },
    team: { zh: '产品、研发、销售与高校相关方', en: 'Product, engineering, sales & university stakeholders' },
    platform: { zh: 'AI 数字人 · 本地部署 · Web', en: 'AI digital human · Local deployment · Web' },
    tags: [
      { zh: 'AI 产品', en: 'AI PRODUCT' }, { zh: 'ToB / ToG', en: 'TOB / TOG' },
      { zh: '本地部署', en: 'LOCAL DEPLOYMENT' }, { zh: '交付', en: 'DELIVERY' },
    ],
    status: { zh: '已上线 / 已交付', en: 'LAUNCHED / DELIVERED' },
    context: { zh: '高校希望引入 AI 辅助课程制作与教学体验，但每所学校都有不同的基础设施、采购、版权、安全与部署要求。', en: 'Universities wanted AI-assisted course production and teaching experiences, but each institution had different infrastructure, procurement, copyright, security, and deployment requirements.' },
    problem: { zh: '挑战不只是加一个数字人。产品必须进入真实教师工作流，适应机构部署约束，并具备足够复用性以支持跨学校方案与交付。', en: 'The challenge was not simply adding a digital avatar. The product had to fit actual teacher workflows, work within institutional deployment constraints, and become repeatable enough to support proposals and delivery across schools.' },
    research: [
      { zh: '完成 5 所高校教师访谈，并拆解 3 类课堂录制流程。', en: 'Completed five university-teacher interviews and decomposed three classroom recording workflows.' },
      { zh: '梳理实时语音合成、定制形象、多模态输入输出、版权与私有化部署要求。', en: 'Mapped requirements for real-time speech synthesis, custom avatars, multimodal input/output, copyright, and private deployment.' },
      { zh: '把产品需求与方案、招标、报价、合规和验收流程连接起来。', en: 'Connected product requirements with proposal, tender, quotation, compliance, and acceptance processes.' },
    ],
    insight: { zh: '对机构型 AI 产品而言，可部署性与运营清晰度就是用户体验的一部分；如果无法通过采购、安全审查和交接，再吸引人的演示也不够。', en: 'For institutional AI products, deployability and operational clarity are part of the user experience. A compelling demo is not enough if the solution cannot survive procurement, security review, and handover.' },
    decision: { zh: '把产品设计为模块化、可本地部署的能力集合，并标准化参数、方案模板与交付语言，让每个项目无需从零开始。', en: 'Design the product as a modular, locally deployable capability set, then standardize the surrounding parameters, proposal templates, and delivery language so each project could be configured without restarting from zero.' },
    solution: [
      { zh: '输出实时语音、定制形象与多模态能力的产品需求。', en: 'Produced the PRD for real-time speech, custom avatar, and multimodal capabilities.' },
      { zh: '支持本地部署、版权授权、方案设计、技术答疑、招投标沟通与验收。', en: 'Supported local deployment, copyright licensing, solution design, technical Q&A, tender negotiation, and acceptance.' },
      { zh: '建立完整产品参数库与适用于高校场景的可复用方案模板。', en: 'Built a full product-parameter library and reusable proposal templates across university scenarios.' },
    ],
    responsibilities: [
      { zh: '负责教师研究、流程分析、产品需求与跨团队对齐。', en: 'Owned teacher research, workflow analysis, product requirements, and cross-team alignment.' },
      { zh: '支持本地部署以及从演示走向机构交付的全过程。', en: 'Supported local deployment and the path from demo to institutional delivery.' },
      { zh: '把技术能力转译为合规、可复用的 ToB/ToG 方案。', en: 'Translated technical capabilities into compliant, reusable ToB/ToG solutions.' },
      { zh: '与销售共同完成宣讲、技术澄清、投标与验收。', en: 'Worked with sales through presentations, technical clarification, bidding, and acceptance.' },
    ],
    outcomes: [
      { value: '5', label: { zh: '高校完成产品部署', en: 'UNIVERSITIES WITH PRODUCT DEPLOYMENT' } },
      { value: '15', label: { zh: '高校方案覆盖', en: 'UNIVERSITIES COVERED BY SOLUTIONS' } },
      { value: '¥18M+', label: { zh: '支持团队项目回款', en: 'TEAM PROJECT COLLECTIONS SUPPORTED' } },
      { value: '0→1', label: { zh: '从产品到交付', en: 'PRODUCT TO DELIVERY' } },
    ],
    reflection: { zh: '如果重做，我会在第一版 PRD 中同时定义部署检查清单和上线后成功指标，让产品学习不止于项目验收。', en: 'If I rebuilt the system, I would define the deployment checklist and post-launch success metrics alongside the first PRD, so product learning continued after project acceptance rather than stopping at delivery.' },
    boundary: { zh: '¥18M+ 是方案工作支持的团队累计项目回款，不是个人销售业绩；5 所产品部署高校与 15 所方案覆盖高校是不同口径。', en: 'The ¥18M+ figure is cumulative team project collection supported by the solution work, not my individual sales performance. Five product deployments and fifteen schools covered by solutions are separate scopes.' },
  },
];

export const experience = [
  { type: { zh: '工作', en: 'WORK' }, organization: { zh: '菲亚兰德科技集团', en: 'Fairland Technology Group' }, role: { zh: 'AI 产品实习生', en: 'AI Product Intern' }, time: { zh: '2026.04 — 至今', en: '2026.04 — PRESENT' }, location: { zh: '深圳', en: 'SHENZHEN' }, description: { zh: '研究海外智能庭院产品，定义 AI 与硬件体验，并把 Agent 工作流转化为产品和 GTM 团队实际使用的工具。', en: 'Researching overseas intelligent-garden products, defining AI and hardware experiences, and turning agent workflows into tools used by product and GTM teams.' } },
  { type: { zh: '工作', en: 'WORK' }, organization: { zh: '百科融创科技', en: 'Baike Rongchuang Technology' }, role: { zh: '产品解决方案工程师 · 产品经理', en: 'Product Solutions Engineer · Product Manager' }, time: { zh: '2024.06 — 2025.06', en: '2024.06 — 2025.06' }, location: { zh: '中国', en: 'CHINA' }, description: { zh: '把 AI 数字人教育产品从教师研究推进到 PRD、本地部署、标准化方案、招投标与项目交付。', en: 'Took an AI digital-human education product from teacher research to PRD, local deployment, standardized solutions, tenders, and project delivery.' } },
  { type: { zh: '教育', en: 'EDUCATION' }, organization: { zh: '香港浸会大学', en: 'Hong Kong Baptist University' }, role: { zh: '计算机科学硕士 · 信息技术管理', en: 'MSc Computer Science · IT Management' }, time: { zh: '2025.09 — 2026.10', en: '2025.09 — 2026.10' }, location: { zh: '香港', en: 'HONG KONG' }, description: { zh: 'GPA 3.25/4.0，专业前 5%，获第一学期优秀学生奖学金。', en: 'GPA 3.25/4.0, top 5% of the program, and Semester 1 Merit Scholarship.' } },
  { type: { zh: '教育', en: 'EDUCATION' }, organization: { zh: '济南大学', en: 'University of Jinan' }, role: { zh: '计算机科学与技术学士', en: 'BSc Computer Science & Technology' }, time: { zh: '2020.09 — 2024.06', en: '2020.09 — 2024.06' }, location: { zh: '济南', en: 'JINAN' }, description: { zh: '在机器学习、数据库、云计算、数据工程、编程与信息安全等方向建立技术基础。', en: 'Built a technical foundation across machine learning, databases, cloud computing, data engineering, programming, and information security.' } },
];

export const thoughtTopics = [
  { title: { zh: '构建笔记与 AI 实验', en: 'Build notes & AI experiments' }, date: { zh: '持续更新', en: 'ONGOING' }, tag: { zh: 'GitHub', en: 'GITHUB' }, description: { zh: '支撑我产品思考的代码、原型与实验。', en: 'Code, prototypes, and experiments that sit behind my product thinking.' }, href: contact.github, source: { zh: '访问 GitHub', en: 'VISIT GITHUB' } },
  { title: { zh: '什么让 AI Agent 真正好用？', en: 'What makes a good AI agent?' }, date: { zh: '撰写中', en: 'WRITING' }, tag: { zh: 'Agent 体验', en: 'AGENT UX' }, description: { zh: '为什么证据、边界和可恢复工作流，比能力范围更重要。', en: 'Why capability breadth matters less than evidence, boundaries, and a recoverable workflow.' }, source: { zh: '草稿', en: 'DRAFT IN PROGRESS' } },
  { title: { zh: '研究应该改变决策。', en: 'Research should change the decision.' }, date: { zh: '撰写中', en: 'WRITING' }, tag: { zh: '产品', en: 'PRODUCT' }, description: { zh: '从信息收集走向明确、可验证产品判断的一篇笔记。', en: 'A note on moving from collected information to an explicit, testable product judgment.' }, source: { zh: '草稿', en: 'DRAFT IN PROGRESS' } },
];

export const additionalWork = [
  { title: { zh: 'OpenClaw Agent 安全', en: 'OpenClaw Agent Security' }, tags: { zh: 'AI 安全 / 访问控制 / 验证', en: 'AI SAFETY / ACCESS CONTROL / VALIDATION' }, year: '2026' },
  { title: { zh: 'MindCare 心理健康产品', en: 'MindCare' }, tags: { zh: '用户研究 / 体验 / 产品设计', en: 'USER RESEARCH / UX / PRODUCT DESIGN' }, year: '2026' },
  { title: { zh: '莎莎美妆 AI 转型', en: 'Sasa Beauty AI Transformation' }, tags: { zh: '零售 / AI / A/B 测试', en: 'RETAIL / AI / A/B TESTING' }, year: '2025' },
  { title: { zh: 'Spark 电商分析', en: 'Spark E-commerce Analytics' }, tags: { zh: '数据工程 / 洞察', en: 'DATA ENGINEERING / INSIGHT' }, year: '2024' },
];

export const lifeImages = [
  { src: '/images/harbour-sunset.jpg', alt: { zh: '宋艾欣在维多利亚港日落时分', en: 'Shareen by Victoria Harbour at sunset' }, caption: { zh: '香港 / 日落时分', en: 'HONG KONG / GOLDEN HOUR' }, shape: 'wide' },
  { src: '/images/un-visit.jpg', alt: { zh: '宋艾欣参访日内瓦联合国', en: 'Shareen visiting the United Nations in Geneva' }, caption: { zh: '日内瓦 / 研学', en: 'GENEVA / LEARNING EXPEDITION' }, shape: 'portrait' },
  { src: '/images/hong-kong-night.jpg', alt: { zh: '宋艾欣夜晚在维多利亚港边', en: 'Shareen beside Victoria Harbour at night' }, caption: { zh: '香港 / 城市之间', en: 'HONG KONG / BETWEEN CITIES' }, shape: 'portrait' },
  { src: '/images/travel.jpg', alt: { zh: '宋艾欣冬季旅行途中', en: 'Shareen traveling during the winter season' }, caption: { zh: '旅行 / 小时刻', en: 'TRAVEL / SMALL MOMENTS' }, shape: 'portrait' },
  { src: '/images/vibecoders.jpg', alt: { zh: '宋艾欣参加 Vibe Coders 社区活动', en: 'Shareen at a Vibe Coders community event' }, caption: { zh: 'Vibe Coders / 社区', en: 'VIBE CODERS / COMMUNITY' }, shape: 'wide' },
  { src: '/images/collaboration.jpg', alt: { zh: '宋艾欣与伙伴围绕电脑协作', en: 'Shareen collaborating with a small group around laptops' }, caption: { zh: '共创 / 与人一起', en: 'BUILDING / WITH PEOPLE' }, shape: 'wide' },
] as const;

export const interests = [
  { name: { zh: '古筝', en: 'Guzheng' }, detail: { zh: '十级 · 关于节奏与耐心的长期练习', en: 'Grade 10 · a long practice in rhythm and patience' } },
  { name: { zh: '瑜伽', en: 'Yoga' }, detail: { zh: '11 年 · 注意力、持续性与身体觉察', en: '11 years · attention, consistency, and body awareness' } },
  { name: { zh: '电影', en: 'Cinema' }, detail: { zh: '科幻、视觉语言与关于人类选择的故事', en: 'Science fiction, visual language, and stories about human choices' } },
  { name: { zh: '旅行', en: 'Travel' }, detail: { zh: '城市、自然、博物馆与陌生情境中的学习', en: 'Cities, nature, museums, and learning through unfamiliar contexts' } },
  { name: { zh: '科技', en: 'Technology' }, detail: { zh: 'AI 实验、空间界面与改变行为的工具', en: 'AI experiments, spatial interfaces, and tools that change behavior' } },
  { name: { zh: '书法', en: 'Calligraphy' }, detail: { zh: '结构、留白与刻意落笔的美感', en: 'Structure, negative space, and the beauty of deliberate marks' } },
];
