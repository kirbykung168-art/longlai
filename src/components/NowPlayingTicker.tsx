'use client';

import { CURRENT_CHEF } from '@/lib/content';
import { useLocale } from './LanguageProvider';

/**
 * NOW PLAYING TICKER — an endless marquee that scrolls across the
 * page just above the Tracklist section. Reads:
 *
 *   • NOW PLAYING · CHEF NAME · SIDE A · 04 JUN – 30 JUN 2026 · KHANOM JEEN, FERMENTED CHILLI ·
 *
 * Repeated, with a small spinning disc and a pop-red dot between
 * segments. Mono / uppercase / wide-tracked.
 */
export default function NowPlayingTicker() {
  const { locale } = useLocale();
  const c = CURRENT_CHEF;

  const segments = [
    'Now Playing',
    c.name,
    'Side A',
    c.dates,
    c.signatureTrack[locale],
  ];

  // Render the segments twice in a row so the `marquee` keyframe (which
  // translates -50%) loops seamlessly.
  return (
    <div className="relative bg-vinyl border-y border-[var(--rule-amber)] overflow-hidden">
      <div className="marquee py-3 mono uppercase tracking-[0.42em] text-[10px] text-amber">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center gap-12 pr-12 shrink-0">
            {segments.map((s, i) => (
              <span key={`${rep}-${i}`} className="flex items-center gap-12">
                <span className="text-cream/90">{s}</span>
                {i < segments.length - 1 && <span className="text-pop">●</span>}
              </span>
            ))}
            <span className="text-pop">●</span>
            <MiniSpinner />
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniSpinner() {
  return (
    <span className="relative inline-block w-4 h-4 shrink-0" aria-hidden>
      <span className="absolute inset-0 rounded-full record-grooves spin-disc" />
      <span className="absolute inset-[36%] rounded-full record-label" />
    </span>
  );
}
