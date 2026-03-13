import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DottedCom – Hebrew Homograph Navigator",
  description:
    "Disambiguate Hebrew homographs and explore proper vowel-pointed (niqqud) spellings with correct routing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-blue-700 hover:text-blue-900"
            >
              🔵 DottedCom
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Homographs
              </Link>
              <Link
                href="/startup-idea"
                className="hover:text-blue-700 transition-colors"
              >
                Startup Idea
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DottedCom · Hebrew Homograph Navigator
        </footer>
      </body>
    </html>
  );
}
