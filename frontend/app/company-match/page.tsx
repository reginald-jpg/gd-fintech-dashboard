"use client";

import { useState } from "react";
import { apiBaseUrl } from "../../lib/apiBase";

type MatchResponse = {
  company: string;
  matchedSector: string;
  confidence: number;
  savings: {
    annualSavingsUsd: number;
    savingsBand: string;
    narrative: string;
  };
  visibleFields: string[];
  trustFeatures: string[];
  riskModel: string;
  supportsBankingDemo: boolean;
  notes?: string;
};

export default function CompanyMatchPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!name.trim()) {
      setError("Please enter a company name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl()}/company/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Match failed");
      }

      const data: MatchResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Company → Sector Matcher
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Type a company name to see how the engine classifies it, which trust
          features apply, and the estimated savings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 md:flex-row md:items-center"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Home Depot, FedEx, John Deere"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? "Matching…" : "Match"}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Classification
            </h2>
            <p className="mt-2 text-xs text-slate-400">Matched sector</p>
            <p className="text-lg font-medium text-slate-50">
              {result.matchedSector}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Confidence:{" "}
              <span className="font-semibold text-cyan-300">
                {(result.confidence * 100).toFixed(0)}%
              </span>
            </p>
            {result.notes && (
              <p className="mt-3 text-xs text-slate-300">{result.notes}</p>
            )}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Savings impact
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Estimated annual savings potential:
            </p>
            <p className="text-xl font-semibold text-emerald-300">
              $
              {result.savings.annualSavingsUsd.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {result.savings.savingsBand}
            </p>
            <p className="mt-3 text-xs text-slate-300">
              {result.savings.narrative}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Trust & risk profile
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Risk model:{" "}
              <span className="font-medium text-slate-100">
                {result.riskModel}
              </span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Banking demo:{" "}
              <span className="font-medium">
                {result.supportsBankingDemo ? "Enabled" : "Not primary"}
              </span>
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Trust features activated for this classification:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-slate-200">
              {result.trustFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-slate-200">
            Visible fields in the engine
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            These are the primary data points surfaced for this company in this
            sector.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.visibleFields.map((field) => (
              <span
                key={field}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
