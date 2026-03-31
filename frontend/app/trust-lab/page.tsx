"use client";

import { useState } from "react";
import { postE2ELiquidity, postVerifyLiquidity } from "../../lib/trustApi";

export default function TrustLabPage() {
  const [out, setOut] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function runLiquidity() {
    setLoading(true);
    setOut("");
    try {
      const j = await postVerifyLiquidity({
        accountRef: "acc_ui_demo",
        requestedAmount: 250,
        currency: "USD",
      });
      setOut(JSON.stringify(j, null, 2));
    } catch (e) {
      setOut(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function runE2e() {
    setLoading(true);
    setOut("");
    try {
      const j = await postE2ELiquidity({
        accountRef: "acc_ui_demo",
        amount: 250,
        currency: "USD",
        extendInsurance: {
          claimId: "clm_ui",
          policyId: "pol_ui",
          claimedAmount: 250,
        },
      });
      setOut(JSON.stringify(j, null, 2));
    } catch (e) {
      setOut(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-semibold text-cyan-300 mb-2">Trust Layer Lab</h1>
      <p className="text-slate-400 text-sm mb-6 max-w-2xl">
        Optional UI for the non-custodial Global Trust Layer. Ensure the API is running on{" "}
        <code className="text-cyan-200">localhost:8080</code> or set{" "}
        <code className="text-cyan-200">NEXT_PUBLIC_API_URL</code>.
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          type="button"
          onClick={runLiquidity}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 text-sm font-medium"
        >
          POST verifyLiquidity
        </button>
        <button
          type="button"
          onClick={runE2e}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-cyan-700 text-cyan-200 hover:bg-slate-900 disabled:opacity-50 text-sm font-medium"
        >
          POST flows/e2e-liquidity
        </button>
      </div>
      <pre className="text-xs bg-slate-900/80 border border-slate-800 rounded-xl p-4 overflow-auto max-h-[70vh] whitespace-pre-wrap">
        {loading ? "Loading…" : out || "Response will appear here."}
      </pre>
    </main>
  );
}
