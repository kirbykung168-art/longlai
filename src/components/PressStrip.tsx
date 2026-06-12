'use client';

/**
 * PRESS STRIP — reframed in audit pass 2.
 *
 * Previously a single "FEATURED IN · Lufthansa Discover · In My Hood"
 * row, which read thin against the page (one outlet, no body). The
 * Room section was already carrying the verbatim Note Pongsuang
 * quote on the same source, so this row was duplicating that work
 * without adding press weight.
 *
 * New gesture: a featured-as pull-card. Single source, but framed as
 * an attestation card so the page reads "this is the press anchor"
 * rather than "this is our press strip." Layout:
 *
 *   AS FEATURED IN ·  Lufthansa Discover · In My Hood: Song Wat Road
 *                     ──────────────────────────────────────
 *                     "A meeting place for DJs and musicians."
 *                                                  — Note Pongsuang
 *
 * The amber underline rule grounds the citation; the snippet quote
 * is a different fragment of the Lufthansa piece than the one in
 * The Room (so the two sections don't repeat the same line).
 */
export default function PressStrip() {
  return (
    <section aria-label="Press features" className="relative bg-vinyl text-cream/85 border-y border-[var(--rule)]">
      <div className="absolute inset-0 vinyl-crackle pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-14">
        <div className="grid lg:grid-cols-[auto_1fr] gap-x-12 gap-y-5 items-start">
          {/* Left — eyebrow */}
          <p className="mono uppercase tracking-[0.42em] text-[10px] text-amber lg:pt-1">
            As featured in
          </p>

          {/* Right — citation + amber rule + quote fragment */}
          <div>
            <a
              href="https://www.lufthansa.com/in/en/articles/explore-the-world/in-my-hood-song-wat-road-bangkok"
              target="_blank"
              rel="noopener noreferrer"
              className="display-it text-cream hover:text-amber transition-colors duration-500 ease-groove text-[20px] lg:text-[24px] tracking-wide inline-block"
            >
              Lufthansa Discover · &ldquo;In My Hood: Song Wat Road&rdquo; <span className="text-amber">↗</span>
            </a>
            <span className="block w-24 h-px bg-amber mt-4 opacity-65" />
            <p className="display-it text-cream/85 mt-5 text-[16px] lg:text-[18px] max-w-[60ch] leading-snug">
              &ldquo;A new meeting place for DJs and musicians.&rdquo;
            </p>
            <p className="mono uppercase tracking-[0.32em] text-[10px] text-cream/55 mt-2">
              — Note Pongsuang · 26 January 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
