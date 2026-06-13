'use client';

import { BRAND, COPY, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * THE ROOM — the liner-notes manifesto + the storefront diptych.
 *
 * Audit pass 3:
 *  - Now a two-plate diptych: Plate I is the Lufthansa / Adam Birkan
 *    yellow-shopfront night photo (kept verbatim), and Plate II is
 *    the daytime view of the same window with the LONGLAI · หลงใหล
 *    bubble logo across the doors (Google Maps user contribution).
 *    The pair reads as "the same room - night and day" instead of a
 *    single hero photo, so the storefront finally has scale.
 *  - Captions in the diptych come from the COPY.room object so they
 *    translate cleanly.
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
          <div className="grid grid-cols-1 gap-5">
            <Plate
              tag="Plate I"
              photo={PHOTOS.storefrontWide}
              srcSet={`${PHOTOS.storefront} 1200w, ${PHOTOS.storefrontWide} 1800w`}
              alt="Night view of the brightly-lit yellow Longlai storefront on Anuwong Road, Bangkok - photo by Adam Birkan for Lufthansa Discover."
              caption={r.plate1Caption[locale]}
              credit={BRAND.pressPhotoCredit}
              aspect="aspect-[4/3]"
              objectPos="50% 55%"
              eager
            />
            <Plate
              tag="Plate II"
              photo={PHOTOS.storefrontDay}
              alt="Daytime view of the Longlai shopfront with the bar's bubble logo across the doors and the chalk-graffitied window frame."
              caption={r.plate2Caption[locale]}
              credit="Photo · Longlai (Google Maps · user contribution)"
              aspect="aspect-[4/5] sm:aspect-[4/3]"
              objectPos="50% 40%"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Plate({
  tag,
  photo,
  srcSet,
  alt,
  caption,
  credit,
  aspect,
  objectPos,
  eager,
}: {
  tag: string;
  photo: string;
  srcSet?: string;
  alt: string;
  caption: string;
  credit: string;
  aspect: string;
  objectPos: string;
  eager?: boolean;
}) {
  return (
    <figure className="relative">
      <div className={`relative ${aspect} overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          {...(srcSet ? { srcSet } : {})}
          sizes="(max-width: 1024px) 100vw, 45vw"
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: objectPos, filter: 'contrast(1.04) saturate(0.95)' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(217,154,58,0.10) 0%, rgba(14,10,7,0) 70%), linear-gradient(180deg, rgba(14,10,7,0) 60%, rgba(14,10,7,0.32) 100%)',
        }} />
        <span className="absolute top-4 left-4 bg-amber text-vinyl mono uppercase tracking-[0.32em] text-[10px] px-3 py-1.5">
          {tag}
        </span>
        <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '1.2px solid var(--amber)', borderLeft: '1.2px solid var(--amber)' }} />
        <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '1.2px solid var(--amber)', borderRight: '1.2px solid var(--amber)' }} />
      </div>
      <figcaption className="mono uppercase tracking-[0.32em] text-[10px] text-cream/55 mt-4 flex flex-wrap gap-x-4 gap-y-1">
        <span>{caption}</span>
        <span className="text-cream/40">&middot;</span>
        <span className="text-cream/45">{credit}</span>
      </figcaption>
    </figure>
  );
}
