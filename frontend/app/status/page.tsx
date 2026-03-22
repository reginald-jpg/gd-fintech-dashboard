"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    const ac = new AbortController();
    fetch(`${apiBase}/health`, { signal: ac.signal })
      .then(async (r) => {
        const body = await r.text();
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${body}`);
        setStatus("ok");
        setDetails(body);
      })
      .catch((e: unknown) => {
        setStatus("error");
        setDetails(e instanceof Error ? e.message : "Unknown error");
      });
    return () => ac.abort();
  }, [apiBase]);

  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>System status</h1>
        <p className="p" style={{ marginBottom: 0 }}>
          Pinging <code>{apiBase}/health</code>
        </p>
      </section>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Backend</h2>
        <p className="p">
          Status: <strong>{status}</strong>
        </p>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "rgba(234,240,255,0.85)" }}>{details}</pre>
      </section>
    </div>
  );
}

