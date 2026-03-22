"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
};

export default function DashboardPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetch(`${apiBase}/api/v1/users`, { signal: ac.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        return await r.json();
      })
      .then((data) => setUsers(data.users ?? []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Unknown error"));
    return () => ac.abort();
  }, [apiBase]);

  return (
    <div className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>
        <p className="p" style={{ marginBottom: 0 }}>
          This page calls <code>/api/v1/users</code> on the backend.
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Users</h2>
        {error ? (
          <p className="p">Error: {error}</p>
        ) : users === null ? (
          <p className="p">Loading…</p>
        ) : users.length === 0 ? (
          <p className="p">No users found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "rgba(234,240,255,0.75)" }}>
                  <th style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.12)" }}>Email</th>
                  <th style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.12)" }}>Role</th>
                  <th style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.12)" }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.08)" }}>{u.email}</td>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.08)" }}>{u.role}</td>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(234,240,255,0.08)" }}>
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

