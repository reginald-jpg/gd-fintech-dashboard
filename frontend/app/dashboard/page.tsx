// app/dashboard/page.tsx
export default function DashboardPage() {
  const sectorsCovered = 36;
  const companiesScored = 128;
  const avgConfidence = 0.87;
  const estAnnualSavings = 42_000_000;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          High‑level view of sector coverage, confidence, and savings impact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Sectors covered</p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {sectorsCovered}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Companies scored</p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {companiesScored}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Avg. confidence</p>
          <p className="mt-2 text-2xl font-semibold text-cyan-300">
            {(avgConfidence * 100).toFixed(0)}%
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400">Est. annual savings</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            ${estAnnualSavings.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <h2 className="text-sm font-semibold text-slate-200">
          Intelligence summary
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          The engine classifies companies into sectors, applies the global trust
          layer, and estimates savings based on sector‑specific rules and risk
          models. Use the navigation to drill into sectors, engines, and
          governance.
        </p>
      </div>
    </div>
  );
}
