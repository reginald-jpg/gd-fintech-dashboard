// frontend/components/CompanySearch.tsx
'use client';

import { useState } from 'react';
import { CompanyMatchResponse, matchCompany } from '../lib/api';

interface Props {
  defaultCompanyName?: string;
  defaultIndustryId?: string;
}

export function CompanySearch({ defaultCompanyName = '', defaultIndustryId }: Props) {
  const [companyName, setCompanyName] = useState(defaultCompanyName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompanyMatchResponse | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await matchCompany(companyName, defaultIndustryId);
      setResult(data);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Company name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Stripe, Acme Payments"
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !companyName.trim()}
          className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </form>

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-gray-700 bg-gray-900/80 p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Matched sector</p>
              <p className="text-lg font-semibold text-gray-100">
                {result.matchedIndustryName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-gray-400">Confidence</p>
              <p className="text-lg font-semibold text-emerald-400">
                {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md bg-gray-950/60 p-3 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-400">Estimated savings</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                ${result.estimatedAnnualSavings.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-gray-400">{result.savingsNotes}</p>
            </div>

            <div className="rounded-md bg-gray-950/60 p-3 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-400">Trust & risk</p>
              <p className="mt-1 text-sm font-medium text-gray-100">
                Risk: <span className="capitalize">{result.trust.riskLevel}</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">{result.trust.rationale}</p>
              <p className="mt-1 text-xs text-gray-500">
                Data freshness: {result.trust.dataFreshnessDays} days
              </p>
            </div>

            <div className="rounded-md bg-gray-950/60 p-3 border border-gray-800">
              <p className="text-xs uppercase tracking-wide text-gray-400">Model notes</p>
              <ul className="mt-1 space-y-1 text-xs text-gray-300">
                {result.notes.map((note, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Company: <span className="font-mono text-gray-300">{result.companyName}</span>
          </p>
        </div>
      )}
    </div>
  );
}
