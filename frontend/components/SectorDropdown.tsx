// components/SectorDropdown.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiBaseUrl } from "../lib/apiBase";

export default function SectorDropdown() {
  const [sectors, setSectors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBaseUrl()}/intel/sectors`);
      const data = await res.json();
      setSectors(data);
    }
    load();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-300 hover:text-white border border-gray-700 px-3 py-1 rounded-md"
      >
        Sectors ▼
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {sectors.map((sector) => (
            <Link
              key={sector.id}
              href={`/sectors/${sector.id}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              {sector.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
