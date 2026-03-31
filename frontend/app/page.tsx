// frontend/app/page.tsx
import Link from 'next/link';
import { CompanySearch } from '../components/CompanySearch';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Fintech Industry Intelligence
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Match any company to one of 36 sectors, with savings and risk insights.
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/sectors"
              className="text-gray-300 hover:text-emerald-400 underline-offset-4 hover:underline"
            >
              View all sectors
            </Link>
          </nav>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Company analysis
          </h2>
          <CompanySearch />
        </section>

        <section className="mt-8 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-300">Demo mode</p>
              <p className="text-xs text-emerald-100/80">
                Click into any sector to load a sample company and pre-built workflow.
              </p>
            </div>
            <Link
              href="/sectors"
              className="inline-flex items-center justify-center rounded-md border border-emerald-500/60 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
            >
              Browse sectors
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
