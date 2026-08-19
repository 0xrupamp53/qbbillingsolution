import { useEffect, useRef, useState } from "react";

/** Contextual cursor. Desktop pointer devices only, respects reduced motion. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [ring, setRing] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!t) {
        setLabel(null);
        setRing(false);
        return;
      }
      const c = t.dataset["cursor"];
      setLabel(c && c !== "ring" ? c : null);
      setRing(true);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 76 : ring ? 44 : 7;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden items-center justify-center rounded-full mix-blend-difference md:flex"
      style={{
        width: size,
        height: size,
        background: label ? "var(--accent)" : "var(--paper)",
        mixBlendMode: label ? "normal" : "difference",
        transition: "width 380ms var(--ease-expo), height 380ms var(--ease-expo)",
      }}
    >
      {label ? (
        <span
          className="label-mono px-1 text-center leading-tight"
          style={{ color: "var(--accent-foreground)", fontSize: "0.5rem" }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
