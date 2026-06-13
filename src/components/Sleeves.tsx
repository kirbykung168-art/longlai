'use client';

import { COPY, PHOTOS } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * SLEEVES — the record-sleeve wall.
 *
 * Audit pass 3:
 *  - The four polaroid tiles now show REAL photographs of the bar
 *    instead of SVG illustrations. Each photo is a Google Maps
 *    user-contributed image of Longlai Anuwong, verified against
 *    the yellow-shopfront signage. The polaroid framing (paper
 *    border + caption strip below) and the hand-arranged
 *    -3°/+3° tilt are preserved - the wall still reads as set out
 *    by hand, not as a CMS grid.
 *  - Sleeve tiles (A1/A2/A3/B1) stay as graphic LP-sleeve
 *    illustrations so the wall doesn't become a photo grid; the
 *    rhythm of sleeve / photo / sleeve / photo reads the way a real
 *    record-bar's wall does.
 */
export default function Sleeves() {
  const { locale } = useLocale();
  const s = COPY.sleeves;

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
          {TILES.map((t, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06}>
              <SleeveTile
                index={i}
                rotation={ROTATIONS[i % ROTATIONS.length]}
                tile={t}
              />
            </Reveal>
          ))}
        </div>

        <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/45 mt-10 text-right">
          Photos · Longlai (Google Maps user contributions)
        </p>
      </div>
    </section>
  );
}

const ROTATIONS = [-3, -1.4, 1.2, 3, -2.2, 0.8, -1.8, 2.4];

type Tile =
  | { kind: 'sleeve';   title: string; subtitle: string; colour: 'pop' | 'amber' | 'tobacco' | 'cream' }
  | { kind: 'polaroid'; title: string; subtitle: string; photo: string; alt: string; objectPos?: string };

const TILES: Tile[] = [
  { kind: 'sleeve',   title: 'A1', subtitle: "Northern · chef one's set",              colour: 'pop' },
  { kind: 'polaroid', title: 'On the decks',          subtitle: 'Twin turntables at the window', photo: PHOTOS.turntables,
    alt: 'A DJ at twin turntables and a mixer inside Longlai, the yellow shopfront windows behind.', objectPos: '50% 50%' },
  { kind: 'sleeve',   title: 'A2', subtitle: 'Southern · chef two',                    colour: 'amber' },
  { kind: 'polaroid', title: 'The wall',              subtitle: 'Sleeves and the mural', photo: PHOTOS.vinylWall,
    alt: 'The record wall at Longlai: shelves of LP sleeves and a hand-painted vinyl mural behind.', objectPos: '60% 45%' },
  { kind: 'sleeve',   title: 'A3', subtitle: 'North-East · chef three',                colour: 'tobacco' },
  { kind: 'polaroid', title: 'Late table',            subtitle: 'A glass, a small plate', photo: PHOTOS.barCocktail,
    alt: 'A glass of wine and a small plate at the Longlai bar under warm red light.', objectPos: '50% 55%' },
  { kind: 'sleeve',   title: 'B1', subtitle: 'House standards',                        colour: 'amber' },
  { kind: 'polaroid', title: 'The room',              subtitle: 'A night, a set, friends', photo: PHOTOS.roomNight,
    alt: 'Inside Longlai at night: friends and a guest performer under warm purple light.', objectPos: '50% 55%' },
];

function SleeveTile({
  index,
  rotation,
  tile,
}: {
  index: number;
  rotation: number;
  tile: Tile;
}) {
  return (
    <div
      className="relative aspect-square overflow-hidden transition-transform duration-700 ease-groove will-change-transform hover:-translate-y-1 hover:rotate-0"
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 12px 28px rgba(0,0,0,0.32)',
      }}
    >
      {tile.kind === 'sleeve'
        ? <SleeveArt index={index} colour={tile.colour} title={tile.title} subtitle={tile.subtitle} />
        : <PolaroidPhoto title={tile.title} subtitle={tile.subtitle} photo={tile.photo} alt={tile.alt} objectPos={tile.objectPos} />}
    </div>
  );
}

function SleeveArt({
  index,
  colour,
  title,
  subtitle,
}: { index: number; colour: 'pop' | 'amber' | 'tobacco' | 'cream'; title: string; subtitle: string }) {
  const bg =
    colour === 'pop'     ? 'bg-pop text-cream' :
    colour === 'amber'   ? 'bg-amber text-vinyl' :
    colour === 'tobacco' ? 'bg-vinyl text-cream border border-amber/45' :
                           'bg-cream text-vinyl';
  return (
    <div className={`relative w-full h-full p-5 flex flex-col justify-between ${bg}`}>
      <p className="mono uppercase tracking-[0.42em] text-[10px] opacity-65">{title}</p>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {index % 4 === 0 && <div className="w-[58%] h-[58%] rounded-full border-2 border-current opacity-55" />}
        {index % 4 === 1 && <div className="w-[64%] h-2 bg-current opacity-55" />}
        {index % 4 === 2 && <div className="w-[58%] h-[58%] border-2 border-current rotate-45 opacity-55" />}
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
 * PolaroidPhoto - the polaroid framing (paper border + caption strip)
 * stays the same as the SVG version; only the inner photo well swaps
 * to a real photograph. A subtle vignette stays so the photo reads as
 * a polaroid rather than a flat product shot.
 */
function PolaroidPhoto({
  title,
  subtitle,
  photo,
  alt,
  objectPos,
}: { title: string; subtitle: string; photo: string; alt: string; objectPos?: string }) {
  return (
    <div className="relative w-full h-full bg-paper p-3 flex flex-col">
      <div className="relative w-full aspect-[1.15/1] bg-tobacco overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: objectPos || '50% 50%', filter: 'saturate(0.92) contrast(1.04)' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(217,154,58,0.12) 0%, rgba(0,0,0,0.28) 95%)',
        }} />
      </div>
      <div className="flex-1 flex flex-col justify-center pt-3 pb-1 px-1">
        <p className="display-it text-vinyl text-[16px] leading-tight">{title}</p>
        <p className="font-sans text-[10.5px] text-vinyl/65 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
