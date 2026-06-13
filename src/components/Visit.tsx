'use client';

import { BRAND, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * VISIT - address, hours, handles, getting-there, and the map.
 *
 * Audit pass 4:
 *  - Address and hours pulled from .display (Bowlby) to .display-it
 *    (Cormorant italic). Bowlby at 18-22px reads as a billboard for
 *    info that wants to feel like the back of a sleeve - editorial,
 *    pencil-on-paper, not a sign. Cormorant italic matches the
 *    register of the pull-quote and the chef's discipline.
 *  - "Closed Mondays" pulled from text-pop to text-amber. Pop stays
 *    scarce - CTAs and the disc label only - as the audit-pass-2
 *    rule sets.
 *  - The map block is no longer a bare iframe in a thin frame. It's
 *    now a record-store flier - the iframe lives behind a tape-corner
 *    frame, with a hand-set "WE'RE HERE" stamp pointing to the pin
 *    and a chalk-style "X" mark at the actual coordinates. Treats
 *    the map the way a poster on the wall of the bar would.
 */
export default function Visit() {
  const { locale } = useLocale();
  const v = COPY.visit;

  const mapsSrc = `https://maps.google.com/maps?q=${BRAND.lat}%2C${BRAND.lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="visit" className="relative bg-vinyl text-cream py-28 lg:py-36 overflow-hidden border-t border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">{v.eyebrow[locale]}</p>
          <h2
            className="display leading-[1.04] mt-5 max-w-3xl"
            style={{ fontSize: 'clamp(34px, 4.8vw, 72px)' }}
            lang={locale}
          >
            {v.title[locale]}
          </h2>
          <span className="amber-rule wide mt-7 inline-block" />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal delay={0.15}>
            <dl className="space-y-9">
              <Row label={v.address[locale]}>
                <p className="display-it text-cream text-[24px] leading-snug" lang={locale}>{BRAND.addressLine1}</p>
                <p className="font-sans text-[13.5px] text-cream/70 mt-2 leading-relaxed" lang={locale}>
                  {BRAND.addressLine2}
                </p>
                <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber mt-3">
                  {BRAND.district}
                </p>
              </Row>

              <Row label={v.hours[locale]}>
                <p className="display-it text-cream text-[20px] leading-snug" lang={locale}>{BRAND.hoursOpen}</p>
                <p className="mono uppercase tracking-[0.32em] text-[10.5px] text-amber mt-2.5" lang={locale}>
                  {BRAND.hoursClosed}
                </p>
              </Row>

              <Row label={v.handle[locale]}>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="display-it text-[20px] hover:text-amber transition-colors duration-500">
                  {BRAND.instagramHandle} &uarr;&#xfe0e;
                </a>
              </Row>

              <Row label={v.getting[locale]}>
                <p className="font-sans text-[14px] text-cream/80 leading-relaxed" lang={locale}>
                  {v.gettingBody[locale]}
                </p>
              </Row>
            </dl>
          </Reveal>

          {/* RECORD-STORE FLIER MAP — taped corners, hand-set "we're here"
              stamp, chalk-style X marking the pin. The Google iframe lives
              behind it. */}
          <Reveal delay={0.25}>
            <div className="relative">
              {/* Tape corners — masking-tape strips at four corners */}
              <span aria-hidden className="absolute -top-3 -left-3 w-16 h-5 rotate-[-8deg] z-20" style={{
                background: 'rgba(217,154,58,0.55)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
              <span aria-hidden className="absolute -top-3 -right-3 w-16 h-5 rotate-[6deg] z-20" style={{
                background: 'rgba(217,154,58,0.55)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
              <span aria-hidden className="absolute -bottom-3 -left-3 w-16 h-5 rotate-[5deg] z-20" style={{
                background: 'rgba(232,182,88,0.50)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
              <span aria-hidden className="absolute -bottom-3 -right-3 w-16 h-5 rotate-[-7deg] z-20" style={{
                background: 'rgba(232,182,88,0.50)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />

              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-[5/4] overflow-hidden bg-tobacco group"
                style={{
                  boxShadow: '0 18px 50px rgba(0,0,0,0.42), inset 0 0 0 1.5px rgba(217,154,58,0.55)',
                }}
              >
                <iframe
                  src={mapsSrc}
                  title={`Map · ${BRAND.name}`}
                  className="absolute inset-0 w-full h-full transition-[filter] duration-1000 ease-groove"
                  style={{ filter: 'grayscale(1) contrast(0.85) sepia(0.55) brightness(0.78) saturate(0.9)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Amber wash for cohesion */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(60% 50% at 70% 50%, rgba(217,154,58,0.28) 0%, rgba(217,154,58,0) 70%)' }} />

                {/* Hand-set "WE'RE HERE" stamp pointing to the pin */}
                <div aria-hidden className="absolute top-[36%] right-[28%] z-10 pointer-events-none">
                  <div className="relative">
                    <span className="block mono uppercase tracking-[0.42em] text-[10.5px] text-vinyl bg-amber px-3 py-1.5 -rotate-[6deg]"
                      style={{ boxShadow: '2px 2px 0 rgba(14,10,7,0.45)' }}>
                      We&apos;re here
                    </span>
                    {/* arrow tail */}
                    <svg viewBox="0 0 80 60" className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24" aria-hidden>
                      <path d="M 40 4 C 48 18, 52 32, 58 48" fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="5 4" />
                      <path d="M 50 40 L 60 50 L 50 54" fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Chalk-style X over the pin */}
                <svg aria-hidden viewBox="0 0 40 40" className="absolute top-[63%] right-[16%] w-9 h-9 z-10 pointer-events-none">
                  <path d="M 6 6 L 34 34 M 34 6 L 6 34" stroke="var(--pop)" strokeWidth="3" strokeLinecap="round" />
                </svg>

                {/* Tape-corner inner amber tick marks */}
                <span aria-hidden className="absolute pointer-events-none" style={{ top: 12, left: 12, width: 24, height: 24, borderTop: '1.4px solid var(--amber)', borderLeft: '1.4px solid var(--amber)' }} />
                <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 12, right: 12, width: 24, height: 24, borderBottom: '1.4px solid var(--amber)', borderRight: '1.4px solid var(--amber)' }} />

                <p className="absolute bottom-4 left-4 mono uppercase tracking-[0.32em] text-[10px] text-cream bg-vinyl/65 backdrop-blur-sm px-3 py-1.5 z-10">
                  Open in Google Maps &uarr;&#xfe0e;
                </p>
              </a>

              <p className="mono uppercase tracking-[0.32em] text-[9.5px] text-cream/45 mt-5 text-right">
                13.7395, 100.5045 &middot; Side A door, Anuwong Rd
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mono uppercase tracking-[0.42em] text-[10px] text-amber mb-3">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
