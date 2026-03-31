// frontend/app/sectors/[id]/page.tsx
import Link from 'next/link';
import { fetchSectorById } from '../../../lib/api';
import { CompanySearch } from '../../../components/CompanySearch';

interface SectorPageProps {
  params: { id: string };
}

export const revalidate = 60;

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const sector = await fetchSectorById(params.id);

  const demoCompany = sector.sampleCompanies[0] ?? 'Sample Fintech Co.';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Sector detail
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {sector.name}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{sector.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Link
              href="/sectors"
              className="text-gray-300 hover:text-emerald-400 underline-offset-4 hover:underline"
            >
              All sectors
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-emerald-400 underline-offset-4 hover:underline"
            >
              Company analysis
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-950/70 p-4">
              <h2 className="text-sm font-semibold text-gray-200">
                Typical use cases
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-gray-300">
                {sector.typicalUseCases.map((useCase) => (
                  <li key={useCase} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-950/70 p-4">
              <h2 className="text-sm font-semibold text-gray-200">
                Data signals & risk
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Risk profile: <span className="text-gray-200">{sector.riskProfile}</span>
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Key signals
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-gray-300">
                    {sector.dataSignals.map((signal) => (
                      <li key={signal} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Model notes
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-gray-300">
                    {sector.modelNotes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-950/70 p-4">
              <h2 className="text-sm font-semibold text-gray-200">
                Sample companies
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {sector.sampleCompanies.map((company) => (
                  <span
                    key={company}
                    className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs text-gray-200"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Demo mode
              </p>
              <p className="mt-1 text-xs text-emerald-100/80">
                We pre-fill a representative company in this sector. Run the workflow as-is or
                swap in your own.
              </p>
              <p className="mt-3 text-xs text-emerald-100">
                Sample company:{' '}
                <span className="font-mono text-emerald-200">{demoCompany}</span>
              </p>
            </div>

            <CompanySearch
              defaultCompanyName={demoCompany}
              defaultIndustryId={sector.id}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
