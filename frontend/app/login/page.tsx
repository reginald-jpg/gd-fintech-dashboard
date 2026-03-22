"use client";

import { FormEvent, useMemo, useState } from "react";

export default function LoginPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user123");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const curlExample = useMemo(() => {
    return `curl -X POST ${apiBase}/api/v1/users -H "Content-Type: application/json" -d '{"email":"newuser@example.com","password":"changeme"}'`;
  }, [apiBase]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Mock login: just verifies backend is reachable and user list can be fetched.
      const r = await fetch(`${apiBase}/api/v1/users`);
      if (!r.ok) throw new Error(`Backend unreachable (${r.status})`);

      setResult(`Mock login ok for ${email}. (Backend reachable)`);
    } catch (err: unknown) {
      setResult(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Login</h1>
        <p className="p">
          Auth is scaffolded as “mock” for now. This form just verifies the backend is reachable.
        </p>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
          <div className="btnRow" style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "Checking…" : "Login"}
            </button>
          </div>
        </form>
        {result ? <p className="p" style={{ marginTop: 12 }}>{result}</p> : null}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>API example</h2>
        <p className="p">Create a user via API:</p>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "rgba(234,240,255,0.85)" }}>{curlExample}</pre>
      </section>
    </div>
  );
}

