import { createFileRoute } from "@tanstack/react-router";
import { Prose } from "@/components/qb/Shell";
import { COMPANY } from "@/lib/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — QB Billing Solution" },
      {
        name: "description",
        content:
          "How this website uses cookies and similar storage, and how to control them.",
      },
      { property: "og:title", content: "Cookie Policy — QB Billing Solution" },
      { property: "og:description", content: "How this website uses cookies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/cookies" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <Prose title="Cookie Policy">
      <p>
        This website is operated by {COMPANY.legalName} (trading as {COMPANY.name}),
        company number {COMPANY.companyNumber}, {COMPANY.jurisdiction.toLowerCase()}.
      </p>
      <h2>Essential storage</h2>
      <p>
        We use a single session storage entry to avoid replaying the intro animation on
        every page load. It contains no personal data and expires when you close the tab.
      </p>
      <h2>Analytics</h2>
      <p>
        Interaction events are recorded to understand how the site is used. Analytics
        tooling is configured before production launch; no third-party marketing cookies
        are set by default.
      </p>
      <h2>Control</h2>
      <p>
        You can clear site storage at any time through your browser settings without
        affecting your ability to use the site.
      </p>
    </Prose>
  ),
});
