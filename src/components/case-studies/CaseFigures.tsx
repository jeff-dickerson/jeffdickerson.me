// Inline, theme-aware diagrams for case-study sections. Everything is drawn
// with design tokens (fill-card, stroke-border, stroke-primary…) so the
// figures flip with the theme — an <img> SVG can't see the site's tokens.

import type { FigureKey } from "@/data/caseStudies";

const box = "fill-muted stroke-border";
const boxHl = "fill-muted stroke-primary";
const line = "stroke-foreground fill-none";
const label = "fill-foreground text-[13px] font-medium";
const small = "fill-muted-foreground text-[12px]";
const heading = "fill-foreground text-[18px] font-semibold";

const Arrow = ({ id }: { id: string }) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" className="fill-foreground" />
    </marker>
  </defs>
);

const PIPELINE_STAGES = ["Discover", "Blueprint", "Propose", "Respond", "Prove", "Brand"];
const PIPELINE_STEPS: string[][] = [
  ["Requirements", "Stakeholders, systems", "Client dependencies", "Gaps, as questions"],
  ["Catalog patterns", "Traced to a need", "Open assumptions", "Rendered, validated"],
  ["Proposal"],
  ["RFP / RFI response"],
];

const PreflightPipeline = () => (
  <svg
    viewBox="0 0 900 180"
    role="img"
    aria-label="Preflight's six stages: Discover, Blueprint, Propose, Respond, Prove, Brand, with the sub-steps of Discover and Blueprint listed beneath."
    className="block h-auto w-full min-w-[720px]"
  >
    <Arrow id="fig-pipeline-arrow" />
    {PIPELINE_STAGES.map((stage, i) => {
      const x = 10 + i * 150;
      return (
        <g key={stage}>
          <rect x={x} y="14" width="130" height="50" rx="8" strokeWidth={i < 2 ? 1.8 : 1.2} className={i < 2 ? boxHl : box} />
          <text x={x + 65} y="44" textAnchor="middle" className={label}>
            {stage}
          </text>
          {i < PIPELINE_STAGES.length - 1 && (
            <line x1={x + 130} y1="39" x2={x + 148} y2="39" strokeWidth="1.4" className={line} markerEnd="url(#fig-pipeline-arrow)" />
          )}
          {PIPELINE_STEPS[i]?.map((step, j) => (
            <text key={step} x={x} y={98 + j * 20} className={small}>
              {step}
            </text>
          ))}
        </g>
      );
    })}
  </svg>
);

const LAYERS = [
  {
    title: "The model proposes",
    detail: "Extracts requirements · selects patterns from the catalog · drafts answers",
    out: "structured proposal",
  },
  {
    title: "Deterministic code checks",
    detail: "Pydantic schemas · hybrid retrieval · diagram rendering and validation · rate and token caps",
    out: "checked result",
  },
  {
    title: "A person approves",
    detail: "Approval gate on high-stakes steps before anything leaves the system",
  },
];

const PreflightLayers = () => (
  <svg
    viewBox="0 0 900 340"
    role="img"
    aria-label="Three layers: the model proposes, deterministic code checks, and a person approves. A trace layer records every step."
    className="block h-auto w-full min-w-[720px]"
  >
    <Arrow id="fig-layers-arrow" />
    {LAYERS.map((layer, i) => {
      const y = 10 + i * 118;
      return (
        <g key={layer.title}>
          <rect x="10" y={y} width="690" height="82" rx="8" strokeWidth={i === 1 ? 1.8 : 1.2} className={i === 1 ? boxHl : box} />
          <text x="28" y={y + 34} className={heading}>
            {layer.title}
          </text>
          <text x="28" y={y + 58} className={small}>
            {layer.detail}
          </text>
          {layer.out && (
            <>
              <line x1="355" y1={y + 82} x2="355" y2={y + 116} strokeWidth="1.4" className={line} markerEnd="url(#fig-layers-arrow)" />
              <text x="368" y={y + 104} className={small}>
                {layer.out}
              </text>
            </>
          )}
          <line x1="700" y1={y + 41} x2="740" y2={y + 41} strokeWidth="1.4" strokeDasharray="5 4" className="stroke-muted-foreground" />
        </g>
      );
    })}
    <rect x="740" y="10" width="150" height="318" rx="8" strokeWidth="1.2" strokeDasharray="5 4" className={box} />
    <text x="815" y="44" textAnchor="middle" className={heading}>
      Trace
    </text>
    <text x="815" y="70" textAnchor="middle" className={small}>
      Langfuse records
    </text>
    <text x="815" y="88" textAnchor="middle" className={small}>
      every step
    </text>
  </svg>
);

const AGENTS = [
  { name: "Intake", x: 20, from: 300, to: 150 },
  { name: "Verification", x: 260, from: 360, to: 360 },
  { name: "Output", x: 500, from: 420, to: 570 },
];

const HealthcareAgents = () => (
  <svg
    viewBox="0 0 720 220"
    role="img"
    aria-label="Four-agent architecture: a Supervisor agent coordinates Intake, Verification and Output agents, with voice in and structured output out."
    className="block h-auto w-full min-w-[640px]"
  >
    <Arrow id="fig-agents-arrow" />
    <rect x="250" y="10" width="220" height="50" rx="8" strokeWidth="1.8" className={boxHl} />
    <text x="360" y="40" textAnchor="middle" className={label}>
      Supervisor
    </text>
    {AGENTS.map((agent) => (
      <g key={agent.name}>
        <rect x={agent.x} y="130" width="200" height="50" rx="8" strokeWidth="1.2" className={box} />
        <text x={agent.x + 100} y="160" textAnchor="middle" className={label}>
          {agent.name}
        </text>
        <line x1={agent.from} y1="60" x2={agent.to} y2="128" strokeWidth="1.4" className={line} markerEnd="url(#fig-agents-arrow)" />
      </g>
    ))}
    <text x="20" y="208" className={small}>
      voice in
    </text>
    <text x="700" y="208" textAnchor="end" className={small}>
      structured output, or escalation to a person
    </text>
  </svg>
);

const FIGURES: Record<FigureKey, () => JSX.Element> = {
  "preflight-pipeline": PreflightPipeline,
  "preflight-layers": PreflightLayers,
  "healthcare-agents": HealthcareAgents,
};

export const CaseFigure = ({ figure }: { figure: FigureKey }) => {
  const Figure = FIGURES[figure];
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4 md:p-6">
      <Figure />
    </div>
  );
};
