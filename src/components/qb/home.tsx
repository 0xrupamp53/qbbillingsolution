import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  APPROACH,
  CAPABILITIES,
  COMPANY,
  FAQ,
  FEATURES,
  GUARANTEES,
  PRINCIPLES,
  STATS,
  STEPS,
  TECHNOLOGY,
} from "@/lib/site";
import { Reveal, useInView } from "./motion-primitives";
import { JOURNAL_POSTS } from "./sections";

/* --------------------------------------------------------------- shared */

export function PrimaryCta({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: string;
  variant?: "solid" | "outline";
}) {
  return (
    <Link
      to={to}
      className={
        "group inline-flex items-center gap-2.5 rounded-[6px] px-5 py-3 text-[0.8rem] font-medium transition-all " +
        (variant === "solid"
          ? "bg-accent text-accent-foreground shadow-[0_1px_2px_oklch(0.2_0.05_275/18%)] duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_16px_36px_-20px_oklch(0.2_0.05_275/70%)]"
          : "border border-border bg-background text-foreground duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent")
      }
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Streamline-style pill eyebrow with a small node glyph. */
function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-elevated px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.13em] text-muted-foreground">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
        <circle cx="2" cy="6" r="1.6" fill="currentColor" />
        <circle cx="11.5" cy="2" r="1.6" fill="currentColor" />
        <circle cx="11.5" cy="10" r="1.6" fill="currentColor" />
        <path d="M3.6 6h3.2V2h3M6.8 6v4h3" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      {children}
    </span>
  );
}

/** The highlight box with corner dots used on Streamline headlines. */
function Highlight({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "mint";
}) {
  const dot = tone === "blue" ? "var(--accent)" : "oklch(0.66 0.15 145)";
  return (
    <span className="relative inline-block">
      <span
        className="pointer-events-none absolute inset-y-0 -left-1 w-px"
        style={{ background: dot }}
      />
      <span
        className="pointer-events-none absolute inset-y-0 -right-1 w-px"
        style={{ background: dot }}
      />
      <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-[5px] w-[5px]" style={{ background: dot }} />
      <span className="pointer-events-none absolute -right-[3px] -bottom-[3px] h-[5px] w-[5px]" style={{ background: dot }} />
      <span className={tone === "blue" ? "hi-blue" : "hi-mint"}>{children}</span>
    </span>
  );
}

