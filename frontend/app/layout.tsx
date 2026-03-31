// app/layout.tsx
import "./globals.css";
import TopNav from "../components/TopNav";
;

export const metadata = {
  title: "Fintech Intelligence Engine",
  description: "Unified sector intelligence, trust layer, and demo engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        <TopNav />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
