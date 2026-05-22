import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WorkstreamMatrix } from "@/components/case-studies/WorkstreamMatrix";
import { ValueMetricsDashboard } from "@/components/case-studies/ValueMetricsDashboard";
import { QuantSkillsHierarchy } from "@/components/case-studies/QuantSkillsHierarchy";
import { getCaseStudy, type MetricStatus } from "@/data/caseStudies";

const CONTACT_EMAIL = "jeffery.dickerson@protonmail.com";

// Every section content block uses this width so headings align to a single left edge.
const SECTION_WIDTH = "max-w-5xl mx-auto";
// Prose blocks inside the wider section constrain themselves for readability.
const PROSE_WIDTH = "max-w-3xl";

const statusStyles: Record<MetricStatus, string> = {
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  "In production": "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-900",
  Modeled: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  Projected: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
};

const renderWithBold = (text: string) => {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-gray-900 dark:text-white">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-8">
    <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2">
      {eyebrow}
    </p>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
  </div>
);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const hasFullContent = Boolean(study.impact && study.challenge && study.approach);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main className="pt-32 pb-20">
        {/* Back link */}
        <div className="container mx-auto px-6 mb-10">
          <div className={SECTION_WIDTH}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary no-underline hover:no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              All case studies
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className={SECTION_WIDTH}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-6 animate-fade-up">
              <span>{study.date}</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>{study.industry}</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>{study.engagement}</span>
            </div>
            <h1 className={`${PROSE_WIDTH} text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900 dark:text-white mb-6 animate-fade-up`} style={{ animationDelay: "0.1s" }}>
              {study.heroTitle}
            </h1>
            <p className={`${PROSE_WIDTH} text-xl text-gray-600 dark:text-gray-300 mb-6 animate-fade-up`} style={{ animationDelay: "0.2s" }}>
              {study.heroSubtitle}
            </p>
            {study.client && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Client · </span>
                {study.client}
              </p>
            )}
          </div>
        </section>

        {/* Impact at a glance */}
        {study.impact && study.impact.length > 0 && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="Impact at a glance" title="What this engagement moved" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {study.impact.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-col gap-3"
                  >
                    <span className={`inline-flex items-center self-start px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${statusStyles[metric.status]}`}>
                      {metric.status}
                    </span>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                      {metric.value}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenge */}
        {study.challenge && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="The challenge" title="What made this hard" />
              <div className={`${PROSE_WIDTH} space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
                {study.challenge.map((p, i) => (
                  <p key={i}>{renderWithBold(p)}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Approach */}
        {study.approach && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="The approach" title="The decisions that shaped the architecture" />
              <div className={`${PROSE_WIDTH} space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
                {study.approach.map((p, i) => (
                  <p key={i}>{renderWithBold(p)}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Workstream parallelism (LSC-only) */}
        {study.slug === "lsc-ecm" && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading
                eyebrow="Parallelism"
                title="Where the agents sit on the critical path"
              />
              <p className={`${PROSE_WIDTH} text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed`}>
                Ten workstreams against five architecture tiers. The concurrency row at the
                bottom is where the schedule pressure shows up — and where AI agents take the
                serial-work slots that would otherwise block humans.
              </p>
              <WorkstreamMatrix />
            </div>
          </section>
        )}

        {/* Architecture diagram */}
        {study.architecture && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="Architecture" title="System overview" />
              {study.architecture.diagram ? (
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 md:p-10">
                  <img
                    src={study.architecture.diagram}
                    alt={`${study.title} — architecture diagram`}
                    className="w-full h-auto mx-auto"
                  />
                  {study.architecture.caption && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center max-w-2xl mx-auto leading-relaxed">
                      {study.architecture.caption}
                    </p>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/8] bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                      [ architecture diagram — coming ]
                    </p>
                    {study.architecture.caption && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {study.architecture.caption}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Skills composability (Quant-only) */}
        {study.slug === "quant-skills" && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading
                eyebrow="Composability"
                title="The skills layer, composed"
              />
              <p className={`${PROSE_WIDTH} text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed`}>
                The deployment layer of the vertical. Eleven-plus role-specific skills sit across eight quant
                roles, and every one of them composes from the same shared foundation — so a fix to a core
                testing primitive propagates to every role that depends on it.
              </p>
              <QuantSkillsHierarchy />
            </div>
          </section>
        )}

        {/* Technical highlights */}
        {study.technicalHighlights && study.technicalHighlights.length > 0 && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="Under the hood" title="Technical highlights" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.technicalHighlights.map((h, i) => (
                  <div
                    key={h.title}
                    className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                      {h.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Delivered */}
        {study.delivered && study.delivered.length > 0 && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="Handoff" title="What was delivered" />
              <ul className={`${PROSE_WIDTH} space-y-3`}>
                {study.delivered.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white flex-shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Projected outcomes (LSC-only) */}
        {study.slug === "lsc-ecm" && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading
                eyebrow="Projected outcomes"
                title="What the modeled 5-year picture looks like"
              />
              <p className={`${PROSE_WIDTH} text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed`}>
                These are the targets the spec was written against — labeled projected because
                that's what they are until the system runs in production. The measurement
                framework below pins down when each one gets verified.
              </p>
              <ValueMetricsDashboard />
            </div>
          </section>
        )}

        {/* Capabilities + Stack */}
        {(study.capabilities?.length || study.stack?.length) && (
          <section className="container mx-auto px-6 mb-20">
            <div className={`${SECTION_WIDTH} space-y-10`}>
              {study.capabilities && study.capabilities.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">
                    Capabilities demonstrated
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.capabilities.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {study.stack && study.stack.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-3">
                    Stack / methodology
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 text-sm rounded-full bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Placeholder for thin case studies */}
        {!hasFullContent && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Full write-up coming. In the meantime, if this is the shape of problem you're working on —
                  <a href={`mailto:${CONTACT_EMAIL}`} className="ml-1 underline">reach out</a>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Email CTA */}
        <section className="container mx-auto px-6">
          <div className={SECTION_WIDTH}>
            <div className="p-8 md:p-12 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-4">
                If this is your problem
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                I take on a small number of these engagements a year.
              </h2>
              <p className={`${PROSE_WIDTH} text-gray-300 mb-8`}>
                If you're staring at a migration, a model decision, or an AI system design where the cost
                of getting it wrong is real — send a short note describing the situation. I'll reply
                whether or not it's a fit.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Re: ${study.title}`)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-medium no-underline hover:no-underline hover:bg-gray-100 transition-colors"
              >
                Email me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default CaseStudyDetail;
