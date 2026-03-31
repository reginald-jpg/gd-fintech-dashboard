// app/search/page.tsx
"use client";

import { useState } from "react";

export default function SearchPage() {
  const [q, setQ] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <p className="mt-2 text-sm text-slate-400">
          Placeholder for global search across companies and sectors.
        </p>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search (future: companies, sectors, policies)…"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
      />
      <p className="text-xs text-slate-500">
        This is a UI shell; we can wire it to real search endpoints later.
      </p>
    </div>
  );
}
