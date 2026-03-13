# DottedCom

A platform to manage URLs for Hebrew homographs — words that share the same consonantal spelling but differ in meaning when vowel marks (*niqqud*) are added — so each distinct reading is routed to its own stable, unambiguous page.

## What it does

Hebrew homographs arise because the standard written form of Hebrew omits vowel marks. For example:

| Bare form | Pointed (niqqud) | Meaning |
|-----------|-----------------|---------|
| מלך | מֶלֶךְ | King |
| מלך | מָלַךְ | He reigned |
| מלך | מֻלַּח | Salted |

Typing `מלך.com` today leads to a single destination even though the visitor may have intended any of three different words. **DottedCom** solves this by:

1. **Homograph Groups page** (`/`) — browse all catalogued bare-spelling groups.
2. **Disambiguation page** (`/homographs/[word]`) — given a bare Hebrew word, lists every known pointed reading so users can pick the one they mean.
3. **Variant page** (`/homographs/[word]/[id]`) — the canonical page for a specific pointed word, with meaning, transliteration, example sentence, and a stable permalink.
4. **Startup Idea page** (`/startup-idea`) — explains why Hebrew niqqud can't yet appear in domain names (IDNA 2008 exclusions) and proposes *NiqqudDNS*, a service to bridge this gap today while advocating for protocol changes at ICANN.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev       # development server on http://localhost:3000
npm run build     # production build
npm run lint      # ESLint
```

## Project structure

```
app/
  page.tsx                          # Home – homograph groups listing
  layout.tsx                        # Root layout (nav + footer)
  homographs/
    [word]/
      page.tsx                      # Disambiguation page
      [id]/
        page.tsx                    # Individual variant page
  startup-idea/
    page.tsx                        # Startup idea / NiqqudDNS proposal
lib/
  homographs.ts                     # Data model + curated homograph data
```

