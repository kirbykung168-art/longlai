'use client';

import { COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * PRESS STRIP — small "Featured in" row beneath the hero. Currently
 * a single anchor (Lufthansa "In My Hood: Song Wat Road") since
 * that's the verifiable press. Built so additional outlets can be
 * appended trivially.
 */
const PRESS = [
  {
    name: 'Lufthansa Discover · "In My Hood"',
    url:  'https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok',
  },
];

export default function PressStrip() {
  const { locale } = useLocale();
  return (
    <section aria-label="Press features" className="relative bg-vinyl text-cream/75 border-y border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 py-9 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 text-center">
          <p className="mono uppercase tracking-[0.48em] text-[10px] text-amber" lang={locale}>
            {COPY.press.label[locale]}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PRESS.map((p, i) => (
              <li key={p.name} className="flex items-center gap-x-8">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display-it text-cream/90 hover:text-amber transition-colors duration-500 ease-groove text-[16px] lg:text-[18px] tracking-wide"
                >
                  {p.name}
                </a>
                {i < PRESS.length - 1 && (
                  <span aria-hidden className="hidden sm:inline-block w-1 h-1 rotate-45 bg-amber/60" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
