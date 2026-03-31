// app/engines/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Engine = {
  id: string;
  name: string;
  description: string;
  status: string;
  version: string;
  metrics: { accuracy: number; latencyMs: number; coverage: string };
  inputs: string[];
  outputs: string[];
};

export default function EnginesPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";
  const [q, setQ] = useState("");
  const [engines, setEngines] = useState<Engine[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${apiBase}/engines`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setEngines(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!alive) return;
        setError("Backend unavailable");
      });
    return () => {
      alive = false;
    };
  }, [apiBase]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return engines;
    return engines.filter((e) => `${e.name} ${e.description}`.toLowerCase().includes(s));
  }, [q, engines]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Engines</h1>
      <p className="text-gray-400 mb-6">
        Core intelligence engines powering classification, risk, trust, and savings.
      </p>

      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search engines…"
          className="w-full md:w-96 rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500"
        />
        <p className="text-xs text-gray-500">{filtered.length} engine(s)</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((engine) => {
          const isOpen = Boolean(expanded[engine.id]);
          return (
            <div key={engine.id} className="border border-gray-800 bg-gray-900 p-5 rounded-lg shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{engine.name}</h2>
                  <p className="text-gray-400 mt-2">{engine.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded((m) => ({ ...m, [engine.id]: !isOpen }))}
                  className="shrink-0 rounded-md border border-gray-700 bg-gray-950/40 px-3 py-1.5 text-xs text-gray-200 hover:bg-gray-950/70"
                >
                  {isOpen ? "Hide details" : "Show details"}
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-300">
                <p>
                  <strong>Status:</strong> {engine.status}
                </p>
                <p>
                  <strong>Version:</strong> {engine.version}
                </p>
              </div>

              {isOpen && (
                <>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-200">Inputs</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {engine.inputs.map((i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-200">Outputs</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {engine.outputs.map((o) => (
                        <span key={o} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>
                      <strong>Accuracy:</strong> {engine.metrics.accuracy}
                    </p>
                    <p>
                      <strong>Latency:</strong> {engine.metrics.latencyMs} ms
                    </p>
                    <p>
                      <strong>Coverage:</strong> {engine.metrics.coverage}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
