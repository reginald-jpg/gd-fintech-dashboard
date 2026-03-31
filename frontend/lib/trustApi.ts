import { apiBaseUrl } from "./apiBase";

const API_ROOT = apiBaseUrl().replace(/\/api\/?$/, "");

const trustHeaders = () => ({
  "Content-Type": "application/json",
  "x-tenant-id": "tenant_sandbox",
  "x-trust-region": "US",
});

export async function postVerifyLiquidity(body: {
  accountRef: string;
  requestedAmount: number;
  currency: string;
}) {
  const res = await fetch(`${API_ROOT}/api/v1/verifyLiquidity`, {
    method: "POST",
    headers: trustHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function postE2ELiquidity(body: Record<string, unknown>) {
  const res = await fetch(`${API_ROOT}/api/v1/flows/e2e-liquidity`, {
    method: "POST",
    headers: trustHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
