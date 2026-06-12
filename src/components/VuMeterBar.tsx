'use client';

import { useEffect, useState } from 'react';

/**
 * VU METER BAR — a thin scroll-progress bar fixed to the bottom of
 * the viewport. The progress fills as a pair of channel bars (left
 * + right) that read as a VU meter — bouncing slightly with a 0.9s
 * pulse animation while filling proportionally to scroll position.
 *
 * Audit pass 2: VU meter dimmed considerably.
 *   - Bar height slimmed h-3 -> h-2.5 so it occupies less vertical
 *     real estate at all times.
 *   - Lit cells run at /85 alpha (was solid); unlit at /10 (was /15).
 *   - Right channel pulled from pop-red to amber-l so the two
 *     channels read in one vinyl-warm temperature, and pop stays
 *     scarce for the Reserve CTAs and the disc label only.
 *   - Centre dot demoted from pop to amber/60.
 *   - Outer container opacity 0.75 so the bar fades into the page
 *     rather than foregrounding itself.
 */
export default function VuMeterBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bars = 28;
  const leftLit  = Math.round(progress * bars);
  const rightLit = Math.round(progress * bars);

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-[1480px] px-3 lg:px-6 pb-2">
        <div className="bg-vinyl/75 backdrop-blur-sm border border-amber/20 px-3 py-1 flex items-end gap-1.5 opacity-75">
          <span className="mono uppercase tracking-[0.32em] text-[9px] text-amber/65 mr-2 shrink-0 mb-[2px]">L</span>
          <div className="flex items-end gap-[2px] flex-1 h-2.5">
            {Array.from({ length: bars }).map((_, i) => (
              <span
                key={`l-${i}`}
                className={`flex-1 h-full origin-bottom ${i < leftLit ? 'vu-bar bg-amber/85' : 'bg-amber/10'}`}
                style={{ animationDelay: `${i * 35}ms` }}
              />
            ))}
          </div>
          <span className="text-amber/60 mx-2 text-[9px] shrink-0">&bull;</span>
          <div className="flex items-end gap-[2px] flex-1 h-2.5">
            {Array.from({ length: bars }).map((_, i) => (
              <span
                key={`r-${i}`}
                className={`flex-1 h-full origin-bottom ${i < rightLit ? 'vu-bar bg-amber-l/85' : 'bg-amber-l/10'}`}
                style={{ animationDelay: `${(bars - i) * 35}ms` }}
              />
            ))}
          </div>
          <span className="mono uppercase tracking-[0.32em] text-[9px] text-amber-l/65 ml-2 shrink-0 mb-[2px]">R</span>
        </div>
      </div>
    </div>
  );
}
