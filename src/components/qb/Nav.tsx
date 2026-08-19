import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CAPABILITIES, COMPANY, APPROACH } from "@/lib/site";

type MenuKey = "capabilities" | "approach" | null;

function Logo() {
  return (
    <Link to="/" aria-label={COMPANY.name} className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-accent text-[0.72rem] font-semibold tracking-tight text-accent-foreground">
        QB
      </span>
      <span className="display truncate text-[1rem] leading-none tracking-tight sm:text-[1.15rem]">
        QB Billing Solution
      </span>
    </Link>
  );
}

export function Nav() {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-[70] border-b border-border bg-background"
      onMouseLeave={() => setMenu(null)}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1690px] items-stretch md:h-[88px]">
        <div className="hidden w-[96px] shrink-0 border-r border-border md:block" />
        <div className="flex min-w-0 items-center border-r border-border px-4 sm:px-5 md:px-8">
          <Logo />
        </div>

        <nav className="hidden items-stretch lg:flex" aria-label="Primary">
          <button
            type="button"
            onMouseEnter={() => setMenu("capabilities")}
            className="flex items-center gap-2 border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Services
            <Chevron open={menu === "capabilities"} />
          </button>
          <Link
            to="/work"
            onMouseEnter={() => setMenu(null)}
            className="flex items-center border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Work
          </Link>
          <Link
            to="/pricing"
            onMouseEnter={() => setMenu(null)}
            className="flex items-center border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Pricing
          </Link>
          <button
            type="button"
            onMouseEnter={() => setMenu("approach")}
            className="flex items-center gap-2 border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Approach
            <Chevron open={menu === "approach"} />
          </button>
          <Link
            to="/studio"
            onMouseEnter={() => setMenu(null)}
            className="flex items-center border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Studio
          </Link>
          <Link
            to="/journal"
            onMouseEnter={() => setMenu(null)}
            className="flex items-center border-r border-border px-7 text-[0.74rem] font-medium uppercase tracking-[0.11em] text-foreground/80 transition-all duration-300 hover:bg-accent/[0.06] hover:text-accent"
          >
            Journal
          </Link>
          {/* decorative rhythm cells, as on the reference */}
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-6 border-r border-border" />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 px-4 sm:px-5 md:px-8">
          <Link
            to="/contact"
            className="group hidden items-center gap-2.5 rounded-[6px] bg-accent px-5 py-3 text-[0.78rem] font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_14px_30px_-16px_oklch(0.2_0.05_275/70%)] md:inline-flex"
          >
            Start a Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="label-mono text-foreground lg:hidden"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>


      {/* Mega menu */}
      <div
        className="absolute inset-x-0 top-full hidden overflow-hidden border-b border-border bg-background lg:block"
        style={{
          maxHeight: menu ? 460 : 0,
          opacity: menu ? 1 : 0,
          transition: "max-height 520ms var(--ease-expo), opacity 260ms ease",
          pointerEvents: menu ? "auto" : "none",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8">
          {menu === "approach" ? (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="label-mono">Approach</div>
                <p className="display mt-4 max-w-xs text-2xl leading-snug">
                  Before we build, <span className="display-italic">we understand.</span>
                </p>
                <Link
                  to="/approach"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-[0.72rem] font-medium text-accent-foreground"
                >
                  See the process →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                {APPROACH.map((s) => (
                  <div key={s.index} className="flex gap-3 text-sm">
                    <span className="label-mono pt-0.5">{s.index}</span>
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.line}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="label-mono">Platform</div>
                <p className="display mt-4 max-w-xs text-2xl leading-snug">
                  {COMPANY.positioning}
                </p>
                <Link
                  to="/capabilities"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-[0.72rem] font-medium text-accent-foreground"
                >
                  Explore services →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8">
                {CAPABILITIES.map((c) => (
                  <div key={c.id}>
                    <div className="label-mono">{c.title}</div>
                    <ul className="mt-3 space-y-1.5">
                      {c.items.map((i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="fixed inset-x-0 top-[72px] z-[69] overflow-hidden border-b border-border bg-background lg:hidden md:top-[88px]"
        style={{
          maxHeight: open ? "80vh" : 0,
          transition: "max-height 520ms var(--ease-expo)",
        }}
      >
        <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
          {[
            { label: "Services", to: "/capabilities" },
            { label: "Work", to: "/work" },
            { label: "Pricing", to: "/pricing" },
            { label: "Approach", to: "/approach" },
            { label: "Studio", to: "/studio" },
            { label: "Journal", to: "/journal" },
            { label: "Start a Project", to: "/contact" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="display border-b border-border py-3 text-2xl last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      className="transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
      aria-hidden
    >
      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
