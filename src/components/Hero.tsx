'use client';

import { motion, useReducedMotion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BRAND, COPY, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * HERO - the signature moment.
 *
 * Audit pass 4 (revised):
 *  - Disc spin is now a fixed 3.6s CSS animation, no longer driven
 *    by a CSS custom property updated by framer. The previous
 *    --spin-dur cascade looked correct in isolation but framer's
 *    useSpring/useMotionTemplate emit on every animation frame even
 *    at idle - each emission rewrote the parent's inline style,
 *    which silently restarted any CSS animation that read the
 *    custom property via var(). Result: animation reported
 *    "running" but stuck at currentTime: 0. Reverting to a fixed
 *    duration on .spin-disc keeps the disc visibly spinning.
 *  - Rewind tilt stays. Applied via framer to a wrapper motion.div
 *    that does NOT also carry a CSS custom property, so the CSS
 *    animation on the .spin-disc descendant runs cleanly.
 *  - Scroll-velocity disc speed-up is parked for now; can be added
 *    later by driving rotation purely in framer (a motion value
 *    that's tween-animated, not a CSS animation).
 */
export default function Hero() {
  const { locale } = useLocale();
  const ref       = useRef<HTMLElement>(null);
  const reduced   = useReducedMotion();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (reduced) { setPlayed(true); return; }
    const t = window.setTimeout(() => setPlayed(true), 2200);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const { scrollY } = useScroll();
  const scrollVel   = useVelocity(scrollY);
  const smoothVel   = useSpring(scrollVel, { stiffness: 60, damping: 18 });

  // Rewind tilt - only on negative velocity (scroll up). Lower
  // threshold (1500) so normal upward scrolls register.
  const rewindTilt = useTransform(smoothVel, (v) => {
    if (v >= 0) return 0;
    const mag = Math.min(Math.abs(v), 1500);
    return -(mag / 1500) * 8;
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-vinyl pt-[78px]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.28]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.storefront}
          srcSet={`${PHOTOS.storefront} 1200w, ${PHOTOS.storefrontWide} 1800w`}
          sizes="100vw"
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[50%_55%]"
          style={{ filter: 'saturate(0.78) contrast(1.04) brightness(0.92) sepia(0.14)' }}
        />
        <div className="absolute inset-0" style={{
          background:
            'radial-gradient(900px 700px at 50% 60%, rgba(217,154,58,0.18) 0%, rgba(14,10,7,0) 60%), linear-gradient(180deg, rgba(14,10,7,0.62) 0%, rgba(14,10,7,0.48) 50%, rgba(14,10,7,0.88) 100%)',
        }} />
      </div>

      <div className="absolute inset-0 vinyl-crackle live pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[calc(100svh-78px)]">
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-[min(86vw,560px)] aspect-square">
            <Tonearm reduced={!!reduced} />

            {/* Rewind tilt wrapper - rotate-only. No CSS custom
                properties here so the descendant .spin-disc CSS
                animation runs uninterrupted. */}
            <motion.div
              className="absolute inset-0"
              style={reduced ? undefined : { rotate: rewindTilt }}
            >
              <Record locale={locale} title={COPY.hero.title[locale]} />
            </motion.div>

            <div
              className="absolute -inset-8 -z-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(217,154,58,0.30) 0%, rgba(217,154,58,0) 65%)',
              }}
            />
          </div>
        </div>

        <motion.div
          className="lg:col-span-5 flex flex-col items-start lg:pl-4 lg:border-l border-[var(--rule-amber)] py-12 lg:py-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: played ? 1 : 0, y: played ? 0 : 24 }}
          transition={{ duration: 1.2, ease: [0.16, 0.84, 0.30, 1] }}
        >
          <h1
            className="display text-cream leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(56px, 7.4vw, 112px)' }}
            lang={locale}
          >
            {COPY.hero.title[locale]}
          </h1>

          <p className="eyebrow mt-6" lang={locale}>
            {COPY.hero.eyebrow[locale]}
          </p>

          <p
            className="display-it text-amber-l mt-4"
            style={{ fontSize: 'clamp(20px, 1.9vw, 26px)' }}
            lang={locale}
          >
            {COPY.hero.subtitle[locale]}
          </p>

          <p className="font-sans text-[15.5px] leading-[1.85] text-cream/85 mt-8 max-w-prose" lang={locale}>
            {COPY.hero.body[locale]}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={BRAND.dmUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-pop"
              lang={locale}
              aria-label={locale === 'th' ? 'เปิด DM Instagram กับ @longlai.bar เพื่อจอง' : 'Open a direct Instagram DM with @longlai.bar to reserve'}
            >
              {COPY.hero.ctaReserve[locale]} <span className="btn-arrow">&rarr;</span>
            </a>
            <a href="#now" className="btn btn-ghost" lang={locale}>
              {COPY.hero.ctaSeeChef[locale]} <span className="btn-arrow">&darr;</span>
            </a>
          </div>

          <p className="mono uppercase tracking-[0.42em] text-[10px] text-cream/45 mt-12" lang={locale}>
            {COPY.hero.scrollHint[locale]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Record({ locale, title }: { locale: string; title: string }) {
  const bottomArcText = locale === 'en'
    ? 'Bangkok 2024 · Side A'
    : 'กรุงเทพ 2024 · Side A';
  return (
    <div className="relative w-full h-full">
      {/* Rotating disc - .spin-disc on the wrapper so the wordmark
          (which is the only visible asymmetric thing) rotates with
          the grooves and label. */}
      <div className="absolute inset-0 spin-disc">
        <div className="absolute inset-0 rounded-full record-grooves" />
        <div className="absolute inset-[28%] rounded-full border border-amber/40" />
        <div className="absolute inset-[30%] rounded-full record-label flex items-center justify-center">
          <svg viewBox="-100 -100 200 200" className="w-full h-full" aria-label={title}>
            <defs>
              <path id="arc-top"    d="M -70 0 A 70 70 0 0 1 70 0" fill="none" />
              <path id="arc-bottom" d="M -64 6 A 64 64 0 0 0 64 6" fill="none" />
            </defs>
            <text
              fontFamily="var(--font-display), Bowlby One, Impact, serif"
              fontSize="22"
              fill="var(--cream)"
              letterSpacing="2"
              style={{ textTransform: 'uppercase' }}
            >
              <textPath href="#arc-top" startOffset="50%" textAnchor="middle">
                {title}
              </textPath>
            </text>
            <text
              fontFamily="var(--font-cormorant), Cormorant Garamond, serif"
              fontStyle="italic"
              fontSize="11"
              fill="var(--cream)"
              letterSpacing="3"
              style={{ textTransform: 'uppercase' }}
            >
              <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">
                {bottomArcText}
              </textPath>
            </text>
            <circle cx="0" cy="0" r="4" fill="var(--vinyl)" />
          </svg>
        </div>
      </div>

      {/* Static shine - the room's light source doesn't move. */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 22%)',
        }}
      />
    </div>
  );
}

function Tonearm({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute -top-6 -right-4 lg:-top-12 lg:-right-12 w-[58%] aspect-[1.6/1] pointer-events-none" aria-hidden>
      <svg viewBox="0 0 320 200" className="w-full h-full">
        <defs>
          <linearGradient id="arm-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="var(--amber-l)" />
            <stop offset="100%" stopColor="var(--amber)" />
          </linearGradient>
        </defs>

        <g transform="translate(295, 28)">
          <circle r="14" fill="var(--tobacco)" stroke="var(--amber)" strokeWidth="1.2" />
          <circle r="4"  fill="var(--vinyl)" />
        </g>

        <g
          className={reduced ? '' : 'tonearm'}
          style={{ transformOrigin: '295px 28px' }}
        >
          <rect x="280" y="20" width="36" height="16" rx="4" fill="url(#arm-grad)" />
          <rect x="60" y="24" width="240" height="8" rx="4" fill="url(#arm-grad)" />
          <rect x="48" y="20" width="22" height="16" rx="2" fill="var(--tobacco)" stroke="var(--amber)" strokeWidth="1" />
          <path d="M 56 36 L 50 50 L 62 50 Z" fill="var(--amber)" />
          <circle cx="56" cy="50" r="1.6" fill="var(--cream)" />
        </g>
      </svg>
    </div>
  );
}
