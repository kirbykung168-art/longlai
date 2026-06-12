'use client';

import { motion, useReducedMotion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { COPY, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * HERO — the signature moment.
 *
 * Audit pass 2 changes:
 *  · Bottom arc text on the disc shortened to "Bangkok 2024 · Side A"
 *    so the wraparound fits the path cleanly. Previously it overflowed
 *    and read as the broken-looking "NGKOK · RECORDS PLAY, NOT" tail.
 *  · Storefront photograph lifted from opacity 0.18 → 0.28 so the
 *    yellow signage actually glows through behind the disc, instead of
 *    reading as a generic dark wash.
 *  · Added a quiet "Longlai" display title above the eyebrow on the
 *    right column. The disc carries the brand mark visually; the
 *    display title gives the page a typographic anchor for users who
 *    scroll past the disc.
 *
 * Layout:
 *  · Left two-thirds: a large vinyl record sits centred. On mount,
 *    the tonearm above it descends and the disc spins up.
 *  · Right third: display title, eyebrow, italic subtitle, body,
 *    dual CTAs.
 */
export default function Hero() {
  const { locale } = useLocale();
  const ref       = useRef<HTMLElement>(null);
  const reduced   = useReducedMotion();
  const [played, setPlayed] = useState(false);

  // After the tonearm has dropped (~2.4s), flag the signature moment
  // as "played" so the subtitle + CTAs reveal.
  useEffect(() => {
    if (reduced) { setPlayed(true); return; }
    const t = window.setTimeout(() => setPlayed(true), 2200);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const { scrollY } = useScroll();
  const scrollVel   = useVelocity(scrollY);
  const smoothVel   = useSpring(scrollVel, { stiffness: 60, damping: 18 });
  // The base spin duration is 3.6s. Translate scroll velocity into a
  // duration: faster scroll → smaller duration → faster spin.
  const spinDuration = useTransform(smoothVel, (v) => {
    const mag = Math.min(Math.abs(v), 4000);
    return `${(3.6 - (mag / 4000) * 2.6).toFixed(2)}s`;
  });
  // Counter direction on rewind: when velocity is negative (scrolling
  // up), apply a small reverse tilt to suggest the disc fighting back.
  const rewindTilt = useTransform(smoothVel, (v) => {
    if (v >= 0) return 0;
    const mag = Math.min(Math.abs(v), 3000);
    return -(mag / 3000) * 6;
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-vinyl pt-[78px]"
    >
      {/* Storefront photograph — lifted from 0.18 → 0.28 so the
          yellow signage starts to glow through behind the disc. */}
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

      {/* Vinyl-crackle grain — the live class drifts subtly */}
      <div className="absolute inset-0 vinyl-crackle live pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[calc(100svh-78px)]">
        {/* LEFT — the record. Roughly 7 cols on desktop. */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-[min(86vw,560px)] aspect-square">
            {/* Tonearm — drops on mount, descends from upper-right
                onto the rim of the record. */}
            <Tonearm reduced={!!reduced} />

            {/* Record */}
            <motion.div
              className="absolute inset-0"
              style={reduced ? undefined : { rotate: rewindTilt }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={
                  reduced
                    ? undefined
                    : { animationDuration: spinDuration as unknown as string }
                }
              >
                <Record locale={locale} title={COPY.hero.title[locale]} />
              </motion.div>
            </motion.div>

            {/* Amber needle glow underneath */}
            <div
              className="absolute -inset-8 -z-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(217,154,58,0.30) 0%, rgba(217,154,58,0) 65%)',
              }}
            />
          </div>
        </div>

        {/* RIGHT — display wordmark, eyebrow, subtitle, body, CTAs.
            Reveals after the needle has dropped (post-`played` flag). */}
        <motion.div
          className="lg:col-span-5 flex flex-col items-start lg:pl-4 lg:border-l border-[var(--rule-amber)] py-12 lg:py-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: played ? 1 : 0, y: played ? 0 : 24 }}
          transition={{ duration: 1.2, ease: [0.16, 0.84, 0.30, 1] }}
        >
          {/* Display title — the brand mark in big Bowlby so the page
              has a typographic anchor even when the disc isn't in
              frame. Sits above the eyebrow to keep the visual order
              (mark → subtitle → body) consistent with editorial press
              card grammar. */}
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
            <a href="#reserve" className="btn btn-pop" lang={locale}>
              {COPY.hero.ctaReserve[locale]} <span className="btn-arrow">→</span>
            </a>
            <a href="#now" className="btn btn-ghost" lang={locale}>
              {COPY.hero.ctaSeeChef[locale]} <span className="btn-arrow">↓</span>
            </a>
          </div>

          {/* Drop the needle hint */}
          <p className="mono uppercase tracking-[0.42em] text-[10px] text-cream/45 mt-12" lang={locale}>
            {COPY.hero.scrollHint[locale]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Record — the big disc, with grooves, a coloured centre label, and
 * the wordmark wrapped around it. Bottom arc shortened in audit pass
 * 2 — was "Side A · Bangkok · Records play, not playlists" which
 * overflowed the arc. Now "Bangkok 2024 · Side A" fits cleanly.
 */
function Record({ locale, title }: { locale: string; title: string }) {
  const bottomArcText = locale === 'en'
    ? 'Bangkok 2024 · Side A'
    : 'กรุงเทพ 2024 · Side A';
  return (
    <div className="relative w-full h-full">
      {/* Grooved disc — the .spin-disc class animates rotation */}
      <div className="absolute inset-0 rounded-full record-grooves spin-disc" />

      {/* Subtle inner ring — separates the grooved area from the label */}
      <div className="absolute inset-[28%] rounded-full border border-amber/40" />

      {/* Centre label — pop colour disc with "Longlai" in display
          Bowlby across the top arc and Cormorant italic across the
          bottom arc. */}
      <div className="absolute inset-[30%] rounded-full record-label flex items-center justify-center">
        <svg viewBox="-100 -100 200 200" className="w-full h-full" aria-label={title}>
          <defs>
            <path
              id="arc-top"
              d="M -70 0 A 70 70 0 0 1 70 0"
              fill="none"
            />
            <path
              id="arc-bottom"
              d="M -64 6 A 64 64 0 0 0 64 6"
              fill="none"
            />
          </defs>
          {/* Top arc — display name */}
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
          {/* Bottom arc — italic, shortened so the line fits the path */}
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
          {/* Spindle dot */}
          <circle cx="0" cy="0" r="4" fill="var(--vinyl)" />
        </svg>
      </div>

      {/* Tiny highlight on the disc — gives it dimension */}
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

/**
 * Tonearm — sits above the upper right of the record. On mount, the
 * .tonearm class drops it from -22° to 0° via a needle-spring keyframe.
 */
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

        {/* Pivot base — a small disc at the upper-right corner */}
        <g transform="translate(295, 28)">
          <circle r="14" fill="var(--tobacco)" stroke="var(--amber)" strokeWidth="1.2" />
          <circle r="4"  fill="var(--vinyl)" />
        </g>

        {/* The arm itself — uses the .tonearm class to keyframe-drop
            from -22° to 0°. Origin is the pivot point. */}
        <g
          className={reduced ? '' : 'tonearm'}
          style={{ transformOrigin: '295px 28px' }}
        >
          {/* Counterweight */}
          <rect x="280" y="20" width="36" height="16" rx="4" fill="url(#arm-grad)" />
          {/* Main arm */}
          <rect x="60" y="24" width="240" height="8" rx="4" fill="url(#arm-grad)" />
          {/* Headshell */}
          <rect x="48" y="20" width="22" height="16" rx="2" fill="var(--tobacco)" stroke="var(--amber)" strokeWidth="1" />
          {/* Stylus / needle */}
          <path d="M 56 36 L 50 50 L 62 50 Z" fill="var(--amber)" />
          {/* Tiny "tracking" mark at needle tip */}
          <circle cx="56" cy="50" r="1.6" fill="var(--cream)" />
        </g>
      </svg>
    </div>
  );
}
