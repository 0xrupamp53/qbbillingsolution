import { Link } from "@tanstack/react-router";
import { CAPABILITIES, COMPANY, LEGAL_NAV, NAV } from "@/lib/site";

const SOCIALS = [
  { label: "LinkedIn", glyph: "in", href: "#" },
  { label: "X", glyph: "X", href: "#" },
  { label: "YouTube", glyph: "▶", href: "#" },
  { label: "Instagram", glyph: "◎", href: "#" },
];

export function Footer() {
  return (
    <footer className="ocean relative">
      <div className="mx-auto max-w-[1500px] px-0 md:px-10">
        <div className="rounded-t-[18px] bg-background px-5 pb-8 pt-14 md:rounded-[18px] md:px-12 md:pb-10 md:pt-16">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-accent text-[0.72rem] font-semibold text-accent-foreground">
                  QB
                </span>
                <span className="display text-[1.3rem] leading-none">QB Billing Solution</span>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {COMPANY.positioning}
              </p>
            </div>

            <div>
              <div className="label-mono">Capabilities</div>
              <ul className="mt-5 space-y-3">
                {CAPABILITIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/capabilities"
                      className="text-[0.95rem] text-muted-foreground inline-block transition-all duration-300 hover:translate-x-1 hover:text-accent"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label-mono">General</div>
              <ul className="mt-5 space-y-3">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className="text-[0.95rem] text-muted-foreground inline-block transition-all duration-300 hover:translate-x-1 hover:text-accent"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/contact"
                    className="text-[0.95rem] text-muted-foreground inline-block transition-all duration-300 hover:translate-x-1 hover:text-accent"
                  >
                    Start a project
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="label-mono">Legal</div>
              <ul className="mt-5 space-y-3">
                {LEGAL_NAV.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className="text-[0.95rem] text-muted-foreground inline-block transition-all duration-300 hover:translate-x-1 hover:text-accent"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {COMPANY.contactEmail ? (
                <a
                  href={`mailto:${COMPANY.contactEmail}`}
                  className="mt-5 block text-[0.95rem] text-accent"
                >
                  {COMPANY.contactEmail}
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-16">
            <div className="label-mono">Socials</div>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-elevated text-[0.8rem] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-[0.78rem] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
            </span>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground">
              <span>{COMPANY.structure}</span>
              <span className="text-border">|</span>
              <span>{COMPANY.jurisdiction}</span>
              <span className="text-border">|</span>
              <span>Company No. {COMPANY.companyNumber}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
