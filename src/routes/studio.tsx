import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/qb/Shell";
import { Card, CardGrid, CtaBand, FactTable, Section } from "@/components/qb/page-kit";
import { Reveal } from "@/components/qb/motion-primitives";
import { COMPANY, PRINCIPLES } from "@/lib/site";

const TITLE = "Studio — QB Billing Solution";
const DESCRIPTION =
  "QB Billing Solution is a product engineering studio registered in Scotland, working across product, design and engineering.";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: "Small enough to care. Serious enough to build.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/studio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/studio" }],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <Page>
      <PageHeader
        index="04 / Studio"
        title={
          <>
            Small enough to care.
            <br />
            Serious enough to build.
          </>
        }
        lead="One team across product, design and engineering. Team profiles publish as the studio grows — we do not use stock portraits."
      />

      <Section
        eyebrow="What we believe"
        title="Good businesses often run on bad systems."
        lead="The work is rarely a lack of ambition. It's the spreadsheet, the inbox and the manual step holding everything together."
      >
        <CardGrid cols={2}>
          {PRINCIPLES.map((p, i) => (
            <Card key={p.label} index={p.label} title={p.quote} delay={i * 70} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="muted" eyebrow="Legal identity" title="Who we are, on the record.">
        <FactTable
          rows={[
            { label: "Registered name", value: COMPANY.legalName },
            { label: "Trading name", value: COMPANY.name },
            { label: "Company number", value: COMPANY.companyNumber },
            { label: "Structure", value: COMPANY.structure },
            { label: "Jurisdiction", value: COMPANY.jurisdiction },
            {
              label: "Incorporated",
              value: `${COMPANY.incorporationDate}, under the ${COMPANY.statute}`,
            },
            {
              label: "Registrar",
              value: `${COMPANY.registrar}, ${COMPANY.registryOffice}`,
            },
          ]}
        />
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {COMPANY.registeredOfficeSituation} Certified details are taken directly from
            our certificate of incorporation.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="You don't need to become a technology company to use technology as an advantage."
        line="That's the part we take responsibility for."
      />
    </Page>
  );
}