function Section({
  children,
  id,
  tone = "plain",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  tone?: "plain" | "surface";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={
        (tone === "surface" ? "bg-surface " : "") + "relative border-b border-border " + className
      }
    >
      <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-28">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------ dashboard */

/** Live counter that eases to a value whenever it changes. */
function Tick({ value }: { value: number }) {
  const [n, setN] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    prev.current = value;
    if (from === value) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / 650, 1);
      setN(Math.round(from + (value - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tabular-nums">{n}</span>;
}

const BOARD: Record<
  string,
  { stats: [string, number][]; rows: [string, string, string][] }
> = {
  product: {
    stats: [
      ["Requests", 128],
      ["In discovery", 9],
      ["Scoped", 42],
    ],
    rows: [
      ["Intake", "Business request captured", "Routed"],
      ["Define", "Requirements structured", "Agreed"],
      ["Shape", "MVP scope agreed", "Signed"],
      ["Plan", "Delivery sequence set", "Ready"],
    ],
  },
  design: {
    stats: [
      ["Flows", 64],
      ["In review", 5],
      ["Shipped", 38],
    ],
    rows: [
      ["Map", "User journeys drawn", "Mapped"],
      ["Prototype", "Interaction tested", "Validated"],
      ["System", "Components tokenised", "Live"],
      ["Handover", "Specs handed to build", "Done"],
    ],
  },
  engineering: {
    stats: [
      ["Services", 31],
      ["In build", 7],
      ["Live", 42],
    ],
    rows: [
      ["Build", "Service deployed", "Live"],
      ["Test", "Suites green", "Passing"],
      ["Release", "Shipped behind flags", "Rolled"],
      ["Evolve", "Usage reviewed", "Improved"],
    ],
  },
  intelligence: {
    stats: [
      ["Agents", 12],
      ["Running", 4],
      ["Automated", 87],
    ],
    rows: [
      ["Ingest", "Knowledge indexed", "Synced"],
      ["Reason", "Agent policy applied", "Scored"],
      ["Act", "Workflow triggered", "Executed"],
      ["Review", "Human check-in logged", "Audited"],
    ],
  },
  infrastructure: {
    stats: [
      ["Environments", 18],
      ["Alerts", 0],
      ["Uptime %", 99],
    ],
    rows: [
      ["Provision", "Cloud footprint declared", "Applied"],
      ["Secure", "Access scoped by role", "Locked"],
      ["Observe", "Metrics and logs wired", "Watched"],
      ["Scale", "Capacity auto-tuned", "Stable"],
    ],
  },
};

/** Interactive product surface — the "system" QB builds, rendered as UI. */
export function SystemBoard({ variant = 0 }: { variant?: number }) {
  const [active, setActive] = useState(
    CAPABILITIES[variant % CAPABILITIES.length]?.id ?? "product",
  );
  const [done, setDone] = useState<string[]>([]);
  const cap = CAPABILITIES.find((c) => c.id === active) ?? CAPABILITIES[0]!;
  const data = BOARD[active] ?? BOARD["product"]!;

  return (
    <div className="group/board overflow-hidden rounded-[10px] border border-border bg-background shadow-[0_24px_60px_-40px_oklch(0.2_0.05_275/45%)] transition-transform duration-700 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1 hover:shadow-[0_40px_90px_-45px_oklch(0.2_0.05_275/55%)]">
      <div className="flex items-center justify-between bg-paper px-4 py-2.5 text-paper-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-background text-[0.55rem] font-semibold text-accent transition-transform duration-500 group-hover/board:rotate-[-6deg]">
            QB
          </span>
          <span className="text-[0.7rem] font-medium">Operations system</span>
          <span className="ml-2 hidden items-center gap-1.5 rounded-full bg-paper-foreground/10 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.12em] sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.78_0.16_150)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_150)]" />
            </span>
            Live
          </span>
        </div>
        <div className="flex gap-1.5">
          {["", "", ""].map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-paper-foreground/30 transition-all duration-500 group-hover/board:bg-paper-foreground/60"
              style={{ transitionDelay: `${i * 70}ms` }}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[0.9fr_1.7fr]">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            {CAPABILITIES.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onMouseEnter={() => setActive(c.id)}
                  onClick={() => setActive(c.id)}
                  className={
                    "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[0.7rem] transition-all duration-300 " +
                    (on
                      ? "bg-accent/10 font-medium text-accent"
                      : "text-muted-foreground hover:translate-x-1 hover:bg-elevated hover:text-foreground")
                  }
                >
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full bg-current transition-transform duration-300 " +
                      (on ? "scale-150 opacity-100" : "opacity-60")
                    }
                  />
                  {c.title}
                  <span
                    className={
                      "ml-auto transition-all duration-300 " +
                      (on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")
                    }
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div key={cap.id} className="animate-fade-in rounded-md border border-border bg-surface/60 p-3">
            <div className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
              {cap.index} — {cap.title}
            </div>
            <p className="mt-1.5 text-[0.72rem] leading-relaxed text-foreground">{cap.line}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {cap.items.map((it, i) => (
                <span
                  key={it}
                  className="animate-fade-in cursor-default rounded-full border border-border px-2 py-0.5 text-[0.6rem] text-muted-foreground transition-colors duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {data.stats.map((s) => (
              <div
                key={s[0]}
                className="rounded-md border border-border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5"
              >
                <div className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {s[0]}
                </div>
                <div className="display mt-1 text-2xl">
                  <Tick value={s[1]} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-border">
            {data.rows.map((r, i) => {
              const key = active + r[0];
              const checked = done.includes(key);
              return (
                <button
                  key={r[0]}
                  type="button"
                  onClick={() =>
                    setDone((d) => (d.includes(key) ? d.filter((x) => x !== key) : [...d, key]))
                  }
                  className={
                    "flex w-full animate-fade-in items-center justify-between px-3 py-2.5 text-left text-[0.7rem] transition-all duration-300 hover:bg-elevated " +
                    (i === data.rows.length - 1 ? "" : "border-b border-border")
                  }
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className={
                        "flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border text-[0.5rem] transition-all duration-300 " +
                        (checked
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-transparent")
                      }
                    >
                      ✓
                    </span>
                    {r[0]}
                  </span>
                  <span className="hidden text-muted-foreground sm:block">{r[1]}</span>
                  <span
                    className={
                      "rounded-full px-2 py-0.5 text-[0.6rem] font-medium transition-all duration-300 " +
                      (checked
                        ? "bg-accent text-accent-foreground"
                        : "bg-support text-foreground")
                    }
                  >
                    {checked ? "Complete" : r[2]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="px-1 text-[0.6rem] text-muted-foreground">
            Hover the layers, tick a stage — the board is live.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

export function Hero() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  const step = (i: number) => ({
    opacity: m ? 1 : 0,
    transform: m ? "none" : "translateY(22px)",
    transition: `opacity 900ms var(--ease-out) ${i * 110}ms, transform 900ms var(--ease-expo) ${i * 110}ms`,
  });

  return (
    <section className="relative">
      <div className="relative mx-auto max-w-[1240px] px-5 pb-0 pt-16 text-center md:px-8 md:pt-20">
        <h1
          className="display mx-auto max-w-4xl text-[clamp(2.6rem,6.6vw,4.8rem)] leading-[1.02]"
          style={step(0)}
        >
          You bring the business.
          <br />
          <Highlight>
            <span className="display-italic text-accent">We build the system.</span>
          </Highlight>
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground"
          style={step(1)}
        >
          {COMPANY.valueProposition} We design, develop, deploy and maintain the systems that help businesses grow.
        </p>
        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
          style={step(2)}
        >
          <PrimaryCta to="/contact">Start a Project</PrimaryCta>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-[6px] border border-border bg-background px-5 py-3 text-[0.8rem] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            See How It Works
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1240px] md:mt-12" style={step(3)}>
          <div className="ocean rounded-[14px] p-4 transition-[padding] duration-500 md:p-10">
            <SystemBoard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- trusted by / tech grid */

export function TechStrip() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1240px] px-5 pb-0 pt-20 md:px-8 md:pt-24">
        <Reveal>
          <h2 className="display text-center text-[clamp(1.7rem,3.4vw,2.5rem)]">
            Built on the technology we trust
          </h2>
        </Reveal>
      </div>
      <div className="mx-auto mt-12 max-w-[1240px] border-t border-border">
        <div className="grid grid-cols-2 border-l border-border sm:grid-cols-4 lg:grid-cols-7">
          {TECHNOLOGY.map((t) => (
            <div
              key={t}
              className="group relative flex h-[120px] cursor-default items-center justify-center overflow-hidden border-b border-r border-border text-[0.95rem] font-medium text-muted-foreground transition-colors duration-300 hover:text-accent"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent/[0.06] transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:scale-y-100" />
              <span className="relative transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-110">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------ stats "staircase" */

export function StatsRow() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-[1240px] px-5 pb-0 pt-24 md:px-8 md:pt-28">
        <div className="grid items-end gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="group relative flex cursor-default flex-col"
              style={{
                paddingBottom: `${i * 34}px`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `all 800ms var(--ease-expo) ${i * 110}ms`,
              }}
            >
              <span
                className="absolute left-0 top-0 h-16 w-[3px] origin-top"
                style={{
                  background: i === 0 ? "transparent" : "oklch(0.7 0.16 145)",
                  transform: inView ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 800ms var(--ease-expo) ${i * 110}ms`,
                }}
              />
              <div className="pl-4">
                <div className="display text-[clamp(2.4rem,5vw,3.4rem)] leading-none transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-1 group-hover:text-accent">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.8rem] font-medium text-accent">{s.label}</div>
                <p className="mt-10 text-[0.8rem] leading-relaxed text-muted-foreground">
                  {s.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ascending checkered staircase, like the reference */}
      <div className="mx-auto mt-[-40px] hidden max-w-[1240px] items-end md:flex">
        {[70, 130, 190, 250].map((h, i) => (
          <div
            key={h}
            className="checker w-1/4 rounded-t-[14px] bg-elevated/70"
            style={{ height: h, marginLeft: i === 0 ? 0 : -1 }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- statement */

export function Statement() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  return (
    <section className="relative border-b border-border">
      <div ref={ref} className="mx-auto max-w-[1150px] px-5 py-28 text-center md:px-8 md:py-40">
        <p
          className="display text-[clamp(1.7rem,3.9vw,3rem)] leading-[1.32] text-muted-foreground"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "all 900ms var(--ease-expo)",
          }}
        >
          Good businesses often run on{" "}
          <Highlight tone="mint">
            <span className="display-italic text-foreground">
              bad systems — spreadsheets, inboxes and manual steps
            </span>
          </Highlight>{" "}
          holding the operation together. We design and engineer the products, software and
          intelligent systems that replace them.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- how it works */

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex h-full flex-col justify-end">
        <div className="mx-auto mb-6 flex items-center gap-6">
          {["Aa", "◍"].map((g) => (
            <span
              key={g}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-sm shadow-[0_2px_10px_oklch(0.2_0.05_275/12%)]"
            >
              {g}
            </span>
          ))}
        </div>
        <div className="mx-6 rounded-t-md bg-background">
          <div className="grid grid-cols-3 border-b border-border bg-elevated px-3 py-2 text-[0.65rem] text-muted-foreground">
            <span>Requestor</span>
            <span>Subject</span>
            <span>Type</span>
          </div>
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="h-9 border-b border-border last:border-0" />
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
        <div className="flex flex-wrap justify-center gap-3">
          {["Discovery", "Requirements", "Feasibility"].map((c) => (
            <span
              key={c}
              className="rounded-full bg-background/90 px-4 py-2 text-[0.72rem] font-medium"
            >
              {c}
            </span>
          ))}
        </div>
        <span className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-background text-[0.7rem] font-semibold text-accent">
          QB
        </span>
        <div className="grid w-full grid-cols-3 gap-3">
          {[0, 1, 2].map((n) => (
            <div key={n} className="flex items-center gap-2 rounded-md bg-background p-3">
              <span className="h-4 w-4 rounded-full bg-muted" />
              <span className="h-2 flex-1 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full items-center justify-center p-6">
      <div className="w-full rounded-[10px] bg-background p-5 shadow-[0_12px_40px_-24px_oklch(0.2_0.05_275/40%)]">
        <div className="flex items-start justify-between">
          <div className="text-sm font-medium">Ready for review</div>
          <span className="h-4 w-4 rounded-[4px] bg-support" />
        </div>
        <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground">
          We've shipped the release, monitored it in production and prepared the next
          improvement for your approval.
        </p>
        <div className="mt-4 flex items-center justify-end gap-3">
          <span className="text-[0.72rem] text-muted-foreground">Edit</span>
          <span className="rounded-[6px] bg-accent px-3 py-1.5 text-[0.72rem] text-accent-foreground">
            Approve and send
          </span>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <h2 className="display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08]">
          Built for how
          <br />
          <span className="text-muted-foreground/70">businesses actually work.</span>
        </h2>
        <p className="text-[0.98rem] leading-relaxed text-muted-foreground lg:pt-4">
          QB Billing Solution connects understanding, design and engineering across every
          product, platform and system we build.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.step} delay={i * 120}>
            <div>
              <div
                className={
                  "group relative h-[420px] overflow-hidden rounded-[14px] transition-all duration-700 [transition-timing-function:var(--ease-expo)] hover:-translate-y-2 hover:shadow-[0_40px_80px_-50px_oklch(0.2_0.05_275/55%)] " +
                  (i === 1 ? "ocean" : "bg-elevated/60")
                }
              >
                <span className="absolute left-4 top-4 z-10 rounded-[6px] bg-background/85 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-foreground">
                  {s.step}
                </span>
                <StepVisual index={i} />
              </div>
              <h3 className="display mt-7 text-[1.7rem]">{s.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{s.line}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.stages.map((st) => (
                  <span
                    key={st}
                    className="cursor-default rounded-full border border-border px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- feature tabs */

/** Abstract node diagram that sits inside the framed feature panel. */
function FeatureDiagram({ index }: { index: number }) {
  const blocks = [0, 1, 2];
  return (
    <div className="relative flex min-h-[300px] items-center justify-center px-6 py-10 md:min-h-[430px]">
      <div className="grid w-full max-w-[820px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1.15fr]">
        <div className="space-y-4">
          {blocks.map((b) => (
            <div
              key={b}
              className="flex items-center gap-3 rounded-[8px] border border-border bg-background px-4 py-4 transition-all duration-500 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_40px_-30px_oklch(0.2_0.05_275/60%)]"
            >
              <span className="h-7 w-9 rounded-[4px] bg-muted" />
              <span className="flex-1 space-y-1.5">
                <span className="block h-2 w-full rounded-full bg-muted" />
                <span className="block h-2 w-3/5 rounded-full bg-muted" />
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-[12px] border-2 border-accent bg-background transition-transform duration-700 [transition-timing-function:var(--ease-spring)] hover:scale-110 hover:rotate-3">
          <span className="display text-xl font-medium text-foreground">QB</span>
        </div>

        <div className="relative">
          <span className="absolute -left-2 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 bg-accent md:block" />
          <span className="absolute -right-2 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 bg-accent md:block" />
          <div className="overflow-hidden rounded-[10px]">
            <SystemBoard variant={index} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active]!;

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.72fr_2.28fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ul>
            {FEATURES.map((f, i) => (
              <li key={f.id} className="relative border-b border-border">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={
                    "flex w-full items-center gap-2.5 py-5 text-left text-[0.95rem] transition-colors " +
                    (i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  <span
                    className={
                      "h-[7px] w-[7px] shrink-0 " + (i === active ? "bg-accent" : "bg-transparent")
                    }
                  />
                  {f.tab}
                </button>
                {i === active && (
                  <span className="absolute -bottom-px left-0 h-[2px] w-[58%] bg-foreground" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div
          key={feature.id}
          className="animate-in fade-in overflow-hidden rounded-[14px] border border-border bg-surface duration-500"
        >
          <FeatureDiagram index={active} />
          <ul className="grid border-t border-border md:grid-cols-3">
            {feature.points.map((p, i) => (
              <li
                key={p}
                className={
                  "px-6 py-6 text-[0.86rem] leading-relaxed text-muted-foreground " +
                  (i === 0 ? "" : "md:border-l md:border-border")
                }
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <h3 className="display text-[clamp(1.7rem,3.1vw,2.4rem)] leading-[1.12]">
          {feature.title}
        </h3>
        <p className="text-[0.92rem] leading-relaxed text-muted-foreground md:pt-2">
          {feature.line}
        </p>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- assurance */

const ICONS = ["◍", "◈", "◐", "▤", "◇", "◎"];

/** Dark control-and-accountability grid. */
export function AssuranceGrid() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="tick-rule" />
        <div className="grid border-t border-b border-ink-border md:grid-cols-4">
          <div className="border-b border-ink-border p-8 md:col-span-2 md:border-b-0 md:border-r md:p-10">
            <h2 className="display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.1]">
              Control and accountability{" "}
              <span className="text-ink-muted">built into every engagement.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              One accountable team, business-first engineering, and systems designed to evolve —
              across every stage of the work.
            </p>
          </div>
          {GUARANTEES.slice(0, 2).map((g, i) => (
            <div
              key={g.title}
              className={
                "group flex min-h-[300px] flex-col justify-between border-b border-ink-border p-8 transition-colors duration-500 hover:bg-ink-foreground/[0.04] md:border-b-0 " +
                (i === 1 ? "md:border-l md:border-ink-border" : "")
              }
            >
              <span className="text-lg text-ink-muted transition-all duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-1 group-hover:text-ink-foreground">{ICONS[i]}</span>
              <div>
                <div className="text-sm font-medium">{g.title}</div>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-muted">{g.line}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid border-b border-ink-border md:grid-cols-4">
          {GUARANTEES.slice(2).map((g, i) => (
            <div
              key={g.title}
              className={
                "group flex min-h-[320px] flex-col justify-between border-b border-ink-border p-8 transition-colors duration-500 hover:bg-ink-foreground/[0.04] md:border-b-0 " +
                (i === 0 ? "" : "md:border-l md:border-ink-border")
              }
            >
              <span className="text-lg text-ink-muted transition-all duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-1 group-hover:text-ink-foreground">{ICONS[i + 2]}</span>
              <div>
                <div className="text-sm font-medium">{g.title}</div>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-muted">{g.line}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="tick-rule" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ principles */

const SLIDE_TINTS = [
  "oklch(0.93 0.2 110)",
  "oklch(0.86 0.13 200)",
  "oklch(0.9 0.16 145)",
  "oklch(0.88 0.14 60)",
];

export function PrincipleCarousel() {
  const [i, setI] = useState(0);
  const p = PRINCIPLES[i]!;
  return (
    <section className="bg-ink py-16 text-ink-foreground md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="grid overflow-hidden rounded-[14px] bg-background text-foreground md:grid-cols-[1.5fr_1fr]">
          <div key={p.label} className="flex animate-fade-in flex-col justify-between p-8 md:p-12">
            <div>
              <div className="display text-[1.9rem] leading-none">{COMPANY.brand}</div>
              <blockquote className="display mt-8 text-[clamp(1.25rem,2.3vw,1.85rem)] leading-snug">
                “{p.quote.split(".")[0]}.{" "}
                <span className="display-italic hi-mint">
                  {p.quote.split(".").slice(1).join(".").trim()}
                </span>
                ”
              </blockquote>
            </div>
            <div className="mt-14">
              <div className="text-base font-medium">{p.meta}</div>
              <div className="text-sm text-muted-foreground">{p.label}</div>
            </div>
          </div>
          <div
            className="relative min-h-[240px] p-6"
            style={{
              background:
                "linear-gradient(140deg, oklch(0.82 0.12 175), oklch(0.62 0.14 200))",
            }}
          >
            <div
              className="flex h-full w-full items-center justify-center rounded-[10px]"
              style={{ background: SLIDE_TINTS[i % SLIDE_TINTS.length] }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
                {Array.from({ length: 8 }).map((_, n) => (
                  <rect
                    key={n}
                    x="56"
                    y="8"
                    width="8"
                    height="42"
                    rx="4"
                    fill="oklch(0.16 0.01 275)"
                    transform={`rotate(${n * 45} 60 60)`}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + PRINCIPLES.length) % PRINCIPLES.length)}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink-border text-sm text-ink-foreground transition-all duration-300 hover:scale-110 hover:border-ink-foreground/60 hover:bg-ink-foreground/10"
          >
            ‹
          </button>
          <div className="flex items-center gap-1">
            {PRINCIPLES.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Slide ${n + 1}`}
                onClick={() => setI(n)}
                className="h-3.5 transition-all"
                style={{
                  width: n === i ? "58px" : "3px",
                  background: n === i ? "var(--ink-muted)" : "var(--ink-border)",
                  borderRadius: n === i ? "3px" : "0",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % PRINCIPLES.length)}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink-border text-sm text-ink-foreground transition-all duration-300 hover:scale-110 hover:border-ink-foreground/60 hover:bg-ink-foreground/10"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- trust badges */

const TRUST = [
  { title: "One accountable team", glyph: "QB", tone: "plain" as const },
  { title: "Secured by default", glyph: "🔒", tone: "plain" as const },
  { title: "Owned by you", glyph: "★", tone: "green" as const },
  { title: "Accountable after launch", glyph: "↻", tone: "plain" as const },
];

export function TrustRow() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="tick-rule" />
        <div className="grid border-t border-b border-ink-border md:grid-cols-4">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className={
                "group flex min-h-[300px] cursor-default flex-col items-center justify-center gap-6 border-b border-ink-border px-6 py-12 text-center transition-colors duration-500 hover:bg-ink-foreground/[0.04] md:border-b-0 " +
                (i === 0 ? "" : "md:border-l md:border-ink-border")
              }
            >
              <span
                className="flex h-[86px] w-[86px] items-center justify-center rounded-full text-xl transition-transform duration-700 [transition-timing-function:var(--ease-spring)] group-hover:scale-110 group-hover:-translate-y-1"
                style={
                  t.tone === "green"
                    ? {
                        background: "oklch(0.55 0.15 150)",
                        color: "oklch(0.98 0 0)",
                        boxShadow: "0 0 44px oklch(0.55 0.15 150 / 45%)",
                      }
                    : {
                        background: "oklch(0.99 0 0)",
                        color: "oklch(0.18 0.01 275)",
                      }
                }
              >
                {t.glyph}
              </span>
              <span
                className={
                  "text-[0.95rem] " + (t.tone === "green" ? "font-medium" : "text-ink-muted")
                }
              >
                {t.title}
              </span>
            </div>
          ))}
        </div>
        <div className="tick-rule" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- integrations */

export function Integrations() {
  const cells = Array.from({ length: 16 });
  const marks: Record<number, string> = {
    1: "TS",
    3: "React",
    4: "Node",
    7: "AWS",
    12: "Postgres",
    14: "Docker",
  };
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Seamless integration</Eyebrow>
          <h2 className="display mt-6 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.1]">
            We work where <br />
            <span className="text-muted-foreground/70">your business already runs</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {COMPANY.positioning}
          </p>
          <div className="mt-10">
            <PrimaryCta to="/capabilities" variant="outline">
              View all services
            </PrimaryCta>
          </div>
        </div>

        <div className="relative grid grid-cols-4 gap-3">
          {cells.map((_, i) => (
            <div
              key={i}
              className={
                "flex aspect-square cursor-default items-center justify-center rounded-[10px] border border-border text-[0.62rem] font-medium text-muted-foreground transition-all duration-500 [transition-timing-function:var(--ease-expo)] hover:-translate-y-1 hover:scale-105 hover:border-accent hover:bg-accent/10 hover:text-accent " +
                (i === 5 || i === 6 || i === 9 || i === 10 ? "bg-surface" : "bg-background")
              }
            >
              {marks[i] ?? ""}
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="ocean flex h-[27%] w-[27%] items-center justify-center rounded-[14px] shadow-[0_18px_40px_-18px_oklch(0.2_0.05_275/55%)] ring-6 ring-background">
              <span className="display text-lg text-paper-foreground">{COMPANY.brand}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- innovation */

const TIMELINE = [
  {
    title: "Today",
    line: "Spreadsheets, inboxes and manual steps hold the operation together. Good businesses run on systems that were never designed.",
    tone: "stripes" as const,
  },
  {
    title: "Now with QB",
    line: "Product, design, engineering, intelligence and infrastructure delivered as one system — understood, built and owned by you.",
    tone: "stripes" as const,
  },
  {
    title: "Tomorrow",
    line: "Intelligent workflows compound with every decision. The system evolves with the business instead of being replaced by it.",
    tone: "horizon" as const,
  },
];

export function Innovation() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-28">
        <Eyebrow>Innovation</Eyebrow>
        <h2 className="display mt-6 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.1]">
          Business doesn't have to <br />
          <span className="text-muted-foreground/70">operate the way it always has</span>
        </h2>

        <div className="mt-14 space-y-5">
          {TIMELINE.map((t) => (
            <div
              key={t.title}
              className="grid items-stretch overflow-hidden rounded-[16px] bg-background p-2 md:grid-cols-[0.62fr_1.38fr]"
            >
              <div
                className={
                  (t.tone === "horizon" ? "horizon" : "stripes") +
                  " min-h-[170px] rounded-[12px] border border-border/60"
                }
              />
              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <h3 className="display text-[1.6rem] leading-none">{t.title}</h3>
                <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                  {t.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------------------------------------------------- faq chat */

export function FaqChat() {
  const [active, setActive] = useState(0);
  return (
    <Section>
      <h2 className="display max-w-2xl text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.08]">
        What people ask <br />
        <span className="text-muted-foreground/70">before we start</span>
      </h2>

      <div className="mt-16 grid gap-x-10 md:grid-cols-2">
        <ul className="space-y-8">
          {FAQ.map((f, i) => (
            <li key={f.q} className="relative">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={
                  "rounded-[10px] bg-elevated px-5 py-4 text-left text-[0.95rem] transition-all duration-400 [transition-timing-function:var(--ease-expo)] hover:translate-x-1 " +
                  (i === active
                    ? "scale-[1.02] text-foreground shadow-[0_14px_36px_-28px_oklch(0.2_0.05_275/70%)]"
                    : "text-muted-foreground/60 hover:text-foreground")
                }
              >
                {f.q}
              </button>
              {i === active ? (
                <div className="mt-5 flex animate-fade-in items-start gap-3 md:absolute md:left-[calc(100%+2.5rem)] md:top-16 md:mt-0 md:w-[46vw] md:max-w-[620px]">
                  <div className="rounded-[6px] bg-ink px-6 py-5 text-[0.95rem] leading-relaxed text-ink-foreground">
                    {f.a}
                  </div>
                  <span
                    className="ocean mt-0 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-[0.7rem] font-semibold text-paper-foreground"
                    aria-hidden
                  >
                    QB
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="hidden md:block" />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- insights */

const INSIGHT_TABS = [
  { label: "Journal", icon: "◧" },
  { label: "Approach", icon: "▤" },
  { label: "Services", icon: "◇" },
] as const;

export function Insights() {
  const [tab, setTab] = useState(0);
  const cards =
    tab === 0
      ? JOURNAL_POSTS.map((p) => ({ tag: p.category, title: p.title, line: p.excerpt }))
      : tab === 1
        ? APPROACH.slice(0, 3).map((a) => ({ tag: a.index, title: a.title, line: a.line }))
        : CAPABILITIES.slice(0, 3).map((c) => ({ tag: c.index, title: c.title, line: c.line }));

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-28">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Actionable intelligence
            </span>
            <h2 className="display mt-7 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.08]">
              Insight for business <br />
              <span className="text-muted-foreground/70">and operations leaders</span>
            </h2>
          </div>
          <Link
            to="/journal"
            className="group inline-flex items-center gap-2 rounded-[8px] border border-border bg-background px-5 py-3 text-[0.85rem] font-medium shadow-sm transition-colors hover:border-accent hover:text-accent"
          >
            View All Resources
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[0.62fr_2.38fr]">
          <ul>
            {INSIGHT_TABS.map((t, i) => (
              <li key={t.label}>
                <button
                  type="button"
                  onClick={() => setTab(i)}
                  className={
                    "flex w-full items-center gap-3 border-b border-border py-4 text-left text-[0.95rem] transition-all duration-400 [transition-timing-function:var(--ease-expo)] hover:translate-x-1 hover:text-foreground " +
                    (i === tab ? "font-medium text-foreground" : "text-muted-foreground/70")
                  }
                >
                  <span className="text-base">{t.icon}</span>
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="grid gap-6 sm:grid-cols-3">
            {cards.map((c, i) => (
              <article
                key={c.title}
                className="group animate-fade-in cursor-default"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="ocean relative aspect-square overflow-hidden rounded-[14px] transition-all duration-700 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-50px_oklch(0.2_0.05_275/60%)]">
                  <span className="absolute left-4 top-4 rounded-[6px] bg-background/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                    {c.tag}
                  </span>
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full opacity-40 transition-transform duration-[1200ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-110"
                    aria-hidden
                  >
                    <path
                      d={i % 2 === 0 ? "M-10 90 Q 50 -10 120 40" : "M-10 30 Q 60 110 120 60"}
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="0.4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-[0.95rem] leading-snug text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {c.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- cta */

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%]"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in oklab, var(--detail) 45%, transparent) 45%, color-mix(in oklab, var(--detail) 70%, transparent))",
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-40 pt-28 text-center md:px-8 md:pb-52 md:pt-36">
        <h2 className="display mx-auto max-w-3xl text-[clamp(2.3rem,5.2vw,3.8rem)] leading-[1.05]">
          Tell us what you're trying <br />
          <span className="text-muted-foreground/70">to make possible</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
          You don't need a perfect brief. Start with the problem — we'll shape the system around it.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-[8px] bg-accent px-6 py-3.5 text-[0.9rem] font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_18px_40px_-20px_oklch(0.2_0.05_275/70%)]"
          >
            Start a Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-[8px] bg-background px-6 py-3.5 text-[0.9rem] font-medium shadow-sm"
          >
            See How It Works
          </Link>
        </div>
      </div>
      <span
        aria-hidden
        className="display pointer-events-none absolute inset-x-0 bottom-[-2.5vw] -z-0 select-none whitespace-nowrap text-center text-[13vw] leading-[0.8] text-background/35"
      >
        QB Billing Solution
      </span>
    </section>
  );
}
