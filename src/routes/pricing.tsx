import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Card, CardGrid, CtaBand, Section } from "@/components/qb/page-kit";

const TITLE = "Pricing — QB Billing Solution";
const DESCRIPTION =
  "Premium product engineering, digital systems and growth engagements, with clear starting investment ranges.";

const ENGAGEMENTS = [
  {
    index: "01 / Discover",
    title: "Find the right thing to build.",
    line: "A focused period of discovery, product strategy and technical definition that turns an ambiguous opportunity into a buildable plan.",
    price: "$20k–$40k",
    items: ["Business discovery", "Product strategy", "Technical feasibility"],
  },
  {
    index: "02 / Build",
    title: "Bring a serious product to market.",
    line: "A senior team across product, design and engineering taking a validated idea through design, build and launch.",
    price: "$75k–$200k",
    items: ["MVP or core platform", "Product design", "Launch-ready engineering"],
  },
  {
    index: "03 / Scale",
    title: "Make the system ready for growth.",
    line: "Ongoing product, platform and infrastructure work for businesses that need more capability without compromising reliability.",
    price: "$15k–$40k / month",
    items: ["Embedded senior team", "Platform evolution", "Monitoring and scale"],
  },
] as const;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <Page>
      <PageHeader
        index="06 / Pricing"
        title={
          <>
            Serious work needs
            <br />
            serious investment.
          </>
        }
        lead="We work with businesses where the system matters. These ranges show the level of investment to expect before we understand the opportunity in detail."
      />

      <Section
        eyebrow="Starting investment"
        title="Choose the level of partnership the problem demands."
        lead="Every engagement is tailored, but the standard is consistent: senior people, thoughtful design and engineering that holds up in production."
      >
        <CardGrid cols={3}>
          {ENGAGEMENTS.map((engagement, i) => (
            <Card
              key={engagement.index}
              index={engagement.index}
              title={engagement.title}
              line={engagement.line}
              items={engagement.items}
              delay={i * 70}
            />
          ))}
        </CardGrid>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ENGAGEMENTS.map((engagement) => (
            <div key={engagement.price} className="border-t border-accent pt-4">
              <div className="label-mono text-accent">From</div>
              <div className="display mt-2 text-2xl">{engagement.price}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="What changes the number"
        title="Scope follows the consequence of getting it right."
      >
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          <div>
            <h3 className="display text-2xl">The shape of the system</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Integrations, user roles, data complexity, automation and infrastructure all affect
              the work required.
            </p>
          </div>
          <div>
            <h3 className="display text-2xl">The level of certainty</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              A clear brief can move quickly into build. An uncertain opportunity benefits from
              discovery before a larger commitment.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Let's talk about the right level of investment."
        line="Tell us what you are trying to make possible and we will recommend the most sensible starting point."
      />
    </Page>
  );
}
