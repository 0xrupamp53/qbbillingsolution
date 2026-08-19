import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Card, CardGrid, CtaBand, Section } from "@/components/qb/page-kit";
import { Reveal } from "@/components/qb/motion-primitives";
import { CAPABILITIES, TECHNOLOGY } from "@/lib/site";

const TITLE = "Services — QB Billing Solution";
const DESCRIPTION =
  "Product strategy, design, software engineering, AI and infrastructure — delivered by one team from discovery to launch.";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "Product, design, engineering, intelligence and infrastructure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/capabilities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/capabilities" }],
  }),
  component: CapabilitiesPage,
});

function CapabilitiesPage() {
  return (
    <Page>
      <PageHeader
        index="02 / Services"
        title={
          <>
            What we
            <br />
            build.
          </>
        }
        lead="Five disciplines, one team. We move from finding the right thing to build through to running it reliably in production."
      />

      <Section
        eyebrow="The five layers"
        title="One accountable team across every layer of the system."
        lead="Each layer is a discipline in its own right. We run them together so nothing gets handed over and lost."
      >
        <CardGrid cols={3}>
          {CAPABILITIES.map((c, i) => (
            <Card
              key={c.id}
              index={c.index}
              title={c.title}
              line={c.line}
              items={c.items}
              delay={i * 70}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="muted"
        eyebrow="Intelligence"
        title="AI where it changes an outcome — not where it decorates a screen."
        lead="Agents, automation and retrieval are engineered into the workflow: applied to the decisions and routine steps that quietly consume your team's capacity."
      >
        <CardGrid cols={3}>
          <Card
            title="Applied AI"
            line="Models embedded into the operational path, with evaluation and guardrails."
            delay={0}
          />
          <Card
            title="Agents & automation"
            line="Routine work removed from your team, with a full audit trail behind it."
            delay={70}
          />
          <Card
            title="RAG over your knowledge"
            line="Reasoning grounded in your own documents, data and operating history."
            delay={140}
          />
        </CardGrid>
      </Section>

      <Section
        eyebrow="Technology"
        title="Proven tools, chosen for the problem."
        lead="We pick technology after we understand the business, never before."
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-[16px] border border-border md:grid-cols-4 lg:grid-cols-7">
          {TECHNOLOGY.map((t, i) => (
            <Reveal key={t} delay={i * 35}>
              <div className="sheen flex h-24 items-center justify-center border-b border-r border-border text-sm text-muted-foreground transition-all duration-500 hover:bg-elevated hover:text-accent">
                <span className="transition-transform duration-500 hover:scale-110">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Tell us the problem. We'll define the system."
        line="You don't need a finished brief — start with what isn't working."
      />
    </Page>
  );
}
