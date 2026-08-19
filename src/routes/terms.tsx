import { createFileRoute } from "@tanstack/react-router";
import { Prose } from "@/components/qb/Shell";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — QB Billing Solution" },
      {
        name: "description",
        content:
          "Terms governing use of the QB Billing Solution website and enquiries made through it.",
      },
      { property: "og:title", content: "Terms of Service — QB Billing Solution" },
      { property: "og:description", content: "Terms governing use of this website." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <Prose title="Terms of Service">
      <p>
        This website is operated by <strong>{COMPANY.legalName}</strong>, trading as{" "}
        {COMPANY.name}, company number {COMPANY.companyNumber}, a{" "}
        {COMPANY.structure.toLowerCase()} {COMPANY.jurisdiction.toLowerCase()}.
      </p>
      <h2>Company details</h2>
      <ul>
        <li>Registered name: {COMPANY.legalName}</li>
        <li>Trading name: {COMPANY.name}</li>
        <li>Company number: {COMPANY.companyNumber}</li>
        <li>Incorporated under the {COMPANY.statute} on {COMPANY.incorporationDate}</li>
        <li>Certified by {COMPANY.registrar}, {COMPANY.registryOffice}</li>
        <li>{COMPANY.structure}. {COMPANY.registeredOfficeSituation}</li>
      </ul>

      <h2>Use of the site</h2>
      <p>
        Content is provided for general information. Nothing on this website constitutes
        a contractual offer, quotation or professional advice.
      </p>
      <h2>Enquiries</h2>
      <p>
        Submitting a project brief does not create an engagement. Work begins only under
        a separately agreed written contract and statement of work.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The design, code and content of this website belong to the company unless stated
        otherwise. Project intellectual property is allocated by contract.
      </p>
      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of Scotland and subject to the jurisdiction
        of the Scottish courts.
      </p>
    </Prose>
  ),
});
