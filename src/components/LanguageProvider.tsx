'use client';

import { createContext, useContext, useState } from 'react';

export type Locale = 'en' | 'th';

const LangCtx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: 'en',
  setLocale: () => {},
});

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  return <LangCtx.Provider value={{ locale, setLocale }}>{children}</LangCtx.Provider>;
}

export function useLocale() {
  return useContext(LangCtx);
}
