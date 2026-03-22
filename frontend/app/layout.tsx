import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  title: "Fintech Platform",
  description: "Production-ready fintech starter"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container headerInner">
            <Link href="/" className="brand">
              Fintech
            </Link>
            <nav className="nav">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
              <Link href="/status">Status</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} Fintech Platform</div>
        </footer>
      </body>
    </html>
  );
}

