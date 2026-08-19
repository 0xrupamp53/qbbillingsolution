export const COMPANY = {
  brand: "QB",
  name: "QB Billing Solution",
  legalName: "QBBILLINGSOLUTION LTD",
  companyNumber: "899567",
  structure: "Private company limited by shares",
  jurisdiction: "Registered in Scotland",
  incorporated: "Incorporated 18 August 2026",
  incorporationDate: "18 August 2026",
  registrar: "The Registrar of Companies for Scotland",
  registryOffice: "Companies House, Edinburgh",
  statute: "Companies Act 2006",
  registeredOfficeSituation: "The situation of its registered office is in Scotland.",
  descriptor: "Product Engineering / Digital Systems",
  positioning:
    "We design and engineer the digital products, software and intelligent systems that help businesses operate, sell and scale.",
  contactEmail: import.meta.env["VITE_CONTACT_EMAIL"] ?? "info@qbbillingsolution.com",
  contactPhone: "+1 18005767798",
  registeredAddress: {
    country: "United Kingdom of Great Britain and Northern Ireland",
    city: "Kirkcaldy",
    address: "63 Orkney Pl",
    region: "Fife",
    postalCode: "KY1 3DZ",
  },
} as const;

export const NAV = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/capabilities" },
  { label: "Approach", to: "/approach" },
  { label: "Studio", to: "/studio" },
  { label: "Journal", to: "/journal" },
] as const;

export const LEGAL_NAV = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
  { label: "Accessibility", to: "/accessibility" },
] as const;

export const CAPABILITIES = [
  {
    id: "product",
    index: "01",
    title: "Product",
    line: "Find the right thing to build.",
    items: [
      "Discovery",
      "Strategy",
      "Requirements",
      "MVP definition",
      "Technical feasibility",
    ],
  },
  {
    id: "design",
    index: "02",
    title: "Design",
    line: "Make complex things feel simple.",
    items: ["UX", "UI", "Design systems", "Prototyping", "Interaction"],
  },
  {
    id: "engineering",
    index: "03",
    title: "Engineering",
    line: "Make it real.",
    items: ["Web", "Mobile", "SaaS", "Backend", "APIs", "Platforms"],
  },
  {
    id: "intelligence",
    index: "04",
    title: "Intelligence",
    line: "Give software the ability to think.",
    items: ["AI", "Agents", "Automation", "RAG", "Intelligent workflows"],
  },
  {
    id: "infrastructure",
    index: "05",
    title: "Infrastructure",
    line: "Make it reliable.",
    items: ["Cloud", "Security", "DevOps", "Monitoring", "Scale"],
  },
  {
    id: "digital-marketing",
    index: "06",
    title: "Digital Marketing",
    line: "Help the right people find you.",
    items: ["SEO", "Content strategy", "Paid media", "Social media", "Analytics"],
  },
] as const;

export const APPROACH = [
  { index: "01", title: "Listen", line: "Understand the business before the brief." },
  {
    index: "02",
    title: "Question",
    line: "Challenge assumptions before they become expensive.",
  },
  { index: "03", title: "Define", line: "Establish what actually needs to exist." },
  { index: "04", title: "Design", line: "Make the system understandable." },
  {
    index: "05",
    title: "Engineer",
    line: "Build it for real users and real conditions.",
  },
  { index: "06", title: "Launch", line: "Put it into the world." },
  { index: "07", title: "Evolve", line: "Improve it as the business grows." },
] as const;

export const TECHNOLOGY = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Python",
  "Go",
  "Postgres",
  "Redis",
  "AWS",
  "GCP",
  "Docker",
  "Terraform",
  "OpenAI",
  "Anthropic",
] as const;

/* ------------------------------------------------------------------ *
 * Homepage content blocks
 * ------------------------------------------------------------------ */

export const STATS = [
  {
    value: "01",
    label: "One accountable team",
    line: "Product, design and engineering in the same room, on the same system.",
  },
  {
    value: "05",
    label: "Capability layers",
    line: "Product, design, engineering, intelligence and infrastructure.",
  },
  {
    value: "07",
    label: "Stages to production",
    line: "Listen, question, define, design, engineer, launch, evolve.",
  },
  {
    value: "24/7",
    label: "Systems that keep running",
    line: "Monitored, secured and maintained after launch, not abandoned.",
  },
] as const;

export const STEPS = [
  {
    step: "Step 01",
    title: "Understand",
    line: "We listen to the business before the brief, challenge the assumptions that get expensive later, and define what actually needs to exist.",
    stages: ["Listen", "Question", "Define"],
  },
  {
    step: "Step 02",
    title: "Design & Engineer",
    line: "We make the system understandable, then build it for real users and real conditions — product, interface, backend and infrastructure as one piece of work.",
    stages: ["Design", "Engineer"],
  },
  {
    step: "Step 03",
    title: "Launch & Evolve",
    line: "We put it into the world, stay responsible for what we ship, and improve it as the business grows.",
    stages: ["Launch", "Evolve"],
  },
] as const;

