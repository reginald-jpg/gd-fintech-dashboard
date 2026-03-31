import { fetchSectors } from "../../lib/api";

export const dynamic = "force-dynamic";

export default async function SectorsPage() {
  let sectors: any[] = [];
  try {
    sectors = await fetchSectors();
  } catch {
    sectors = [];
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Industry Sectors</h1>

      {sectors.length === 0 && (
        <p className="text-sm text-gray-400 mb-6">
          Backend unavailable. Start the API on <code>localhost:8080</code> or set{" "}
          <code>NEXT_PUBLIC_API_BASE_URL</code>.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow"
          >
            <h2 className="text-xl font-semibold text-white">{sector.name}</h2>

            <p className="mt-2 text-gray-400 text-sm">
              {sector.description ?? "No description available."}
            </p>

            {/* Use Cases */}
            <div className="mt-3 flex flex-wrap gap-1">
              {(sector.typicalUseCases ?? []).slice(0, 3).map((useCase) => (
                <span
                  key={useCase}
                  className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300 border border-gray-700"
                >
                  {useCase}
                </span>
              ))}
            </div>

            {/* Sample Companies */}
            <div className="mt-3 flex flex-wrap gap-1">
              {(sector.sampleCompanies ?? []).slice(0, 3).map((company) => (
                <span
                  key={company}
                  className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300 border border-gray-700"
                >
                  {company}
                </span>
              ))}
            </div>

            {/* Risk Profile */}
            <p className="mt-3 text-xs text-gray-500">
              Risk: {sector.riskProfile ?? "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
