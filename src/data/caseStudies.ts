export type MetricStatus = "Delivered" | "Modeled" | "Projected" | "In production";

export interface Metric {
  value: string;
  label: string;
  status: MetricStatus;
}

export interface TechHighlight {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  cardOutcome: string;
  date: string;
  client?: string;
  industry: string;
  engagement: string;
  tags: string[];
  image: string;
  impact?: Metric[];
  challenge?: string[];
  approach?: string[];
  architecture?: {
    diagram?: string;
    caption?: string;
  };
  technicalHighlights?: TechHighlight[];
  delivered?: string[];
  capabilities?: string[];
  stack?: string[];
  externalUrl?: string;
}

const PLACEHOLDER_IMAGE = "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png";

export const caseStudies: CaseStudy[] = [
  {
    slug: "lsc-ecm",
    title: "Lone Star College ECM",
    heroTitle: "Replacing an ECM across 23 campuses, without 18 months of sequential work",
    heroSubtitle:
      "A complete executable specification — and seven AI agents — to replace an enterprise document system under hard compliance constraints.",
    cardOutcome:
      "Cut a 26-week ECM migration plan to 15 weeks by putting seven AI agents in the serial-work slots humans usually sit blocked in.",
    date: "2025",
    client: "Lone Star College System · 23 campuses · 80,000 students · 7,300 employees",
    industry: "Higher Education / Public Sector",
    engagement: "Architecture + specs-as-code",
    tags: ["AI Architect", "Enterprise ECM", "Regulated"],
    image: PLACEHOLDER_IMAGE,
    impact: [
      {
        value: "26 → 15 weeks",
        label: "Timeline compression from sequential implementation",
        status: "Modeled",
      },
      {
        value: "7 agents",
        label: "Purpose-built for discovery, migration, and compliance",
        status: "Delivered",
      },
      {
        value: "11 / 11",
        label: "Composable spec modules, each with executable tests",
        status: "Delivered",
      },
      {
        value: "5 frameworks",
        label: "FERPA · HIPAA · TX Data Privacy · §508 · TX-RAMP",
        status: "Delivered",
      },
    ],
    challenge: [
      "Lone Star College System was replacing its enterprise content management platform. The surface problem was a vendor swap. The real problem: documents lived inside a live PeopleSoft ERP across five regulated departments — Student Records, Financial Aid, HR, Admissions, and Compliance — with 95 scanners spread across 23 campuses and no existing data-classification policy.",
      "The default sequential playbook put the project at 6–18 months. The institution had 12–18 weeks.",
      "Anything we designed had to run against the real PeopleSoft attachment framework (not a sanitized model of it), satisfy FERPA, HIPAA, TX Data Privacy Act, §508, and TX-RAMP without the usual 'we'll do compliance last' retrofit, and stay vendor-independent so the client kept leverage through vendor selection.",
    ],
    approach: [
      "**Treat the spec as the product.** Instead of a slide deck and a PM handoff, I wrote the solution as executable specification — 11 composable modules, 36 given/when/then tests, and an explicit risk register. Anyone evaluating a vendor could run the spec as an acceptance contract. The spec itself became the alignment artifact between stakeholders, engineering, and the eventual implementation partner.",
      "**Put agents in the serial-work slots humans usually fill.** A standard migration has discovery, classification, compliance validation, and cutover chained sequentially because each stage depends on the last. I designed seven purpose-built agents for the slots most starved of parallelism — the ones where a human would otherwise sit blocked — and let the critical path collapse.",
    ],
    architecture: {
      diagram: "/case-studies/lscs-architecture.svg",
      caption:
        "Five tiers — users, security perimeter, application services, data layer, and integrations — coordinating through seven AI agents in the parallelism slots.",
    },
    technicalHighlights: [
      {
        title: "Schema Archaeologist agent",
        description:
          "Queries PS_ATTACHMENTS and the live PeopleSoft attachment framework to discover actual data volumes and relationships — not the ones in the vendor documentation. Zero-knowledge-gap migration as a first-class guarantee.",
      },
      {
        title: "Self-healing classification engine",
        description:
          "A 4-tier taxonomy mapped to FERPA / HIPAA categories. Auto-assigns tags at ingestion; drift detection re-classifies anything that moves out of policy after the fact.",
      },
      {
        title: "Protocol-agnostic identity adapter",
        description:
          "SSO/MFA integrations that bind to any institutional IdP — SAML 2.0, OIDC, CAS — so the architecture doesn't tie LSCS to one vendor's auth model.",
      },
      {
        title: "36 executable policy tests",
        description:
          "Given/when/then specs covering document ingestion, cross-department isolation, and bulk reclassification. Run as unit tests; vendors can be graded against them directly.",
      },
    ],
    delivered: [
      "11-module executable specification, composable and versioned",
      "36 given/when/then acceptance tests",
      "Seven agent role specifications with explicit I/O contracts",
      "Risk mitigation register",
      "Agent governance framework",
      "Vendor-independent SSO / identity architecture",
      "4-tier FERPA / HIPAA data classification taxonomy",
    ],
    capabilities: [
      "AI agentic workflow design",
      "Enterprise architecture",
      "Regulatory compliance (FERPA / HIPAA)",
      "ERP integration",
    ],
    stack: [
      "AI Agents",
      "Markdown / YAML (specs-as-code)",
      "PeopleSoft ERP",
      "SAML 2.0 / OIDC",
      "LLM classification pipelines",
    ],
  },
  {
    slug: "kontrak-iq",
    title: "Kontrak IQ",
    heroTitle: "Kontrak IQ",
    heroSubtitle: "An integrated contract data management system, powered by AI.",
    cardOutcome:
      "Founding engineer on an AI-native contract management platform — multi-agent orchestration, enterprise SaaS.",
    date: "Jul 2023 — Present",
    industry: "LegalTech / Enterprise SaaS",
    engagement: "Founding engineer · ongoing",
    tags: ["Founding Engineer", "Multi-agent", "Enterprise SaaS"],
    image: PLACEHOLDER_IMAGE,
    externalUrl: "https://kontrakiq.com",
  },
  {
    slug: "crypto-trading",
    title: "Natural-Language Crypto Trading",
    heroTitle: "A natural-language trading platform that doesn't route every keystroke through an LLM",
    heroSubtitle:
      "Provider-agnostic AI trading system turning plain English into multi-exchange algorithmic strategies — with a hybrid parsing architecture that keeps latency and API cost out of the critical path.",
    cardOutcome:
      "Hybrid regex + LLM parser keeps 80% of trading commands off expensive inference — turnkey desktop platform, production-ready.",
    date: "2025",
    industry: "FinTech / Web3",
    engagement: "Full-stack AI system design + build",
    tags: ["AI Architect", "FinTech", "Multi-provider LLM"],
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "quant-skills",
    title: "Quant Finance AI System",
    heroTitle: "Training a quant-finance model and the agents that deploy it — as one co-designed vertical",
    heroSubtitle:
      "Domain-adaptive pretraining through RLVR through a composable agent-skills framework across eight quant roles — where the fine-tuning data teaches the exact schemas the agents emit, and the RL verifiers check the exact conditions production depends on.",
    cardOutcome:
      "A domain-specialized quant LLM and the composable agent skills that deploy it — DAPT → SFT → RLVR → 15+ production skills, designed as one vertical with an eval gate between every stage.",
    date: "2025",
    industry: "Quantitative Finance",
    engagement: "Full-stack AI system design",
    tags: [
      "AI Architect",
      "LLM Training",
      "Composable Agents",
    ],
    image: "/lovable-uploads/d1e4ceee-3e2d-4e8c-8af3-6d2750e146e0.png",
    impact: [
      {
        value: "4-stage vertical",
        label: "DAPT → SFT → RLVR → agent skills, with an evaluation gate between every stage",
        status: "Delivered",
      },
      {
        value: "15+ skills",
        label: "4 core testing primitives + 11 role-specific skills, composable across 8 quant roles",
        status: "Delivered",
      },
      {
        value: "2–3 wks → 4–6 hrs",
        label: "Modeled signal-validation time once deployed — a 90% reduction",
        status: "Projected",
      },
      {
        value: "$14–27M / yr",
        label: "Modeled annual value, simulated against a hypothetical $1B-AUM fund",
        status: "Projected",
      },
    ],
    challenge: [
      "AI systems fail in quantitative finance for three reasons that compound each other. Solve any one without the others and you get a system that demos well and fails identically in production.",
      "**Shallow domain knowledge.** General-purpose models hallucinate financial terminology, confuse related concepts, and produce outputs that look plausible but are numerically wrong. That's a pretraining-distribution problem, not a prompting problem.",
      "**Unstructured outputs.** Production quant pipelines need deterministic, schema-valid JSON — canonical labels, explicit null handling, fixed precision. A model that sometimes returns `\"vol\": \"high\"` and sometimes `\"realized_volatility_30d_pct\": 42.7` is unusable downstream.",
      "**Absent validation.** A strategy can look profitable on average and fail catastrophically in the exact scenarios where reliability matters most. Without systematic robustness testing across parameter perturbations and out-of-sample periods, you find out in production.",
    ],
    approach: [
      "**Co-design training and deployment as one vertical.** Instead of fine-tuning a model and separately prompting agents against it, I designed the SFT data to teach the exact schemas the agents emit, and the RLVR verifiers to check the exact conditions production enforces. The training stage and the deployment stage share one contract — so what the model learns to produce is what the agents are built to consume.",
      "**Reward what you can verify, not what humans prefer.** Quant finance has an unusually high density of checkable tasks — Greeks have correct values, put-call parity holds or it doesn't, portfolio weights sum to 1.0. That makes programmatic verification (RLVR) cheaper and more consistent than human-preference RLHF, and it keeps annotator fatigue and disagreement out of the reward signal.",
      "**Make the testing skills composable.** Four core testing primitives — parameter sensitivity, walk-forward optimization, stress testing, Monte Carlo — are consumed by every role-specific skill. A single signal-validation run silently invokes four validation layers; the quant sees one /100 score and one approve/conditional/reject decision.",
    ],
    architecture: {
      diagram: "/case-studies/quant-skills-architecture.svg",
      caption:
        "The full vertical: domain-adaptive pretraining through RLVR, with an evaluation gate between every training stage, deploying into a composable agent-skills layer. No checkpoint promotes without passing its gate; failures loop back with a specific fix.",
    },
    technicalHighlights: [
      {
        title: "Domain-adaptive pretraining (DAPT)",
        description:
          "Three-bucket data mix — market knowledge 50–60%, quant math 20–30%, finance coding 15–25% — with persona-driven synthetic data and 8-gram decontamination against eval benchmarks. An 80/20 domain-to-general blend with batch-level interleaving and a 1e-5 learning rate prevents catastrophic forgetting. Gate: domain perplexity ≥10% better, general ≤5% worse.",
      },
      {
        title: "SFT on canonical schemas",
        description:
          "40 gold examples across quantitative reasoning, structured extraction, and quant engineering, on a four-tier difficulty curriculum. Every example enforces stable key ordering, explicit nulls, canonical labels (`realized_volatility`, not `vol`), and fixed precision. Gate: schema validity ≥98%, exact match ≥85%.",
      },
      {
        title: "RLVR with programmatic verifiers",
        description:
          "Reinforcement learning against checkable rewards — symbolic math for Greeks, identity checks for put-call parity, constraint satisfaction for portfolio weights. Reward weights: numerical correctness 0.35, schema validity 0.25, reasoning consistency 0.20, formatting 0.20. Anti-gaming rules reject reward hacking and malformed JSON that slips past loose checks.",
      },
      {
        title: "Composable agent skills",
        description:
          "Four core testing primitives consumed by 11+ role-specific skills across 8 quant functions, wired through YAML dependency contracts. A single signal validation composes all four core skills sequentially into a /100 score: ≥80 approved for production, ≥60 conditional, <60 rejected.",
      },
    ],
    delivered: [
      "DAPT pipeline: ingestion, quality filtering, deduplication, controlled blending, training, and evaluation harness",
      "SFT datasets: 40 gold examples across reasoning and structured extraction, four-tier curriculum",
      "Annotation guidelines (8-check quality framework) and canonical schema governance",
      "RLVR design: programmatic verifiers, reward architecture, numerical tolerances, anti-gaming rules",
      "4 core testing skills + 11+ role-specific skills with YAML composability contracts",
      "12 cross-functional collaboration matrices across 8 quant roles",
      "Implementation roadmap (3-phase, 12-month) and per-skill success metrics",
    ],
    capabilities: [
      "Domain-adaptive LLM training (DAPT / SFT / RLVR)",
      "AI agent architecture",
      "Quantitative finance domain modeling",
      "Production ML systems design",
    ],
    stack: [
      "Claude API",
      "RLVR (PPO / DPO)",
      "Bayesian optimization / Gaussian-process surrogates",
      "YAML / Markdown (skills-as-code)",
      "Monte Carlo simulation",
      "vLLM / Ray / MLflow",
    ],
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
