'use client';

import { COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * SLEEVES — a hand-arranged "wall" of record sleeves and polaroid
 * snapshots from past chef nights. We build the sleeves as SVG
 * compositions (so the page doesn't claim photos it can't cite) and
 * the polaroids as cream paper cards with stylised dish copy.
 *
 * Each tile is rotated -3° / -1° / +1° / +3° to give the wall its
 * deliberate off-grid feel. Hover lifts each tile slightly.
 */
export default function Sleeves() {
  const { locale } = useLocale();
  const s = COPY.sleeves;

  const tiles = TILES;

  return (
    <section id="sleeves" className="relative bg-tobacco text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule-amber)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-end mb-14">
          <Reveal>
            <p className="eyebrow">{s.eyebrow[locale]}</p>
            <h2
              className="display mt-5 leading-[1.04] text-amber-l"
              style={{ fontSize: 'clamp(34px, 4.6vw, 64px)' }}
              lang={locale}
            >
              {s.title[locale]}
            </h2>
            <span className="amber-rule wide mt-7" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[15px] leading-[1.85] text-cream/75 max-w-md lg:ml-auto" lang={locale}>
              {s.intro[locale]}
            </p>
          </Reveal>
        </div>

        {/* The wall — a 4-col / 3-row grid on desktop; each tile is
            randomly rotated within ±3° and lifts on hover. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {tiles.map((t, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06}>
              <SleeveTile
                index={i}
                rotation={ROTATIONS[i % ROTATIONS.length]}
                kind={t.kind}
                title={t.title}
                subtitle={t.subtitle}
                colour={t.colour}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const ROTATIONS = [-3, -1.4, 1.2, 3, -2.2, 0.8, -1.8, 2.4];

const TILES = [
  { kind: 'sleeve' as const, title: 'A1',  subtitle: "Northern · chef one's set",         colour: 'pop' as const },
  { kind: 'polaroid' as const, title: 'Crispy fish',  subtitle: 'three-flavour, chef one', colour: 'cream' as const },
  { kind: 'sleeve' as const, title: 'A2',  subtitle: 'Southern · chef two',               colour: 'amber' as const },
  { kind: 'polaroid' as const, title: 'Khanom jeen', subtitle: 'fermented chilli',         colour: 'cream' as const },
  { kind: 'sleeve' as const, title: 'A3',  subtitle: 'North-East · chef three',           colour: 'tobacco' as const },
  { kind: 'polaroid' as const, title: 'Massaman', subtitle: 'B-side standard',             colour: 'cream' as const },
  { kind: 'sleeve' as const, title: 'B1',  subtitle: 'House standards',                   colour: 'amber' as const },
  { kind: 'polaroid' as const, title: 'Crab fried rice', subtitle: 'jasmine, for two',     colour: 'cream' as const },
];

function SleeveTile({
  index,
  rotation,
  kind,
  title,
  subtitle,
  colour,
}: {
  index: number;
  rotation: number;
  kind: 'sleeve' | 'polaroid';
  title: string;
  subtitle: string;
  colour: 'pop' | 'amber' | 'tobacco' | 'cream';
}) {
  const sleeveBg =
    colour === 'pop'     ? 'bg-pop text-cream' :
    colour === 'amber'   ? 'bg-amber text-vinyl' :
    colour === 'tobacco' ? 'bg-vinyl text-cream border border-amber/45' :
                           'bg-cream text-vinyl';

  return (
    <div
      className="relative aspect-square overflow-hidden transition-transform duration-700 ease-groove will-change-transform hover:-translate-y-1 hover:rotate-0"
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 12px 28px rgba(0,0,0,0.32)',
      }}
    >
      {kind === 'sleeve' ? (
        <SleeveArt index={index} className={sleeveBg} title={title} subtitle={subtitle} />
      ) : (
        <PolaroidArt title={title} subtitle={subtitle} />
      )}
    </div>
  );
}

/**
 * SleeveArt — a square LP-style sleeve. Each variant has a small
 * geometric mark (a circle, a stripe, a corner triangle) so the
 * sleeves read as a set without claiming to be real album covers.
 */
function SleeveArt({
  index,
  className,
  title,
  subtitle,
}: { index: number; className: string; title: string; subtitle: string }) {
  return (
    <div className={`relative w-full h-full p-5 flex flex-col justify-between ${className}`}>
      {/* Mono number top-left */}
      <p className="mono uppercase tracking-[0.42em] text-[10px] opacity-65">{title}</p>

      {/* Centre geometric mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {index % 4 === 0 && (
          <div className="w-[58%] h-[58%] rounded-full border-2 border-current opacity-55" />
        )}
        {index % 4 === 1 && (
          <div className="w-[64%] h-2 bg-current opacity-55" />
        )}
        {index % 4 === 2 && (
          <div className="w-[58%] h-[58%] border-2 border-current rotate-45 opacity-55" />
        )}
        {index % 4 === 3 && (
          <svg viewBox="0 0 100 100" className="w-[58%] h-[58%] opacity-55">
            <path d="M 50 8 L 92 86 L 8 86 Z" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        )}
      </div>

      {/* Title bottom */}
      <div className="relative">
        <p className="display-it text-[18px] leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * PolaroidArt — a cream-card with a stylised dish illustration
 * (concentric rings as a plate) and a handwritten-feeling caption.
 */
function PolaroidArt({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative w-full h-full bg-paper p-3 flex flex-col">
      {/* "Photo" area */}
      <div className="relative w-full aspect-[1.15/1] bg-tobacco overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[68%] aspect-square rounded-full bg-amber/45" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[36%] aspect-square rounded-full bg-pop/85" />
        </div>
        {/* warm vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(217,154,58,0.18) 0%, rgba(0,0,0,0.32) 90%)',
        }} />
      </div>
      {/* Caption area — handwritten feel */}
      <div className="flex-1 flex flex-col justify-center pt-3 pb-1 px-1">
        <p className="display-it text-vinyl text-[16px] leading-tight">{title}</p>
        <p className="font-sans text-[10.5px] text-vinyl/65 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
