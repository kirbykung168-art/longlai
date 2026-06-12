import Link from 'next/link';
import { SOURCES } from '@/lib/content';

export const metadata = {
  title: 'Sources · what we cited · Longlai',
  description: 'Every load-bearing claim on the Longlai tribute site, mapped to a source.',
};

export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-vinyl text-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[860px] px-6 lg:px-10">
        <p className="mono uppercase tracking-[0.42em] text-[10px] text-amber">Sources</p>
        <h1 className="display mt-5 text-[40px] lg:text-[64px] leading-[1.04]">What we cited.</h1>
        <span className="amber-rule wide mt-7 inline-block" />

        <p className="font-sans text-[15px] leading-[1.85] text-cream/80 mt-9 max-w-prose">
          This page lists every external source that supports a claim on the Longlai tribute
          site. If a fact on the home page isn&apos;t in one of these citations, it&apos;s either
          inferred from the brand&apos;s rotating model or explicitly marked as a placeholder
          (&quot;to be announced&quot;). Photographs are credited inline at the figures themselves.
        </p>

        <ol className="mt-14 space-y-10">
          {SOURCES.map((s, i) => (
            <li key={s.id} className="border-b border-[var(--rule)] pb-9">
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber">
                [{String(i + 1).padStart(2, '0')}] · {s.date}
              </p>
              <h2 className="display-it text-cream text-[22px] leading-snug mt-2">
                {s.title}
              </h2>
              <p className="font-sans text-[13px] text-cream/60 mt-1">{s.author}</p>
              <p className="font-sans text-[14.5px] text-cream/85 mt-4 leading-[1.7]">
                {s.supports}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono uppercase tracking-[0.32em] text-[10.5px] text-pop hover:text-pop-d transition-colors duration-500 mt-4 inline-block underline underline-offset-[10px] decoration-pop/55 decoration-[0.5px]"
              >
                Read source ↗
              </a>
            </li>
          ))}
        </ol>

        <Link
          href="/"
          className="mono uppercase tracking-[0.32em] text-[10.5px] text-cream/75 hover:text-amber transition-colors duration-500 mt-14 inline-block"
        >
          ← Back to Longlai
        </Link>
      </div>
    </main>
  );
}
