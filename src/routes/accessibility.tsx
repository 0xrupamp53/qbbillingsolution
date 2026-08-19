import { createFileRoute } from "@tanstack/react-router";
import { Prose } from "@/components/qb/Shell";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — QB Billing Solution" },
      {
        name: "description",
        content:
          "Our accessibility commitments: reduced-motion support, keyboard navigation, semantic structure and contrast standards.",
      },
      { property: "og:title", content: "Accessibility — QB Billing Solution" },
      { property: "og:description", content: "Our accessibility commitments." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/accessibility" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <Prose title="Accessibility">
      <p>
        We build for WCAG 2.2 AA as a baseline, on this website and in the products we
        ship for clients.
      </p>
      <h2>Motion</h2>
      <p>
        When your system requests reduced motion, parallax, the custom cursor, smooth
        scrolling and long transitions are disabled. No information is conveyed by motion
        alone.
      </p>
      <h2>Structure and input</h2>
      <p>
        Pages use semantic landmarks and a single heading hierarchy. All interactive
        elements are reachable and operable by keyboard with visible focus.
      </p>
      <h2>Feedback</h2>
      <p>
        If any part of this site creates a barrier for you, tell us through the project
        intake and we will fix it.
      </p>
    </Prose>
  ),
});
