'use client';

import { useEffect } from 'react';
import { useLocale } from './LanguageProvider';

/**
 * Syncs the <html lang> attribute to the active locale so screen
 * readers / Chrome auto-translate respect the user's choice.
 */
export default function HtmlLangSync() {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
