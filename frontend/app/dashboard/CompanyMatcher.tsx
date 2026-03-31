"use client";

import { useState } from "react";

export function CompanyMatcher() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleMatch = async () => {
  if (!input.trim()) return;
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/match`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input }),
      }
    );

    const json = await res.json();

    if (json.error) {
      setError(json.error.message || "Unknown error");
      setResult(null);
      return;
    }

    // Success — store the result
    setResult(json.data);

  } catch {
    setError("Unable to match company right now.");
    setResult(null);

  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Company → Sector Matcher</h2>
      <p className="text-sm text-gray-600">
        Type a company name to see how the engine classifies it, which trust features apply, and the estimated savings.
      </p>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="e.g. Home Depot, FedEx, John Deere"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={handleMatch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded disabled:opacity-50"
        >
          {loading ? "Matching..." : "Match"}
        </button>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {result && (
        <div className="border-t pt-3 space-y-2 text-sm">
          <div><span className="font-semibold">Company:</span> {result.company}</div>
          <div><span className="font-semibold">Sector:</span> {result.sectorName}</div>
          <div><span className="font-semibold">Confidence:</span> {(result.confidence * 100).toFixed(0)}%</div>
          <div><span className="font-semibold">Supports Banking Demo:</span> {result.supportsBankingDemo ? "Yes" : "No"}</div>
          <div><span className="font-semibold">Risk Model:</span> {result.riskModel}</div>
          <div>
            <span className="font-semibold">Visible Fields:</span>{" "}
            {result.visibleFields.join(", ")}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Trust Principles:</span>{" "}
            Liquidity verification: {result.trustPrinciples.liquidityVerification ? "On" : "Off"},{" "}
            Risk scoring: {result.trustPrinciples.riskScoring ? "On" : "Off"},{" "}
            Obligations tracking: {result.trustPrinciples.obligationsTracking ? "On" : "Off"}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Estimated Savings:</span>
            <ul className="list-disc list-inside text-gray-600">
              <li>NSF Prevention: {(result.savings.nsfPrevention * 100).toFixed(0)}%</li>
              <li>Fraud Reduction: {(result.savings.fraudReduction * 100).toFixed(0)}%</li>
              <li>Faster Settlement: {(result.savings.fasterSettlement * 100).toFixed(0)}%</li>
              <li>Operational Efficiency: {(result.savings.operationalEfficiency * 100).toFixed(0)}%</li>
              <li className="font-bold">Total Impact: {(result.savings.totalSavings * 100).toFixed(0)}%</li>
            </ul>
          </div>
          {result.notes?.length > 0 && (
            <ul className="list-disc list-inside text-gray-500">
              {result.notes.map((n: string, idx: number) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
