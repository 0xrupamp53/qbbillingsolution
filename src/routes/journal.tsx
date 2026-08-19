import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { CtaBand, Section } from "@/components/qb/page-kit";
import { Reveal } from "@/components/qb/motion-primitives";
import { JOURNAL_POSTS } from "@/components/qb/sections";

const TITLE = "Journal — QB Billing Solution";
const DESCRIPTION =
  "Notes on product engineering, digital systems, design and applied AI from the QB Billing Solution studio.";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "Notes on product, design, engineering and applied AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/journal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

function JournalPage() {
  const categories = ["All", ...new Set(JOURNAL_POSTS.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const posts = JOURNAL_POSTS.filter((p) => active === "All" || p.category === active);
  const [featured, ...rest] = posts;

  return (
    <Page>
      <PageHeader
        index="05 / Journal"
        title="Journal"
        lead="Short pieces on how businesses and software actually fit together."
      />

      <Section eyebrow="Writing">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`hover-lift rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-300 ${
                active === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured ? (
          <Reveal>
            <article className="hover-lift sheen mt-10 rounded-[18px] border border-border bg-background p-8 md:p-12">
              <div className="label-mono">{featured.category} / Featured</div>
              <h2 className="display mt-5 max-w-3xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="label-mono mt-8">{featured.date}</div>
            </article>
          </Reveal>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <article className="hover-lift sheen group h-full rounded-[16px] border border-border bg-background p-7 hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="label-mono transition-colors duration-300 group-hover:text-accent">
                    {p.category}
                  </span>
                  <span className="label-mono">{p.date}</span>
                </div>
                <h3 className="display mt-4 text-[1.4rem] leading-tight transition-transform duration-500 group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a system that should work better than it does?"
        line="Start with the problem — we'll take it from there."
      />
    </Page>
  );
}
