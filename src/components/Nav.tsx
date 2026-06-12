'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { BRAND, NAV_ITEMS, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import LangToggle from './LangToggle';

/**
 * Sticky nav · transparent over hero, vinyl-black on scroll. The
 * wordmark sits in italic Cormorant for a small "side note" feel,
 * the nav links are monospaced uppercase (liner-notes register), and
 * the active section glows amber.
 *
 * Hand-drawn marker underline on each anchor: drawn left-to-right on
 * hover/active (defined in globals.css as `.marker-underline`).
 */
export default function Nav() {
  const { locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-50% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-groove',
          scrolled
            ? 'bg-vinyl/85 backdrop-blur-md border-b border-[var(--rule)]'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 h-[78px] flex items-center justify-between gap-6">
          {/* Wordmark — Cormorant italic. The mini-disc inline sits
              alongside as a brand mark and slowly spins. */}
          <a
            href="#top"
            className="display-it text-[26px] lg:text-[30px] text-cream flex items-center gap-3 hover:text-amber transition-colors duration-700 ease-groove whitespace-nowrap"
            aria-label={BRAND.name}
          >
            <MiniDisc />
            <span className="hidden sm:inline">{BRAND.name}</span>
            <span className="sm:hidden">L.</span>
          </a>

          <nav className="hidden lg:flex items-center gap-9 flex-nowrap">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={clsx(
                  'mono uppercase tracking-[0.32em] text-[10.5px] transition-colors duration-700 ease-groove marker-underline whitespace-nowrap',
                  active === item.href ? 'text-amber active' : 'text-cream/65 hover:text-cream',
                )}
                lang={locale}
              >
                {item.label[locale]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden md:block"><LangToggle /></div>
            <a
              href="#reserve"
              className="hidden md:inline-flex items-center gap-2 mono uppercase tracking-[0.32em] text-[10.5px] text-cream bg-pop hover:bg-pop-d transition-colors duration-700 ease-groove px-5 py-3"
              lang={locale}
            >
              {COPY.nav.reserve[locale]} <span className="text-[9px]">↗</span>
            </a>
            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={clsx('block w-5 h-px bg-cream transition-transform duration-500', open && 'translate-y-[6px] rotate-45')} />
              <span className={clsx('block w-5 h-px bg-cream transition-opacity duration-500', open && 'opacity-0')} />
              <span className={clsx('block w-5 h-px bg-cream transition-transform duration-500', open && '-translate-y-[6px] -rotate-45')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-vinyl transition-opacity duration-700 ease-groove lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="h-full flex flex-col items-center justify-center gap-7 px-8 relative">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display text-[32px] text-cream hover:text-amber transition-colors duration-700 ease-groove"
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              lang={locale}
            >
              {item.label[locale]}
            </a>
          ))}
          <div className="mt-6"><LangToggle /></div>
          <a
            href="#reserve"
            onClick={() => setOpen(false)}
            className="mono uppercase tracking-[0.32em] text-[12px] text-cream bg-pop px-7 py-4 mt-4"
            lang={locale}
          >
            {COPY.nav.reserve[locale]} ↗
          </a>
        </div>
      </div>
    </>
  );
}

/**
 * MiniDisc — a small spinning vinyl record beside the wordmark.
 * Used as the always-on brand mark.
 */
function MiniDisc() {
  return (
    <span className="relative inline-block w-7 h-7" aria-hidden>
      <span className="absolute inset-0 rounded-full record-grooves spin-disc" />
      <span className="absolute inset-[36%] rounded-full record-label" />
      <span className="absolute left-1/2 top-1/2 w-[2px] h-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vinyl" />
    </span>
  );
}
