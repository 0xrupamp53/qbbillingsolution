import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { APPROACH, CAPABILITIES, TECHNOLOGY } from "@/lib/site";
import { DisplayLines, Reveal, useInView } from "./motion-primitives";
import { ArrowLink } from "./Button";

/* ---------------------------------------------------------------- problem */

const FRAGMENTS = [
  "SPREADSHEET",
  "EMAIL",
  "WHATSAPP",
  "CRM",
  "FORM",
  "DATABASE",
  "HUMAN",
];

export function ProblemSection() {
  const { ref, inView } = useInView<HTMLElement>(0.25);

  return (
    <section
      ref={ref}
      className="grain relative bg-paper px-6 py-32 text-paper-foreground md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
          style={{ color: "color-mix(in oklab, var(--paper-foreground) 55%, transparent)" }}
        >
          01 / Business systems
        </div>

        <DisplayLines
          className="display mt-12 max-w-4xl text-[clamp(2.4rem,7vw,6rem)]"
          lines={["Good businesses", "often run on", "bad systems."]}
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <p className="max-w-md text-base leading-relaxed opacity-70">
            Spreadsheets. WhatsApp. Email. Manual processes. Disconnected software. Each
            one works alone. Together they quietly cost the business time, accuracy and
            growth.
          </p>

          <div className="relative h-[320px]">
            {FRAGMENTS.map((f, i) => {
              const angle = (i / FRAGMENTS.length) * Math.PI * 2;
              const spread = inView ? 0.18 : 1;
              const x = 50 + Math.cos(angle) * 34 * spread;
              const y = 50 + Math.sin(angle) * 34 * spread;
              return (
                <span
                  key={f}
                  className="absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    borderColor: "color-mix(in oklab, var(--paper-foreground) 25%, transparent)",
                    backgroundColor: "var(--paper-deep)",
                    opacity: inView ? 0.5 : 1,
                    transition: `all 1400ms var(--ease-expo) ${i * 60}ms`,
                  }}
                >
                  {f}
                </span>
              );
            })}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em]"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                opacity: inView ? 1 : 0,
                transition: "opacity 900ms var(--ease-out) 900ms",
              }}
            >
              Business system
            </span>
          </div>
        </div>

        <div className="mt-40 border-t pt-16" style={{ borderColor: "color-mix(in oklab, var(--paper-foreground) 15%, transparent)" }}>
          <DisplayLines
            className="display text-[clamp(2rem,5.5vw,4.6rem)]"
            lines={["We don't just build software.", "We build better ways to operate."]}
            step={260}
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- capabilities */

