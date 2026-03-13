/**
 * Homograph data model for DottedCom.
 *
 * A "homograph" here refers to a Hebrew word that, when written without
 * niqqud (vowel-pointing diacritics), is visually identical to one or more
 * other words.  Each HomographGroup contains:
 *  - `word`      – the bare (un-pointed) Hebrew spelling
 *  - `variants`  – the distinct words that share that spelling, each with
 *                  proper niqqud, a short English gloss, an optional
 *                  Wikipedia/reference URL, and an optional image path.
 *
 * Niqqud support in domain names
 * --------------------------------
 * Internationalized Domain Names (IDN / IDNA 2008) allow Hebrew consonants
 * in a domain (e.g. שלום.com → xn--8dbdkw.com via Punycode).  However,
 * Unicode diacritics such as Hebrew niqqud (U+05B0–U+05BD, U+05BF, U+05C1–
 * U+05C2, U+05C4–U+05C5, U+05C7) are currently **excluded** from the IDNA
 * allowed-character set.  That means שָׁלוֹם.com is not a registrable domain
 * today.  See the startup idea at /startup-idea for a proposal to change this.
 */

export interface HomographVariant {
  /** Unique identifier within the group (slug-safe, ASCII). */
  id: string;
  /** The word with full Hebrew niqqud (vowel marks). */
  niqqud: string;
  /** Short English translation / gloss. */
  meaning: string;
  /** Transliteration into Latin script. */
  transliteration: string;
  /** Optional external reference URL (Wikipedia, dictionary, etc.). */
  externalUrl?: string;
  /** Optional path to an illustrative image (relative to /public). */
  image?: string;
  /** Optional sample sentence in Hebrew (with niqqud). */
  example?: string;
}

export interface HomographGroup {
  /** The bare Hebrew word without niqqud — used as the URL segment. */
  word: string;
  /** Human-readable label (same as word; kept separate for clarity). */
  label: string;
  /** All distinct variants that share this bare spelling. */
  variants: HomographVariant[];
}

/** Encode a bare Hebrew word for safe use in a URL path segment. */
export function encodeHebrewWord(word: string): string {
  return encodeURIComponent(word);
}

/** Decode a URL-encoded Hebrew word back to its Unicode form. */
export function decodeHebrewWord(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}

/**
 * Look up a HomographGroup by its bare Hebrew word.
 * Returns undefined if no group matches.
 */
export function findGroup(word: string): HomographGroup | undefined {
  return HOMOGRAPH_GROUPS.find((g) => g.word === word);
}

/**
 * Look up a specific variant within a group.
 */
export function findVariant(
  word: string,
  id: string
): HomographVariant | undefined {
  return findGroup(word)?.variants.find((v) => v.id === id);
}

// ---------------------------------------------------------------------------
// Sample data – a curated set of well-known Hebrew homograph pairs
// ---------------------------------------------------------------------------

export const HOMOGRAPH_GROUPS: HomographGroup[] = [
  {
    word: "שלום",
    label: "שלום",
    variants: [
      {
        id: "shalom-peace",
        niqqud: "שָׁלוֹם",
        meaning: "Peace / Hello / Goodbye",
        transliteration: "shalom",
        externalUrl: "https://en.wikipedia.org/wiki/Shalom",
        example: "שָׁלוֹם לְכֻלָּם!",
      },
      {
        id: "shalem-complete",
        niqqud: "שָׁלֵם",
        meaning: "Complete / Whole / Perfect",
        transliteration: "shalem",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%A9%D7%9C%D7%9D",
        example: "הַמִּסְפָּר הַשָּׁלֵם",
      },
    ],
  },
  {
    word: "מלך",
    label: "מלך",
    variants: [
      {
        id: "melech-king",
        niqqud: "מֶלֶךְ",
        meaning: "King",
        transliteration: "melech",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%9E%D7%9C%D7%9A",
        example: "הַמֶּלֶךְ דָּוִד",
      },
      {
        id: "malach-reigned",
        niqqud: "מָלַךְ",
        meaning: "He reigned / He ruled",
        transliteration: "malach",
        example: "הוּא מָלַךְ עֶשְׂרִים שָׁנָה",
      },
      {
        id: "mulach-salted",
        niqqud: "מֻלַּח",
        meaning: "Salted",
        transliteration: "mulach",
        example: "דָּג מֻלַּח",
      },
    ],
  },
  {
    word: "ספר",
    label: "ספר",
    variants: [
      {
        id: "sefer-book",
        niqqud: "סֵפֶר",
        meaning: "Book",
        transliteration: "sefer",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%A1%D7%A4%D7%A8",
        example: "סֵפֶר הַסִּפּוּרִים",
      },
      {
        id: "sapar-counted",
        niqqud: "סָפַר",
        meaning: "He counted",
        transliteration: "safar",
        example: "הוּא סָפַר אֶת הַכּוֹכָבִים",
      },
      {
        id: "sapar-barber",
        niqqud: "סַפָּר",
        meaning: "Barber / Hairdresser",
        transliteration: "sapar",
        example: "הַסַּפָּר גָּזַז אֶת שְׂעָרִי",
      },
    ],
  },
  {
    word: "דרך",
    label: "דרך",
    variants: [
      {
        id: "derech-road",
        niqqud: "דֶּרֶךְ",
        meaning: "Road / Way / Path",
        transliteration: "derech",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%93%D7%A8%D7%9A",
        example: "הַדֶּרֶךְ לְיְרוּשָׁלַיִם",
      },
      {
        id: "darach-stepped",
        niqqud: "דָּרַךְ",
        meaning: "He stepped / He trod",
        transliteration: "darach",
        example: "הוּא דָּרַךְ עַל הָאֲדָמָה",
      },
    ],
  },
  {
    word: "בית",
    label: "בית",
    variants: [
      {
        id: "bayit-house",
        niqqud: "בַּיִת",
        meaning: "House / Home",
        transliteration: "bayit",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%91%D7%99%D7%AA",
        example: "הַבַּיִת שֶׁלִּי",
      },
      {
        id: "bet-letter",
        niqqud: "בֵּית",
        meaning: "The letter Bet (ב)",
        transliteration: "bet",
        example: "בֵּית הַסֵּפֶר",
      },
    ],
  },
  {
    word: "עין",
    label: "עין",
    variants: [
      {
        id: "ayin-eye",
        niqqud: "עַיִן",
        meaning: "Eye",
        transliteration: "ayin",
        externalUrl: "https://en.wiktionary.org/wiki/%D7%A2%D7%99%D7%9F",
        example: "עַיִן טוֹבָה",
      },
      {
        id: "ein-spring",
        niqqud: "עֵין",
        meaning: "Spring (water source)",
        transliteration: "ein",
        example: "עֵין גֶּדִי בַּמִּדְבָּר",
      },
    ],
  },
];
