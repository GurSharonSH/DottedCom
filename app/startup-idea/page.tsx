import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Startup Idea: Niqqud-Aware Domain Names | DottedCom",
  description:
    "A startup proposal for registering Hebrew vowel-pointed (niqqud) domain names to eliminate homograph ambiguity on the web.",
};

export default function StartupIdeaPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        / <span className="text-gray-700">Startup Idea</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
        Niqqud-Aware Domain Names
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        A startup proposal for supporting Hebrew vowel marks in domain
        registration — solving homograph ambiguity at the DNS level.
      </p>

      {/* The Problem */}
      <Section title="🧩 The Problem">
        <p>
          Hebrew is written with consonantal letters. Vowel sounds are conveyed
          by small diacritical marks called <strong>niqqud</strong> (נִקּוּד).
          Without niqqud, many words become visually identical —{" "}
          <strong>homographs</strong>. For example:
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <ExampleRow
            bare="מלך"
            variants={[
              ["מֶלֶךְ", "melech — king"],
              ["מָלַךְ", "malach — he reigned"],
              ["מֻלַּח", "mulach — salted"],
            ]}
          />
          <ExampleRow
            bare="שלום"
            variants={[
              ["שָׁלוֹם", "shalom — peace"],
              ["שָׁלֵם", "shalem — complete"],
            ]}
          />
        </ul>
        <p className="mt-4">
          Today, you can register an Internationalized Domain Name (IDN) with
          Hebrew consonants — e.g., <code>מלך.com</code> (encoded as{" "}
          <code>xn--9dbdkj.com</code> via Punycode). But Hebrew{" "}
          <strong>niqqud codepoints</strong> (U+05B0–U+05BD etc.) are explicitly
          excluded from the IDNA 2008 allowed-character set (RFC 5891/5892).
          This means registering <code>מֶלֶךְ.com</code> is currently{" "}
          <strong>impossible</strong>.
        </p>
        <p className="mt-3">
          The consequence: typing <code>מלך.com</code> leads to a single
          destination, yet the visitor may have intended any of three different
          words. There is no DNS-level disambiguation.
        </p>
      </Section>

      {/* The Startup Idea */}
      <Section title="💡 The Startup Idea: NiqqudDNS">
        <p>
          <strong>NiqqudDNS</strong> is a domain-registration and DNS service
          that introduces a <em>niqqud-aware routing layer</em> on top of
          standard ICANN infrastructure, enabling website owners to register and
          use fully-pointed Hebrew domain names today — without waiting for ICANN
          protocol changes.
        </p>

        <h3 className="font-semibold text-gray-800 mt-5 mb-2">
          How it works
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            <strong>Register the bare domain</strong> — NiqqudDNS registers the
            standard IDN consonantal domain (e.g. <code>מלך.com</code>) on
            behalf of the customer.
          </li>
          <li>
            <strong>Register pointed sub-paths as CNAMEs</strong> — The service
            maps each pointed form to a unique, stable subdomain:{" "}
            <code>xn--melech.מלך.com</code> → customer&apos;s server.
          </li>
          <li>
            <strong>Serve a disambiguation page</strong> — Visitors who navigate
            to the bare domain see an auto-generated disambiguation page (like
            the ones on DottedCom) listing each pointed word and its meaning.
          </li>
          <li>
            <strong>Browser extension / smart search</strong> — An optional
            browser extension lets users type the pointed form directly in the
            address bar; the extension rewrites the request to the correct
            subdomain.
          </li>
          <li>
            <strong>Long-term: push for ICANN changes</strong> — NiqqudDNS
            compiles real-world usage data to build a business case for
            amending RFC 5892 (IDNA derived property for niqqud characters) and
            petitions ICANN/IANA accordingly.
          </li>
        </ol>
      </Section>

      {/* Technical Architecture */}
      <Section title="🏗️ Technical Architecture">
        <p className="text-sm text-gray-700 mb-4">
          The DottedCom platform is the reference implementation of the
          NiqqudDNS concept. Its routing model can be adopted by any DNS
          provider.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ArchCard
            icon="🗄️"
            title="Homograph Registry"
            description="A structured database of Hebrew homograph groups, each storing the bare consonantal form and all pointed variants with metadata."
          />
          <ArchCard
            icon="🔀"
            title="Disambiguation Routing"
            description="URL pattern /homographs/[word] resolves to a disambiguation page; /homographs/[word]/[id] resolves to the exact pointed variant."
          />
          <ArchCard
            icon="🌐"
            title="Punycode Bridge"
            description="A middleware layer maps pointed Unicode forms to Punycode-compatible labels that today's DNS can resolve."
          />
          <ArchCard
            icon="🔍"
            title="Semantic Search"
            description="Full-text search over meanings, transliterations, and example sentences so users can find the right word even without knowing its Hebrew spelling."
          />
        </div>
      </Section>

      {/* Market & Opportunity */}
      <Section title="📈 Market Opportunity">
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            ~9 million native Hebrew speakers in Israel plus millions of diaspora
            users.
          </li>
          <li>
            Growing demand for Hebrew-first web experiences (government, media,
            commerce).
          </li>
          <li>
            No existing player offering pointed-Hebrew domain resolution.
          </li>
          <li>
            Potential to extend the model to Arabic (harakat), Tibetan, Indic
            scripts — any language with optional diacritics.
          </li>
        </ul>
      </Section>

      {/* Call to action */}
      <div className="mt-10 bg-blue-700 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Explore the live disambiguation engine
        </h2>
        <p className="text-blue-100 mb-5 text-sm">
          Browse the homograph groups we&apos;ve already catalogued and see the
          routing in action.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
        >
          Browse Homographs →
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small local helper components
// ---------------------------------------------------------------------------

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="text-gray-700 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

function ExampleRow({
  bare,
  variants,
}: {
  bare: string;
  variants: [string, string][];
}) {
  return (
    <li className="bg-gray-50 rounded-lg p-3">
      <span
        className="text-2xl font-bold text-blue-700 block text-right mb-1"
        dir="rtl"
        lang="he"
      >
        {bare}
      </span>
      <ul className="space-y-1">
        {variants.map(([niqqud, label]) => (
          <li key={niqqud} className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-800" dir="rtl" lang="he">
              {niqqud}
            </span>
            <span className="text-gray-500">– {label}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function ArchCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-2xl mb-2">{icon}</p>
      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
