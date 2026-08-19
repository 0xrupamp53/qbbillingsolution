import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Card, CardGrid, CtaBand, Section } from "@/components/qb/page-kit";

const TITLE = "Work — QB Billing Solution";
const DESCRIPTION =
  "Selected product engineering work from QB Billing Solution: platforms, SaaS, AI systems and internal software.";

const ENGAGEMENTS = [
  {
    index: "Build",
    title: "New products",
    line: "From a business problem to a live product: discovery, definition, design, engineering and launch as one piece of work.",
    items: ["Discovery", "MVP", "Launch"],
  },
  {
    index: "Extend",
    title: "Existing teams",
    line: "We join an in-house team and add the product, design or engineering capacity that's missing, without slowing delivery down.",
    items: ["Embedded", "Design system", "Platform work"],
  },
  {
    index: "Evolve",
    title: "Ongoing systems",
    line: "We stay responsible for what we ship — monitoring, security, iteration and scale as the business grows into the system.",
    items: ["Maintenance", "Scale", "Iteration"],
  },
] as const;

const DOMAINS = [
  { title: "Operations platforms", line: "Replacing the spreadsheet, the inbox and the manual step." },
  { title: "SaaS products", line: "Multi-tenant products built on typed, maintainable foundations." },
  { title: "Internal tooling", line: "Software your team actually wants to open every morning." },
  { title: "Intelligent workflows", line: "AI and automation applied to real operational decisions." },
] as const;

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "Selected product engineering and digital systems work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <Page>
      <PageHeader
        index="01 / Work"
        title={
          <>
            Selected
            <br />
            work.
          </>
        }
        lead="Our project index is being prepared for publication. We publish work only with client consent, and we never display projects we did not build."
      />

      <Section
        eyebrow="Engagements"
        title="Three ways we work with a business."
        lead="Every engagement is run by one accountable team across product, design and engineering."
      >
        <CardGrid cols={3}>
          {ENGAGEMENTS.map((e, i) => (
            <Card
              key={e.title}
              index={e.index}
              title={e.title}
              line={e.line}
              items={e.items}
              delay={i * 80}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="muted"
        eyebrow="Where we work"
        title="The systems businesses actually run on."
      >
        <CardGrid cols={4}>
          {DOMAINS.map((d, i) => (
            <Card key={d.title} title={d.title} line={d.line} delay={i * 60} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Case studies publish as engagements complete."
        line="Ask us for a private walkthrough of the systems relevant to your business."
        cta="Request a walkthrough"
      />
    </Page>
  );
}
