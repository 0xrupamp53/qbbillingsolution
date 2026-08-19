import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Card, CardGrid, CtaBand, Section, StepList } from "@/components/qb/page-kit";
import { APPROACH, GUARANTEES, STEPS } from "@/lib/site";

const TITLE = "Approach — QB Billing Solution";
const DESCRIPTION =
  "Listen, question, define, design, engineer, launch, evolve — how QB Billing Solution takes a business problem into production software.";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "How we take a business problem into production software.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/approach" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/approach" }],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <Page>
      <PageHeader
        index="03 / Approach"
        title={
          <>
            Before we build,
            <br />
            we understand.
          </>
        }
        lead="Seven stages. Each one exists to remove an expensive assumption before it reaches production."
      />

      <Section
        eyebrow="The seven stages"
        title="A single line from the business problem to the running system."
      >
        <StepList steps={APPROACH} />
      </Section>

      <Section
        tone="muted"
        eyebrow="How it runs"
        title="Three phases of work, one continuous engagement."
      >
        <CardGrid cols={3}>
          {STEPS.map((s, i) => (
            <Card
              key={s.step}
              index={s.step}
              title={s.title}
              line={s.line}
              items={s.stages}
              delay={i * 80}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="What you get"
        title="The commitments behind every engagement."
      >
        <CardGrid cols={3}>
          {GUARANTEES.map((g, i) => (
            <Card key={g.title} title={g.title} line={g.line} delay={i * 60} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Start with the problem, not the specification."
        line="We listen to the business first, then define what actually needs to exist."
      />
    </Page>
  );
}
