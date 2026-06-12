'use client';

import { BRAND, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * FOOTER — quiet credits row. The brand wordmark, the handle, photo
 * credit, and the "tribute site, not affiliated" disclaimer.
 */
export default function Footer() {
  const { locale } = useLocale();
  return (
    <footer className="relative bg-groove text-cream/65 py-14 border-t border-[var(--rule-amber)]">
      <div className="absolute top-0 left-0 right-0 gold-thread" />
      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-3 gap-8 items-start">
        <div>
          <p className="display-it text-cream text-[22px]">Longlai · ล่องลอย</p>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber mt-2">
            13/9 Anuwong · Chakkrawat · Bangkok
          </p>
        </div>

        <div className="space-y-2">
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45">Connect</p>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            {BRAND.instagramHandle} ↗
          </a>
          <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            Google Maps pin ↗
          </a>
          <a href="/sources" className="block font-sans text-[14px] hover:text-amber transition-colors duration-500">
            Sources · what we cited ↗
          </a>
        </div>

        <div className="space-y-2 lg:text-right">
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45">Press · photo</p>
          <a href={BRAND.pressPhotoCreditUrl} target="_blank" rel="noreferrer" className="block font-sans text-[13.5px] hover:text-amber transition-colors duration-500">
            {BRAND.pressPhotoCredit} ↗
          </a>
          <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45 mt-4 lg:mt-6" lang={locale}>
            {COPY.footer.builtBy[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
