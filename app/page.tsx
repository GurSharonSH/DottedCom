import Link from "next/link";
import { HOMOGRAPH_GROUPS, encodeHebrewWord } from "@/lib/homographs";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Hebrew Homograph Navigator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Many Hebrew words share the same consonantal spelling but differ in
          meaning when vowel marks (<em>niqqud</em>) are added. Browse our
          homograph groups, click a word to see all its readings, and jump
          directly to the correct vowel-pointed page.
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Wondering why niqqud isn&apos;t in domain names yet?{" "}
          <Link
            href="/startup-idea"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Read our startup idea →
          </Link>
        </p>
      </section>

      {/* Homograph groups grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Homograph Groups
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOMOGRAPH_GROUPS.map((group) => (
            <Link
              key={group.word}
              href={`/homographs/${encodeHebrewWord(group.word)}`}
              className="block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <span
                className="block text-5xl font-bold text-center text-blue-700 mb-4"
                dir="rtl"
                lang="he"
              >
                {group.label}
              </span>
              <ul className="space-y-1">
                {group.variants.map((v) => (
                  <li key={v.id} className="flex items-baseline gap-2 text-sm">
                    <span
                      className="font-semibold text-gray-800"
                      dir="rtl"
                      lang="he"
                    >
                      {v.niqqud}
                    </span>
                    <span className="text-gray-500">– {v.meaning}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-blue-500 font-medium">
                {group.variants.length} variant
                {group.variants.length !== 1 ? "s" : ""} →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
