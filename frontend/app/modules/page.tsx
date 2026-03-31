// app/modules/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { apiBaseUrl } from "../../lib/apiBase";

type Module = {
  id: string;
  name: string;
  description: string;
  status: string;
  endpoints: string[];
  inputs: string[];
  outputs: string[];
};

export default function ModulesPage() {
  const apiBase = apiBaseUrl();
  const [q, setQ] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${apiBase}/modules`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setModules(Array.isArray(data) ? data : []);
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
    if (!s) return modules;
    return modules.filter((m) => `${m.name} ${m.description}`.toLowerCase().includes(s));
  }, [q, modules]);

  const selected = filtered.find((m) => m.id === active) ?? null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Modules</h1>
      <p className="text-gray-400 mb-6">
        High‑level functional modules that orchestrate intelligence across the platform.
      </p>

      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search modules…"
          className="w-full md:w-96 rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500"
        />
        <p className="text-xs text-gray-500">{filtered.length} module(s)</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-2">
          {filtered.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActive(mod.id)}
              className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                active === mod.id
                  ? "border-cyan-400 bg-slate-900/60"
                  : "border-gray-800 bg-gray-900 hover:bg-gray-900/60"
              }`}
            >
              <p className="text-sm font-semibold text-gray-100">{mod.name}</p>
              <p className="mt-1 text-xs text-gray-400 line-clamp-2">{mod.description}</p>
            </button>
          ))}
        </div>

        <div className="md:col-span-2">
          {selected ? (
            <div className="border border-gray-800 bg-gray-900 p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-white">{selected.name}</h2>
              <p className="text-gray-400 mt-2">{selected.description}</p>

              <div className="mt-4 text-sm text-gray-300">
                <p>
                  <strong>Status:</strong> {selected.status}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-200">Endpoints</h3>
                <ul className="mt-1 text-xs text-gray-400 list-disc pl-4">
                  {selected.endpoints.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-200">Inputs</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selected.inputs.map((i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-200">Outputs</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selected.outputs.map((o) => (
                    <span key={o} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-6 text-sm text-gray-400">
              Select a module to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
