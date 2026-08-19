import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-between gap-8 overflow-hidden border px-6 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300";

export function ArrowLink({
  to,
  children,
  variant = "solid",
  arrow = "↗",
  className,
  cursor,
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "line";
  arrow?: string;
  className?: string;
  cursor?: string;
  onClick?: () => void;
}) {
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-accent"
      : variant === "ghost"
        ? "border-transparent px-0 text-foreground hover:text-accent"
        : "border-border text-foreground hover:border-accent hover:text-accent";

  return (
    <Link
      to={to}
      onClick={onClick}
      data-cursor={cursor}
      className={cn(base, styles, className)}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="block transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-2 group-hover:-translate-y-1">
        {arrow}
      </span>
    </Link>
  );
}

export function ArrowButton({
  children,
  onClick,
  variant = "solid",
  arrow = "↗",
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "line";
  arrow?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-accent"
      : "border-border text-foreground hover:border-accent hover:text-accent";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="ring"
      className={cn(base, styles, disabled && "opacity-40", className)}
    >
      <span>{children}</span>
      <span className="transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-2 group-hover:-translate-y-1">
        {arrow}
      </span>
    </button>
  );
}
