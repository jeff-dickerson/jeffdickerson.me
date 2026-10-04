// On-brand, theme-aware cover illustrations for case-study cards.
// Line art inherits `currentColor` (set neutral on the wrapper) and the blue
// accent via `hsl(var(--primary))`, so both adapt to light/dark automatically.

export type CoverVariant =
  | "documents"
  | "markets"
  | "contracts"
  | "crypto"
  | "pipeline"
  | "triage"
  | "default";

const ACCENT = "hsl(var(--primary))";

const frameClass =
  "aspect-[16/9] w-full rounded-lg overflow-hidden border border-border bg-background " +
  "text-muted-foreground/60";

/* ---- Community college: legacy documents → parallel lanes → structured tiers ---- */
const DocumentsCover = () => (
  <>
    {/* messy legacy docs, left */}
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <rect x="26" y="52" width="42" height="54" rx="4" transform="rotate(-8 47 79)" />
      <rect x="34" y="62" width="42" height="54" rx="4" transform="rotate(4 55 89)" />
      <line x1="42" y1="78" x2="66" y2="78" transform="rotate(4 55 89)" />
      <line x1="42" y1="90" x2="66" y2="90" transform="rotate(4 55 89)" />
    </g>
    {/* parallel flow lanes, accent */}
    <g stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" fill="none">
      <path d="M112 68 H196" markerEnd="url(#doc-arrow)" />
      <path d="M112 90 H196" markerEnd="url(#doc-arrow)" />
      <path d="M112 112 H196" markerEnd="url(#doc-arrow)" />
    </g>
    {/* structured grid, right */}
    <g strokeWidth="2" fill="none">
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => {
          const on = r === 0 && c === 1;
          return (
            <rect
              key={`${r}-${c}`}
              x={214 + c * 42}
              y={54 + r * 24}
              width="34"
              height="18"
              rx="3"
              stroke={on ? ACCENT : "currentColor"}
              fill={on ? ACCENT : "none"}
              fillOpacity={on ? 0.16 : 0}
            />
          );
        })
      )}
    </g>
  </>
);

/* ---- Quant: markets chart + training pipeline nodes ---- */
const MarketsCover = () => (
  <>
    {/* area chart */}
    <path
      d="M28 120 L60 96 L92 104 L124 72 L156 84 L188 52 L220 64 L252 40"
      fill="none"
      stroke={ACCENT}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 120 L60 96 L92 104 L124 72 L156 84 L188 52 L220 64 L252 40 L252 130 L28 130 Z"
      fill={ACCENT}
      fillOpacity="0.08"
      stroke="none"
    />
    {/* candlesticks */}
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="76" y1="86" x2="76" y2="118" />
      <line x1="140" y1="66" x2="140" y2="98" />
      <line x1="204" y1="52" x2="204" y2="86" />
    </g>
    {/* pipeline nodes */}
    <g>
      <line x1="40" y1="150" x2="256" y2="150" stroke="currentColor" strokeWidth="2" />
      {[40, 112, 184, 256].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="150"
          r="6"
          stroke={i === 3 ? ACCENT : "currentColor"}
          strokeWidth="2"
          fill={i === 3 ? ACCENT : "none"}
          fillOpacity={i === 3 ? 0.18 : 0}
        />
      ))}
    </g>
  </>
);

