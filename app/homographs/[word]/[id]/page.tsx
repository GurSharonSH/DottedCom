import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HOMOGRAPH_GROUPS,
  findGroup,
  findVariant,
  decodeHebrewWord,
  encodeHebrewWord,
} from "@/lib/homographs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ word: string; id: string }>;
}

export async function generateStaticParams() {
  return HOMOGRAPH_GROUPS.flatMap((g) =>
    g.variants.map((v) => ({
      word: encodeHebrewWord(g.word),
      id: v.id,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { word: encodedWord, id } = await params;
  const word = decodeHebrewWord(encodedWord);
  const variant = findVariant(word, id);
  if (!variant) return { title: "Not Found" };
  return {
    title: `${variant.niqqud} (${variant.meaning}) | DottedCom`,
    description: `Homograph page for ${variant.niqqud} — ${variant.meaning}. Transliteration: ${variant.transliteration}.`,
  };
}

export default async function HomographVariantPage({ params }: Props) {
  const { word: encodedWord, id } = await params;
  const word = decodeHebrewWord(encodedWord);
  const group = findGroup(word);
  const variant = findVariant(word, id);

  if (!group || !variant) notFound();

  // Other variants in the same group (for "see also" section)
  const otherVariants = group.variants.filter((v) => v.id !== variant.id);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/homographs/${encodeHebrewWord(group.word)}`}
          className="hover:text-blue-600"
          dir="rtl"
          lang="he"
        >
          {group.label}
        </Link>
        <span>/</span>
        <span className="text-gray-700" dir="rtl" lang="he">
          {variant.niqqud}
        </span>
      </nav>

      {/* Main card */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-8 mb-8">
        {/* Niqqud heading */}
        <h1
          className="text-7xl font-extrabold text-blue-800 text-right mb-2 leading-none"
          dir="rtl"
          lang="he"
        >
          {variant.niqqud}
        </h1>

        {/* Transliteration + bare form */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-gray-400 text-sm">
            /{variant.transliteration}/
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-400 text-sm">
            bare form:{" "}
            <strong dir="rtl" lang="he" className="text-gray-600">
              {group.label}
            </strong>
          </span>
        </div>

        {/* Meaning */}
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          {variant.meaning}
        </p>

        {/* Example sentence */}
        {variant.example && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold mb-1">
              Example sentence
            </p>
            <p
              className="text-xl text-blue-900 font-medium text-right"
              dir="rtl"
              lang="he"
            >
              {variant.example}
            </p>
          </div>
        )}

        {/* URL / domain section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
            Routed as
          </p>
          <code className="text-sm break-all text-gray-700 font-mono">
            /homographs/{encodeHebrewWord(group.word)}/{variant.id}
          </code>
          <p className="text-xs text-gray-400 mt-2">
            Each variant has its own stable URL so links always resolve to the
            intended meaning — no ambiguity.
          </p>
        </div>

        {/* External reference */}
        {variant.externalUrl && (
          <a
            href={variant.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 underline font-medium"
          >
            📖 External reference
          </a>
        )}
      </div>

      {/* Other variants (see also) */}
      {otherVariants.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Other readings of{" "}
            <span dir="rtl" lang="he" className="text-blue-700">
              {group.label}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {otherVariants.map((v) => (
              <Link
                key={v.id}
                href={`/homographs/${encodeHebrewWord(group.word)}/${v.id}`}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div>
                  <span
                    className="text-2xl font-bold text-blue-700 block"
                    dir="rtl"
                    lang="he"
                  >
                    {v.niqqud}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    /{v.transliteration}/
                  </span>
                </div>
                <span className="text-gray-600 text-sm ml-4">{v.meaning}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link
          href={`/homographs/${encodeHebrewWord(group.word)}`}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to all readings of{" "}
          <span dir="rtl" lang="he">
            {group.label}
          </span>
        </Link>
      </div>
    </div>
  );
}
