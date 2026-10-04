import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CaseFigure } from "@/components/case-studies/CaseFigures";
import { DemoEmbed } from "@/components/case-studies/DemoEmbed";
import { QuantSkillsHierarchy } from "@/components/case-studies/QuantSkillsHierarchy";
import {
  getCaseStudy,
  type CaseSection,
  type MetricStatus,
  type SectionBlock,
} from "@/data/caseStudies";

const CONTACT_EMAIL = "jeffery.dickerson@protonmail.com";

// Every section content block uses this width so headings align to a single left edge.
const SECTION_WIDTH = "max-w-5xl mx-auto";
// Prose blocks inside the wider section constrain themselves for readability.
const PROSE_WIDTH = "max-w-3xl";

const EYEBROW = "text-xs uppercase tracking-[0.18em] text-muted-foreground";
const CARD = "rounded-2xl bg-muted border border-border";

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
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-8">
    <p className={`${EYEBROW} mb-2`}>{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
  </div>
);

const Caption = ({ children }: { children: string }) => (
  <figcaption className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
    {children}
  </figcaption>
);

const Block = ({ block }: { block: SectionBlock }) => {
  switch (block.type) {
    case "text":
      return (
        <p className={`${PROSE_WIDTH} text-lg text-muted-foreground leading-relaxed`}>
          {renderWithBold(block.text)}
        </p>
      );
    case "list":
      return (
        <ul className={`${PROSE_WIDTH} space-y-3`}>
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
              <span>{renderWithBold(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className={`${PROSE_WIDTH} border-l-2 border-primary bg-muted rounded-r-2xl px-5 py-4`}>
          <p className="text-base text-foreground leading-relaxed">{block.text}</p>
          {block.cite && <cite className="mt-3 block text-sm not-italic text-muted-foreground">{block.cite}</cite>}
        </blockquote>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} className="border-b border-border py-3 pr-6 text-xs font-semibold text-muted-foreground">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`border-b border-border py-3 pr-6 align-top ${
                        i === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure>
          <CaseFigure figure={block.figure} />
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    case "image":
      return (
        <figure>
          <div className={`${CARD} p-3 md:p-4`}>
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-xl rounded-lg"
            />
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    case "embed":
      return (
        <figure>
          <DemoEmbed src={block.src} title={block.title} />
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );
    case "chips":
      return (
        <ul className="flex flex-wrap gap-2">
          {block.items.map((item) => (
            <li key={item} className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground border border-border">
              {item}
            </li>
          ))}
        </ul>
      );
    case "link":
      return (
        <Button asChild variant="outline">
          <a href={block.href} target="_blank" rel="noopener noreferrer">
            {block.label}
            <ArrowUpRight />
          </a>
        </Button>
      );
  }
};

// Field-notes layout: margin label on the left, one reading column on the right.
const FieldSection = ({ section }: { section: CaseSection }) => (
  <section className="container mx-auto px-6">
    <div className={`${SECTION_WIDTH} grid gap-x-10 gap-y-3 border-t border-border py-12 md:grid-cols-[10rem_minmax(0,1fr)]`}>
      <div className="md:pt-1.5">
        <p className={`${EYEBROW} !text-foreground font-semibold`}>{section.label}</p>
        {section.note && <p className="mt-1 text-sm text-muted-foreground">{section.note}</p>}
      </div>
      <div className="min-w-0 space-y-6">
        {section.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h2>
        )}
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  </section>
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

  const hasFullContent = Boolean(
    study.sections?.length || (study.impact && study.challenge && study.approach)
  );
  const heroFacts = [study.date, study.industry, study.engagement].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        {/* Back link */}
        <div className="container mx-auto px-6 mb-10">
          <div className={SECTION_WIDTH}>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors no-underline hover:no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              All case studies
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-6 mb-16">
          <div className={SECTION_WIDTH}>
            <p className={`${EYEBROW} mb-6 animate-fade-up`}>{heroFacts.join(" · ")}</p>
            <h1 className={`${PROSE_WIDTH} text-4xl md:text-5xl font-bold leading-[1.1] text-foreground mb-6 animate-fade-up`} style={{ animationDelay: "0.1s" }}>
              {study.heroTitle}
            </h1>
            <p className={`${PROSE_WIDTH} text-xl text-muted-foreground mb-6 animate-fade-up`} style={{ animationDelay: "0.2s" }}>
              {study.heroSubtitle}
            </p>
            {study.meta ? (
              <dl
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                {study.meta.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className={`${EYEBROW} mb-1.5`}>{item.label}</dt>
                    <dd className="text-sm text-foreground leading-relaxed">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:no-underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              study.client && (
                <p className="text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  <span className="text-foreground font-medium">Client · </span>
                  {study.client}
                </p>
              )
            )}
          </div>
        </section>

        {/* Impact at a glance */}
        {study.impact && study.impact.length > 0 && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              {!study.sections && (
                <SectionHeading eyebrow="Impact at a glance" title="What this engagement moved" />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {study.impact.map((metric) => (
                  <div key={metric.label} className={`${CARD} p-6 flex flex-col gap-3`}>
                    <span className={`inline-flex items-center self-start px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${statusStyles[metric.status]}`}>
                      {metric.status}
                    </span>
                    <div className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {metric.value}
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Field-notes sections */}
        {study.sections && study.sections.length > 0 && (
          <div className="mb-20">
            {study.sections.map((section) => (
              <FieldSection key={`${section.label}-${section.title ?? ""}`} section={section} />
            ))}
          </div>
        )}

        {/* Challenge */}
        {study.challenge && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="The challenge" title="What made this hard" />
              <div className={`${PROSE_WIDTH} space-y-5 text-lg text-muted-foreground leading-relaxed`}>
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
              <div className={`${PROSE_WIDTH} space-y-5 text-lg text-muted-foreground leading-relaxed`}>
                {study.approach.map((p, i) => (
                  <p key={i}>{renderWithBold(p)}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Architecture diagram */}
        {study.architecture && (
          <section className="container mx-auto px-6 mb-20">
            <div className={SECTION_WIDTH}>
              <SectionHeading eyebrow="Architecture" title="System overview" />
              {study.architecture.diagram ? (
                <div className={`${CARD} p-6 md:p-10`}>
                  <img
                    src={study.architecture.diagram}
                    alt={`${study.title} — architecture diagram`}
                    className="w-full h-auto mx-auto"
                  />
                  {study.architecture.caption && (
                    <p className="text-sm text-muted-foreground mt-6 text-center max-w-2xl mx-auto leading-relaxed">
                      {study.architecture.caption}
                    </p>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/8] bg-muted rounded-2xl border border-dashed border-border flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground font-mono mb-2">
                      [ architecture diagram — coming ]
                    </p>
                    {study.architecture.caption && (
                      <p className="text-sm text-muted-foreground">{study.architecture.caption}</p>
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
              <p className={`${PROSE_WIDTH} text-base text-muted-foreground mb-8 leading-relaxed`}>
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
                  <div key={h.title} className={`${CARD} p-6`}>
                    <span className="text-xs font-mono text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{h.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
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
                  <li key={d} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Capabilities + Stack */}
        {(study.capabilities?.length || study.stack?.length) && (
          <section className="container mx-auto px-6 mb-20">
            <div className={`${SECTION_WIDTH} space-y-10`}>
              {study.capabilities && study.capabilities.length > 0 && (
                <div>
                  <p className={`${EYEBROW} mb-3`}>Capabilities demonstrated</p>
                  <div className="flex flex-wrap gap-2">
                    {study.capabilities.map((c) => (
                      <span key={c} className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground border border-border">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {study.stack && study.stack.length > 0 && (
                <div>
                  <p className={`${EYEBROW} mb-3`}>Stack / methodology</p>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((s) => (
                      <span key={s} className="px-3 py-1.5 text-sm rounded-full bg-background text-muted-foreground border border-border">
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
              <div className="p-8 rounded-2xl bg-muted border border-dashed border-border text-center">
                <p className="text-muted-foreground">
                  Full write-up coming. In the meantime, if this is the shape of problem you're working on —
                  <a href={`mailto:${CONTACT_EMAIL}`} className="ml-1 underline">reach out</a>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Email CTA — fixed dark band in both themes, like the home CTA. */}
        <section className="container mx-auto px-6">
          <div className={SECTION_WIDTH}>
            <div className="p-8 md:p-12 rounded-2xl bg-neutral-950 text-neutral-50 border border-neutral-800">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-4">
                If this is your problem
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                I take on a small number of these engagements a year.
              </h2>
              <p className={`${PROSE_WIDTH} text-neutral-300 mb-8`}>
                If you're staring at a migration, a model decision, or an AI system design where the cost
                of getting it wrong is real — send a short note describing the situation. I'll reply
                whether or not it's a fit.
              </p>
              <Button asChild size="lg" className="bg-neutral-50 text-neutral-950 hover:bg-neutral-200">
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Re: ${study.title}`)}`}>
                  Email me
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
