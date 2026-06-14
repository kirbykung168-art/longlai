'use client';

import { BRAND, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * RESERVE — primary CTA panel. Drop the needle = book the night.
 * Centered, vinyl-dark, with a single pop-red CTA and a secondary
 * walk-ins-welcome note. The address tag and instagram handle sit
 * at the bottom as quiet metadata.
 */
export default function Reserve() {
  const { locale } = useLocale();
  const r = COPY.reserve;

  return (
    <section id="reserve" className="relative bg-vinyl text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />
      {/* A faint amber glow at top + bottom — like a needle running */}
      <div className="absolute top-0 left-0 right-0 gold-thread" />
      <div className="absolute bottom-0 left-0 right-0 gold-thread" />

      <div className="relative mx-auto max-w-[1080px] px-6 lg:px-10 text-center">
        <Reveal>
          <p className="eyebrow">{r.eyebrow[locale]}</p>
          <h2
            className="display mt-5 leading-[1.02]"
            style={{ fontSize: 'clamp(40px, 6.4vw, 96px)' }}
            lang={locale}
          >
            {r.title[locale]}
          </h2>
          <span className="amber-rule wide mx-auto mt-7 inline-block" />
          <p
            className="font-sans text-[15.5px] leading-[1.95] text-cream/85 max-w-[60ch] mt-9 mx-auto"
            lang={locale}
          >
            {r.body[locale]}
          </p>

          <div className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href={BRAND.dmUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-pop"
              lang={locale}
              aria-label={locale === 'th' ? 'เปิด DM Instagram กับ @longlai.bar เพื่อจอง' : 'Open a direct Instagram DM with @longlai.bar to reserve'}
            >
              {BRAND.reserveLine[locale]} <span className="btn-arrow">↗</span>
            </a>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mono uppercase tracking-[0.32em] text-[10.5px] text-cream/85 hover:text-amber transition-colors duration-500 underline underline-offset-[10px] decoration-amber/55 decoration-[0.5px]"
              lang={locale}
            >
              Directions to 13/9 Anuwong ↗
            </a>
          </div>

          <p className="mono uppercase tracking-[0.32em] text-[10.5px] text-cream/55 mt-10 max-w-[60ch] mx-auto leading-[1.6]" lang={locale}>
            {r.walkInsNote[locale]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
