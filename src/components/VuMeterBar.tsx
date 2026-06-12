'use client';

import { useEffect, useState } from 'react';

/**
 * VU METER BAR — a thin scroll-progress bar fixed to the bottom of
 * the viewport. The progress fills as a pair of channel bars (left
 * + right) that read as a VU meter — bouncing slightly with a 0.9s
 * pulse animation while filling proportionally to scroll position.
 *
 * Left = amber, Right = pop. They meet at the centre.
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

  // Bars on each side scale based on progress, but each bar has its
  // own animation phase so the meter "bounces" rather than rising
  // smoothly.
  const bars = 28;
  const leftLit  = Math.round(progress * bars);
  const rightLit = Math.round(progress * bars);

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-[1480px] px-3 lg:px-6 pb-2">
        <div className="bg-vinyl/85 backdrop-blur-sm border border-[var(--rule-amber)] px-3 py-1.5 flex items-end gap-1.5">
          {/* Left channel */}
          <span className="mono uppercase tracking-[0.32em] text-[9px] text-amber/85 mr-2 shrink-0 mb-[2px]">L</span>
          <div className="flex items-end gap-[2px] flex-1 h-3">
            {Array.from({ length: bars }).map((_, i) => (
              <span
                key={`l-${i}`}
                className={`flex-1 h-full origin-bottom ${i < leftLit ? 'vu-bar bg-amber' : 'bg-amber/15'}`}
                style={{ animationDelay: `${i * 35}ms` }}
              />
            ))}
          </div>
          {/* Centre spacer */}
          <span className="text-pop mx-2 text-[10px] shrink-0">●</span>
          {/* Right channel */}
          <div className="flex items-end gap-[2px] flex-1 h-3">
            {Array.from({ length: bars }).map((_, i) => (
              <span
                key={`r-${i}`}
                className={`flex-1 h-full origin-bottom ${i < rightLit ? 'vu-bar bg-pop' : 'bg-pop/15'}`}
                style={{ animationDelay: `${(bars - i) * 35}ms` }}
              />
            ))}
          </div>
          <span className="mono uppercase tracking-[0.32em] text-[9px] text-pop/85 ml-2 shrink-0 mb-[2px]">R</span>
        </div>
      </div>
    </div>
  );
}
