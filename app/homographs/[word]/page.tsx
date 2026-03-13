import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HOMOGRAPH_GROUPS,
  findGroup,
  decodeHebrewWord,
  encodeHebrewWord,
} from "@/lib/homographs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ word: string }>;
}

export async function generateStaticParams() {
  return HOMOGRAPH_GROUPS.map((g) => ({
    word: encodeHebrewWord(g.word),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { word: encodedWord } = await params;
  const word = decodeHebrewWord(encodedWord);
  const group = findGroup(word);
  if (!group) return { title: "Not Found" };
  return {
    title: `${group.label} – Homograph disambiguation | DottedCom`,
    description: `Disambiguation page for the Hebrew word "${group.label}". Choose the correct vowel-pointed reading.`,
  };
}

export default async function HomographDisambiguationPage({ params }: Props) {
  const { word: encodedWord } = await params;
  const word = decodeHebrewWord(encodedWord);
  const group = findGroup(word);

  if (!group) notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-gray-700" dir="rtl" lang="he">
          {group.label}
        </span>
      </nav>

      {/* Page header */}
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-blue-500 font-semibold mb-2">
          Disambiguation
        </p>
        <h1
          className="text-6xl font-extrabold text-blue-800 mb-3"
          dir="rtl"
          lang="he"
        >
          {group.label}
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          The consonantal spelling{" "}
          <strong dir="rtl" lang="he">
            {group.label}
          </strong>{" "}
          can represent <strong>{group.variants.length}</strong> distinct Hebrew
          word{group.variants.length !== 1 ? "s" : ""}. Select the meaning you
          intend:
        </p>
      </div>

      {/* Variant cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {group.variants.map((variant) => (
          <Link
            key={variant.id}
            href={`/homographs/${encodeHebrewWord(group.word)}/${variant.id}`}
            className="flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
          >
            {/* Niqqud form */}
            <span
              className="text-4xl font-bold text-blue-700 mb-1 block text-right"
              dir="rtl"
              lang="he"
            >
              {variant.niqqud}
            </span>
            {/* Transliteration */}
            <span className="text-xs font-mono text-gray-400 mb-3">
              /{variant.transliteration}/
            </span>
            {/* Meaning */}
            <p className="text-gray-700 font-semibold text-lg mb-2">
              {variant.meaning}
            </p>
            {/* Example sentence */}
            {variant.example && (
              <p
                className="text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100 text-right"
                dir="rtl"
                lang="he"
              >
                {variant.example}
              </p>
            )}
            <span className="mt-4 text-xs text-blue-500 font-medium self-end">
              View details →
            </span>
          </Link>
        ))}
      </div>

      {/* Niqqud domain note */}
      <aside className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <strong>💡 Did you know?</strong> You can&apos;t yet register a
        niqqud-bearing domain like{" "}
        <span className="font-mono" dir="rtl" lang="he">
          {group.variants[0]?.niqqud}
        </span>
        .com because IDNA 2008 excludes Hebrew vowel marks from valid domain
        characters.{" "}
        <Link href="/startup-idea" className="underline font-semibold">
          Learn about our startup idea to change that →
        </Link>
      </aside>
    </div>
  );
}
