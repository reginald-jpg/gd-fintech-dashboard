/**
 * NEW FILE — Append-only audit trail (maps to SOC2/ISO logging expectations; ship to SIEM in prod).
 */
import type { TenantContext } from "../types.js";

export interface AuditRecord {
  id: string;
  ts: string;
  tenantId: string;
  correlationId: string;
  eventType: string;
  payload: Record<string, unknown>;
}

const memoryLog: AuditRecord[] = [];
const MAX_MEMORY = 5000;

export function appendAudit(ctx: TenantContext, eventType: string, payload: Record<string, unknown>): AuditRecord {
  const rec: AuditRecord = {
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    ts: new Date().toISOString(),
    tenantId: ctx.tenantId,
    correlationId: ctx.correlationId,
    eventType,
    payload
  };
  memoryLog.unshift(rec);
  if (memoryLog.length > MAX_MEMORY) memoryLog.pop();
  return rec;
}

export function queryAudit(params: {
  tenantId: string;
  limit?: number;
  eventType?: string;
}): AuditRecord[] {
  const limit = Math.min(params.limit ?? 50, 200);
  return memoryLog
    .filter((r) => r.tenantId === params.tenantId)
    .filter((r) => (params.eventType ? r.eventType === params.eventType : true))
    .slice(0, limit);
}
