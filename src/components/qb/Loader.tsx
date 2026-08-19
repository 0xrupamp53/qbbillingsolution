import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/site";

/** Minimal cinematic loader — first visit only, ~900ms. */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("qb-loaded")) {
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setProgress(1));
    const a = setTimeout(() => setDone(true), 900);
    const b = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("qb-loaded", "1");
    }, 1300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: done ? 0 : 1,
        transition: "opacity 400ms var(--ease-out)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <div className="display text-6xl tracking-tight">{COMPANY.brand}</div>
      <div className="label-mono mt-4">Product / Design / Engineering</div>
      <div className="mt-10 h-px w-40 bg-border">
        <div
          className="h-px bg-accent"
          style={{
            width: `${progress * 100}%`,
            transition: "width 850ms var(--ease-out)",
          }}
        />
      </div>
    </div>
  );
}
