import { createFileRoute } from "@tanstack/react-router";
import { LegalContact, Prose } from "@/components/qb/Shell";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — QB Billing Solution" },
      {
        name: "description",
        content:
          "How QBBILLINGSOLUTION LTD collects, uses and protects personal data submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy — QB Billing Solution" },
      { property: "og:description", content: "How we handle personal data." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <Prose title="Privacy Policy">
      <p>
        This policy explains how <strong>{COMPANY.legalName}</strong> (trading as{" "}
        {COMPANY.name}, company number {COMPANY.companyNumber},{" "}
        {COMPANY.jurisdiction.toLowerCase()}) handles personal data collected through
        this website.
      </p>
      <h2>Data controller</h2>
      <p>
        The data controller is {COMPANY.legalName}, a {COMPANY.structure.toLowerCase()}{" "}
        incorporated under the {COMPANY.statute} on {COMPANY.incorporationDate} and
        certified by {COMPANY.registrar} at {COMPANY.registryOffice} under company number{" "}
        {COMPANY.companyNumber}. {COMPANY.registeredOfficeSituation}
      </p>

      <h2>What we collect</h2>
      <p>
        Information you submit through the project intake: name, company, email, phone,
        website, and the descriptions you provide about your business and requirements.
        We also collect basic technical data such as pages viewed and referral source.
      </p>
      <h2>Why we collect it</h2>
      <p>
        To respond to your enquiry, assess project fit, and maintain a record of business
        correspondence. We do not sell personal data.
      </p>
      <h2>Retention</h2>
      <p>
        Enquiry records are retained for as long as needed to manage the commercial
        relationship, then deleted.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data.
        Contact details for data requests are published in the site's company contact
        details.
      </p>
      <LegalContact />
    </Prose>
  ),
});
