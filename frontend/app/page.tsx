import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 18 }}>
      <section className="card">
        <h1 className="h1">Production-ready fintech starter</h1>
        <p className="p">
          Backend API + Postgres + Prisma + Next.js, containerized for local development and ready to deploy on Render.
        </p>
        <div className="btnRow">
          <Link className="btn btnPrimary" href="/dashboard">
            Open Dashboard
          </Link>
          <Link className="btn" href="/status">
            System Status
          </Link>
          <a className="btn" href={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/docs`} target="_blank" rel="noreferrer">
            API Docs
          </a>
        </div>
      </section>

      <section className="grid grid2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>What’s included</h2>
          <ul style={{ margin: 0, color: "rgba(234,240,255,0.85)", lineHeight: 1.7 }}>
            <li>Express API under /api/v1</li>
            <li>Health check: GET /health</li>
            <li>Users resource: /api/v1/users</li>
            <li>Prisma models: users, accounts, transactions</li>
            <li>Docker + docker-compose</li>
            <li>Render deploy config + GitHub Actions</li>
          </ul>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Quick actions</h2>
          <div className="btnRow">
            <Link className="btn" href="/login">
              Login (mock)
            </Link>
            <Link className="btn" href="/status">
              Ping backend
            </Link>
          </div>
          <p className="p" style={{ marginTop: 12 }}>
            Tip: set <code>NEXT_PUBLIC_API_BASE_URL</code> to your backend URL on Render.
          </p>
        </div>
      </section>
    </div>
  );
}

