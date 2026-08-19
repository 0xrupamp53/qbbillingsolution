import { useState } from "react";
import { z } from "zod";
import { ArrowButton } from "./Button";
import { COMPANY } from "@/lib/site";
import { track } from "@/lib/analytics";

const BUILD_TYPES = [
  "New product",
  "Web application",
  "Mobile application",
  "SaaS",
  "Internal system",
  "AI product",
  "Automation",
  "Existing product",
  "Not sure",
];
const STAGES = ["Idea", "Prototype", "MVP", "Launched", "Scaling", "Existing system"];
const BUDGETS = ["Under £5k", "£5k–£15k", "£15k–£30k", "£30k–£75k", "£75k+", "Not sure"];
const TIMELINES = [
  "Immediately",
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "Exploring",
];

export const intakeSchema = z.object({
  buildType: z.string().min(1),
  business: z.string().min(10),
  problem: z.string().min(10),
  stage: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
});

type Intake = z.infer<typeof intakeSchema>;

const BLUEPRINT = [
  "Product",
  "Business",
  "Problem",
  "Stage",
  "Investment",
  "Timeline",
  "Contact",
];

const empty: Intake = {
  buildType: "",
  business: "",
  problem: "",
  stage: "",
  budget: "",
  timeline: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
};

export function Intake() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Intake>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Intake>(k: K, v: Intake[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const complete = [
    !!data.buildType,
    data.business.length > 9,
    data.problem.length > 9,
    !!data.stage,
    !!data.budget,
    !!data.timeline,
    !!data.name && !!data.email,
  ];

  const next = () => {
    track("project_step_completed", { step: step + 1 });
    setStep((s) => Math.min(6, s + 1));
  };

  const submit = () => {
    const parsed = intakeSchema.safeParse(data);
    if (!parsed.success) {
      setError("Please complete the required fields with valid details.");
      return;
    }
    setError(null);
    track("project_submitted", { budget: data.budget, stage: data.stage });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-border bg-surface p-10 md:p-16">
        <div className="label-mono">Brief received</div>
        <h2 className="display mt-8 text-[clamp(2rem,5vw,4rem)]">We have the brief.</h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          We'll review it and come back with the next step.
        </p>
        {COMPANY.contactEmail ? (
          <a
            href={`mailto:${COMPANY.contactEmail}`}
            onClick={() => track("email_clicked")}
            className="label-mono mt-10 inline-block text-accent"
          >
            Book a Discovery Call ↗
          </a>
        ) : (
          <p className="label-mono mt-10">
            Discovery scheduling link pending configuration.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-px border border-border bg-border lg:grid-cols-[1.4fr_1fr]">
      <div className="bg-background p-8 md:p-14">
        <div className="label-mono">Step {String(step + 1).padStart(2, "0")} / 07</div>

        <div className="mt-10 min-h-[320px]">
          {step === 0 && (
            <Question title="What are you trying to build?">
              <Options
                options={BUILD_TYPES}
                value={data.buildType}
                onChange={(v) => set("buildType", v)}
              />
            </Question>
          )}
          {step === 1 && (
            <Question title="Tell us about the business.">
              <Area
                value={data.business}
                onChange={(v) => set("business", v)}
                placeholder="What the business does, who it serves, how it makes money."
              />
            </Question>
          )}
          {step === 2 && (
            <Question title="What's broken today?">
              <Area
                value={data.problem}
                onChange={(v) => set("problem", v)}
                placeholder="The process, tool or constraint that costs you time or growth."
              />
            </Question>
          )}
          {step === 3 && (
            <Question title="Where are you today?">
              <Options options={STAGES} value={data.stage} onChange={(v) => set("stage", v)} />
            </Question>
          )}
          {step === 4 && (
            <Question title="What investment range are you considering?">
              <Options options={BUDGETS} value={data.budget} onChange={(v) => set("budget", v)} />
            </Question>
          )}
          {step === 5 && (
            <Question title="When would you like to begin?">
              <Options
                options={TIMELINES}
                value={data.timeline}
                onChange={(v) => set("timeline", v)}
              />
            </Question>
          )}
          {step === 6 && (
            <Question title="Where should we reach you?">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" value={data.name} onChange={(v) => set("name", v)} />
                <Field
                  label="Company"
                  value={data.company ?? ""}
                  onChange={(v) => set("company", v)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={data.email}
                  onChange={(v) => set("email", v)}
                />
                <Field label="Phone" value={data.phone ?? ""} onChange={(v) => set("phone", v)} />
                <Field
                  label="Website"
                  value={data.website ?? ""}
                  onChange={(v) => set("website", v)}
                />
                <Field
                  label="LinkedIn"
                  value={data.linkedin ?? ""}
                  onChange={(v) => set("linkedin", v)}
                />
              </div>
            </Question>
          )}
        </div>

        {error ? <p className="label-mono mt-6 text-accent">{error}</p> : null}

        <div className="mt-12 flex items-center gap-4">
          <ArrowButton
            variant="line"
            arrow="←"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </ArrowButton>
          {step < 6 ? (
            <ArrowButton arrow="→" onClick={next} disabled={!complete[step]}>
              Continue
            </ArrowButton>
          ) : (
            <ArrowButton onClick={submit} disabled={!complete[6]}>
              Send brief
            </ArrowButton>
          )}
        </div>

        <div className="mt-10 h-px w-full bg-border">
          <div
            className="h-px bg-accent transition-all duration-700 [transition-timing-function:var(--ease-expo)]"
            style={{ width: `${((step + 1) / 7) * 100}%` }}
          />
        </div>
      </div>

      <aside className="bg-surface p-8 md:p-14">
        <div className="label-mono">Project / 001</div>
        <div className="mt-10 space-y-5">
          {BLUEPRINT.map((b, i) => (
            <div key={b} className="flex items-center gap-4">
              <span
                className="flex h-6 w-6 items-center justify-center border text-[0.6rem]"
                style={{
                  borderColor: complete[i] ? "var(--accent)" : "var(--border)",
                  color: complete[i] ? "var(--accent)" : "var(--muted-foreground)",
                }}
              >
                {complete[i] ? "✓" : ""}
              </span>
              <span
                className="label-mono"
                style={{ color: complete[i] ? "var(--foreground)" : undefined }}
              >
                {b}
              </span>
              {i < BLUEPRINT.length - 1 ? (
                <span className="ml-auto h-px w-10 bg-border" />
              ) : null}
            </div>
          ))}
        </div>
        <p className="label-mono mt-14 leading-relaxed">
          The blueprint completes as your brief does.
        </p>
      </aside>
    </div>
  );
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="display text-[clamp(1.6rem,3.4vw,2.6rem)]">{title}</h2>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Options({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className="border px-5 py-3 text-[0.7rem] uppercase tracking-[0.14em] transition-all duration-400 [transition-timing-function:var(--ease-expo)]"
            style={{
              borderColor: active ? "var(--accent)" : "var(--border)",
              color: active ? "var(--accent)" : "var(--muted-foreground)",
              opacity: value && !active ? 0.5 : 1,
              transform: active ? "scale(1.03)" : "scale(1)",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Area({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={6}
      className="w-full resize-none border border-border bg-transparent p-5 text-sm leading-relaxed text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-accent"
    />
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors duration-300 focus:border-accent"
      />
    </label>
  );
}
