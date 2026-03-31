"use client";

import { useEffect, useState } from "react";

export default function MockModeToggle() {
  const [mock, setMock] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function loadState() {
    // Only show demo/mock controls when backend is offline/unreachable.
    try {
      const health = await fetch("http://localhost:8080/health");
      if (health.ok) {
        setShow(false);
        return;
      }
    } catch {
      setShow(true);
    }
    const res = await fetch("http://localhost:8080/api/mock-mode");
    const data = await res.json();
    setMock(data.mock);
  }

  async function toggle() {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/mock-mode/toggle", {
      method: "POST",
    });
    const data = await res.json();
    setMock(data.mock);
    setLoading(false);
  }

  useEffect(() => {
    loadState();
  }, []);

  if (!show) return null;
  if (mock === null) return null;

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
        mock
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
          : "bg-slate-800 text-slate-300 border border-slate-700"
      }`}
    >
      {loading
        ? "Switching…"
        : mock
        ? "Mock Mode: ON"
        : "Mock Mode: OFF"}
    </button>
  );
}
