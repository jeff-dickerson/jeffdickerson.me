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

export interface MetaItem {
  label: string;
  value: string;
  href?: string;
}

// Inline diagrams drawn as theme-aware React SVG (see CaseFigures.tsx).
export type FigureKey = "preflight-pipeline" | "preflight-layers" | "healthcare-agents";

export type SectionBlock =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; columns: string[]; rows: string[][] }
  | { type: "figure"; figure: FigureKey; caption?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "embed"; src: string; title: string; caption?: string }
  | { type: "chips"; items: string[] }
  | { type: "link"; label: string; href: string };

// Field-notes layout: each section carries a margin label naming what it
// evidences (real problem, full stack, production, outcome). Text and list
// items support the `**bold**` convention.
export interface CaseSection {
  label: string;
  note?: string;
  title?: string;
  blocks: SectionBlock[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  cardOutcome: string;
  date?: string;
  client?: string;
  industry: string;
  engagement: string;
  tags: string[];
  image: string;
  cover?: "documents" | "markets" | "contracts" | "crypto" | "pipeline" | "triage";
  meta?: MetaItem[];
  impact?: Metric[];
  sections?: CaseSection[];
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
    slug: "preflight",
    title: "Preflight",
    heroTitle: "Preflight",
    heroSubtitle:
      "Discovery notes go in. A traceable architecture and a proposal come out, and a person approves before anything is sent. The model proposes, code checks, people decide.",
    cardOutcome:
      "Discovery notes go in; a traceable architecture and a proposal come out, and a person approves before anything is sent. The model proposes, code checks, people decide.",
    industry: "Pre-sales automation",
    engagement: "Self-initiated build",
    tags: ["Sole builder", "Deterministic RAG", "Human-in-the-loop"],
    image: PLACEHOLDER_IMAGE,
    cover: "pipeline",
    meta: [
      { label: "Role", value: "Sole designer and builder" },
      { label: "Scope", value: "Specification, prototype, production build" },
      { label: "Stack", value: "Pydantic · PostgreSQL · Redis · Langfuse · SQL · LLM" },
      { label: "Live", value: "preflight.space-z.ai", href: "https://preflight.space-z.ai" },
    ],
    impact: [
      {
        value: "6",
        label: "Pipeline stages, from discovery to brand — Discover and Blueprint are the two built out in the prototype",
        status: "In production",
      },
      {
        value: "≥90%",
        label: "Retrieval quality threshold the evals gate on",
        status: "In production",
      },
      {
        value: "≥75%",
        label: "Answer quality threshold across document synthesis",
        status: "In production",
      },
      {
        value: "0",
        label: "Lines of diagram syntax written by the model",
        status: "In production",
      },
    ],
    sections: [
      {
        label: "Real problem",
        note: "Discover the real problem",
        title: "Two job descriptions described one workflow",
        blocks: [
          {
            type: "text",
            text: "I started by reading job descriptions the way a product team reads customer interviews. Two senior pre-sales roles kept asking for the same thing in different words. One wanted someone to \"leverage pre-sales automation AI tools to streamline technical proposals.\" The other wanted someone to \"translate business problems into technology solutions\" and carry them through the deal.",
          },
          {
            type: "text",
            text: "The technology lists differed. The job did not. A discovery call becomes requirements. Requirements become an architecture. The architecture becomes effort estimates, a staffing model, a deck and an SOW, and the whole package is handed to delivery. Every hand-off is a place where context can be lost.",
          },
          {
            type: "text",
            text: "So I did not build a chatbot for architects. I treated the pipeline as the product: its stages, its hand-offs, and a record of why each decision was made.",
          },
        ],
      },
      {
        label: "Spec first",
        note: "Build across the entire stack",
        title: "I asked for a specification, not a demo",
        blocks: [
          {
            type: "text",
            text: "I gave an AI assistant my core competencies and the job descriptions and asked which artifacts would show them. It suggested an agent demo. I asked for something else:",
          },
          {
            type: "quote",
            text: "Rather than you build it, create a specification, a detailed structured communication artifact of this build that clearly and unambiguously captures the intent, values and goals in an organized way. This should allow me to articulate the workflow of the agent and anything else regarding this endeavor like extensibility, components, apps, documentation, blogs, etc. Then create a very, very detailed checklist of one story point tasks that an AI coding agent can complete.",
            cite: "My prompt, early September",
          },
          {
            type: "text",
            text: "A demo hides its decisions inside code. A specification puts intent, values, workflow, extension points and components on paper, where they can be argued with before anything is built. The checklist of one-point tasks then let a coding agent build in small, checkable steps, with storybook states defined for every component.",
          },
        ],
      },
      {
        label: "Prototype",
        note: "Discover the real problem",
        title: "A six-stage prototype with three rules",
        blocks: [
          {
            type: "text",
            text: "The first build was a working prototype of the workflow. Notes from a call, a transcript or an RFP excerpt go into **Discover**, which extracts requirements, stakeholders and systems, and client dependencies, then interrogates the notes for gaps. **Blueprint** turns that into an integration architecture.",
          },
          {
            type: "figure",
            figure: "preflight-pipeline",
            caption:
              "The six stages in the prototype. Discover and Blueprint are built out. The short labels under each are the sub-steps the prototype shows.",
          },
          {
            type: "text",
            text: "Three rules sit on the Blueprint stage and they are printed on the screen itself:",
          },
          {
            type: "list",
            items: [
              "**Every selection traces back to a requirement.** Nothing appears in an architecture without a reason a reader can follow.",
              "**Every unresolved assumption becomes a question.** Gaps are surfaced to the person, not smoothed over.",
              "**The model never writes diagram syntax.** Diagrams are rendered and validated by code from a real pattern catalog.",
            ],
          },
          {
            type: "embed",
            src: "/demos/preflight.html",
            title: "Preflight prototype — recorded sample run",
            caption:
              "The prototype itself, on a recorded sample run: model responses were captured once and are replayed, while the checks and diagram rendering run live. Run Discover, then continue to Blueprint. Its footer says plainly that this is a starter catalog and not the production system.",
          },
        ],
      },
      {
        label: "Full stack",
        note: "Build across the entire stack",
        title: "The model proposes, deterministic code decides",
        blocks: [
          {
            type: "text",
            text: "The production build moved the same contract into a full stack. The design rule is that the model's job stays small and its output stays checkable. Anything that can be computed, validated, retrieved or rendered is handled by code. A person approves the steps where a mistake would be expensive.",
          },
          {
            type: "figure",
            figure: "preflight-layers",
            caption:
              "The contract between layers. The model's output is a proposal in a typed structure. Code accepts or rejects it. A person approves high-stakes steps. Tracing runs alongside all three.",
          },
          {
            type: "list",
            items: [
              "**Deterministic RAG.** Retrieval built for repeatable results, with hybrid search across the document set.",
              "**Orchestrator architecture.** One coordinating layer sequences the stages and owns the approval gates.",
              "**Approval-based automation.** The discovery-to-proposal process runs automatically up to the points where a person must sign off.",
              "**Typed contracts and storage.** Pydantic models define what each stage may produce. PostgreSQL holds the records.",
            ],
          },
          {
            type: "chips",
            items: ["Pydantic", "PostgreSQL", "Redis", "Langfuse", "SQL", "Hybrid search", "Orchestrator", "LLM"],
          },
        ],
      },
      {
        label: "Production",
        note: "Understand production AI requirements",
        title: "Evaluations, hard cost limits, full traceability",
        blocks: [
          {
            type: "text",
            text: "Pre-sales answers are read by buyers and they commit money, so the system is built to be tested and to be audited.",
          },
          {
            type: "table",
            columns: ["What is evaluated", "Threshold", "Why it matters in pre-sales"],
            rows: [
              ["Retrieval quality", "≥ 90%", "The right source has to be found before anything is written from it."],
              ["Answers across document synthesis", "≥ 75%", "Proposals combine several documents into one answer."],
              ["Conflicting sources", "tested separately", "Two documents will disagree. The system must say so."],
              ["Stale information", "tested separately", "An old price or scope statement should not reach a new proposal."],
            ],
          },
          {
            type: "list",
            items: [
              "**Hard cost constraints.** Rate limits and a ceiling on token output are enforced in the system, so cost per run has a known upper bound.",
              "**Full traceability.** Langfuse traces each step, so any answer can be followed back to the sources and calls that produced it.",
              "**Human-in-the-loop by design.** Approval gates sit on high-stakes workflow steps.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        note: "Connect systems to business outcomes",
        title: "What it is built to move",
        blocks: [
          {
            type: "text",
            text: "Preflight is a self-initiated build, so I report what it is engineered to change and not customer results. The business framing comes from the sales-enablement specification that sits beside it: a shorter cycle from inbound lead to engaged buyer, which lowers acquisition cost and improves return.",
          },
          {
            type: "table",
            columns: ["System measure", "Business measure it serves"],
            rows: [
              ["Retrieval and synthesis thresholds", "Fewer wrong or unsupported statements reaching a buyer"],
              ["Traced, approved steps", "Faster review by the people accountable for the proposal"],
              ["Token and rate caps", "Predictable cost per proposal"],
              ["Discovery-to-blueprint automation", "Shorter time from first call to first proposal"],
            ],
          },
        ],
      },
      {
        label: "Lessons",
        note: "What I would carry to the next build",
        blocks: [
          {
            type: "list",
            items: [
              "**Start from the job, not the model.** Reading the roles as customer interviews found the workflow before any code existed.",
              "**Write the spec first.** It cost one prompt and it removed most of the ambiguity a coding agent would otherwise have guessed at.",
              "**Keep the model's role small.** The fewer things the model is trusted to do unchecked, the fewer things there are to evaluate.",
              "**Treat approval as a feature.** In high-stakes workflows the gate is part of the product and buyers see it that way.",
              "**Label prototypes as prototypes.** The demo says what it is. Trust in the production system depends on that.",
            ],
          },
          { type: "link", label: "Open Preflight", href: "https://preflight.space-z.ai" },
        ],
      },
    ],
  },
  {
    slug: "community-college",
    title: "Community College Content Platform",
    heroTitle: "Community college content platform",
    heroSubtitle:
      "A 26-week content management replacement ran in 15 weeks by extending the existing process engine instead of ripping it out, with governance that put a person's signature on every migration phase.",
    cardOutcome:
      "A 26-week content management replacement ran in 15 — by extending the existing process engine instead of ripping it out, with a person's signature on every migration phase.",
    date: "2025",
    client: "A large multi-campus community college system, 23 locations",
    industry: "Higher Education",
    engagement: "AI Architecture and LLM Advisor",
    tags: ["AI Architect", "Enterprise ECM", "Regulated"],
    image: PLACEHOLDER_IMAGE,
    cover: "documents",
    meta: [
      { label: "Client", value: "A large multi-campus community college system, 23 locations" },
      { label: "Role", value: "AI Architecture and LLM Advisor, February to May 2025, as part of a delivery team" },
      {
        label: "Scope",
        value:
          "Five departments: student records, financial aid, veterans affairs, international programs, human resources",
      },
    ],
    impact: [
      { value: "42%", label: "Shorter timeline, 26 weeks to 15", status: "Delivered" },
      { value: "5", label: "Departments delivered in parallel", status: "Delivered" },
      {
        value: "11",
        label: "Evaluation and governance stages aligned to ISO/IEC 42001:2023",
        status: "Delivered",
      },
      { value: "0.85", label: "Confidence threshold for AI classification", status: "Delivered" },
    ],
    sections: [
      {
        label: "Real problem",
        note: "Discover the real problem",
        title: "The system to replace was holding up daily operations",
        blocks: [
          {
            type: "text",
            text: "The ask was a new enterprise content management platform, because the old one had reached end of useful life. The system touched enrollment, financial aid processing, payroll, compliance auditing and records retention, so the real requirement was a replacement that never interrupted those processes.",
          },
          {
            type: "text",
            text: "That changed the design. Instead of replacing the process engine, the AI layer extends PeopleSoft's: it manages the document lifecycle that accompanies each process. Departments also needed to change their own workflows without waiting on a vendor, so the workflow designer had to be usable by administrators.",
          },
        ],
      },
      {
        label: "Full stack",
        note: "Build across the entire stack",
        title: "Event-driven, so departments could move in parallel",
        blocks: [
          {
            type: "list",
            items: [
              "**Workflow designer.** A visual, no-code and low-code tool for departmental administrators to create and change workflows.",
              "**Automation agent.** A backend agent with triggers, notifications and human-in-the-loop validation for each department workflow.",
              "**Integration.** PeopleSoft Integration Broker and attachment-table extraction, exposed through OpenAPI 3.0 and secured with OAuth 2.0.",
              "**Platform.** Python and LangGraph on Kubernetes, with Kafka carrying events between services.",
            ],
          },
          {
            type: "chips",
            items: [
              "Python",
              "LangGraph",
              "PeopleSoft Integration Broker",
              "Kubernetes",
              "OAuth 2.0",
              "OpenAPI 3.0",
              "Kafka",
            ],
          },
          {
            type: "text",
            text: "The event-driven design is what allowed five departments to be delivered in parallel, and scoping ran across schema, process, data, taxonomy, devices, curriculum architecture and regulation.",
          },
        ],
      },
      {
        label: "Production",
        note: "Understand production AI requirements",
        title: "An 11-stage evaluation and governance process",
        blocks: [
          {
            type: "list",
            items: [
              "**Standards.** Evaluation and governance mapped to ISO/IEC 42001:2023 requirements.",
              "**Classification.** A 4-tier AI classification taxonomy enforced with NLP and PII detection at a 0.85 confidence threshold.",
              "**Regression testing.** Changes are checked against known behavior before release.",
              "**Identity.** Protocol-agnostic identity, so departments are not tied to one sign-in method.",
              "**Human sign-off.** A phase-gated migration with mandatory human approval for each department.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        note: "Connect systems to business outcomes",
        title: "Shorter timeline, no disruption, departments in control",
        blocks: [
          {
            type: "table",
            columns: ["System decision", "Business result"],
            rows: [
              ["Event-driven parallel delivery", "26 → 15 weeks (42%)"],
              ["Extend the process engine", "Operations continued through the transition across 23 locations"],
              ["No-code workflow designer", "Departments change workflows without vendor intervention"],
              ["Phase gates with human sign-off", "Every department approved its own migration"],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "healthcare-intake",
    title: "Healthcare Intake and Triage",
    heroTitle: "Healthcare intake and triage",
    heroSubtitle:
      "A four-agent voice workflow cut handling time per intake from 30 minutes to 5, and was built so that a person takes over whenever the system is unsure.",
    cardOutcome:
      "A four-agent voice workflow cut handling time per intake from 30 minutes to 5 — built so a person takes over whenever the system is unsure.",
    client: "A healthcare foundation",
    industry: "Healthcare",
    engagement: "Architect and builder",
    tags: ["AI Architect", "Multi-agent voice", "HIPAA"],
    image: PLACEHOLDER_IMAGE,
    cover: "triage",
    meta: [
      { label: "Client", value: "A healthcare foundation" },
      { label: "Role", value: "Architect and builder" },
      { label: "Stack", value: "LangGraph · llama.cpp with Qwen 3 · LangSmith · FastAPI · private cloud" },
    ],
    impact: [
      { value: "83%", label: "Less handling time, 30 minutes to 5", status: "Delivered" },
      { value: "$250 → $42", label: "Daily labor cost on the workflow", status: "Delivered" },
      { value: "80+ hrs", label: "Of operational capacity released", status: "Delivered" },
      { value: "≥90%", label: "Reliability on human escalation rules", status: "Delivered" },
    ],
    sections: [
      {
        label: "Real problem",
        note: "Discover the real problem",
        title: "The discovery that shaped the build",
        blocks: [
          {
            type: "text",
            text: "The measurable unit of work was a single intake-to-triage interaction. It took 30 minutes of staff time and accounted for $250 a day in labor on the workflow. Automating the conversation was the obvious request. The design question was which parts of it a person must keep.",
          },
        ],
      },
      {
        label: "Full stack",
        note: "Build across the entire stack",
        title: "Four agents, one supervisor",
        blocks: [
          {
            type: "figure",
            figure: "healthcare-agents",
            caption:
              "Intake collects the information by voice. Verification checks it. Output produces the structured record. The Supervisor routes between them and decides when to escalate.",
          },
          {
            type: "list",
            items: [
              "**Orchestration.** A four-agent LangGraph graph with voice.",
              "**Model.** Open-weight Qwen 3 served with llama.cpp, deployed to a private cloud.",
              "**Service.** A FastAPI application built to production quality.",
            ],
          },
          {
            type: "chips",
            items: ["LangGraph", "llama.cpp", "Qwen 3", "LangSmith", "FastAPI", "Voice", "Private cloud"],
          },
        ],
      },
      {
        label: "Production",
        note: "Understand production AI requirements",
        title: "Escalation rules, observability and HIPAA safeguards",
        blocks: [
          {
            type: "list",
            items: [
              "**Human escalation.** Explicit rules hand a case to a person, and they hold at 90% reliability or better.",
              "**Observability.** LangSmith traces each agent step.",
              "**Privacy.** HIPAA safeguards for healthcare workflows, with the system deployed to a private cloud.",
              "**Regression testing.** A playground for replaying cases, so changes can scale across clinical operations without breaking what works.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        note: "Connect systems to business outcomes",
        title: "From minutes per case to hours per day",
        blocks: [
          {
            type: "table",
            columns: ["System measure", "Before", "After"],
            rows: [
              ["Handling time per intake", "30 min", "5 min (−83%)"],
              ["Daily labor cost", "$250", "$42"],
              ["Operational capacity", "Consumed by intake", "80+ hours released"],
            ],
          },
        ],
      },
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
    cover: "contracts",
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
    cover: "crypto",
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
    cover: "markets",
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
