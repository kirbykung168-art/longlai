'use client';

import { BRAND, COPY, CURRENT_CHEF } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * NOW PLAYING — the rotating guest chef block. Designed as a "back
 * of the sleeve" card with the chef's name in display Bowlby and the
 * residency dates / discipline / signature track in monospace below.
 *
 * The card is the brand's monthly content surface: swap the
 * CURRENT_CHEF object in content.ts and this section updates.
 */
export default function NowPlaying() {
  const { locale } = useLocale();
  const n = COPY.now;
  const c = CURRENT_CHEF;

  return (
    <section id="now" className="relative bg-tobacco text-cream py-24 lg:py-32 overflow-hidden border-t border-[var(--rule-amber)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />
      <div className="absolute top-0 left-0 right-0 gold-thread" />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT — eyebrow, title, intro */}
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{n.eyebrow[locale]}</p>
          <h2
            className="display mt-5 leading-[1.04] text-amber-l"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            lang={locale}
          >
            {n.title[locale]}
          </h2>
          <span className="amber-rule wide mt-7" />
          <p
            className="font-sans text-[15.5px] leading-[1.85] text-cream/85 mt-7 max-w-prose"
            lang={locale}
          >
            {n.intro[locale]}
          </p>
        </Reveal>

        {/* RIGHT — the back-of-sleeve card. Looks like the rear of
            a 12" LP. */}
        <Reveal delay={0.15} className="lg:col-span-7">
          <article
            className="relative bg-cream text-vinyl p-8 lg:p-12"
            style={{
              boxShadow: '0 18px 50px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(14,10,7,0.12)',
            }}
          >
            {/* Cardboard corner mark — like a hand-written shelf tag */}
            <div className="absolute -top-4 -left-4 rotate-[-4deg] bg-pop text-cream mono uppercase tracking-[0.32em] text-[10px] px-3 py-1.5">
              {c.monthLabel}
            </div>

            {/* SIDE A / NOW PLAYING header */}
            <div className="flex items-baseline justify-between border-b border-vinyl/15 pb-5 mb-7">
              <p className="mono uppercase tracking-[0.42em] text-[10px] text-vinyl/55">
                Now Playing
              </p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-pop">
                {c.verified ? 'Confirmed' : 'To be announced'}
              </p>
            </div>

            <h3
              className="display text-vinyl leading-[1.04]"
              style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}
              lang={locale}
            >
              {c.name}
            </h3>

            <p className="display-it text-tobacco mt-3" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}>
              {c.discipline}
            </p>

            {/* Dates */}
            <div className="mt-7 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 max-w-md">
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Dates</p>
              <p className="font-sans text-[14px] text-vinyl">{c.dates}</p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Side</p>
              <p className="font-sans text-[14px] text-vinyl">A · monthly residency</p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Track</p>
              <p className="font-sans text-[14px] text-vinyl" lang={locale}>{c.signatureTrack[locale]}</p>
            </div>

            {/* Back-of-sleeve bio */}
            <blockquote
              className="display-it text-vinyl/85 mt-8 leading-[1.4] border-l-2 border-pop pl-5"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              lang={locale}
            >
              {c.bioBack[locale]}
            </blockquote>

            <div className="mt-9 flex items-center gap-5">
              <a href="#reserve" className="btn btn-pop">
                {COPY.hero.ctaReserve[locale]} <span className="btn-arrow">→</span>
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/65 hover:text-pop transition-colors duration-500"
              >
                DM {BRAND.instagramHandle} ↗
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
