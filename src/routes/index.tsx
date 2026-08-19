import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/qb/Nav";
import { Footer } from "@/components/qb/Footer";
import {
  AssuranceGrid,
  ClosingCta,
  FaqChat,
  FeatureTabs,
  Hero,
  HowItWorks,
  Innovation,
  Insights,
  Integrations,
  PrincipleCarousel,
  StatsRow,
  Statement,
  TechStrip,
  TrustRow,
} from "@/components/qb/home";
import { COMPANY } from "@/lib/site";

const TITLE = "QB Billing Solution — Product Engineering & Digital Systems";
const DESCRIPTION =
  "QB Billing Solution designs and engineers custom digital products, software platforms, AI systems and business technology for ambitious businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY.legalName,
          alternateName: COMPANY.name,
          description: DESCRIPTION,
          foundingDate: "2026-08-18",
          address: {
            "@type": "PostalAddress",
            streetAddress: COMPANY.registeredAddress.address,
            addressLocality: COMPANY.registeredAddress.city,
            addressRegion: COMPANY.registeredAddress.region,
            postalCode: COMPANY.registeredAddress.postalCode,
            addressCountry: "GB",
          },
          email: COMPANY.contactEmail,
          telephone: COMPANY.contactPhone,
          identifier: COMPANY.companyNumber,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Product engineering and digital systems",
          provider: { "@type": "Organization", name: COMPANY.legalName },
          areaServed: "GB",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <StatsRow />
        <Statement />
        <HowItWorks />
        <FeatureTabs />
        <AssuranceGrid />
        <PrincipleCarousel />
        <TrustRow />
        <Integrations />
        <Innovation />
        <FaqChat />
        <Insights />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
