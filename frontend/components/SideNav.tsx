"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  HomeIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  BeakerIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Company Match", href: "/company-match", icon: BuildingOfficeIcon },
  { name: "Sectors", href: "/sectors", icon: Squares2X2Icon },
  { name: "Demo Mode", href: "/demo", icon: BeakerIcon },
  { name: "Engines", href: "/engines", icon: ChartBarIcon },
  { name: "Modules", href: "/modules", icon: Squares2X2Icon },
  { name: "Monitoring", href: "/monitoring", icon: ShieldCheckIcon },
  { name: "Governance", href: "/governance", icon: Cog6ToothIcon },
  { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
  { name: "Trust Lab", href: "/trust-lab", icon: ShieldCheckIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-slate-800 bg-slate-900/40 backdrop-blur-xl p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-cyan-300 px-2 mb-4">
        Navigation
      </h2>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                active
                  ? "bg-slate-800 text-cyan-300 shadow-inner"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-cyan-200"
              )}
            >
              {/* INLINE STYLE OVERRIDES ALL GLOBAL CSS */}
              <Icon
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                }}
              />

              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
