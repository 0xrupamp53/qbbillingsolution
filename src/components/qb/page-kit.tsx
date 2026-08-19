import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./motion-primitives";
import { PrimaryCta } from "./home";

/* ------------------------------------------------------------------ *
 * Section shell — one consistent rhythm for every sub page.
 * ------------------------------------------------------------------ */

export function Section({
  eyebrow,
  title,
  lead,
  children,
  tone = "default",
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  children?: ReactNode;
  tone?: "default" | "muted";
  className?: string;
}) {
  return (
    <section
      className={`border-t border-border px-5 py-20 md:px-8 md:py-28 ${
        tone === "muted" ? "bg-elevated" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-[1240px]">
        {(eyebrow || title || lead) && (
          <div className="max-w-3xl">
            {eyebrow ? (
              <Reveal>
                <div className="label-mono">{eyebrow}</div>
              </Reveal>
            ) : null}
            {title ? (
              <Reveal delay={70}>
                <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]">
                  {title}
                </h2>
              </Reveal>
            ) : null}
            {lead ? (
              <Reveal delay={140}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {lead}
                </p>
              </Reveal>
            ) : null}
          </div>
        )}
        {children ? <div className={title ? "mt-14" : ""}>{children}</div> : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Cards
 * ------------------------------------------------------------------ */

export function Card({
  index,
  title,
  line,
  items,
  delay = 0,
}: {
  index?: string;
  title: string;
  line?: string;
  items?: readonly string[];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="hover-lift sheen group h-full rounded-[16px] border border-border bg-background p-7 hover:border-accent/40">
        {index ? (
          <div className="label-mono transition-colors duration-300 group-hover:text-accent">
            {index}
          </div>
        ) : null}
        <h3 className="display mt-4 text-[1.45rem] leading-tight">{title}</h3>
        {line ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{line}</p>
        ) : null}
        {items?.length ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {items.map((i) => (
              <li
                key={i}
                className="rounded-full border border-border px-3 py-1 text-[0.72rem] text-muted-foreground transition-all duration-300 group-hover:border-accent/30 group-hover:text-foreground"
              >
                {i}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Reveal>
  );
}

export function CardGrid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const map = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  } as const;
  return <div className={`grid gap-5 ${map[cols]}`}>{children}</div>;
}

/* ------------------------------------------------------------------ *
 * Numbered timeline (approach, process)
 * ------------------------------------------------------------------ */

export function StepList({
  steps,
}: {
  steps: readonly { index: string; title: string; line: string }[];
}) {
  return (
    <ol className="border-t border-border">
      {steps.map((s, i) => (
        <Reveal key={s.index} delay={i * 60}>
          <li className="group grid gap-3 border-b border-border py-7 transition-colors duration-300 hover:bg-elevated md:grid-cols-[6rem_14rem_1fr] md:items-baseline md:px-4">
            <span className="label-mono transition-colors duration-300 group-hover:text-accent">
              {s.index}
            </span>
            <h3 className="display text-[1.4rem] transition-transform duration-500 group-hover:translate-x-1">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.line}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ *
 * Key/value fact table (legal + studio details)
 * ------------------------------------------------------------------ */

export function FactTable({
  rows,
}: {
  rows: readonly { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="overflow-hidden rounded-[16px] border border-border">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid gap-1 px-6 py-4 transition-colors duration-300 hover:bg-elevated md:grid-cols-[16rem_1fr] ${
            i ? "border-t border-border" : ""
          }`}
        >
          <dt className="label-mono">{r.label}</dt>
          <dd className="text-sm text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ *
 * Closing band for sub pages
 * ------------------------------------------------------------------ */

export function CtaBand({
  title,
  line,
  cta = "Start a Project",
}: {
  title: string;
  line?: string;
  cta?: string;
}) {
  return (
    <section className="ocean anim-drift relative overflow-hidden border-t border-border px-5 py-24 md:px-8">
      <div className="relative mx-auto max-w-[900px] text-center">
        <Reveal>
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05]">{title}</h2>
        </Reveal>
        {line ? (
          <Reveal delay={90}>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">{line}</p>
          </Reveal>
        ) : null}
        <Reveal delay={170}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryCta to="/contact">{cta}</PrimaryCta>
            <Link
              to="/capabilities"
              className="hover-lift rounded-[10px] border border-border bg-background px-6 py-3.5 text-sm font-medium"
            >
              See capabilities
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
