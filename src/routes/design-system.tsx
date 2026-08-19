import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, PageHeader } from "@/components/qb/Shell";
import { ArrowButton, ArrowLink } from "@/components/qb/Button";
import { APPROACH, CAPABILITIES } from "@/lib/site";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — QB Billing Solution" },
      {
        name: "description",
        content:
          "Internal reference for QB Billing Solution: palettes, typography systems, components, motion tokens and cursor states.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Design System — QB Billing Solution" },
      { property: "og:description", content: "Internal design reference." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/design-system" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/design-system" }],
  }),
  component: DesignSystemPage,
});

const PALETTES = [
  { id: "a", label: "A — Obsidian / Oxide" },
  { id: "b", label: "B — Midnight / Cobalt" },
  { id: "c", label: "C — Warm Black / Verdigris" },
];

const TYPE_SYSTEMS = [
  { id: "a", label: "A — Editorial serif + Geist + Geist Mono" },
  { id: "b", label: "B — Cormorant + Geist + IBM Plex Mono" },
  { id: "c", label: "C — Cormorant + Geist + Geist Mono" },
];

const TOKENS = [
  ["--color-bg", "background"],
  ["--color-surface", "surface"],
  ["--color-text", "foreground"],
  ["--color-muted", "muted-foreground"],
  ["--color-accent", "accent"],
  ["--color-border", "border"],
];

const MOTION = [
  ["micro", "180ms"],
  ["short", "300ms"],
  ["medium", "500ms"],
  ["long", "800ms"],
  ["cinematic", "1200ms"],
];

function DesignSystemPage() {
  const [palette, setPalette] = useState("a");
  const [type, setType] = useState("a");

  useEffect(() => {
    document.documentElement.dataset["theme"] = palette;
    document.documentElement.dataset["type"] = type;
    return () => {
      document.documentElement.dataset["theme"] = "a";
      document.documentElement.dataset["type"] = "a";
    };
  }, [palette, type]);

  return (
    <Page>
      <PageHeader
        index="Internal / Design system"
        title="Design system"
        lead="Switch palette and typography to compare identities live. Remove this route before production launch."
      />

      <section className="space-y-24 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1600px] space-y-24">
          <Block title="Palette">
            <div className="flex flex-wrap gap-3">
              {PALETTES.map((p) => (
                <Toggle
                  key={p.id}
                  active={palette === p.id}
                  onClick={() => setPalette(p.id)}
                  label={p.label}
                />
              ))}
            </div>
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {TOKENS.map(([token, varName]) => (
                <div key={token} className="bg-background p-5">
                  <div
                    className="mb-4 h-16 border border-border"
                    style={{ background: `var(--${varName})` }}
                  />
                  <div className="label-mono">{token}</div>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Typography">
            <div className="flex flex-wrap gap-3">
              {TYPE_SYSTEMS.map((t) => (
                <Toggle
                  key={t.id}
                  active={type === t.id}
                  onClick={() => setType(t.id)}
                  label={t.label}
                />
              ))}
            </div>
            <div className="mt-10 space-y-6 border border-border p-8">
              <div className="label-mono">System / 001</div>
              <p className="display text-[clamp(2rem,6vw,4.5rem)]">
                We build the technology your business becomes.
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                Sans is used for body, navigation, buttons and functional copy. Mono
                carries labels, coordinates and system metadata. Serif is reserved for
                statements.
              </p>
            </div>
          </Block>

          <Block title="Buttons">
            <div className="flex flex-wrap items-center gap-6">
              <ArrowLink to="/contact">Start a project</ArrowLink>
              <ArrowLink to="/work" variant="line">
                View work
              </ArrowLink>
              <ArrowButton variant="line" arrow="→">
                Continue
              </ArrowButton>
            </div>
          </Block>

          <Block title="Cards & rows">
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {CAPABILITIES.slice(0, 3).map((c) => (
                <div key={c.id} className="bg-background p-8">
                  <div className="label-mono">{c.index}</div>
                  <div className="display mt-6 text-2xl">{c.title}</div>
                  <p className="mt-4 text-sm text-muted-foreground">{c.line}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Motion tokens">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-5">
              {MOTION.map(([k, v]) => (
                <div key={k} className="bg-background p-6">
                  <div className="label-mono">{k}</div>
                  <div className="mt-3 font-mono text-sm text-foreground">{v}</div>
                </div>
              ))}
            </div>
            <div className="label-mono mt-6">
              Easing: out · in-out · expo · spring
            </div>
          </Block>

          <Block title="Cursor states">
            <div className="flex flex-wrap gap-3">
              {["ring", "VIEW", "OPEN", "READ", "START ↗", "DRAG ↔"].map((c) => (
                <span
                  key={c}
                  data-cursor={c}
                  className="border border-border px-5 py-3 label-mono"
                >
                  {c}
                </span>
              ))}
            </div>
          </Block>

          <Block title="Sequence">
            <ol className="grid gap-px border border-border bg-border sm:grid-cols-7">
              {APPROACH.map((a) => (
                <li key={a.index} className="bg-background p-5">
                  <div className="label-mono">{a.index}</div>
                  <div className="mt-3 text-sm uppercase tracking-[0.12em]">{a.title}</div>
                </li>
              ))}
            </ol>
          </Block>
        </div>
      </section>
    </Page>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-mono mb-8 text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border px-5 py-3 text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-300"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border)",
        color: active ? "var(--accent)" : "var(--muted-foreground)",
      }}
    >
      {label}
    </button>
  );
}
