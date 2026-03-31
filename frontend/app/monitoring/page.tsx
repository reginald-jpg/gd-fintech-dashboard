// app/monitoring/page.tsx
import { apiBaseUrl } from "../../lib/apiBase";

export default async function MonitoringPage() {
  let payload: any = null;
  try {
    const res = await fetch(`${apiBaseUrl()}/monitoring`, { cache: "no-store" });
    payload = await res.json();
  } catch {
    payload = { status: "offline", engines: [] };
  }

  const checks = [
    { name: "Backend", value: payload.status === "ok" ? "Online" : "Offline", status: payload.status === "ok" ? "Good" : "Degraded" },
    { name: "Engines reported", value: String(payload.engines?.length ?? 0), status: payload.engines?.length ? "Good" : "Unknown" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Monitoring</h1>
        <p className="mt-2 text-sm text-slate-400">
          Operational view of the engines and data quality.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {checks.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <p className="text-xs text-slate-400">{c.name}</p>
            <p className="mt-2 text-lg font-semibold text-slate-50">
              {c.value}
            </p>
            <p className="mt-1 text-xs text-emerald-300">{c.status}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
        <h2 className="text-sm font-semibold text-slate-200">Engines</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(payload.engines ?? []).map((e: any) => (
            <div key={e.id} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-100">{e.name}</p>
                <span className="text-xs text-emerald-300">{e.status}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
