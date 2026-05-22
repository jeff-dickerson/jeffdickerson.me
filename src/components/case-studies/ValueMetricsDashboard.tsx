interface MetricCard {
  label: string;
  value: string;
  delta: string;
  deltaTone?: "positive" | "negative" | "neutral";
}

interface FinancialBar {
  label: string;
  range: string;
  width: number;
  tone: "success" | "info" | "warning";
}

interface TimelineRow {
  marker: string;
  label: string;
  body: string;
  tone: "success" | "info" | "warning" | "neutral";
}

const OPERATIONAL: MetricCard[] = [
  { label: "Document retrieval", value: "<5s", delta: "from 2–15 min manual search" },
  { label: "Workflow cycle time", value: "-65%", delta: "Automated routing + alerts" },
  { label: "Manual scanning labor", value: "-40%", delta: "Student self-upload + OCR" },
  { label: "Processing backlog", value: "-70%", delta: "Parallel workflow execution" },
];

const COMPLIANCE: MetricCard[] = [
  { label: "Audit response time", value: "<1 hr", delta: "from 2–5 business days" },
  { label: "FERPA violation risk", value: "-90%", delta: "Auto-classification + RBAC" },
  { label: "Retention compliance", value: "100%", delta: "Automated policy enforcement" },
  { label: "Unclassified documents", value: "0%", delta: "from ~100% (no prior policy)", deltaTone: "negative" },
];

const FINANCIAL: FinancialBar[] = [
  { label: "Staff time savings", range: "$1.2M–1.8M", width: 85, tone: "success" },
  { label: "Compliance penalty avoidance", range: "$500K–2M", width: 60, tone: "info" },
  { label: "Paper / storage reduction", range: "$200K–400K", width: 30, tone: "warning" },
  { label: "Reduced re-work", range: "$300K–600K", width: 45, tone: "success" },
];

const EXPERIENCE: MetricCard[] = [
  { label: "Student satisfaction", value: "+35%", delta: "Self-service eliminates office visits" },
  { label: "Staff adoption target", value: ">80%", delta: "Within 90 days post-training" },
  { label: "System uptime SLA", value: "99.9%", delta: "24/7 with DR tested annually" },
  { label: "Mobile accessibility", value: "100%", delta: "WCAG 2.1 AA + responsive" },
];

const TIMELINE: TimelineRow[] = [
  { marker: "T+30 days", label: "Baseline", body: "All metrics captured. System health, adoption rates, initial workflow timing.", tone: "success" },
  { marker: "T+90 days", label: "First delta report", body: "Compare retrieval times, backlog depth, compliance posture.", tone: "info" },
  { marker: "T+180 days", label: "Full ROI assessment", body: "Staff time savings quantified. Student satisfaction surveyed.", tone: "warning" },
  { marker: "Annual", label: "TCO review", body: "Aligned with contract renewal cycle. DR test. Compliance re-certification.", tone: "neutral" },
];

const barTone: Record<FinancialBar["tone"], string> = {
  success: "bg-emerald-500/80 text-white",
  info: "bg-sky-500/80 text-white",
  warning: "bg-amber-500/80 text-white",
};

const timelineDot: Record<TimelineRow["tone"], string> = {
  success: "bg-emerald-500",
  info: "bg-sky-500",
  warning: "bg-amber-500",
  neutral: "bg-gray-400 dark:bg-gray-500",
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 font-semibold mb-3 mt-8 first:mt-0">
    {children}
  </p>
);

const MetricGrid = ({ items }: { items: MetricCard[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {items.map((m) => (
      <div
        key={m.label}
        className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1.5">
          {m.label}
        </p>
        <p className="text-2xl md:text-[26px] font-bold text-gray-900 dark:text-white leading-none">
          {m.value}
        </p>
        <p
          className={`text-[11px] mt-2 leading-snug ${
            m.deltaTone === "negative"
              ? "text-rose-600 dark:text-rose-400"
              : "text-emerald-700 dark:text-emerald-400"
          }`}
        >
          {m.delta}
        </p>
      </div>
    ))}
  </div>
);

export const ValueMetricsDashboard = () => {
  return (
    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      <SectionLabel>Operational efficiency</SectionLabel>
      <MetricGrid items={OPERATIONAL} />

      <SectionLabel>Compliance & risk</SectionLabel>
      <MetricGrid items={COMPLIANCE} />

      <SectionLabel>Financial impact (projected, 5-year)</SectionLabel>
      <div className="space-y-3 md:space-y-2.5">
        {FINANCIAL.map((bar) => (
          <div key={bar.label} className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
            <span className="md:w-44 md:flex-shrink-0 text-xs text-gray-600 dark:text-gray-400 font-medium">
              {bar.label}
            </span>
            <div className="flex-1 h-7 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden relative">
              <div
                className={`h-full rounded-md flex items-center justify-end pr-2.5 text-[11px] font-semibold whitespace-nowrap ${barTone[bar.tone]}`}
                style={{ width: `${bar.width}%` }}
              >
                {bar.range}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>User experience</SectionLabel>
      <MetricGrid items={EXPERIENCE} />

      <SectionLabel>Measurement framework</SectionLabel>
      <div className="space-y-2.5">
        {TIMELINE.map((row) => (
          <div key={row.marker} className="flex items-start gap-3 text-sm leading-relaxed">
            <span
              className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${timelineDot[row.tone]}`}
            />
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {row.marker}
              </span>
              <span className="text-gray-500 dark:text-gray-400"> — {row.label}.</span>
              <span className="text-gray-600 dark:text-gray-300"> {row.body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
