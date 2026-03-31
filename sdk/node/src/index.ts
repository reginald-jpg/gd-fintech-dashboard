/**
 * NEW FILE — Node.js SDK template for GD Trust Layer (fetch-based).
 */
import { randomUUID } from "node:crypto";

export type TrustRegion = "US" | "EU" | "APAC" | "LATAM" | "HIGH_RISK";

export interface GdTrustClientOptions {
  baseUrl: string;
  tenantId: string;
  apiKey?: string;
  region?: TrustRegion;
  fetchFn?: typeof fetch;
}

export class GdTrustClient {
  private readonly baseUrl: string;
  private readonly tenantId: string;
  private readonly apiKey?: string;
  private readonly region: TrustRegion;
  private readonly fetchFn: typeof fetch;

  constructor(opts: GdTrustClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, "");
    this.tenantId = opts.tenantId;
    this.apiKey = opts.apiKey;
    this.region = opts.region ?? "US";
    this.fetchFn = opts.fetchFn ?? fetch;
  }

  private headers(extra?: Record<string, string>) {
    const h: Record<string, string> = {
      "Content-Type": "application/json",
      "x-tenant-id": this.tenantId,
      "x-trust-region": this.region,
      "x-correlation-id": randomUUID(),
      ...extra
    };
    if (this.apiKey) h["x-api-key"] = this.apiKey;
    return h;
  }

  async verifyLiquidity(body: {
    accountRef: string;
    requestedAmount: number;
    currency: string;
    counterpartyRef?: string;
  }) {
    const res = await this.fetchFn(`${this.baseUrl}/api/v1/verifyLiquidity`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`verifyLiquidity failed: ${res.status}`);
    return res.json();
  }

  async proofOfFunds(body: Parameters<GdTrustClient["verifyLiquidity"]>[0] & { holderName?: string }) {
    const res = await this.fetchFn(`${this.baseUrl}/api/v1/proofOfFunds`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`proofOfFunds failed: ${res.status}`);
    return res.json();
  }

  async auditLog(params?: { limit?: number; eventType?: string }) {
    const q = new URLSearchParams();
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.eventType) q.set("eventType", params.eventType);
    const res = await this.fetchFn(`${this.baseUrl}/api/v1/auditLog?${q}`, { headers: this.headers() });
    if (!res.ok) throw new Error(`auditLog failed: ${res.status}`);
    return res.json();
  }
}
