'use client';

import { COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * SLEEVES — a hand-arranged wall of LP sleeves + polaroid snapshots
 * from past chef nights. Each tile is rotated -3 to +3 degrees on
 * purpose so the wall reads as set-out-by-hand, not a CMS grid.
 *
 * Audit pass 2: the polaroid tiles no longer share one identical
 * concentric-ring graphic. Each polaroid now picks a different
 * motif (overlapping plates / khanom jeen nest / stew pot with
 * chilli / rice bowl with chopsticks) so the wall reads as four
 * distinct moments instead of four copies.
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
  { kind: 'sleeve' as const,   title: 'A1', subtitle: "Northern - chef one's set",      colour: 'pop'     as const },
  { kind: 'polaroid' as const, title: 'Crispy fish',     subtitle: 'three-flavour, chef one', colour: 'cream' as const },
  { kind: 'sleeve' as const,   title: 'A2', subtitle: 'Southern - chef two',            colour: 'amber'   as const },
  { kind: 'polaroid' as const, title: 'Khanom jeen',     subtitle: 'fermented chilli',        colour: 'cream' as const },
  { kind: 'sleeve' as const,   title: 'A3', subtitle: 'North-East - chef three',        colour: 'tobacco' as const },
  { kind: 'polaroid' as const, title: 'Massaman',        subtitle: 'B-side standard',         colour: 'cream' as const },
  { kind: 'sleeve' as const,   title: 'B1', subtitle: 'House standards',                colour: 'amber'   as const },
  { kind: 'polaroid' as const, title: 'Crab fried rice', subtitle: 'jasmine, for two',        colour: 'cream' as const },
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
        <PolaroidArt index={index} title={title} subtitle={subtitle} />
      )}
    </div>
  );
}

function SleeveArt({
  index,
  className,
  title,
  subtitle,
}: { index: number; className: string; title: string; subtitle: string }) {
  return (
    <div className={`relative w-full h-full p-5 flex flex-col justify-between ${className}`}>
      <p className="mono uppercase tracking-[0.42em] text-[10px] opacity-65">{title}</p>
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
      <div className="relative">
        <p className="display-it text-[18px] leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * PolaroidArt - each polaroid picks a different motif based on its
 * index so the wall reads as four distinct moments instead of four
 * copies of the same concentric ring (audit pass 2 fix). Indices in
 * TILES are 1, 3, 5, 7 - each gets its own motif.
 */
function PolaroidArt({ index, title, subtitle }: { index: number; title: string; subtitle: string }) {
  const renderPhoto =
    index === 1 ? <PolaroidPlates />     :
    index === 3 ? <PolaroidKhanomJeen /> :
    index === 5 ? <PolaroidPot />        :
                  <PolaroidRiceBowl />;

  return (
    <div className="relative w-full h-full bg-paper p-3 flex flex-col">
      <div className="relative w-full aspect-[1.15/1] bg-tobacco overflow-hidden">
        {renderPhoto}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(217,154,58,0.18) 0%, rgba(0,0,0,0.30) 95%)',
        }} />
      </div>
      <div className="flex-1 flex flex-col justify-center pt-3 pb-1 px-1">
        <p className="display-it text-vinyl text-[16px] leading-tight">{title}</p>
        <p className="font-sans text-[10.5px] text-vinyl/65 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function PolaroidPlates() {
  return (
    <svg viewBox="0 0 200 174" className="absolute inset-0 w-full h-full">
      <ellipse cx="68"  cy="100" rx="52" ry="38" fill="rgba(217,154,58,0.45)" />
      <ellipse cx="130" cy="92"  rx="48" ry="34" fill="rgba(217,154,58,0.55)" />
      <ellipse cx="100" cy="120" rx="42" ry="30" fill="rgba(240,227,200,0.18)" />
      <circle  cx="100" cy="115" r="10" fill="rgba(230,74,38,0.85)" />
    </svg>
  );
}

function PolaroidKhanomJeen() {
  return (
    <svg viewBox="0 0 200 174" className="absolute inset-0 w-full h-full">
      <ellipse cx="100" cy="92" rx="74" ry="56" fill="rgba(240,227,200,0.18)" />
      <ellipse cx="100" cy="92" rx="52" ry="38" fill="rgba(217,154,58,0.55)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="92"
          rx={42 - i * 0.6}
          ry={28 - i * 0.4}
          fill="none"
          stroke="rgba(240,227,200,0.55)"
          strokeWidth="0.6"
          transform={`rotate(${i * 13} 100 92)`}
        />
      ))}
      <circle cx="100" cy="92" r="5" fill="rgba(230,74,38,0.85)" />
    </svg>
  );
}

function PolaroidPot() {
  return (
    <svg viewBox="0 0 200 174" className="absolute inset-0 w-full h-full">
      <circle cx="100" cy="92" r="62" fill="rgba(58,38,24,0.85)" />
      <circle cx="100" cy="92" r="54" fill="rgba(217,154,58,0.55)" />
      <circle cx="100" cy="92" r="36" fill="rgba(240,227,200,0.40)" />
      <path
        d="M 90 80 C 100 76, 116 82, 120 96 C 116 94, 108 92, 100 92 C 96 92, 92 90, 90 80 Z"
        fill="rgba(230,74,38,0.95)"
      />
      <path d="M 90 80 L 84 76 L 88 82 Z" fill="rgba(122,138,76,0.85)" />
    </svg>
  );
}

function PolaroidRiceBowl() {
  return (
    <svg viewBox="0 0 200 174" className="absolute inset-0 w-full h-full">
      <ellipse cx="100" cy="100" rx="66" ry="50" fill="rgba(58,38,24,0.75)" />
      <ellipse cx="100" cy="96"  rx="56" ry="40" fill="rgba(240,227,200,0.70)" />
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 47) % 360;
        const r = 24 + ((i * 7) % 12);
        const cx = 100 + Math.cos((a * Math.PI) / 180) * r;
        const cy =  96 + Math.sin((a * Math.PI) / 180) * (r * 0.7);
        return <circle key={i} cx={cx} cy={cy} r="0.9" fill="rgba(58,38,24,0.45)" />;
      })}
      <line x1="32"  y1="40" x2="160" y2="124" stroke="rgba(217,154,58,0.85)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42"  y1="32" x2="170" y2="116" stroke="rgba(217,154,58,0.85)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
