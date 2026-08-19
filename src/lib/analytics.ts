type Payload = Record<string, string | number | boolean | undefined>;

/**
 * Lightweight event tracker. Pushes to a dataLayer if a provider is present,
 * otherwise buffers events on window for later forwarding.
 */
export function track(event: string, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    __qbEvents?: Array<{ event: string; payload: Payload; ts: number }>;
  };
  const record = { event, payload, ts: Date.now() };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push(record);
  w.__qbEvents = [...(w.__qbEvents ?? []), record].slice(-100);
}
