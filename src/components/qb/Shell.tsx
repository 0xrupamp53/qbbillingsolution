import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PrimaryCta } from "./home";
import { Reveal } from "./motion-primitives";

export function PageHeader({
  index,
  title,
  lead,
}: {
  index: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div
        className="anim-drift pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-5 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="anim-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {index}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.02]">
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {lead}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={240}>
          <div className="mt-8 flex justify-center">
            <PrimaryCta to="/contact">Start a Project</PrimaryCta>
          </div>
        </Reveal>
      </div>
    </header>
  );
}


export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Page>
      <PageHeader index="Legal" title={title} />
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-2xl space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:label-mono [&_h2]:text-foreground [&_strong]:text-foreground">
          {children}
        </div>
      </section>
    </Page>
  );
}
