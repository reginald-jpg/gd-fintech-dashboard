"use client";

import { useEffect, useState } from "react";

type Industry = {
  id: string;
  name: string;
  description?: string;
};

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

const SAMPLE_COMPANIES: Record<string, string> = {
  Retail: "Home Depot",
  "Transportation & Logistics": "FedEx",
  Agriculture: "John Deere",
  Manufacturing: "Caterpillar",
  Healthcare: "UnitedHealth Group",
  Technology: "Microsoft",
};

export default function DemoPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Industry | null>(null);
  const [match, setMatch] = useState<MatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load all industries
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8080/api/intel/sectors");
        if (!res.ok) throw new Error("Failed to load industries");
        const data = await res.json();
        setIndustries(data);
      } catch (err: any) {
        setError(err.message || "Failed to load industries");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Run demo for selected sector
  async function runDemo(industry: Industry) {
    setSelected(industry);
    setMatch(null);
    setError(null);

    const sampleName =
      SAMPLE_COMPANIES[industry.name] || `${industry.name} Holdings`;

    try {
      const res = await fetch("http://localhost:8080/api/company/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sampleName }),
      });

      if (!res.ok) throw new Error("Demo match failed");

      const data = await res.json();
      setMatch(data);
    } catch (err: any) {
      setError(err.message || "Demo failed");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Demo Mode</h1>
        <p className="mt-2 text-sm text-slate-400">
          Click a sector to auto‑load a representative company and run it
          through the intelligence engine.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-400">Loading sectors…</p>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {/* Sector Grid */}
      <div className="grid gap-3 md:grid-cols-3">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => runDemo(industry)}
            className={`rounded-xl border p-3 text-left text-sm transition ${
              selected?.id === industry.id
                ? "border-cyan-400 bg-slate-900/60 shadow-cyan-500/20"
                : "border-slate-800 bg-slate-900/40 hover:border-cyan-400/70 hover:-translate-y-0.5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-100">{industry.name}</span>
              {selected?.id === industry.id && (
                <span className="text-xs text-cyan-300">Selected</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Demo Result */}
      {match && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200">
            Demo Result
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Classification */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-semibold text-slate-200">
                Classification
              </h3>
              <p className="mt-2 text-xs text-slate-400">Company</p>
              <p className="text-lg font-medium text-slate-50">
                {match.company}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Sector:{" "}
                <span className="font-semibold text-cyan-300">
                  {match.matchedSector}
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Confidence:{" "}
                <span className="font-semibold text-cyan-300">
                  {(match.confidence * 100).toFixed(0)}%
                </span>
              </p>
            </div>

            {/* Savings */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-semibold text-slate-200">
                Savings Impact
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Estimated annual savings:
              </p>
              <p className="text-xl font-semibold text-emerald-300">
                $
                {match.savings.annualSavingsUsd.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {match.savings.savingsBand}
              </p>
              <p className="mt-3 text-xs text-slate-300">
                {match.savings.narrative}
              </p>
            </div>

            {/* Trust & Risk */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="text-sm font-semibold text-slate-200">
                Trust & Risk Profile
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Risk model:{" "}
                <span className="font-medium text-slate-100">
                  {match.riskModel}
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Banking demo:{" "}
                <span className="font-medium">
                  {match.supportsBankingDemo ? "Enabled" : "Not primary"}
                </span>
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Trust features:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-200">
                {match.trustFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visible Fields */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Visible Fields
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {match.visibleFields.map((field) => (
                <span
                  key={field}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
