import { useEffect, useRef, useState } from "react";

const NODES = [
  { id: "customers", label: "CUSTOMERS", x: 18, y: 20 },
  { id: "data", label: "DATA", x: 78, y: 16 },
  { id: "process", label: "PROCESS", x: 12, y: 62 },
  { id: "product", label: "PRODUCT", x: 84, y: 60 },
  { id: "operations", label: "OPERATIONS", x: 48, y: 86 },
];

const CENTER = { x: 50, y: 48 };
const STAGES = ["BUSINESS", "PLATFORM", "SYSTEM", "SCALE"];

/** Hero system visualisation: fragmented nodes assemble as the user scrolls. */
export function SystemField() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = window.innerHeight;
        setP(Math.max(0, Math.min(1, y / (h * 1.2))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))];

  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[540px]">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={30 - p * 6}
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.15"
        />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={18 + p * 4}
          fill="none"
          stroke="var(--support)"
          strokeWidth="0.15"
          opacity="0.5"
        />
        {NODES.map((n, i) => {
          const nx = n.x + (CENTER.x - n.x) * p * 0.55;
          const ny = n.y + (CENTER.y - n.y) * p * 0.55;
          return (
            <g key={n.id}>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={nx}
                y2={ny}
                stroke="var(--accent)"
                strokeWidth="0.18"
                strokeDasharray="60"
                strokeDashoffset={60 - p * 60}
                opacity={0.25 + p * 0.55}
              />
              <circle
                cx={nx}
                cy={ny}
                r={0.9 + p * 0.5}
                fill="var(--accent)"
                opacity={0.5 + p * 0.5}
              />
              <text
                x={nx}
                y={ny - 3}
                textAnchor="middle"
                fill="var(--muted-foreground)"
                style={{
                  fontFamily: "var(--font-mono-family)",
                  fontSize: 2.1,
                  letterSpacing: 0.2,
                  opacity: 0.4 + (i % 2) * 0.1 + p * 0.4,
                }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={2 + p * 1.4}
          fill="var(--foreground)"
          opacity="0.9"
        />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-accent" />
        <span
          key={stage}
          className="label-mono text-foreground"
          style={{ animation: "none" }}
        >
          {stage}
        </span>
      </div>
    </div>
  );
}

/** Very low opacity architectural background field. */
export function ArchitecturalField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-field absolute inset-0 opacity-40" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]">
        <line x1="12%" y1="0" x2="12%" y2="100%" stroke="var(--foreground)" strokeWidth="1" />
        <line x1="88%" y1="0" x2="88%" y2="100%" stroke="var(--foreground)" strokeWidth="1" />
        <line x1="0" y1="82%" x2="100%" y2="82%" stroke="var(--foreground)" strokeWidth="1" />
      </svg>
      <div className="label-mono absolute left-[13%] top-[18%] opacity-40">51.5°N / 0.1°W</div>
      <div className="label-mono absolute right-[9%] top-[62%] opacity-40">NODE / 004</div>
    </div>
  );
}