/* ---- Kontrak IQ: contract page + AI field extraction ---- */
const ContractsCover = () => (
  <>
    {/* contract page */}
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <rect x="40" y="34" width="116" height="112" rx="6" />
      <line x1="56" y1="56" x2="140" y2="56" />
      <line x1="56" y1="72" x2="140" y2="72" />
      <line x1="56" y1="88" x2="120" y2="88" />
      <line x1="56" y1="104" x2="140" y2="104" />
      {/* signature */}
      <path d="M56 128 q10 -12 20 0 t20 0" strokeLinecap="round" />
    </g>
    {/* extracted structured fields, accent */}
    <g>
      {[64, 92, 120].map((y, i) => (
        <g key={y}>
          <path
            d={`M156 ${72 + i * 0} C186 ${72}, 190 ${y}, 214 ${y}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <rect
            x="214"
            y={y - 10}
            width="66"
            height="20"
            rx="4"
            stroke={ACCENT}
            strokeWidth="2"
            fill={ACCENT}
            fillOpacity={i === 0 ? 0.16 : 0.06}
          />
        </g>
      ))}
    </g>
  </>
);

/* ---- Crypto: candlesticks + token + NL-to-trade ---- */
const CryptoCover = () => (
  <>
    {/* trend line */}
    <path
      d="M28 128 L72 108 L116 116 L160 80 L204 92 L252 56"
      fill="none"
      stroke={ACCENT}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* candlesticks */}
    <g strokeWidth="2" strokeLinecap="round">
      <g stroke="currentColor">
        <line x1="72" y1="96" x2="72" y2="124" />
        <rect x="66" y="102" width="12" height="16" rx="2" fill="none" />
      </g>
      <g stroke="currentColor">
        <line x1="160" y1="70" x2="160" y2="98" />
        <rect x="154" y="76" width="12" height="16" rx="2" fill="none" />
      </g>
    </g>
    {/* token hexagon, accent */}
    <g transform="translate(232 118)">
      <path
        d="M0 -20 L17 -10 L17 10 L0 20 L-17 10 L-17 -10 Z"
        fill={ACCENT}
        fillOpacity="0.14"
        stroke={ACCENT}
        strokeWidth="2"
      />
    </g>
    {/* command line */}
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M34 150 l8 6 l-8 6" fill="none" />
      <line x1="50" y1="156" x2="150" y2="156" />
    </g>
  </>
);

/* ---- Preflight: six pipeline stages with an approval gate ---- */
const PipelineCover = () => (
  <>
    <g strokeWidth="2" fill="none">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={26 + i * 46}
          y="62"
          width="36"
          height="26"
          rx="4"
          stroke={i < 2 ? ACCENT : "currentColor"}
          fill={i < 2 ? ACCENT : "none"}
          fillOpacity={i < 2 ? 0.14 : 0}
        />
      ))}
      <path d="M62 75 H72 M108 75 H118 M154 75 H164 M200 75 H210 M246 75 H256" stroke="currentColor" />
    </g>
    {/* trace line + approval check */}
    <path d="M44 88 V124 H236" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
    <circle cx="258" cy="124" r="16" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
    <path d="M250 124 l6 6 l10 -12" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

/* ---- Healthcare intake: voice in → supervisor + three agents ---- */
const TriageCover = () => (
  <>
    {/* voice waveform */}
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      {[18, 34, 22, 44, 28, 14].map((h, i) => (
        <line key={i} x1={34 + i * 10} y1={90 - h / 2} x2={34 + i * 10} y2={90 + h / 2} />
      ))}
    </g>
    <path d="M100 90 H132" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
    {/* supervisor */}
    <rect x="160" y="34" width="84" height="30" rx="6" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
    {/* agents */}
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <path d="M186 64 L160 112 M202 64 V112 M218 64 L244 112" />
      <rect x="136" y="112" width="40" height="28" rx="5" />
      <rect x="182" y="112" width="40" height="28" rx="5" />
      <rect x="228" y="112" width="40" height="28" rx="5" />
    </g>
  </>
);

const DefaultCover = () => (
  <g stroke="currentColor" strokeWidth="2" fill="none">
    <circle cx="160" cy="90" r="40" />
    <path d="M120 90 H200 M160 50 V130" stroke={ACCENT} />
  </g>
);

const VARIANTS: Record<CoverVariant, () => JSX.Element> = {
  documents: DocumentsCover,
  markets: MarketsCover,
  contracts: ContractsCover,
  crypto: CryptoCover,
  pipeline: PipelineCover,
  triage: TriageCover,
  default: DefaultCover,
};

export const CaseStudyCover = ({ variant = "default" }: { variant?: CoverVariant }) => {
  const Motif = VARIANTS[variant] ?? DefaultCover;
  const dotsId = `cover-dots-${variant}`;
  return (
    <div className={frameClass}>
      <svg viewBox="0 0 320 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <pattern id={dotsId} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="currentColor" opacity="0.18" />
          </pattern>
          <marker id="doc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M1 1 L8 5 L1 9" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect width="320" height="180" fill={`url(#${dotsId})`} />
        <Motif />
      </svg>
    </div>
  );
};
