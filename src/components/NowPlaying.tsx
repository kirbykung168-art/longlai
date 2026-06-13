'use client';

import { BRAND, COPY, CURRENT_CHEF, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * NOW PLAYING — the back-of-sleeve card.
 *
 * Audit pass 4: a real interior photograph (the room at night, with
 * the booth set up) is bound into the back-of-sleeve card as a small
 * tucked-in polaroid in the top-right. Gives the chef card a sense
 * of "place" instead of being a pure typographic block. The card
 * stays cream/paper so it reads as a sleeve, and the polaroid sits
 * slightly rotated and shadowed - like it was clipped onto the card.
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

        <Reveal delay={0.15} className="lg:col-span-7">
          <article
            className="relative bg-cream text-vinyl p-8 lg:p-12"
            style={{
              boxShadow: '0 18px 50px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(14,10,7,0.12)',
            }}
          >
            <div className="absolute -top-4 -left-4 rotate-[-4deg] bg-amber text-vinyl mono uppercase tracking-[0.32em] text-[10px] px-3 py-1.5">
              {c.monthLabel}
            </div>

            {/* Tucked-in polaroid - a real photo of the room at night,
                clipped to the top-right of the back-of-sleeve card. */}
            <div className="absolute -top-3 -right-5 lg:-top-4 lg:-right-6 w-[120px] lg:w-[160px] rotate-[5deg] bg-paper p-2 z-10 hidden sm:block"
              style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.35)' }}
              aria-hidden
            >
              <div className="relative w-full aspect-[1/1.15] overflow-hidden bg-tobacco">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS.roomNight}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 50%', filter: 'saturate(0.92) contrast(1.05)' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mono uppercase tracking-[0.32em] text-[8.5px] text-vinyl/65 mt-1.5 px-0.5">The room &middot; last night</p>
            </div>

            <div className="flex items-baseline justify-between border-b border-vinyl/15 pb-5 mb-7 mt-2">
              <p className="mono uppercase tracking-[0.42em] text-[10px] text-vinyl/55">
                Now Playing
              </p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/65">
                {c.verified
                  ? 'Confirmed'
                  : (c as { statusLabel?: string }).statusLabel ?? 'To be announced'}
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

            <div className="mt-7 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 max-w-md">
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Dates</p>
              <p className="font-sans text-[14px] text-vinyl">{c.dates}</p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Side</p>
              <p className="font-sans text-[14px] text-vinyl">A &middot; monthly residency</p>
              <p className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/55">Track</p>
              <p className="font-sans text-[14px] text-vinyl" lang={locale}>{c.signatureTrack[locale]}</p>
            </div>

            <blockquote
              className="display-it text-vinyl/85 mt-8 leading-[1.4] border-l-2 border-amber pl-5"
              style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              lang={locale}
            >
              {c.bioBack[locale]}
            </blockquote>

            <div className="mt-9 flex items-center gap-5">
              <a href="#reserve" className="btn btn-pop">
                {COPY.hero.ctaReserve[locale]} <span className="btn-arrow">&rarr;</span>
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mono uppercase tracking-[0.32em] text-[10px] text-vinyl/65 hover:text-amber transition-colors duration-500"
              >
                DM {BRAND.instagramHandle} &uarr;&#xfe0e;
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
