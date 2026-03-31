"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";
  const apiOrigin = apiBase.replace(/\/api\/?$/, "");
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    if (!apiBase) {
      setStatus("offline");
      setDetails("NEXT_PUBLIC_API_BASE_URL is not set");
      return;
    }

    const ac = new AbortController();
    fetch(`${apiOrigin}/health`, { signal: ac.signal })
      .then(async (r) => {
        const body = await r.text();
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${body}`);
        setStatus("online");
        setDetails(body);
      })
      .catch((e: unknown) => {
        setStatus("offline");
        setDetails("Backend unavailable - running in offline mode");
      });
    return () => ac.abort();
  }, [apiOrigin, apiBase]);

  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>System status</h1>
        <p className="p" style={{ marginBottom: 0 }}>
          Pinging <code>{apiOrigin}/health</code>
        </p>
      </section>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Backend</h2>
        <p className="p">
          Status: <strong>{status === "online" ? "Backend Online" : status === "offline" ? "Backend Offline (Mock Mode)" : "Loading..."}</strong>
        </p>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "rgba(234,240,255,0.85)" }}>{details}</pre>
      </section>
    </div>
  );
}

