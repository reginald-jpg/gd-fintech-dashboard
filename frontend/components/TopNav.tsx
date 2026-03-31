// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SectorDropdown from "./SectorDropdown";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Company Match", href: "/company-match" },
  { name: "Sectors", href: "/sectors" },
  { name: "Demo Mode", href: "/demo" },
  { name: "Engines", href: "/engines" },
  { name: "Modules", href: "/modules" },
  { name: "Monitoring", href: "/monitoring" },
  { name: "Governance", href: "/governance" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left side: Navigation */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-white border-b-2 border-blue-500 pb-1"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Sector Dropdown */}
        <SectorDropdown />
      </div>
    </nav>
  );
}
