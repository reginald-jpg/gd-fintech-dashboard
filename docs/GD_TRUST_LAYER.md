# GD Fintech — Global Trust Layer (Liquidity Verification & Trust Infrastructure)

**README / living blueprint** for the non-custodial trust layer integrated into this monorepo.  
**Legal:** Framework names (SOC 2, PCI DSS, GDPR, etc.) describe *alignment targets*; formal attestation requires independent audit and counsel.

---

## 1. Unified system blueprint

### 1.1 Product boundary (non-custodial)

- The platform **never custodies or moves funds**. It emits **verifications, risk signals, policy decisions, and signed attestations** only.
- Integration points: banks, payment networks, insurers, lottery operators, enterprises, governments, RWA issuers, ATM/POS switches, ISO 8583 / ISO 20022 message flows.

### 1.2 Logical architecture

| Layer | Responsibility |
| --- | --- |
| **API** | Versioned REST (`/api/v1/...`), OAuth2 / API keys, rate limits, validation |
| **Domain services** | Liquidity verify, PoF, scoring, checkout, RWA, insurance, lottery, ISO adapters, E2E flows |
| **Compliance & policy** | Region packs (`src/trust/config/regions.ts`), pre-checks (`complianceEngine`) |
| **Trust graph** | Entity edges + scores (`trustGraphService`; replace with graph store in prod) |
| **Certificates** | HMAC-signed artefacts (`certificateService`; swap for KMS + asymmetric keys in prod) |
| **Audit / metering** | In-memory audit in sandbox; Prisma models for tenant/API keys/modules for production path |
| **Observability** | Existing `pino-http` request logging; add Prometheus exporters + trace IDs in hardening phase |

### 1.3 Multi-tenancy & isolation

- **HTTP:** `x-tenant-id` required (or defaulted in sandbox).  
- **DB:** `Tenant`, `TrustApiKey`, `TenantTrustModule` in `prisma/schema.prisma` (apply migrations before relying on DB-backed RBAC).  
- **Data residency:** `dataResidency` on `Tenant`; enforcement is **not** implemented in sandbox—add region-scoped storage + routing in production.

### 1.4 Modular features (toggle per tenant)

Module keys match `TrustModuleKey` in `src/trust/types.ts`. Use:

```bash
npx tsx scripts/toggle-trust-modules.ts <tenantSlug> <MODULE_KEY> on|off
```

---

## 2. Backend skeleton (this repo)

| Area | Location |
| --- | --- |
| **Routes** | `src/routes/trustLayerRoutes.ts` |
| **Controllers** | `src/controllers/trustLayerController.ts` |
| **Trust module** | `src/trust/**` |
| **Compliance** | `src/trust/config/regions.ts`, `src/trust/services/complianceEngine.ts` |
| **Entry** | `src/server.ts` → `createApp()` in `src/app.ts` |

**Existing liquidity passport** (`src/routes/liquidityPassport.ts`, `liquidityPassportController.ts`) is **unchanged**; Trust Layer complements it with productized verification endpoints and certificates.

---