export const FEATURES = [
  {
    id: "feature-1",
    tab: "Product",
    title: "Find the right thing to build, before anyone writes code.",
    line: "Discovery, strategy and requirements that turn a business problem into a defined system — with the feasibility work done up front.",
    points: [
      "Discovery and strategy grounded in how the business actually operates",
      "Requirements and MVP definition that remove expensive assumptions",
      "Technical feasibility assessed before a commitment is made",
    ],
  },
  {
    id: "feature-2",
    tab: "Design",
    title: "Make complex things feel simple.",
    line: "Interfaces and design systems that make a complicated business operation understandable to the people who use it every day.",
    points: [
      "UX and UI designed around real workflows, not screens in isolation",
      "Design systems that keep every surface consistent as the product grows",
      "Prototyping and interaction design tested before build",
    ],
  },
  {
    id: "feature-3",
    tab: "Engineering",
    title: "Make it real.",
    line: "Web, mobile, SaaS platforms, backends and APIs engineered to run in production under real load, with real users.",
    points: [
      "Web, mobile and SaaS products built on typed, maintainable foundations",
      "Backends, APIs and platforms designed to be extended, not replaced",
      "Code we stay accountable for after it ships",
    ],
  },
  {
    id: "feature-4",
    tab: "Intelligence",
    title: "Give software the ability to think.",
    line: "AI, agents and automation applied where they touch a decision someone actually has to make — not bolted on for the sake of it.",
    points: [
      "AI and agents embedded into intelligent workflows, not sitting beside them",
      "Automation of the routine work that quietly consumes your team's capacity",
      "RAG and reasoning over your own operational knowledge",
    ],
  },
  {
    id: "feature-5",
    tab: "Infrastructure",
    title: "Make it reliable.",
    line: "Cloud, security, DevOps, monitoring and scale, so the system holds up as the business grows into it.",
    points: [
      "Cloud infrastructure defined as code and reproducible",
      "Security and monitoring designed in from the first deployment",
      "Scale planned for the load the business will have, not just today's",
    ],
  },
] as const;

export const GUARANTEES = [
  {
    title: "Business-first engineering",
    line: "We understand the problem before choosing the technology.",
  },
  {
    title: "One accountable team",
    line: "Product, design and engineering work together, not in sequence.",
  },
  {
    title: "Built to last",
    line: "We build systems designed to evolve, not to be replaced.",
  },
  {
    title: "Secured by default",
    line: "Security, access control and monitoring built into every deployment.",
  },
  {
    title: "Owned by you",
    line: "Your code, your infrastructure, your data — handed over in full.",
  },
  {
    title: "Accountable after launch",
    line: "We stay responsible for what we ship and improve it over time.",
  },
] as const;

export const PRINCIPLES = [
  {
    quote:
      "Good businesses often run on bad systems. The work is rarely a lack of ambition — it's the spreadsheet, the inbox and the manual step holding everything together.",
    label: "On the problem",
    meta: "QB Billing Solution",
  },
  {
    quote:
      "You bring the business. We build the system. Everything we do sits between those two sentences.",
    label: "On positioning",
    meta: "QB Billing Solution",
  },
  {
    quote:
      "Intelligence is only useful where it touches a decision someone has to make. Everything else is decoration.",
    label: "On intelligence",
    meta: "QB Billing Solution",
  },
  {
    quote:
      "We stay responsible for what we ship. A launch is the start of the relationship, not the end of the engagement.",
    label: "On partnership",
    meta: "QB Billing Solution",
  },
] as const;

export const FAQ = [
  {
    q: "Do we need a finished brief before we talk?",
    a: "No. You don't need a perfect brief — start with the problem. We listen to the business first, then define what actually needs to exist.",
  },
  {
    q: "How do you work with an existing team?",
    a: "Three ways: Build for new products, Extend for existing teams, and Evolve for ongoing product development. Product, design and engineering come as one accountable team.",
  },
  {
    q: "Where does AI fit into what you build?",
    a: "Where it changes an outcome. AI, agents, automation and RAG are engineered into the workflow — applied to the decisions and routine steps that consume your team's capacity.",
  },
  {
    q: "What happens after launch?",
    a: "We put it into the world and improve it as the business grows. Cloud, security, monitoring and scale are maintained, and we stay responsible for what we shipped.",
  },
  {
    q: "Who are you, legally?",
    a: "QB Billing Solution is the trading name of QBBILLINGSOLUTION LTD, a private company limited by shares, registered in Scotland, company number 899567, incorporated under the Companies Act 2006 on 18 August 2026 by the Registrar of Companies for Scotland, Companies House, Edinburgh.",
  },
] as const;
