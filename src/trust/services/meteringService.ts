/**
 * NEW FILE — Usage metering for billing (Stripe / Metronome integration point).
 */
import type { TrustModuleKey } from "../types.js";

interface MeterKey {
  tenantId: string;
  module: TrustModuleKey;
}

const counts = new Map<string, number>();

function key(m: MeterKey) {
  return `${m.tenantId}::${m.module}`;
}

export function recordApiCall(tenantId: string, module: TrustModuleKey) {
  const k = key({ tenantId, module });
  counts.set(k, (counts.get(k) ?? 0) + 1);
}

export function getUsage(tenantId: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, v] of counts) {
    if (k.startsWith(`${tenantId}::`)) out[k.split("::")[1] ?? k] = v;
  }
  return out;
}
