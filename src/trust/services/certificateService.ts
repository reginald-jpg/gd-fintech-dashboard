/**
 * NEW FILE — Digitally signed verification artefacts (replace HMAC with cloud KMS / ed25519 in production).
 */
import crypto from "node:crypto";
import type { VerificationCertificateBase } from "../types.js";

function signingSecret(): string {
  return process.env.TRUST_SIGNING_SECRET ?? "sandbox-trust-secret-change-me";
}

export function signPayload(payload: Record<string, unknown>): {
  signature: string;
  algorithm: string;
  keyId: string;
} {
  const body = JSON.stringify(payload);
  const sig = crypto.createHmac("sha256", signingSecret()).update(body).digest("base64url");
  return {
    signature: sig,
    algorithm: "HMAC-SHA256",
    keyId: process.env.TRUST_SIGNING_KEY_ID ?? "sandbox-local-key"
  };
}

export function buildCertificate(
  partial: Omit<VerificationCertificateBase, "certificateId" | "issuedAt" | "expiresAt"> & {
    ttlSeconds?: number;
  }
): VerificationCertificateBase & { signature: string; algorithm: string; keyId: string } {
  const now = Date.now();
  const ttl = partial.ttlSeconds ?? 900;
  const issuedAt = new Date(now).toISOString();
  const expiresAt = new Date(now + ttl * 1000).toISOString();
  const certificateId = `cert_${crypto.randomBytes(12).toString("hex")}`;
  const base: VerificationCertificateBase = {
    certificateId,
    kind: partial.kind,
    tenantId: partial.tenantId,
    subjectRef: partial.subjectRef,
    issuedAt,
    expiresAt,
    attestation: partial.attestation
  };
  const { signature, algorithm, keyId } = signPayload(base as unknown as Record<string, unknown>);
  return { ...base, signature, algorithm, keyId };
}
