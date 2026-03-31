/**
 * NEW FILE — Unified verification graph (patent-relevant: entity edges + risk propagation).
 * Sandbox: in-memory; production: graph DB / analytical store.
 */
import crypto from "node:crypto";

export type GraphEntityType = "CUSTOMER" | "ACCOUNT" | "MERCHANT" | "VENDOR" | "RWA" | "CLAIM" | "PAYOUT" | "CORRIDOR";

export interface GraphEdge {
  id: string;
  from: { type: GraphEntityType; ref: string };
  to: { type: GraphEntityType; ref: string };
  relation: "TRANSACTED_WITH" | "VERIFIED" | "ISSUED_BY" | "SETTLED_VIA" | "INSURED_BY";
  riskWeight: number;
  createdAt: string;
}

const edges: GraphEdge[] = [];

export function recordEdge(edge: Omit<GraphEdge, "id" | "createdAt">): GraphEdge {
  const full: GraphEdge = {
    ...edge,
    id: crypto.randomBytes(8).toString("hex"),
    createdAt: new Date().toISOString()
  };
  edges.push(full);
  return full;
}

export function trustScoreForEntity(ref: string): { score: number; factors: string[] } {
  const relevant = edges.filter((e) => e.from.ref === ref || e.to.ref === ref);
  const risk = relevant.reduce((acc, e) => acc + e.riskWeight, 0);
  const score = Math.max(0, Math.min(100, 100 - Math.min(80, risk)));
  return {
    score,
    factors: relevant.length ? [`graph-degree:${relevant.length}`, `risk-sum:${risk}`] : ["no-graph-edges"]
  };
}

export function exportGraphSnapshot(): { edges: GraphEdge[] } {
  return { edges: [...edges] };
}
