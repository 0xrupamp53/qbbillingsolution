import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Clip-path text/content reveal. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "span" | "p" | "li" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal-mask ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Line-by-line display reveal for large statements. */
export function DisplayLines({
  lines,
  className = "",
  step = 130,
  startDelay = 0,
  immediate = false,
}: {
  lines: string[];
  className?: string;
  step?: number;
  startDelay?: number;
  immediate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const show = immediate ? mounted : inView;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <span
            className="block will-change-transform"
            style={{
              transform: show ? "translateY(0)" : "translateY(105%)",
              opacity: show ? 1 : 0,
              transition: `transform 900ms var(--ease-expo) ${startDelay + i * step}ms, opacity 700ms var(--ease-out) ${startDelay + i * step}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Rolling number counter. */
export function Counter({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
