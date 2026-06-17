// Mirrors the actual skills config: a `core` node of shared foundational skills,
// plus 8 role nodes. The source config expands the Researcher role as the worked
// example (4 skills); the other 7 roles follow the same composition pattern.

const ROLES = [
  "Researcher",
  "Trader",
  "Developer",
  "Risk",
  "Derivatives",
  "Execution",
  "Portfolio",
  "Validation",
];

const ACTIVE_ROLE = "Researcher";

// Researcher's role-specific skills (the one role expanded in the source config).
const RESEARCHER_SKILLS = [
  { id: "signal-generation", note: null },
  { id: "backtest-framework", note: null },
  { id: "feature-engineering", note: null },
  { id: "signal-validation", note: "composes all 4 testing primitives" },
];

// The 6 core shared foundational skills. The first 4 are the testing primitives
// the architecture leans on; the last 2 round out the shared layer.
const CORE = [
  { id: "parameter-sensitivity", color: "#EF9F27", testing: true },
  { id: "walk-forward-optimization", color: "#378ADD", testing: true },
  { id: "stress-testing", color: "#E24B4A", testing: true },
  { id: "monte-carlo-simulation", color: "#1D9E75", testing: true },
  { id: "data-validation", color: "#9ca3af", testing: false },
  { id: "performance-metrics", color: "#9ca3af", testing: false },
];

export const QuantSkillsHierarchy = () => {
  return (
    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      {/* Role layer — 8 roles, Researcher active */}
      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 font-semibold mb-3">
        8 quant roles
      </p>
      <div className="flex flex-wrap gap-2">
        {ROLES.map((role) => {
          const active = role === ACTIVE_ROLE;
          return (
            <span
              key={role}
              className={
                active
                  ? "px-3 py-1.5 text-sm font-medium rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "px-3 py-1.5 text-sm rounded-full bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
              }
            >
              {role}
            </span>
          );
        })}
      </div>

      {/* Researcher worked example */}
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4 mb-3 leading-relaxed">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Researcher</span>, shown in full
        — the other seven roles follow the same composition pattern.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {RESEARCHER_SKILLS.map((s) => (
          <div
            key={s.id}
            className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col gap-1.5"
          >
            <span className="text-[13px] font-mono text-gray-900 dark:text-white break-words">
              {s.id}
            </span>
            {s.note && (
              <span className="text-[10px] text-sky-600 dark:text-sky-400 leading-snug">
                {s.note}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Connector */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 font-medium">
          every role composes from
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Core foundational layer — 6 skills */}
      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 font-semibold mb-3">
        Core shared foundational skills · 6
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CORE.map((c) => (
          <div
            key={c.id}
            className="p-3 rounded-xl border flex items-center gap-2.5"
            style={{
              background: c.testing ? `${c.color}14` : undefined,
              borderColor: c.testing ? `${c.color}40` : undefined,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: c.color }}
            />
            <span className="text-[13px] font-mono text-gray-900 dark:text-white break-words">
              {c.id}
            </span>
            {c.testing && (
              <span className="ml-auto text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 flex-shrink-0">
                testing
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
