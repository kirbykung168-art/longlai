'use client';

import { BRAND, COPY, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * THE ROOM - the liner-notes manifesto. The Lufthansa / Adam Birkan
 * yellow-storefront photograph sits on the right side. The left is
 * the manifesto: prose + the Note Pongsuang verbatim pull-quote.
 *
 * Header opens with the brand's "© LONGLAI · SIDE A · BANGKOK 2024 -"
 * liner-notes credit line - small, monospace, amber.
 *
 * Audit pass 2:
 *  - The pull-quote left border + opening / closing quotation marks
 *    pulled from pop-red to amber so the whole quotation reads in
 *    one warm vinyl temperature.
 *  - The "Plate I" corner tag pulled from bg-pop / text-cream to
 *    bg-amber / text-vinyl so pop stays scarce.
 */
export default function Room() {
  const { locale } = useLocale();
  const r = COPY.room;

  return (
    <section id="room" className="relative bg-vinyl text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Reveal className="lg:col-span-6">
          <p className="mono uppercase tracking-[0.42em] text-[10px] text-amber mb-3">
            &copy; Longlai &middot; Side A &middot; Bangkok 2024 &ndash;
          </p>
          <p className="eyebrow">{r.eyebrow[locale]}</p>
          <h2
            className="display mt-5 leading-[1.04]"
            style={{ fontSize: 'clamp(34px, 4.6vw, 68px)' }}
            lang={locale}
          >
            {r.title[locale]}
          </h2>
          <span className="amber-rule wide mt-7" />
          <p
            className="font-sans text-[15.5px] leading-[1.95] text-cream/85 mt-9 max-w-prose"
            lang={locale}
          >
            {r.body[locale]}
          </p>

          <blockquote
            className="display-it text-cream mt-10 leading-[1.3] border-l-2 border-amber pl-6 max-w-[40ch]"
            style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            lang={locale}
          >
            <span className="text-amber mr-1">&ldquo;</span>
            {r.pullQuote[locale]}
            <span className="text-amber ml-1">&rdquo;</span>
          </blockquote>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber mt-5 pl-6">
            &mdash; {r.pullAttribution}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-6">
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS.storefrontWide}
                srcSet={`${PHOTOS.storefront} 1200w, ${PHOTOS.storefrontWide} 1800w`}
                sizes="(max-width: 1024px) 100vw, 45vw"
                alt={`Night view of the brightly-lit yellow Longlai storefront on Anuwong Road, Bangkok - photo by Adam Birkan for Lufthansa Discover.`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-[50%_55%]"
                style={{ filter: 'contrast(1.04) saturate(0.95)' }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{
                background:
                  'radial-gradient(60% 50% at 50% 50%, rgba(217,154,58,0.10) 0%, rgba(14,10,7,0) 70%), linear-gradient(180deg, rgba(14,10,7,0) 60%, rgba(14,10,7,0.32) 100%)',
              }} />
              <span className="absolute top-4 left-4 bg-amber text-vinyl mono uppercase tracking-[0.32em] text-[10px] px-3 py-1.5">
                Plate I
              </span>
              <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '1.2px solid var(--amber)', borderLeft: '1.2px solid var(--amber)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '1.2px solid var(--amber)', borderRight: '1.2px solid var(--amber)' }} />
            </div>
            <figcaption className="mono uppercase tracking-[0.32em] text-[10px] text-cream/55 mt-6">
              {BRAND.pressPhotoCredit}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
