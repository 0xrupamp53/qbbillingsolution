import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Intake } from "@/components/qb/Intake";
import { Card, CardGrid, Section } from "@/components/qb/page-kit";
import { COMPANY } from "@/lib/site";

const TITLE = "Start a Project — QB Billing Solution";
const DESCRIPTION =
  "Tell us what you're trying to make possible. A short guided brief that helps us understand the business, the problem and the system to build.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "You don't need a perfect brief. Start with the problem.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Page>
      <PageHeader
        index="07 / Contact"
        title={
          <>
            Tell us what you're
            <br />
            trying to make possible.
          </>
        }
        lead="You don't need a perfect brief. Start with the problem."
      />

      <Section eyebrow="Project brief">
        <Intake />
      </Section>

      <Section tone="muted" eyebrow="What happens next" title="Three steps, no sales process.">
        <CardGrid cols={3}>
          <Card
            index="01"
            title="We read the brief"
            line="A person reads it — not a scoring form. We look at the business first."
          />
          <Card
            index="02"
            title="A short conversation"
            line="Thirty minutes to understand the problem, the constraints and the timeline."
            delay={70}
          />
          <Card
            index="03"
            title="A defined next step"
            line="Either a scoped piece of work, or an honest answer that we're not the right fit."
            delay={140}
          />
        </CardGrid>
        {COMPANY.contactEmail ? (
          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            <p>
              Prefer email?{" "}
              <a className="sweep-link text-accent" href={`mailto:${COMPANY.contactEmail}`}>
                {COMPANY.contactEmail}
              </a>
            </p>
            <p>
              Call us at{" "}
              <a className="sweep-link text-accent" href={`tel:${COMPANY.contactPhone}`}>
                {COMPANY.contactPhone}
              </a>
            </p>
          </div>
        ) : null}
      </Section>
    </Page>
  );
}
