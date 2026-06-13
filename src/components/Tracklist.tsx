'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY, TRACKLIST } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * TRACKLIST - the menu rendered as a 12" LP back cover.
 *
 * Audit pass 4 adds the "currently playing" indicator: as the user
 * scrolls through the section, an amber needle pip + arrow moves
 * down the list, ticking from track to track. The active row gets
 * an amber name colour, an amber rule fill, and a small running
 * time elapsed dot. The list reads as a record actually playing
 * rather than a static menu - reinforces the brand conceit.
 *
 * Mechanism: each row tracks its position via getBoundingClientRect
 * relative to the viewport centre; whichever row's centre is closest
 * to the viewport centre is "playing." Works for Side A, Side B and
 * the drinks block. Respects prefers-reduced-motion (no needle).
 */
export default function Tracklist() {
  const { locale } = useLocale();
  const t = COPY.tracklist;

  return (
    <section id="tracklist" className="relative bg-vinyl text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <SideBlock side={TRACKLIST.sideA} sideTone="hot" idPrefix="sa" />
          <SideBlock side={TRACKLIST.sideB} sideTone="cool" idPrefix="sb" />
        </div>

        <div className="mt-16">
          <SideBlock side={TRACKLIST.drinks} sideTone="bar" idPrefix="dr" />
        </div>
      </div>
    </section>
  );
}

function SideBlock({
  side,
  sideTone,
  idPrefix,
}: {
  side: typeof TRACKLIST.sideA | typeof TRACKLIST.sideB | typeof TRACKLIST.drinks;
  sideTone: 'hot' | 'cool' | 'bar';
  idPrefix: string;
}) {
  const { locale } = useLocale();
  const tone =
    sideTone === 'hot'  ? 'text-amber-l' :
    sideTone === 'cool' ? 'text-amber'   :
                          'text-cream/65';

  const olRef = useRef<HTMLOListElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const olRect = ol.getBoundingClientRect();
        const viewportCentre = window.innerHeight / 2;
        // Only show the needle while the list block intersects the
        // central scroll band (top edge above centre, bottom below).
        if (olRect.bottom < viewportCentre - 80 || olRect.top > viewportCentre + 80) {
          setActiveIdx(-1);
          return;
        }
        const items = Array.from(ol.querySelectorAll('li')) as HTMLLIElement[];
        let bestIdx = -1;
        let bestDist = Infinity;
        items.forEach((li, i) => {
          const r = li.getBoundingClientRect();
          const c = (r.top + r.bottom) / 2;
          const d = Math.abs(c - viewportCentre);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        setActiveIdx(bestIdx);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Reveal>
      <div>
        <div className="flex items-baseline justify-between border-b border-[var(--rule-amber)] pb-4 mb-6">
          <p className={`mono uppercase tracking-[0.42em] text-[11px] ${tone}`} lang={locale}>
            {side.label[locale]}
          </p>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/40">
            runtime &asymp; price
          </p>
        </div>

        <ol ref={olRef} className="space-y-5 relative">
          {side.items.map((it, i) => {
            const active = i === activeIdx;
            return (
              <li
                key={it.n}
                id={`${idPrefix}-${it.n}`}
                className={`grid grid-cols-[26px_36px_1fr_auto] gap-x-3 items-baseline border-b pb-5 last:border-0 group transition-colors duration-500 ${active ? 'border-amber/40' : 'border-cream/8'}`}
              >
                {/* Currently-playing needle slot - tiny amber triangle on
                    the active row. Otherwise a neutral dot for rhythm. */}
                <span aria-hidden className="flex items-center justify-center w-[26px] h-[14px]">
                  {active ? (
                    <svg viewBox="0 0 16 16" className="w-4 h-4">
                      <path d="M 2 8 L 14 4 L 14 12 Z" fill="var(--amber)" />
                      <circle cx="14" cy="8" r="1.6" fill="var(--cream)" />
                    </svg>
                  ) : (
                    <span className="block w-1 h-1 rounded-full bg-cream/25" />
                  )}
                </span>
                <span className={`mono text-[13px] tabular-nums transition-colors duration-500 ${active ? 'text-amber' : tone}`}>
                  {it.n}
                </span>
                <div className="min-w-0">
                  <p
                    className={`display-it text-[20px] leading-snug marker-underline inline-block transition-colors duration-500 ${active ? 'text-amber-l' : 'text-cream'}`}
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
                <span className={`mono text-[12.5px] tabular-nums whitespace-nowrap transition-colors duration-500 ${active ? 'text-amber-l' : 'text-amber'}`}>
                  {it.runtime}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
