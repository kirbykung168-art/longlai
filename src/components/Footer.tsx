'use client';

import { BRAND, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * FOOTER — quiet credits row + a "Last Spun" log.
 *
 * Audit pass 4 adds a "LAST SPUN" badge with three rotating record
 * mentions from the bar's vocabulary: late-night, dinner set, dub
 * Sunday. Picked client-side from a fixed list so the page feels
 * "this is what was on the turntable last time" without server
 * state. The three options share the brand's vinyl-warm register.
 */
export default function Footer() {
  const { locale } = useLocale();
  return (
    <footer className="relative bg-groove text-cream/65 py-14 border-t border-[var(--rule-amber)]">
      <div className="absolute top-0 left-0 right-0 gold-thread" />

      {/* Tribute disclosure band — always visible above the credits row. */}
      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 mb-10 pb-8 border-b border-[var(--rule)]">
        <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/55 leading-relaxed text-center lg:text-left" lang={locale}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber/80 align-middle mr-3" aria-hidden />
          {COPY.footer.builtBy[locale]}
        </p>
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-4 gap-8 items-start">
        <div>
          <p className="display-it text-cream text-[22px]">Longlai &middot; ล่องลอย</p>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber mt-2">
            13/9 Anuwong &middot; Chakkrawat &middot; Bangkok
          </p>
        </div>

        <div className="space-y-2">
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45">Connect</p>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            {BRAND.instagramHandle} &uarr;&#xfe0e;
          </a>
          <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            Google Maps pin &uarr;&#xfe0e;
          </a>
          <a href="/sources" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            Sources &middot; what we cited &uarr;&#xfe0e;
          </a>
        </div>

        <LastSpun />

        <div className="space-y-2 lg:text-right">
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45">Press &middot; photo</p>
          <a href={BRAND.pressPhotoCreditUrl} target="_blank" rel="noreferrer" className="block font-sans text-[13.5px] hover:text-amber transition-colors duration-500">
            {BRAND.pressPhotoCredit} &uarr;&#xfe0e;
          </a>
          <p className="mono uppercase tracking-[0.32em] text-[9.5px] text-cream/35 mt-4 lg:mt-6" lang={locale}>
            <a href="/sources" className="hover:text-amber transition-colors duration-500">Read what we cited &rarr;</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * LAST SPUN - a small "what was on the turntable last close" badge.
 * Three options, picked deterministically by day-of-year so it
 * cycles without server state and stays the same all day.
 */
function LastSpun() {
  const day = Math.floor((Date.now() / 86400000));
  const options = [
    { side: 'Side B · close', title: 'Sun Ra Arkestra, Lanquidity', when: 'Sun 02:14 AM' },
    { side: 'Side A · late', title: 'Khruangbin, Mordechai', when: 'Sat 11:42 PM' },
    { side: 'Bonus track',   title: 'Tortoise, TNT (A2 looped)',   when: 'Fri 01:08 AM' },
  ];
  const pick = options[day % options.length];
  return (
    <div className="space-y-2">
      <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber/85 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber animate-pulse" aria-hidden />
        Last spun
      </p>
      <p className="display-it text-cream text-[16px] leading-snug">{pick.title}</p>
      <p className="mono uppercase tracking-[0.32em] text-[9.5px] text-cream/45">
        {pick.side} &middot; {pick.when}
      </p>
    </div>
  );
}
