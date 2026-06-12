'use client';

import { COPY, TRACKLIST } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * TRACKLIST — the menu rendered as a 12" LP back cover. Side A is
 * the chef-of-the-month set, Side B the house standards, plus a
 * bonus-tracks block for the bar. Each row is numbered (A1, A2, B1…)
 * and prices are written as runtimes — `02:50` reads as ฿250.
 *
 * Liner-notes register: monospace numerals, italic Cormorant for
 * dish names, and a marker-style underline drawn on hover.
 */
export default function Tracklist() {
  const { locale } = useLocale();
  const t = COPY.tracklist;

  return (
    <section id="tracklist" className="relative bg-vinyl text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-end mb-16">
          <Reveal>
            <p className="eyebrow">{t.eyebrow[locale]}</p>
            <h2
              className="display mt-5 leading-[1.04]"
              style={{ fontSize: 'clamp(36px, 5.4vw, 84px)' }}
              lang={locale}
            >
              {t.title[locale]}
            </h2>
            <span className="amber-rule wide mt-7" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-[15.5px] leading-[1.85] text-cream/80 max-w-md lg:ml-auto" lang={locale}>
              {t.intro[locale]}
            </p>
            <p className="mono uppercase tracking-[0.32em] text-[10.5px] text-amber mt-5 lg:text-right" lang={locale}>
              {t.runtimeNote[locale]}
            </p>
          </Reveal>
        </div>

        {/* Side A + Side B side-by-side */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <SideBlock side={TRACKLIST.sideA} sideTone="hot" />
          <SideBlock side={TRACKLIST.sideB} sideTone="cool" />
        </div>

        {/* Bonus tracks · the bar */}
        <div className="mt-16">
          <SideBlock side={TRACKLIST.drinks} sideTone="bar" />
        </div>
      </div>
    </section>
  );
}

function SideBlock({
  side,
  sideTone,
}: {
  side: typeof TRACKLIST.sideA | typeof TRACKLIST.sideB | typeof TRACKLIST.drinks;
  sideTone: 'hot' | 'cool' | 'bar';
}) {
  const { locale } = useLocale();
  const tone =
    sideTone === 'hot'  ? 'text-pop'    :
    sideTone === 'cool' ? 'text-amber'  :
                          'text-cream/65';

  return (
    <Reveal>
      <div>
        {/* Side label */}
        <div className="flex items-baseline justify-between border-b border-[var(--rule-amber)] pb-4 mb-6">
          <p className={`mono uppercase tracking-[0.42em] text-[11px] ${tone}`} lang={locale}>
            {side.label[locale]}
          </p>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/40">
            runtime ≈ price
          </p>
        </div>

        <ol className="space-y-5">
          {side.items.map((it) => (
            <li
              key={it.n}
              className="grid grid-cols-[36px_1fr_auto] gap-x-5 items-baseline border-b border-cream/8 pb-5 last:border-0 group"
            >
              <span className={`mono text-[13px] ${tone} tabular-nums`}>{it.n}</span>
              <div className="min-w-0">
                <p
                  className="display-it text-cream text-[20px] leading-snug marker-underline inline-block"
                  lang={locale}
                >
                  {it.name[locale]}
                </p>
                {('note' in it && it.note) && (
                  <p className="font-sans text-[12.5px] text-cream/60 leading-relaxed mt-1.5" lang={locale}>
                    {(it as { note: { en: string; th: string } }).note[locale]}
                  </p>
                )}
              </div>
              <span className="mono text-[12.5px] text-amber tabular-nums whitespace-nowrap">
                {it.runtime}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
