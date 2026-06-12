'use client';

import { BRAND, COPY } from '@/lib/content';
import { useLocale } from './LanguageProvider';
import Reveal from './Reveal';

/**
 * VISIT — address + hours + handles + getting-there, with a sepia-
 * filtered Google Maps embed on the right. Map shows the Anuwong /
 * Chakkrawat pin; on hover, it warms up.
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
                <p className="display text-[22px] leading-snug" lang={locale}>{BRAND.addressLine1}</p>
                <p className="font-sans text-[13.5px] text-cream/70 mt-2 leading-relaxed" lang={locale}>
                  {BRAND.addressLine2}
                </p>
                <p className="mono uppercase tracking-[0.32em] text-[10px] text-amber mt-3">
                  {BRAND.district}
                </p>
              </Row>

              <Row label={v.hours[locale]}>
                <p className="display text-[18px] leading-snug" lang={locale}>{BRAND.hoursOpen}</p>
                <p className="mono uppercase tracking-[0.32em] text-[10.5px] text-pop mt-2.5" lang={locale}>
                  {BRAND.hoursClosed}
                </p>
              </Row>

              <Row label={v.handle[locale]}>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="display-it text-[20px] hover:text-amber transition-colors duration-500">
                  {BRAND.instagramHandle} ↗
                </a>
              </Row>

              <Row label={v.getting[locale]}>
                <p className="font-sans text-[14px] text-cream/80 leading-relaxed" lang={locale}>
                  {v.gettingBody[locale]}
                </p>
              </Row>
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-[5/4] overflow-hidden border border-[var(--rule-amber)] group"
            >
              <iframe
                src={mapsSrc}
                title={`Map · ${BRAND.name}`}
                className="absolute inset-0 w-full h-full transition-[filter] duration-1000 ease-groove"
                style={{ filter: 'grayscale(1) contrast(0.9) sepia(0.4) brightness(0.85)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Amber wash for cohesion */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(60% 50% at 80% 90%, rgba(217,154,58,0.20) 0%, rgba(217,154,58,0) 70%)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '1.2px solid var(--amber)', borderLeft: '1.2px solid var(--amber)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '1.2px solid var(--amber)', borderRight: '1.2px solid var(--amber)' }} />
              <p className="absolute bottom-4 left-4 mono uppercase tracking-[0.32em] text-[10px] text-cream bg-vinyl/65 backdrop-blur-sm px-3 py-1.5">
                Open in Google Maps ↗
              </p>
            </a>
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
