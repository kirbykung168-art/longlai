'use client';

import { useLocale } from './LanguageProvider';
import clsx from 'clsx';

export default function LangToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="mono uppercase tracking-[0.32em] text-[10px] flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={clsx('transition-colors duration-500', locale === 'en' ? 'text-amber' : 'text-cream/55 hover:text-cream')}
        aria-label="English"
      >
        EN
      </button>
      <span className="text-cream/30">|</span>
      <button
        type="button"
        onClick={() => setLocale('th')}
        className={clsx('transition-colors duration-500', locale === 'th' ? 'text-amber' : 'text-cream/55 hover:text-cream')}
        aria-label="ไทย"
      >
        TH
      </button>
    </div>
  );
}
