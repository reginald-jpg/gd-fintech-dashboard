export function apiBaseUrl(): string {
  // Client bundle can only see NEXT_PUBLIC_* envs.
  const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (publicBase?.trim()) return publicBase.replace(/\/$/, "");

  // Server-side render on Vercel: prefer same-origin serverless `/api`.
  if (typeof window === "undefined") {
    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl?.trim()) return `https://${vercelUrl}/api`;
  }

  // Local dev default.
  return "http://localhost:8080/api";
}

