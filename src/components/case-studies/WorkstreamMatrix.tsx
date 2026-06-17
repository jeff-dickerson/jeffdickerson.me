interface Workstream {
  name: string;
  agent: string | null;
  tiers: [boolean, boolean, boolean, boolean, boolean];
  weeks: string;
  color: string;
}

const TIERS = ["Users", "Security", "App services", "Data layer", "Integrations"];

const WORKSTREAMS: Workstream[] = [
  { name: "Discovery", agent: "Schema archaeologist", tiers: [false, false, true, true, true], weeks: "W1–2", color: "#EF9F27" },
  { name: "Platform config", agent: "Process cartographer", tiers: [false, false, true, true, false], weeks: "W2–5", color: "#378ADD" },
  { name: "Data migration", agent: "Data shepherd", tiers: [false, false, true, true, true], weeks: "W3–11", color: "#E24B4A" },
  { name: "Classification", agent: "Taxonomy enforcer", tiers: [false, true, true, true, false], weeks: "W3–15", color: "#1D9E75" },
  { name: "Scanner deploy", agent: "Device wrangler", tiers: [true, false, false, false, true], weeks: "W3–6", color: "#378ADD" },
  { name: "Student portal", agent: null, tiers: [true, true, true, false, false], weeks: "W5–10", color: "#378ADD" },
  { name: "Integrations", agent: null, tiers: [false, true, true, false, true], weeks: "W1–10", color: "#7F77DD" },
  { name: "Training", agent: "Curriculum architect", tiers: [true, false, true, false, false], weeks: "W8–14", color: "#639922" },
  { name: "Compliance", agent: "Regulation sentinel", tiers: [false, true, true, true, false], weeks: "W11–15", color: "#7F77DD" },
  { name: "UAT + go-live", agent: null, tiers: [true, true, true, true, true], weeks: "W11–15", color: "#639922" },
];

const LEGEND = [
  { color: "#EF9F27", label: "AI agent driven" },
  { color: "#378ADD", label: "Platform / infra" },
  { color: "#E24B4A", label: "Migration" },
  { color: "#1D9E75", label: "Classification" },
  { color: "#7F77DD", label: "Integration / compliance" },
  { color: "#639922", label: "Training / UAT" },
];

export const WorkstreamMatrix = () => {
  const concurrency = TIERS.map((_, tierIdx) =>
    WORKSTREAMS.reduce((count, ws) => count + (ws.tiers[tierIdx] ? 1 : 0), 0)
  );
  const maxConcurrency = Math.max(...concurrency);

  return (
    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Header row */}
          <div className="grid grid-cols-[160px_repeat(5,1fr)_80px] gap-x-2 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
              Workstream
            </div>
            {TIERS.map((tier) => (
              <div
                key={tier}
                className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium text-center"
              >
                {tier}
              </div>
            ))}
            <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium text-right">
              Weeks
            </div>
          </div>

          {/* Workstream rows */}
          {WORKSTREAMS.map((ws) => (
            <div
              key={ws.name}
              className="grid grid-cols-[160px_repeat(5,1fr)_80px] gap-x-2 items-center py-2.5 border-b border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-2 pr-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: ws.color }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {ws.name}
                  </div>
                  {ws.agent && (
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {ws.agent}
                    </div>
                  )}
                </div>
              </div>
              {ws.tiers.map((active, i) => (
                <div key={i} className="flex items-center justify-center h-8">
                  {active ? (
                    <div
                      className="w-full h-6 rounded-md flex items-center justify-center"
                      style={{ background: `${ws.color}25`, borderLeft: `2px solid ${ws.color}` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: ws.color }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700/50" />
                  )}
                </div>
              ))}
              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono text-right">
                {ws.weeks}
              </div>
            </div>
          ))}

          {/* Concurrency row */}
          <div className="grid grid-cols-[160px_repeat(5,1fr)_80px] gap-x-2 items-center pt-4 mt-2 border-t-2 border-gray-300 dark:border-gray-600">
            <div className="text-[11px] uppercase tracking-wider text-gray-700 dark:text-gray-300 font-semibold text-right pr-2">
              Peak concurrency
            </div>
            {concurrency.map((c, i) => {
              const intensity = c / maxConcurrency;
              const colorClass =
                c >= 7
                  ? "text-red-600 dark:text-red-400"
                  : c >= 5
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-sky-600 dark:text-sky-400";
              return (
                <div
                  key={i}
                  className={`text-center text-2xl font-bold tabular-nums ${colorClass}`}
                  style={{ opacity: 0.5 + 0.5 * intensity }}
                >
                  {c}
                </div>
              );
            })}
            <div />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        {LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