export function CapabilitiesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="label-mono">02 / Services</div>
        <Reveal>
          <h2 className="display mt-10 max-w-3xl text-[clamp(2.2rem,6vw,5rem)]">
            One team across strategy, design, engineering and growth.
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-px border border-border bg-border lg:grid-cols-[1fr_1.1fr]">
          <div className="bg-background">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="ring"
                className="group flex w-full items-baseline gap-6 border-b border-border px-6 py-8 text-left transition-colors duration-500 last:border-b-0 md:px-10"
                style={{
                  backgroundColor: active === i ? "var(--surface)" : "transparent",
                }}
              >
                <span className="label-mono">{c.index}</span>
                <span
                  className="display text-[clamp(1.8rem,4vw,3.2rem)] transition-colors duration-500"
                  style={{ color: active === i ? "var(--accent)" : "var(--foreground)" }}
                >
                  {c.title}
                </span>
              </button>
            ))}
          </div>

          <div className="relative flex min-h-[420px] flex-col justify-between bg-surface p-8 md:p-14">
            <CapabilityVisual index={active} />
            <div key={active} className="relative">
              <p
                className="display text-[clamp(1.6rem,3.2vw,2.6rem)]"
                style={{ animation: "none" }}
              >
                {CAPABILITIES[active]!.line}
              </p>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {CAPABILITIES[active]!.items.map((it, i) => (
                  <li
                    key={it}
                    className="label-mono text-foreground"
                    style={{
                      opacity: 0,
                      animation: `qb-fade 500ms var(--ease-out) ${i * 70}ms forwards`,
                    }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes qb-fade { to { opacity: 1 } }`}</style>
    </section>
  );
}

function CapabilityVisual({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className="pointer-events-none absolute right-6 top-6 h-40 w-64 opacity-60 md:right-12 md:top-12"
      aria-hidden
    >
      {index === 0 && (
        <g stroke="var(--accent)" strokeWidth="0.4" fill="none">
          <rect x="6" y="6" width="34" height="22" />
          <rect x="46" y="6" width="48" height="10" />
          <rect x="46" y="20" width="28" height="8" />
          <rect x="6" y="34" width="88" height="18" strokeDasharray="2 2" />
        </g>
      )}
      {index === 1 && (
        <g fill="none" stroke="var(--support)" strokeWidth="0.4">
          <rect x="6" y="6" width="88" height="46" />
          <line x1="6" y1="16" x2="94" y2="16" />
          <rect x="12" y="24" width="24" height="20" fill="var(--accent)" opacity="0.25" />
          <rect x="42" y="24" width="24" height="20" />
          <rect x="72" y="24" width="16" height="8" />
        </g>
      )}
      {index === 2 && (
        <g stroke="var(--accent)" strokeWidth="0.4" fill="none">
          <circle cx="18" cy="30" r="7" />
          <circle cx="50" cy="14" r="6" />
          <circle cx="50" cy="46" r="6" />
          <circle cx="84" cy="30" r="7" />
          <path d="M25 30 L44 16 M25 30 L44 44 M56 14 L77 28 M56 46 L77 32" />
        </g>
      )}
      {index === 3 && (
        <g stroke="var(--support)" strokeWidth="0.35" fill="none">
          {[10, 30, 50].map((y) => (
            <g key={y}>
              <circle cx="14" cy={y} r="2.2" fill="var(--accent)" stroke="none" />
              <circle cx="50" cy={y === 30 ? 20 : y} r="2.2" />
              <circle cx="86" cy={y} r="2.2" />
              <path d={`M16 ${y} L48 ${y === 30 ? 20 : y} M52 ${y === 30 ? 20 : y} L84 ${y}`} />
            </g>
          ))}
        </g>
      )}
      {index === 4 && (
        <g stroke="var(--accent)" strokeWidth="0.4" fill="none">
          <rect x="8" y="8" width="20" height="14" />
          <rect x="40" y="8" width="20" height="14" />
          <rect x="72" y="8" width="20" height="14" />
          <rect x="24" y="38" width="52" height="14" />
          <path d="M18 22 L50 38 M50 22 L50 38 M82 22 L50 38" strokeDasharray="1.5 1.5" />
        </g>
      )}
    </svg>
  );
}

/* ---------------------------------------------------------------- craft */

const CRAFT_LAYERS = [
  { label: "Product", meta: "SURFACE / WHOLE" },
  { label: "Navigation", meta: "STATE / ACTIVE" },
  { label: "Typography", meta: "TYPE / DISPLAY · WEIGHT / 500" },
  { label: "Spacing", meta: "GRID / 12 · GUTTER / 24" },
  { label: "Interaction", meta: "EASE / EXPO · 500MS" },
  { label: "API", meta: "SYSTEM / API · LATENCY / 42MS" },
  { label: "Database", meta: "INDEX / BTREE · P99 / 8MS" },
  { label: "Infrastructure", meta: "REGION / EU-WEST · UPTIME / SLO" },
];

export function CraftSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
        setStep(Math.min(CRAFT_LAYERS.length - 1, Math.floor(p * CRAFT_LAYERS.length)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-paper text-paper-foreground"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 md:px-10">
        <div className="mx-auto grid w-full max-w-[1600px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div
              className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
              style={{ color: "color-mix(in oklab, var(--paper-foreground) 55%, transparent)" }}
            >
              03 / Craft
            </div>
            <h2 className="display mt-8 text-[clamp(2.2rem,5.5vw,4.6rem)]">
              The difference is in the details.
            </h2>
            <div className="mt-12 space-y-2">
              {CRAFT_LAYERS.map((l, i) => (
                <div
                  key={l.label}
                  className="flex items-baseline gap-5 font-mono text-[0.68rem] uppercase tracking-[0.18em]"
                  style={{ opacity: i === step ? 1 : 0.25, transition: "opacity 400ms" }}
                >
                  <span style={{ color: i === step ? "var(--accent)" : "inherit" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative aspect-[4/3] w-full border"
            style={{
              borderColor: "color-mix(in oklab, var(--paper-foreground) 20%, transparent)",
              backgroundColor: "var(--paper-deep)",
              transform: `scale(${1 + step * 0.06})`,
              transition: "transform 900ms var(--ease-expo)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, color-mix(in oklab, var(--paper-foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--paper-foreground) 8%, transparent) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "color-mix(in oklab, var(--paper-foreground) 18%, transparent)" }}>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                  QB / Interface
                </span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              </div>
              <div className="display text-[clamp(1.4rem,3vw,2.4rem)]">
                {CRAFT_LAYERS[step]!.label}
              </div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-60">
                {CRAFT_LAYERS[step]!.meta}
              </div>
              <div className="mt-auto grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-14 border"
                    style={{
                      borderColor: "color-mix(in oklab, var(--paper-foreground) 18%, transparent)",
                      backgroundColor:
                        i === step % 3 ? "color-mix(in oklab, var(--accent) 18%, transparent)" : "transparent",
                      transition: "background-color 600ms var(--ease-out)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 w-full max-w-[1600px]">
          <p className="display text-[clamp(1.4rem,3vw,2.4rem)]">
            Craft is how the thing works.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- work */

const WORK_ROWS = [
  { name: "Operations Platform", year: "2026", type: "Platform" },
  { name: "Billing System", year: "2026", type: "SaaS" },
  { name: "Intelligence Layer", year: "2026", type: "AI" },
  { name: "Commerce Backend", year: "2025", type: "Commerce" },
];

export function WorkIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section
      className="relative border-t border-border px-6 py-28 md:px-10 md:py-36"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="label-mono grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-border pb-4 sm:gap-8">
          <span>Project</span>
          <span className="w-20">Year</span>
          <span className="w-28 text-right">Type</span>
        </div>

        {WORK_ROWS.map((row, i) => (
          <div
            key={row.name}
            data-cursor="VIEW PROJECT ↗"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border transition-all duration-500 [transition-timing-function:var(--ease-expo)] sm:gap-8"
            style={{
              paddingBlock: hover === i ? "2.6rem" : "1.8rem",
              color: hover === i ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            <span className="display min-w-0 text-[clamp(1.25rem,3.4vw,2.8rem)]">
              {row.name}
              <span
                className="ml-4 inline-block text-accent transition-all duration-500"
                style={{
                  opacity: hover === i ? 1 : 0,
                  transform: hover === i ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                ↗
              </span>
            </span>
            <span className="label-mono w-14 sm:w-20">{row.year}</span>
            <span className="label-mono w-20 text-right sm:w-28">{row.type}</span>
          </div>
        ))}

        <p className="label-mono mt-8">
          Project index in preparation — published only with client consent.
        </p>
      </div>

      {hover !== null ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[60] hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-border bg-surface md:block"
          style={{ left: pos.x, top: pos.y }}
        >
          <div className="grid-field h-full w-full opacity-60" />
          <div className="label-mono absolute bottom-4 left-4 text-foreground">
            {WORK_ROWS[hover]!.type} / {WORK_ROWS[hover]!.year}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------ technology */

export function TechnologySection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="label-mono">04 / Technology</div>
        <Reveal>
          <h2 className="display mt-10 max-w-3xl text-[clamp(2rem,5.5vw,4.4rem)]">
            Technology is the material.
            <br />
            The system is the craft.
          </h2>
        </Reveal>

        <div className="relative mt-24 h-[420px] w-full border border-border">
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {TECHNOLOGY.map((_, i) => {
              const a = (i / TECHNOLOGY.length) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos(a) * 36}%`}
                  y2={`${50 + Math.sin(a) * 38}%`}
                  stroke={active === i ? "var(--accent)" : "var(--border)"}
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          {TECHNOLOGY.map((t, i) => {
            const a = (i / TECHNOLOGY.length) * Math.PI * 2;
            return (
              <button
                key={t}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-all duration-500"
                style={{
                  left: `${50 + Math.cos(a) * 36}%`,
                  top: `${50 + Math.sin(a) * 38}%`,
                  borderColor: active === i ? "var(--accent)" : "var(--border)",
                  color: active === i ? "var(--accent)" : "var(--muted-foreground)",
                  backgroundColor: "var(--background)",
                  transform: `translate(-50%, -50%) scale(${active === i ? 1.12 : 1})`,
                }}
              >
                {t}
              </button>
            );
          })}
          <span className="label-mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground">
            System
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- AI */

const PIPELINE = ["Input", "Understand", "Reason", "Act", "Learn"];

export function IntelligenceSection() {
  const { ref, inView } = useInView<HTMLElement>(0.3);

  return (
    <section ref={ref} className="grain border-t border-border bg-surface px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="label-mono">05 / Intelligence</div>
        <Reveal>
          <h2 className="display mt-10 max-w-4xl text-[clamp(2rem,5.5vw,4.6rem)]">
            Intelligence, engineered into the business.
          </h2>
        </Reveal>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          AI becomes valuable when it is connected to the workflows, data and decisions
          that matter.
        </p>

        <div className="mt-24 flex flex-col gap-px border border-border bg-border md:flex-row">
          {PIPELINE.map((p, i) => (
            <div
              key={p}
              className="relative flex-1 bg-surface px-6 py-12"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 700ms var(--ease-expo) ${i * 140}ms`,
              }}
            >
              <div className="label-mono">{String(i + 1).padStart(2, "0")}</div>
              <div className="display mt-6 text-[clamp(1.4rem,2.4vw,2rem)]">{p}</div>
              <span
                className="absolute bottom-0 left-0 h-px bg-accent"
                style={{
                  width: inView ? "100%" : "0%",
                  transition: `width 900ms var(--ease-out) ${400 + i * 220}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- approach */

export function ApproachSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.max(0, Math.min(0.999, -rect.top / Math.max(total, 1)));
        setStep(Math.floor(p * APPROACH.length));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative border-t border-border" style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-screen items-center px-6 md:px-10">
        <div className="mx-auto grid w-full max-w-[1600px] gap-16 lg:grid-cols-2">
          <div>
            <div className="label-mono">06 / Approach</div>
            <h2 className="display mt-8 text-[clamp(2rem,4.5vw,3.6rem)]">
              Before we build, we understand.
            </h2>
            <ol className="mt-12 space-y-3">
              {APPROACH.map((a, i) => (
                <li
                  key={a.index}
                  className="flex items-baseline gap-5"
                  style={{ opacity: i === step ? 1 : 0.28, transition: "opacity 400ms" }}
                >
                  <span className="label-mono" style={{ color: i === step ? "var(--accent)" : undefined }}>
                    {a.index}
                  </span>
                  <span className="display text-[clamp(1.4rem,2.6vw,2.2rem)] uppercase">
                    {a.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex min-h-[280px] flex-col justify-center border border-border bg-surface p-10 md:p-16">
            <div className="label-mono">Stage {APPROACH[step]!.index}</div>
            <p key={step} className="display mt-8 text-[clamp(1.6rem,3.4vw,2.8rem)]">
              {APPROACH[step]!.line}
            </p>
            <div className="mt-12 h-px w-full bg-border">
              <div
                className="h-px bg-accent transition-all duration-700"
                style={{ width: `${((step + 1) / APPROACH.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- partnership */

const WHY = [
  { title: "Business-first", line: "We understand the problem before choosing the technology." },
  { title: "One team", line: "Product, design and engineering work together." },
  { title: "Built to last", line: "We build systems designed to evolve." },
  { title: "Accountable", line: "We stay responsible for what we ship." },
];

const MODELS = [
  { title: "Build", line: "For new products." },
  { title: "Extend", line: "For existing teams." },
  { title: "Evolve", line: "For ongoing product development." },
];

const FIT = [
  "You have a business, not just an idea.",
  "You care about the quality of the product.",
  "You want a partner, not a pair of hands.",
  "You're willing to build for the long term.",
];

export function PartnershipSection() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="label-mono">07 / Partnership</div>

        <Reveal>
          <h2 className="display mt-10 max-w-4xl text-[clamp(2rem,5.5vw,4.4rem)]">
            You shouldn't have to become technical to build something technical.
          </h2>
        </Reveal>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Tell us what your business needs. We'll help determine what technology should
          exist, how it should work and how to build it.
        </p>
        <ArrowLink to="/contact" className="mt-10">
          Start a Project
        </ArrowLink>

        <div className="mt-28 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="group bg-background p-8 transition-colors duration-500 hover:bg-surface">
              <div className="label-mono transition-colors group-hover:text-accent">
                {w.title}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{w.line}</p>
            </div>
          ))}
        </div>

        <div className="mt-28 grid gap-16 lg:grid-cols-2">
          <div>
            <div className="label-mono">Engagement models</div>
            <div className="mt-8 space-y-6">
              {MODELS.map((m) => (
                <div key={m.title} className="flex items-baseline gap-6 border-b border-border pb-5">
                  <span className="display w-40 text-[clamp(1.4rem,2.6vw,2rem)]">{m.title}</span>
                  <span className="text-sm text-muted-foreground">{m.line}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="label-mono">Client fit</div>
            <h3 className="display mt-8 text-[clamp(1.6rem,3vw,2.4rem)]">
              We work best when the problem matters.
            </h3>
            <ul className="mt-8 space-y-3">
              {FIT.map((f) => (
                <li key={f} className="flex gap-4 text-sm text-muted-foreground">
                  <span className="text-accent">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ final CTA */

export function FinalCta() {
  return (
    <section className="grain relative flex min-h-screen items-center border-t border-border px-6 md:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="label-mono">Start</div>
        <DisplayLines
          className="display mt-10 text-[clamp(2.6rem,9vw,8rem)]"
          lines={["Let's build something", "worth having."]}
          step={220}
        />
        <p className="mt-12 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tell us what you're trying to change. We'll help you figure out what to build.
        </p>
        <ArrowLink to="/contact" className="mt-12" cursor="START ↗">
          Start a Project
        </ArrowLink>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- studio */

export function StudioStrip() {
  return (
    <section className="overflow-hidden border-t border-border py-24">
      <div className="mx-auto mb-14 max-w-[1600px] px-6 md:px-10">
        <div className="label-mono">08 / Studio</div>
        <Reveal>
          <h2 className="display mt-8 text-[clamp(2rem,5vw,4rem)]">
            Small enough to care.
            <br />
            Serious enough to build.
          </h2>
        </Reveal>
      </div>
      <div className="flex w-max gap-6" style={{ animation: "qb-marquee 48s linear infinite" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-6">
            {["Sketches", "Architecture", "Code", "Type specimens", "Diagrams", "Product screens", "Notes"].map(
              (t) => (
                <div
                  key={t}
                  className="flex h-44 w-72 flex-col justify-between border border-border bg-surface p-6"
                >
                  <span className="label-mono">Artifact</span>
                  <span className="display text-2xl">{t}</span>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- journal */

export const JOURNAL_POSTS = [
  {
    slug: "systems-before-software",
    category: "Systems",
    title: "Systems before software",
    excerpt:
      "Why the first deliverable of a good engagement is a shared model of the business, not a backlog.",
    date: "2026",
  },
  {
    slug: "what-ai-is-actually-for",
    category: "AI",
    title: "What AI is actually for",
    excerpt: "Intelligence is only useful where it touches a decision someone has to make.",
    date: "2026",
  },
  {
    slug: "the-cost-of-manual-process",
    category: "Business",
    title: "The cost of a manual process",
    excerpt: "A short model for pricing the operational drag most businesses have stopped noticing.",
    date: "2026",
  },
];

export function JournalSection() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="label-mono">09 / Journal</div>
            <Reveal>
              <h2 className="display mt-8 text-[clamp(2rem,5vw,4rem)]">Journal</h2>
            </Reveal>
          </div>
          <Link to="/journal" className="label-mono hover:text-accent">
            All entries ↗
          </Link>
        </div>

        <div className="mt-16">
          {JOURNAL_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/journal"
              data-cursor="READ"
              className="group grid gap-4 border-b border-border py-8 md:grid-cols-[8rem_1fr_auto] md:items-baseline"
            >
              <span className="label-mono">{p.category}</span>
              <span className="display text-[clamp(1.4rem,3vw,2.4rem)] transition-colors group-hover:text-accent">
                {p.title}
              </span>
              <span className="label-mono">{p.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