## 3. API draft (implemented under `/api/v1`)

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/api/v1/verifyLiquidity` | Real-time liquidity attestation |
| `POST` | `/api/v1/proofOfFunds` | PoF + signed certificate |
| `GET` | `/api/v1/liquidityScore` | `?accountRef=` |
| `POST` | `/api/v1/checkoutVerify` | Merchant / payer session |
| `GET` | `/api/v1/auditLog` | Sandbox: in-memory log |
| `POST` | `/api/v1/rwa/verify` | RWA integrity |
| `POST` | `/api/v1/atm/verify` | ISO 8583 subset → normalized verify |
| `POST` | `/api/v1/interbank/verify` | ISO 20022 subset |
| `POST` | `/api/v1/insurance/claimVerify` | Insurance claim path |
| `POST` | `/api/v1/lottery/payoutVerify` | Gaming / lottery path |
| `POST` | `/api/v1/flows/e2e-liquidity` | Demo orchestration |

**Headers:** `x-tenant-id`, optional `x-trust-region`, optional `x-trust-modules` (comma list), `x-api-key` or `Authorization: Bearer` when `TRUST_SANDBOX_MODE=false`.  
OpenAPI: `/docs` (Swagger UI) plus `src/config/openapi.ts`.

---

## 4. Integration plan (migration ledger)

| Item | Type | Notes |
| --- | --- | --- |
| `src/trust/**` | **NEW** | Trust Layer domain |
| `src/routes/trustLayerRoutes.ts` | **NEW** | Wired under `/api/v1` |
| `src/controllers/trustLayerController.ts` | **NEW** | HTTP handlers |
| `src/app.ts` | **EXTENDED** | `trustLayerRouter`, legacy `/api/industry`, `/api/company`, mock-mode |
| `src/server.ts` | **REFACTORED** | Single process via `createApp()` (was standalone Express) |
| `prisma/schema.prisma` | **EXTENDED** | `Tenant`, `TrustApiKey`, `TenantTrustModule` |
| `prisma/seed.ts` | **EXTENDED** | Sandbox `Tenant` |
| `src/config/openapi.ts` | **EXTENDED** | Trust paths |
| `src/config/env.ts` | **EXTENDED** | Trust-related env vars |
| `scripts/toggle-trust-modules.ts` | **NEW** | Module toggles |
| `sdk/node/*` | **NEW** | Node SDK template |
| `docs/GD_TRUST_LAYER.md` | **NEW** | This document |
| `frontend/app/trust-lab/page.tsx` | **NEW** (optional UI) | API smoke / demo |
| `frontend/components/SideNav.tsx` | **EXTENDED** | Nav link |
| `src/controllers/industryIntelligenceController.ts` | **EXTENDED** | Restored exports for `/api/v1` industryintel routes |
| Industry / company / intel route imports | **EXTENDED** | ESM `.js` specifiers for `tsc` |

**Breaking change:** Anything that depended on `server.ts` *not* using `createApp()` (e.g. expecting missing Helmet/Swagger) now runs the **full** app stack on `npm run dev`. Behavior of `/api/industry` and `/api/company` is preserved.

**SAFE TO DELETE (optional):** `frontend/app/New Text Document.txt` — accidental file, not part of Trust Layer.

---

## 5. Sample end-to-end flow

**HTTP:**

```http
POST /api/v1/flows/e2e-liquidity
x-tenant-id: tenant_sandbox
x-trust-region: US
Content-Type: application/json

{
  "accountRef": "acc_demo_1",
  "amount": 500,
  "currency": "USD",
  "extendInsurance": { "claimId": "clm_1", "policyId": "pol_1", "claimedAmount": 500 },
  "extendLottery": { "ticketId": "tkt_1", "drawId": "drw_1", "payoutAmount": 100, "licenseeRef": "mer_lottery_demo" }
}
```

**Sequence:** `verifyLiquidity` → `proofOfFunds` (certificate) → optional insurance + lottery verifications → verification graph snapshot → audit events appended.

---

## 6. Optional UI structure

- **`/trust-lab`:** developer-facing panel calling Trust APIs (see `frontend/app/trust-lab/page.tsx`).
- Suggested production modules: **Tenant admin** (modules, keys, residency), **Verification explorer** (audit + certificates), **Policy / governance** (versioned rules—extend `src/data/governance.ts` patterns).

---

## 7. Environment

| Variable | Purpose |
| --- | --- |
| `TRUST_SANDBOX_MODE` | Default allows demo without API key (`false` enforces key) |
| `TRUST_SIGNING_SECRET` | HMAC secret for certificates (use KMS in prod) |
| `TRUST_SIGNING_KEY_ID` | Key id metadata on signatures |
| `DATABASE_URL` | Required for Prisma (tenant seed / future persistence) |

---

## 8. CI/CD, security hardening (next steps)

- Add integration tests with supertest + ephemeral DB.  
- Wire audit sink to **immutable storage** + SIEM.  
- Replace in-memory graph with **TigerGraph / Neo4j / Neptune** (pick per deployment).  
- **PCI:** keep PAN out of logs; only masked/BIN + tokens in ISO 8583 path.  
- **TLS / mTLS** for bank-facing connectors; **WAF** + **per-tenant rate limits** at gateway.

---

## 9. Patent & IP anchors (for counsel — not legal advice)

Subject-matter suitable for **claim drafting** (novelty/non-obviousness must be investigated):

1. Non-custodial **liquidity verification** without settlement liability.  
2. **Bank-to-bank** (or PSP) verification orchestration with region-specific policy packs.  
3. **ATM / POS** liquidity validation using ISO 8583 normalization + sub-second policy path.  
4. **Insurance claim** and **lottery payout** verification with shared fraud / compliance graph.  
5. **Risk-weighted transaction validation** using unified graph scores.  
6. **Unified verification graph** + dynamic trust scoring across corridors and asset classes.  
7. **Token-to-asset integrity** (RWA) with jurisdiction and valuation hooks.

---

## 10. Quickstart

```bash
npm install
npx prisma migrate dev   # applies Tenant models
npm run prisma:seed
npm run dev                # API :8080
npm test                   # includes trust unit tests
```

**UI:** `cd frontend && npm run dev` — open `/trust-lab`.

---

**SDK:** See `sdk/node` for a minimal Node client template (`@gd-fintech/trust-sdk-node`).
