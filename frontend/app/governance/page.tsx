// app/governance/page.tsx
import React from "react";
import { apiBaseUrl } from "../../lib/apiBase";

export const dynamic = "force-dynamic";

export default async function GovernancePage() {
  let data: any = { policies: [], auditLog: [] };
  try {
    const res = await fetch(`${apiBaseUrl()}/governance`, {
      cache: "no-store",
    });
    data = await res.json();
  } catch {
    data = { policies: [], auditLog: [] };
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Governance</h1>
      <p className="text-gray-400 mb-8">
        Trust layer policies, audits, and compliance controls.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {(data.policies ?? []).map((policy) => (
          <div
            key={policy.id}
            className="border border-gray-800 bg-gray-900 p-5 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-white">{policy.name}</h3>
            <p className="text-gray-400 mt-2">{policy.description}</p>

            <div className="mt-4 text-sm text-gray-300">
              <p><strong>Status:</strong> {policy.status}</p>
              <p><strong>Last Audit:</strong> {policy.lastAudit}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Audit Log</h2>
      <div className="space-y-4">
        {(data.auditLog ?? []).map((log) => (
          <div
            key={log.id}
            className="border border-gray-800 bg-gray-900 p-4 rounded-lg shadow"
          >
            <p className="text-gray-300 text-sm">
              <strong>{log.timestamp}</strong> — {log.action}
            </p>
            <p className="text-gray-400 text-sm mt-1">{log.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
